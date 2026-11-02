import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const RevenueLeakageWaterfall = () => {
  const cardBg = useColorModeValue(
    "#fff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const labelColor = useColorModeValue('#062D59', '#D6E4FF');
  const mutedColor = useColorModeValue('gray.700', '#D9D9D9');

  const losses = [
    {
      name: "Grid Curtailment",
      value: "- ₹ 44,800",
      top: 32,
      width: 34,
      height: 14,
    },
    {
      name: "Inverter Inefficiency",
      value: "- ₹ 31,900",
      top: 50,
      width: 24,
      height: 18,
    },
    {
      name: "Soiling Loss",
      value: "- ₹ 21,100",
      top: 78,
      width: 16,
      height: 20,
    },
    {
      name: "Transformer Losses",
      value: "- ₹ 11,200",
      top: 103,
      width: 12,
      height: 18,
    },
    {
      name: "Auxiliary Consumption",
      value: "- ₹ 8,200",
      top: 126,
      width: 8,
      height: 18,
    },
  ];

  return (
    <Box
      h="260px"
      bg={cardBg}
      borderRadius="10px"
      border="1px solid rgba(255,255,255,0.08)"
      overflow="hidden"
      position="relative"
      p={3}
    >
      {/* Header */}

      <Text
        color={labelColor}
        fontSize="13px"
        fontWeight="600"
        mb={2}
      >
        REVENUE LEAKAGE WATERFALL{" "}
        <Text
          as="span"
          color="#4FC3F7"
          fontSize="11px"
        >
          (Today)
        </Text>
      </Text>

      <Box
        position="relative"
        h="180px"
      >
        {/* Potential Revenue */}

        <Box
          position="absolute"
          left="8px"
          bottom="20px"
        >
          <Text
            color={labelColor}
            fontSize="12px"
            mb={1}
            textAlign="center"
          >
            ₹ 53.9 Lakh
          </Text>

          <Box
            w="38px"
            h="110px"
            bg="linear-gradient(180deg,#3E8EFF 0%, #1B5FC7 100%)"
            border="1px solid rgba(255,255,255,0.15)"
          />

          <Text mt={2} color={mutedColor} fontSize="12px" textAlign="center">
            Potential
          </Text>

          <Text color={mutedColor} fontSize="12px" textAlign="center">
            Revenue
          </Text>
        </Box>

        {/* Waterfall Steps */}

        <Box
          position="absolute"
          left="65px"
          top="18px"
        >
          {losses.map((item, idx) => (
            <Box
              key={idx}
              position="absolute"
              top={`${item.top}px`}
              left={`${idx * 13}px`}
            >
              <Box
                bg="linear-gradient(180deg,#FF6247 0%, #E53935 100%)"
                w={`${item.width}px`}
                h={`${item.height}px`}
              />

              <Text position="absolute" left="38px" top="-2px" color={labelColor} whiteSpace="nowrap" fontSize="10px">
                {item.name}
              </Text>

              <Text position="absolute" left="160px" top="-2px" color={mutedColor} whiteSpace="nowrap" fontSize="10px">
                {item.value}
              </Text>
            </Box>
          ))}
        </Box>

        {/* Connector Line */}

        <Box
          position="absolute"
          left="58px"
          bottom="32px"
          w="185px"
          h="1px"
          bg="rgba(255,255,255,0.35)"
        />

        <Box
          position="absolute"
          left="58px"
          bottom="32px"
          w="185px"
          h="12px"
          borderBottom="2px solid #ff6d00"
          borderLeft="2px solid #ff6d00"
          borderBottomLeftRadius="8px"
        />

        {/* Actual Revenue */}

        <Box
          position="absolute"
          right="8px"
          bottom="20px"
        >
          <Text color={labelColor} fontSize="12px" mb={1} textAlign="center">
            ₹ 52.7 Lakh
          </Text>

          <Box
            w="38px"
            h="110px"
            bg="linear-gradient(180deg,#34C759 0%, #1E8E3E 100%)"
            border="1px solid rgba(255,255,255,0.15)"
          />

          <Text mt={2} color={mutedColor} fontSize="12px" textAlign="center">
            Actual
          </Text>

          <Text color={mutedColor} fontSize="12px" textAlign="center">
            Revenue
          </Text>
        </Box>
      </Box>

      {/* Total Loss */}

      <VStack
        spacing={0}
        mt={-2}
      >
        <Text
          color="gray.400"
          fontSize="11px"
        >
          Total Loss
        </Text>

        <Text
          color="#FF3B30"
          fontSize="18px"
          fontWeight="700"
        >
          - ₹ 1.18 Lakh (2.2%)
        </Text>
      </VStack>
    </Box>
  );
};

export default RevenueLeakageWaterfall;