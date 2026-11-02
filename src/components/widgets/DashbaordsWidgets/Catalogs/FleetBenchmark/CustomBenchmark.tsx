import {
  Box,
  Flex,
  Text,
  Select,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

const CustomBenchmark = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg, #041C44 0%, #02142F 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,115,255,0.20)",
    "rgba(0,180,255,0.20)"
  );

  const titleColor = useColorModeValue("#0F172A", "#FFFFFF");
  const labelColor = useColorModeValue("#64748B", "#94A3B8");
  const textColor = useColorModeValue("#334155", "#CBD5E1");

  const benchmarkData = [
    {
      metric: "PR (%)",
      fleet: "88.12",
      benchmark: "92.45",
      diff: "▼ -4.33",
      diffColor: "#EF4444",
    },
    {
      metric: "CUF (%)",
      fleet: "23.48",
      benchmark: "24.91",
      diff: "▼ -1.43",
      diffColor: "#EF4444",
    },
    {
      metric: "Specific Yield (kWh/kWp)",
      fleet: "4.62",
      benchmark: "4.93",
      diff: "▼ -0.31",
      diffColor: "#EF4444",
    },
    {
      metric: "Availability (%)",
      fleet: "99.21",
      benchmark: "99.52",
      diff: "▼ -0.31",
      diffColor: "#EF4444",
    },
    {
      metric: "Revenue / MW (₹ Lakh)",
      fleet: "5.27",
      benchmark: "5.89",
      diff: "▼ -0.62",
      diffColor: "#EF4444",
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="10px"
      px={3}
      py={2}
      overflow="hidden"
      boxShadow="0px 0px 12px rgba(0,140,255,0.08)"
    >
      {/* Header */}

      <Text
        fontSize="13px"
        fontWeight="700"
        color={titleColor}
        textTransform="uppercase"
        mb={4}
      >
        CUSTOM BENCHMARK
      </Text>

      {/* Dropdown Row */}

      <HStack
        justify="space-between"
        align="center"
        mb={4}
      >
        <Text
          fontSize="12px"
          color={labelColor}
        >
          Compare Your Fleet With
        </Text>

        <Select
          size="sm"
          w="165px"
          h="32px"
          fontSize="12px"
          icon={<FiChevronDown />}
          bg={useColorModeValue("#F8FAFC", "#071A3D")}
          borderColor={useColorModeValue(
            "gray.200",
            "rgba(255,255,255,0.10)"
          )}
          color={titleColor}
          _focus={{
            borderColor: "#2563EB",
            boxShadow: "none",
          }}
        >
          <option value="top25">
            Industry Top 25%
          </option>
          <option value="top10">
            Industry Top 10%
          </option>
          <option value="best">
            Best Performing Fleet
          </option>
        </Select>
      </HStack>

      {/* Table */}

      <VStack
        spacing={2}
        align="stretch"
      >
        {benchmarkData.map((item, index) => (
          <Flex
            key={index}
            align="center"
            justify="space-between"
            fontSize="12px"
          >
            <Box
              w="125px"
              color={textColor}
            >
              {item.metric}
            </Box>

            <Box
              w="45px"
              textAlign="right"
              color={titleColor}
              fontWeight="500"
            >
              {item.fleet}
            </Box>

            <Text
              w="25px"
              textAlign="center"
              color={labelColor}
              fontWeight="600"
            >
              vs
            </Text>

            <Box
              w="55px"
              textAlign="right"
              color="#22C55E"
              fontWeight="700"
            >
              {item.benchmark}
            </Box>

            <Box
              w="55px"
              textAlign="right"
              color={item.diffColor}
              fontWeight="700"
            >
              {item.diff}
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default CustomBenchmark;