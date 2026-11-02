import {
  Box,
  Select,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

const FleetDistributionAnalysis = () => {
  const titleColor = useColorModeValue("#1A202C", "#FFFFFF");
  const legendColor = useColorModeValue("#1A202C", "#FFFFFF");

  const [metric, setMetric] = useState("PR (%)");
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const categories = [
    "< 75",
    "75 - 80",
    "80 - 85",
    "85 - 90",
    "90 - 95",
    "95 - 100",
  ];

  const seriesData = [
    {
      type: "column",
      name: "Your Fleet",
      color: "#56D364",
      data: [1.2, 2.1, 4.4, 7.3, 3.5, 1.2],
    },
    {
      type: "spline",
      name: "Top 25% Fleets",
      color: "#4DA3FF",
      dashStyle: "Dash",
      marker: {
        enabled: true,
        radius: 4,
        fillColor: "#4DA3FF",
        lineWidth: 0,
      },
      data: [1.6, 3.5, 5.8, 6.2, 5.1, 2.7],
    },
  ];

  return (
    <GraphLayout
      title="FLEET DISTRIBUTION ANALYSIS"
      titleFontSize="12px"
      width={["100%"]}
      height="360px"
      fullScreen={false}
      onExport={exportFunctions}
      WidgetProps={{
        p: 4,
      }}
    >
      <div
        ref={wrapperRef}
        style={{ height: "100%" }}
      >
        <HStack
          justify="space-between"
          align="center"
          mb={3}
        >
          <Text
            fontSize="11px"
            color={titleColor}
          >
            Metric
          </Text>

          <Select
            size="sm"
            w="120px"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          >
            <option>PR (%)</option>
            <option>CUF (%)</option>
            <option>Availability (%)</option>
          </Select>
        </HStack>

        <Box h="calc(100% - 42px)">
          <ColumnChart
            height={250}
            apiData={seriesData}
            category={categories}
            onExportReady={setExportFunctions}
            props={{
              chart: {
                backgroundColor: "transparent",
              },

              legend: {
                enabled: true,
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
                itemStyle: {
                  color: legendColor,
                  fontSize: "11px",
                  fontWeight: "400",
                },
                symbolRadius: 0,
              },

              credits: {
                enabled: false,
              },

              xAxis: {
                categories,
                title: {
                  text: "PR (%)",
                  style: {
                    color: "#A0AEC0",
                  },
                },
                labels: {
                  style: {
                    color: "#A0AEC0",
                    fontSize: "10px",
                  },
                },
                gridLineWidth: 0,
              },

              yAxis: {
                min: 0,
                max: 8,
                tickInterval: 2,
                title: {
                  text: "",
                  style: {
                    color: "#A0AEC0",
                  },
                },
                labels: {
                  style: {
                    color: "#A0AEC0",
                    fontSize: "10px",
                  },
                },
                gridLineColor: "rgba(255,255,255,0.06)",
              },

              tooltip: {
                shared: true,
              },

              plotOptions: {
                column: {
                  pointPadding: 0.12,
                  groupPadding: 0.08,
                  borderWidth: 0,
                  borderRadius: 0,
                },

                spline: {
                  lineWidth: 2,
                  dashStyle: "Dash",
                  marker: {
                    enabled: true,
                    radius: 4,
                  },
                },

                series: {
                  animation: false,
                },
              },
            }}
          />
        </Box>
      </div>
    </GraphLayout>
  );
};

export default FleetDistributionAnalysis;