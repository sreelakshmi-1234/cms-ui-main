import { Box, Checkbox, CheckboxGroup, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface selectEnetries {
  value: string;
  label: string;
}

interface AssetsClassOptionsType {
  assetType: string;
  optionData: selectEnetries[];
  prev: { [asset: string]: selectEnetries[] };
  setSelection: (option: { [asset: string]: selectEnetries[] }) => void;
  resetSignal?: number;
}

const AssetsClassOptions: React.FC<AssetsClassOptionsType> = ({
  assetType,
  optionData,
  setSelection,
  resetSignal,
  prev
}) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = optionData.filter((entry) =>
    entry.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allOptionValues = filteredOptions.map((elem) => elem.value);

  const isAllChecked =
    allOptionValues.length > 0 &&
    checkedValues.length === allOptionValues.length &&
    allOptionValues.every((val) => checkedValues.includes(val));

  const isIndeterminate =
    checkedValues.length > 0 && !isAllChecked;

  const handleDeviceSelection = (values: string[]) => {
    setCheckedValues(values);
  };

  const handleCheckAll = (isChecked: boolean) => {
    setCheckedValues(isChecked ? allOptionValues : []);
  };

  useEffect(() => {
    const selectedEntries = filteredOptions.filter((entry) =>
      checkedValues.includes(entry.value)
    );

    const prevKey = Object.keys(prev)[0];
    const prevValues = prev[prevKey] || [];

    if (prevKey === assetType && prevValues.length > 0) {
      const merged = Array.from(
        new Map([...prevValues, ...selectedEntries].map((item) => [item.value, item]))
      ).map(([_, item]) => item);
      setSelection({ [assetType]: selectedEntries });  //merged
    } else {
      setSelection({ [assetType]: selectedEntries });
    }
  }, [checkedValues]);

  useEffect(() => {
    setCheckedValues([]); // Clear checkboxes on reset
  }, [resetSignal]);


  return (
    <Box _focusWithin={{ zIndex: 100 }} height="100px" color="#062D59" fontSize="12px" overflow="auto" ml={5} mb={1}>
      <Flex justify="space-between" align="center" mb={2}>
        <Checkbox
          size="sm"
          color="#062D59"
          isChecked={isAllChecked}
          isIndeterminate={isIndeterminate}
          onChange={(e) => handleCheckAll(e.target.checked)}
        >
          All
        </Checkbox>

        <Input
          size="xs"
          width="140px"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
          borderColor="#ccc"
          focusBorderColor="#062D59"
        />
      </Flex>
      <CheckboxGroup value={checkedValues} onChange={(e: string[]) => handleDeviceSelection(e)}>
        <Stack direction="column">
          {filteredOptions.map((elem) => (
            <Checkbox key={elem.value} colorScheme="gray" size="sm" value={elem.value} px={2}>
              <Text fontSize="12px" textTransform="capitalize" color="#062D59">
                {elem.label}
              </Text>
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default AssetsClassOptions;


{/* <Select
  className="Select786"
  isMulti = {true}
  placeholder = "Select Plant"
  variant="outline"
  focusBorderColor="#997C70"
  defaultMenuIsOpen={true}
  size={"sm"}
  closeMenuOnSelect={false}
  hideSelectedOptions={true}
  menuShouldScrollIntoView={true}
  options={optionData? optionData : []}
  onChange={handleDeviceSelection}
  // value={}
  selectedOptionColorScheme="gray"
/> */}