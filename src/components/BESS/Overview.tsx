import {
 Box,
 VStack ,
 Text,
 Table,
 Tbody,
 Tr,
 Td,
 Flex,
 HStack,
 Icon,
 Stack,
} from "@chakra-ui/react";
import ChartLayout from "../Layouts/ChartLayouts/ChartLayout";
import BatteryState from "../../assets/BESS/Overview/BatteryState";
import SparkBarChart from "../widgets/charts/SparkBarChart";
import { CiTempHigh } from "react-icons/ci";
import { BsFillLightningChargeFill } from "react-icons/bs";
import PieChart from "../widgets/charts/PieChart";
import React, { useEffect, useState } from "react";
import { useTimeHandle } from "../../Services/TimeWindowSetting";
import UseBESSDaily from "../../Services/Hooks/Battery/UseBESSDaily";
import LineChart from "../widgets/charts/LineChart";
import UseBatteryStatus from "../../Services/Hooks/Battery/UseBatteryStatus";
import UseLatestValueOfSameKeyMultipleDevice from "../../Services/Hooks/UseLatestValueOfSameKeyMultipleDevice";
import UseManyDeviceSameMultipleKeys from "../../Services/Hooks/UseManyDeviceSameMultipleKeys";
import { EnlargeWidgetContent, EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../../Services/EnlargeWidget";

interface StateOfBatteryProps {
    // data : string[];
}

const StateOfBattery : React.FC<StateOfBatteryProps> = ( {} ) => {

    // ********* Dynamic Battery Widget Value ************
    var searchStatus = {
        devName : "PCS-1",
        keys : "ESS_SOC"
    }
    const batteryStatus = UseBatteryStatus(searchStatus) || [0];

    // ******** State of BAttery Below Dynamic Battery Widget ***************
    var searchPower = {
        devName : "PCS-1",
        keys : "AC_Active_Power_Watt"
    }
    const batteryPower = UseBatteryStatus(searchPower) || [0];

    // ******* Table of Widget *********
    var searchReactive = {
        devName : "PCS-1",
        keys : "AC_Reactive_Power_var"
    }
    const batteryReactive = UseBatteryStatus(searchReactive) || [0]; 

    var searchChargeDay = {
        devName : "PCS-1",
        keys : "kWhcharged_Day"
    }
    const batteryChargeDay = UseBatteryStatus(searchChargeDay) || [0];

    var searchDisChargeDay = {
        devName : "PCS-1",
        keys : "kWhdischarged_Day"
    }
    const batteryDisChargeDay = UseBatteryStatus(searchDisChargeDay) || [0];

    const tableRows = [["Units Available", 0], 
                        ["Chargeable Energy ", `${0} kW`],
                        ["Units Running", 0],
                        ["Reactive Power", `${batteryReactive[0]} VAR`],
                        ["Chargeable Power", `${batteryChargeDay[0]} kW`],
                        ["Dischargeable Energy", `${0} kWh`],
                        ["Dischargeable Power", `${batteryDisChargeDay[0]} kW`],
                        ["Apparent Power", `${0} VA`],
                        ["Active power", `${batteryPower[0]} kW`], 
                        ["Grid Forming Voltage Slew", `${0} %/s`]];
    return (
        <ChartLayout
            title="State Of Battery"
            width={["320px", "100%"]}
            height={["780px", "780px", "780px", "780px", EnlargeWidgetSize(780) + "px"]}
        >
            <VStack>
                <Box 
                    width={"60%"}
                    my={5}
                >
                    <BatteryState
                        batteryPercentage={batteryStatus[0]}
                    />

                    <Text
                        fontFamily={"inter"}
                        fontSize={EnlargeWidgetSize(16)}
                        fontWeight={600}
                        letterSpacing={EnlargeWidgetSize(1)}
                        color={batteryPower[0] > 0 ? "#B11F24" : batteryPower[0] == 0? "red" : "#03BB7D"}
                    ><center>{batteryPower[0] > 0 ? "DISCHARGING..." : batteryPower[0] == 0? "IDLE" : "CHARGING..."}</center></Text>
                </Box>
                <Table variant={"simple"}>
                    <Tbody>
                    {tableRows.map((_, i) => {
                        if (i % 2 === 0 && i + 1 < tableRows.length) {
                            return (
                            <Tr key={i}>
                                <Td 
                                    borderBottom={"none"}
                                    borderTop={"1px solid #C1C1C1"}
                                    borderRight={"1px solid #C1C1C1"}
                                    fontFamily={"inter"}
                                    fontWeight={500}
                                    fontSize={[10, EnlargeWidgetSize(12)]}
                                    color={"#000000"}
                                    letterSpacing={EnlargeWidgetSize(1)}
                                >
                                <VStack align={"left"} spacing={window.screen.height > 900 ? 5 : 0}>
                                    <Text>{tableRows[i][0]}</Text>
                                    <Text
                                        fontSize={[12, EnlargeWidgetSize(17)]}
                                        fontWeight={600}
                                        color={"#03BB7D"}
                                        mt={1}
                                    >
                                    {tableRows[i][1]}
                                    </Text>
                                </VStack>
                                </Td>
                                <Td 
                                    borderBottom={"none"}
                                    borderTop={"1px solid #C1C1C1"}
                                    fontFamily={"inter"}
                                    fontWeight={500}
                                    fontSize={[10, EnlargeWidgetSize(12)]}
                                    color={"#000000"}
                                    letterSpacing={EnlargeWidgetSize(1)}
                                >
                                <VStack align={"left"} spacing={window.screen.height > 900 ? 5 : 0}>
                                    <Text>{tableRows[i+1][0]}</Text>
                                    <Text
                                        fontSize={[12, EnlargeWidgetSize(17)]}
                                        fontWeight={600}
                                        color={"#03BB7D"}
                                        mt={1}
                                    >
                                    {tableRows[i+1][1]}</Text>
                                </VStack>
                                </Td>
                            </Tr>
                            );
                        }
                        return null;
                        })}

                    </Tbody>
                </Table>
            </VStack>
        </ChartLayout>
    );
};

// Some Title Will Change in Future
interface data {
    bar : number[];
    temp : number;
    volt : number
}

interface SubModuleOverviewProps { 
    apiData? : data[];
}
export const SubModuleOverview : React.FC <SubModuleOverviewProps> = ( {apiData = [{bar : [0,0,0], temp : 0, volt : 0}]} ) => {
    
    return (
        <ChartLayout
            title="Sub Module Overview"
            width={["full", "auto"]}
            height = {EnlargeWidgetSize(200) + "px"}
            overflow="auto"
        >
            <Box mt={5}>
                <hr style={{color : "#D7D7D7"}} />
                <Flex 
                    flexDirection={"column"}
                    justifyContent={"space-around"}
                >
                    {apiData.map((_, i) => (
                    <HStack 
                        key={i}
                        border={"1px solid #E4E4E4"} 
                        borderRadius={5} fontFamily={"inter"}
                        alignItems={"center"}
                        spacing={5}
                        px={5}
                        mt={2}
                    >
                        <Text
                            fontSize={EnlargeWidgetSize(12)}
                            fontWeight={600}
                            color={"#4B4B4B"}
                        >S0{i+1}.M01</Text>
                        <SparkBarChart apiData={apiData[i].bar || [22,2,22]}/>
                        <HStack spacing={1} mr={3}>
                            <Icon as={CiTempHigh} />
                            <Text
                                fontSize={EnlargeWidgetSize(14)}
                                fontWeight={600}
                                color={"#657079"}
                                >{apiData[i].temp || 0}°C</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Icon as={BsFillLightningChargeFill} boxSize={"10px"} />
                            <Text
                                fontSize={EnlargeWidgetSize(14)}
                                fontWeight={600}
                                color={"#657079"}
                                >{apiData[i].volt || 0} V</Text>
                        </HStack>
                    </HStack>
                    ))}
                    {/* *************** It will show when PCS = 1 ************ */}
                    {apiData.length == 1 ? apiData.map((_, i) => (
                    <HStack 
                        key={i}
                        border={"1px solid #E4E4E4"} 
                        borderRadius={5} fontFamily={"inter"}
                        alignItems={"center"}
                        spacing={5}
                        px={5}
                        mt={2}
                    >
                        <Text
                            fontSize={EnlargeWidgetSize(12)}
                            fontWeight={600}
                            color={"#4B4B4B"}
                        >S0 .M01</Text>
                        <SparkBarChart apiData={[0,0,0]}/>
                        <HStack spacing={1} mr={3}>
                            <Icon as={CiTempHigh} />
                            <Text
                                fontSize={EnlargeWidgetSize(14)}
                                fontWeight={600}
                                color={"#657079"}
                                >{"NA"}</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Icon as={BsFillLightningChargeFill} boxSize={"10px"} />
                            <Text
                                fontSize={EnlargeWidgetSize(14)}
                                fontWeight={600}
                                color={"#657079"}
                                >NA</Text>
                        </HStack>
                    </HStack>
                    )) : <Box></Box>}
                </Flex>
            </Box>
        </ChartLayout>
    );
};

export const BatteryBank = () => {
    return (
        <ChartLayout 
            title="Bank"
            width={["full", "auto"]}
            height={EnlargeWidgetSize(340) + "px"}
        >
            <HStack spacing={0} flexDirection={["column", "row"]}>
                <Box zIndex={2}>
                    <PieChart />
                </Box>
                <VStack
                    fontFamily={"inter"}
                    fontWeight={600}
                    zIndex={1}
                >
                    <Text
                        color={"#042441"}
                        padding={3}
                        borderBottom={"1px solid #999"}
                        fontSize={[14, EnlargeWidgetSize(11)]}
                    >MODULE TEMPERATURE </Text>
                    <HStack spacing={2} color={"#000000"} borderBottom={"1px solid #999"} px={"16%"}>
                        <Text
                            py={3}
                            fontSize={[12, EnlargeWidgetSize(18)]}
                        >Min.</Text>
                        <Text
                            py={3}
                            fontSize={[12, EnlargeWidgetSize(18)]}
                        >0°C </Text>
                    </HStack>
                    <HStack spacing={2} color={"#000000"} borderBottom={"1px solid #999"} px={"16%"}>
                        <Text
                            py={3}
                            fontSize={[12, EnlargeWidgetSize(18)]}
                        >Max.</Text>
                        <Text
                            py={3}
                            fontSize={[12, EnlargeWidgetSize(18)]}
                        >0°C </Text>
                    </HStack>
                    <HStack mt={4}>
                        <VStack
                            borderLeft={"3px solid #03BB7D"}
                            spacing={0}
                            align={"center"}
                            fontSize={[12, EnlargeWidgetSize(18)]}
                        >
                            <Text
                                color={"#000000"}
                                padding={3}
                            >Connected </Text>
                            <Text
                                color={"#000000"}
                            >0 </Text>
                        </VStack>
                        <VStack
                            borderLeft={"3px solid #FA0505"}
                            spacing={0}
                            fontSize={[12, EnlargeWidgetSize(18)]}
                        >
                            <Text
                                color={"#000000"}
                                padding={3}
                            >Disabled </Text>
                            <Text
                                color={"#000000"}
                            >0 </Text>
                        </VStack>
                    </HStack>
                </VStack>
            </HStack>
        </ChartLayout>
    );
};

export const PCS = () => {
    
    // ********************* Inverter Daily Energy *********************
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
    const pcsColor = ["#7F5B9F", "#C02626", "#3FB1B9"]
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
        <ChartLayout
            title="PCS"
            width={["full", "100%"]}
            height={EnlargeWidgetSize(500) + "px"}
            fullScreen={LatestData[0].length == 1 ? false : true}
            overflow="auto"
        >
            <Flex direction="row" wrap={"wrap"} gap={1}>
                {
                    LatestData[0]?.map((value, i) => (
                        <ChartLayout
                            title={`PCS ${i+1}`}
                            width={["full", "100%"]}
                            height={EnlargeWidgetSize(205) + "px"}
                            border="1px solid #EEEEEE"
                            mt="-5"
                        >
                            <HStack>
                                <Box borderRight={"1px solid black"} width={"50%"} height={"100%"}>
                                    <VStack fontSize={EnlargeWidgetSize(16) + "px"} fontFamily={"inter"} fontWeight={500}>
                                        <VStack>
                                            <Text>State</Text>
                                            <svg viewBox="0 0 42 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width : "30%", height : "auto"}} >
                                                <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 9 9.65039)" fill={color[0]}/>
                                                <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 29 9.65039)" fill={color[0]}/>
                                                <path d="M12 7.65026C14.7742 1.8657 24.5 -3.84961 33 7.65026" stroke={color[0]}/>
                                                <path d="M1 6.65039H9" stroke={color[0]} stroke-linecap="round"/>
                                                <path d="M33 6.65039H41" stroke={color[0]} stroke-linecap="round"/>
                                            </svg>
                                        </VStack>
                                        <VStack spacing={0}>
                                            <Text>Current</Text>
                                            <Text color={"#4A4A4A"} fontWeight={200}>{value ? typeof value == "number" ? (value as number).toFixed(2) : value : "0"  + "A"}</Text>
                                        </VStack>
                                        <VStack spacing={0}>
                                            <Text>Voltage</Text>
                                            <Text color={"#4A4A4A"} fontWeight={200}>{LatestData[1][i] ? typeof LatestData[1][i] == "number" ? (LatestData[1][i] as number).toFixed(2) : LatestData[1][i] : null} V</Text>
                                        </VStack>
                                    </VStack>
                                </Box>
                                <LineChart
                                    props={
                                                {title : 
                                                    {text : ""},
                                                    xAxis : 
                                                    {visible : false},
                                                    yAxis : 
                                                    {visible : false},
                                                    legend : {enabled : true, align : "center", itemStyle : {fontSize : "10px"}, layout : "horizontal"}, 
                                                    exporting : {enabled : false},
                                                    chart : {
                                                        height : EnlargeWidgetContent(250,200),
                                                        // width : 170
                                                    }
                                                }
                                            }
                                    apiData={PCSDailyData?.slice(i == 0 ? i : i * 2, i == 0 ? 2 : (i * 2) + 2) || [{}]}
                                />
                            </HStack>
                        </ChartLayout>
                    ))
                }
                {/* ****** IF PCS = 1 then it will show ************** */}
                {
                    LatestData[0].length == 1 ? LatestData[0].map((value, i) => (
                        <ChartLayout
                            title={`PCS`}
                            width={["full", "100%"]}
                            height={EnlargeWidgetSize(205) + "px"}
                            border="1px solid #EEEEEE"
                            mt="-10"
                        >
                            <HStack>
                                <Box borderRight={"1px solid black"} width={"50%"} height={"100%"}>
                                    <VStack fontSize={EnlargeWidgetSize(16) + "px"} fontFamily={"inter"} fontWeight={500}>
                                        <VStack>
                                            <Text>State</Text>
                                            <svg viewBox="0 0 42 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width : "30%", height : "auto"}}>
                                                <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 9 9.65039)" fill={"gray"}/>
                                                <circle cx="3" cy="3" r="3" transform="matrix(1 0 0 -1 29 9.65039)" fill={"gray"}/>
                                                <path d="M12 7.65026C14.7742 1.8657 24.5 -3.84961 33 7.65026" stroke={"gray"}/>
                                                <path d="M1 6.65039H9" stroke={"gray"} stroke-linecap="round"/>
                                                <path d="M33 6.65039H41" stroke={"gray"} stroke-linecap="round"/>
                                            </svg>
                                        </VStack>
                                        <VStack spacing={0}>
                                            <Text>Current</Text>
                                            <Text color={"#4A4A4A"} fontWeight={200}>{"A"}</Text>
                                        </VStack>
                                        <VStack spacing={0}>
                                            <Text>Voltage</Text>
                                            <Text color={"#4A4A4A"} fontWeight={200}>V</Text>
                                        </VStack>
                                    </VStack>
                                </Box>
                                <LineChart
                                    props={
                                                {title : 
                                                    {text : ""},
                                                    xAxis : 
                                                    {visible : false},
                                                    yAxis : 
                                                    {visible : false},
                                                    legend : {enabled : true, align : "center", itemStyle : {fontSize : "10px"}, layout : "horizontal"}, 
                                                    exporting : {enabled : false},
                                                    chart : {
                                                        height : EnlargeWidgetContent(205,230),
                                                        // width : 170
                                                    }
                                                }
                                            }
                                    apiData={[{}]}
                                />
                            </HStack>
                        </ChartLayout>
                    )) : <Box></Box>
                }
            </Flex>
        </ChartLayout>
    );
};