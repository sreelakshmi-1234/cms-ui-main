import { Box, Collapse, Flex, HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import AssetsClassOptions from "./AssetsClassOptions";
import { useEffect, useState } from "react";

interface optionType {
    value: string;
    label: string;
}

interface MakeModelOptionType {
    [make: string]: {
        [model: string]: {
            label: string;
            value: string;
        }[];
    };
}

interface ClassPopoverBodyType {
    keys?: string[] | null;
    options?: optionType[][] | null;
    makeModelKey?: string[] | null;
    makeModelOption?: MakeModelOptionType[] | null;
    setTempAssetClass : (val : TempSelectionAssetIds) => void;
    row : number;
}

interface SelectionAssetIds {
    [asset : string] : optionType[];
}


interface TempSelectionAssetIds {
    value : SelectionAssetIds;
    row : number;
}
const ClassPopoverBody: React.FC<ClassPopoverBodyType> = ({
    keys,
    options,
    makeModelKey,
    makeModelOption,
    setTempAssetClass,
    row
}) => {

    /*** Handle Selection */

    const [selection, setSelection] = useState<SelectionAssetIds>({"" : []});
    const [resetSignals, setResetSignals] = useState<number[]>(keys ? keys.map(() => 0) : []);
    const [resetSignalsMake, setResetSignalsMake] = useState<number[]>(makeModelKey ? makeModelKey.map(() => 0) : []);

    useEffect(() => {
        // console.log(selection)

        setTempAssetClass({
            value : selection,
            row : row
        })
    }, [selection]);



    /**** Handle Collapse */

    const byDeviceId = useDisclosure();
    const byDeviceMakeModel = useDisclosure();

    const [disclosures, setDisclosures] = useState<boolean[]>(
        keys ? keys.map(() => false) : []
    );
    const [disclosuresMake, setDisclosuresMake] = useState<boolean[]>(
        makeModelKey ? makeModelKey.map(() => false) : []
    );

    const [disclosuresModel, setDisclosuresModel] = useState<
        { [groupIndex: number]: { [make: string]: boolean } }
    >({});

    function handleDisclosure(index: number) {
        disclosures[index] = disclosures[index];
        const newDisclosures = disclosures[index] ? disclosures.map(() => false) : disclosures.map((_, i) => i === index);
        setDisclosures(newDisclosures);
        
        resetSignals[index] = 0;
        const newResetSignals = resetSignals.map((val, i) => (i !== index ? val + 1 : val));
        setResetSignals(newResetSignals);
    }
    
    function handleMakeDisclosure(index: number) {
        disclosuresMake[index] = disclosuresMake[index];
        const newDisclosuresMake = disclosuresMake[index] ? disclosuresMake.map((_, i) => false) : disclosuresMake.map((_, i) => i == index);
        setDisclosuresMake(newDisclosuresMake);
        
        resetSignalsMake[index] = 0;
        const newResetSignals = resetSignalsMake.map((val, i) => (i !== index ? val + 1 : val));
        setResetSignalsMake(newResetSignals);
      }
      

    function handleModelDisclosure(groupIndex: number, make: string) {
        setDisclosuresModel((prev) => ({
            ...prev,
            [groupIndex]: {
                ...prev[groupIndex],
                [make]: !prev[groupIndex]?.[make],
            },
        }));
    }

    function handleTopLevelToggle(section: "deviceId" | "makeModel") {
        if (section === "deviceId") {
            (!byDeviceId.isOpen) ? byDeviceId.onOpen() : byDeviceId.onClose();
            if (byDeviceMakeModel.isOpen) {
                byDeviceMakeModel.onClose();
                setDisclosuresMake([]);
            }
        } else {
            (!byDeviceMakeModel.isOpen) ? byDeviceMakeModel.onOpen() : byDeviceMakeModel.onClose();
            if (byDeviceId.isOpen) {
                byDeviceId.onClose();
                setDisclosures([]);
            }
        }
    }

      
    return (
        <Box>
            {/* By Device ID */}
            <Text
                display={"flex"}
                justifyContent={"space-between"}
                fontSize={14}
                mb={1}
                color={byDeviceId.isOpen ? "#19CA16" : "black"}
                fontWeight={500}
                onClick={() => handleTopLevelToggle("deviceId")}
                cursor={"pointer"}
                zIndex={9999}
            >
                &nbsp; Select By Device Ids
                <Icon
                    as={MdKeyboardArrowRight}
                    transform={byDeviceId.isOpen ? "rotate(90deg)" : undefined}
                    ml="auto"
                />
            </Text>
            <Collapse in={byDeviceId.isOpen}>
                {keys &&
                    keys.map((val, i) => (
                        <Box key={val}>
                            <Flex alignItems={"center"} onClick={() => handleDisclosure(i)}>
                                <Text ml={4} cursor={"pointer"} textTransform={"uppercase"} fontWeight={600} fontSize={"sm"}>
                                    {val}
                                </Text>
                                <Icon
                                    as={MdKeyboardArrowRight}
                                    transform={
                                        disclosures[i]
                                            ? "rotate(90deg)"
                                            : undefined
                                    }
                                    ml={2}
                                />
                            </Flex>
                            <Collapse in={disclosures[i]}>
                                <AssetsClassOptions 
                                    assetType={val}
                                    optionData={options ? options[i] : []}
                                    prev={selection} 
                                    setSelection={setSelection}
                                    resetSignal={resetSignals[i]}
                                />
                            </Collapse>
                        </Box>
                    ))}
            </Collapse>

            {/* By Device Make & Model */}
            <Text
                display={"flex"}
                justifyContent={"space-between"}
                fontSize={14}
                mb={1}
                color={byDeviceMakeModel.isOpen ? "#19CA16" : "black"}
                fontWeight={500}
                onClick={() => handleTopLevelToggle("makeModel")}
                cursor={"pointer"}
            >
                &nbsp; Select By Device Make & Model
                <Icon
                    as={MdKeyboardArrowRight}
                    transform={byDeviceMakeModel.isOpen ? "rotate(90deg)" : undefined}
                    ml="auto"
                />
            </Text>
            <Collapse in={byDeviceMakeModel.isOpen}>
                {makeModelKey &&
                    makeModelKey.map((categoryKey, groupIndex) => (
                        <Box key={categoryKey}>
                            <Flex
                                alignItems={"center"}
                                onClick={() => handleMakeDisclosure(groupIndex)}
                            >
                                <Text
                                    ml={4}
                                    textTransform={"uppercase"}
                                    cursor="pointer"
                                >
                                    {categoryKey}
                                </Text>
                                <Icon
                                    as={MdKeyboardArrowRight}
                                    transform={
                                        disclosuresMake[groupIndex]
                                            ? "rotate(90deg)"
                                            : undefined
                                    }
                                    ml={2}
                                />
                            </Flex>
                            <Collapse in={disclosuresMake[groupIndex]}>
                                {makeModelOption &&
                                    Object.entries(makeModelOption[groupIndex]).map(([make, models]) => (
                                        <Box key={make}>
                                            <Flex
                                                alignItems={"center"}
                                                onClick={() => handleModelDisclosure(groupIndex, make)}
                                            >
                                                <Text
                                                    ml={8}
                                                    textTransform={"uppercase"}
                                                    cursor="pointer"
                                                    fontSize={"13px"}
                                                >
                                                    {make}
                                                </Text>
                                                <Icon
                                                    as={MdKeyboardArrowRight}
                                                    transform={
                                                        disclosuresModel[groupIndex]?.[make]
                                                            ? "rotate(90deg)"
                                                            : undefined
                                                    }
                                                    ml={2}
                                                />
                                            </Flex>
                                            <Collapse in={disclosuresModel[groupIndex]?.[make]}>
                                                {Object.entries(models).map(([model, items]) => (
                                                    <Box key={model} ml={12}>
                                                        <Flex alignItems={"center"}
                                                            onClick={() =>
                                                                setDisclosuresModel((prev) => ({
                                                                    ...prev,
                                                                    [groupIndex]: {
                                                                        ...prev[groupIndex],
                                                                        [`${make}-${model}`]: !prev[groupIndex]?.[`${make}-${model}`],
                                                                    },
                                                                }))
                                                            }
                                                        >
                                                            <Text
                                                                fontSize="sm"
                                                                fontWeight={600}
                                                                textTransform={"uppercase"}
                                                                cursor="pointer"
                                                            >
                                                                {model}
                                                            </Text>
                                                            <Icon
                                                                as={MdKeyboardArrowRight}
                                                                transform={
                                                                    disclosuresModel[groupIndex]?.[`${make}-${model}`]
                                                                        ? "rotate(90deg)"
                                                                        : undefined
                                                                }
                                                                ml={2}
                                                            />
                                                        </Flex>
                                                        <Collapse in={disclosuresModel[groupIndex]?.[`${make}-${model}`]}>
                                                            <AssetsClassOptions
                                                                assetType={categoryKey}
                                                                optionData={items}
                                                                prev={selection}
                                                                setSelection={setSelection}
                                                                resetSignal={resetSignalsMake[groupIndex]}
                                                            />
                                                        </Collapse>
                                                    </Box>
                                                ))}
                                            </Collapse>
                                        </Box>
                                    ))}
                            </Collapse>
                        </Box>
                    ))
                }
            </Collapse>
        </Box>
    );
};

export default ClassPopoverBody;
