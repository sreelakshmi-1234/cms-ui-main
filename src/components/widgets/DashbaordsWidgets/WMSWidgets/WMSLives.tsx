import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";


const WMSLives = () => {
    // ********************* Inverter Meter *********************
    var searchVolt = {
        devName : "WMS-1",
        keys : "Inst_POA",
    }
    const LivePOA= UseBatteryStatus(searchVolt) || [0, 0, 0, 0, 0, 0];

    var searchAmp = {
        devName : "WMS-1",
        keys : "Inst_GHI"
    }
    const LiveGHI = UseBatteryStatus(searchAmp) || [0, 0, 0, 0, 0, 0];

    var searchDaily = {
        devName : "WMS-1",
        keys : "Cum_POA_Kwhm2",
    }
    const LiveCumPOA = UseBatteryStatus(searchDaily) || [0, 0, 0, 0, 0, 0];
    
    var searchCost = {
        devName : "WMS-1",
        keys : "Cum_GHI_Kwhm2",
    }
    const LiveCumGHI = UseBatteryStatus(searchCost) || [0, 0, 0, 0, 0, 0];

    var searchTEnergy = {
        devName : "WMS-1",
        keys : "Ambient_Temp",
    }
    const LiveAmbTemp = UseBatteryStatus(searchTEnergy) || [0, 0, 0, 0, 0, 0];

    var searchPPkW = {
        devName : "WMS-1",
        keys : "AVG_Module_temp",
    }
    const LiveModTemp = UseBatteryStatus(searchPPkW) || [0, 0, 0, 0, 0, 0];


    
    var searchAvgVolt = {
        devName : "WMS-1",
        keys : "Wind_Speed",
    }
    const LiveWindSpeed = UseBatteryStatus(searchAvgVolt) || [0, 0];

    var searchAvgAmps = {
        devName : "WMS-1",
        keys : "Wind_Dir"
    }
    const LiveWindDir = UseBatteryStatus(searchAvgAmps) || [0, 0];


    var searchMaxVolt = {
        devName : "WMS-1",
        keys : "Inst_POA",
        special : "currentDayMAX"
    }
    const MaxPOA = UseBatteryStatus(searchMaxVolt) || [0, 0];

    var searchMaxAmp = {
        devName : "WMS-1",
        keys : "Inst_GHI",
        special : "currentDayMAX"
    }
    const MaxGHI = UseBatteryStatus(searchMaxAmp) || [0, 0];
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
                            <Text fontWeight={700} fontSize={"22px"}>{(LivePOA[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>W/m2</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>POA</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(LiveAmbTemp[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>°C</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Ambient Temp</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(MaxPOA[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>W/m2</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Peak POA</Text>
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
                            <Text fontWeight={700} fontSize={"22px"}>{(LiveGHI[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>W/m2</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>GHI</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(LiveModTemp[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>°C</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Module Temp</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(MaxGHI[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>W/m2</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Peak GHI</Text>
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
                            <Text fontWeight={700} fontSize={"22px"}>{(LiveCumPOA[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh/m2</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Cum. POA</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{LiveWindSpeed[0] || "0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>m/s</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Wind Speed</Text>
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
                            <Text fontWeight={700} fontSize={"22px"}>{(LiveCumGHI[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh/m2</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Cum. GHI</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{LiveWindDir[0] || "0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>°</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Wind Dir</Text>
                    </VStack>
                </Flex>
            </HStack>
        </Box>
    );
};

export default WMSLives