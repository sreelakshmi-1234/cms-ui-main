import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

const TransformerLoading = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const series = [
    {
      name: "Loading (%)",
      data: [82, 76, 81, 93, 79],
      color: "#1F6FEB",
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      p={0}
      m={0}
      bg={cardBg}
      borderRadius="12px"
    >
      <GraphLayout
        title="Transformer Loading"
        width={["100%"]}
        height="100%"
        titleFontSize="12px"
        timeWindow={false}
        fullScreen={false}
        WidgetProps={{
          mt: 0,
          p: 0,
        }}
      >
        <Box
          h="100%"
          w="100%"
          px={1}
          pb={1}
        >
          <ColumnChart
            height={150}
            apiData={series}
            props={{
              chart: {
                backgroundColor: "transparent",
                marginTop: 10,
                marginLeft: 35,
                marginRight: 10,
                marginBottom: 25,
              },

              credits: {
                enabled: false,
              },

              exporting: {
                enabled: false,
              },

              xAxis: {
                categories: [
                  "TR-01",
                  "TR-02",
                  "TR-03",
                  "TR-04",
                  "TR-05",
                ],

                labels: {
                  style: {
                    fontSize: "10px",
                    color: "#8EA3C0",
                  },
                },

                lineColor:
                  "rgba(255,255,255,0.12)",
              },

              yAxis: {
                min: 0,
                max: 125,

                title: {
                  text: null,
                },

                labels: {
                  style: {
                    fontSize: "10px",
                    color: "#8EA3C0",
                  },
                },

                gridLineColor:
                  "rgba(255,255,255,0.05)",
              },

              plotOptions: {
                column: {
                  pointWidth: 18,
                  borderRadius: 2,

                  dataLabels: {
                    enabled: true,

                    // Type the formatter's `this` as any to satisfy TypeScript
                    formatter: function (this: any) {
                      return this.y + "%";
                    },

                    // Use a fixed color for labels to avoid referencing `this` here
                    style: {
                      color: "#FFFFFF",
                      textOutline: "none",
                      fontSize: "10px",
                      fontWeight: "600",
                    },

                    y: -5,
                  },

                  colorByPoint: true,
                },
              },

              series: [
                {
                  type: "column",
                  data: [
                    {
                      y: 82,
                      color: "#1F6FEB",
                    },
                    {
                      y: 76,
                      color: "#1F6FEB",
                    },
                    {
                      y: 81,
                      color: "#1F6FEB",
                    },
                    {
                      y: 93,
                      color: "#F57C00",
                    },
                    {
                      y: 79,
                      color: "#1F6FEB",
                    },
                  ],
                },
              ],

              legend: {
                enabled: false,
              },

              tooltip: {
                enabled: false,
              },
            }}
          />
        </Box>
      </GraphLayout>
    </Box>
  );
};

export default TransformerLoading;