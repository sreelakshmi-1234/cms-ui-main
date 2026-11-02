import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { EnlargeWidgetSize } from "../Services/EnlargeWidget";


const NotFoundPage = () => {
    return(
        <Box
            maxW="full" ml={10} px={{ base: 2, sm: 12, md: 17 }}    
        >
            <Flex
                justify={"center"} alignItems={"center"} height={"80vh"} direction={"column"}
            >
                <Heading
                    fontSize={"40px"}
                    fontWeight={"600"}
                    color={"red"}
                >
                    404 Error
                </Heading>
                <Text
                    fontFamily={"inter"}
                    fontSize={"50px"}
                    fontWeight={500}
                    color={"#3c3c3c"}
                >
                    Page Not Found!
                </Text>
            </Flex>
        </Box>
    );
};

export default NotFoundPage;