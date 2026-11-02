import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";

const TransformerFleetOverview = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const titleColor = useColorModeValue("#0F172A", "#FFFFFF");

  const data = [
    { name: "Healthy", value: 82, color: "green" },
    { name: "Warning", value: 12, color: "orange" },
    { name: "Critical", value: 6, color: "red" },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      p={4}
      border="1px solid"
      borderColor="rgba(0,153,255,0.15)"
    >
      <Text
        fontSize="13px"
        fontWeight="700"
        mb={4}
        color={titleColor}
      >
        TRANSFORMER FLEET OVERVIEW
      </Text>

      <HStack
        h="210px"
        spacing={8}
        align="center"
      >
        <VStack flex={1}>
          <Text
            fontSize="48px"
            fontWeight="700"
            color="#22C55E"
          >
            42
          </Text>

          <Text
            fontSize="12px"
            color={useColorModeValue("#64748B", "#94A3B8")}
          >
            Total Transformers
          </Text>
        </VStack>

        <VStack
          flex={2}
          spacing={4}
          align="stretch"
        >
          {data.map((item) => (
            <Box key={item.name}>
              <Flex
                justify="space-between"
                mb={1}
              >
                <Text fontSize="12px">
                  {item.name}
                </Text>

                <Text
                  fontSize="12px"
                  fontWeight="700"
                >
                  {item.value}%
                </Text>
              </Flex>

              <Progress
                value={item.value}
                colorScheme={item.color}
                borderRadius="full"
                size="sm"
              />
            </Box>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
};

export default TransformerFleetOverview;