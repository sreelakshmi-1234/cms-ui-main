import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";

const PortfolioTrendSummary = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const rows = [
    ["PR (%)", "92.12", "90.45", "+1.67"],
    ["CUF (%)", "23.48", "22.61", "+0.87"],
    ["Availability (%)", "99.21", "98.72", "+0.49"],
    ["Revenue (₹ Lakh)", "52.7", "49.5", "+3.2"],
    ["Losses (₹ Lakh)", "1.18", "1.05", "+0.13"],
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(0,153,255,0.15)"
      p="8px"
      overflow="hidden"
    >
      <Text
        fontSize="11px"
        fontWeight="700"
        mb={2}
      >
        PORTFOLIO TREND SUMMARY
      </Text>

      <Table
        size="xs"
        variant="simple"
      >
        <Thead>
          <Tr>
            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              Metric
            </Th>

            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              Today
            </Th>

            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              Yesterday
            </Th>

            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              Change
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {rows.map((row) => (
            <Tr key={row[0]}>
              <Td
                px="4px"
                py="4px"
                fontSize="9px"
                whiteSpace="nowrap"
              >
                {row[0]}
              </Td>

              <Td
                px="4px"
                py="4px"
                fontSize="9px"
              >
                {row[1]}
              </Td>

              <Td
                px="4px"
                py="4px"
                fontSize="9px"
              >
                {row[2]}
              </Td>

              <Td
                px="4px"
                py="4px"
                fontSize="9px"
                color="#22C55E"
                fontWeight="700"
              >
                ↑ {row[3]}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PortfolioTrendSummary;