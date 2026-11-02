import { Box, Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";
import InverterImg from "../../../../assets/Inverter/InverterImg";



const InverterPower = () => {
    // ************************* Inverter POWER *********************

    var search = {
        devName : "Calculation", // sum for BP
        keys : "INV_Total_Power" //InverterPower
    }
    const InverterPower = UseBatteryStatus(search) || [0];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={"20px"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
            overflow={"hidden"}
        >
            <Flex flexDir={"column"}>
                <VStack spacing={2} alignItems={"flex-start"}>
                    <Flex alignItems={"baseline"} gap={1}>
                        <Text fontWeight={700} fontSize={"22px"}>{(InverterPower[0] || "0")}</Text>
                        <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                    </Flex>
                    <Text fontSize={"16px"} color={"#9BABBD"}>Inverter Power</Text>
                </VStack>
                <Box alignSelf={"flex-end"}>
                    <InverterImg />
                </Box>
            </Flex>
        </Box>
    );
};

export default InverterPower