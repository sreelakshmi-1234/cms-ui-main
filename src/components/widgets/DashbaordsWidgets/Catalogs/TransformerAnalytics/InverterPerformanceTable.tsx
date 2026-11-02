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
  height?: string;
}

const InverterPerformanceTable: React.FC<Props> = ({
  height = "240px",
}) => {
  const bg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "rgba(0,0,0,0.08)",
    "rgba(120,180,255,0.18)"
  );

  const titleColor = useColorModeValue("#062D59", "#E6F0FF");
  const thColor = useColorModeValue("#4A5568", "#8FB2DD");
  const tdColor = useColorModeValue("#1A202C", "#DCE8FF");

  const rows = [
    ["SG250HX", "Sungrow", "250", "28", "99.65", "99.2", "90"],
    ["SUN2000-215KTL", "Huawei", "215", "24", "99.42", "98.8", "88"],
    ["MAX125KTL-3-X", "Growatt", "125", "20", "97.96", "97.5", "85"],
    ["Sunny Tripower 125", "SMA", "125", "16", "98.10", "98.3", "87"],
    ["SP-110K3", "Sineng", "110", "18", "97.55", "96.9", "82"],
    ["M125HV", "Delta", "125", "14", "97.31", "96.2", "80"],
    ["INGECON SUN 100TL", "Ingeteam", "100", "12", "97.12", "96.0", "79"],
    ["Others", "-", "-", "26", "96.80", "95.5", "78"],
  ];

  return (
    <Box
      h={height}
      bg={bg}
      borderRadius="14px"
      border="1px solid"
      borderColor={border}
      p={2}
      overflow="hidden"
    >
      <Text
        color={titleColor}
        fontSize="11px"
        fontWeight="700"
        mb={1}
      >
        INVERTER PERFORMANCE BY MODEL (Top 10)
      </Text>

      <Box maxH="calc(100% - 32px)" overflowY="auto">
        <Table
          size="xs"
          variant="unstyled"
          sx={{
            tableLayout: "fixed",
          }}
        >
        <Thead>
          <Tr>
            <Th p="2px" color={thColor} fontSize="8px">Model</Th>
            <Th p="2px" color={thColor} fontSize="8px">Make</Th>
            <Th p="2px" color={thColor} fontSize="8px">Cap.</Th>
            <Th p="2px" color={thColor} fontSize="8px">Units</Th>
            <Th p="2px" color={thColor} fontSize="8px">Eff.</Th>
            <Th p="2px" color={thColor} fontSize="8px">Avail.</Th>
            <Th p="2px" color={thColor} fontSize="8px">Health</Th>
          </Tr>
        </Thead>

        <Tbody>
          {rows.map((row) => (
            <Tr key={row[0]}>
              <Td
                p="2px"
                color={tdColor}
                fontSize="8px"
                whiteSpace="nowrap"
              >
                {row[0]}
              </Td>

              <Td
                p="2px"
                color={tdColor}
                fontSize="8px"
              >
                {row[1]}
              </Td>

              <Td
                p="2px"
                color={tdColor}
                fontSize="8px"
              >
                {row[2]}
              </Td>

              <Td
                p="2px"
                color={tdColor}
                fontSize="8px"
              >
                {row[3]}
              </Td>

              <Td
                p="2px"
                color="#22C55E"
                fontSize="8px"
                fontWeight="700"
              >
                {row[4]}
              </Td>

              <Td
                p="2px"
                color="#22C55E"
                fontSize="8px"
                fontWeight="700"
              >
                {row[5]}
              </Td>

              <Td
                p="2px"
                color="#F59E0B"
                fontSize="8px"
                fontWeight="700"
              >
                {row[6]}
              </Td>
            </Tr>
          ))}
        </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default InverterPerformanceTable;