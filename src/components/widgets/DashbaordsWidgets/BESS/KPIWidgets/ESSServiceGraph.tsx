import { Box, HStack, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UseLatestValueOfSameKeyMultipleDevice from "../../../../../Services/Hooks/UseLatestValueOfSameKeyMultipleDevice";
import DGRuntimeCircularChart from "../../../charts/DGRuntimeCircularChart";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";


const ESSServiceGraph = () => {
    // *********************** SERVICES *****************

    const colors = ["#EB623B", "#6FD195", "#3CB4FF", "#FFBE3D", "#C45EFF", "#FF8C28", "#FF3E98", "#FF68F5", "#A0C81F", "#33E2C2", "#1865FF", "#FF3E98"]
    const [currentWidgetInterval, setCurrentWidgetInterval] = useState<"daily" | "month" | "year">('daily');

    const tempData = [
        {
            name : "Manual",
            y : 4.3
        },
        {
            name : "Static Peak Shaving",
            y : 6.7
        },
        {
            name : "Dynamic Peak Shaving",
            y : 20
        },
        {
            name : "Frequency Regulation",
            y : 24
        },
        {
            name : "Equilizer",
            y : 14
        },
        {
            name : "Balancer",
            y : 9.9
        },
        {
            name : "Cycler",
            y : 3
        },
        {
            name : "Capacity Firming",
            y : 24
        },
        {
            name : "On Demand",
            y : 16
        },
        {
            name : "Power Smoothing",
            y : 20
        },
        {
            name : "Frequency Drop",
            y : 12
        },
        {
            name : "Reactive Power",
            y : 19.5
        },
    ]
    const [series, setSeries] = useState<any>([
        {
            type : "column",
            name : "Hrs %",
            data : tempData.map((item, i) => (
                {
                    name : item.name,
                    color : "rgba(6, 45, 89, 0.02)",
                    y : 100 - parseFloat(((item.y * 100)/24).toFixed(1))
                }
            )),
            pointWidth : 5,
            pointPadding: 0.1,
            groupPadding: 0,
            borderWidth: 0,
            tooltip: {
                useHTML: true,
                pointFormatter: function (this : any) {
                    return `${this.series.name}: <b>${(100 - this.y).toFixed(1)}</b>`;
                }
            }
        },
        {
            type : "column",
            name : "Hrs %",
            data : tempData.map((item, i) => (
                {
                    name : item.name,
                    color : colors[i],
                    y : parseFloat(((item.y * 100)/24).toFixed(1))
                }
            )),
            pointWidth : 5,
            pointPadding: 0.1,
            groupPadding: 0,
            borderWidth: 0,
            tooltip: {
                useHTML: true,
                pointFormatter: function (this : any) {
                    return `${this.series.name}: <b>${(this.y).toFixed(1)}</b>`;
                }
            }
        }
    ]);

    const currentColor = useColorModeValue('#062D59', 'white')
    const currentBg = useColorModeValue("#DDE3E8", "#262B27");
    return (
        <GraphLayout
            title="ESS Service"
            titleLengthSVG={100}
            titleLengthLongSVG={420}
            width={["100%"]}
            height={"100%"}
            downloadOption={false}
            timeWindow={false}
            preDefineTimeInvterval={true}
            setCurrentWidgetInterval={setCurrentWidgetInterval}
            inProgress={true}
        >
            <HStack mt={5} width={"100%"} px={"10px"} alignItems={"center"} align={"flex-start"} justifyContent={"flex-start"}>
                <Box width={"50%"}>
                    <DGRuntimeCircularChart
                        height={250}
                        apiData={
                            series
                        }
                        props={
                            tempData ? 
                            {
                                yAxis : {
                                    title: {
                                        text: null
                                    },
                                    min: 0,
                                    max: 100,
                                    gridLineWidth: 0, // No grid lines on y-axis
                                    labels: {
                                    enabled: false,
                                    tickInterval : 0
                                    },
                                },
                                plotOptions: {
                                    column: {
                                        stacking: 'normal',
                                        dataLabels: {
                                            enabled: false
                                        }
                                    }
                                },
                            } : {}
                        }
                    />
                </Box>
                <Table size={"xs"} width={"40%"} color={currentColor}>
                    <Thead>
                        <Tr bg={currentBg}>
                            <Th fontSize={"8px"} textAlign={"center"} fontWeight={"600"} textTransform={"capitalize"}>Name</Th>
                            <Th fontSize={"8px"} textAlign={"center"} fontWeight={"600"} textTransform={"capitalize"}>Hrs</Th>
                            <Th fontSize={"8px"} textAlign={"center"} fontWeight={"600"} textTransform={"capitalize"}>%</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr key={0} borderLeft={"1px solid #DDE3E8"}>
                            <Td fontSize={"8px"} borderRight={"1px solid #DDE3E8"} borderBottom={"1px solid #DDE3E8"} textAlign={"center"} display={"flex"} alignItems={"center"} justifyContent={"flex-start"}><Box bg={"gray.400"} height={"4px"} width={"4px"} borderRadius={"50%"} mx={2}></Box>Total</Td>
                            <Td fontSize={"8px"} borderRight={"1px solid #DDE3E8"} borderBottom={"1px solid #DDE3E8"} textAlign={"center"}>24</Td>
                            <Td fontSize={"8px"} borderRight={"1px solid #DDE3E8"} borderBottom={"1px solid #DDE3E8"} textAlign={"center"}>100%</Td>
                        </Tr>
                        {tempData.map((item : {name : string, y : number}, i : number) => (
                            <Tr key={i+1} borderLeft={"1px solid #DDE3E8"}>
                                <Td fontSize={"8px"} borderRight={"1px solid #DDE3E8"} borderBottom={"1px solid #DDE3E8"} textAlign={"center"} display={"flex"} alignItems={"center"} justifyContent={"flex-start"}><Box display={"inline-block"} bg={colors[i]} height={"4px"} width={"4px"} borderRadius={"50%"} mx={2}></Box>{item.name}</Td>
                                <Td fontSize={"8px"} borderRight={"1px solid #DDE3E8"} borderBottom={"1px solid #DDE3E8"} textAlign={"center"}>{item.y}</Td>
                                <Td fontSize={"8px"} borderRight={"1px solid #DDE3E8"} borderBottom={"1px solid #DDE3E8"} textAlign={"center"}>{((item.y * 100) / 24).toFixed(1)}%</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </HStack>

        </GraphLayout>
    );
};

export default ESSServiceGraph