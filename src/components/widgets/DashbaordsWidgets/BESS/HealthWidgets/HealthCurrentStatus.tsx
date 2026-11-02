import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";
import SolidGaugeChart from "../../../charts/SolidGuageChart";



const HealthCurrentStatus = () => {
    var search = {
        devName : "PCS",
        keys : "ESS_SOH,ESS_SOC"
    }
    const batteryStatus = UseBatteryStatus(search) || [0,0];
    return (
        <Box
            width={"898px"}
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
                    Current Status
                </Text>
                <HStack width={"100%"} justifyContent={"space-between"}>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>19</Text>
                            <Text fontWeight={500} fontSize={"14px"}></Text>
                        </Flex>
                        <Text fontSize={"16px"} color={"#9BABBD"}>Cycle</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(400 * ((batteryStatus[0]) / 100)).toFixed(2)}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"16px"} color={"#9BABBD"}>Usable Energy</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(batteryStatus[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>%</Text>
                        </Flex>
                        <Text fontSize={"16px"} color={"#9BABBD"}>SoH</Text>
                    </VStack>
                    <VStack spacing={0} align={"center"}>
                        <SolidGaugeChart value={batteryStatus[0] || 0} />
                        <Text fontWeight={700} fontSize={"20px"} pr={10}>{(batteryStatus[0] || "0")}%</Text>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    );
};

export default HealthCurrentStatus