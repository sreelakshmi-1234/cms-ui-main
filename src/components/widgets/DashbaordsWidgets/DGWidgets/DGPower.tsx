import { Box, Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";
import DGImg from "../../../../assets/DG/DGImg";



const DGPower = () => {
    // ************************* GENERATOR POWER *********************

    var search = {
        devName : "calculation",// Generally some of power of DG is Shown
        keys : "DG_Total_Power"
    }
    const GeneratorPower = UseBatteryStatus(search) || [0];
    return (
        <Box
            width={"100%"}
            height={"100%"}
            bg={useColorModeValue("white", "#131512")}
            mt={5}
            overflow={"hidden"}
            >
            <Flex flexDir={"column"}>
                <VStack spacing={2} alignItems={"flex-start"} p={"20px"} pb={"10px"}>
                    <Flex alignItems={"baseline"} gap={1}>
                        <Text fontWeight={700} fontSize={"22px"}>{(GeneratorPower[0] || "0")}</Text>
                        <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                    </Flex>
                    <Text fontSize={"16px"} color={"#9BABBD"}>DG Power</Text>
                </VStack>
                <Box as={Flex} m={0} p={0} alignSelf={"flex-end"}>
                    <DGImg />
                </Box>
            </Flex>
        </Box>
    );
};

export default DGPower