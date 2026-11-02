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
  FiPower,
  FiSettings,
  FiTool,
} from "react-icons/fi";

const PredictedFailures = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const titleColor = useColorModeValue(
    "#0F172A",
    "#FFFFFF"
  );

  const textColor = useColorModeValue(
    "#334155",
    "#E2E8F0"
  );

  const mutedColor = useColorModeValue(
    "#64748B",
    "#94A3B8"
  );

  const data = [
    {
      icon: FiPower,
      asset: "INV-088",
      probability: "78%",
      issue: "IGBT Overheat",
      days: "14 – 21 Days",
    },
    {
      icon: FiSettings,
      asset: "TR-11",
      probability: "62%",
      issue: "Winding Degradation",
      days: "21 – 28 Days",
    },
    {
      icon: FiTool,
      asset: "SMB-14",
      probability: "45%",
      issue: "Current Drift",
      days: "10 – 15 Days",
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
      <Text
        fontSize="11px"
        fontWeight="700"
        mb={2}
        color={titleColor}
      >
        PREDICTED FAILURES
        <Text
          as="span"
          ml={1}
          fontSize="9px"
          color={mutedColor}
          fontWeight="500"
        >
          (Next 30 Days)
        </Text>
      </Text>

      <VStack
        spacing={2}
        align="stretch"
      >
        {data.map((item) => (
          <HStack
            key={item.asset}
            spacing={2}
            align="center"
            bg="rgba(255,255,255,0.03)"
            border="1px solid rgba(255,255,255,0.06)"
            borderRadius="6px"
            p="6px"
          >
            {/* ICON */}

            <Flex
              minW="24px"
              h="24px"
              borderRadius="full"
              bg="rgba(239,68,68,0.12)"
              align="center"
              justify="center"
            >
              <item.icon
                size={12}
                color="#EF4444"
              />
            </Flex>

            {/* CONTENT */}

            <Box flex={1}>
              <Text
                fontSize="10px"
                fontWeight="700"
                color={titleColor}
              >
                {item.asset}
              </Text>

              <Text
                fontSize="8px"
                color={mutedColor}
              >
                Failure Probability:
                <Text
                  as="span"
                  color="#EF4444"
                  fontWeight="700"
                  ml={1}
                >
                  {item.probability}
                </Text>
              </Text>

              <Text
                fontSize="8px"
                color={textColor}
              >
                Likely Issue: {item.issue}
              </Text>
            </Box>

            {/* DAYS */}

            <Text
              minW="70px"
              textAlign="right"
              fontSize="11px"
              fontWeight="700"
              color="#F59E0B"
            >
              {item.days}
            </Text>
          </HStack>
        ))}
      </VStack>

      <Button
        mt={2}
        size="xs"
        w="100%"
        variant="outline"
        fontSize="9px"
      >
        View All Predictions
      </Button>
    </Box>
  );
};

export default PredictedFailures;