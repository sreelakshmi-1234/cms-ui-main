import {
  Box,
  HStack,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ScatterChart from "../../../charts/ScatterChart";

const PerformanceVsPlantAge = () => {
  const [metric, setMetric] = useState("PR (%)");
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const titleColor = useColorModeValue("#1A202C", "#FFFFFF");

  const yourFleetData = [
    [0.5, 70],
    [0.8, 72],
    [1.2, 75],
    [1.8, 79],
    [2.2, 83],
    [3.0, 81],
    [4.0, 77],
    [4.5, 75],
    [5.5, 76],
    [6.0, 74],
    [7.0, 75],
    [8.5, 70],
    [10.0, 74],
    [11.0, 75],
    [12.5, 74],
    [14.0, 67],
    [15.0, 75],
    [15.5, 74],
  ];

  const topFleetData = [
    [0.5, 88],
    [1.0, 86],
    [2.0, 87],
    [3.5, 90],
    [4.0, 89],
    [5.5, 88],
    [7.0, 89],
    [8.0, 92],
    [9.5, 90],
    [10.0, 88],
    [11.0, 91],
    [12.0, 89],
    [13.0, 87],
    [14.0, 90],
    [15.0, 89],
    [15.5, 91],
  ];

  const trendLine = [
    [0, 86],
    [16, 78],
  ];

  const seriesData = [
    {
      name: "Your Fleet",
      type: "scatter",
      color: "#39D353",
      data: yourFleetData,
    },
    {
      name: "Top 25% Fleets",
      type: "scatter",
      color: "#3B82F6",
      data: topFleetData,
    },
    {
      name: "Trend",
      type: "line",
      color: "#F59E0B",
      marker: {
        enabled: false,
      },
      enableMouseTracking: false,
      data: trendLine,
    },
  ];

  return (
    <GraphLayout
      title="PERFORMANCE VS PLANT AGE"
      titleFontSize="12px"
      width={["100%"]}
      height="280px"
      fullScreen={false}
      onExport={exportFunctions}
      WidgetProps={{ p: 4 }}
    >
      <div
        ref={wrapperRef}
        style={{ height: "100%" }}
      >
        <HStack
          justify="space-between"
          mb={3}
        >
          <HStack spacing={2}>
            <Text
              fontSize="11px"
              color={titleColor}
            >
              Metric
            </Text>

            <Select
              size="sm"
              w="90px"
              h="28px"
              fontSize="10px"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            >
              <option>PR (%)</option>
              <option>CUF (%)</option>
              <option>Availability (%)</option>
            </Select>
          </HStack>
        </HStack>

        <Box h="calc(100% - 40px)">
          <ScatterChart
            height={190}
            apiData={seriesData}
            onExportReady={setExportFunctions}
            props={{
              chart: {
                backgroundColor: "transparent",
              },

              credits: {
                enabled: false,
              },

              legend: {
                enabled: true,
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
                floating: false,
                y: 0,
                itemStyle: {
                  color: useColorModeValue(
                    "#1A202C",
                    "#FFFFFF"
                  ),
                  fontSize: "11px",
                },
              },

              xAxis: {
                min: 0,
                max: 16,
                tickInterval: 2,

                title: {
                  text: "Plant Age (Years)",
                },

                labels: {
                  style: {
                    color: useColorModeValue(
                      "#4A5568",
                      "#A0AEC0"
                    ),
                  },
                },
              },

              yAxis: {
                min: 60,
                max: 100,
                tickInterval: 10,

                title: {
                  text: "PR (%)",
                },

                labels: {
                  style: {
                    color: useColorModeValue(
                      "#4A5568",
                      "#A0AEC0"
                    ),
                  },
                },

                gridLineColor: useColorModeValue(
                  "#E2E8F0",
                  "rgba(255,255,255,0.06)"
                ),
              },

              tooltip: {
                shared: false,
              },

              plotOptions: {
                scatter: {
                  marker: {
                    radius: 3,
                  },
                },
              },
            }}
          />
        </Box>
      </div>
    </GraphLayout>
  );
};

export default PerformanceVsPlantAge;