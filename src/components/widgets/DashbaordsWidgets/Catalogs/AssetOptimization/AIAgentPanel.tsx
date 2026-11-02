import {
  Box,
  Text,
  HStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiCpu,
  FiZap,
} from "react-icons/fi";

const AIAgentPanel = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#1A1142 0%,#0A0F2A 100%)"
  );

  const headerColor = useColorModeValue(
    "#0F172A",
    "#FFFFFF"
  );

  const accentColor = useColorModeValue(
    "#6D28D9",
    "#C084FC"
  );

  const mutedColor = useColorModeValue(
    "#64748B",
    "#94A3B8"
  );

  const valueColor = useColorModeValue(
    "#062D59",
    "#FFFFFF"
  );

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(168,85,247,0.35)"
      overflow="hidden"
      p="6px"
    >
      {/* HEADER */}

      <Flex
        align="center"
        gap={2}
        pb={2}
        borderBottom="1px solid rgba(255,255,255,0.08)"
      >
        <Box
          w="28px"
          h="28px"
          borderRadius="full"
          bg="rgba(168,85,247,0.15)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FiCpu
            color="#C084FC"
            size={16}
          />
        </Box>

        <Box>
          <Text
            fontSize="11px"
            fontWeight="700"
            color={headerColor}
          >
            ETAflux AI AGENT
          </Text>

          <Text
            fontSize="8px"
            color={accentColor}
          >
            Powered by ETAflux AI
          </Text>
        </Box>
      </Flex>

      {/* AI DAILY BRIEFING */}

      <Box py={2}>
        <HStack
          spacing={1}
          mb={1}
        >
          <FiZap
            color="#C084FC"
            size={12}
          />

          <Text
            fontSize="9px"
            color={accentColor}
            fontWeight="700"
          >
            AI DAILY BRIEFING
          </Text>
        </HStack>

        <Text
          fontSize="8px"
          color={mutedColor}
        >
          21 May 2025, 09:45 AM
        </Text>

        <Text
          fontSize="8px"
          color={valueColor}
          mt={1}
        >
          Good Morning! Here is your AI generated briefing.
        </Text>
      </Box>

      {/* KPI CARDS */}

      <HStack
        spacing="2px"
        mt={1}
        align="stretch"
      >
        {/* TOTAL GENERATION */}

        <Box
          flex={1}
          border="1px solid rgba(255,255,255,0.08)"
          bg="rgba(255,255,255,0.03)"
          borderRadius="4px"
          px={2}
          py={2}
        >
          <Text
            fontSize="7px"
            color={mutedColor}
            mb={1}
          >
            Total Generation
          </Text>

          <Text
            fontSize="14px"
            fontWeight="700"
            color={valueColor}
            lineHeight="16px"
          >
            1.24 GWh
          </Text>

          <Text
            mt={1}
            fontSize="9px"
            color="#22C55E"
            fontWeight="600"
          >
            ↑ 4.2%
          </Text>
        </Box>

        {/* REVENUE */}

        <Box
          flex={1}
          border="1px solid rgba(255,255,255,0.08)"
          bg="rgba(255,255,255,0.03)"
          borderRadius="4px"
          px={2}
          py={2}
        >
          <Text
            fontSize="7px"
            color={mutedColor}
            mb={1}
          >
            Revenue
          </Text>

          <Text
            fontSize="14px"
            fontWeight="700"
            color={valueColor}
            lineHeight="16px"
          >
            ₹ 52.7 Lakh
          </Text>

          <Text
            mt={1}
            fontSize="9px"
            color="#22C55E"
            fontWeight="600"
          >
            ↑ 6.5%
          </Text>
        </Box>

        {/* REVENUE OPPORTUNITY */}

        <Box
          flex={1}
          border="1px solid rgba(255,255,255,0.08)"
          bg="rgba(255,255,255,0.03)"
          borderRadius="4px"
          px={2}
          py={2}
        >
          <Text
            fontSize="7px"
            color={mutedColor}
            mb={1}
          >
            Revenue Opportunity
          </Text>

          <Text
            fontSize="13px"
            fontWeight="700"
            color={valueColor}
            lineHeight="16px"
          >
            ₹ 1.18 Lakh/day
          </Text>

          <Text
            mt={1}
            fontSize="9px"
            color="transparent"
          >
            .
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default AIAgentPanel;