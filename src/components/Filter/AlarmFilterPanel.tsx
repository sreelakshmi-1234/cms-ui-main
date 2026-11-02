import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Flex,
  Icon,
  Avatar,
  Wrap,
  WrapItem,
  Spinner,
} from "@chakra-ui/react";

import { GetAlarmTypeList as fetchAlarmTypeList } from "../../api/Alarm/AlarmActivityAPI";
import { GetUserInfosAPI as fetchUsersInfo } from "../../api/User/UserInfoAPI";

const ChevronDownIcon: React.FC<React.ComponentProps<typeof Icon>> = (props) => (
  <Icon viewBox="0 0 24 24" boxSize="1em" {...props}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" fill="currentColor" />
  </Icon>
);

/* types */
export type AlarmStatus = "Active" | "Cleared" | "Acknowledged" | "Unacknowledged";
export type AlarmSeverity = "Critical" | "Major" | "Minor" | "Warning" | "Indeterminate";
export type TimeRangePreset = "all" | "today" | "last24h" | "last7d" | "custom";

export interface SearchDevParams {
  name: string;
  typeList: string[];
  severityList: string[];
  statusList: string[];
  text: string | null;
  assigneeId: string | null;
}

export interface AlarmFilterState {
  statuses: AlarmStatus[];
  severities: AlarmSeverity[];
  types: string[];
  assignee: string | null;
  timeRange: {
    preset: TimeRangePreset;
    from?: number;
    to?: number;
  };
}

export interface AlarmFilterPanelProps {
  initial?: Partial<AlarmFilterState>;
  assignees?: string[];
  typeSuggestions?: string[];
  onApply: (f: SearchDevParams) => void;
  onReset?: () => void;
  compact?: boolean;
  offsetX?: number;
  offsetY?: number;
  wrapperSx?: Record<string, any>;
}

/* defaults */
const ALL_STATUSES: AlarmStatus[] = ["Active", "Cleared", "Acknowledged", "Unacknowledged"];
const ALL_SEVERITIES: AlarmSeverity[] = ["Critical", "Major", "Minor", "Warning", "Indeterminate"];
const DEFAULT_STATE: AlarmFilterState = {
  statuses: ["Active"], // Only Active status is selected by default
  severities: [], // No default severities
  types: [], // No default types
  assignee: null, // No default assignee
  timeRange: { preset: "all" },
};

const Pill: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode }> = ({
  isActive,
  onClick,
  children,
}) => (
  <Button size="sm" variant={isActive ? "solid" : "outline"} onClick={onClick} borderRadius="full">
    {children}
  </Button>
);

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={2}>
    {children}
  </Text>
);

/** helpers */
const unique = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));
type AnyObj = Record<string, any>;

function extractTypeNames(apiResult: any): string[] {
  if (Array.isArray(apiResult)) {
    return unique(
      apiResult.map((v) => (typeof v === "string" ? v : String(v?.name ?? v?.type ?? "")))
    );
  }
  const candidates: any[] = [
    apiResult?.data,
    apiResult?.result,
    apiResult?.types,
    apiResult?.payload,
  ].filter(Boolean);

  for (const c of candidates) {
    if (Array.isArray(c)) return extractTypeNames(c);
    if (Array.isArray(c?.types)) return extractTypeNames(c.types);
  }

  const flat: string[] = [];
  try {
    const walk = (node: any) => {
      if (!node) return;
      if (Array.isArray(node)) return node.forEach(walk);
      if (typeof node === "object") {
        for (const [k, v] of Object.entries(node as AnyObj)) {
          if (k.toLowerCase().includes("type") && typeof v === "string") flat.push(v);
          walk(v);
        }
      }
    };
    walk(apiResult);
  } catch {}
  return unique(flat);
}

function extractAssigneeNames(apiResult: any): string[] {
  const pickName = (u: AnyObj) =>
    u?.name || u?.fullName || u?.displayName || u?.username || u?.email || "";

  const fromArray = (arr: any[]) =>
    unique(arr.map((u) => (typeof u === "string" ? u : String(pickName(u)))));

  if (Array.isArray(apiResult)) return fromArray(apiResult);

  const pools = [apiResult?.data, apiResult?.result, apiResult?.users, apiResult?.payload].filter(Boolean);
  for (const p of pools) {
    if (Array.isArray(p)) return fromArray(p);
  }

  const flat: string[] = [];
  try {
    const walk = (node: any) => {
      if (!node) return;
      if (Array.isArray(node)) {
        node.forEach((n) => {
          if (n && typeof n === "object") {
            const v = pickName(n);
            if (v) flat.push(String(v));
          }
          walk(n);
        });
        return;
      }
      if (typeof node === "object") {
        for (const v of Object.values(node as AnyObj)) walk(v);
      }
    };
    walk(apiResult);
  } catch {}
  return unique(flat);
}

const AlarmFilterPanel: React.FC<AlarmFilterPanelProps> = ({
  initial,
  assignees: assigneesProp = [],
  typeSuggestions: typeSuggestionsProp = [],
  onApply,
  onReset,
  compact = true,
  offsetX = 8,
  offsetY = 8,
  wrapperSx,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [draft, setDraft] = useState<AlarmFilterState>(() => ({
    ...DEFAULT_STATE,
    ...initial,
    timeRange: { ...DEFAULT_STATE.timeRange, ...initial?.timeRange },
  }));
  const [typeInput, setTypeInput] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // Fetched data state
  const [fetchedTypes, setFetchedTypes] = useState<string[]>([]);
  // store assignees as { id, label } so we can send id to backend while showing label in UI
  const [fetchedAssignees, setFetchedAssignees] = useState<Array<{ id: string; label: string }>>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingAssignees, setLoadingAssignees] = useState(false);
  const [typesError, setTypesError] = useState<string | null>(null);
  const [assigneesError, setAssigneesError] = useState<string | null>(null);

  // local helpers to normalize various API shapes into {id,label}
  const pickNameLocal = (u: any) => u?.name || u?.fullName || u?.displayName || u?.username || u?.email || '';
  const getIdLocal = (u: any) => {
    if (u == null) return '';
    if (typeof u === 'string' || typeof u === 'number') return String(u);
    
    // If we have an id object with an id property, use that first
    if (u.id && typeof u.id === 'object' && u.id.id) {
      return String(u.id.id);
    }
    
    // Direct id properties
    if (u.id) return String(u.id);
    if (u.userId) return String(u.userId);
    if (u.uuid) return String(u.uuid);
    
    // Don't fallback to email/username anymore since we want actual IDs
    return '';
  };

  const normalizeAssignees = (apiResult: any): Array<{ id: string; label: string }> => {
    if (!apiResult) return [];
    const list = Array.isArray(apiResult)
      ? apiResult
      : Array.isArray(apiResult.users)
      ? apiResult.users
      : Array.isArray(apiResult.data)
      ? apiResult.data
      : [];
    return list.map((x: any) => {
      // If x itself is a string, treat it as both id and label
      if (typeof x === 'string') {
        return { id: x, label: x };
      }
      // For objects, look specifically for id first
      const id = x?.id?.id || x?.id || x?.userId || x?.uuid;
      const label = pickNameLocal(x) || String(id || '');
      return { id: String(id || ''), label };
    });
  };

  const toggleItem = <T,>(arr: T[], val: T) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  const summary = useMemo(() => {
    const parts: string[] = [];
    if (draft.statuses.length) parts.push(draft.statuses.join(", "));
    if (draft.severities.length) parts.push(draft.severities.join(", "));
    if (draft.types.length) parts.push(draft.types.join(", "));
    return parts.length ? parts.join(", ") : "No filters";
  }, [draft]);

  const resetAll = () => {
    // Reset to only Active status selected
    setDraft({
      ...DEFAULT_STATE,
      statuses: ["Active"],
      severities: [],
      types: [],
      assignee: null,
      timeRange: { preset: "all" }
    });
    onReset?.();
  };

  const apply = () => {
    // Transform the filter state into SearchDevParams format
    const transformedFilter: SearchDevParams = {
      name: "Inverter", // Default device name
      typeList: draft.types,
      severityList: draft.severities.map(severity => severity.toUpperCase()),
      statusList: draft.statuses.map((status) => {
        switch (status) {
          case "Acknowledged": return "ACK";
          case "Unacknowledged": return "UNACK";
          case "Active": return "ACTIVE";
          case "Cleared": return "CLEARED";
          default: return String(status).toUpperCase();
        }
      }),
      text: null,
      assigneeId: draft.assignee
    };

    onApply(transformedFilter);
    setOpen(false);
  };

  // Fetch alarm types on mount
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingTypes(true);
        setTypesError(null);
        const res = await fetchAlarmTypeList();
        if (!alive) return;
        setFetchedTypes(extractTypeNames(res));
      } catch (e: any) {
        if (!alive) return;
        setTypesError(e?.message || "Failed to load types");
      } finally {
        if (alive) setLoadingTypes(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Fetch assignees on mount
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingAssignees(true);
        setAssigneesError(null);
        const res = await fetchUsersInfo();
        if (!alive) return;
        setFetchedAssignees(normalizeAssignees(res));
      } catch (e: any) {
        if (!alive) return;
        setAssigneesError(e?.message || "Failed to load assignees");
      } finally {
        if (alive) setLoadingAssignees(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Merge API + props (API wins first; props add more options)
  const mergedTypeSuggestions = useMemo(
    () => unique([...(fetchedTypes ?? []), ...(typeSuggestionsProp ?? [])]),
    [fetchedTypes, typeSuggestionsProp]
  );

  const mergedAssignees = useMemo(() => {
    // convert prop-assignees (strings) to {id,label}
    const fromProps = (assigneesProp ?? []).map(a => ({ id: String(a), label: String(a) }));
    const combined = [...(fetchedAssignees ?? []), ...fromProps];
    const map = new Map<string, { id: string; label: string }>();
    for (const it of combined) {
      const key = it.id || it.label;
      if (!map.has(key)) map.set(key, it);
    }
    return Array.from(map.values());
  }, [fetchedAssignees, assigneesProp]);

  const selectedAssigneeLabel = useMemo(() => {
    if (!draft.assignee) return null;
    const match = mergedAssignees.find(x => String(x.id) === String(draft.assignee));
    return match ? match.label : draft.assignee;
  }, [mergedAssignees, draft.assignee]);

  return (
    <HStack spacing={3} wrap="wrap" sx={wrapperSx}>
      <Popover
        isOpen={isOpen}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        placement="bottom-start"
        gutter={Math.max(offsetY, 0)}
        modifiers={[
          { name: "offset", options: { offset: [offsetX, offsetY] } },
          { name: "preventOverflow", options: { padding: 8 } },
        ]}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<ChevronDownIcon />}
            borderRadius="md"
          >
            {compact ? "Filter" : `Filter: ${summary}`}
          </Button>
        </PopoverTrigger>

        <PopoverContent w="680px" boxShadow="xl" borderRadius="md">
          <PopoverArrow />
          <PopoverHeader fontWeight="semibold" borderBottomWidth="1px">
            Filter
          </PopoverHeader>

          <PopoverBody>
            <Stack spacing={5}>
              {/* Status */}
              <Box>
                <FieldLabel>Alarm status list</FieldLabel>
                <ButtonGroup size="sm" isAttached flexWrap="wrap" gap={2}>
                  {ALL_STATUSES.map((s) => (
                    <Pill
                      key={s}
                      isActive={draft.statuses.includes(s)}
                      onClick={() => setDraft((d) => ({ ...d, statuses: toggleItem(d.statuses, s) }))}
                    >
                      {s}
                    </Pill>
                  ))}
                </ButtonGroup>
              </Box>

              {/* Severity */}
              <Box>
                <FieldLabel>Alarm severity list</FieldLabel>
                <ButtonGroup size="sm" isAttached flexWrap="wrap" gap={2}>
                  {ALL_SEVERITIES.map((s) => (
                    <Pill
                      key={s}
                      isActive={draft.severities.includes(s)}
                      onClick={() => setDraft((d) => ({ ...d, severities: toggleItem(d.severities, s) }))}
                    >
                      {s}
                    </Pill>
                  ))}
                </ButtonGroup>
              </Box>

              {/* Type list */}
              <Box>
                <FieldLabel>Alarm type list</FieldLabel>
                <HStack>
                  <Box position="relative" flex="1">
                    <Input
                      size="sm"
                      placeholder="+ Alarm type"
                      value={typeInput}
                      onChange={(e) => setTypeInput(e.target.value)}
                      onFocus={() => setShowTypeDropdown(true)}
                      onBlur={() => setTimeout(() => setShowTypeDropdown(false), 150)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && typeInput.trim()) {
                          const val = typeInput.trim();
                          setDraft((d) => (d.types.includes(val) ? d : { ...d, types: [...d.types, val] }));
                          setTypeInput("");
                          setShowTypeDropdown(false);
                        }
                      }}
                    />
                    {/* Suggestions Popover */}
                    {/* {(typeInput || showTypeDropdown) && (
                      <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        right={0}
                        mt={1}
                        bg="white"
                        boxShadow="lg"
                        borderRadius="md"
                        maxH="200px"
                        overflowY="auto"
                        zIndex={1000}
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        {loadingTypes ? (
                          <Flex p={2} justify="center">
                            <Spinner size="sm" />
                          </Flex>
                        ) : typesError ? (
                          <Text p={2} color="red.500" fontSize="sm">
                            {typesError}
                          </Text>
                        ) : (
                          (typeInput
                            ? mergedTypeSuggestions.filter(t =>
                                t.toLowerCase().includes(typeInput.toLowerCase()) &&
                                !draft.types.includes(t)
                              )
                            : mergedTypeSuggestions.filter(t => !draft.types.includes(t))
                          ).map((t) => (
                            <Box
                              key={t}
                              p={2}
                              cursor="pointer"
                              _hover={{ bg: "gray.100" }}
                              onMouseDown={() => {
                                setDraft((d) => ({ ...d, types: [...d.types, t] }));
                                setTypeInput("");
                                setShowTypeDropdown(false);
                              }}
                            >
                              {t}
                            </Box>
                          ))
                        )}
                      </Box>
                    )} */}
                  </Box>
                </HStack>
                {!!draft.types.length && (
                  <HStack mt={2} wrap="wrap">
                    {draft.types.map((t) => (
                      <Tag key={t} size="sm" borderRadius="full" colorScheme="gray">
                        <TagLabel>{t}</TagLabel>
                        <TagCloseButton
                          onClick={() => setDraft((d) => ({ ...d, types: d.types.filter((x) => x !== t) }))}
                        />
                      </Tag>
                    ))}
                  </HStack>
                )}
              </Box>

              {/* Assignee */}
              <Box>
                <Flex align="center" gap={4} wrap="wrap">
                  <FieldLabel>Assignee</FieldLabel>
                  <Menu>
                    <MenuButton
                      as={Button}
                      size="sm"
                      variant="outline"
                      rightIcon={<ChevronDownIcon />}
                      borderRadius="md"
                      w="280px"
                      justifyContent="flex-start"
                      px={3}
                    >
                      <Flex align="center" gap={3}>
                        <Wrap>
                          <WrapItem>
                            <Avatar
                              size="xs"
                              name={selectedAssigneeLabel ?? "Unassigned"}
                              bg="gray.300"
                              color="black"
                            />
                          </WrapItem>
                        </Wrap>
                        <Text fontSize="sm">{selectedAssigneeLabel ?? "Unassigned"}</Text>
                      </Flex>
                    </MenuButton>
                    <MenuList maxH="240px" overflowY="auto" minW="280px">
                      <MenuItem onClick={() => setDraft((d) => ({ ...d, assignee: null }))}>
                        <Flex align="center" gap={3}>
                          <Avatar size="xs" name="Unassigned" bg="gray.300" color="black" />
                          <Text>(Any)</Text>
                        </Flex>
                      </MenuItem>

                      {loadingAssignees ? (
                        <MenuItem isDisabled>
                          <HStack>
                            <Spinner size="xs" />
                            <Text>Loading assignees…</Text>
                          </HStack>
                        </MenuItem>
                      ) : assigneesError ? (
                        <MenuItem isDisabled>{assigneesError}</MenuItem>
                      ) : mergedAssignees.length ? (
                        mergedAssignees.map((a) => (
                          <MenuItem key={a.id || a.label} onClick={() => setDraft((d) => ({ ...d, assignee: a.id }))}>
                            <Flex align="center" gap={3}>
                              <Avatar size="xs" name={a.label} bg="blue.500" color="white" />
                              <Text>{a.label}</Text>
                            </Flex>
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem isDisabled>No users found</MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Flex>
              </Box>
            </Stack>
          </PopoverBody>

          <PopoverFooter borderTopWidth="1px">
            <Flex align="center" justify="space-between">
              <Button variant="ghost" onClick={resetAll}>
                Reset
              </Button>
              <HStack>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={apply}>
                  Update
                </Button>
              </HStack>
            </Flex>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

export default AlarmFilterPanel;
