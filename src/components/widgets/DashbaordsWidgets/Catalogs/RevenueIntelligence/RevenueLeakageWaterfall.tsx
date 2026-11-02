import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const RevenueLeakageWaterfall = () => {
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

  const lossValueColor = useColorModeValue(
    "#FF5B5B",
    "#FFFFFF"
  );

  const losses = [
    {
      name: "Grid Curtailment",
      value: "₹ 0.42 Lakh",
      height: 34,
    },
    {
      name: "Inverter Clipping",
      value: "₹ 0.28 Lakh",
      height: 24,
    },
    {
      name: "Soiling Loss",
      value: "₹ 0.18 Lakh",
      height: 18,
    },
    {
      name: "Temperature Loss",
      value: "₹ 0.12 Lakh",
      height: 14,
    },
    {
      name: "Availability Loss",
      value: "₹ 0.07 Lakh",
      height: 10,
    },
    {
      name: "Transformer Derating",
      value: "₹ 0.03 Lakh",
      height: 8,
    },
  ];

  return (
    <Box
      flex={1}
      minH="320px"
      p={3}
      borderRadius="10px"
      border={cardBorder}
      bg={cardBg}
      overflow="hidden"
      position="relative"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        mb={3}
      >
        <Flex align="center" gap={2}>
          <Box
            w="18px"
            h="18px"
            borderRadius="full"
            bg="#2563EB"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize="10px"
              color="white"
              fontWeight="700"
            >
              1
            </Text>
          </Box>

          <Text
            fontSize="12px"
            fontWeight="700"
            color={titleColor}
          >
            REVENUE LEAKAGE WATERFALL
          </Text>
        </Flex>
      </Flex>

      {/* Expected Revenue */}
      <Flex
        justify="space-between"
        mb={2}
      >
        <Text
          fontSize="11px"
          color={muted}
        >
          Expected Revenue
        </Text>

        <Text
          fontSize="13px"
          fontWeight="700"
          color={titleColor}
        >
          ₹ 13.50 Lakh
        </Text>
      </Flex>

      {/* Waterfall */}
      <Box
        position="relative"
        h="155px"
        mt={1}
      >
        {/* Blue Revenue Bar */}
        <Box
          position="absolute"
          left="0"
          top="10px"
          w="48px"
          h="16px"
          bg="linear-gradient(90deg,#5765FF,#6F86FF)"
        />

        {/* Connector */}
        <Box
          position="absolute"
          left="48px"
          top="17px"
          w="14px"
          h="2px"
          bg="#FF5B5B"
        />

        {losses.map((item, index) => {
          const left = 52 + index * 8;

          const top =
            14 +
            losses
              .slice(0, index)
              .reduce(
                (acc, curr) =>
                  acc + curr.height,
                0
              );

          return (
            <Box key={item.name}>
              {/* Vertical Red Bar */}
              <Box
                position="absolute"
                left={`${left}px`}
                top={`${top}px`}
                w="6px"
                h={`${item.height}px`}
                bg="#FF5B5B"
              />

              {/* Dot */}
              <Box
                position="absolute"
                left={`${left + 12}px`}
                top={`${top + 4}px`}
                w="5px"
                h="5px"
                borderRadius="full"
                bg="#FF5B5B"
              />

              {/* Label + Value (two-column grid, values aligned) */}
              <Box
                position="absolute"
                right="8px"
                top={`${top - 4}px`}
                width="220px"
                display="grid"
                gridTemplateColumns="1fr 85px"
                alignItems="center"
              >
                <Text
                  fontSize="10px"
                  color={muted}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {item.name}
                </Text>

                <Text
                  fontSize="10px"
                  color={lossValueColor}
                  textAlign="right"
                  minW="85px"
                >
                  {item.value}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Gradient Line */}
      <Box
        h="2px"
        mt={1}
        borderRadius="full"
        bg="linear-gradient(90deg,#00D4FF,#00FF7F)"
      />

      {/* Actual Revenue */}
      <Flex
        justify="space-between"
        align="center"
        mt={3}
      >
        <Text
          color={titleColor}
          fontSize="13px"
        >
          Actual Revenue
        </Text>

        <Text
          color="#00E676"
          fontWeight="700"
          fontSize="20px"
        >
          ₹ 12.40 Lakh
        </Text>
      </Flex>
    </Box>
  );
};

export default RevenueLeakageWaterfall;