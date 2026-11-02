import {
  Box,
  Flex,
  Text,
  HStack,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiZap,
  FiDollarSign,
  FiTarget,
  FiRefreshCw,
  FiHeart,
  FiFeather,
} from "react-icons/fi";

const AssetOptimizationKPIRow = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,102,255,0.18)",
    "rgba(0,153,255,0.18)"
  );

  const titleColor = useColorModeValue(
    "#64748B",
    "#94A3B8"
  );

  const valueColor = useColorModeValue(
    "#0F172A",
    "white"
  );

  const unitColor = useColorModeValue(
    "#475569",
    "#CBD5E1"
  );

  const cards = [
    {
      width: "205px",
      title: "Generation Today",
      value: "1.24",
      unit: "GWh",
      footer: "↑ 4.2% vs Yesterday",
      icon: FiZap,
      iconColor: "#22C55E",
      iconBg: "rgba(34,197,94,0.15)",
      footerColor: "#22C55E",
    },
    {
      width: "205px",
      title: "Revenue Today",
      value: "₹ 52.7",
      unit: "Lakh",
      footer: "↑ 6.5% vs Yesterday",
      icon: FiDollarSign,
      iconColor: "#22C55E",
      iconBg: "rgba(34,197,94,0.15)",
      footerColor: "#22C55E",
    },
    {
      width: "165px",
      title: "Expected Revenue",
      value: "₹ 53.9",
      unit: "Lakh",
      footer: "",
      icon: null,
      iconColor: "",
      iconBg: "",
      footerColor: "",
    },
    {
      width: "190px",
      title: "Revenue Opportunity",
      value: "₹ 1.18",
      unit: "Lakh/day",
      footer: "2.2% of Potential",
      icon: FiTarget,
      iconColor: "#F97316",
      iconBg: "rgba(249,115,22,0.15)",
      footerColor: "#94A3B8",
    },
    {
      width: "165px",
      title: "Performance Score",
      value: "92",
      unit: "/100",
      footer: "↑ 5 pts vs Yesterday",
      icon: FiRefreshCw,
      iconColor: "#22C55E",
      iconBg: "rgba(34,197,94,0.15)",
      footerColor: "#22C55E",
    },
    {
      width: "165px",
      title: "Health Score",
      value: "88",
      unit: "/100",
      footer: "Good",
      icon: FiHeart,
      iconColor: "#0EA5E9",
      iconBg: "rgba(14,165,233,0.15)",
      footerColor: "#22C55E",
    },
    {
      width: "185px",
      title: "Carbon Offset",
      value: "836",
      unit: "Ton CO₂",
      footer: "Today",
      icon: FiFeather,
      iconColor: "#22C55E",
      iconBg: "rgba(34,197,94,0.15)",
      footerColor: "#94A3B8",
    },
  ];

  return (
    <HStack
      mt={-2}
      mb={4}
      h="90px"
      w="100%"
      spacing={3}
      align="stretch"
    >
      {cards.map((card) => (
        <Box
          key={card.title}
          w={card.width}
          h="90px"
          bg={cardBg}
          borderRadius="12px"
          border="1px solid"
          borderColor={borderColor}
          px="10px"
          py="8px"
          boxShadow="0px 0px 12px rgba(0,120,255,0.08)"
          overflow="hidden"
        >
          <Flex
            justify="space-between"
            align="flex-start"
            h="100%"
          >
            {card.icon ? (
              <Circle
                size="34px"
                bg={card.iconBg}
                color={card.iconColor}
                flexShrink={0}
              >
                <card.icon size={16} />
              </Circle>
            ) : (
              <Box w="34px" />
            )}

            <Box
              textAlign="right"
              minW="0"
            >
              <Text
                fontSize="10px"
                lineHeight="12px"
                color={titleColor}
              >
                {card.title}
              </Text>

              <Text
                mt="2px"
                fontSize="18px"
                fontWeight="700"
                lineHeight="20px"
                color={valueColor}
              >
                {card.value}

                <Text
                  as="span"
                  ml="2px"
                  fontSize="9px"
                  fontWeight="500"
                  color={unitColor}
                >
                  {card.unit}
                </Text>
              </Text>

              {card.footer && (
                <Text
                  mt="4px"
                  fontSize="9px"
                  lineHeight="10px"
                  fontWeight={
                    card.footerColor === "#22C55E"
                      ? "600"
                      : "400"
                  }
                  color={card.footerColor}
                >
                  {card.footer}
                </Text>
              )}
            </Box>
          </Flex>
        </Box>
      ))}
    </HStack>
  );
};

export default AssetOptimizationKPIRow;