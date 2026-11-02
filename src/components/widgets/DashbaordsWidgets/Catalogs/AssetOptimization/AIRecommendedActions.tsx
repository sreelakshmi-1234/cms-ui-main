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
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

const AIRecommendedActions = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const titleColor = useColorModeValue(
    "#0F172A",
    "#FFFFFF"
  );

  const mutedColor = useColorModeValue(
    "#64748B",
    "#94A3B8"
  );

  const actions = [
    {
      action: "Shift loading from TR-01 to TR-03",
      impact: "High Impact",
      color: "#22C55E",
    },
    {
      action: "Inspect DC Combiner CB-18 (INV-08)",
      impact: "High Impact",
      color: "#22C55E",
    },
    {
      action: "Schedule cleaning for Block-7",
      impact: "Medium Impact",
      color: "#F59E0B",
    },
    {
      action: "Monitor Sungrow Cluster-3 performance",
      impact: "Medium Impact",
      color: "#F59E0B",
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(168,85,247,0.20)"
      p="8px"
      overflow="hidden"
    >
      {/* HEADER */}

      <HStack mb={2}>
        <FiCheckCircle
          color="#22C55E"
          size={14}
        />

        <Text
          fontSize="11px"
          fontWeight="700"
          color={titleColor}
        >
          AI RECOMMENDED ACTIONS
        </Text>
      </HStack>

      {/* ACTIONS */}

      <VStack
        spacing={1}
        align="stretch"
      >
        {actions.map((item) => (
          <HStack
            key={item.action}
            justify="space-between"
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(255,255,255,0.05)"
            borderRadius="5px"
            px={2}
            py="5px"
          >
            <HStack
              spacing={2}
              flex={1}
              minW={0}
            >
              <FiFileText
                color="#CBD5E1"
                size={10}
              />

              <Text
                fontSize="8px"
                color={titleColor}
                noOfLines={1}
              >
                {item.action}
              </Text>
            </HStack>

            <Text
              fontSize="8px"
              fontWeight="700"
              color={item.color}
              whiteSpace="nowrap"
            >
              {item.impact}
            </Text>
          </HStack>
        ))}
      </VStack>

      {/* BUTTON */}

      <Button
        mt={2}
        h="24px"
        size="xs"
        w="100%"
        variant="outline"
        fontSize="9px"
      >
        View All Actions
      </Button>
    </Box>
  );
};

export default AIRecommendedActions;