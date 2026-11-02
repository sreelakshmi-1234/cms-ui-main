import { Badge, Box, Flex, HStack, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import UseMonthlyLastValueTBAPI from "../../../../Services/Hooks/UseMonthlyLastValueTBAPI";
import ComparisonMatrixSevice from "./ComparisonMatrixService";
import { useEffect, useState } from "react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";



const EnergyBreakdown = () => {

    // Meter Tags Present in Cal
    var searchTagConsumption = {
        devName: "calculation",
        keys: "Grid_Daily_Energy_Export_kWh",
        name: "Consumed",
        monthCount: 2,
        marker: false,
        chartData : false
    };
    const firstValCon = UseBatteryStatus({devName : searchTagConsumption.devName, keys : searchTagConsumption.keys}) || [0]
    const DataConsumption : any = UseMonthlyLastValueTBAPI(searchTagConsumption);
    const [ConsumptionMatrix, setConsumptionMatrix] = useState({
        value : 0,
        differenceValue : "",
        differencePercentage : 0
    })
    useEffect(() => {
        if(DataConsumption.length > 0) {
            setConsumptionMatrix(ComparisonMatrixSevice([firstValCon[0],DataConsumption[0].data[1][1]]));
        }
    }, [DataConsumption])
    
    var searchTagFeed = {
        devName: "calculation",
        keys: "Grid_Daily_Energy_Import_kWh",
        name: "Consumed",
        monthCount: 2,
        marker: false,
        chartData : false
    };
    const firstValFeed = UseBatteryStatus({devName : searchTagFeed.devName, keys : searchTagFeed.keys}) || [0]
    const DataFeed : {name : string, data : [number, number | null][]} | any = UseMonthlyLastValueTBAPI(searchTagFeed);
    const [FeedMatrix, setFeedMatrix] = useState({
        value : 0,
        differenceValue : "",
        differencePercentage : 0
    })
    useEffect(() => {
        if(DataFeed.length > 0) {
            setFeedMatrix(ComparisonMatrixSevice([firstValFeed[0],DataFeed[0].data[1][1]]));
        }
    }, [DataFeed]);

    // Budgeted
    const searchBudgetedPrevMonth = {
        devName : "Calculation",
        keys : "Expected_kWh_"+ new Date().getUTCFullYear() + "_" + (((new Date().getUTCMonth()).toString()).length == 1 ? ("0" + (new Date().getUTCMonth())) : (new Date().getUTCMonth())),
        startTs : "NONE",
        endTs : "NONE"
    };
    const BudgetedDataPrevMonth = UseBatteryStatus(searchBudgetedPrevMonth) || [0];
    const searchBudgeted = {
        devName : "Calculation",
        keys : "Expected_kWh_"+ new Date().getUTCFullYear() + "_" + (((new Date().getUTCMonth() + 1).toString()).length == 1 ? ("0" + (new Date().getUTCMonth() + 1)) : (new Date().getUTCMonth() + 1)),
        startTs : "NONE",
        endTs : "NONE"
    };
    const BudgetedDataCurrentMonth = UseBatteryStatus(searchBudgeted) || [0];

    const [budgeted, setBudgeted] = useState({
        value : 0,
        differenceValue : "",
        differencePercentage : 0
    });

    useEffect(() => {
        if(BudgetedDataPrevMonth[0] && BudgetedDataCurrentMonth[0]) {
            setBudgeted(ComparisonMatrixSevice([BudgetedDataCurrentMonth[0], BudgetedDataPrevMonth[0]]))
        }
    }, [BudgetedDataCurrentMonth, BudgetedDataPrevMonth])

    return (
        <Box p={"20px"} color={"#062D59"} w={"full"} h={"100%"} bg={useColorModeValue("#FFFFFF", "#131512")} mt={5}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={600} fontSize={"18px"} my={5}>
                    Energy Breakdown
                </Text>
                {/* <Badge fontWeight={300}>In Progress</Badge> */}
            </Flex>
            <VStack>
                <SimpleGrid minChildWidth={"166px"} gap={5} maxW={"full"} mb={3}>
                    <VStack p={"20px"} pl={"10px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Consumed</Text>
                        <HStack spacing={1}>
                            <Text fontWeight={600} fontSize={"18px"}>{ConsumptionMatrix.value > 10000 ? (ConsumptionMatrix.value / 1000).toFixed(1) : ConsumptionMatrix.value} </Text>
                            <Text fontWeight={600} fontSize={"14px"}>{ConsumptionMatrix.value > 10000 ? "MWh" : "kWh"} </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={ConsumptionMatrix.differencePercentage >= 0 ? "#05BA3B" : "#FF4848"}>{ConsumptionMatrix.differencePercentage >= 0 ? "+" : "-"}{ConsumptionMatrix.differenceValue}({Math.abs(ConsumptionMatrix.differencePercentage)}%)</Text>
                        </HStack>
                    </VStack>
                    <VStack p={"20px"} pl={"10px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Exported</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>{FeedMatrix.value > 10000 ? (FeedMatrix.value / 1000).toFixed(1) : FeedMatrix.value} </Text>
                            <Text fontWeight={600} fontSize={"14px"}>{FeedMatrix.value > 10000 ? "MWh" : "kWh"} </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={FeedMatrix.differencePercentage >= 0 ? "#05BA3B" : "#FF4848"}>{FeedMatrix.differencePercentage >= 0 ? "+" : "-"}{FeedMatrix.differenceValue}({Math.abs(FeedMatrix.differencePercentage)}%)</Text>
                        </HStack>
                    </VStack>
                    <VStack p={"20px"} pl={"10px"} pr={0} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Budgeted</Text>
                        <HStack spacing={1}>
                            <Text fontWeight={600} fontSize={"18px"}>{budgeted.value} </Text>
                            <Text fontWeight={600} fontSize={"14px"}>kWh </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={budgeted.differencePercentage >= 0 ? "#05BA3B" : "#FF4848"}>{budgeted.differencePercentage >= 0 ? "+" : "-"}{budgeted.differenceValue}({Math.abs(budgeted.differencePercentage)}%)</Text>
                        </HStack>
                    </VStack>
                </SimpleGrid>
                <SimpleGrid minChildWidth={"259px"} gap={5} maxW={"full"}>
                    <VStack p={"20px"} pl={"10px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>BESS Discharge from Grid</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>0 </Text>
                            <Text fontWeight={600} fontSize={"14px"}>kWh </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={true ? "#05BA3B" : "#FF4848"}>+(0%)</Text>
                        </HStack>
                    </VStack>
                    <VStack p={"20px"} pl={"10px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>BESS Discharge to Grid</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>0 </Text>
                            <Text fontWeight={600} fontSize={"14px"}>kWh </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={true ? "#05BA3B" : "#FF4848"}>+(0%)</Text>
                        </HStack>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default EnergyBreakdown