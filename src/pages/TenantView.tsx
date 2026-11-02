import { Box, Portal, Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import TenantTable from "../components/widgets/PageWidgets/Tenant/TenantTable";
import TenantLocationMap from "../components/widgets/PageWidgets/Tenant/TenantLocationMap";
import GlobalLoader from "../components/GlobalLoader";

const TenantView = () => {
    const [tenantLoading, setTenantLoading] = useState(false);

    return (
        <Box position="relative" minH="100vh">
            {/* GLOBAL LOADER (covers whole dashboard and viewport) */}
            {tenantLoading && (
                <Portal>
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="rgba(0,0,0,0.35)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex="modal"
                    >
                        <Flex align="center" justify="center">
                            <Box transform="scale(4)">
                                <Spinner
                                    thickness='3px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='#062D59'
                                    size='md'
                                />
                            </Box>
                        </Flex>
                    </Box>
                </Portal>
            )}
            <Box mt={"87px"} maxW="1920px" ml={10} minH={"150vh"} px={{ base: 2, sm: 12, md: 17 }}>
                <Box height={"360px"} mb={5}>
                    <TenantLocationMap />
                </Box>
                <TenantTable setTenantLoading={setTenantLoading} />
            </Box>
        </Box>
    );
};

export default TenantView;
