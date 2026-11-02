import {
  Box,
  HStack,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

const BenchmarkByPlantSize = () => {
  const [metric, setMetric] = useState("PR (%)");
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const titleColor = useColorModeValue("#1A202C", "#FFFFFF");

  const categories = [
    "< 5 MW",
    "5 - 10 MW",
    "10 - 25 MW",
    "25 - 50 MW",
    "> 50 MW",
  ];

  const seriesData = [
    {
      name: "Your Fleet Avg",
      color: "#39D353",
      data: [85, 84, 86, 88, 86],
      unit: "%",
    },
    {
      name: "Top 25% Fleets",
      color: "#3B82F6",
      data: [89, 91, 91, 93, 93],
      unit: "%",
    },
  ];

  return (
    <GraphLayout
      title="BENCHMARK BY PLANT SIZE"
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
          <ColumnChart
            height={190}
            apiData={seriesData}
            category={categories}
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
                min: 60,
                max: 100,
                tickInterval: 10,

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
                column: {
                  pointPadding: 0.15,
                  groupPadding: 0.15,
                  borderWidth: 0,
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

export default BenchmarkByPlantSize;