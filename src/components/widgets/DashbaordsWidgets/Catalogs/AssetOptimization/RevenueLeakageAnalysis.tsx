import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const RevenueLeakageAnalysis = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const cardBorder = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#4A5568",
    "#D6E4FF"
  );

  const losses = [
    {
      name: "Grid Curtailment",
      value: "₹ 44,800",
      percent: "38%",
      height: 22,
    },
    {
      name: "Inverter Inefficiency",
      value: "₹ 31,900",
      percent: "27%",
      height: 18,
    },
    {
      name: "Soiling Loss",
      value: "₹ 21,100",
      percent: "18%",
      height: 14,
    },
    {
      name: "Transformer Losses",
      value: "₹ 11,200",
      percent: "10%",
      height: 10,
    },
    {
      name: "Auxiliary Consumption",
      value: "₹ 8,200",
      percent: "7%",
      height: 8,
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      p="8px"
      borderRadius="10px"
      border={cardBorder}
      bg={cardBg}
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        align="center"
        gap={2}
        mb={2}
      >
        <Box
          w="16px"
          h="16px"
          borderRadius="full"
          bg="#2563EB"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color="white"
            fontSize="9px"
            fontWeight="700"
          >
            1
          </Text>
        </Box>

        <Text
          fontSize="11px"
          fontWeight="700"
          color={titleColor}
        >
          REVENUE LEAKAGE ANALYSIS
        </Text>

        <Text
          fontSize="9px"
          color="#60A5FA"
        >
          (Today)
        </Text>
      </Flex>

      {/* Expected Revenue */}
      <Flex
        justify="space-between"
        mb={2}
      >
        <Text
          fontSize="10px"
          color={muted}
        >
          Expected Revenue
        </Text>

        <Text
          fontSize="12px"
          fontWeight="700"
          color={titleColor}
        >
          ₹ 53.9 Lakh
        </Text>
      </Flex>

      {/* Waterfall Area */}
      <Box
        position="relative"
        h="115px"
      >
        {/* Blue Bar */}
        <Box
          position="absolute"
          left="0"
          top="12px"
          w="46px"
          h="16px"
          bg="linear-gradient(90deg,#5B6CFF,#8094FF)"
        />

        {/* Connector */}
        <Box
          position="absolute"
          left="46px"
          top="19px"
          w="10px"
          h="2px"
          bg="#FF4D4F"
        />

        {losses.map((item, index) => {
          const left = 54 + index * 8;

          const top =
            18 +
            losses
              .slice(0, index)
              .reduce(
                (a, b) => a + b.height,
                0
              );

          return (
            <Box key={item.name}>
              <Box
                position="absolute"
                left={`${left}px`}
                top={`${top}px`}
                w="6px"
                h={`${item.height}px`}
                bg="#FF4D4F"
              />

              <Box
                position="absolute"
                left={`${left + 10}px`}
                top={`${top + 2}px`}
                w="4px"
                h="4px"
                borderRadius="full"
                bg="#FF4D4F"
              />

              <Box
                position="absolute"
                right="0"
                top={`${top - 4}px`}
                w="190px"
              >
                <Flex justify="space-between">
                  <Text
                    fontSize="9px"
                    color={muted}
                  >
                    {item.name}
                  </Text>

                  <Text
                    fontSize="9px"
                    color={titleColor}
                  >
                    {item.value} ({item.percent})
                  </Text>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Divider */}
      <Box
        h="2px"
        mt={1}
        bg="linear-gradient(90deg,#00D4FF,#00FF7F)"
      />

      {/* Actual Revenue */}
      <Flex
        justify="space-between"
        align="center"
        mt={2}
      >
        <Text
          fontSize="11px"
          color={titleColor}
        >
          Actual Revenue
        </Text>

        <Text
          fontSize="18px"
          fontWeight="700"
          color="#00E676"
        >
          ₹ 52.7 Lakh
        </Text>
      </Flex>
    </Box>
  );
};

export default RevenueLeakageAnalysis;