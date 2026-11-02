import {
  Box,
  Flex,
  Text,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const PlantRevenueLeaderboard = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const titleColor = useColorModeValue("#1A202C", "#FFFFFF");
  const subtitleColor = useColorModeValue("#2B6CB0", "#42A5F5");
  const headerMuted = useColorModeValue("#4A5568", "#8CA3C7");
  const rankColor = useColorModeValue("#B7791F", "#F5A623");
  const plantColor = useColorModeValue("#1A202C", "#DCE7F7");
  const revenueColor = useColorModeValue("#B7791F", "#F5A623");
  const growthColor = useColorModeValue("#2F855A", "#2ECC71");
  const prColor = useColorModeValue("#1A202C", "#DCE7F7");
  const rpmwColor = useColorModeValue("#1A202C", "#DCE7F7");
  const footerColor = useColorModeValue("#2D3748", "#C7D6F5");
  const footerHover = useColorModeValue("#1A202C", "#FFFFFF");

  const data = [
    {
      rank: 1,
      plant: "Sunrise Solar Park",
      revenue: "182.4",
      growth: "9.3%",
      pr: "91.2",
      rpmw: "18.24",
    },
    {
      rank: 2,
      plant: "Greenfield Solar",
      revenue: "156.8",
      growth: "7.1%",
      pr: "89.7",
      rpmw: "17.42",
    },
    {
      rank: 3,
      plant: "BluePeak Solar",
      revenue: "138.6",
      growth: "6.4%",
      pr: "90.1",
      rpmw: "15.40",
    },
    {
      rank: 4,
      plant: "SunRay Plant",
      revenue: "120.3",
      growth: "8.8%",
      pr: "88.9",
      rpmw: "15.04",
    },
    {
      rank: 5,
      plant: "Bright Solar Farm",
      revenue: "102.7",
      growth: "5.6%",
      pr: "87.3",
      rpmw: "14.67",
    },
  ];

  return (
    <Box
      h="260px"
      w="100%"
      bg={cardBg}
      borderRadius="10px"
      border="1px solid rgba(255,255,255,0.08)"
      overflow="hidden"
      boxShadow="0 0 15px rgba(0,0,0,0.15)"
    >
      {/* Header */}

        <Flex
          px={4}
          py={2}
          align="center"
          borderBottom="1px solid rgba(255,255,255,0.06)"
        >
          <Text
            color={titleColor}
            fontSize="13px"
            fontWeight="700"
          >
            PLANT REVENUE LEADERBOARD
          </Text>

          <Text
            ml={1}
            color={subtitleColor}
            fontSize="11px"
          >
            (This Month)
          </Text>
        </Flex>

      {/* Table Header + Rows (scrollable) */}

      <Box overflowX="auto">
        <Box minW="820px">
          <Flex
            px={4}
            py={2}
            align="center"
            color={headerMuted}
            fontSize="10px"
            fontWeight="600"
          >
            <Box w="28px">Rank</Box>

            <Box w="150px">Plant</Box>

            <Box
              w="78px"
              textAlign="center"
            >
              Revenue (₹ Lakh)
            </Box>

            <Box
              w="75px"
              textAlign="center"
            >
              vs Last Month
            </Box>

            <Box
              w="45px"
              textAlign="center"
            >
              PR (%)
            </Box>

            <Box
              flex="1"
              textAlign="right"
            >
              Revenue / MWp (₹ Lakh)
            </Box>
          </Flex>

          {/* Rows */}

          <VStack
            spacing={0}
            align="stretch"
          >
            {data.map((item) => (
              <Flex
                key={item.rank}
                px={4}
                py="7px"
                align="center"
                borderTop="1px solid rgba(255,255,255,0.05)"
                _hover={{
                  bg: "rgba(255,255,255,0.03)",
                }}
              >
                <Box
                  w="28px"
                  color={rankColor}
                  fontWeight="700"
                  fontSize="14px"
                >
                  {item.rank}
                </Box>

                <Box
                  w="150px"
                  color={plantColor}
                  fontSize="12px"
                >
                  {item.plant}
                </Box>

                <Box
                  w="78px"
                  textAlign="center"
                  color={revenueColor}
                  fontSize="13px"
                  fontWeight="600"
                >
                  {item.revenue}
                </Box>

                <Box
                  w="75px"
                  textAlign="center"
                  color={growthColor}
                  fontSize="12px"
                  fontWeight="600"
                >
                  ↑ {item.growth}
                </Box>

                <Box
                  w="45px"
                  textAlign="center"
                  color={prColor}
                  fontSize="12px"
                >
                  {item.pr}
                </Box>

                <Box
                  flex="1"
                  textAlign="right"
                  color={rpmwColor}
                  fontSize="12px"
                >
                  {item.rpmw}
                </Box>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* Footer */}

      <Divider
        mt={2}
        borderColor="rgba(255,255,255,0.08)"
      />

      <Flex
        justify="center"
        align="center"
        py={3}
      >
        <Text
          color={footerColor}
          fontSize="13px"
          fontWeight="500"
          cursor="pointer"
          _hover={{
            color: footerHover,
          }}
        >
          View All Plants ❯
        </Text>
      </Flex>
    </Box>
  );
};

export default PlantRevenueLeaderboard;