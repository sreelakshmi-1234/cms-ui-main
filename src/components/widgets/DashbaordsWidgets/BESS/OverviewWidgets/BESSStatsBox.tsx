import { Box, Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { DischargeIcon, MaxChargeIcon, MinChargeIcon, SoHIcon } from "../../../../../assets/BESS/Overview/Icons"
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";




const BESSStatsBox = () => {
    var searchHealth = {
        devName : "PCS",
        keys : "kWhdischarged_Day,ESS_SOH,ESS_Min_Disharge_Cap,ESS_Max_Disharge_Cap"
    }
    const batteryStatusHealth = UseBatteryStatus(searchHealth) || [];
    return (
        <Flex 
            gap={5} 
            w={"404px"} 
            h={"344px"}
            bgColor={useColorModeValue("white", "#131512")} 
            mt={5} 
            flexWrap={"wrap"} 
            color={"#062D59"}
            opacity={1}
            transform={"rotate(0deg)"}
        >
            <Box bg={"#FFE4AF"}>
                <VStack h={"162px"} w={"192px"} align={"left"} p={"20px"} spacing={5}>
                    <DischargeIcon />
                    <VStack spacing={0} alignItems={"flex-start"} width={"119px"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{batteryStatusHealth[0] || 0}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"16px"}>AC Discharge</Text>
                    </VStack>
                </VStack>
            </Box>
            <Box bg={"#81FFC0"}>
                <VStack h={"162px"} w={"192px"} align={"left"} p={"20px"} spacing={5}>
                    <SoHIcon />
                    <VStack spacing={0} alignItems={"flex-start"} width={"119px"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{batteryStatusHealth[1] || 0}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"16px"}>AC Discharge</Text>
                    </VStack>
                </VStack>
            </Box>
            <Box bg={"#A7E8FF"}>
                <VStack h={"162px"} w={"192px"} align={"left"} p={"20px"} spacing={5}>
                    <MaxChargeIcon />
                    <VStack spacing={0} alignItems={"flex-start"} width={"119px"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{batteryStatusHealth[3] || 0}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"16px"}>AC Discharge</Text>
                    </VStack>
                </VStack>
            </Box>
            <Box bg={"#D8C6FF"}>
                <VStack h={"162px"} w={"192px"} align={"left"} p={"20px"} spacing={5}>
                    <MinChargeIcon />
                    <VStack spacing={0} alignItems={"flex-start"} width={"119px"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{batteryStatusHealth[2] || 0}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"16px"}>AC Discharge</Text>
                    </VStack>
                </VStack>
            </Box>
        </Flex>
    );
};

export default BESSStatsBox