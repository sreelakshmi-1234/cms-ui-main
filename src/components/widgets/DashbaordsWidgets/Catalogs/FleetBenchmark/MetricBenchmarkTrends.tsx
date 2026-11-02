import {
  Box,
  HStack,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const MetricBenchmarkTrends = () => {
  const [metric, setMetric] = useState("PR (%)");
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const titleColor = useColorModeValue("#1A202C", "#FFFFFF");

  const categories = [
    "01 May",
    "04 May",
    "07 May",
    "10 May",
    "13 May",
    "16 May",
    "19 May",
    "21 May",
  ];

  const seriesData = [
    {
      name: "Your Fleet Avg",
      data: [87, 88, 87, 90, 89, 88, 88, 87],
      color: "#39D353",
      unit: "%",
    },
    {
      name: "Top 25% Fleets",
      data: [92, 93, 94, 93, 92, 92, 93, 93],
      color: "#3B82F6",
      unit: "%",
      dashStyle: "Dash",
    },
    {
      name: "Industry Avg",
      data: [81, 81, 80, 81, 80, 81, 81, 81],
      color: "#F59E0B",
      unit: "%",
      dashStyle: "Dash",
    },
  ];

  return (
    <GraphLayout
      title="METRIC BENCHMARK TRENDS"
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
          <LineChart
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
                  fontWeight: "400",
                },
              },

              xAxis: {
                categories,
                gridLineWidth: 0,
                labels: {
                  style: {
                    color: useColorModeValue(
                      "#4A5568",
                      "#A0AEC0"
                    ),
                    fontSize: "10px",
                  },
                },
              },

              yAxis: {
                min: 70,
                max: 100,
                tickInterval: 5,

                title: {
                  text: "PR (%)",
                  style: {
                    color: useColorModeValue(
                      "#4A5568",
                      "#A0AEC0"
                    ),
                  },
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

              plotOptions: {
                series: {
                  marker: {
                    enabled: true,
                    radius: 3,
                  },
                  lineWidth: 2,
                },
              },

              tooltip: {
                shared: true,
              },
            }}
          />
        </Box>
      </div>
    </GraphLayout>
  );
};

export default MetricBenchmarkTrends;