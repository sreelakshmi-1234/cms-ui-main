import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Box, Checkbox, Flex, HStack, IconButton, Spacer,
  Table, Tbody, Td, Th, Thead, Tr, Text, useColorModeValue,
  Tooltip, Spinner, useToast, Input, InputGroup, InputLeftElement,
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerCloseButton, Collapse, VStack, Select, Button, Tag, TagLabel,
} from "@chakra-ui/react";
import {
  FiPlus, FiRefreshCw, FiSearch, FiTrash2,
  FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight,
  FiChevronDown, FiChevronUp, FiEdit2, FiCheck, FiX
} from "react-icons/fi";
import {
  GetDeviceProfileAPI,
  GetDeviceProfileByIdAPI,
  PostDeviceProfileAPI
} from "../../../../api/DeviceProfile/DeviceProfileAPI";
import AddAlarmRulePanel from "./AddAlarmRulePanel";
import EditAlarmRuleConditionModal from "./EditAlarmRuleConditionModal";

/* ------------ types ------------ */
interface EntityId { entityType: string; id: string; }
type Row = {
  id: EntityId; createdTime: number; name: string; description: string;
  type: string; transportType: string; default: boolean; version: number;
};
type SortKey = "createdTime" | "name";
type SortDir = "asc" | "desc";

/** minimal alarm types (UI shape) */
type AlarmCondition = {
  key: { key: string };
  predicate: { operation: string; value: { defaultValue: string }; ignoreCase?: boolean };
};
type AlarmRule = { condition: { condition: AlarmCondition[] } };
type AlarmRulesMap = { [severity: string]: AlarmRule };
type NewAlarmType = {
  alarmType: string;
  createRules: AlarmRulesMap;
  clearRule: AlarmRule;
  propagate: boolean;
  propagateToOwner: boolean;
  propagateToOwnerHierarchy: boolean;
  propagateToTenant: boolean;
};

/** chips preview */
const CondChips: React.FC<{ c: AlarmCondition | undefined }> = ({ c }) => {
  if (!c) return <Text fontSize="sm" color="red.300">Please add alarm rule condition</Text>;
  const op = (c.predicate.operation || "EQUAL").toLowerCase().replace(/_/g, " ");
  const val = c.predicate.value?.defaultValue ?? "";
  return (
    <HStack spacing={2} wrap="wrap">
      <Tag size="sm" variant="solid" colorScheme="gray"><TagLabel>{c.key?.key || "key"}</TagLabel></Tag>
      <Text fontSize="sm">{op}</Text>
      <Tag size="sm" variant="subtle" colorScheme="red"><TagLabel>{String(val) === "" ? '""' : String(val)}</TagLabel></Tag>
    </HStack>
  );
};

const AlarmProfileRule: React.FC = () => {
  /* table/pagination */
  const [page, setPage] = useState(1);            // UI is 1-based
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("createdTime");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPagesSrv, setTotalPagesSrv] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<number | null>(null);
  const toast = useToast();

  /* drawer */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  /** RAW profile from backend (we save this back with edits) */
  const [profileRaw, setProfileRaw] = useState<any | null>(null);

  /** UI-friendly subset for alarms preview/edit */
  const [profileDetails, setProfileDetails] = useState<any | null>(null);

  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* backup for cancel */
  const editBackupRef = useRef<any | null>(null);

  /* preview toggles */
  const [advOpenPreview, setAdvOpenPreview] = useState(true);
  const [alarmCollapseState, setAlarmCollapseState] = useState<{ [key: string]: boolean }>({});

  /* condition modal state */
  const [conditionModal, setConditionModal] = useState({
    isOpen: false,
    type: 'create',
    section: 'zero-gen',
    ruleType: 'create',
    alarmIndex: 0
  });

  /* inline add panels */
  type Panel = { id: string; state: NewAlarmType };
  const [panels, setPanels] = useState<Panel[]>([]);

  /* ui helpers */
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  const headerBg = useColorModeValue("white", "black");
  const sortIcon = sortDir === "asc" ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />;

  /* =========================
     Fetch profiles (0-based API)
     ========================= */
  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      // Backend expects 0-based page index
      const apiPage = Math.max(0, page - 1);
      const pageInfo = { page: apiPage, pageSize, sortKey, sortDir, search };
      const response = await GetDeviceProfileAPI(pageInfo);

      // Normalize various shapes: {data:[...], totalElements,...} or array
      const rows: Row[] =
        Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.data?.data)
              ? response.data.data
              : [];

      const total =
        (typeof response?.totalElements === "number" && response.totalElements) ??
        (typeof response?.data?.totalElements === "number" && response.data.totalElements) ??
        rows.length;

      const totalPages =
        (typeof response?.totalPages === "number" && response.totalPages) ??
        (typeof response?.data?.totalPages === "number" && response.data.totalPages) ??
        Math.max(1, Math.ceil(total / pageSize));

      setData(rows);
      setTotalCount(total as number);
      setTotalPagesSrv(totalPages as number);

      // If we somehow requested an out-of-range page, snap back to 1
      if (rows.length === 0 && total > 0 && apiPage >= totalPages) {
        setPage(1);
      }
    } catch {
      setData([]);
      setTotalCount(0);
      setTotalPagesSrv(1);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => { fetchProfiles(); }, [page, pageSize, sortKey, sortDir, search]);

  const handleRefresh = () => fetchProfiles();

  // Client-side sort/filter only for rows that came in from server page
  const sorted = useMemo(() => {
    const arr = [...data];
    arr.sort((a, b) => {
      const A = sortKey === "createdTime" ? a.createdTime : (a.name || "").toLowerCase();
      const B = sortKey === "createdTime" ? b.createdTime : (b.name || "").toLowerCase();
      const cmp = A > B ? 1 : A < B ? -1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [data, sortKey, sortDir]);

  const filtered = useMemo(() => {
    if (!search.trim()) return sorted;
    const s = search.toLowerCase();
    return sorted.filter(r => (r.name || "").toLowerCase().includes(s));
  }, [sorted, search]);

  // Because paging is done on server, just render filtered (do not slice)
  const effectiveTotal = search.trim() ? filtered.length : totalCount;
  const totalPages = Math.max(1, totalPagesSrv);
  const pageSafe = Math.min(page, totalPages);
  const pageRows = filtered;

  const toggleAll = (checked: boolean) => setSelected(checked ? pageRows.map(r => r.id.id) : []);
  const toggleOne = (id: string, checked: boolean) =>
    setSelected(prev => (checked ? Array.from(new Set([...prev, id])) : prev.filter(x => x !== id)));

  const onSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchRef.current) window.clearTimeout(searchRef.current);
    searchRef.current = window.setTimeout(() => { setPage(1); }, 400);
  };

  /* open drawer + load profile */
  const handleRowClick = async (row: Row) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
    setPanels([]);
    setIsLoadingProfile(true);

    try {
      const response = await GetDeviceProfileByIdAPI(row.id.id);
      setProfileRaw(response || null); // keep raw for saving

      // transform alarms -> UI shape
      const transformedAlarms = response?.profileData?.alarms?.map((alarm: any) => {
        const createRules: AlarmRulesMap = {};
        if (alarm.createRules) {
          Object.entries(alarm.createRules).forEach(([severity, ruleObj]: [string, any]) => {
            createRules[severity] = {
              condition: {
                condition: ruleObj?.condition?.condition?.map((cond: any) => ({
                  key: { key: cond.key?.key || "" },
                  predicate: {
                    operation: cond.predicate?.operation || "EQUAL",
                    value: { defaultValue: String(cond.predicate?.value?.defaultValue ?? "") },
                    ignoreCase: cond.predicate?.ignoreCase
                  }
                })) || []
              }
            };
          });
        }

        const clearRule: AlarmRule = {
          condition: {
            condition: alarm.clearRule?.condition?.condition?.map((cond: any) => ({
              key: { key: cond.key?.key || "" },
              predicate: {
                operation: cond.predicate?.operation || "EQUAL",
                value: { defaultValue: String(cond.predicate?.value?.defaultValue ?? "") },
                ignoreCase: cond.predicate?.ignoreCase
              }
            })) || []
          }
        };

        return {
          id: alarm.id,
          alarmType: alarm.alarmType,
          createRules,
          clearRule,
          propagate: !!alarm.propagate,
          propagateToOwner: !!alarm.propagateToOwner,
          propagateToOwnerHierarchy: !!alarm.propagateToOwnerHierarchy,
          propagateToTenant: !!alarm.propagateToTenant
        };
      }) || [];

      setProfileDetails({ profileData: { alarms: transformedAlarms } });
      setAdvOpenPreview(false);

      const initialCollapseState: { [key: string]: boolean } = {};
      transformedAlarms.forEach((alarm: any, idx: number) => {
        initialCollapseState[alarm.id || idx] = false;
      });
      setAlarmCollapseState(initialCollapseState);
    } catch (error) {
      console.error("Error fetching profile details:", error);
      toast({ title: "Error loading profile", status: "error", duration: 2000, isClosable: true });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedRow(null);
    setProfileRaw(null);
    setProfileDetails(null);
    setPanels([]);
    setEditMode(false);
    editBackupRef.current = null;
  };

  /* ========= pack UI alarms -> TB alarms (add required types) ========= */
  const packAlarmsForSave = (uiAlarms: any[]) => {
    const inferPredicate = (raw: any) => {
      const vStr = `${raw?.value?.defaultValue ?? ""}`.trim();
      if (/^(true|false)$/i.test(vStr)) {
        return { type: "BOOLEAN", operation: raw?.operation || "EQUAL", value: { defaultValue: vStr.toLowerCase() === "true" }, ...(raw?.ignoreCase !== undefined ? { ignoreCase: !!raw.ignoreCase } : {}) };
      }
      if (/^-?\d+(\.\d+)?$/.test(vStr)) {
        return { type: "NUMERIC", operation: raw?.operation || "EQUAL", value: { defaultValue: Number(vStr) }, ...(raw?.ignoreCase !== undefined ? { ignoreCase: !!raw.ignoreCase } : {}) };
      }
      return { type: "STRING", operation: raw?.operation || "EQUAL", value: { defaultValue: vStr }, ...(raw?.ignoreCase !== undefined ? { ignoreCase: !!raw.ignoreCase } : {}) };
    };
    const buildRule = (ruleObj: any) => ({
      condition: {
        condition: (ruleObj?.condition?.condition || []).map((c: any) => ({
          key: { key: c?.key?.key || "", type: "TIME_SERIES" },
          predicate: inferPredicate(c?.predicate || {})
        }))
      }
    });
    return (uiAlarms || []).map((a) => {
      const packedCreate: any = {};
      Object.entries(a.createRules || {}).forEach(([sev, ruleObj]: [string, any]) => { packedCreate[sev] = buildRule(ruleObj); });
      const packedClear = buildRule(a.clearRule);
      return { ...(a.id ? { id: a.id } : {}), alarmType: a.alarmType, createRules: packedCreate, clearRule: packedClear, propagate: !!a.propagate, propagateToOwner: !!a.propagateToOwner, propagateToOwnerHierarchy: !!a.propagateToOwnerHierarchy, propagateToTenant: !!a.propagateToTenant };
    });
  };

  // Validate packed alarms: ensure predicate.operation is compatible with predicate.type
  const validatePackedAlarms = (tbAlarms: any[]) => {
    const errors: string[] = [];
    const allowedOps: Record<string, string[]> = {
      BOOLEAN: ["EQUAL", "NOT_EQUAL"],
      NUMERIC: ["EQUAL", "NOT_EQUAL", "GREATER", "LESS", "GREATER_OR_EQUAL", "LESS_OR_EQUAL"],
      STRING: ["EQUAL", "NOT_EQUAL", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "ENDS_WITH"]
    };

    tbAlarms.forEach((a: any) => {
      const alarmName = a.alarmType || "(unnamed)";
      const checkRule = (rule: any, sevLabel = "") => {
        (rule?.condition?.condition || []).forEach((c: any, idx: number) => {
          const pred = c.predicate || {};
          const ptype = (pred.type || "STRING").toUpperCase();
          const op = (pred.operation || "EQUAL").toUpperCase();
          const allowed = allowedOps[ptype] || allowedOps.STRING;
          if (!allowed.includes(op)) {
            errors.push(`Alarm "${alarmName}" ${sevLabel} condition #${idx + 1}: operation ${op} not valid for type ${ptype}`);
          }
        });
      };

      Object.entries(a.createRules || {}).forEach(([sev, ruleObj]: [string, any]) => checkRule(ruleObj, `(${sev})`));
      if (a.clearRule) checkRule(a.clearRule, `(clear)`);
    });

    return errors;
  };

  /* ===== sanitize + validate before save ===== */
  const VALID_SEVS = ["CRITICAL","MAJOR","MINOR","WARNING","INDETERMINATE"];
  function sanitizeAndValidateAlarms(uiAlarms: any[]) {
    // remove placeholder severities and empty alarm names
    const cleaned = (uiAlarms || []).map(a => {
      const clone = JSON.parse(JSON.stringify(a));
      Object.keys(clone.createRules || {}).forEach((k) => {
        if (!VALID_SEVS.includes(k)) delete clone.createRules[k];
      });
      return clone;
    }).filter(a =>
      String(a.alarmType || "").trim().length > 0 &&
      a.createRules && Object.keys(a.createRules).length > 0
    );

    const errors: string[] = [];
    cleaned.forEach((a) => {
      const sevs = Object.keys(a.createRules || {});
      sevs.forEach(sev => {
        const conds = a.createRules[sev]?.condition?.condition || [];
        if (!conds.length) errors.push(`Alarm "${a.alarmType}" (${sev}) has empty condition`);
      });
    });
    return { cleaned, errors };
  }

  /* ===== helper: sanitize payload (strip read-only fields) ===== */
  const buildProfileForSave = (raw: any, uiAlarmsTB: any[], selected?: Row) => {
    const p = raw || {};
    const base: any = {
      id: p?.id || (selected ? { entityType: "DEVICE_PROFILE", id: selected.id.id } : undefined),
      name: p?.name || selected?.name,
      type: p?.type || selected?.type || "DEFAULT",
      transportType: p?.transportType || selected?.transportType || "DEFAULT",
      description: p?.description ?? undefined,
      defaultQueueName: p?.defaultQueueName ?? undefined,
      profileData: {
        configuration: p?.profileData?.configuration ?? { type: "DEFAULT" },
        transportConfiguration: p?.profileData?.transportConfiguration ?? { type: "DEFAULT" },
        provisionConfiguration: p?.profileData?.provisionConfiguration ?? { type: "DISABLED", provisionDeviceSecret: null },
        alarms: uiAlarmsTB
      }
    };
    Object.keys(base).forEach((k) => base[k] === undefined && delete base[k]);
    Object.keys(base.profileData).forEach((k) => base.profileData[k] === undefined && delete base.profileData[k]);
    return base;
  };

  /* ---------- SAVE (✔) ---------- */
  const persistProfile = async () => {
    if (!selectedRow || !profileRaw) return;
    try {
      setIsSaving(true);

      const uiAlarmsCombined = [
        ...(profileDetails?.profileData?.alarms || []),
        ...panels.map(p => p.state)
      ];

      // sanitize & validate (prevents 400s)
      const { cleaned, errors } = sanitizeAndValidateAlarms(uiAlarmsCombined);
      if (errors.length) {
        toast({
          title: "Fix issues before saving",
          description: errors[0],
          status: "error",
          duration: 2500,
          isClosable: true
        });
        setIsSaving(false);
        return;
      }
      if (!cleaned.length) {
        toast({ title: "No valid alarms to save", status: "warning", duration: 2000, isClosable: true });
        setIsSaving(false);
        return;
      }

      const tbAlarms = packAlarmsForSave(cleaned);

      // additional validation: ensure predicate ops match predicate types (prevent backend 500s)
      const validationErrors = validatePackedAlarms(tbAlarms);
      if (validationErrors.length) {
        toast({ title: "Fix issues before saving", description: validationErrors[0], status: "error", duration: 4000, isClosable: true });
        setIsSaving(false);
        return;
      }

      const toSave = buildProfileForSave(profileRaw, tbAlarms, selectedRow);

      await PostDeviceProfileAPI(toSave);
      toast({ title: "Device profile saved", status: "success", duration: 1800, isClosable: true });

      // refresh drawer data
      setPanels([]);
      const refetched = await GetDeviceProfileByIdAPI(selectedRow.id.id);
      setProfileRaw(refetched || null);
      setProfileDetails({ profileData: { alarms: refetched?.profileData?.alarms || [] } });
      setEditMode(false);
      editBackupRef.current = null;
    } catch (e: any) {
      console.error(e);
      const msg = e?.response?.data?.message || "Save failed";
      toast({ title: msg, status: "error", duration: 2200, isClosable: true });
    } finally {
      setIsSaving(false);
    }
  };

  /* inline panel helpers */
  const addPanel = () =>
    setPanels(p => [...p, { id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, state: {
      alarmType: "",
      createRules: { CRITICAL: { condition: { condition: [] } } },
      clearRule: { condition: { condition: [] } },
      propagate: false, propagateToOwner: false, propagateToOwnerHierarchy: false, propagateToTenant: false
    } }]);

  const updatePanelState = (id: string, next: NewAlarmType | ((s: NewAlarmType) => NewAlarmType)) =>
    setPanels(prev => prev.map(p => (p.id === id ? { ...p, state: typeof next === "function" ? (next as any)(p.state) : next } : p)));

  const closePanel = (id: string) => setPanels(prev => prev.filter(p => p.id !== id));

  const savePanel = (id: string) => {
    const panel = panels.find(p => p.id === id);
    if (!panel) return;
    setProfileDetails((prev: any) => {
      const clone = prev ? JSON.parse(JSON.stringify(prev)) : { profileData: { alarms: [] } };
      const list = clone?.profileData?.alarms || [];
      list.push(panel.state);
      clone.profileData = clone.profileData || {};
      clone.profileData.alarms = list;
      return clone;
    });
    closePanel(id);
    toast({ title: "Alarm rule added", status: "success", duration: 2000, isClosable: true });
  };

  const bg = useColorModeValue("gray.50", "whiteAlpha.100")

  return (
    <Box mt={"87px"} maxW="1920px" ml={10} minH={"150vh"} px={{ base: 2, sm: 12, md: 17 }}>
      <Box borderWidth="1px" rounded="md" overflow="hidden">
        {/* Title */}
        <Flex p={4} borderBottom="1px" borderColor={border} align="center" bg={headerBg}>
          <Text fontSize="22px" fontWeight={600}>Device Profile</Text>
          <Spacer />
          <HStack spacing={2} align="center">
            <InputGroup size="sm" w="240px">
              <InputLeftElement pointerEvents="none"><FiSearch color="rgba(0,0,0,0.4)" /></InputLeftElement>
              <Input placeholder="Search name..." value={search} onChange={(e) => handleSearchChange(e.target.value)} />
            </InputGroup>
            {/* <Tooltip label="Add">
              <IconButton aria-label="Add" icon={<FiPlus />} size="sm" variant="ghost" />
            </Tooltip> */}
            <Tooltip label="Refresh">
              <IconButton aria-label="Refresh" icon={<FiRefreshCw />} size="sm" variant="ghost" onClick={handleRefresh} isLoading={isLoading} />
            </Tooltip>
          </HStack>
        </Flex>

        {/* Table */}
        <Box overflowX="auto" position="relative" minH="200px">
          {isLoading && (
            <Flex position="absolute" inset={0} bg="whiteAlpha.800" zIndex={2} justify="center" align="center">
              <Spinner size="xl" />
            </Flex>
          )}
          <Table size="sm" sx={{ "td, th": { py: 4 } }}>
            <Thead position="sticky" top={0} zIndex={1} bg={headerBg}>
              <Tr>
                <Th w="44px">
                  <Checkbox
                    isChecked={pageRows.length > 0 && selected.length === pageRows.length}
                    isIndeterminate={selected.length > 0 && selected.length < pageRows.length}
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                </Th>
                <Th cursor="pointer" onClick={() => onSort("createdTime")}>
                  <HStack spacing={1}><Text>Created time</Text>{sortKey === "createdTime" && sortIcon}</HStack>
                </Th>
                <Th cursor="pointer" onClick={() => onSort("name")}>
                  <HStack spacing={1}><Text>Name</Text>{sortKey === "name" && sortIcon}</HStack>
                </Th>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th w="160px"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageRows.map((r) => (
                <Tr
                  key={r.id.id}
                  _hover={{ bg: bg }}
                  cursor="pointer"
                  onClick={() => handleRowClick(r)}
                >
                  <Td>
                    <Checkbox
                      isChecked={selected.includes(r.id.id)}
                      onChange={(e) => { e.stopPropagation(); toggleOne(r.id.id, e.target.checked); }}
                    />
                  </Td>
                  <Td>{new Date(r.createdTime).toLocaleString()}</Td>
                  <Td>{r.name}</Td>
                  <Td>{r.type}</Td>
                  <Td>{r.description || "Default"}</Td>
                  <Td>
                    <HStack spacing={2} justify="flex-end">
                      <Tooltip label="Delete">
                        <IconButton aria-label="Delete" icon={<FiTrash2 />} size="sm" variant="ghost" />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} placement="right" onClose={handleDrawerClose} size="xl">
          <DrawerOverlay />
          <DrawerContent maxW="70%" bg={useColorModeValue("white", "black")} position="relative">
            <DrawerCloseButton mt={2} />
            <DrawerHeader borderBottomWidth="1px" bg={useColorModeValue("white", "black")} pr={12}>
              <Flex align="center" justify="space-between" gap={3}>
                <Text fontWeight={600}>{selectedRow?.name}</Text>

                {/* Top-right controls */}
                <HStack spacing={2}>
                  {editMode && (
                    <>
                      <Tooltip label="Save">
                        <IconButton
                          aria-label="Save"
                          icon={<FiCheck />}
                          isLoading={isSaving}
                          onClick={persistProfile}
                          size="sm"
                          colorScheme="orange"
                          variant="solid"
                        />
                      </Tooltip>
                      <Tooltip label="Cancel">
                        <IconButton
                          aria-label="Cancel"
                          icon={<FiX />}
                          size="sm"
                          colorScheme="orange"
                          variant="outline"
                          onClick={() => {
                            if (editBackupRef.current) {
                              setProfileDetails(JSON.parse(JSON.stringify(editBackupRef.current)));
                            }
                            setPanels([]);
                            setEditMode(false);
                            editBackupRef.current = null;
                            toast({ title: "Changes discarded", status: "info", duration: 1400, isClosable: true });
                          }}
                        />
                      </Tooltip>
                    </>
                  )}
                  <Tooltip label={editMode ? "Editing…" : "Edit"}>
                    <IconButton
                      aria-label="Edit"
                      icon={<FiEdit2 />}
                      size="sm"
                      variant={editMode ? "solid" : "ghost"}
                      colorScheme={editMode ? "blue" : undefined}
                      isDisabled={isSaving}
                      onClick={() => {
                        if (!editMode) {
                          // enter edit → take deep backup
                          editBackupRef.current = JSON.parse(JSON.stringify(profileDetails));
                          setPanels([]); // start fresh inline panels
                          setEditMode(true);
                        }
                      }}
                    />
                  </Tooltip>
                </HStack>
              </Flex>
            </DrawerHeader>

            <DrawerBody>
              <VStack align="stretch" spacing={4}>
                {profileDetails?.profileData?.alarms?.map((alarm: any, idx: number) => {
                  const rule = alarm?.createRules && Object.values(alarm.createRules)[0] as any;
                  const cond: AlarmCondition | undefined = rule?.condition?.condition?.[0];
                  return (
                    <Box key={idx} borderWidth="1px" borderRadius="md" overflow="hidden">
                      <Flex p={3} borderBottom="1px" borderColor={border} align="center" bg={headerBg}>
                        <HStack as="button" spacing={1} onClick={() => {
                          const key = alarm.id || idx;
                          setAlarmCollapseState(prev => ({ ...prev, [key]: !prev[key] }));
                        }}>
                          <Text fontWeight={600}>{alarm.alarmType}</Text>
                          {alarmCollapseState[alarm.id || idx] ? <FiChevronUp /> : <FiChevronDown />}
                        </HStack>
                        <Spacer />
                        {editMode && (
                          <Tooltip label="Delete alarm">
                            <IconButton
                              aria-label="Delete alarm"
                              icon={<FiTrash2 />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${alarm.alarmType}" alarm?`)) {
                                  setProfileDetails((prev: any) => {
                                    const next = JSON.parse(JSON.stringify(prev || { profileData: { alarms: [] } }));
                                    next.profileData.alarms = (next.profileData.alarms || []).filter((_: any, i: number) => i !== idx);
                                    return next;
                                  });
                                  toast({ title: "Alarm deleted", status: "success", duration: 1500, isClosable: true });
                                }
                              }}
                            />
                          </Tooltip>
                        )}
                      </Flex>

                      <Collapse in={alarmCollapseState[alarm.id || idx] || false} animateOpacity>
                        <Box borderBottom="1px" borderColor={border} p={4}>
                          <Text fontSize="xs" color="gray.500" mb={1}>Alarm type*</Text>
                          <Input value={alarm.alarmType} isReadOnly w="380px" />
                        </Box>

                        <Box borderBottom="1px" borderColor={border} p={4}>
                          <Flex justify="flex-end" mb={3}>
                            <HStack as="button" spacing={1} onClick={() => setAdvOpenPreview(s => !s)}>
                              <Text color="gray.600" fontSize="sm">Advanced settings</Text>
                              {advOpenPreview ? <FiChevronUp /> : <FiChevronDown />}
                            </HStack>
                          </Flex>
                          <Collapse in={advOpenPreview}>
                            <VStack align="start" spacing={3}>
                              <Checkbox isReadOnly isChecked={alarm.propagate}>Propagate alarm to related entities</Checkbox>
                              <Checkbox isReadOnly isChecked={alarm.propagateToOwner}>Propagate alarm to entity owner (Customer or Tenant)</Checkbox>
                              <Checkbox isReadOnly isChecked={alarm.propagateToOwnerHierarchy}>Propagate alarm to entity owners hierarchy</Checkbox>
                              <Checkbox isReadOnly isChecked={alarm.propagateToTenant}>Propagate alarm to Tenant</Checkbox>
                            </VStack>
                          </Collapse>
                        </Box>

                        <Box borderBottom="1px" borderColor={border} p={4}>
                          <Text fontWeight={600} mb={3}>Create alarm rules</Text>

                          {Object.entries(alarm.createRules).map(([ruleKey, ruleObj]: [string, any]) => {
                            const ruleCondition = ruleObj?.condition?.condition?.[0];
                            const isPlaceholder = ruleKey.startsWith("UNSET_");
                            
                            return (
                              <Flex key={ruleKey} borderWidth="1px" borderColor={border} borderRadius="md" p={3} align="stretch" gap={3} mb={3}>
                                <Box w="240px" borderWidth="1px" borderColor={border} borderRadius="md" p={2}>
                                  <Text fontSize="xs" color="gray.600" mb={1}>Severity</Text>
                                  <Select
                                    value={isPlaceholder ? "" : ruleKey}
                                    isDisabled={!editMode}
                                    placeholder={isPlaceholder ? "Select alarm severity..." : undefined}
                                    onChange={(e) => {
                                      if (!editMode) return;
                                      const newKey = e.target.value;
                                      const updatedAlarm = { ...alarm };
                                      updatedAlarm.createRules[newKey] = updatedAlarm.createRules[ruleKey];
                                      delete updatedAlarm.createRules[ruleKey];
                                      setProfileDetails((prev: any) => {
                                        const clone = JSON.parse(JSON.stringify(prev || { profileData: { alarms: [] } }));
                                        const alarmsArr = clone.profileData.alarms || [];
                                        alarmsArr[idx] = updatedAlarm;
                                        clone.profileData.alarms = alarmsArr;
                                        return clone;
                                      });
                                    }}
                                  >
                                    <option value="CRITICAL">Critical</option>
                                    <option value="MAJOR">Major</option>
                                    <option value="MINOR">Minor</option>
                                    <option value="WARNING">Warning</option>
                                    <option value="INDETERMINATE">Indeterminate</option>
                                  </Select>
                                </Box>

                                <Box flex="1" borderWidth="1px" borderColor={border} borderRadius="md" p={3}>
                                  <Flex align="center" gap={3} mb={3}>
                                    <Text w="100px" color="gray.600" fontSize="sm">Condition:</Text>
                                    <Box flex={1}><CondChips c={ruleCondition} /></Box>
                                    <IconButton
                                      aria-label="Edit condition"
                                      icon={<FiEdit2 />}
                                      size="sm"
                                      variant="ghost"
                                      isDisabled={!editMode}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setConditionModal({
                                          isOpen: true,
                                          type: 'edit',
                                          section: 'zero-gen',
                                          ruleType: 'create',
                                          alarmIndex: idx
                                        });
                                      }}
                                    />
                                  </Flex>

                                  <Flex align="center" gap={3} mb={3}>
                                    <Text w="100px" color="gray.600" fontSize="sm">Schedule:</Text>
                                    <Text flex={1} fontSize="sm" fontWeight="semibold">Active all the time</Text>
                                    <IconButton aria-label="Edit schedule" icon={<FiEdit2 />} size="sm" variant="ghost" isDisabled={!editMode} />
                                  </Flex>

                                  <Flex align="center" gap={3} mb={3}>
                                    <Text w="100px" color="gray.600" fontSize="sm">Additional info:</Text>
                                    <Text fontSize="sm" color="gray.400">—</Text>
                                  </Flex>

                                  <Box>
                                    <Flex align="center" gap={3}>
                                      <Text w="100px" color="gray.600" fontSize="sm">Mobile dashboard:</Text>
                                      <Input isReadOnly value={"No dashboard selected"} w="340px" />
                                    </Flex>
                                    <Text fontSize="xs" color="gray.500" ml="100px" mt={1}>
                                      Used by mobile application as an alarm details dashboard
                                    </Text>
                                  </Box>
                                </Box>

                                {editMode && (
                                  <Flex align="center">
                                    <IconButton
                                      aria-label="Remove rule"
                                      icon={<FiTrash2 />}
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        const updatedAlarm = { ...alarm };
                                        delete updatedAlarm.createRules[ruleKey];
                                        if (Object.keys(updatedAlarm.createRules).length === 0) {
                                          updatedAlarm.createRules[`UNSET_${Date.now()}`] = { condition: { condition: [] } };
                                        }
                                        setProfileDetails((prev: any) => {
                                          const clone = JSON.parse(JSON.stringify(prev || { profileData: { alarms: [] } }));
                                          const alarmsArr = clone.profileData.alarms || [];
                                          alarmsArr[idx] = updatedAlarm;
                                          clone.profileData.alarms = alarmsArr;
                                          return clone;
                                        });
                                      }}
                                    />
                                  </Flex>
                                )}
                              </Flex>
                            );
                          })}

                          <Button
                            size="sm"
                            mt={3}
                            variant="outline"
                            leftIcon={<FiPlus />}
                            onClick={() => {
                              const updatedAlarms = [...(profileDetails?.profileData?.alarms || [])];
                              const updatedAlarm = { ...updatedAlarms[idx] };
                              const newKey = `UNSET_${Date.now()}`;
                              updatedAlarm.createRules[newKey] = { condition: { condition: [] } };
                              updatedAlarms[idx] = updatedAlarm;
                              setProfileDetails((prev: any) => ({
                                ...prev,
                                profileData: { ...prev?.profileData, alarms: updatedAlarms }
                              }));
                            }}
                          >
                            Add create condition
                          </Button>
                        </Box>

                        {/* Clear alarm rule */}
                        <Box p={4}>
                          <Text fontWeight={600} mb={3}>Clear alarm rule</Text>
                          <Flex borderWidth="1px" borderColor={border} borderRadius="md" p={3} align="stretch" gap={3}>
                            <Box flex="1" borderWidth="1px" borderColor={border} borderRadius="md" p={3}>
                              <Flex align="center" gap={3} mb={3}>
                                <Text w="100px" color="gray.600" fontSize="sm">Condition:</Text>
                                <Box flex={1}><CondChips c={alarm.clearRule?.condition?.condition?.[0]} /></Box>
                                <IconButton
                                  aria-label="Edit condition"
                                  icon={<FiEdit2 />}
                                  size="sm"
                                  variant="ghost"
                                  isDisabled={!editMode}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setConditionModal({
                                      isOpen: true,
                                      type: 'edit',
                                      section: 'zero-gen',
                                      ruleType: 'clear',
                                      alarmIndex: idx
                                    });
                                  }}
                                />
                              </Flex>
                              <Flex align="center" gap={3} mb={3}>
                                <Text w="100px" color="gray.600" fontSize="sm">Schedule:</Text>
                                <Text flex={1} fontSize="sm" fontWeight="semibold">Active all the time</Text>
                                <IconButton aria-label="Edit schedule" icon={<FiEdit2 />} size="sm" variant="ghost" isDisabled={!editMode} />
                              </Flex>
                              <Flex align="center" gap={3} mb={3}>
                                <Text w="100px" color="gray.600" fontSize="sm">Additional info:</Text>
                                <Text fontSize="sm" color="gray.400">—</Text>
                              </Flex>
                              <Box>
                                <Flex align="center" gap={3}>
                                  <Text w="100px" color="gray.600" fontSize="sm">Mobile dashboard:</Text>
                                  <Input isReadOnly value={"No dashboard selected"} w="340px" />
                                </Flex>
                                <Text fontSize="xs" color="gray.500" ml="100px" mt={1}>
                                  Used by mobile application as an alarm details dashboard
                                </Text>
                              </Box>
                            </Box>
                          </Flex>
                        </Box>
                      </Collapse>
                    </Box>
                  );
                })}

                {/* Inline add panels */}
                {editMode && panels.map((p) => (
                  <AddAlarmRulePanel
                    key={p.id}
                    newAlarm={p.state}
                    setNewAlarm={(updater) =>
                      setPanels(prev => prev.map(x => x.id === p.id
                        ? { ...x, state: (typeof updater === "function" ? (updater as any)(x.state) : updater) }
                        : x))}
                    onSave={() => {
                      const panel = panels.find(x => x.id === p.id);
                      if (!panel) return;
                      setProfileDetails((prev: any) => {
                        const clone = prev ? JSON.parse(JSON.stringify(prev)) : { profileData: { alarms: [] } };
                        const list = clone?.profileData?.alarms || [];
                        list.push(panel.state);
                        clone.profileData.alarms = list;
                        return clone;
                      });
                      setPanels(prev => prev.filter(x => x.id !== p.id));
                      toast({ title: "Alarm rule added", status: "success", duration: 2000, isClosable: true });
                    }}
                    onCancel={() => setPanels(prev => prev.filter(x => x.id !== p.id))}
                    selectedRow={selectedRow as any}
                  />
                ))}

                {editMode && (
                  <Box mt={2}>
                    <Button leftIcon={<FiPlus />} colorScheme="blue" size="md" onClick={() => {
                      setPanels(p => [...p, { id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, state: {
                        alarmType: "",
                        createRules: { CRITICAL: { condition: { condition: [] } } },
                        clearRule: { condition: { condition: [] } },
                        propagate: false, propagateToOwner: false, propagateToOwnerHierarchy: false, propagateToTenant: false
                      } }]);
                    }}>
                      Add Alarm Rule
                    </Button>
                  </Box>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <EditAlarmRuleConditionModal
          isOpen={conditionModal.isOpen}
          onClose={() => setConditionModal(prev => ({ ...prev, isOpen: false }))}
          target={conditionModal.ruleType === 'create' ? 'create' : 'clear'}
          ruleKey={conditionModal.ruleType === 'create' ? 'CRITICAL' : null}
          newAlarm={profileDetails?.profileData?.alarms?.[conditionModal.alarmIndex] || {
            alarmType: "",
            createRules: {},
            clearRule: { condition: { condition: [] } },
            propagate: false,
            propagateToOwner: false,
            propagateToOwnerHierarchy: false,
            propagateToTenant: false
          }}
          setNewAlarm={(updatedAlarm) => {
            setProfileDetails((prev: any) => {
              const next = JSON.parse(JSON.stringify(prev || { profileData: { alarms: [] } }));
              if (next.profileData?.alarms?.[conditionModal.alarmIndex]) {
                next.profileData.alarms[conditionModal.alarmIndex] = updatedAlarm;
              }
              return next;
            });
          }}
          profileId={selectedRow?.id.id}
        />

        {/* Pagination */}
        <Flex p={3} borderTop="1px" borderColor={border} align="center" gap={3} flexWrap="wrap">
          <HStack spacing={2}>
            <Text fontSize="sm">Items per page:</Text>
            <Select size="sm" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} w="80px">
              {[10, 20, 30, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </Select>
          </HStack>
          <Spacer />
          <HStack spacing={3}>
            <Text fontSize="sm">
              {effectiveTotal === 0 ? "0 – 0 of 0"
                : `${(pageSafe - 1) * pageSize + 1} – ${Math.min(pageSafe * pageSize, totalCount)} of ${totalCount}`}
            </Text>
            <HStack>
              <IconButton aria-label="First" icon={<FiChevronsLeft />} size="sm" variant="ghost"
                onClick={() => setPage(1)} isDisabled={pageSafe === 1} />
              <IconButton aria-label="Prev" icon={<FiChevronLeft />} size="sm" variant="ghost"
                onClick={() => setPage(p => Math.max(1, p - 1))} isDisabled={pageSafe === 1} />
              <IconButton aria-label="Next" icon={<FiChevronRight />} size="sm" variant="ghost"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} isDisabled={pageSafe === totalPages} />
              <IconButton aria-label="Last" icon={<FiChevronsRight />} size="sm" variant="ghost"
                onClick={() => setPage(totalPages)} isDisabled={pageSafe === totalPages} />
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default AlarmProfileRule;
