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
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  height?: string | number;
}

const TopUnderperformingInverters = ({
  height = "290px",
}: Props) => {
  const bg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "rgba(0,0,0,0.08)",
    "rgba(120,180,255,0.18)"
  );

  const rows = [
    ["INV-088", "Growatt", "125", "92.4", "DC Imbalance", "42"],
    ["INV-123", "Sineng", "110", "93.1", "Over Temp", "45"],
    ["INV-045", "SMA", "125", "93.8", "Grid Disturb", "48"],
    ["INV-067", "Delta", "125", "94.0", "DC Isolation", "49"],
    ["INV-091", "Ingeteam", "100", "94.2", "Fan Failure", "50"],
  ];

  const titleColor = useColorModeValue("#062D59", "#E6F0FF");
  const thColor = useColorModeValue("#4A5568", "#8FB2DD");
  const tdColor = useColorModeValue("#1A202C", "#DCE8FF");

  return (
    <Box
      h={height}
      bg={bg}
      borderRadius="10px"
      border="1px solid"
      borderColor={border}
      p={2}
      overflow="hidden"
    >
      <Text color={titleColor} fontWeight="700" fontSize="11px" mb={2}>
        TOP UNDERPERFORMING INVERTERS
      </Text>

      <Table
        size="xs"
        variant="unstyled"
        sx={{ tableLayout: "fixed" }}
      >
        <Thead>
          <Tr>
            <Th p="2px" fontSize="7px" color={thColor}>INV</Th>
            <Th p="2px" fontSize="7px" color={thColor}>Model</Th>
            <Th p="2px" fontSize="7px" color={thColor}>kW</Th>
            <Th p="2px" fontSize="7px" color={thColor}>Eff.</Th>
            <Th p="2px" fontSize="7px" color={thColor}>Issue</Th>
            <Th p="2px" fontSize="7px" color={thColor}>Score</Th>
          </Tr>
        </Thead>

        <Tbody>
          {rows.map((row) => (
            <Tr key={row[0]}>
              <Td p="2px" fontSize="8px" color={tdColor}>{row[0]}</Td>
              <Td p="2px" fontSize="8px" color={tdColor}>{row[1]}</Td>
              <Td p="2px" fontSize="8px" color={tdColor}>{row[2]}</Td>

              <Td
                p="2px"
                fontSize="8px"
                color="#22C55E"
                fontWeight="700"
              >
                {row[3]}
              </Td>

              <Td
                p="2px"
                fontSize="8px"
              >
                {row[4]}
              </Td>

              <Td
                p="2px"
                fontSize="8px"
                color="#EF4444"
                fontWeight="700"
              >
                {row[5]}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TopUnderperformingInverters;