import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const CurtailmentImpact = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const apiData = [
    {
      name: "Available Energy",
      color: "#2E86FF",
      data: [0, 3, 12, 35, 75, 92, 105, 98, 104, 90, 40, 12, 0],
    },
    {
      name: "Allowed Export",
      color: "#F5B400",
      data: [0, 0, 8, 25, 60, 80, 86, 85, 84, 82, 28, 4, 0],
    },
    {
      name: "Actual Export",
      color: "#2ECC71",
      data: [0, 0, 8, 25, 58, 74, 75, 74, 73, 72, 26, 4, 0],
    },
  ];

  const chartProps = {
    chart: {
      backgroundColor: "transparent",
    },

    xAxis: {
      categories: [
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
      ],
    },

    yAxis: {
      title: {
        text: "MW",
      },
      min: 0,
      max: 110,
    },

    legend: {
      enabled: true,
    },
  };

  return (
    <GraphLayout
      title="CURTAILMENT IMPACT ON REVENUE (This Month)"
      titleFontSize="14px"
      width={["100%"]}
      height={["100%"]}
    >
      <Box
        h="100%"
        bg={cardBg}
        position="relative"
      >
        {/* KPI HEADER */}

        <Flex
          h="58px"
          borderBottom="1px solid rgba(255,255,255,0.08)"
          justify="space-around"
          align="center"
          mb={1}
        >
          <Box textAlign="center">
            <Text
              color="#7FB3FF"
              fontSize="10px"
            >
              Potential Revenue
            </Text>

            <Text
              color="#6CB6FF"
              fontWeight="700"
              fontSize="18px"
            >
              ₹ 16.56 Cr
            </Text>
          </Box>

          <Box
            w="1px"
            h="36px"
            bg="rgba(255,255,255,0.08)"
          />

          <Box textAlign="center">
            <Text
              color="#FF6B57"
              fontSize="10px"
            >
              Curtailment Loss
            </Text>

            <Text
              color="#FF7B61"
              fontWeight="700"
              fontSize="18px"
            >
              ₹ 1.32 Cr
            </Text>
          </Box>

          <Box
            w="1px"
            h="36px"
            bg="rgba(255,255,255,0.08)"
          />

          <Box textAlign="center">
            <Text
              color="#D6E4FF"
              fontSize="10px"
            >
              Actual Revenue
            </Text>

            <Text
              color="#2ECC71"
              fontWeight="700"
              fontSize="18px"
            >
              ₹ 15.24 Cr
            </Text>
          </Box>
        </Flex>

        {/* Legend removed per request */}

        {/* Chart */}

        <Box
          position="relative"
          h="230px"
        >
          <LineChart
            height={230}
            apiData={apiData}
            onExportReady={setExportFunctions}
            props={chartProps}
          />

          {/* Curtailment Overlay */}

          <Box
            position="absolute"
            left="38%"
            top="18px"
            width="28%"
            height="92px"
            border="1px dashed #FF4D4F"
            bg="rgba(255,0,0,0.08)"
            pointerEvents="none"
          >
            <Text
              position="absolute"
              bottom="8px"
              left="50%"
              transform="translateX(-50%)"
              color="#FF6B6B"
              fontSize="11px"
              fontWeight="600"
              whiteSpace="nowrap"
            >
              Curtailment Period
            </Text>
          </Box>
        </Box>
      </Box>
    </GraphLayout>
  );
};

export default CurtailmentImpact;