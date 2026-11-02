import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StripsPieChart from "../../../charts/StripsPieChart";

interface WidgetProps {
  height?: string | number;
}

const TransformerLossBreakdown = ({
  height = "300px",
}: WidgetProps) => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid #0A4D9B"
  );

  const titleColor = useColorModeValue(
    "#062D59",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#4A5568",
    "#AFC4E8"
  );

  return (
    <Box
      h="290px"
      bg={cardBg}
      borderRadius="10px"
      border={border}
      p={4}
      overflow="hidden"
    >
      <Text
        color={titleColor}
        fontWeight="600"
        fontSize="12px"
        mb={5}
      >
        TRANSFORMER LOSSES BREAKDOWN{" "}
        <Text
          as="span"
          color={muted}
          fontSize="13px"
          fontWeight="500"
        >
          (Today)
        </Text>
      </Text>

      <Flex
        h="220px"
        align="center"
        justify="space-between"
      >
        {/* Donut Chart (StripsPieChart) */}
        <Box w="170px" h="170px" display="flex" alignItems="center" justifyContent="center">
          <StripsPieChart apiData={[112, 300]} names={["No-load Loss", "Load Loss"]} height={170} width={170} />
        </Box>

        {/* Legend */}
        <Box flex={1} ml={6}>
          <Flex
            justify="space-between"
            align="center"
            mb={6}
          >
            <Flex align="center">
              <Box
                w="9px"
                h="9px"
                borderRadius="50%"
                bg="#3B82F6"
                mr={2}
              />

              <Text
                color={muted}
                fontSize="13px"
              >
                No-load Loss
              </Text>
            </Flex>

            <Text
              color={titleColor}
              fontWeight="500"
              fontSize="13px"
            >
              112 kW (27%)
            </Text>
          </Flex>

          <Flex
            justify="space-between"
            align="center"
          >
            <Flex align="center">
              <Box
                w="9px"
                h="9px"
                borderRadius="50%"
                bg="#6366F1"
                mr={2}
              />

              <Text
                color={muted}
                fontSize="13px"
              >
                Load Loss
              </Text>
            </Flex>

            <Text
              color={titleColor}
              fontWeight="500"
              fontSize="13px"
            >
              300 kW (73%)
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default TransformerLossBreakdown;