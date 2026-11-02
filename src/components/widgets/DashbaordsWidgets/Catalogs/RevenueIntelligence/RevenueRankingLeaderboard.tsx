import {
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UseRevenueRankingLeaderboard from "../../../../../Services/Hooks/Catalog/RevenueIntelligence/UseRevenueRankingLeaderboard";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

interface Props { type?: "plant" | "portfolio" }

const RevenueRankingLeaderboard = ({ type }: Props) => {
  const bg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(0,123,255,0.25)"
  );

  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const headerColor = useColorModeValue(
    "#718096",
    "#7F96B3"
  );

  const rowBorder = useColorModeValue(
    "rgba(0,0,0,0.06)",
    "rgba(255,255,255,0.06)"
  );

  // Leaderboard data loaded from API (formatted for display)
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  const {
    timeWindow: timeWindowRevenueLeaderboard,
    handleTimeWindowChange: handleTimeWindowRevenueLeaderboardChange,
    handleReset: RevenueLeaderboardHandleReset,
    manualChanges: manualChangesRevenueLeaderboard,
  } = useTimeHandle(16, "hour", "AVG", [5, "minute"], 1000);

  
  const searchTagRanking = {
    Inverter: "revenue,Energy_Daily_kWh,efficiency",
  };

  const { data, fetchRevenueRankingLeaderboard } =
    UseRevenueRankingLeaderboard(
      searchTagRanking,
      timeWindowRevenueLeaderboard,
      type
    );

  useEffect(() => {
    fetchRevenueRankingLeaderboard();

    const interval = setInterval(
      fetchRevenueRankingLeaderboard,
      5 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [timeWindowRevenueLeaderboard, type]);

  useEffect(() => {
    if (!data) return;

    try {
      const responseData = data?.data || [];

      const formatted = responseData.map(
        (item: any, index: number) => ({
          rank: String(index + 1),
          asset: item.assetName || "N/A",
          revenue: `₹ ${Number(
            item.revenue || 0
          ).toLocaleString()}`,
          lost: `₹ ${Number(
            item.lostRevenue || 0
          ).toLocaleString()}`,
          eff: `${Number(
            item.efficiency || 0
          ).toFixed(0)}%`,
        })
      );

      setLeaderboardData(formatted);
    } catch (error) {
      console.error(
        "Revenue Ranking Leaderboard Error:",
        error
      );
      setLeaderboardData([]);
    }
  }, [data]);

  const parseRevenue = (value: string) =>
    Number(value.replace(/[^0-9.-]+/g, "")) || 0;

  const sortedByRevenue = [...leaderboardData].sort(
    (a, b) => parseRevenue(b.revenue) - parseRevenue(a.revenue)
  );

  const topAssets = sortedByRevenue.slice(0, 3);
  const bottomAssets = sortedByRevenue
    .slice(-3)
    .sort((a, b) => parseRevenue(a.revenue) - parseRevenue(b.revenue));

  return (
    <Box
      bg={bg}
      border={border}
      borderRadius="10px"
      p={3}
      h="300px"
      overflow="hidden"
    >
      <Flex
        justify="space-between"
        align="center"
        mb={3}
      >
        <Flex align="center" gap={2}>
          <Box
            w="18px"
            h="18px"
            borderRadius="full"
            bg="#2563EB"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color="white"
              fontSize="10px"
              fontWeight="700"
            >
              6
            </Text>
          </Box>

          <Text
            color={titleColor}
            fontSize="12px"
            fontWeight="700"
          >
            REVENUE RANKING LEADERBOARD
          </Text>
        </Flex>
      </Flex>

      {/* Header */}
      <Flex
        color={headerColor}
        fontSize="9px"
        fontWeight="600"
        pb={2}
      >
        <Box w="12%">Rank</Box>
        <Box w="20%">Asset</Box>
        <Box w="24%">Revenue (₹)</Box>
        <Box w="26%">Lost Revenue (₹)</Box>
        <Box w="18%" textAlign="right">
          Efficiency
        </Box>
      </Flex>

      <VStack
        spacing={0}
        align="stretch"
        h="200px"
        overflowY="auto"
      >
        {topAssets.map((item) => (
          <Flex
            key={item.rank}
            py="7px"
            borderTop={`1px solid ${rowBorder}`}
            align="center"
          >
            <Box
              w="12%"
              color="#FACC15"
              fontWeight="700"
              fontSize="12px"
            >
              {item.rank}
            </Box>

            <Box
              w="20%"
              color={titleColor}
              fontWeight="600"
              fontSize="12px"
            >
              {item.asset}
            </Box>

            <Box
              w="24%"
              color={titleColor}
              fontSize="12px"
            >
              {item.revenue}
            </Box>

            <Box
              w="26%"
              color={titleColor}
              fontSize="12px"
            >
              {item.lost}
            </Box>

            <Box
              w="18%"
              textAlign="right"
              color="#22C55E"
              fontWeight="700"
              fontSize="12px"
            >
              {item.eff}
            </Box>
          </Flex>
        ))}

        <Text
          textAlign="center"
          py={2}
          color={headerColor}
          fontSize="12px"
        >
          ...
        </Text>

        {bottomAssets.map((item, index) => (
          <Flex
            key={`${item.asset}-${index}`}
            py="7px"
            borderTop={`1px solid ${rowBorder}`}
            align="center"
          >
            <Box
              w="12%"
              color="#EF4444"
              fontWeight="700"
              fontSize="12px"
            >
              {String(index + 1)}
            </Box>

            <Box
              w="20%"
              color="#EF4444"
              fontWeight="700"
              fontSize="12px"
            >
              {item.asset}
            </Box>

            <Box
              w="24%"
              color="#EF4444"
              fontWeight="700"
              fontSize="12px"
            >
              {item.revenue}
            </Box>

            <Box
              w="26%"
              color="#EF4444"
              fontWeight="700"
              fontSize="12px"
            >
              {item.lost}
            </Box>

            <Box
              w="18%"
              textAlign="right"
              color="#EF4444"
              fontWeight="700"
              fontSize="12px"
            >
              {item.eff}
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default RevenueRankingLeaderboard;