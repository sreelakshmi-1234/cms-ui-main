import { Box, Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import LineChart from "../../../charts/LineChart";
import UseManyDeviceSameMultipleKeys from "../../../../../Services/Hooks/UseManyDeviceSameMultipleKeys";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import UseLatestValueOfSameKeyMultipleDevice from "../../../../../Services/Hooks/UseLatestValueOfSameKeyMultipleDevice";




const PCSGraphs = () => {
    const {
            timeWindow: timeWindowInverterDailyEnergy,
            handleTimeWindowChange: handleTimeWindowInverterDailyEnergyChange,
            handleReset: InverterDailyEnergyHandleReset
        } = useTimeHandle(1, "cdsf", "AVG", [1, "hour"]);

    var searchTagInverterDailyEnergy = { 
        devName : "PCS",
        keys :  "ESS_kW_PCS,ESS_kVAR_PCS",
        type : ["spline", "spline"],
        name : ["kW", "kVAR"]
    };
    const pcsColor = ["#E370FD", "#82B2FF", "#3FB1B9"]
    const PCSDailyData : any = UseManyDeviceSameMultipleKeys(searchTagInverterDailyEnergy, timeWindowInverterDailyEnergy)?.map((series : object, index : number) => ({
        ...series,
        color : pcsColor[index % 2]
    }));;

    var VoltageStatus = [
        {   PCS : "ESS_AVG_Line_Amps"   },
        {   PCS : "ESS_Ph_AB_Volt_Total_PCS"   }
    ]
    const LatestData = UseLatestValueOfSameKeyMultipleDevice(VoltageStatus) || [[]];

    var Operation = [{
        PCS : "ESS_PCSOperation"
    }]
    const OperationData = UseLatestValueOfSameKeyMultipleDevice(Operation) || [[]];
    const color = OperationData[0].map((value) => value > 0 ? "green" : "red") ;
    return (
        <Box
            width={"752px"}
            height={"344px"}
            mt={5}
            color={"#062D59"}
            bg={useColorModeValue("white", "#131512")}
            transform={"rotate(0deg)"}
            opacity={1}
        >
            <Flex flexDir={"column"} height={"100%"}>
                <Box height={"56px"} borderBottom={"1px solid #DDE3E8"}>
                    <Text height={"100%"} p={3} fontSize={"18px"} fontWeight={600} >PCS</Text>
                </Box>
                <Box 
                    p={"10px"}
                >
                    <HStack>
                    {
                        LatestData[0]?.map((value, i) => (
                        <VStack align={"flex-start"} width={"356px"} borderRight={"1px solid #DDE3E8"}>
                            <Text fontSize={"18px"} fontWeight={600} >PCS 1</Text>
                            <LineChart
                                props={
                                    {
                                        title:
                                            { text: "" },
                                        xAxis:
                                            { visible: false },
                                        yAxis:
                                            { visible: false },
                                        legend: { enabled: false, align: "center", itemStyle: { fontSize: "10px" }, layout: "horizontal" },
                                        exporting: { enabled: false },
                                        chart: {
                                            height: 198,
                                            width : 356,
                                            plotBorderWidth: 0,
                                            className : ""
                                        }
                                    }
                                }
                                apiData={PCSDailyData?.slice(i == 0 ? i : i * 2, i == 0 ? 2 : (i * 2) + 2) || [{}]}
                            />
                            <HStack width={"full"} fontSize={12 + "px"} justifyContent={"space-around"}>
                                <HStack>
                                    <Text>State</Text>
                                    <svg width={"42"} viewBox="0 0 42 10" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 9 9.65039)" fill={color[0]} />
                                        <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 29 9.65039)" fill={color[0]} />
                                        <path d="M12 7.65026C14.7742 1.8657 24.5 -3.84961 33 7.65026" stroke={color[0]} />
                                        <path d="M1 6.65039H9" stroke={color[0]} stroke-linecap="round" />
                                        <path d="M33 6.65039H41" stroke={color[0]} stroke-linecap="round" />
                                    </svg>
                                </HStack>
                                <HStack spacing={2}>
                                    <Text>Current</Text>
                                    <Text>{value ? typeof value == "number" ? (value as number).toFixed(2) : value : "0" + " A"}</Text>
                                </HStack>
                                <HStack spacing={2}>
                                    <Text>Voltage</Text>
                                    <Text>{LatestData[1][i] ? typeof LatestData[1][i] == "number" ? (LatestData[1][i] as number).toFixed(2) : LatestData[1][i] : null} V</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                        ))}
                        {/* ****** IF PCS = 1 then it will show ************** */}
                        {
                            LatestData[0].length == 1 ? LatestData[0].map((value, i) => (
                                <VStack align={"flex-start"} width={"356px"}>
                            <Text fontSize={"18px"} fontWeight={600} >PCS 2</Text>
                            <LineChart
                                props={
                                    {
                                        title:
                                            { text: "" },
                                        xAxis:
                                            { visible: false },
                                        yAxis:
                                            { visible: false },
                                        legend: { enabled: false, align: "center", itemStyle: { fontSize: "10px" }, layout: "horizontal" },
                                        exporting: { enabled: false },
                                        chart: {
                                            height: 198,
                                            width : 356,
                                            plotBorderWidth: 0,
                                            className : ""
                                        }
                                    }
                                }
                                apiData={[{}]}
                            />
                            <HStack width={"full"} fontSize={12 + "px"} justifyContent={"space-around"}>
                                <HStack>
                                    <Text>State</Text>
                                    <svg width={"42"} viewBox="0 0 42 10" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 9 9.65039)" fill={"#DDE3E8"} />
                                        <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 29 9.65039)" fill={"#DDE3E8"} />
                                        <path d="M12 7.65026C14.7742 1.8657 24.5 -3.84961 33 7.65026" stroke={"#DDE3E8"} />
                                        <path d="M1 6.65039H9" stroke={"#DDE3E8"} stroke-linecap="round" />
                                        <path d="M33 6.65039H41" stroke={"#DDE3E8"} stroke-linecap="round" />
                                    </svg>
                                </HStack>
                                <HStack spacing={2}>
                                    <Text>Current</Text>
                                    <Text>A</Text>
                                </HStack>
                                <HStack spacing={2}>
                                    <Text>Voltage</Text>
                                    <Text> V</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                        )) : <Box></Box>}
                    </HStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default PCSGraphs