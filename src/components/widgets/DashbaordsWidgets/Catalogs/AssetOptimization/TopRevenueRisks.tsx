import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const TopRevenueRisks = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const headerColor = useColorModeValue("#0F172A", "#FFFFFF");
  const bodyColor = useColorModeValue("#475569", "#94A3B8");
  const itemBg = useColorModeValue("rgba(0,0,0,0.02)", "rgba(255,255,255,0.03)");

  const risks = [
    {
      rank: 1,
      title: "Transformer TR-01 Overloaded",
      desc: "Revenue Impact: ₹ 18,400/day",
      level: "High",
      color: "#EF4444",
    },
    {
      rank: 2,
      title: "Inverter INV-088 DC Imbalance",
      desc: "Revenue Impact: ₹ 12,600/day",
      level: "High",
      color: "#EF4444",
    },
    {
      rank: 3,
      title: "Sungrow Cluster-3 Underperforming",
      desc: "Revenue Impact: ₹ 8,300/day",
      level: "Medium",
      color: "#F59E0B",
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(239,68,68,0.18)"
      p="8px"
      overflow="hidden"
    >
      <Text fontSize="11px" fontWeight="700" mb={2} color={headerColor}>
        TOP REVENUE RISKS
      </Text>

      <VStack
        spacing={2}
        align="stretch"
      >
        {risks.map((risk) => (
          <HStack
            key={risk.rank}
            spacing={2}
            bg={itemBg}
            border="1px solid rgba(255,255,255,0.05)"
            borderRadius="6px"
            p="5px"
            align="center"
          >
            {/* Rank */}

            <Flex
              minW="18px"
              h="18px"
              borderRadius="4px"
              bg="rgba(239,68,68,0.15)"
              color={risk.color}
              fontSize="10px"
              fontWeight="700"
              align="center"
              justify="center"
            >
              {risk.rank}
            </Flex>

            {/* Content */}

            <Box flex={1}>
              <Text fontSize="9px" fontWeight="600" lineHeight="12px" color={headerColor}>
                {risk.title}
              </Text>

              <Text fontSize="8px" color={bodyColor}>
                {risk.desc}
              </Text>
            </Box>

            {/* Risk Level */}

            <Badge
              fontSize="8px"
              px={2}
              py="2px"
              borderRadius="4px"
              bg={`${risk.color}20`}
              color={risk.color}
              border={`1px solid ${risk.color}50`}
            >
              {risk.level}
            </Badge>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default TopRevenueRisks;