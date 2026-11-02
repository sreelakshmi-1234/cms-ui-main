import { Box, Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";
import WMSImg from "../../../../assets/WMS/WMSImg";



const LivePOA = () => {
    // ************************* POA *********************

    var search = {
        devName : "WMS-1",
        keys : "Inst_POA" 
    }
    const LivePOA = UseBatteryStatus(search) || [0];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={"20px"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
            overflow={"auto"}
        >
            <Flex flexDir={"column"}>
                <VStack spacing={2} alignItems={"flex-start"}>
                    <Flex alignItems={"baseline"} gap={1}>
                        <Text fontWeight={700} fontSize={"22px"}>{(LivePOA[0] || "0")}</Text>
                        <Text fontWeight={500} fontSize={"14px"}>W/m2</Text>
                    </Flex>
                    <Text fontSize={"16px"} color={"#9BABBD"}>POA</Text>
                </VStack>
                <Box alignSelf={"flex-end"} ml={5}>
                    <WMSImg />
                </Box>
            </Flex>
        </Box>
    );
};

export default LivePOA