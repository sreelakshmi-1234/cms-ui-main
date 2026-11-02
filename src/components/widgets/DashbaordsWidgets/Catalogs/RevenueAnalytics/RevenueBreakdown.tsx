import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import DonutPieChart from "../../../charts/DonutPieChart";

const RevenueBreakdown = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );
  const labelColor = useColorModeValue('#062D59', '#D6E4FF');
  const mutedColor = useColorModeValue('#657079', '#D9D9D9');

  const revenueData = [
    {
      name: "Energy Export",
      y: 13.24,
      color: "#34C759",
    },
    {
      name: "Open Access",
      y: 1.45,
      color: "#3B82F6",
    },
    {
      name: "REC / Green Certificates",
      y: 0.78,
      color: "#F4B400",
    },
    {
      name: "Capacity Charges",
      y: 0.35,
      color: "#8E44AD",
    },
  ];

  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + item.y,
    0
  );

  return (
    <GraphLayout title="REVENUE BREAKDOWN (This Month)" width={["100%"]} height={["100%"]}>
      <Box
        h="100%"
        bg={cardBg}
      >
        <Flex
          h="220px"
          align="center"
          justify="space-between"
        >
          {/* DONUT */}

          <Box
            w="180px"
            h="180px"
            position="relative"
          >
            <DonutPieChart
              apiData={revenueData}
              pieColors={revenueData.map((r) => r.color)}
              height={180}
              legends={false}
              title={""}
              plotOptionDataEnabled={false}
            />

            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              pointerEvents="none"
            >
              <Text color={labelColor} fontSize="16px" fontWeight="700">₹ 15.82</Text>
              <Text color={mutedColor} fontSize="12px">Crore</Text>
            </Box>
          </Box>

          {/* LEGEND */}

          <VStack
            align="stretch"
            spacing={4}
            flex={1}
            pl={4}
          >
            <LegendRow
              color="#34C759"
              label="Energy Export"
              value="₹ 13.24 Cr (83.7%)"
            />

            <LegendRow
              color="#3B82F6"
              label="Open Access"
              value="₹ 1.45 Cr (9.2%)"
            />

            <LegendRow
              color="#F4B400"
              label="REC / Green Certificates"
              value="₹ 0.78 Cr (4.9%)"
            />

            <LegendRow
              color="#8E44AD"
              label="Capacity Charges"
              value="₹ 0.35 Cr (2.2%)"
            />
          </VStack>
        </Flex>
      </Box>
    </GraphLayout>
  );
};

interface LegendRowProps {
  color: string;
  label: string;
  value: string;
}

const LegendRow = ({
  color,
  label,
  value,
}: LegendRowProps) => {
  const labelColorLocal = useColorModeValue('#657079', '#D9D9D9');
  const valueColorLocal = useColorModeValue('#062D59', '#D6E4FF');

  return (
    <HStack
      justify="space-between"
      w="100%"
    >
      <HStack spacing={2}>
        <Box
          w="10px"
          h="10px"
          borderRadius="2px"
          bg={color}
        />

        <Text
          fontSize="12px"
          color={labelColorLocal}
        >
          {label}
        </Text>
      </HStack>

      <Text
        fontSize="12px"
        color={valueColorLocal}
        fontWeight="500"
      >
        {value}
      </Text>
    </HStack>
  );
};

export default RevenueBreakdown;