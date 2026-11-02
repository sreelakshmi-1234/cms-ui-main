import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";



const BESSMeter = () => {
    var searchPower = {
        devName : "PCS-1",
        keys : "AC_Active_Power_Watt"
    }
    const batteryPower = UseBatteryStatus(searchPower) || [0];

    // ******* Table of Widget *********
    var searchReactive = {
        devName : "PCS-1",
        keys : "AC_Reactive_Power_var"
    }
    const batteryReactive = UseBatteryStatus(searchReactive) || [0]; 

    var searchChargeDay = {
        devName : "PCS-1",
        keys : "kWhcharged_Day"
    }
    const batteryChargeDay = UseBatteryStatus(searchChargeDay) || [0];

    var searchDisChargeDay = {
        devName : "PCS-1",
        keys : "kWhdischarged_Day"
    }
    const batteryDisChargeDay = UseBatteryStatus(searchDisChargeDay) || [0];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={"20px"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
        >
            <HStack color={useColorModeValue("#062D59", "#fff")} alignItems={"flex-start"}>
                <Flex
                    flexDir={"column"}
                    height={"199px"}
                    width={"356px"}
                    pr={"20px"}
                    gap={"20px"}
                    mr={"30px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{("0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}></Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Unites Running</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{("0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Chargeable Power</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(batteryPower[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Active power</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"199px"}
                    width={"356px"}
                    pr={"20px"}
                    gap={"20px"}
                    mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{("0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>A</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Units Available</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(batteryDisChargeDay[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Dischargeable Power</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{("0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>% / s</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Grid Froming Volatage Slew</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"126px"}
                    width={"356px"}
                    pr={"20px"}
                    gap={"20px"}
                    mr={"30px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{("0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>VA</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Apparent Power </Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{batteryChargeDay[0] || "0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Chargeable Energy</Text>
                    </VStack>
                </Flex>
                <Flex
                    flexDir={"column"}
                    height={"126px"}
                    width={"356px"}
                    pr={"20px"}
                    gap={"20px"}
                    // mr={"20px"}
                >
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{(batteryReactive[0] || "0")}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>VAR</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Reactive Power</Text>
                    </VStack>
                    <VStack spacing={0} alignItems={"flex-start"}>
                        <Flex alignItems={"baseline"} gap={1}>
                            <Text fontWeight={700} fontSize={"22px"}>{"0"}</Text>
                            <Text fontWeight={500} fontSize={"14px"}>kWh</Text>
                        </Flex>
                        <Text fontSize={"14px"} color={"#9BABBD"}>Dischargeable Energy</Text>
                    </VStack>
                </Flex>
            </HStack>
        </Box>
    );
};

export default BESSMeter