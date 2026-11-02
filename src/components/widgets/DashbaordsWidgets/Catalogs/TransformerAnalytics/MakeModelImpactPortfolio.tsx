import React from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  height?: string | number;
  width?: string | number;
}

const MakeModelImpactPortfolio = ({
  height = "340px",
  width = "900px",
}: Props) => {
  const bg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "rgba(0,0,0,0.08)",
    "rgba(120,180,255,0.18)"
  );
  const titleColor = useColorModeValue('#062D59', '#E6F0FF');
  const headerColor = useColorModeValue('#4A5568', '#9EB6D8');
  const cellColor = useColorModeValue('#1A202C', '#DCE8FF');
  const highlightColor = useColorModeValue('#B7791F', '#FACC15');
  const moneyColor = useColorModeValue('#C05621', '#F59E0B');
  const positiveColor = useColorModeValue('#16A34A', '#22C55E');

  const rows = [
    ["Sungrow", "28.5", "312.5", "4.28", "15.24", "27.4%"],
    ["Huawei", "22.0", "238.7", "4.32", "11.63", "20.9%"],
    ["Growatt", "15.6", "166.2", "4.23", "7.98", "14.3%"],
    ["SMA", "11.8", "127.1", "4.25", "6.11", "11.0%"],
    ["Sineng", "9.2", "96.3", "4.18", "4.61", "8.3%"],
    ["Delta", "6.9", "69.4", "4.05", "3.32", "6.0%"],
    ["Ingeteam", "4.6", "46.2", "4.02", "2.21", "4.0%"],
    ["Others", "1.4", "13.8", "3.88", "0.66", "1.1%"],
  ];

  return (
    <Box
      h={height}
      w="416px"
      bg={bg}
      borderRadius="10px"
      border="1px solid"
      borderColor={border}
      p={2}
      overflow="hidden"
    >
      <Text color={titleColor} fontSize="11px" fontWeight="700" mb={2}>
        MAKE & MODEL IMPACT ON PORTFOLIO
        <Box as="span" display="inline-block" color={headerColor} fontSize="9px" ml={1}>
          (Today)
        </Box>
      </Text>

      <Box overflowX="auto">
        <Table
          size="xs"
          variant="unstyled"
          sx={{ tableLayout: 'fixed', minWidth: '860px' }}
        >
          <Thead>
            <Tr>
              <Th p="2px" color={headerColor} fontSize="7px">Make</Th>
              <Th p="2px" color={headerColor} fontSize="7px" textAlign="center">Installed Cap.<br />(MWac)</Th>
              <Th p="2px" color={headerColor} fontSize="7px" textAlign="center">Energy<br />Generated</Th>
              <Th p="2px" color={headerColor} fontSize="7px" textAlign="center">Specific Yield<br />(kWh/kWp)</Th>
              <Th p="2px" color={headerColor} fontSize="7px" textAlign="center">Revenue<br />Impact</Th>
              <Th p="2px" color={headerColor} fontSize="7px" textAlign="center">Portfolio<br />Contribution</Th>
            </Tr>
          </Thead>

          <Tbody>
            {rows.map((row) => (
              <Tr key={row[0]}>
                <Td p="2px" color={cellColor} fontSize="8px">{row[0]}</Td>
                <Td p="2px" color={cellColor} fontSize="8px" textAlign="center">{row[1]}</Td>
                <Td p="2px" color={cellColor} fontSize="8px" textAlign="center">{row[2]}</Td>
                <Td p="2px" color={highlightColor} fontSize="8px" fontWeight="700" textAlign="center">{row[3]}</Td>
                <Td p="2px" color={moneyColor} fontSize="8px" fontWeight="700" textAlign="center">₹ {row[4]} Lakh</Td>
                <Td p="2px" color={positiveColor} fontSize="8px" fontWeight="700" textAlign="center">{row[5]}</Td>
              </Tr>
            ))}

            <Tr>
              <Td p="3px" color="#FBBF24" fontSize="8px" fontWeight="700">Total / Avg.</Td>
              <Td p="3px" color="#FBBF24" fontSize="8px" fontWeight="700" textAlign="center">100.0</Td>
              <Td p="3px" color="#FBBF24" fontSize="8px" fontWeight="700" textAlign="center">1,070.2</Td>
              <Td p="3px" color="#FBBF24" fontSize="8px" fontWeight="700" textAlign="center">4.22</Td>
              <Td p="3px" color="#FBBF24" fontSize="8px" fontWeight="700" textAlign="center">₹ 52.76 Lakh</Td>
              <Td p="3px" color="#FBBF24" fontSize="8px" fontWeight="700" textAlign="center">100%</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default MakeModelImpactPortfolio;