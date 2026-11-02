import { Badge, Box, Flex, HStack, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";



const DataAvailability = () => {
    return (
        <Flex flexDir={"column"} p={"20px"} color={"#062D59"} w={"100%"} h={"100%"} bg={useColorModeValue("#FFFFFF", "#131512")} alignItems={"flex-start"} mt={5}>
            <Flex justifyContent={"space-between"} width={"100%"} alignItems={"center"}>
                <Text fontWeight={600} fontSize={"18px"} my={5}>
                    Data Availability
                </Text>
                <Badge fontWeight={300}>In Progress</Badge>
            </Flex>
            <SimpleGrid minChildWidth={"213px"} gap={"17px"} maxW={"100%"} mb={3}>
                <VStack p={"20px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                    <Text fontWeight={400} fontSize={"16px"}>Total Plant</Text>
                    <HStack>
                        <Text fontWeight={600}>14 </Text>
                        <Text fontWeight={500} color={true ? "#05BA3B" : "#FF4848"}>+2(1.30%)</Text>
                    </HStack>
                </VStack>
                <VStack p={"20px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                    <Text fontWeight={400} fontSize={"16px"}>Asset wise: Inverter</Text>
                    <HStack>
                        <Text fontWeight={600}>14 </Text>
                        <Text fontWeight={500} color={false ? "#05BA3B" : "#FF4848"}>+2(1.30%)</Text>
                    </HStack>
                </VStack>
                <VStack p={"20px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                    <Text fontWeight={400} fontSize={"16px"}>Budgeted</Text>
                    <HStack>
                        <Text fontWeight={600}>14 </Text>
                        <Text fontWeight={500} color={true ? "#05BA3B" : "#FF4848"}>+2(1.30%)</Text>
                    </HStack>
                </VStack>
                <VStack p={"20px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                    <Text fontWeight={400} fontSize={"16px"}>Meter</Text>
                    <HStack>
                        <Text fontWeight={600}>14 </Text>
                        <Text fontWeight={500} color={true ? "#05BA3B" : "#FF4848"}>+2(1.30%)</Text>
                    </HStack>
                </VStack>
                <VStack p={"20px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                    <Text fontWeight={400} fontSize={"16px"}>WMS</Text>
                    <HStack>
                        <Text fontWeight={600}>14 </Text>
                        <Text fontWeight={500} color={false ? "#05BA3B" : "#FF4848"}>+2(1.30%)</Text>
                    </HStack>
                </VStack>
            </SimpleGrid>
        </Flex >
    );
};

export default DataAvailability