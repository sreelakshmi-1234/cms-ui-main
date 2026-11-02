import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const RevenueTrend = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const labelColor = useColorModeValue('#062D59', '#D6E4FF');

  const chartData = [
    {
      name: "15 May",
      ActualRevenue: 38,
      ExpectedRevenue: 42,
      LastYear: 45,
    },
    {
      name: "16 May",
      ActualRevenue: 32,
      ExpectedRevenue: 40,
      LastYear: 58,
    },
    {
      name: "17 May",
      ActualRevenue: 48,
      ExpectedRevenue: 52,
      LastYear: 55,
    },
    {
      name: "18 May",
      ActualRevenue: 56,
      ExpectedRevenue: 65,
      LastYear: 68,
    },
    {
      name: "19 May",
      ActualRevenue: 52,
      ExpectedRevenue: 70,
      LastYear: 72,
    },
    {
      name: "20 May",
      ActualRevenue: 67,
      ExpectedRevenue: 61,
      LastYear: 82,
    },
    {
      name: "21 May",
      ActualRevenue: 61,
      ExpectedRevenue: 78,
      LastYear: 86,
    },
  ];

  return (
    <GraphLayout title="REVENUE TREND" width={["100%"]} height={["100%"]}>
      <Box
        h="100%"
        bg={cardBg}
      >
        {/* legend removed per request */}

        <LineChart
          height={190}
          apiData={[
            {
              name: 'Actual Revenue',
              data: chartData.map((d) => d.ActualRevenue),
              color: '#00E676',
            },
            {
              name: 'Expected Revenue',
              data: chartData.map((d) => d.ExpectedRevenue),
              color: '#3FA9F5',
            },
            {
              name: 'Last Year',
              data: chartData.map((d) => d.LastYear),
              color: '#D946EF',
            },
          ]}
          props={{
            xAxis: {
              categories: chartData.map((d) => d.name),
              crosshair: true,
              labels: { style: { color: labelColor, fontSize: '12px' } },
              tickLength: 0,
              type: 'category',
            },
            yAxis: {
              title: { text: '₹ Lakh', style: { color: labelColor } },
              labels: { style: { color: labelColor, fontSize: '12px' } },
              min: 0,
              max: 100,
            },
            legend: { enabled: false },
          }}
        />

        {/* Today Revenue Box */}

        <Box
          position="absolute"
          bottom="18px"
          right="18px"
          bg="rgba(3,25,54,0.95)"
          border="1px solid rgba(0,230,118,0.5)"
          borderRadius="8px"
          px={4}
          py={2}
          boxShadow="0px 0px 10px rgba(0,230,118,0.25)"
        >
          <Text
            color="#FFD54F"
            fontSize="12px"
            fontWeight="600"
            textAlign="center"
          >
            Today
          </Text>

          <Text
            color="#00E676"
            fontSize="22px"
            fontWeight="700"
            lineHeight="1"
          >
            ₹52.7 Lakh
          </Text>
        </Box>
      </Box>
    </GraphLayout>
  );
};

export default RevenueTrend;