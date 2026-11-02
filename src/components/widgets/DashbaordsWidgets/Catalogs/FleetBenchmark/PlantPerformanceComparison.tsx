import {
  Box,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";

import UsePlantPerformanceComparison from "../../../../../Services/Hooks/Catalog/FleetBenchmark/UsePlantPerformanceComparison";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

interface Props {
  type?: "plant" | "portfolio";
}

const PlantPerformanceComparison = ({
  type = "plant",
}: Props) => {
  const bg = useColorModeValue("#FFFFFF", "#041C4A");

  const headerColor = useColorModeValue(
    "#4A5568",
    "rgba(255,255,255,0.75)"
  );

  const textColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const rowBorderColor = useColorModeValue(
    "gray.100",
    "rgba(255,255,255,0.05)"
  );

  const {
    timeWindow,
  } = useTimeHandle(
    24,
    "hour",
    "AVG",
    [15, "minute"],
    1000
  );

  const searchTag = {
    devName: "calculation",
    keys:
      "capacity,PR_Percent,CUF_AC,PV_Daily_Energy_Today,Inverter_Availability,pv_revenue",
  };

  const {
    data,
    fetchPlantPerformanceComparison,
  } = UsePlantPerformanceComparison(
    searchTag,
    timeWindow,
    type
  );

  useEffect(() => {
    fetchPlantPerformanceComparison();
  }, [timeWindow, type]);

  const rows = data?.data || [];
  const fleetAverage = data?.fleetAverage;
    return (
    <Box
      h="360px"
      bg={bg}
      borderRadius="10px"
      border="1px solid"
      borderColor={useColorModeValue(
        "gray.200",
        "rgba(80,140,255,0.20)"
      )}
      px={4}
      py={3}
      overflow="hidden"
    >
      <Text
        fontSize="13px"
        fontWeight="700"
        textTransform="uppercase"
        color={textColor}
        mb={4}
      >
        Plant Performance Comparison
      </Text>

      {/* Header */}

      <Flex
        fontSize="11px"
        color={headerColor}
        fontWeight="600"
        pb={2}
      >
        <Box w="40px">Rank</Box>
        <Box flex="1.7">Plant</Box>
        <Box w="70px">Capacity</Box>
        <Box w="55px">PR</Box>
        <Box w="55px">CUF</Box>
        <Box w="75px">Yield</Box>
        <Box w="90px">Availability</Box>
        <Box w="80px">Revenue</Box>
        <Box w="75px">vs Fleet</Box>
      </Flex>

      <Divider mb={1} />

      {rows.map((row: any) => (
        <Flex
          key={row.rank}
          align="center"
          h="38px"
          borderBottom="1px solid"
          borderColor={rowBorderColor}
          fontSize="12px"
        >
          <Box
            w="40px"
            color="#FFC107"
            fontWeight="700"
          >
            {row.rank}
          </Box>

          <Box
            flex="1.7"
            color={textColor}
            isTruncated
          >
            {row.plantName}
          </Box>

          <Box w="70px" color={textColor}>
            {row.capacityMW.toFixed(1)}
          </Box>

          <Box
            w="55px"
            color="#00E676"
            fontWeight="700"
          >
            {row.prPercent.toFixed(1)}
          </Box>

          <Box w="55px" color={textColor}>
            {row.cufPercent.toFixed(1)}
          </Box>

          <Box w="75px" color={textColor}>
            {row.yield.toFixed(2)}
          </Box>

          <Box w="90px" color={textColor}>
            {row.availabilityPercent.toFixed(2)}
          </Box>

          <Box w="80px" color={textColor}>
            {row.revenue.toFixed(2)}
          </Box>

          <Box
            w="75px"
            color={
              row.fleetDeviation >= 0
                ? "#00E676"
                : "#FF5252"
            }
            fontWeight="700"
          >
            {row.fleetDeviation >= 0 ? "+" : ""}
            {row.fleetDeviation.toFixed(2)}%
          </Box>
        </Flex>
      ))}

      <Divider my={3} />

      {fleetAverage && (
        <Flex
          align="center"
          h="40px"
          fontWeight="700"
          color={textColor}
        >
          <Box flex="1.7">
            FLEET AVERAGE
          </Box>

          <Box w="70px">
            {fleetAverage.capacityMW.toFixed(1)}
          </Box>

          <Box w="55px">
            {fleetAverage.prPercent.toFixed(1)}
          </Box>

          <Box w="55px">
            {fleetAverage.cufPercent.toFixed(1)}
          </Box>

          <Box w="75px">
            {fleetAverage.yield.toFixed(2)}
          </Box>

          <Box w="90px">
            {fleetAverage.availabilityPercent.toFixed(2)}
          </Box>

          <Box w="80px">
            {fleetAverage.revenue.toFixed(2)}
          </Box>

          <Box w="75px">—</Box>
        </Flex>
      )}
    </Box>
  );
};

export default PlantPerformanceComparison;