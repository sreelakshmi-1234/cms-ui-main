import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ScatterChart from "../../../charts/ScatterChart";

interface Props {
  height?: string | number;
}

const InverterEfficiencyBenchmark = ({
  height = "340px",
}: Props) => {
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
      name: "Sungrow",
      type: "scatter",
      color: "#3B82F6",
      data: [
        { x: 120, y: 98.8 },
        { x: 145, y: 98.4 },
        { x: 165, y: 98.9 },
        { x: 190, y: 98.5 },
        { x: 220, y: 98.7 },
        { x: 250, y: 98.6 },
      ],
    },
    {
      name: "Huawei",
      type: "scatter",
      color: "#F59E0B",
      data: [
        { x: 90, y: 98.2 },
        { x: 130, y: 98.1 },
        { x: 160, y: 98.4 },
        { x: 210, y: 98.0 },
      ],
    },
    {
      name: "Growatt",
      type: "scatter",
      color: "#22C55E",
      data: [
        { x: 100, y: 97.8 },
        { x: 150, y: 98.0 },
        { x: 180, y: 98.2 },
        { x: 230, y: 97.9 },
      ],
    },
    {
      name: "SMA",
      type: "scatter",
      color: "#A855F7",
      data: [
        { x: 80, y: 98.6 },
        { x: 110, y: 98.9 },
        { x: 170, y: 98.7 },
      ],
    },
    {
      name: "Others",
      type: "scatter",
      color: "#9CA3AF",
      data: [
        { x: 70, y: 97.9 },
        { x: 140, y: 98.1 },
        { x: 260, y: 98.3 },
      ],
    },
  ];

  return (
    <Box
      w="100%"
      h={height}
      bg={cardBg}
      borderRadius="10px"
      border={cardBorder}
      overflow="hidden"
    >
      <Flex
        justify="space-between"
        align="center"
        px={3}
        pt={3}
      >
        <Text
          color={titleColor}
          fontSize="12px"
          fontWeight="700"
        >
          INVERTER EFFICIENCY BENCHMARK
        </Text>
      </Flex>

      <Box
        h="290px"
        px={1}
        overflow="hidden"
      >
        <GraphLayout
          title=""
          width={["100%"]}
          height="290px"
          infoSymbol={false}
          WidgetProps={{ p: 0, m: 0 }}
        >
          <Box
            w="100%"
            h="100%"
            overflow="hidden"
          >
            <ScatterChart
              height={290}
              bg="transparent"
              apiData={seriesData}
              props={{
                chart: {
                  spacingLeft: 10,
                  spacingRight: 10,
                  spacingBottom: 40,
                  spacingTop: 10,
                },

                xAxis: {
                  min: 50,
                  max: 300,
                  title: {
                    text: "Capacity (kW)",
                  },
                  labels: {
                    style: {
                      fontSize: "10px",
                    },
                  },
                },

                yAxis: {
                  min: 95,
                  max: 100,
                  tickPositions: [
                    95,
                    96,
                    97,
                    98,
                    99,
                    100,
                  ],
                  title: {
                    text: "",
                  },
                  labels: {
                    style: {
                      fontSize: "10px",
                    },
                  },
                },

                legend: {
                  enabled: true,
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                },

                tooltip: {
                  pointFormat:
                    "<b>{series.name}</b><br/>Capacity: {point.x} kW<br/>Efficiency: {point.y}%"
                },
              }}
            />
          </Box>
        </GraphLayout>
      </Box>
    </Box>
  );
};

export default InverterEfficiencyBenchmark;