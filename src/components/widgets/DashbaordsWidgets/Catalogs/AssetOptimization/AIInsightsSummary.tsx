import {
  Box,
  Text,
  HStack,
  VStack,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiAlertCircle,
  FiTool,
  FiTrendingUp,
  FiClipboard,
  FiShield,
} from "react-icons/fi";

const AIInsightsSummary = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const itemBg = useColorModeValue(
    "#F8FAFC",
    "rgba(255,255,255,0.03)"
  );

  const insights = [
    {
      icon: FiAlertCircle,
      color: "#EF4444",
      title: "Revenue Leakage Increased",
      text: "Revenue leakage increased by 12% compared to yesterday. Primary reason: Transformer loading increased from 76% to 91%.",
    },
    {
      icon: FiTool,
      color: "#F59E0B",
      title: "Transformers Need Attention",
      text: "Kirloskar transformers are operating 1.2°C hotter than fleet average. Potential lifetime reduction: 3.4%",
    },
    {
      icon: FiTrendingUp,
      color: "#22C55E",
      title: "Sungrow Inverters Performing Best",
      text: "Sungrow inverters deliver 2.8% more energy than comparable SMA units under high temperature conditions.",
    },
    {
      icon: FiClipboard,
      color: "#60A5FA",
      title: "Procurement Recommendation",
      text: "For upcoming 25 MW expansion, recommended: Sungrow SG320HX (Best PR, Lowest Failure Rate).",
    },
    {
      icon: FiShield,
      color: "#A855F7",
      title: "Portfolio Outlook",
      text: "Weather forecast is favorable. Expected generation tomorrow: 1.31 GWh (+5.6%).",
    },
  ];

  const headerColor = useColorModeValue("#0F172A", "#FFFFFF");
  const bodyColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      p="4px"
      border="1px solid rgba(0,153,255,0.15)"
    >
      <Text
        fontSize="11px"
        fontWeight="700"
        px={3}
        pt={2}
        pb={2}
        color={headerColor}
      >
        AI INSIGHTS SUMMARY
      </Text>

      <HStack
        spacing={2}
        px={2}
        pb={2}
        align="stretch"
      >
        {insights.map((item) => (
          <Box
            key={item.title}
            flex={1}
            bg={itemBg}
            borderRadius="8px"
            border="1px solid rgba(255,255,255,0.06)"
            p={2}
          >
            <Flex
              align="flex-start"
              gap={2}
            >
              <Flex
                minW="24px"
                h="24px"
                borderRadius="full"
                bg={`${item.color}20`}
                align="center"
                justify="center"
              >
                <Icon
                  as={item.icon}
                  color={item.color}
                  boxSize={3.5}
                />
              </Flex>

              <VStack
                spacing={1}
                align="start"
              >
                <Text
                  fontSize="10px"
                  fontWeight="700"
                  color={item.color}
                  lineHeight="14px"
                >
                  {item.title}
                </Text>

                <Text fontSize="9px" color={bodyColor} lineHeight="13px">
                  {item.text}
                </Text>
              </VStack>
            </Flex>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default AIInsightsSummary;