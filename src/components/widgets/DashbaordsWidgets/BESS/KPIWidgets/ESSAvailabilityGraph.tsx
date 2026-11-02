import { lazy, Suspense, useState } from "react";
import { Box, HStack, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
const DonutPieChart = lazy(() => import("../../../charts/DonutPieChart"));


const ESSAvailabilityGraph
 = () => {
    const [currentWidgetInterval, setCurrentWidgetInterval] = useState<"daily" | "month" | "year">('daily');

    const tempData = [
        {
            name : "Stop",
            y : 2.4
        },
        {
            name : "Idle",
            y : 1
        },
        {
            name : "Charge",
            y : 11.5
        },
        {
            name : "Discharge",
            y : 8.8
        },
        {
            name : "Islanded",
            y : 0
        },
        {
            name : "Other",
            y : 0.3
        }
    ];
    const colors = ["#FD708C", "#FFAE4C", "#6FD195", "#FF5249", '#8F8F8F', '#07DBFA', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
        '#03c69b', '#00f194']
    const currentColor = useColorModeValue("#062D59", "#fff");
    const currentBg = useColorModeValue("#DDE3E8", "#262B27");
    return (
        <GraphLayout
            title="ESS Availability"
            titleLengthSVG={120}
            titleLengthLongSVG={400}
            width={["full", "auto"]}
            height={"100%"}
            downloadOption={false}
            timeWindow={false}
            preDefineTimeInvterval={true}
            setCurrentWidgetInterval={setCurrentWidgetInterval}
            inProgress={true}
        >
            <HStack mt={5} width={"100%"} px={"10px"} alignItems={"center"} align={"flex-start"} justifyContent={"flex-start"}>
                <Box width={"50%"}>
                    <Suspense fallback={<div style={{ position: "relative", top: "45%", left: "45%" }}>Loading...</div>}>
                        <DonutPieChart height={250} name="Source %" apiData={tempData.map((item, i) => (
                            {
                                name : item.name,
                                y : parseFloat(((item.y * 100) / 24).toFixed(1))
                            }
                        ))}
                            pieColors={colors}
                            legends={false}
                        />
                    </Suspense>
                </Box>
                <Table size={"xs"} width={"30%"} color={currentColor}>
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

export default ESSAvailabilityGraph
