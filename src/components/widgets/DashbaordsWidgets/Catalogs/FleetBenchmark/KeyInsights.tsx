import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiAlertTriangle,
  FiDollarSign,
} from "react-icons/fi";

const KeyInsights = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg, #041C44 0%, #02142F 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,115,255,0.20)",
    "rgba(0,180,255,0.20)"
  );

  const titleColor = useColorModeValue("#0F172A", "#FFFFFF");
  const textColor = useColorModeValue("#475569", "#CBD5E1");

  const insights = [
    {
      icon: FiTrendingUp,
      bg: "rgba(34,197,94,0.18)",
      color: "#22C55E",
      text: (
        <>
          Your fleet PR is 1.35% higher than previous period.
        </>
      ),
    },
    {
      icon: FiAward,
      bg: "rgba(34,197,94,0.18)",
      color: "#22C55E",
      text: (
        <>
          Plants &lt; 5 MW show highest PR improvement{" "}
          <Text as="span" color="#22C55E" fontWeight="700">
            (+ 2.18%)
          </Text>
          .
        </>
      ),
    },
    {
      icon: FiUsers,
      bg: "rgba(234,179,8,0.18)",
      color: "#EAB308",
      text: (
        <>
          4 plants are in top{" "}
          <Text as="span" color="#60A5FA" fontWeight="700">
            25%
          </Text>{" "}
          performers in the industry.
        </>
      ),
    },
    {
      icon: FiAlertTriangle,
      bg: "rgba(239,68,68,0.18)",
      color: "#EF4444",
      text: (
        <>
          2 plants have high alarm rate impacting availability.
        </>
      ),
    },
    {
      icon: FiDollarSign,
      bg: "rgba(34,197,94,0.18)",
      color: "#22C55E",
      text: (
        <>
          Revenue/MW improved by{" "}
          <Text as="span" color="#22C55E" fontWeight="700">
            3.21%
          </Text>{" "}
          vs previous period.
        </>
      ),
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
      boxShadow="0px 0px 12px rgba(0,140,255,0.08)"
      overflow="hidden"
    >
      <HStack mb={4} spacing={1}>
        <Text
          fontSize="13px"
          fontWeight="700"
          color={titleColor}
          textTransform="uppercase"
        >
          KEY INSIGHTS
        </Text>

        <Text
          fontSize="12px"
          fontWeight="600"
          color="#60A5FA"
        >
          (AI)
        </Text>
      </HStack>

      <VStack
        spacing={4}
        align="stretch"
      >
        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <Flex
              key={index}
              align="center"
              gap={3}
            >
              <Circle
                size="24px"
                bg={item.bg}
                color={item.color}
              >
                <Icon size={13} />
              </Circle>

              <Text
                fontSize="12px"
                color={textColor}
                lineHeight="18px"
              >
                {item.text}
              </Text>
            </Flex>
          );
        })}
      </VStack>
    </Box>
  );
};

export default KeyInsights;
