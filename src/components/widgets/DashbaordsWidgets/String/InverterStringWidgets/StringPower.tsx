import { Box, Flex, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";
import StringImg from "../../../../../assets/String/SmbImg.png";



const StringPower = () => {
    // ************************* String POWER *********************

    var search = {
        devName : "Calculation",
        keys : "String_Power" //StringPower
    }
    const StringPower = UseBatteryStatus(search) || [0];
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
                        <Text fontWeight={700} fontSize={"22px"}>{(StringPower[0] || "0")}</Text>
                        <Text fontWeight={500} fontSize={"14px"}>kW</Text>
                    </Flex>
                    <Text fontSize={"16px"} color={"#9BABBD"}>String Power</Text>
                </VStack>
                <Box alignSelf={"flex-end"}>
                    <Image
                        height={"150px"}
                        src={StringImg}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default StringPower