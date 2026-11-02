import { useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const ForecastAccuracy = () => {
  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const cardBg = useColorModeValue(
    "rgba(0,0,0,0.03)",
    "rgba(255,255,255,0.03)"
  );

  const categories = [
    "00:00",
    "02:00",
    "04:00",
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
    "24:00",
  ];

  const apiData = [
    {
      type: "spline",
      name: "Forecast",
      color: "#30D158",
      lineWidth: 3,
      data: [2, 8, 22, 55, 82, 98, 110, 105, 98, 70, 35, 12, 2],
    },
    {
      type: "spline",
      name: "Actual",
      color: "#FFB000",
      lineWidth: 3,
      data: [0, 12, 30, 60, 78, 95, 106, 112, 102, 65, 28, 10, 0],
    },
    {
      type: "spline",
      name: "Day Ahead Forecast",
      color: "#16A3FF",
      dashStyle: "Dash",
      lineWidth: 2,
      data: [1, 10, 25, 58, 85, 102, 108, 110, 100, 68, 30, 8, 1],
    },
  ];

  return (
    <GraphLayout
      title="FORECAST ACCURACY"
      titleFontSize="14px"
      width={["378px"]}
      height="420px"
      fullScreen={true}
      timeWindow={false}
      onExport={exportFunctions}
        WidgetProps={{ mt: "26px", ml: "-18px" }}
    >
      <div
        ref={wrapperRef}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* KPI ROW */}

        <Flex gap={2} px={2} mb={2}>
          <Box
            flex={1}
            bg={cardBg}
            borderRadius="6px"
            textAlign="center"
            py={2}
          >
            <Text fontSize="10px" color="#8FA8C9">
              MAPE
            </Text>

            <Text
              fontSize="30px"
              fontWeight="700"
              lineHeight="30px"
            >
              6.2%
            </Text>
          </Box>

          <Box
            flex={1}
            bg={cardBg}
            borderRadius="6px"
            textAlign="center"
            py={2}
          >
            <Text fontSize="10px" color="#8FA8C9">
              RMSE
            </Text>

            <Text
              fontSize="30px"
              fontWeight="700"
              lineHeight="30px"
            >
              8.7
            </Text>

            <Text fontSize="10px" color="#8FA8C9">
              MWh
            </Text>
          </Box>

          <Box
            flex={1}
            bg={cardBg}
            borderRadius="6px"
            textAlign="center"
            py={2}
          >
            <Text fontSize="10px" color="#8FA8C9">
              Bias
            </Text>

            <Text
              fontSize="30px"
              fontWeight="700"
              lineHeight="30px"
            >
              -1.8%
            </Text>
          </Box>
        </Flex>

        <LineChart
          height={260}
          apiData={apiData}
          onExportReady={setExportFunctions}
          showHideButtons={false}
          props={{
            chart: {
              backgroundColor: "transparent",
            },

            legend: {
              enabled: true,
              align: "center",
              verticalAlign: "top",
              layout: "horizontal",
              itemStyle: {
                color: "#AFC4E8",
                fontSize: "10px",
              },
            },

            xAxis: {
              categories,
              gridLineWidth: 1,
              gridLineColor: "rgba(255,255,255,0.08)",
            },

            yAxis: {
              min: 0,
              max: 120,
              tickInterval: 20,
              title: {
                text: "",
              },
              gridLineColor: "rgba(255,255,255,0.08)",
            },

            tooltip: {
              shared: true,
            },

            plotOptions: {
              series: {
                marker: {
                  enabled: false,
                },
              },
            },
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default ForecastAccuracy;