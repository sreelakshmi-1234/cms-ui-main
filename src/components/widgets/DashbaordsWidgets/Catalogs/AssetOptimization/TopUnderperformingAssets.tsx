import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const TopUnderperformingAssets = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const rows = [
    ["INV-068", "Inverter", "42", "-6.8%", "₹ 12,600"],
    ["TR-01", "Transformer", "44", "-4.1%", "₹ 18,400"],
    ["SMB-14", "String Monitor", "39", "-3.6%", "₹ 7,800"],
    ["INV-076", "Inverter", "51", "-2.9%", "₹ 6,200"],
    ["TR-11", "Transformer", "38", "-2.7%", "₹ 6,200"],
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
        TOP UNDERPERFORMING ASSETS
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
              Asset ID
            </Th>

            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              Type
            </Th>

            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              Health
            </Th>

            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              PR Impact
            </Th>

            <Th
              px="4px"
              py="3px"
              fontSize="8px"
            >
              Revenue
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {rows.map((row) => (
            <Tr key={row[0]}>
              <Td
                px="4px"
                py="3px"
                fontSize="9px"
              >
                {row[0]}
              </Td>

              <Td
                px="4px"
                py="3px"
                fontSize="9px"
                whiteSpace="nowrap"
              >
                {row[1]}
              </Td>

              <Td
                px="4px"
                py="3px"
                fontSize="10px"
                color="#EF4444"
                fontWeight="700"
              >
                {row[2]}
              </Td>

              <Td
                px="4px"
                py="3px"
                fontSize="9px"
                color="#EF4444"
              >
                {row[3]}
              </Td>

              <Td
                px="4px"
                py="3px"
                fontSize="9px"
              >
                {row[4]}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button
        mt={2}
        h="24px"
        size="xs"
        w="100%"
        fontSize="9px"
        variant="outline"
      >
        View All Assets
      </Button>
    </Box>
  );
};

export default TopUnderperformingAssets;