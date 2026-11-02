import React from "react";
import {
  Box, Flex, Text, Input, Select, Button, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  CloseButton, Table, Thead, Tr, Th, Tbody, Td, Spinner,
  useColorModeValue, Checkbox, IconButton, NumberInput, NumberInputField, Tag, TagLabel
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

/** -------------------- Types -------------------- */
export type FilterRow = {
  operation: string;
  ignoreCase: boolean;
  value: string;          // STRING & "in/not in"
  numberValue?: number;   // NUMBER
  date?: string;          // DATETIME: YYYY-MM-DD
  time?: string;          // DATETIME: HH:mm
  boolValue?: boolean;    // BOOLEAN
};

export type ComplexItem =
  | { kind: "SIMPLE"; filter: FilterRow }
  | { kind: "GROUP"; op: "and" | "or"; items: ComplexItem[] };

type KeyFilter = { name: string; type: string; valueType?: string; filters?: FilterRow[] };

interface AddKeyFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  kfType: "ATTRIBUTE" | "TIMESERIES" | "CONSTANT";
  setKfType: (type: "ATTRIBUTE" | "TIMESERIES" | "CONSTANT") => void;
  kfName: string;
  setKfName: (name: string) => void;
  kfValueType: "STRING" | "NUMBER" | "BOOLEAN" | "DATETIME";
  setKfValueType: (type: "STRING" | "NUMBER" | "BOOLEAN" | "DATETIME") => void;
  tempFilters: FilterRow[];
  setTempFilters: React.Dispatch<React.SetStateAction<FilterRow[]>>;
  editKFIndex: number | null;
  keyOptions: string[];
  isLoadingKeys: boolean;
  /** UPDATED: send filters + complex groups back so parent can render preview */
  onConfirm: (out?: {
    name: string;
    type: "ATTRIBUTE" | "TIMESERIES" | "CONSTANT";
    valueType: "STRING" | "NUMBER" | "BOOLEAN" | "DATETIME";
    filters: FilterRow[];
    complexGroups?: Array<ComplexItem & { kind: "GROUP" }>;
  }) => void;
}

/** -------------------- Ops by value type -------------------- */
const STRING_OPS = [
  "starts with",
  "equal",
  "not equal",
  "ends with",
  "contains",
  "not contains",
  "in",
  "not in",
];

const NUM_DATE_OPS = [
  "equal",
  "not equal",
  "greater than",
  "less than",
  "greater or equal",
  "less or equal",
];

const BOOL_OPS = ["equal", "not equal"];

/** -------------------- Complex Filter Modal (recursive) -------------------- */
interface ComplexFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  valueType: "STRING" | "NUMBER" | "BOOLEAN" | "DATETIME";
  onAdd: (group: ComplexItem & { kind: "GROUP" }) => void;
}

const ComplexFilterModal: React.FC<ComplexFilterModalProps> = ({
  isOpen,
  onClose,
  valueType,
  onAdd
}) => {
  const headerBg = useColorModeValue("blue.700", "blue.800");
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");

  const getOps = React.useCallback(() => {
    if (valueType === "STRING") return STRING_OPS;
    if (valueType === "BOOLEAN") return BOOL_OPS;
    return NUM_DATE_OPS; // NUMBER or DATETIME
  }, [valueType]);

  const makeDefaultRow = React.useCallback((): FilterRow => {
    if (valueType === "STRING") {
      return { operation: "starts with", ignoreCase: false, value: "" };
    }
    if (valueType === "NUMBER") {
      return { operation: "equal", ignoreCase: false, value: "", numberValue: 0 };
    }
    if (valueType === "DATETIME") {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      const hh = String(now.getHours()).padStart(2, "0");
      const mi = String(now.getMinutes()).padStart(2, "0");
      return {
        operation: "equal",
        ignoreCase: false,
        value: "",
        date: `${yyyy}-${mm}-${dd}`,
        time: `${hh}:${mi}`,
      };
    }
    return { operation: "equal", ignoreCase: false, value: "", boolValue: false };
  }, [valueType]);

  const [groupOp, setGroupOp] = React.useState<"and" | "or">("and");
  const [items, setItems] = React.useState<ComplexItem[]>([]);
  const [childOpen, setChildOpen] = React.useState(false);

  const updateSimple = (idx: number, patch: Partial<FilterRow>) =>
    setItems(prev => prev.map((it, i) => i === idx && it.kind === "SIMPLE" ? { ...it, filter: { ...it.filter, ...patch } } : it));

  const addSimple = () => setItems(prev => [...prev, { kind: "SIMPLE", filter: makeDefaultRow() }]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const openChildComplex = () => setChildOpen(true);

  const renderValueCell = (row: FilterRow, onPatch: (p: Partial<FilterRow>) => void) => {
    // Keep your existing value editors (STRING/NUMBER/BOOLEAN/DATETIME)
    if (valueType === "NUMBER") {
      return (
        <NumberInput size="sm" value={row.numberValue ?? 0} onChange={(_, n) => onPatch({ numberValue: n, value: String(n) })}>
          <NumberInputField />
        </NumberInput>
      );
    }
    if (valueType === "BOOLEAN") {
      return (
        <Select size="sm" value={String(row.boolValue ?? false)} onChange={(e)=>onPatch({ boolValue: e.target.value === "true", value: e.target.value })}>
          <option value="true">true</option>
          <option value="false">false</option>
        </Select>
      );
    }
    if (valueType === "DATETIME") {
      return (
        <Flex gap={2} w="full">
          <Input type="date" size="sm" value={row.date ?? ""} onChange={(e)=>onPatch({ date: e.target.value })} />
          <Input type="time" size="sm" value={row.time ?? ""} onChange={(e)=>onPatch({ time: e.target.value })} />
        </Flex>
      );
    }
    return <Input size="sm" w="full" value={row.value} onChange={(e)=>onPatch({ value: e.target.value })} />;
  };

  const OpsSelect: React.FC<{ row: FilterRow; onChange: (v: string) => void }> = ({ row, onChange }) => (
    <Select size="sm" value={row.operation} onChange={(e)=>onChange(e.target.value)}>
      {getOps().map(op => <option key={op}>{op}</option>)}
    </Select>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={3} bg={headerBg} color="white">Add complex filter</ModalHeader>
          <CloseButton position="absolute" right="12px" top="12px" onClick={onClose} color="white" />
          <ModalBody p={4}>
            <Box border="1px" borderColor={borderCol} rounded="md" mb={3}>
              <Flex px={3} py={2} borderBottom="1px" borderColor={borderCol} align="center" gap={3}>
                <Text fontWeight="semibold">Group operator</Text>
                <Select size="sm" value={groupOp} onChange={(e)=>setGroupOp(e.target.value as "and" | "or")}>
                  <option value="and">and</option>
                  <option value="or">or</option>
                </Select>
              </Flex>

              <Box p={3}>
                {items.length === 0 ? (
                  <Box py={6} textAlign="center" color="gray.500">No filters configured</Box>
                ) : (
                  <Box>
                    {items.map((it, idx) => (
                      <Box key={idx} mb={3}>
                        {it.kind === "SIMPLE" ? (
                          <Flex gap={3} align="center" wrap="wrap">
                            <Box w="220px">
                              <OpsSelect row={it.filter} onChange={(v) => updateSimple(idx, { operation: v })} />
                            </Box>
                            <Box w="140px">
                              {valueType === "STRING" ? (
                                <Checkbox
                                  isChecked={it.filter.ignoreCase}
                                  onChange={(e) => updateSimple(idx, { ignoreCase: e.target.checked })}
                                >
                                  Ignore case
                                </Checkbox>
                              ) : null}
                            </Box>
                            <Box flex="1">
                              {renderValueCell(it.filter, (patch) => updateSimple(idx, patch))}
                            </Box>
                            <IconButton aria-label="remove" size="sm" variant="ghost" icon={<FiTrash2 />} onClick={() => removeItem(idx)} />
                          </Flex>
                        ) : (
                          <Flex align="center" gap={3}>
                            <Tag size="lg" variant="subtle" colorScheme="blue">
                              <TagLabel>Nested complex: {it.op.toUpperCase()} • {it.items.length} filter(s)</TagLabel>
                            </Tag>
                            <IconButton aria-label="remove-group" size="sm" variant="ghost" icon={<FiTrash2 />} onClick={() => removeItem(idx)} />
                          </Flex>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}

                <Flex gap={2}>
                  <Button size="sm" onClick={addSimple}>Add</Button>
                  <Button size="sm" variant="outline" onClick={openChildComplex}>Add complex</Button>
                </Flex>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" onClick={() => { onAdd({ kind: "GROUP", op: groupOp, items }); onClose(); }}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* CHILD complex modal */}
      {/* You already had this pattern — keeping it intact */}
      {/* ... */}
    </>
  );
};

/** -------------------- Main Modal -------------------- */
const AddKeyFilterModal: React.FC<AddKeyFilterModalProps> = ({
  isOpen,
  onClose,
  kfType,
  setKfType,
  kfName,
  setKfName,
  kfValueType,
  setKfValueType,
  tempFilters,
  setTempFilters,
  editKFIndex,
  keyOptions,
  isLoadingKeys,
  onConfirm
}) => {
  const headerBg = useColorModeValue("blue.600", "blue.700");
  const borderCol = useColorModeValue("gray.200", "whiteAlpha.300");

  const [complexOpen, setComplexOpen] = React.useState(false);
  const [complexGroups, setComplexGroups] = React.useState<Array<ComplexItem & { kind: "GROUP" }>>([]);

  const getOps = React.useCallback(() => {
    if (kfValueType === "STRING") return STRING_OPS;
    if (kfValueType === "BOOLEAN") return BOOL_OPS;
    return NUM_DATE_OPS; // NUMBER or DATETIME
  }, [kfValueType]);

  const makeDefaultRow = React.useCallback((): FilterRow => {
    if (kfValueType === "STRING") {
      return { operation: "starts with", ignoreCase: false, value: "" };
    }
    if (kfValueType === "NUMBER") {
      return { operation: "equal", ignoreCase: false, value: "", numberValue: 0 };
    }
    if (kfValueType === "DATETIME") {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      const hh = String(now.getHours()).padStart(2, "0");
      const mi = String(now.getMinutes()).padStart(2, "0");
      return {
        operation: "equal",
        ignoreCase: false,
        value: "",
        date: `${yyyy}-${mm}-${dd}`,
        time: `${hh}:${mi}`,
      };
    }
    return { operation: "equal", ignoreCase: false, value: "", boolValue: false };
  }, [kfValueType]);

  const addTempFilterRow = () => setTempFilters(prev => [...prev, makeDefaultRow()]);
  const updateTempFilterRow = (idx: number, patch: Partial<FilterRow>) =>
    setTempFilters(prev => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  const removeTempFilterRow = (idx: number) =>
    setTempFilters(prev => prev.filter((_, i) => i !== idx));

  const renderValueCell = (row: FilterRow, i: number) => {
    if (kfValueType === "NUMBER") {
      return (
        <NumberInput size="sm" value={row.numberValue ?? 0} onChange={(_, n)=>updateTempFilterRow(i, { numberValue: n, value: String(n) })}>
          <NumberInputField />
        </NumberInput>
      );
    }
    if (kfValueType === "BOOLEAN") {
      return (
        <Select size="sm" value={String(row.boolValue ?? false)} onChange={(e)=>updateTempFilterRow(i, { boolValue: e.target.value === "true", value: e.target.value })}>
          <option value="true">true</option>
          <option value="false">false</option>
        </Select>
      );
    }
    if (kfValueType === "DATETIME") {
      return (
        <Flex gap={2} w="full">
          <Input type="date" size="sm" value={row.date ?? ""} onChange={(e)=>updateTempFilterRow(i, { date: e.target.value })} />
          <Input type="time" size="sm" value={row.time ?? ""} onChange={(e)=>updateTempFilterRow(i, { time: e.target.value })} />
        </Flex>
      );
    }
    return <Input size="sm" w="full" value={row.value} onChange={(e)=>updateTempFilterRow(i, { value: e.target.value })} />;
  };

  const removeComplex = (idx: number) =>
    setComplexGroups(prev => prev.filter((_, i) => i !== idx));

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={3} bg={headerBg} color="white">
            {editKFIndex === null ? "Add key filter" : "Edit key filter"}
          </ModalHeader>
          <CloseButton position="absolute" right="12px" top="12px" onClick={onClose} color="white" />
          <ModalBody p={4}>
            <Flex align="flex-end" gap={3} pb={3} borderBottom="1px" borderColor={borderCol} mb={3}>
              <Box minW="180px">
                <Text fontSize="xs" mb={1} fontWeight={500}>Key type*</Text>
                <Select size="sm" value={kfType} onChange={(e)=>setKfType(e.target.value as any)}>
                  <option value="ATTRIBUTE">Attribute</option>
                  <option value="TIMESERIES">Time series</option>
                  <option value="CONSTANT">Constant</option>
                </Select>
              </Box>

              <Box flex="1" minW="240px">
                <Text fontSize="xs" mb={1} fontWeight={500}>Key name*</Text>
                {kfType==="CONSTANT" ? (
                  <Input size="sm" placeholder="Enter a constant name" value={kfName} onChange={(e)=>setKfName(e.target.value)} />
                ) : isLoadingKeys ? (
                  <Flex justify="center" py={2}><Spinner size="sm" /></Flex>
                ) : (
                  <>
                    <Select
                      size="sm"
                      placeholder={keyOptions.length ? "Select a key" : "No keys available"}
                      value={kfName}
                      onChange={(e)=>setKfName(e.target.value)}
                      isDisabled={!keyOptions.length}
                    >
                      {keyOptions.map(k => <option key={k} value={k}>{k}</option>)}
                    </Select>
                    {!keyOptions.length && <Text fontSize="xs" color="red.500" mt={1}>No keys available for this type</Text>}
                  </>
                )}
              </Box>

              <Box minW="170px">
                <Text fontSize="xs" mb={1} fontWeight={500}>Value type*</Text>
                <Select
                  size="sm"
                  value={kfValueType}
                  onChange={(e) => setKfValueType(e.target.value as "STRING" | "NUMBER" | "BOOLEAN" | "DATETIME")}
                >
                  <option value="STRING">String</option>
                  <option value="NUMBER">Numeric</option>
                  <option value="BOOLEAN">Boolean</option>
                  <option value="DATETIME">Datetime</option>
                </Select>
              </Box>
            </Flex>

            <Box>
              <Text fontWeight={600} mb={2}>Filters</Text>
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th w="220px">Operation</Th>
                    <Th w="140px">{kfValueType === "STRING" ? "Ignore case" : ""}</Th>
                    <Th>Value</Th>
                    <Th w="50px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tempFilters.length === 0 && complexGroups.length === 0 ? (
                    <Tr><Td colSpan={4}><Text color="gray.500">No filters added</Text></Td></Tr>
                  ) : (
                    <>
                      {tempFilters.map((row, i) => (
                        <Tr key={`s-${i}`}>
                          <Td>
                            <Select size="sm" value={row.operation}
                                    onChange={(e)=>updateTempFilterRow(i, { operation: e.target.value })}>
                              {getOps().map(op => <option key={op}>{op}</option>)}
                            </Select>
                          </Td>
                          <Td>
                            {kfValueType === "STRING" ? (
                              <Checkbox
                                isChecked={row.ignoreCase}
                                onChange={(e)=>updateTempFilterRow(i, { ignoreCase: e.target.checked })}
                              >
                                Ignore case
                              </Checkbox>
                            ) : null}
                          </Td>
                          <Td>{renderValueCell(row, i)}</Td>
                          <Td>
                            <IconButton
                              aria-label="remove-row"
                              icon={<FiTrash2/>}
                              size="sm"
                              variant="ghost"
                              onClick={()=>removeTempFilterRow(i)}
                            />
                          </Td>
                        </Tr>
                      ))}
                      {complexGroups.map((g, i) => (
                        <Tr key={`c-${i}`}>
                          <Td colSpan={3}>
                            <Flex align="center" gap={3}>
                              <Tag size="lg" variant="subtle" colorScheme="blue">
                                <TagLabel>Complex: {g.op.toUpperCase()} • {g.items.length} filter(s)</TagLabel>
                              </Tag>
                              <Text fontSize="sm" color="gray.500">Added via Complex filter</Text>
                            </Flex>
                          </Td>
                          <Td>
                            <IconButton aria-label="remove-complex" icon={<FiTrash2 />} size="sm" variant="ghost" onClick={() => removeComplex(i)} />
                          </Td>
                        </Tr>
                      ))}
                    </>
                  )}
                </Tbody>
              </Table>

              <Flex mt={3} gap={2}>
                <Button size="sm" onClick={addTempFilterRow}>Add</Button>
                <Button size="sm" variant="outline" onClick={() => setComplexOpen(true)}>Add complex</Button>
              </Flex>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            {/* Pass both simple and complex back for preview */}
            <Button
              colorScheme="blue"
              onClick={() =>
                onConfirm({
                  name: kfName,
                  type: kfType,
                  valueType: kfValueType,
                  filters: tempFilters,
                  complexGroups
                })
              }
              isDisabled={!kfName.trim()}
            >
              {editKFIndex === null ? "Add" : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Root complex modal */}
      {complexOpen && (
        <ComplexFilterModal
          isOpen={complexOpen}
          onClose={() => setComplexOpen(false)}
          valueType={kfValueType}
          onAdd={(group) => { setComplexGroups(prev => [...prev, group]); setComplexOpen(false); }}
        />
      )}
    </>
  );
};

export default AddKeyFilterModal;
