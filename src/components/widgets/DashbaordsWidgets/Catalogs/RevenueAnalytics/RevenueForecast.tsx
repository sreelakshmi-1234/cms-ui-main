import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const RevenueForecast = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const apiData = [
    {
      name: "Forecast",
      color: "#3D8BFF",
      data: [2, 4, 5, 7, 9, 11, 12, 14, 15, 16, 16.75],
    },
    {
      name: "Expected",
      color: "#F5A623",
      data: [2, 3, 4, 6, 8, 9, 11, 13, 14, 15, 15.82],
    },
    {
      name: "Actual",
      color: "#2ECC71",
      data: [2, 4, 6, 6, 10, 9, 12, 11, 13.5, null, null],
    },
    {
      name: "At Risk",
      color: "#FF4D4F",
      data: [0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93],
    },
  ];

  const chartProps = {
    chart: {
      backgroundColor: "transparent",
    },

    xAxis: {
      categories: [
        "1 May",
        "3 May",
        "5 May",
        "7 May",
        "10 May",
        "12 May",
        "14 May",
        "17 May",
        "21 May",
        "28 May",
        "31 May",
      ],
    },

    yAxis: {
      title: {
        text: "₹ Crore",
      },
      min: 0,
      max: 20,
    },

    legend: {
      enabled: true,
    },
  };

  return (
    <GraphLayout
      title="REVENUE FORECAST (This Month)"
      width={["100%"]}
      height={["100%"]}
    >
      <Box
        h="100%"
        bg={cardBg}
        position="relative"
      >
        {/* KPI ROW */}

        <Flex
          justify="space-around"
          py={2}
          borderBottom="1px solid rgba(255,255,255,0.06)"
        >
          <Box textAlign="center">
            <Text
              color="#AFC7E8"
              fontSize="10px"
            >
              FORECAST (MONTH END)
            </Text>

            <Text
              color="#3D8BFF"
              fontWeight="700"
              fontSize="18px"
            >
              ₹ 16.75 Cr
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              color="#FF8A50"
              fontSize="10px"
            >
              EXPECTED (AT RISK)
            </Text>

            <Text
              color="#F5A623"
              fontWeight="700"
              fontSize="18px"
            >
              ₹ 0.93 Cr
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              color="#7ED957"
              fontSize="10px"
            >
              LIKELY REVENUE
            </Text>

            <Text
              color="#2ECC71"
              fontWeight="700"
              fontSize="18px"
            >
              ₹ 15.82 Cr
            </Text>
          </Box>
        </Flex>

        {/* legend removed per request */}

        {/* CHART */}

        <Box px={2}>
          <LineChart
            height={240}
            apiData={apiData}
            onExportReady={setExportFunctions}
            props={chartProps}
          />
        </Box>

        {/* RIGHT SIDE VALUES */}

        <Box
          position="absolute"
          right="8px"
          top="120px"
          zIndex={2}
        >
          <Text
            color="#3D8BFF"
            fontSize="11px"
            fontWeight="700"
          >
            16.75 Cr
          </Text>

          <Text
            color="#2ECC71"
            fontSize="11px"
            fontWeight="700"
            mt="14px"
          >
            15.82 Cr
          </Text>

          <Text
            color="#FF4D4F"
            fontSize="11px"
            fontWeight="700"
            mt="45px"
          >
            0.93 Cr
          </Text>
        </Box>
      </Box>
    </GraphLayout>
  );
};

export default RevenueForecast;