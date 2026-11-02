import { Box, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const EnvironmentalConditions = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const categories = [
    "00:00",
    "03:00",
    "06:00",
    "09:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
    "24:00",
  ];

  const apiData = [
    {
      type: "spline",
      name: "Irradiance (W/m²)",
      color: "#F4C20D",
      lineWidth: 2,
      data: [50, 120, 300, 820, 1050, 1050, 980, 700, 420],
    },
    {
      type: "spline",
      name: "Temp (°C)",
      color: "#FF5722",
      lineWidth: 2,
      dashStyle: "ShortDash",
      data: [18, 19, 22, 25, 31, 38, 44, 43, 42],
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      p={0}
      m={0}
    >
      <GraphLayout
        title="Environmental Conditions"
        titleFontSize="12px"
        width={["100%"]}
        height="100%"
        timeWindow={false}
        fullScreen={false}
        onExport={exportFunctions}
        WidgetProps={{
          mt: 0,
          p: 0,
        }}
      >
        <div
          ref={wrapperRef}
          style={{
            height: "100%",
            width: "100%",
            margin: 0,
            padding: 0,
          }}
        >
          <LineChart
            height={170}
            apiData={apiData}
            onExportReady={setExportFunctions}
            props={{
              chart: {
                backgroundColor: "transparent",
                marginTop: 10,
                marginLeft: 35,
                marginRight: 30,
                marginBottom: 60,
              },

              credits: {
                enabled: false,
              },

              exporting: {
                enabled: false,
              },

              legend: {
                enabled: true,
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
                y: 18,
                itemStyle: {
                  color: "#B8C5D9",
                  fontSize: "10px",
                  fontWeight: "400",
                },
              },

              xAxis: {
                categories,

                tickLength: 0,

                labels: {
                  style: {
                    color: "#8EA3C0",
                    fontSize: "10px",
                  },
                },

                lineColor: "rgba(255,255,255,0.12)",

                gridLineWidth: 1,
                gridLineColor:
                  "rgba(255,255,255,0.04)",
              },

              yAxis: [
                {
                  title: {
                    text: null,
                  },

                  min: 0,
                  max: 1200,

                  tickPositions: [
                    0,
                    400,
                    800,
                    1200,
                  ],

                  labels: {
                    style: {
                      color: "#8EA3C0",
                      fontSize: "10px",
                    },
                  },

                  gridLineColor:
                    "rgba(255,255,255,0.05)",
                },

                {
                  title: {
                    text: null,
                  },

                  min: 0,
                  max: 60,

                  opposite: true,

                  tickPositions: [
                    0,
                    20,
                    40,
                    60,
                  ],

                  labels: {
                    style: {
                      color: "#8EA3C0",
                      fontSize: "10px",
                    },
                  },

                  gridLineWidth: 0,
                },
              ],

              tooltip: {
                shared: true,
              },

              plotOptions: {
                series: {
                  marker: {
                    enabled: true,
                    radius: 2,
                  },
                },
              },
            }}
          />
        </div>
      </GraphLayout>
    </Box>
  );
};

export default EnvironmentalConditions;