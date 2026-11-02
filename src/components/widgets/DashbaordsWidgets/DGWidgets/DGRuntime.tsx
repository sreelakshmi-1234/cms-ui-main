import { Box, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseLatestValueOfSameKeyMultipleDevice from "../../../../Services/Hooks/UseLatestValueOfSameKeyMultipleDevice";
import DGRuntimeCircularChart from "../../charts/DGRuntimeCircularChart";
import { useEffect, useState } from "react";
import { color } from "highcharts";


const DGRuntime = () => {
    // *********************** DG Runtime & Instance *****************
    // const runtimeWidget = [0,2,3,3,45,7];

    const searchDGRuntimeInstanceData = [{ DG: "DG_Runtime" }, { DG: "DG_Runtime_Instance" }];
    const DGRuntimeInstanceData = UseLatestValueOfSameKeyMultipleDevice(searchDGRuntimeInstanceData) as any;
    // const runtime = DGRuntimeInstanceData? DGRuntimeInstanceData[0] : ;
    // const totalRuntime = runtime? runtime.reduce((prev : number, current : number) => prev+current) : undefined;
    // const instance = DGRuntimeInstanceData[1];
    // const totalInstance = instance.reduce((prev, current) => prev+current);
    const [series, setSeries] = useState<any>([
        {
            type : "column",
            name : "Hrs",
            data : [{y:0,color:"red",name:""}],
            pointWidth : 12,
            pointPadding: 0.1,
            groupPadding: 0,
            borderWidth: 0,
            tooltip: {
            enabled: false,
        }
        }
    ]);
    
    // ************** RUNTIME *****************
    
    function runtimeFormat(runtime: number): string {
        // Get the total number of hours
        const hour = Math.floor(runtime / 60);
        
        // Get the remaining minutes
        const min = Math.round(runtime % 60);
        
        // Return formatted result
        return `${hour}h ${min}m`;
    }
    
    // Colors
    const colors = ["#6FD195", "#EB623B", "#3CB4FF", "#FFBE3D", "#C45EFF", "#FF8C28", "#FF3E98", "#FF68F5", "#A0C81F", "#1865FF", "#FF3E98"]
    // Set series Data
    useEffect(() => {
        if(DGRuntimeInstanceData) {
            const Bonds = [] as any;
            const data = DGRuntimeInstanceData[0].map((value:any, i:number) => {
                Bonds.push(
                    {
                        y : 24 - parseFloat((value/60).toFixed(2)),
                        color : "rgba(6, 45, 89, 0.02)",
                        name : "DG" + (i+1)
                    }
                )
                return (
                    {
                        y : parseFloat((value/60).toFixed(2)),
                        color : colors[i%(colors.length-1)],
                        name : "DG" + (i+1)
                    }
                )
            })
            setSeries([
                {
                    type : "column",
                    name : "Hrs",
                    data : Bonds,
                    pointWidth : 12,
                    pointPadding: 0.1,
                    groupPadding: 0,
                    borderWidth: 0,
                    tooltip: {
                        useHTML: true,
                        pointFormatter: function (this : any) {
                            return `${this.series.name}: <b>${(24 - this.y).toFixed(2)}</b>`;
                        }
                    }
                },
                {
                    type : "column",
                    name : "Hrs",
                    data : data,
                    pointWidth : 12,
                    pointPadding: 0.1,
                    groupPadding: 0,
                    borderWidth: 0,
                    tooltip: {
                        shared : false,
                        useHTML: true,
                        pointFormatter: function (this : any) {
                            return `${this.series.name}: <b>${(this.y).toFixed(2)}</b>`;
                        }
                    }
                }
            ]);
            // setPlotBands(Bonds)
        }
    }, [DGRuntimeInstanceData])
    return (
        <Box
            width={"100%"}
            height={"100%"}
            p={"20px"}
            pt={0}
            bg={useColorModeValue("white", "#131512")}
            color={useColorModeValue('#062D59', 'white')}
            mt={5}
        >
            <HStack justifyContent={"space-between"} height={"56px"} borderBottom={"1px solid #DDE3E8"}>
                <Text
                    fontSize={"18px"}
                    fontWeight={600}
                >
                    DG Runtime
                </Text>
                <Text
                    fontSize={"10px"}
                    color={"#9BABBD"}
                >
                    Current Day
                </Text>
            </HStack>
            <HStack 
                height={"200px"}
                width={"100%"}
                px={"40px"}
            >
                <VStack align={"flex-start"} spacing={"40px"}>
                    <VStack spacing={0} width={"180px"} height={"59px"} align={"flex-start"}>
                        <Text fontSize={"16px"}>Total Run Time</Text>
                        {DGRuntimeInstanceData && <Text fontSize={"22px"} fontWeight={700}>{DGRuntimeInstanceData[0].length > 0 ? runtimeFormat(DGRuntimeInstanceData[0].reduce((prev: number, current: number) => prev + current)) : ""}</Text>}
                    </VStack>
                    <VStack spacing={0} width={"180px"} height={"59px"} align={"flex-start"}>
                        <Text fontSize={"16px"}>Total Run Instance</Text>
                        {DGRuntimeInstanceData && <Text fontSize={"22px"} fontWeight={700}>{DGRuntimeInstanceData[0].length > 0 ? DGRuntimeInstanceData[1].reduce((prev: number, current: number) => prev + current) : ""}</Text>}
                    </VStack>
                </VStack>
                <DGRuntimeCircularChart 
                    height={180}
                    apiData={
                        series
                    }
                    props={
                        DGRuntimeInstanceData ? 
                        {
                            yAxis : {
                                title: {
                                    text: null
                                },
                                min: 0,
                                max: 24,
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
            </HStack>
            <Box height={"100px"} mt={"10px"} overflowY={"auto"} width={"100%"}>
                <HStack
                    // overflow={"auto"}
                    width={"100%"} 
                    textAlign={"center"}
                    wrap={"wrap"}
                >
                    {DGRuntimeInstanceData ? DGRuntimeInstanceData[0].map((value: number, index: number) => (
                        <Box key={index} minWidth={"140px"} pr={"47px"}>
                            <HStack align={"flex-start"}>
                                <Box h={"14px"} w={"14px"} mt={"1px"} borderRadius={"50%"} bg={colors[index % (colors.length - 1)]}></Box>
                                <VStack fontSize={"12px"} align={"flex-start"} spacing={0}>
                                    <Text fontWeight={700} color={colors[index % (colors.length - 1)]}>DG{index+1}</Text>
                                    <HStack>
                                        <Text>Runtime</Text>
                                        <Text fontWeight={600}>{runtimeFormat(value)}</Text>
                                    </HStack>
                                    <HStack>
                                        <Text>Instance</Text>
                                        <Text fontWeight={600}>{DGRuntimeInstanceData[1][index]}</Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </Box>
                    )) : <Box></Box>}
                </HStack>
            </Box>
        </Box>
    );
};

export default DGRuntime