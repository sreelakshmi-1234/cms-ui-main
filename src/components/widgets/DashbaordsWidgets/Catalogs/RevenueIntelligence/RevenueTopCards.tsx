import {
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaBolt,
  FaCalendarAlt,
  FaDollarSign,
  FaLeaf,
  FaTrophy,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { BiTrendingUp } from "react-icons/bi";
import { TbCurrencyRupee } from "react-icons/tb";

const cards = [
  {
    title: "Plant Generation",
    value: "287",
    unit: "MWh",
    subText: "Today",
    icon: FaBolt,
    color: "#FBBF24",
    footer: "↑ 8.6% vs Yesterday",
    footerColor: "#22C55E",
  },
  {
    title: "Expected Generation",
    value: "312",
    unit: "MWh",
    subText: "Today",
    icon: FaCalendarAlt,
    color: "#3B82F6",
  },
  {
    title: "Revenue Today",
    value: "₹12.40",
    unit: "Lakh",
    subText: "Today",
    icon: TbCurrencyRupee,
    color: "#22C55E",
    footer: "↑ 9.3% vs Yesterday",
    footerColor: "#22C55E",
  },
  {
    title: "Lost Revenue",
    value: "₹1.10",
    unit: "Lakh",
    subText: "Today",
    icon: FaDollarSign,
    color: "#EF4444",
  },
  {
    title: "Performance Score",
    value: "92",
    unit: "/100",
    subText: "Good",
    icon: BiTrendingUp,
    color: "#22C55E",
    footer: "↑ 6 pts vs Yesterday",
    footerColor: "#22C55E",
  },
  {
    title: "Health Score",
    value: "88",
    unit: "/100",
    subText: "Good",
    icon: MdHealthAndSafety,
    color: "#3B82F6",
  },
  {
    title: "Carbon Offset",
    value: "218",
    unit: "Ton CO₂",
    subText: "Today",
    icon: FaLeaf,
    color: "#22C55E",
  },
  {
    title: "Portfolio Rank",
    value: "# 3",
    unit: "/15",
    subText: "Among All Plants",
    icon: FaTrophy,
    color: "#F59E0B",
  },
];

const RevenueTopCards = () => {
  const cardBg = useColorModeValue("#ffffff", "#021D49");
  const cardBorder = useColorModeValue(
    "1px solid rgba(0,0,0,0.06)",
    "1px solid rgba(255,255,255,0.08)"
  );
  const titleColor = useColorModeValue("rgba(0,0,0,0.7)", "rgba(255,255,255,0.75)");
  const valueColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "rgba(255,255,255,0.7)");

  return (
    <HStack
      spacing={3}
      align="stretch"
      width="430px"
      mb={4}
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Box
            key={card.title}
            flex={1}
            minW="178px"
            bg={cardBg}
            borderRadius="12px"
            border={cardBorder}
            px={4}
            py={3}
            boxShadow="md"
          >
            <Flex justify="space-between" align="flex-start">
              <Box minW={0}>
                <Text
                  fontSize="11px"
                  color={titleColor}
                  mb={1}
                  noOfLines={2}
                >
                  {card.title}
                </Text>

                <Flex align="baseline" gap={1}>
                  <Text
                    color={valueColor}
                    fontSize="20px"
                    fontWeight="700"
                    lineHeight={1}
                  >
                    {card.value}
                  </Text>

                  <Text
                    color={valueColor}
                    fontSize="12px"
                    opacity={0.9}
                  >
                    {card.unit}
                  </Text>
                </Flex>

                <Text
                  fontSize="11px"
                  color={subTextColor}
                  mt={1}
                >
                  {card.subText}
                </Text>

                {card.footer && (
                  <Text
                    fontSize="11px"
                    fontWeight="600"
                    color={card.footerColor}
                    mt={1}
                  >
                    {card.footer}
                  </Text>
                )}
              </Box>

              <Flex
                w="38px"
                h="38px"
                borderRadius="full"
                justify="center"
                align="center"
                bg={`${card.color}20`}
                flexShrink={0}
              >
                <Icon
                  size={18}
                  color={card.color}
                />
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </HStack>
  );
};

export default RevenueTopCards;