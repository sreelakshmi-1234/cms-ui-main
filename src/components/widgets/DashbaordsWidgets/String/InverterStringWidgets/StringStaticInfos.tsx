import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";
import UseInfoSymbol from "../../../../../Services/Hooks/UseInfoSymbol";


const StringStaticInfos = () => {

    const keys = ["make_model", "dc_string_capacity", "installation_type", "installation_dir", "fixed_tilt_azimuth_angle", "zenith_angle"];
    const InfoData = UseInfoSymbol(keys);

    // ********************* Inverter Meter *********************

    var searchAmp = {
        devName : "Calculation",
        keys : "AVG_Amps_Line"
    }
    const MeterLiveAmp = UseBatteryStatus(searchAmp) || [0, 0, 0, 0, 0, 0];

    
    var searchAvgVolt = {
        devName : "Calculation",
        keys : "AVG_Volt_Line",
        special : "currentDayAVG"
    }
    const MeterAVGVolt = UseBatteryStatus(searchAvgVolt) || [0, 0];

    var searchAvgAmps = {
        devName : "Calculation",
        keys : "AVG_Amps_Line",
        special : "currentDayAVG"
    }
    const MeterAVGAmps = UseBatteryStatus(searchAvgAmps) || [0, 0];

    return (
        <Box
            width={"1236px"}
            height={"259px"}
            p={"20px"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
        >
            <HStack color={useColorModeValue("#062D59", "#fff")} alignItems={"flex-start"}>
                <Flex
                    flexDir={"column"}
                    height={"219px"}
                    width={"254px"}
                    pr={"20px"}
                    borderRight={"1px solid #DDE3E8"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{(InfoData[0] || "")}</Text>
                            {/* <Text fontWeight={500} fontSize={"14px"}>v</Text> */}
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Make & model</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"} mt={5}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{(InfoData[4] || "")}</Text>
                            {/* <Text fontWeight={500} fontSize={"14px"}>v</Text> */}
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Azimuth Angle</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"219px"}
                    width={"254px"}
                    pr={"20px"}
                    borderRight={"1px solid #DDE3E8"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{(InfoData[1] || "")}</Text>
                            {/* <Text fontWeight={500} fontSize={"14px"}>A</Text> */}
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>DC Capacity</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"} mt={5}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{(InfoData[5] || "")}</Text>
                            {/* <Text fontWeight={500} fontSize={"14px"}>A</Text> */}
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Zenith Angle</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"136px"}
                    width={"254px"}
                    pr={"20px"}
                    borderRight={"1px solid #DDE3E8"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{(InfoData[2] || "")}</Text>
                            {/* <Text fontWeight={500} fontSize={"14px"}>kWh</Text> */}
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Installation Type</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"} mt={5}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{"0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}></Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Avg Amps</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"136px"}
                    width={"254px"}
                    pr={"20px"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{(InfoData[3] || "")}</Text>
                            {/* <Text fontWeight={500} fontSize={"14px"}>kWh</Text> */}
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Installation Dir.</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"} mt={5}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"16px"}>{"0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}></Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Avg Volt</Text>
                    </VStack>
                </Flex>
            </HStack>
        </Box>
    );
};

export default StringStaticInfos