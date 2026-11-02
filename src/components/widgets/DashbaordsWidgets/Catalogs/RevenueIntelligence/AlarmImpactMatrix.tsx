import React from "react";
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ScatterChart from "../../../charts/ScatterChart";

const AlarmImpactMatrix = () => {
    const cardBg = useColorModeValue(
        "#ffffff",
        "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
    );

    const cardBorder = useColorModeValue(
        "1px solid rgba(0,0,0,0.08)",
        "1px solid rgba(255,255,255,0.08)"
    );

    const titleColor = useColorModeValue(
        "#1A202C",
        "#FFFFFF"
    );

    const seriesData = [
        {
            name: "Very High",
            type: "scatter",
            color: "#EF4444",
            data: [
                {
                    x: 700,
                    y: 4.0,
                },
            ],
        },
        {
            name: "High",
            type: "scatter",
            color: "#F97316",
            data: [
                {
                    x: 80,
                    y: 3.6,
                },
            ],
        },
        {
            name: "Medium",
            type: "scatter",
            color: "#FACC15",
            data: [
                {
                    x: 2,
                    y: 2.0,
                },
            ],
        },
        {
            name: "Low",
            type: "scatter",
            color: "#22C55E",
            data: [
                { x: 12, y: 3.1 },
                { x: 55, y: 3.3 },
                { x: 18, y: 2.6 },
                { x: 10, y: 2.2 },
                { x: 22, y: 1.4 },
                { x: 250, y: 1.2 },
            ],
        },
    ];

    return (
        <GraphLayout
            title="ALARM IMPACT MATRIX"
            titleFontSize="14px"
            width={["365px"]}
            height="325px"
            infoSymbol={false}
            WidgetProps={{ p: 0, m: 0, ml: "-0px", pt: "14px" }}
        >
            <Box h="270px" px={1} overflow="hidden">
                <Box w="100%" h="100%" overflow="hidden">
                    <ScatterChart
                        height={310}
                        bg="transparent"
                        apiData={seriesData}
                        props={{
                            chart: {
                                spacingLeft: 10,
                                spacingRight: 10,
                                spacingBottom: 35,
                                spacingTop: 10,
                            },

                            xAxis: {
                                min: 0,
                                max: 750,
                                tickPositions: [0, 250, 500, 750],
                                title: { text: "Frequency" },
                            },

                            yAxis: {
                                min: 0.8,
                                max: 4.8,
                                tickPositions: [0.8, 1.6, 2.4, 3.2, 4.0, 4.8],
                                title: { text: "" },
                            },

                            legend: { enabled: true, align: "center", verticalAlign: "bottom" },
                        }}
                    />
                </Box>
            </Box>
        </GraphLayout>
    );
};

export default AlarmImpactMatrix;