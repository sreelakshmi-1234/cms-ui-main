import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

interface WidgetProps { height?: string | number; width?: string | number }

const TopTransformersByLoading = ({ height = "290px", width = "420px" }: WidgetProps) => {
  const data = [
    ["TR-01", "ABB", "96", "78", "64.2"],
    ["TR-07", "Kirloskar", "93", "82", "63.1"],
    ["TR-03", "Siemens", "89", "85", "60.8"],
    ["TR-11", "CG Power", "86", "88", "58.7"],
    ["TR-05", "Schneider", "82", "90", "56.3"],
  ];

  const cardBg = useColorModeValue("#ffffff", "#031B44");
  const border = useColorModeValue("1px solid rgba(0,0,0,0.08)", "1px solid #0A4D9B");
  const titleColor = useColorModeValue("#062D59", "#FFFFFF");
  const muted = useColorModeValue("#718096", "#AFC4E8");

  return (
    <Box
      h={height}
      w= "400px"
      bg={cardBg}
      borderRadius="10px"
      border={border}
      p={4}
      ml={4}
    >
      <Text color={titleColor} fontWeight="600" fontSize="12px" mb={4}>
        TOP 5 TRANSFORMERS BY LOADING
      </Text>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th color={muted}>ID</Th>
            <Th color={muted}>Make</Th>
            <Th color={muted}>Load</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.map((row) => (
            <Tr key={row[0]}>
              <Td color={titleColor}>{row[0]}</Td>
              <Td color={titleColor}>{row[1]}</Td>
              <Td color="#f97316">{row[2]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TopTransformersByLoading;