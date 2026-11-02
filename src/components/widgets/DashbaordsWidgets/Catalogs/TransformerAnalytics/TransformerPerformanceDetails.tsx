import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  height?: string | number;
}

const TransformerPerformanceDetails = ({
  height = "300px",
}: Props) => {
  const bg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "1px solid #E2E8F0",
    "1px solid #0A4D9B"
  );

  const titleColor = useColorModeValue(
    "#062D59",
    "#FFFFFF"
  );

  const headerColor = useColorModeValue(
    "#64748B",
    "#9BB8E5"
  );

  const textColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const data = [
    {
      id: "TR-01",
      make: "ABB",
      model: "2500/33",
      capacity: "2500",
      load: 96,
      eff: 97.85,
      noload: 2.8,
      loss: 48.6,
      temp: 64.2,
      health: "High Load",
      healthColor: "#EF4444",
    },
    {
      id: "TR-02",
      make: "Siemens",
      model: "2500/33",
      capacity: "2500",
      load: 76,
      eff: 98.65,
      noload: 2.6,
      loss: 34.6,
      temp: 52.1,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-03",
      make: "Siemens",
      model: "2500/33",
      capacity: "2500",
      load: 89,
      eff: 98.21,
      noload: 2.7,
      loss: 44.2,
      temp: 60.8,
      health: "High Load",
      healthColor: "#EF4444",
    },
    {
      id: "TR-04",
      make: "ABB",
      model: "2000/33",
      capacity: "2000",
      load: 55,
      eff: 98.91,
      noload: 1.9,
      loss: 22.4,
      temp: 47.2,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-05",
      make: "Schneider",
      model: "1600/33",
      capacity: "1600",
      load: 82,
      eff: 98.12,
      noload: 1.6,
      loss: 23.8,
      temp: 56.3,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-31",
      make: "CG Power",
      model: "2500/33",
      capacity: "2500",
      load: 61,
      eff: 98.33,
      noload: 2.5,
      loss: 27.6,
      temp: 49.4,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-32",
      make: "Kirloskar",
      model: "2000/33",
      capacity: "2000",
      load: 74,
      eff: 98.08,
      noload: 2.1,
      loss: 28.9,
      temp: 53.7,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-33",
      make: "ABB",
      model: "2000/33",
      capacity: "2000",
      load: 68,
      eff: 98.01,
      noload: 2.0,
      loss: 26.3,
      temp: 52.0,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-34",
      make: "Siemens",
      model: "1600/33",
      capacity: "1600",
      load: 91,
      eff: 97.95,
      noload: 2.9,
      loss: 46.1,
      temp: 66.4,
      health: "High Load",
      healthColor: "#EF4444",
    },
    {
      id: "TR-35",
      make: "Schneider",
      model: "2000/33",
      capacity: "2000",
      load: 59,
      eff: 98.44,
      noload: 1.7,
      loss: 21.8,
      temp: 48.9,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-36",
      make: "CG Power",
      model: "1600/33",
      capacity: "1600",
      load: 83,
      eff: 98.12,
      noload: 1.8,
      loss: 25.7,
      temp: 57.2,
      health: "Normal",
      healthColor: "#22C55E",
    },
    {
      id: "TR-37",
      make: "Kirloskar",
      model: "2500/33",
      capacity: "2500",
      load: 88,
      eff: 98.05,
      noload: 2.6,
      loss: 43.2,
      temp: 61.0,
      health: "High Load",
      healthColor: "#EF4444",
    },
  ];

  return (
    <Box
      h={height}
      bg={bg}
      border={border}
      borderRadius="10px"
      overflow="hidden"
      p={3}
    >
      <Text
        color={titleColor}
        fontWeight="700"
        fontSize="13px"
        mb={2}
      >
        TRANSFORMER PERFORMANCE DETAILS
      </Text>

      <Box overflowY="auto" maxH="calc(100% - 56px)">
        <Table
          size="xs"
          variant="unstyled"
          sx={{
            tableLayout: "fixed",
            width: "100%",
          }}
        >
        <Thead>
          <Tr>
            <Th color={headerColor} fontSize="9px" px="2px">
              Transformer ID
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Make
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Model
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Capacity (KVA)
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Load (%)
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Efficiency (%)
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              No-load Loss (kW)
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Load Loss (kW)
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Oil Temp (°C)
            </Th>

            <Th color={headerColor} fontSize="9px" px="2px">
              Health Score
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td color={textColor} fontSize="10px" px="2px">
                {row.id}
              </Td>

              <Td color={textColor} fontSize="10px" px="2px">
                {row.make}
              </Td>

              <Td color={textColor} fontSize="10px" px="2px">
                {row.model}
              </Td>

              <Td color={textColor} fontSize="10px" px="2px">
                {row.capacity}
              </Td>

              <Td
                fontSize="10px"
                px="2px"
                fontWeight="700"
                color={
                  row.load >= 85
                    ? "#EAB308"
                    : row.load >= 70
                    ? "#84CC16"
                    : "#22C55E"
                }
              >
                {row.load}
              </Td>

              <Td color={textColor} fontSize="10px" px="2px">
                {row.eff}
              </Td>

              <Td color={textColor} fontSize="10px" px="2px">
                {row.noload}
              </Td>

              <Td color={textColor} fontSize="10px" px="2px">
                {row.loss}
              </Td>

              <Td color={textColor} fontSize="10px" px="2px">
                {row.temp}
              </Td>

              <Td
                fontSize="10px"
                px="2px"
                fontWeight="700"
                color={row.healthColor}
              >
                {row.health}
              </Td>
            </Tr>
          ))}
        </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TransformerPerformanceDetails;