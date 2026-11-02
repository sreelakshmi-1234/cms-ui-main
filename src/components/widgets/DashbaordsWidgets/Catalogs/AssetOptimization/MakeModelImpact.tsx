import {
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

const MakeModelImpact = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const series = [
    {
      name: "Revenue / MW",
      data: [0.74, 0.68, 0.62, 0.55, 0.51, 0.48],
      color: "#2F80ED",
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(0,153,255,0.15)"
      overflow="hidden"
    >
      <GraphLayout
        title="MAKE & MODEL IMPACT ON PORTFOLIO"
        width={["100%"]}
        height="100%"
        titleFontSize="11px"
        titleLengthSVG={80}
        titleLengthLongSVG={180}
        downloadOption={false}
        fullScreen={false}
      >
        <Box px={2}>
          {/* <Text
            fontSize="9px"
            color="gray.400"
            textAlign="center"
            mb={1}
          >
            Revenue per MW (Last 30 Days)
          </Text> */}

          <ColumnChart
            height={190}
            apiData={series}
            props={{
              xAxis: {
                categories: [
                  "Sungrow",
                  "Huawei",
                  "SMA",
                  "Growatt",
                  "Sineng",
                  "Delta",
                ],
                labels: {
                  style: {
                    fontSize: "10px",
                  },
                },
              },

              yAxis: {
                min: 0,
                max: 0.8,
                tickInterval: 0.2,
                title: {
                  text: "",
                },
                labels: {
                  style: {
                    fontSize: "10px",
                  },
                },
              },

              plotOptions: {
                column: {
                  pointWidth: 18,
                  borderRadius: 2,
                  dataLabels: {
                    enabled: true,
                    format: "{y}",
                    style: {
                      fontSize: "9px",
                    },
                  },
                },
              },

              legend: {
                enabled: false,
              },

              tooltip: {
                pointFormat:
                  "<b>{point.y:.2f}</b> ₹ Lac/MW",
              },
            }}
          />
        </Box>
      </GraphLayout>
    </Box>
  );
};

export default MakeModelImpact;