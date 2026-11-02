import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiCpu,
  FiActivity,
  FiTrendingUp,
} from "react-icons/fi";

const InverterFleetPerformance = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const titleColor = useColorModeValue(
    "#0F172A",
    "#FFFFFF"
  );

  const kpis = [
    {
      title: "Total Inverters",
      value: "158",
      icon: FiCpu,
      color: "#60A5FA",
    },
    {
      title: "Avg. Efficiency",
      value: "98.13 %",
      icon: FiActivity,
      color: "#22C55E",
    },
    {
      title: "Availability",
      value: "99.21 %",
      icon: FiTrendingUp,
      color: "#22C55E",
    },
  ];

  const rows = [
    ["Sungrow", "44", "98.65", "99.31", "27.4%", "1"],
    ["Huawei", "38", "98.42", "99.18", "20.9%", "2"],
    ["SMA", "26", "98.10", "98.92", "14.3%", "3"],
    ["Growatt", "16", "97.94", "98.62", "11.1%", "4"],
    ["Sineng", "12", "97.75", "98.41", "8.3%", "5"],
    ["Delta", "14", "97.31", "98.12", "6.0%", "6"],
    ["Others", "8", "96.80", "97.60", "3.0%", "7"],
  ];

  return (
    <Box
      w="100%"
      h="100%"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(0,153,255,0.15)"
      p={3}
      overflow="hidden"
    >
      <Text
        fontSize="12px"
        fontWeight="700"
        mb={3}
        color={titleColor}
      >
        INVERTER FLEET PERFORMANCE BY MAKE
      </Text>

      {/* KPI ROW */}

      <HStack spacing={3} mb={3}>
        {kpis.map((item) => (
          <Flex
            key={item.title}
            flex={1}
            align="center"
            gap={2}
            p={2}
            borderRadius="8px"
            border="1px solid rgba(255,255,255,0.08)"
            bg="rgba(255,255,255,0.02)"
          >
            <Icon
              as={item.icon}
              color={item.color}
              boxSize={4}
            />

            <Box>
              <Text
                fontSize="9px"
                color="gray.400"
              >
                {item.title}
              </Text>

              <Text
                fontSize="16px"
                fontWeight="700"
              >
                {item.value}
              </Text>
            </Box>
          </Flex>
        ))}
      </HStack>

      {/* TABLE */}

      <Grid
        templateColumns="1.4fr 0.8fr 1.1fr 1.1fr 1.2fr 0.6fr"
        fontSize="10px"
        borderTop="1px solid rgba(255,255,255,0.08)"
      >
        <GridItem p={2} fontWeight="700">
          Make
        </GridItem>

        <GridItem p={2} fontWeight="700">
          Inverters
        </GridItem>

        <GridItem p={2} fontWeight="700">
          Avg. Eff.
        </GridItem>

        <GridItem p={2} fontWeight="700">
          Availability
        </GridItem>

        <GridItem p={2} fontWeight="700">
          Revenue
        </GridItem>

        <GridItem p={2} fontWeight="700">
          Rank
        </GridItem>

        {rows.map((row) => (
          <>
            <GridItem
              p={2}
              borderTop="1px solid rgba(255,255,255,0.05)"
            >
              {row[0]}
            </GridItem>

            <GridItem
              p={2}
              borderTop="1px solid rgba(255,255,255,0.05)"
            >
              {row[1]}
            </GridItem>

            <GridItem
              p={2}
              color="#22C55E"
              borderTop="1px solid rgba(255,255,255,0.05)"
            >
              {row[2]}
            </GridItem>

            <GridItem
              p={2}
              borderTop="1px solid rgba(255,255,255,0.05)"
            >
              {row[3]}
            </GridItem>

            <GridItem
              p={2}
              color="#22C55E"
              borderTop="1px solid rgba(255,255,255,0.05)"
            >
              {row[4]}
            </GridItem>

            <GridItem
              p={2}
              color="#F59E0B"
              fontWeight="700"
              borderTop="1px solid rgba(255,255,255,0.05)"
            >
              {row[5]}
            </GridItem>
          </>
        ))}
      </Grid>

      <Button
        size="xs"
        mt={3}
        w="220px"
        display="block"
        mx="auto"
        variant="outline"
        fontSize="10px"
      >
        View Inverter Benchmark
      </Button>
    </Box>
  );
};

export default InverterFleetPerformance;