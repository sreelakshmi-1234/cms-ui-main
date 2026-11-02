import { Box, Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";
import GridSvg from "../../../../assets/Grid/GridSvg";



const MeterPower = () => {
    // ************************* Grid POWER *********************

    var search = {
        devName : localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1", 
        keys : "AC_Active_Power_Watt"
    }
    const MeterPower = UseBatteryStatus(search) || [0];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={"20px"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
            overflow={"hidden"}
        >
            <Flex flexDir={"row"} gap={5}>
                <VStack spacing={2} alignItems={"flex-start"} width={"40%"}>
                    <Flex alignItems={"baseline"} gap={1}>
                        <Text fontWeight={700} fontSize={"22px"}>{(MeterPower[0] || "0")}</Text>
                        <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                    </Flex>
                    <Text fontSize={"16px"} color={"#9BABBD"}>Power</Text>
                </VStack>
                <Box alignSelf={"flex-end"}>
                    <GridSvg /> 
                </Box>
            </Flex>
        </Box>
    );
};

export default MeterPower