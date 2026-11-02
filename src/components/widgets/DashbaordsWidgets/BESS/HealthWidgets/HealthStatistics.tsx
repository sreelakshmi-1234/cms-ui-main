import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";
import SolidGaugeChart from "../../../charts/SolidGuageChart";



const HealthStatistics = () => {
    var search = {
        devName : "PCS",
        keys : "kWhdischarged_Day,kWhcharged_Day"
    }
    const batteryStatus = UseBatteryStatus(search) || [0,0];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            bg={useColorModeValue("white", "#131512")}
            color={useColorModeValue("#062D59", "#FFFFFF")}
            p={"20px"}
            mt={5}
        >
            <VStack align={"flex-start"} width={"100%"}>
                <Text
                    fontSize={"18px"}
                    fontWeight={600}
                >
                    Statistics
                </Text>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <VStack spacing={0} alignItems={"flex-start"} borderRight={"1px solid #262B27"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{batteryStatus[0]}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Cumulated Discharged Energy Throughout</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"} borderRight={"1px solid #262B27"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(batteryStatus[1] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Cumulated Charged Energy Throughout</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(400 * 0.9 * 0.8 * 5500).toFixed(2)}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Estimated Remaining Usable Energy Throughout</Text>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

export default HealthStatistics