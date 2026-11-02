import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import InverterPerformance from "./InverterPerformance";
import UnderperformingInverters from "./UnderperformingInverters";
import TransformerLoading from "./TransformerLoading";
import EnvironmentalConditions from "./EnvironmentalConditions";

const AssetPerformanceSection = () => {
  const bg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "#E2E8F0",
    "rgba(0,145,255,0.15)"
  );

  const cardBg = useColorModeValue(
    "#F8FAFC",
    "rgba(255,255,255,0.02)"
  );

  const cardBorder = useColorModeValue(
    "#E2E8F0",
    "rgba(255,255,255,0.08)"
  );

  return (
    <Box
      bg={bg}
      borderRadius="12px"
      border="1px solid"
      borderColor={borderColor}
      p={3}
      h="320px"
      w="1180px"
    >
      {/* HEADER */}

      <Flex
        justify="space-between"
        align="center"
        mb={3}
      >
        <Flex align="center">
          <Text
            color={useColorModeValue(
              "#111827",
              "#FFFFFF"
            )}
            fontWeight="700"
            fontSize="14px"
          >
            ASSET PERFORMANCE
          </Text>

          <Text
            color="#3B82F6"
            ml={1}
            fontSize="13px"
          >
            (Live)
          </Text>
        </Flex>

        <HStack spacing={2}>
          <Button
            size="xs"
            colorScheme="blue"
          >
            Inverters
          </Button>

          <Button
            size="xs"
            variant="ghost"
          >
            Transformers
          </Button>

          <Button
            size="xs"
            variant="ghost"
          >
            String Combiner
          </Button>

          <Button
            size="xs"
            variant="ghost"
          >
            BOS
          </Button>
        </HStack>
      </Flex>

      {/* WIDGETS */}

      <SimpleGrid
        columns={4}
        spacing={3}
      >
        {/* INVERTER PERFORMANCE */}

        <Box
          h="250px"
          borderRadius="10px"
          border="1px solid"
          borderColor={cardBorder}
          bg={cardBg}
          p={2}
          boxShadow={useColorModeValue(
            "sm",
            "inset 0 0 0 1px rgba(59,130,246,0.08)"
          )}
        >
          <InverterPerformance />
        </Box>

        {/* UNDERPERFORMING */}

        <Box
          h="250px"
          borderRadius="10px"
          border="1px solid"
          borderColor={cardBorder}
          bg={cardBg}
          p={2}
          boxShadow={useColorModeValue(
            "sm",
            "inset 0 0 0 1px rgba(59,130,246,0.08)"
          )}
        >
          <UnderperformingInverters />
        </Box>

        {/* TRANSFORMER */}

        <Box
          h="250px"
          borderRadius="10px"
          border="1px solid"
          borderColor={cardBorder}
          bg={cardBg}
          p={2}
          boxShadow={useColorModeValue(
            "sm",
            "inset 0 0 0 1px rgba(59,130,246,0.08)"
          )}
        >
          <TransformerLoading />
        </Box>

        {/* ENVIRONMENT */}

        <Box
          h="250px"
          borderRadius="10px"
          border="1px solid"
          borderColor={cardBorder}
          bg={cardBg}
          p={2}
          boxShadow={useColorModeValue(
            "sm",
            "inset 0 0 0 1px rgba(59,130,246,0.08)"
          )}
        >
          <EnvironmentalConditions />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AssetPerformanceSection;