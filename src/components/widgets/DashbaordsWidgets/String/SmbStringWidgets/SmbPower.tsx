import { Box, Flex, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";
import SmbImg from "../../../../../assets/String/SmbImg.png";



const SmbPower = () => {
    // ************************* String POWER *********************

    var search = {
        devName : "Calculation",
        keys : "SMB_Power" //SmbPower
    }
    const SmbPower = UseBatteryStatus(search) || [0];
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
                        <Text fontWeight={700} fontSize={"22px"}>{(SmbPower[0] || "0")}</Text>
                        <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                    </Flex>
                    <Text fontSize={"16px"} color={"#9BABBD"}>SMB Power</Text>
                </VStack>
                <Box alignSelf={"flex-end"}>
                    <Image
                        height={"150px"}
                        src={SmbImg}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default SmbPower