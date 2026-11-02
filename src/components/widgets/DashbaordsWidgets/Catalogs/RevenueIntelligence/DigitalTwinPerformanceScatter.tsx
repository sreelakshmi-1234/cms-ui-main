import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ScatterChart from "../../../charts/ScatterChart";

const DigitalTwinPerformanceScatter = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const cardBorder = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#4A5568",
    "#D6E4FF"
  );

  const dummyData = [
    {
      name: "Digital Twin",
      type: "scatter",
      data: [
        [1, 2],
        [2, 3],
        [3, 1],
        [4, 4],
        [5, 2],
      ],
    },
  ];

  return (
    <Box
      w="350px"
      bg={cardBg}
      borderRadius="10px"
      border={cardBorder}
      p={3}
      minH="280px"
      overflow="visible"
    >
      {/* Header */}

      <Flex
        justify="space-between"
        align="center"
        mb={3}
      >
        <Text
          color={titleColor}
          fontSize="12px"
          fontWeight="700"
        >
          DIGITAL TWIN PERFORMANCE SCATTER
        </Text>
      </Flex>

      {/* Chart */}

      <GraphLayout
        title=""
        width={["335px"]}
        height="260px"
        infoSymbol={false}
      >
        <ScatterChart
          apiData={dummyData}
          height={220}
          bg="transparent"
        />
      </GraphLayout>
    </Box>
  );
};

export default DigitalTwinPerformanceScatter;