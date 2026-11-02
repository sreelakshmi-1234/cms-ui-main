import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Flex, HStack, IconButton, Text, Input, Select, Button, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  CloseButton, Collapse, Table, Thead, Tr, Th, Tbody, Td, Spinner,
  useColorModeValue, Checkbox, Tag, TagLabel
} from "@chakra-ui/react";
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import AddKeyFilterModal, { ComplexItem, FilterRow } from "./AddKeyFilterModal";
import {
  GetDeviceProfileDevicesAttributeByIdAPI,
  GetDeviceProfileDevicesTimeseriesByIdAPI
} from "../../../../api/DeviceProfile/DeviceProfileAPI";

/* ---------------- types ---------------- */
type AlarmCondition = {
  key: { key: string };
  predicate: {
    operation: string;
    value: { defaultValue: string };
    ignoreCase?: boolean;
  };
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

export type KeyFilter = {
  name: string;
  type: "ATTRIBUTE" | "TIMESERIES" | "CONSTANT";
  valueType?: "STRING" | "NUMBER" | "BOOLEAN" | "DATETIME";
  filters?: FilterRow[];
  // store complex groups only for preview (not used in save)
  complexGroups?: Array<ComplexItem & { kind: "GROUP" }>;
};

type ConditionType = "Simple" | "Duration" | "Repeating";

interface EditAlarmRuleConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: "create" | "clear";
  ruleKey: string | null | undefined;
  newAlarm: NewAlarmType;
  setNewAlarm: React.Dispatch<React.SetStateAction<NewAlarmType>>;
  profileId?: string;
}

const opMap: Record<string, string> = {
  equal: "EQUAL",
  "not equal": "NOT_EQUAL",
  "starts with": "STARTS_WITH",
  "ends with": "ENDS_WITH",
  contains: "CONTAINS",
  "not contains": "NOT_CONTAINS",
  "greater than": "GREATER",
  "less than": "LESS",
  "less or equal": "LESS_OR_EQUAL",
  "greater or equal": "GREATER_OR_EQUAL"
};
const friendly = (op: string) => (op || "EQUAL").toLowerCase().replace(/_/g, " ");

export const EditAlarmRuleConditionModal: React.FC<EditAlarmRuleConditionModalProps> = ({
  isOpen,
  onClose,
  target,
  ruleKey,
  newAlarm,
  setNewAlarm,
  profileId
}) => {
  const [keyFiltersOpen, setKeyFiltersOpen] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(true);

  const [keyFilters, setKeyFilters] = useState<KeyFilter[]>([]);
  const [conditionType, setConditionType] = useState<ConditionType>("Simple");
  const [durationValue, setDurationValue] = useState(5);
  const [durationUnit, setDurationUnit] = useState<"seconds" | "minutes" | "hours">("minutes");
  const [repeatTimes, setRepeatTimes] = useState(3);

  /* ---------- Add Key Filter popup state ---------- */
  const [isAddKFOpen, setAddKFOpen] = useState(false);
  const [kfType, setKfType] = useState<"ATTRIBUTE" | "TIMESERIES" | "CONSTANT">("ATTRIBUTE");
  const [kfName, setKfName] = useState("");
  const [kfValueType, setKfValueType] = useState<"STRING" | "NUMBER" | "BOOLEAN" | "DATETIME">("STRING");
  const [keyOptions, setKeyOptions] = useState<string[]>([]);
  const [isLoadingKeys, setIsLoadingKeys] = useState(false);
  const [isSavingCondition, setIsSavingCondition] = useState(false);

  // filters inside the Add Key Filter popup (simple)
  const [tempFilters, setTempFilters] = useState<FilterRow[]>([]);
  const [editKFIndex, setEditKFIndex] = useState<number | null>(null);

  /* ---------------- fetch keys helpers ---------------- */
  const normalizeToStringList = (res: any): string[] => {
    if (Array.isArray(res)) return res.filter(v => typeof v === "string");
    if (Array.isArray(res?.data)) return res.data.filter((v: any) => typeof v === "string");
    if (Array.isArray(res?.keys)) return res.keys.filter((v: any) => typeof v === "string");
    return Object.values(res || {}).filter((v) => typeof v === "string") as string[];
  };

  const fetchKeys = async (type: "ATTRIBUTE" | "TIMESERIES") => {
    if (!profileId) { setKeyOptions([]); return; }
    setIsLoadingKeys(true);
    try {
      const res = type === "ATTRIBUTE"
        ? await GetDeviceProfileDevicesAttributeByIdAPI(profileId)
        : await GetDeviceProfileDevicesTimeseriesByIdAPI(profileId);
      setKeyOptions(normalizeToStringList(res));
    } catch {
      setKeyOptions([]);
    } finally {
      setIsLoadingKeys(false);
    }
  };

  useEffect(() => {
    if (isAddKFOpen && kfType !== "CONSTANT") fetchKeys(kfType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddKFOpen, kfType, profileId]);

  /* Load existing conditions when modal opens */
  useEffect(() => {
    if (!isOpen) return;

    // Get the rule (either create or clear)
    const rule = target === "create" 
      ? newAlarm.createRules?.[ruleKey || "CRITICAL"]
      : newAlarm.clearRule;

    const conditions = rule?.condition?.condition || [];

    if (conditions.length === 0) {
      // No existing conditions, start fresh
      setKeyFilters([]);
      return;
    }

    // Convert each condition to a KeyFilter
    const loadedFilters: KeyFilter[] = conditions.map((cond: AlarmCondition) => {
      const keyName = cond.key?.key || "";
      const operation = friendly(cond.predicate?.operation || "EQUAL");
      const defaultValue = cond.predicate?.value?.defaultValue ?? "";

      return {
        name: keyName,
        type: "TIMESERIES", // Default to TIMESERIES (you can enhance this if needed)
        valueType: "STRING",
        filters: [{
          operation,
          ignoreCase: !!cond.predicate?.ignoreCase,
          value: defaultValue
        }]
      };
    });

    setKeyFilters(loadedFilters);
  }, [isOpen, target, ruleKey, newAlarm]);

  /* ---------------- open/close add key filter ---------------- */
  const openAddKeyFilter = () => {
    setEditKFIndex(null);
    // Default the modal with something useful
    setKfType("TIMESERIES");
    setKfName("");
    setKfValueType("NUMBER");
    setTempFilters([{ operation: "less or equal", ignoreCase: false, value: "0" }]);
    setAddKFOpen(true);
  };

  const openEditKeyFilter = (idx: number) => {
    const kf = keyFilters[idx];
    setEditKFIndex(idx);
    setKfType(kf.type);
    setKfName(kf.name);
    setKfValueType(kf.valueType || "STRING");
    setTempFilters(kf.filters?.length ? kf.filters : [{ operation: "equal", ignoreCase: false, value: "" }]);
    setAddKFOpen(true);
  };

  const closeAddKeyFilter = () => setAddKFOpen(false);

  /** onConfirm now receives simple filters and complexGroups for preview */
  const confirmAddKeyFilter = (payload?: {
    name: string;
    type: "ATTRIBUTE" | "TIMESERIES" | "CONSTANT";
    valueType: "STRING" | "NUMBER" | "BOOLEAN" | "DATETIME";
    filters: FilterRow[];
    complexGroups?: Array<ComplexItem & { kind: "GROUP" }>;
  }) => {
    // fallback to previous behavior if no payload provided
    const name = payload?.name ?? kfName;
    const type = payload?.type ?? kfType;
    const valueType = payload?.valueType ?? kfValueType;
    const filters = payload?.filters ?? tempFilters;
    const complexGroups = payload?.complexGroups ?? [];

    if (!name.trim()) return;

    const newKF: KeyFilter = { name: name.trim(), type, valueType, filters, complexGroups };
    setKeyFilters(prev => {
      const copy = [...prev];
      if (editKFIndex === null) copy.push(newKF);
      else copy[editKFIndex] = newKF;
      return copy;
    });
    closeAddKeyFilter();
  };

  const removeKeyFilter = (idx: number) =>
    setKeyFilters(prev => prev.filter((_, i) => i !== idx));

  /* ---------------- SAVE to parent (first filter only, as before) ---------------- */
  const handleModalSave = async () => {
    const firstKF = keyFilters[0];
    const keyName = firstKF?.name?.trim() || "";
    const firstRow = firstKF?.filters?.[0];
    const operation = firstRow ? opMap[firstRow.operation] ?? "EQUAL" : "EQUAL";
    const defaultValue = firstRow?.value ?? "";

    const condition: AlarmCondition = {
      key: { key: keyName },
      predicate: {
        operation,
        value: { defaultValue },
        ...(firstRow ? { ignoreCase: !!firstRow.ignoreCase } : {})
      }
    };

    if (conditionType === "Duration") (condition as any).duration = { value: durationValue, unit: durationUnit };
    if (conditionType === "Repeating") (condition as any).repeat = { times: repeatTimes };

    const updated: NewAlarmType = JSON.parse(JSON.stringify(newAlarm));
    if (target === "create") {
      (updated.createRules[ruleKey!] ??= { condition: { condition: [] } }).condition.condition.push(condition);
    } else {
      (updated.clearRule ??= { condition: { condition: [] } } as any).condition.condition.push(condition);
    }

    setNewAlarm(updated);

    setIsSavingCondition(true);
    try {
      // no network call here
    } finally { setIsSavingCondition(false); onClose(); }
  };

  /* ---------------- Filter preview builder ---------------- */
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");

  // Render ONE simple filter chip group -> [<Tag key>, text, <Tag value>]
  const SimpleFilterChips: React.FC<{ kname: string; row: FilterRow }> = ({ kname, row }) => {
    // Value display (quote strings like your screenshot)
    const raw = row.value ?? "";
    const val =
      typeof raw === "string" && raw !== "" ? `'${raw}'` : String(raw ?? "");

    return (
      <HStack spacing={2} wrap="wrap">
        <Tag size="sm" variant="subtle" colorScheme="blue"><TagLabel>{kname}</TagLabel></Tag>
        <Text fontSize="sm">{friendly(row.operation)}</Text>
        <Tag size="sm" variant="subtle" colorScheme="orange"><TagLabel>{val}</TagLabel></Tag>
      </HStack>
    );
  };

  // Recursively render a complex group for the same key
  const ComplexGroupPreview: React.FC<{ kname: string; group: ComplexItem & { kind: "GROUP" } }> = ({ kname, group }) => {
    // Build a flat sequence: chip + "and/or" + chip...
    const parts: React.ReactNode[] = [];
    group.items.forEach((it, idx) => {
      if (idx > 0) parts.push(<Text key={`sep-${idx}`} fontSize="sm" mx={2}>{group.op}</Text>);
      if (it.kind === "SIMPLE") {
        parts.push(<SimpleFilterChips key={`s-${idx}`} kname={kname} row={it.filter} />);
      } else {
        parts.push(
          <Box key={`g-${idx}`} border="1px" borderColor={borderCol} rounded="md" px={2} py={1}>
            <ComplexGroupPreview kname={kname} group={it} />
          </Box>
        );
      }
    });
    return <HStack spacing={1} wrap="wrap">{parts}</HStack>;
  };

  const previewNodes = useMemo(() => {
    if (!keyFilters.length) return null;
    const nodes: React.ReactNode[] = [];
    keyFilters.forEach((kf, i) => {
      // simple filters
      (kf.filters || []).forEach((row, idx) => {
        if (i > 0 || idx > 0) nodes.push(<Text key={`and-${i}-${idx}`} fontSize="sm" mx={2}>and</Text>);
        nodes.push(<SimpleFilterChips key={`sf-${i}-${idx}`} kname={kf.name} row={row} />);
      });
      // complex groups
      (kf.complexGroups || []).forEach((g, gi) => {
        if ((kf.filters?.length || 0) > 0 || gi > 0 || i > 0) {
          nodes.push(<Text key={`and-c-${i}-${gi}`} fontSize="sm" mx={2}>and</Text>);
        }
        nodes.push(<ComplexGroupPreview key={`cg-${i}-${gi}`} kname={kf.name} group={g} />);
      });
    });
    return <HStack spacing={1} wrap="wrap">{nodes}</HStack>;
  }, [keyFilters, borderCol]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={3} bg={useColorModeValue("blue.600","blue.700")} color="white">Edit alarm rule condition</ModalHeader>
          <CloseButton position="absolute" right="12px" top="12px" onClick={onClose} color="white" />
          <ModalBody p={4}>
            {/* Key filters */}
            <Box borderWidth="1px" borderRadius="md" mb={4}>
              <Flex px={3} py={2} borderBottomWidth="1px" align="center" justify="space-between" cursor="pointer" onClick={()=>setKeyFiltersOpen(s=>!s)}>
                <Text fontWeight="semibold">Key filters</Text>{keyFiltersOpen ? <FiChevronUp/> : <FiChevronDown/>}
              </Flex>
              <Collapse in={keyFiltersOpen}>
                <Box p={3}>
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Key name</Th>
                        <Th w="200px">Key type</Th>
                        <Th w="96px"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {keyFilters.length===0 ? (
                        <Tr><Td colSpan={3}><Text color="gray.500">No key filters added</Text></Td></Tr>
                      ) : keyFilters.map((kf, i) => (
                        <Tr key={i}>
                          <Td>{kf.name}</Td>
                          <Td>{kf.type}</Td>
                          <Td>
                            <HStack justify="flex-end">
                              <Button size="xs" variant="ghost" onClick={()=>openEditKeyFilter(i)}>Edit</Button>
                              <IconButton aria-label="remove-filter" icon={<FiTrash2/>} size="sm" variant="ghost" onClick={()=>removeKeyFilter(i)} />
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Button mt={3} size="sm" leftIcon={<FiPlus />} onClick={openAddKeyFilter}>Add key filter</Button>
                </Box>
              </Collapse>
            </Box>

            {/* Filter preview */}
            <Box borderWidth="1px" borderRadius="md" mb={4}>
              <Flex px={3} py={2} borderBottomWidth="1px" align="center" justify="space-between" cursor="pointer" onClick={()=>setPreviewOpen(s=>!s)}>
                <Text fontWeight="semibold">Filter preview</Text>{previewOpen ? <FiChevronUp/> : <FiChevronDown/>}
              </Flex>
              <Collapse in={previewOpen}>
                <Box p={3} borderColor={borderCol}>
                  {previewNodes ? previewNodes : <Text color="gray.500">No conditions configured</Text>}
                </Box>
              </Collapse>
            </Box>

            {/* Condition meta */}
            <Box borderWidth="1px" borderRadius="md">
              <Flex px={3} py={2} borderBottomWidth="1px" align="center" justify="space-between">
                <Text>Condition type</Text>
                <Select value={conditionType} onChange={(e)=>setConditionType(e.target.value as ConditionType)} w="200px" size="sm">
                  <option value="Simple">Simple</option>
                  <option value="Duration">Duration</option>
                  <option value="Repeating">Repeating</option>
                </Select>
              </Flex>
              {conditionType==="Duration" && (
                <Box p={3} borderTopWidth="1px">
                  <Flex align="center" gap={3}>
                    <Text>Duration:</Text>
                    <Input type="number" value={durationValue} onChange={(e)=>setDurationValue(Number(e.target.value))} size="sm" w="100px" />
                    <Select value={durationUnit} onChange={(e)=>setDurationUnit(e.target.value as any)} size="sm" w="120px">
                      <option value="seconds">Seconds</option>
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                    </Select>
                  </Flex>
                </Box>
              )}
              {conditionType==="Repeating" && (
                <Box p={3} borderTopWidth="1px">
                  <Flex align="center" gap={3}>
                    <Text>Repeat:</Text>
                    <Input type="number" value={repeatTimes} onChange={(e)=>setRepeatTimes(Number(e.target.value))} size="sm" w="100px" />
                    <Text>times</Text>
                  </Flex>
                </Box>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleModalSave} isLoading={isSavingCondition}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add / Edit Key Filter */}
      <AddKeyFilterModal
        isOpen={isAddKFOpen}
        onClose={closeAddKeyFilter}
        kfType={kfType}
        setKfType={setKfType}
        kfName={kfName}
        setKfName={setKfName}
        kfValueType={kfValueType}
        setKfValueType={setKfValueType}
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        editKFIndex={editKFIndex}
        keyOptions={keyOptions}
        isLoadingKeys={isLoadingKeys}
        // NOTE: we now receive complexGroups here to power the preview
        onConfirm={(out) => {
          if (out) {
            confirmAddKeyFilter(out);
          } else {
            // fallback to legacy behavior
            confirmAddKeyFilter();
          }
        }}
      />
    </>
  );
};

export default EditAlarmRuleConditionModal;
