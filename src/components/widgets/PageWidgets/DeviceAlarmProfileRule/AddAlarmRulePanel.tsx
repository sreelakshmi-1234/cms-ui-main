import React, { useEffect, useState } from "react";
import {
  Box, Checkbox, Flex, HStack, IconButton, Spacer, Text, useColorModeValue,
  Input, Select, Button, Collapse
} from "@chakra-ui/react";
import { FiPlus, FiTrash2, FiEdit3, FiMinusCircle } from "react-icons/fi";
import { GetDeviceProfileDevicesAttributeByIdAPI, GetDeviceProfileDevicesTimeseriesByIdAPI } from "../../../../api/DeviceProfile/DeviceProfileAPI";
import EditAlarmRuleConditionModal from "./EditAlarmRuleConditionModal";

type FilterRow = { operation: string; ignoreCase: boolean; value: string };
type KeyFilter = { name: string; type: string; valueType?: string; filters?: FilterRow[] };
type ConditionType = "Simple" | "Duration" | "Repeating";

const opMap: Record<string, string> = {
  equal: "EQUAL",
  "not equal": "NOT_EQUAL",
  "starts with": "STARTS_WITH",
  
  "ends with": "ENDS_WITH",
  contains: "CONTAINS",
  "not contains": "NOT_CONTAINS",
  greater: "GREATER",
  less: "LESS",
  "less or equal": "LESS_OR_EQUAL",
  "greater or equal": "GREATER_OR_EQUAL"
};

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
interface AddAlarmRulePanelProps {
  newAlarm: NewAlarmType;
  setNewAlarm: React.Dispatch<React.SetStateAction<NewAlarmType>>;
  onSave: () => void;
  onCancel: () => void;
  selectedRow?: { id: { id: string } } | null;
}

/* ---------------- helpers ---------------- */
const friendlyOp = (op: string) => (op || "EQUAL").toLowerCase().replace(/_/g, " ");

const isMeaningfulCond = (c: any) => {
  const key = c?.key?.key?.trim?.() ?? "";
  const valRaw = c?.predicate?.value?.defaultValue;
  const val = valRaw === 0 ? "0" : (valRaw ?? "");
  return key.length > 0 || String(val).trim().length > 0;
};
const countMeaningful = (rule: AlarmRule) =>
  (rule?.condition?.condition ?? []).filter(isMeaningfulCond).length;

/* ----------------------------------------------------------------
 * AddAlarmRulePanel
 * ---------------------------------------------------------------- */
const AddAlarmRulePanel: React.FC<AddAlarmRulePanelProps> = ({
  newAlarm, setNewAlarm, onSave, onCancel, selectedRow
}) => {
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  const subBorder = useColorModeValue("gray.300", "whiteAlpha.400");
  const headerBg = useColorModeValue("white", "black");

  // Advanced settings
  const [advOpen, setAdvOpen] = useState(true);

  // Clear section collapsed by default
  const [clearOpen, setClearOpen] = useState(false);

  // Shared Condition Modal
  type ModalTarget = { open: boolean; target: "create" | "clear"; ruleKey?: string | null };
  const [condModal, setCondModal] = useState<ModalTarget>({ open: false, target: "create", ruleKey: null });
  
  const [keyFilters, setKeyFilters] = useState<KeyFilter[]>([]);
  const [conditionType, setConditionType] = useState<ConditionType>("Simple");
  const [durationValue, setDurationValue] = useState(5);
  const [durationUnit, setDurationUnit] = useState<"seconds" | "minutes" | "hours">("minutes");
  const [repeatTimes, setRepeatTimes] = useState(3);

  const openCreateCondModal = (ruleKey: string) => {
    setCondModal({ open: true, target: "create", ruleKey });
  };
  const openClearCondModal = () => {
    if (!clearOpen) setClearOpen(true); // ensure panel visible
    setCondModal({ open: true, target: "clear", ruleKey: null });
  };
  const closeCondModal = () => setCondModal(p => ({ ...p, open: false }));

  /* ---------- Add Key Filter popup state ---------- */
  const [isAddKFOpen, setAddKFOpen] = useState(false);
  const [kfType, setKfType] = useState<"ATTRIBUTE" | "TIMESERIES" | "CONSTANT">("ATTRIBUTE");
  const [kfName, setKfName] = useState("");
  const [kfValueType, setKfValueType] = useState<"STRING" | "NUMBER" | "BOOLEAN" | "DATETIME">("STRING");
  const [keyOptions, setKeyOptions] = useState<string[]>([]);
  const [isLoadingKeys, setIsLoadingKeys] = useState(false);
  const [isSavingCondition, setIsSavingCondition] = useState(false);

  // filters inside the Add Key Filter popup
  const [tempFilters, setTempFilters] = useState<FilterRow[]>([]);
  const [editKFIndex, setEditKFIndex] = useState<number | null>(null);

  const addTempFilterRow = () =>
    setTempFilters(prev => [...prev, { operation: "starts with", ignoreCase: false, value: "" }]);
  const updateTempFilterRow = (idx: number, patch: Partial<FilterRow>) =>
    setTempFilters(prev => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  const removeTempFilterRow = (idx: number) =>
    setTempFilters(prev => prev.filter((_, i) => i !== idx));

  // ---------- NEW: fetch keys from backend based on key type ----------
  const profileId = selectedRow?.id?.id;

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

      const list = normalizeToStringList(res);
      setKeyOptions(list);
    } catch (e) {
      console.error("fetchKeys error:", e);
      setKeyOptions([]);
    } finally {
      setIsLoadingKeys(false);
    }
  };

  // when modal open
  useEffect(() => {
    if (isAddKFOpen && kfType !== "CONSTANT") fetchKeys(kfType as "ATTRIBUTE" | "TIMESERIES");
    // eslint-disable-next-line
  }, [isAddKFOpen]);

  // when key type changes
  useEffect(() => {
    setKfName(""); setKeyOptions([]);
    if (isAddKFOpen && kfType !== "CONSTANT") fetchKeys(kfType as "ATTRIBUTE" | "TIMESERIES");
    // eslint-disable-next-line
  }, [kfType]);

  // when profile changes
  useEffect(() => {
    if (isAddKFOpen && kfType !== "CONSTANT") fetchKeys(kfType as "ATTRIBUTE" | "TIMESERIES");
    // eslint-disable-next-line
  }, [profileId]);

  const openAddKeyFilter = () => {
    setEditKFIndex(null);
    setKfType("TIMESERIES");
    setKfName("");
    setKfValueType("NUMBER");
    setTempFilters([{ operation: "less or equal", ignoreCase: false, value: "0" }]);
    setAddKFOpen(true);
  };
  const openEditKeyFilter = (idx: number) => {
    const kf = keyFilters[idx];
    setEditKFIndex(idx);
    setKfType(kf.type as any); setKfName(kf.name);
    setKfValueType((kf.valueType as any) || "STRING");
    setTempFilters(kf.filters?.length ? kf.filters : [{ operation: "equal", ignoreCase: false, value: "" }]);
    setAddKFOpen(true);
  };
  const closeAddKeyFilter = () => setAddKFOpen(false);

  const confirmAddKeyFilter = () => {
    if (!kfName.trim()) return;
    const newKF: KeyFilter = { name: kfName.trim(), type: kfType, valueType: kfValueType, filters: tempFilters };
    setKeyFilters(prev => {
      const next = [...prev];
      if (editKFIndex === null) next.push(newKF); else next[editKFIndex] = newKF;
      return next;
    });
    closeAddKeyFilter();
  };

  const updateKeyFilter = (idx: number, field: keyof KeyFilter, value: string) => {
    setKeyFilters(prev => { const next = [...prev]; next[idx] = { ...next[idx], [field]: value }; return next; });
  };
  const removeKeyFilter = (idx: number) => setKeyFilters(prev => prev.filter((_, i) => i !== idx));

  const handleModalSave = async () => {
    const firstKF = keyFilters[0];
    const keyName = firstKF?.name?.trim() || "";
    const firstRow = firstKF?.filters?.[0];
    const operation = firstRow ? (opMap[firstRow.operation] ?? "EQUAL") : "EQUAL";
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
    if (condModal.target === "create") {
      const ruleKey = condModal.ruleKey!;
      (updated.createRules[ruleKey] ??= { condition: { condition: [] } }).condition.condition.push(condition);
    } else {
      (updated.clearRule ??= { condition: { condition: [] } } as any).condition.condition.push(condition);
    }

    setNewAlarm(updated);

    // Update local state only. Do not call backend API (changes will be saved when caller persists).
    setIsSavingCondition(true);
    try {
      // no network call here by design
    } finally { setIsSavingCondition(false); closeCondModal(); }
  };

  useEffect(() => {
    if (Object.keys(newAlarm.createRules).length === 0) {
      const updated: NewAlarmType = JSON.parse(JSON.stringify(newAlarm));
      updated.createRules["CRITICAL"] = { condition: { condition: [] } };
      setNewAlarm(updated);
    }
    // eslint-disable-next-line
  }, []);

  const addCreateRuleCard = () => {
    const key = `UNSET_${Date.now()}`;
    const updated: NewAlarmType = JSON.parse(JSON.stringify(newAlarm));
    updated.createRules[key] = { condition: { condition: [] } };
    setNewAlarm(updated);
  };
  const removeCreateRuleCard = (ruleKey: string) => {
    const updated: NewAlarmType = JSON.parse(JSON.stringify(newAlarm));
    delete (updated.createRules as any)[ruleKey];
    if (Object.keys(updated.createRules).length === 0) {
      updated.createRules[`UNSET_${Date.now()}`] = { condition: { condition: [] } };
    }
    setNewAlarm(updated);
  };
  const resetClearRule = () => {
    const updated = JSON.parse(JSON.stringify(newAlarm)) as NewAlarmType;
    updated.clearRule.condition.condition = [];
    setNewAlarm(updated);
  };

  const ConditionPreviewChips = ({ cond }: { cond: AlarmCondition }) => {
    const val = cond?.predicate?.value?.defaultValue ?? "";
    const boolish = String(val).toLowerCase();
    const prettyValue = boolish === "true" ? "True" : boolish === "false" ? "False" : String(val);
    return (
      <HStack spacing={2} wrap="wrap">
        <Box as="span" className="chakra-tag" data-theme="" style={{fontSize:"12px", padding:"2px 6px", borderRadius:4, background:"var(--chakra-colors-gray-200)"}}>
          {cond?.key?.key || "key"}
        </Box>
        <Text fontSize="sm">{friendlyOp(cond?.predicate?.operation)}</Text>
        <Box as="span" className="chakra-tag" data-theme="" style={{fontSize:"12px", padding:"2px 6px", borderRadius:4, background:"var(--chakra-colors-red-100)"}}>
          {prettyValue === "" ? '""' : prettyValue}
        </Box>
        {cond?.predicate?.ignoreCase ? (<><Text fontSize="sm">•</Text><Text fontSize="sm">ignore case</Text></>) : null}
      </HStack>
    );
  };

  const CreateRuleRow = ({ ruleKey, ruleObj }: { ruleKey: string; ruleObj: AlarmRule }) => {
    const isPlaceholder = ruleKey.startsWith("UNSET_");
    const firstCond = (ruleObj.condition.condition || []).find(isMeaningfulCond);

    return (
      <Flex borderWidth="1px" borderColor={subBorder} borderRadius="md" p={3} mb={3} align="stretch" gap={3}>
        <Box w="240px" borderWidth="1px" borderColor={subBorder} borderRadius="md" p={2}>
          <Text fontSize="xs" color="gray.600" mb={1}>Severity</Text>
          <Select
            placeholder={isPlaceholder ? "Select alarm severity..." : undefined}
            value={isPlaceholder ? "" : ruleKey}
            onChange={(e) => {
              const val = e.target.value;
              const updated: NewAlarmType = JSON.parse(JSON.stringify(newAlarm));
              updated.createRules[val] = updated.createRules[ruleKey] || { condition: { condition: [] } };
              delete (updated.createRules as any)[ruleKey];
              setNewAlarm(updated);
            }}
          >
            <option value="CRITICAL">Critical</option>
            <option value="MAJOR">Major</option>
            <option value="MINOR">Minor</option>
            <option value="WARNING">Warning</option>
            <option value="INDETERMINATE">Indeterminate</option>
          </Select>
        </Box>

        <Box flex="1" borderWidth="1px" borderColor={subBorder} borderRadius="md" p={3}>
          <Flex align="center" gap={3} mb={3}>
            <Text w="100px" color="gray.600" fontSize="sm">Condition:</Text>
            {firstCond ? <ConditionPreviewChips cond={firstCond} /> : <Text fontSize="sm" color="red.300">Please add alarm rule condition</Text>}
            <IconButton aria-label="edit-condition" icon={<FiEdit3 />} size="sm" variant="ghost" onClick={() => openCreateCondModal(ruleKey)} />
          </Flex>

          <Flex align="center" gap={3} mb={3}>
            <Text w="100px" color="gray.600" fontSize="sm">Schedule:</Text>
            <Text fontSize="sm" fontWeight="semibold">Active all the time</Text>
            <IconButton aria-label="edit-schedule" icon={<FiEdit3 />} size="sm" variant="ghost" />
          </Flex>

          <Flex align="center" gap={3} mb={3}>
            <Text w="100px" color="gray.600" fontSize="sm">Additional info:</Text>
            <IconButton aria-label="add-info" icon={<FiPlus />} size="sm" variant="ghost" />
          </Flex>

          <Box>
            <Flex align="center" gap={3}>
              <Text w="100px" color="gray.600" fontSize="sm">Mobile dashboard:</Text>
              <Input isReadOnly value={"No dashboard selected"} pointerEvents="none" _readOnly={{ opacity: 0.9 }} w="340px" />
            </Flex>
            <Text fontSize="xs" color="gray.500" ml="100px" mt={1}>
              Used by mobile application as an alarm details dashboard
            </Text>
          </Box>
        </Box>

        <Flex align="center">
          <IconButton aria-label="delete-create-rule" icon={<FiMinusCircle />} variant="outline" size="sm" borderRadius="full" onClick={() => removeCreateRuleCard(ruleKey)} />
        </Flex>
      </Flex>
    );
  };

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden">
      <Flex p={3} borderBottom="1px" borderColor={border} align="center" bg={headerBg}>
        <Text fontWeight={600}>{newAlarm.alarmType || "Alarm"}</Text><Spacer />
        <Text color="gray.600" fontSize="sm" cursor="pointer" onClick={() => setAdvOpen(s => !s)}>
          {advOpen ? "Advanced settings ▲" : "Advanced settings ▼"}
        </Text>
      </Flex>

      <Box p={0}>
        {/* Alarm type + Advanced settings */}
        <Box borderBottom="1px" borderColor={border} p={4}>
          <Text fontSize="xs" color="gray.500" mb={1}>Alarm type*</Text>
          <Input placeholder="Enter alarm type" value={newAlarm.alarmType} onChange={(e) => setNewAlarm(a => ({ ...a, alarmType: e.target.value }))} />
          <Collapse in={advOpen}>
            <Box mt={3}>
              <Checkbox isChecked={newAlarm.propagate} onChange={(e)=>setNewAlarm(a=>({...a,propagate:e.target.checked}))} mb={2}>Propagate alarm to related entities</Checkbox><br/>
              <Checkbox isChecked={newAlarm.propagateToOwner} onChange={(e)=>setNewAlarm(a=>({...a,propagateToOwner:e.target.checked}))} mb={2}>Propagate alarm to entity owner (Customer or Tenant)</Checkbox><br/>
              <Checkbox isChecked={newAlarm.propagateToOwnerHierarchy} onChange={(e)=>setNewAlarm(a=>({...a,propagateToOwnerHierarchy:e.target.checked}))} mb={2}>Propagate alarm to entity owners hierarchy</Checkbox><br/>
              <Checkbox isChecked={newAlarm.propagateToTenant} onChange={(e)=>setNewAlarm(a=>({...a,propagateToTenant:e.target.checked}))}>Propagate alarm to Tenant</Checkbox>
            </Box>
          </Collapse>
        </Box>

        {/* Create rules */}
        <Box borderBottom="1px" borderColor={border} p={4}>
          <Text fontWeight={600} mb={3}>Create alarm rules</Text>
          {Object.entries(newAlarm.createRules).map(([k, v]) => (<CreateRuleRow key={k} ruleKey={k} ruleObj={v} />))}
          <Button size="sm" leftIcon={<FiPlus />} variant="outline" onClick={addCreateRuleCard}>Add create condition</Button>
        </Box>

        {/* Clear rule */}
        <Box p={4}>
          <Text fontWeight={600} mb={3}>Clear alarm rule</Text>

          {!clearOpen ? (
            <Button size="sm" leftIcon={<FiPlus />} variant="outline" onClick={() => setClearOpen(true)}>
              Add clear condition
            </Button>
          ) : (
            <Flex borderWidth="1px" borderColor={subBorder} borderRadius="md" p={3} align="stretch" gap={3}>
              <Box flex="1" borderWidth="1px" borderColor={subBorder} borderRadius="md" p={3}>
                <Flex align="center" gap={3} mb={3}>
                  <Text w="100px" color="gray.600" fontSize="sm">Condition:</Text>
                  <Text fontSize="sm" color={newAlarm.clearRule.condition.condition.length ? "gray.700" : "red.300"}>
                    {newAlarm.clearRule.condition.condition.length ? `${countMeaningful(newAlarm.clearRule)} condition(s)` : "Please add alarm rule condition"}
                  </Text>
                  <IconButton aria-label="open-clear-cond-modal" icon={<FiPlus />} size="sm" variant="ghost" onClick={openClearCondModal} />
                </Flex>
                <Flex align="center" gap={3} mb={3}>
                  <Text w="100px" color="gray.600" fontSize="sm">Schedule:</Text>
                  <Text fontSize="sm" fontWeight="semibold">Active all the time</Text>
                  <IconButton aria-label="edit-schedule" icon={<FiEdit3 />} size="sm" variant="ghost" />
                </Flex>
                <Flex align="center" gap={3} mb={3}>
                  <Text w="100px" color="gray.600" fontSize="sm">Additional info:</Text>
                  <IconButton aria-label="add-info" icon={<FiPlus />} size="sm" variant="ghost" />
                </Flex>
                <Box>
                  <Flex align="center" gap={3}>
                    <Text w="100px" color="gray.600" fontSize="sm">Mobile dashboard:</Text>
                    <Input isReadOnly value={"No dashboard selected"} pointerEvents="none" _readOnly={{ opacity: 0.9 }} w="340px" />
                  </Flex>
                  <Text fontSize="xs" color="gray.500" ml="100px" mt={1}>Used by mobile application as an alarm details dashboard</Text>
                </Box>
              </Box>
              <Flex align="center" gap={2}>
                <IconButton
                  aria-label="collapse-clear-rule"
                  title="Collapse"
                  icon={<FiMinusCircle />}
                  variant="outline"
                  size="sm"
                  borderRadius="full"
                  onClick={() => setClearOpen(false)}
                />
                <IconButton
                  aria-label="reset-clear-rule"
                  title="Reset"
                  icon={<FiTrash2 />}
                  variant="outline"
                  size="sm"
                  borderRadius="full"
                  onClick={resetClearRule}
                />
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>

      <EditAlarmRuleConditionModal
        isOpen={condModal.open}
        onClose={closeCondModal}
        target={condModal.target}
        ruleKey={condModal.ruleKey}
        newAlarm={newAlarm}
        setNewAlarm={setNewAlarm}
        profileId={profileId}
      />
    </Box>
  );
};

export default AddAlarmRulePanel;
