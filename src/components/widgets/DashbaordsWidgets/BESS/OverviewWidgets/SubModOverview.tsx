import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout"
import { useEffect, useState } from "react";
import UseSomeTitle from "../../../../../Services/Hooks/Battery/UseSomeTitle";
import SparkBarChart from "../../../charts/SparkBarChart";



const SubModOverview = () => {
    // ******************* Sub Module Overveiw  => previous == some title******************
    var searchTagSubModuleOverview = {
        devName : "PCS",
        sparkBarKeys : "ESS_SOC,ESS_DOD,ESS_SOH",
        keys : "ii,AC_Active_Power_Watt"
    }
    const [SubModuleOverviewData, setSubModuleOverviewData] =  useState([{bar : [0,0,0], temp : 0, volt : 0}])
    const fetchSubModuleOverviewData = UseSomeTitle(searchTagSubModuleOverview);
    useEffect(()=> {
        if(fetchSubModuleOverviewData) {
            setSubModuleOverviewData(fetchSubModuleOverviewData);
        }
    }, [fetchSubModuleOverviewData])
    return (
        <GraphLayout
            title="Sub Module Overview"
            titleLengthSVG={190}
            titleLengthLongSVG={35}
            width={["300px"]}
            height={"344px"}
            downloadOption={false}
            WidgetProps={{
                transform: "rotate(0deg)",
                opacity: 1
            }}
        >
            <Box>
                <Flex flexDir={"column"}>
                    {SubModuleOverviewData.map((data, i) => (
                    <VStack align={"left"} mt={5} borderBottom={"1px solid #DDE3E8"}>
                        <HStack width={"100%"} color={"#062D59"} justifyContent={"space-between"}>
                            <Text fontSize={"16px"} fontWeight={600}>S0{i + 1} M01</Text>
                            <HStack width={"auto"} spacing={5}>
                                <Flex alignItems={"baseline"} gap={1}>
                                    <Text fontWeight={600} fontSize={"16px"}>{data.temp || "NA"}°</Text>
                                    <Text fontWeight={500} fontSize={"14px"} color={"#9BABBD"}>C</Text>
                                </Flex>
                                <Flex alignItems={"baseline"} gap={1}>
                                    <Text fontWeight={600} fontSize={"16px"}>{data.volt}</Text>
                                    <Text fontWeight={500} fontSize={"14px"} color={"#9BABBD"}>V</Text>
                                </Flex>
                            </HStack>
                        </HStack>
                        <SparkBarChart apiData={data.bar || [22,78, 22]}/>
                    </VStack>
                    ))}
                </Flex>
                {/* *************** It will show when PCS = 1 ************ */}
                {SubModuleOverviewData.length == 1 ? SubModuleOverviewData.map((_, i) => (
                <VStack align={"left"} mt={5}>
                    <HStack width={"100%"} color={"#062D59"} justifyContent={"space-between"}>
                        <Text fontSize={"16px"} fontWeight={600}>S02 M01</Text>
                        <HStack width={"auto"} spacing={5}>
                            <Flex alignItems={"baseline"} gap={1}>
                                <Text fontWeight={600} fontSize={"16px"}>NA°</Text>
                                <Text fontWeight={500} fontSize={"14px"} color={"#9BABBD"}>C</Text>
                            </Flex>
                            <Flex alignItems={"baseline"} gap={1}>
                                <Text fontWeight={600} fontSize={"16px"}>NA</Text>
                                <Text fontWeight={500} fontSize={"14px"} color={"#9BABBD"}>V</Text>
                            </Flex>
                        </HStack>
                    </HStack>
                    <SparkBarChart colors={["#DDE3E8", "#DDE3E8", "#DDE3E8"]} apiData={[40, 40, 40]}/>
                </VStack>
                )) : <Box></Box>}
            </Box>
        </GraphLayout>
    );
};

export default SubModOverview