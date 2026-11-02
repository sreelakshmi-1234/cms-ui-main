import { useState } from "react";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import { Box, useColorModeValue } from "@chakra-ui/react";
import BubbleChart from "../../../charts/BubbleChart";

HighchartsMore(Highcharts);

const AssetHealthVsRevenue = () => {
    const [exportFunctions, setExportFunctions] = useState<any>(null);

    const textColor = useColorModeValue("#1A202C", "#D6E4FF");

    const options: Highcharts.Options = {
        chart: {
            type: "bubble",
            backgroundColor: "transparent",
            height: 250,
        },

        title: {
            text: undefined,
        },

        credits: {
            enabled: false,
        },


        xAxis: {
            min: 0,
            max: 100,
            tickInterval: 20,
            title: {
                text: "Health Score",
                style: {
                    color: textColor,
                },
            },
            labels: {
                style: {
                    color: textColor,
                },
            },
            gridLineWidth: 1,
            gridLineColor: "rgba(255,255,255,0.08)",
        },

        yAxis: {
            type: "logarithmic",
            min: 10000,
            max: 10000000,

            title: {
                text: undefined,
                style: {
                    color: textColor,
                },
            },

            labels: {
                style: {
                    color: textColor,
                },

                formatter: function () {
                    const v = Number(this.value);

                    if (v >= 1000000) {
                        return `${v / 1000000}L`;
                    }

                    if (v >= 10000) {
                        return `${v / 1000}k`;
                    }

                    return String(v);
                },
            },

            gridLineWidth: 1,
            gridLineColor: "rgba(255,255,255,0.08)",
        },

        tooltip: {
            useHTML: true,
            pointFormat:
                "<b>Health Score:</b> {point.x}<br/><b>Revenue:</b> {point.y}<br/><b>Capacity:</b> {point.z} MW",
        },

        plotOptions: {
            bubble: {
                minSize: 8,
                maxSize: 22,
            },
        },

        series: [
            {
                type: "bubble",
                name: "10 MW",
                color: "#3B82F6",
                data: [
                    [70, 5000000, 10],
                    [85, 1200000, 10],
                    [90, 1800000, 10],
                ],
            },

            {
                type: "bubble",
                name: "5 MW",
                color: "#FACC15",
                data: [
                    [45, 1500000, 5],
                    [65, 1400000, 5],
                    [50, 300000, 5],
                ],
            },

            {
                type: "bubble",
                name: "2 MW",
                color: "#22C55E",
                data: [
                    [75, 300000, 2],
                    [80, 700000, 2],
                    [60, 100000, 2],
                    [90, 120000, 2],
                ],
            },

            {
                type: "bubble",
                name: "1 MW",
                color: "#EF4444",
                data: [
                    [35, 150000, 1],
                    [40, 60000, 1],
                    [55, 200000, 1],
                    [30, 90000, 1],
                    [45, 120000, 1],
                ],
            },
        ],
    };

    return (
        <GraphLayout
            title="ASSET HEALTH vs REVENUE (BUBBLE CHART)"
            titleFontSize="14px"
            width={["355px"]}
            height="320px"
            fullScreen
            timeWindow={false}
            onExport={exportFunctions}
            WidgetProps={{ mt: 0, ml: "-15px" }}
        >
            <Box w="100%" h="100%" overflow="hidden">
                <BubbleChart apiData={options.series as any} height={240} onExportReady={setExportFunctions} />
            </Box>
        </GraphLayout>
    );
};

export default AssetHealthVsRevenue;