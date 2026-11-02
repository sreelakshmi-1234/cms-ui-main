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
import { useEffect, useState } from "react";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import UseTopUnderperformingTransformers from "../../../../../Services/Hooks/Catalog/AssetOptimization/UseTopUnderperformingTransformers";

interface Props {
  type?: "plant" | "portfolio";
}

const TopUnderperformingTransformers = ({
  type = "plant",
}: Props) => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const { timeWindow } = useTimeHandle(
    7,
    "day",
    "AVG",
    [60, "minute"],
    1000
  );

  const searchTag = {
    devName: "Inverter",
    keys: [
      "efficiency",
      "loss_amount",
      "health_score",
      "make",
      "rating",
    ],
  };

  const {
    data,
    fetchTopUnderperformingTransformers,
  } = UseTopUnderperformingTransformers(
    searchTag,
    timeWindow,
    type
  );

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchTopUnderperformingTransformers();
  }, [timeWindow, type]);

  const rows = Array.isArray(data) ? data : [];
  const visibleRows = showAll ? rows : rows.slice(0, 5);

  return (
    <Box
      display="flex"
      flexDirection="column"
      h="100%"
      w="330px"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(0,153,255,0.15)"
      p="8px"
      overflow="hidden"
    >
      <Text
        fontSize="10px"
        fontWeight="700"
        mb={2}
      >
        TOP 5 UNDERPERFORMING TRANSFORMERS
      </Text>

      <Box flex={1} overflowY="auto" minH="0" mb={2}>
        <Table
          size="xs"
          variant="simple"
        >
          <Thead>
            <Tr>
              <Th
                px="4px"
                py="4px"
                fontSize="9px"
              >
                ID
              </Th>

              <Th
                px="4px"
                py="4px"
                fontSize="9px"
              >
                Make
              </Th>

              <Th
                px="4px"
                py="4px"
                fontSize="9px"
              >
                Eff%
              </Th>

              <Th
                px="4px"
                py="4px"
                fontSize="9px"
              >
                Loss
              </Th>

              <Th
                px="4px"
                py="4px"
                fontSize="9px"
              >
                Health
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {visibleRows.map((row: any) => (
              <Tr key={row.id}>
                <Td
                  px="4px"
                  py="3px"
                  fontSize="10px"
                  color="#F59E0B"
                  fontWeight="600"
                >
                  {row.id}
                </Td>

                <Td
                  px="4px"
                  py="3px"
                  fontSize="9px"
                  maxW="120px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {`${row.make} / ${row.rating}`}
                </Td>

                <Td px="4px" py="3px" fontSize="9px">
                  {row.efficiency?.toFixed(2)}
                </Td>

                <Td px="4px" py="3px" fontSize="9px">
                  ₹ {Number(row.loss || 0).toLocaleString()}
                </Td>

                <Td
                  px="4px"
                  py="3px"
                  fontSize="10px"
                  color="#EF4444"
                  fontWeight="700"
                >
                  {row.health?.toFixed(0)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Button
        mt={2}
        h="26px"
        size="xs"
        w="100%"
        fontSize="10px"
        variant="outline"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Less" : "View All Transformers"}
      </Button>
    </Box>
  );
};

export default TopUnderperformingTransformers;