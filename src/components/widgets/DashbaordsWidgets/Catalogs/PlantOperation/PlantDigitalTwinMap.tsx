import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const PlantDigitalTwinMap = () => {
  const bg = useColorModeValue(
    "#fff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  return (
    <Box
      h="720px"
      bg={bg}
      borderRadius="12px"
      border="1px solid rgba(255,255,255,0.08)"
    >
      <Flex
        h="100%"
        align="center"
        justify="center"
        direction="column"
      >
        <Text fontSize="26px" fontWeight="700">
          Digital Twin Plant Map
        </Text>

        <Text color="gray.400">
          Reserved Area
        </Text>
      </Flex>
    </Box>
  );
};

export default PlantDigitalTwinMap;