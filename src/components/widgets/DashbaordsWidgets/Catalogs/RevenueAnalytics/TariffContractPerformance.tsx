import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const TariffContractPerformance = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );
  const titleColor = useColorModeValue('#1A202C', '#FFFFFF');
  const accentColor = useColorModeValue('#42A5F5', '#42A5F5');
  const headerMuted = useColorModeValue('#8CA3C7', '#D6E4FF');
  const rowColor = useColorModeValue('#062D59', '#DCE7F7');

  const tableData = [
    {
      tariff: "HT PPA",
      ppa: "4.10",
      realized: "4.08",
      revenue: "1,012.4",
      variance: "▼ -0.5%",
      varianceColor: "#FF4D4F",
    },
    {
      tariff: "Open Access",
      ppa: "4.85",
      realized: "4.79",
      revenue: "145.3",
      variance: "▼ -1.2%",
      varianceColor: "#FF4D4F",
    },
    {
      tariff: "Group Captive",
      ppa: "4.35",
      realized: "4.31",
      revenue: "98.6",
      variance: "▼ -0.9%",
      varianceColor: "#FF4D4F",
    },
    {
      tariff: "Merchant",
      ppa: "-",
      realized: "4.62",
      revenue: "48.7",
      variance: "-",
      varianceColor: "#A0AEC0",
    },
    {
      tariff: "REC / Green Cert.",
      ppa: "-",
      realized: "0.38",
      revenue: "78.2",
      variance: "-",
      varianceColor: "#A0AEC0",
    },
  ];

  return (
    <Box
      h="350px"
      w="100%"
      bg={cardBg}
      borderRadius="10px"
      border="1px solid rgba(255,255,255,0.08)"
      overflow="hidden"
      boxShadow="0 0 15px rgba(0,0,0,0.15)"
    >
      {/* Header */}

      <Flex
        px={3}
        py={2}
        borderBottom="1px solid rgba(255,255,255,0.06)"
      >
        <Text
          color={titleColor}
          fontSize="13px"
          fontWeight="700"
        >
          TARIFF / CONTRACT PERFORMANCE
        </Text>

        <Text
          ml={1}
          color={accentColor}
          fontSize="11px"
        >
          (This Month)
        </Text>
      </Flex>

      {/* Column Header */}

      <Flex
        px={3}
        py={2}
        fontSize="10px"
        color={headerMuted}
        fontWeight="600"
      >
        <Box w="95px">Tariff Type</Box>

        <Box
          w="60px"
          textAlign="center"
        >
          PPA Rate
          <br />
          (₹/kWh)
        </Box>

        <Box
          w="75px"
          textAlign="center"
        >
          Realized Rate
          <br />
          (₹/kWh)
        </Box>

        <Box
          w="75px"
          textAlign="center"
        >
          Revenue
          <br />
          (₹ Lakh)
        </Box>

        <Box
          flex={1}
          textAlign="right"
        >
          vs PPA
        </Box>
      </Flex>

      {/* Rows */}

      <VStack
        spacing={0}
        align="stretch"
      >
        {tableData.map((row, index) => (
          <Flex
            key={index}
            px={3}
            py="7px"
            align="center"
            borderTop="1px solid rgba(255,255,255,0.05)"
          >
            <Box
              w="95px"
              color={rowColor}
              fontSize="12px"
            >
              {row.tariff}
            </Box>

            <Box
              w="60px"
              textAlign="center"
              color={rowColor}
              fontSize="12px"
            >
              {row.ppa}
            </Box>

            <Box
              w="75px"
              textAlign="center"
              color={rowColor}
              fontSize="12px"
            >
              {row.realized}
            </Box>

            <Box
              w="75px"
              textAlign="center"
              color={rowColor}
              fontSize="12px"
            >
              {row.revenue}
            </Box>

            <Box
              flex={1}
              textAlign="right"
              color={row.varianceColor}
              fontSize="12px"
              fontWeight="600"
            >
              {row.variance}
            </Box>
          </Flex>
        ))}
      </VStack>

      {/* Total */}

      <Divider
        mt={1}
        borderColor="rgba(255,255,255,0.08)"
      />

      <HStack
        px={3}
        py={2}
        justify="space-between"
      >
        <Text
          color={titleColor}
          fontWeight="600"
          fontSize="13px"
        >
          Total
        </Text>

        <Text
          color={titleColor}
          fontWeight="600"
          fontSize="13px"
        >
          1,383.2
        </Text>

        <Box w="50px" />
      </HStack>
    </Box>
  );
};

export default TariffContractPerformance;