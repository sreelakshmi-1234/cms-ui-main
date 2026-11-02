import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";

import UseUnderperformers from "../../../../../Services/Hooks/Catalog/FleetBenchmark/UseUnderperformers";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

interface Props {
  type?: "plant" | "portfolio";
}

const Underperformers = ({
  type = "plant",
}: Props) => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg, #041C44 0%, #02142F 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,115,255,0.20)",
    "rgba(0,180,255,0.20)"
  );

  const titleColor = useColorModeValue("#0F172A", "#FFFFFF");
  const textColor = useColorModeValue("#334155", "#CBD5E1");
  const headerColor = useColorModeValue("#64748B", "#94A3B8");

  const { timeWindow } = useTimeHandle(
    24,
    "hour",
    "AVG",
    [15, "minute"],
    1000
  );

  const searchTag = useMemo(
  () => ({
    devName: "portfolio",
    keys: "PR_Percent,pv_revenue",
    sortBy: "pr_percent",
    sortOrder: "ASC",
  }),
  []
);

  const {
    data,
    fetchUnderperformers,
  } = UseUnderperformers(
    searchTag,
    timeWindow,
    type
  );

  useEffect(() => {
    fetchUnderperformers();
  }, [timeWindow, type]);

  const rows = data?.data || [];

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
      <HStack mb={3} spacing={1}>
        <Text
          fontSize="13px"
          fontWeight="700"
          color={titleColor}
          textTransform="uppercase"
        >
          UNDERPERFORMERS
        </Text>

        <Text
          fontSize="12px"
          fontWeight="600"
          color="#60A5FA"
        >
          (vs Fleet Avg)
        </Text>
      </HStack>

      <Flex
        mb={2}
        color={headerColor}
        fontSize="10px"
        fontWeight="500"
      >
        <Box flex="2">Plant</Box>

        <Box
          flex="1"
          textAlign="center"
        >
          PR (%)
        </Box>

        <Box
          flex="1"
          textAlign="center"
        >
          vs Fleet Avg
        </Box>

        <Box
          flex="1"
          textAlign="right"
        >
          Revenue / MW (₹ Lakh)
        </Box>
      </Flex>

      <Divider mb={1} />

      <VStack
        spacing={0}
        align="stretch"
      >
        {rows.map((item: any, index: number) => (
          <Box key={index}>
            <Flex
              py={2}
              align="center"
              fontSize="12px"
            >
              <Box
                flex="2"
                color={textColor}
                fontWeight="500"
                isTruncated
              >
                {item.plantName}
              </Box>

              <Box
                flex="1"
                textAlign="center"
                color={titleColor}
                fontWeight="600"
              >
                {Number(item.prPercent).toFixed(2)}
              </Box>

              <Box
                flex="1"
                textAlign="center"
                color="#EF4444"
                fontWeight="700"
              >
                ▼ {Math.abs(Number(item.fleetDeviation)).toFixed(2)}%
              </Box>

              <Box
                flex="1"
                textAlign="right"
                color={titleColor}
                fontWeight="500"
              >
                {Number(item.revenuePerMW).toFixed(2)}
              </Box>
            </Flex>

            {index !== rows.length - 1 && (
              <Divider opacity={0.15} />
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Underperformers;
