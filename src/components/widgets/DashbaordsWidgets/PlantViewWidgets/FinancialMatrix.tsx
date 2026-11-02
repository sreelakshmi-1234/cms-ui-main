import { Badge, Box, Flex, HStack, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import ComparisonMatrixSevice from "./ComparisonMatrixService";
import { useEffect, useState } from "react";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";
import UseMonthlyLastValueTBAPI from "../../../../Services/Hooks/UseMonthlyLastValueTBAPI";



const FinancialMatrix = () => {
    // PPA_Price
    const searchPPA = {
        devName : "Calculation",
        keys : "PPA_Price",
        startTs : "NONE",
        endTs : "NONE"
    };
    const PPAPrice = UseBatteryStatus(searchPPA) || [0]
    // Meter Tags Present in Cal
    var searchTagConsumption = {
        devName: "calculation",
        keys: "Grid_Daily_Energy_Import_kWh",
        name: "Consumed",
        monthCount: 2,
        marker: false,
        chartData : false
    };
    const DataConsumption : any = UseMonthlyLastValueTBAPI(searchTagConsumption);
    const firstValCon = UseBatteryStatus({devName : searchTagConsumption.devName, keys : searchTagConsumption.keys}) || [0]
    const [ConsumptionMatrix, setConsumptionMatrix] = useState({
        value : 0,
        differenceValue : "",
        differencePercentage : 0
    })
    useEffect(() => {
        if(DataConsumption.length > 0 && PPAPrice[0]) {
            setConsumptionMatrix(ComparisonMatrixSevice([firstValCon[0] * PPAPrice[0],DataConsumption[0].data[1][1] * PPAPrice[0]]));
        }
    }, [DataConsumption])
    
    var searchTagFeed = {
        devName: "calculation",
        keys: "Grid_Daily_Energy_Export_kWh",
        name: "Consumed",
        monthCount: 2,
        marker: false,
        chartData : false
    };
    const DataFeed : {name : string, data : [number, number | null][]} | any = UseMonthlyLastValueTBAPI(searchTagFeed);
    const firstValFeed = UseBatteryStatus({devName : searchTagFeed.devName, keys : searchTagFeed.keys}) || [0]
    const [soldMatrix, setSoldMatrix] = useState({
        value : 0,
        differenceValue : "",
        differencePercentage : 0
    })
    useEffect(() => {
        if(DataFeed.length > 0 && PPAPrice[0]) {
            setSoldMatrix(ComparisonMatrixSevice([firstValFeed[0] * PPAPrice[0],DataFeed[0].data[1][1] * PPAPrice[0]]));
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
        if(BudgetedDataPrevMonth[0] && BudgetedDataCurrentMonth[0] && PPAPrice[0]) {
            setBudgeted(ComparisonMatrixSevice([BudgetedDataCurrentMonth[0]*PPAPrice[0], BudgetedDataPrevMonth[0]*PPAPrice[0]]))
        }
    }, [BudgetedDataCurrentMonth, BudgetedDataPrevMonth])
    return (
        <Box p={"20px"} color={"#062D59"} w={"full"} h={"100%"} bg={useColorModeValue("#FFFFFF", "#131512")} mt={5}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Text fontWeight={600} fontSize={"18px"} my={5}>
                    Financial Matrix
                </Text>
                {/* <Badge fontWeight={300}>In Progress</Badge> */}
            </Flex>
            <VStack>
                <HStack gap={5} maxW={"100%"} mb={3}>
                    <VStack p={"20px"} pl={"10px"} w={"138px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Energy sold</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>{soldMatrix.value} </Text>
                            <Text fontWeight={600} fontSize={"14px"}>$ </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={soldMatrix.differencePercentage >= 0 ? "#05BA3B" : "#FF4848"}>{soldMatrix.differencePercentage >= 0 ? "+": "-"}{soldMatrix.differenceValue}({Math.abs(soldMatrix.differencePercentage)}%)</Text>
                        </HStack>
                    </VStack>
                    <VStack p={"20px"} pl={"10px"} width={"222px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Energy Consumed</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>{ConsumptionMatrix.value} </Text>
                            <Text fontWeight={600} fontSize={"14px"}>$ </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={ConsumptionMatrix.differencePercentage >= 0 ? "#05BA3B" : "#FF4848"}>{ConsumptionMatrix.differencePercentage >=0 ? "+" : "-"}{ConsumptionMatrix.differenceValue}({Math.abs(ConsumptionMatrix.differencePercentage)}%)</Text>
                        </HStack>
                    </VStack>
                    <VStack p={"20px"} pl={"10px"} width={"138px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Energy Lost</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>0 </Text>
                            <Text fontWeight={600} fontSize={"14px"}>$ </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={true ? "#05BA3B" : "#FF4848"}>+(0%)</Text>
                        </HStack>
                    </VStack>
                </HStack>
                <SimpleGrid minChildWidth={"259px"} gap={5} maxW={"full"}>
                    <VStack p={"20px"} pl={"10px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Arbitrage Energy</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>0 </Text>
                            <Text fontWeight={600} fontSize={"14px"}>$ </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={true ? "#05BA3B" : "#FF4848"}>+(0%)</Text>
                        </HStack>
                    </VStack>
                    <VStack p={"20px"} pl={"10px"} alignItems={"flex-start"} border={"1px solid #DDE3E8"}>
                        <Text fontWeight={400} opacity={0.6} fontSize={"16px"}>Budgeted</Text>
                        <HStack>
                            <Text fontWeight={600} fontSize={"18px"}>{budgeted.value} </Text>
                            <Text fontWeight={600} fontSize={"14px"}>$ </Text>
                            <Text fontWeight={500} fontSize={"12px"} color={budgeted.differencePercentage >= 0 ? "#05BA3B" : "#FF4848"}>{budgeted.differencePercentage >= 0 ? "+" : "-"}{budgeted.differenceValue}({Math.abs(budgeted.differencePercentage)}%)</Text>
                        </HStack>
                    </VStack>
                </SimpleGrid>
            </VStack>
        </Box>
    );
};

export default FinancialMatrix