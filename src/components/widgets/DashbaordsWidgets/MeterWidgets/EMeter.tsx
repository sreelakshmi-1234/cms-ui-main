import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";


const EMeter = () => {
    // ********************* Grid Meter *********************
    var search1Factor = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "AC_PF",
    }
    const MeterLiveTagFactor = UseBatteryStatus(search1Factor) || [0];
    var search1Cunsumption = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "Daily_Energy_Export_kWh",
    }
    const MeterLiveTagCunsumption = UseBatteryStatus(search1Cunsumption) || [0];
    var search1Feed = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "Daily_Energy_Import_kWh",
    }
    const MeterLiveTagFeed = UseBatteryStatus(search1Feed) || [0];

    var search1TotalExport = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "Total_Energy_Export_kWh",
    }
    const MeterLiveTagExport = UseBatteryStatus(search1TotalExport) || [0];

    var search1TotalImport = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "Total_Energy_Import_kWh",
    }
    const MeterLiveTagImport = UseBatteryStatus(search1TotalImport) || [0];
    
    var search2Current = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "AVG_Amps_L",
    }
    const MeterAVGTagCurrent = UseBatteryStatus(search2Current) || [0];
    var search2Voltage = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "AVG_Volt_L",
    }
    const MeterAVGTagVoltage = UseBatteryStatus(search2Voltage) || [0];
    var search2Frequency = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys : "AVG_Freq_L",
    }
    const MeterAVGTagFrequency = UseBatteryStatus(search2Frequency) || [0];

    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={"20px"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
            alignContent={"center"}
        >
            <HStack color={useColorModeValue("#062D59", "#fff")} alignSelf={"flex-start"}>
                <Flex
                    flexDir={"column"}
                    height={"183px"}
                    width={"337px"}
                    pr={"20px"}
                    borderRight={"1px solid #DDE3E8"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{(MeterAVGTagCurrent[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"12px"}>A</Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Line Average Current</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{(MeterLiveTagFactor[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"12px"}></Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Power Factor</Text>
                    </VStack> 
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{((MeterLiveTagExport[0] / 1000).toFixed(2) || "0")}</Text>
                            <Text fontWeight={500} fontSize={"12px"}>MWh</Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Lifetime Export</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"183px"}
                    width={"337px"}
                    pr={"20px"}
                    borderRight={"1px solid #DDE3E8"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{(MeterAVGTagVoltage[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"12px"}>V</Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Line Average Voltage</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{(MeterLiveTagCunsumption[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"12px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Consumption</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{((MeterLiveTagImport[0] / 1000).toFixed(2) || "0")}</Text>
                            <Text fontWeight={500} fontSize={"12px"}>MWh</Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Lifetime Import</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"183px"}
                    width={"337px"}
                    pr={"20px"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{(MeterAVGTagFrequency[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"12px"}>Hz</Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Line Average Frequency</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"20px"}>{MeterLiveTagFeed[0] || "0"}</Text>
                            <Text fontWeight={500} fontSize={"12px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"12px"} color={"#9BABBD"}>Feed</Text>
                    </VStack>
                </Flex>
            </HStack>
        </Box>
    );
};

export default EMeter