import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StripsPieChart from "../../../charts/StripsPieChart";

interface Props {
  height?: string | number;
}

const InverterHealthDistribution = ({
  height = "290px",
}: Props) => {
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
      h={height}
      bg={cardBg}
      borderRadius="10px"
      border={border}
      p={3}
      overflow="hidden"
    >
      <Text
        color={titleColor}
        fontWeight="600"
        fontSize="13px"
        mb={3}
      >
        INVERTER HEALTH DISTRIBUTION
      </Text>

      <Flex
        h="220px"
        align="center"
        justify="space-between"
      >
        <Box
          w="120px"
          h="120px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StripsPieChart
            apiData={[48, 76, 22, 12]}
            names={[
              "Excellent",
              "Good",
              "Fair",
              "Poor",
            ]}
            height={120}
            width={120}
          />
        </Box>

        <Box flex={1} ml={3}>
          <Flex justify="space-between" mb={2}>
            <Flex align="center">
              <Box w="8px" h="8px" bg="#22C55E" borderRadius="50%" mr={2} />
              <Text color={muted} fontSize="10px">
                Excellent (90-100)
              </Text>
            </Flex>
            <Text color={titleColor} fontSize="10px">
              48 (30%)
            </Text>
          </Flex>

          <Flex justify="space-between" mb={2}>
            <Flex align="center">
              <Box w="8px" h="8px" bg="#3B82F6" borderRadius="50%" mr={2} />
              <Text color={muted} fontSize="10px">
                Good (70-89)
              </Text>
            </Flex>
            <Text color={titleColor} fontSize="10px">
              76 (48%)
            </Text>
          </Flex>

          <Flex justify="space-between" mb={2}>
            <Flex align="center">
              <Box w="8px" h="8px" bg="#FACC15" borderRadius="50%" mr={2} />
              <Text color={muted} fontSize="10px">
                Fair (50-69)
              </Text>
            </Flex>
            <Text color={titleColor} fontSize="10px">
              22 (14%)
            </Text>
          </Flex>

          <Flex justify="space-between">
            <Flex align="center">
              <Box w="8px" h="8px" bg="#EF4444" borderRadius="50%" mr={2} />
              <Text color={muted} fontSize="10px">
                Poor (&lt;50)
              </Text>
            </Flex>
            <Text color={titleColor} fontSize="10px">
              12 (8%)
            </Text>
          </Flex>
        </Box>
      </Flex>

      {/* numeric summary removed per request */}
    </Box>
  );
};

export default InverterHealthDistribution;