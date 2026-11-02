import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";


const DGMeter = () => {
    // ********************* DG Meter *********************
    var search1 = {
        devName : "Calculation",
        keys : "DG_AVG_Volt_Line",
    }
    const MeterLiveVolt = UseBatteryStatus(search1) || [0, 0, 0, 0, 0, 0];
    var searchAmp = {
        devName : "Calculation",
        keys : "DG_AVG_Amps_Line"
    }
    const MeterLiveAmp = UseBatteryStatus(searchAmp) || [0, 0, 0, 0, 0, 0];

    var searchDaily = {
        devName : "Calculation",
        keys : "DG_Total_Energy",
    }
    const MeterLiveDaily = UseBatteryStatus(searchDaily) || [0, 0, 0, 0, 0, 0];
    
    var searchCost = {
        devName : "Calculation",
        keys : "DG_Energy_Cost",
    }
    const MeterLiveCost = UseBatteryStatus(searchCost) || [0, 0, 0, 0, 0, 0];

    var searchTEnergy = {
        devName : "Calculation",
        keys : "DG_Total_kWh",
    }
    const MeterLiveTEnergy = UseBatteryStatus(searchTEnergy) || [0, 0, 0, 0, 0, 0];

    var searchPPkW = {
        devName : "Calculation",
        keys : "DGEnergy_PriceperkWh",
    }
    const MeterLivePPkW = UseBatteryStatus(searchPPkW) || [0, 0, 0, 0, 0, 0];


    var searchAvgVolt = {
        devName: "Calculation",
        keys: "DG_AVG_Volt_Line",
        special: "currentDayAVG"
    }
    const MeterAVGVolt = UseBatteryStatus(searchAvgVolt) || [0, 0];

    var searchAvgAmps = {
        devName: "Calculation",
        keys: "DG_AVG_Amps_Line",
        special: "currentDayAVG"
    }
    const MeterAVGAmps = UseBatteryStatus(searchAvgAmps) || [0, 0];


    var searchMaxVolt = {
        devName : "Calculation",
        keys : "DG_AVG_Volt_Line",
        special : "currentDayMAX"
    }
    const MeterMAXVolt = UseBatteryStatus(searchMaxVolt) || [0, 0];

    var searchMaxAmp = {
        devName : "Calculation",
        keys : "DG_AVG_Amps_Line",
        special : "currentDayMAX"
    }
    const MeterMAXAmp = UseBatteryStatus(searchMaxAmp) || [0, 0];
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
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterLiveVolt[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>v</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Daily Voltage</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterAVGVolt[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>v</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Average</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterMAXVolt[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>v</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Peak</Text>
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
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterLiveAmp[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>A</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Daily Current</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterAVGAmps[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>A</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Average</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterMAXAmp[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>A</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Peak</Text>
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
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterLiveDaily[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Daily Energy</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{MeterLiveCost[0] || "0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}></Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Energy Cost</Text>
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
                            <Text fontWeight={700} fontSize={"22px"}>{(MeterLiveTEnergy[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Total Energy</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{MeterLivePPkW[0] || "0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}></Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Price / kWh</Text>
                    </VStack>
                </Flex>
            </HStack>
        </Box>
    );
};

export default DGMeter