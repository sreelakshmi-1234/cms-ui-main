import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const RevenueVsGeneration = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const axisLabelColor = useColorModeValue("#1A202C", "#D0D7E2");
  const axisLineColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(255,255,255,0.15)");
  const gridLineColor = useColorModeValue("rgba(0,0,0,0.06)", "rgba(255,255,255,0.08)");
  const legendItemColor = useColorModeValue("#1A202C", "#D0D7E2");
  const tooltipBg = useColorModeValue("#FFFFFF", "#031B44");
  const tooltipBorder = useColorModeValue("#E2E8F0", "#0A84FF");
  const tooltipText = useColorModeValue("#1A202C", "#FFFFFF");

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 190,
      spacingTop: 10,
      spacingBottom: 10,
    },

    title: {
      text: undefined,
    },

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    xAxis: {
      categories: [
        "15 May",
        "16 May",
        "17 May",
        "18 May",
        "19 May",
        "20 May",
        "21 May",
      ],
      lineColor: axisLineColor,
      tickColor: axisLineColor,
      labels: {
        style: {
          color: axisLabelColor,
          fontSize: "11px",
        },
      },
    },

    yAxis: [
      {
        title: {
          text: "",
          style: {
            color: axisLabelColor,
          },
        },
        min: 0,
        max: 80,
        gridLineColor: gridLineColor,
        labels: {
          style: {
            color: axisLabelColor,
          },
        },
      },
      {
        title: {
          text: "",
          style: {
            color: axisLabelColor,
          },
        },
        min: 0,
        max: 1000,
        opposite: true,
        gridLineWidth: 0,
        labels: {
          style: {
            color: axisLabelColor,
          },
        },
      },
    ],

    legend: {
      itemStyle: {
        color: legendItemColor,
        fontSize: "11px",
      },
      itemHoverStyle: {
        color: tooltipText,
      },
      symbolRadius: 0,
      symbolHeight: 10,
      symbolWidth: 10,
    },

    tooltip: {
      shared: true,
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      style: {
        color: tooltipText,
      },
    },

    plotOptions: {
      column: {
        borderWidth: 0,
        pointWidth: 16,
      },
      line: {
        marker: {
          enabled: true,
          radius: 3,
        },
      },
    },

    series: [
  {
    name: "Revenue (₹ Lakh)",
    color: "#34C759",
    data: [40, 36, 46, 39, 45, 52, 61],
  },
  {
    name: "Generation (MWh)",
    color: "#4A90FF",
    data: [45, 43, 52, 45, 55, 65, 68],
  },
]
  } as any;

  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const apiData = options.series as any;
  const chartProps = {
    chart: options.chart,
    xAxis: options.xAxis,
    yAxis: options.yAxis,
    legend: options.legend,
    tooltip: options.tooltip,
    plotOptions: options.plotOptions,
  } as any;

  return (
    <GraphLayout title="REVENUE VS GENERATION" width={["100%"]} height={["100%"]}>
      <Box
        h="100%"
        bg={cardBg}
      >
        <LineChart
          height={240}
          apiData={apiData}
          onExportReady={setExportFunctions}
          props={chartProps}
        />
      </Box>
    </GraphLayout>
  );
};

export default RevenueVsGeneration;