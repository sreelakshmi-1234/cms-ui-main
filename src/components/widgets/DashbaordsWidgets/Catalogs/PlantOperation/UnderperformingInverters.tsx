import {
  Box,
  Flex,
  Progress,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const inverterData = [
  {
    name: "INV-47",
    value: 72.1,
  },
  {
    name: "INV-22",
    value: 78.4,
  },
  {
    name: "INV-31",
    value: 79.2,
  },
];

const UnderperformingInverters = () => {
  const textColor = useColorModeValue(
    "#1E293B",
    "#FFFFFF"
  );

  const secondaryText = useColorModeValue(
    "#64748B",
    "#A8B3C7"
  );

  return (
    <Box
      h="100%"
      w="100%"
      minW="250px"
      px={2}
      py={1}
    >
      <Text
        fontSize="12px"
        fontWeight="500"
        color={textColor}
        mb={4}
      >
        Top Underperforming Inverters
      </Text>

      <VStack
        spacing={5}
        align="stretch"
      >
        {inverterData.map((item) => (
          <Box key={item.name}>
            <Flex
              justify="space-between"
              mb={1}
            >
              <Text
                fontSize="11px"
                color={secondaryText}
              >
                {item.name}
              </Text>

              <Text
                fontSize="11px"
                fontWeight="600"
                color={textColor}
              >
                {item.value}%
              </Text>
            </Flex>

            <Progress
              value={item.value}
              size="sm"
              borderRadius="999px"
              bg="rgba(255,255,255,0.08)"
              sx={{
                "& > div": {
                  background:
                    "linear-gradient(90deg,#2DA8FF,#1E6FFF)",
                  borderRadius: "999px",
                },
              }}
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default UnderperformingInverters;