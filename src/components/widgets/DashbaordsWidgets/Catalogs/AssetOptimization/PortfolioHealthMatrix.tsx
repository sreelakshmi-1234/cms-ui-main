import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import BubbleChart from "../../../charts/BubbleChart";

const PortfolioHealthMatrix = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const bubbleSeries = [
    {
      name: "Assets",
      data: [
        [85, 92, 3],
        [78, 88, 4],
        [72, 76, 2],
        [65, 82, 5],
        [58, 65, 2],
        [92, 95, 6],
        [88, 70, 4],
        [45, 55, 1],
        [70, 90, 5],
        [95, 85, 6],
        [62, 72, 3],
        [82, 60, 4],
      ],
      color: "#2F80ED",
    },
  ];

  return (
    <Box
      h="100%"
      w="100%"
      bg={cardBg}
      borderRadius="12px"
      overflow="hidden"
      border="1px solid rgba(0,153,255,0.15)"
    >
      <GraphLayout
        title="PORTFOLIO HEALTH MATRIX"
        width={["100%"]}
        height="100%"
        titleFontSize="11px"
        titleLengthSVG={70}
        titleLengthLongSVG={180}
        downloadOption={false}
        fullScreen={false}
      >
        <BubbleChart
          height={170}
          apiData={bubbleSeries}
          props={{
            chart: { type: "bubble" },
            legend: { enabled: false },
            xAxis: { min: 0, max: 100, title: { text: "" } },
            yAxis: { min: 0, max: 100, title: { text: "" } },
            tooltip: { useHTML: true },
            plotOptions: { bubble: { minSize: 8, maxSize: 40 } },
          }}
        />
      </GraphLayout>
    </Box>
  );
};

export default PortfolioHealthMatrix;