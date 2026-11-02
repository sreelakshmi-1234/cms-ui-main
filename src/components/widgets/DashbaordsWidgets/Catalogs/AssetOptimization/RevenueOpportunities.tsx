import {
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiAward,
  FiBarChart2,
  FiZap,
} from "react-icons/fi";

const RevenueOpportunities = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const titleColor = useColorModeValue(
    "#0F172A",
    "#FFFFFF"
  );

  const textColor = useColorModeValue(
    "#475569",
    "#E2E8F0"
  );

  const mutedColor = useColorModeValue(
    "#64748B",
    "#94A3B8"
  );

  const opportunities = [
    {
      icon: FiAward,
      title: "Optimize TR-01 Loading",
      gain: "₹ 18,400/day",
    },
    {
      icon: FiBarChart2,
      title: "Clean Block-7 Modules",
      gain: "₹ 11,200/day",
    },
    {
      icon: FiZap,
      title: "Fix INV-088 DC Imbalance",
      gain: "₹ 12,600/day",
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(245,158,11,0.18)"
      p="8px"
      overflow="hidden"
    >
      <Text
        fontSize="11px"
        fontWeight="700"
        mb={2}
        color={titleColor}
      >
        TOP REVENUE OPPORTUNITIES
      </Text>

      <VStack
        spacing={2}
        align="stretch"
      >
        {opportunities.map((item) => (
          <HStack
            key={item.title}
            spacing={2}
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(255,255,255,0.05)"
            borderRadius="6px"
            p="6px"
          >
            {/* ICON */}

            <Flex
              minW="22px"
              h="22px"
              borderRadius="5px"
              bg="rgba(245,158,11,0.15)"
              align="center"
              justify="center"
            >
              <item.icon
                size={11}
                color="#F59E0B"
              />
            </Flex>

            {/* CONTENT */}

            <Box flex={1}>
              <Text
                fontSize="9px"
                fontWeight="600"
                color={titleColor}
                lineHeight="12px"
              >
                {item.title}
              </Text>

              <Text
                fontSize="8px"
                color={mutedColor}
              >
                Potential Gain:
                <Text
                  as="span"
                  ml={1}
                  color={textColor}
                >
                  {item.gain}
                </Text>
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>

      <Button
        mt={2}
        size="xs"
        w="100%"
        fontSize="9px"
        variant="outline"
      >
        View All Opportunities
      </Button>
    </Box>
  );
};

export default RevenueOpportunities;