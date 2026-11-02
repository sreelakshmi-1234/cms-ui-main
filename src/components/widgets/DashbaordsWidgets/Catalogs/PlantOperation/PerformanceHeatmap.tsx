import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import HeatmapChart from "../../../charts/HeatmapChart";

export {};

const heatmapData = [
  { block: "B-01", value: 98 },
  { block: "B-02", value: 96 },
  { block: "B-03", value: 95 },
  { block: "B-04", value: 93 },

  { block: "B-05", value: 91 },
  { block: "B-06", value: 90 },
  { block: "B-07", value: 88 },
  { block: "B-08", value: 97 },

  { block: "B-09", value: 94 },
  { block: "B-10", value: 96 },
  { block: "B-11", value: 89 },
  { block: "B-12", value: 92 },

  { block: "B-13", value: 87 },
  { block: "B-14", value: 86 },
  { block: "B-15", value: 94 },
  { block: "B-16", value: 95 },
];

const PerformanceHeatmap = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const cardBorder = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue("#1E293B", "#FFFFFF");
  const muted = useColorModeValue('#4A5568', '#D6E4FF');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const cols = 4;
  const rows = Math.ceil(heatmapData.length / cols);

  const heatmapPoints: [number, number, number][] = heatmapData.map((item, idx) => {
    const x = idx % cols;
    const y = Math.floor(idx / cols);
    return [x, y, Number(item.value)];
  });

  const values = heatmapData.map((h) => h.value);
  const min = Math.max(0, Math.min(...values) - 2);
  const max = Math.max(...values) + 2;

  const apiData = [
    {
      borderWidth: 1,
      borderColor: useColorModeValue("#ffffff", "#031B44"),
      data: heatmapPoints,
      colsize: 1,
      rowsize: 1,
      dataLabels: { enabled: false },
    },
  ];

  const xCategories = Array.from({ length: cols }, (_, i) => `C${i + 1}`);
  const yCategories = Array.from({ length: rows }, (_, i) => `R${i + 1}`);

  return (
    <GraphLayout title="PERFORMANCE HEATMAP (PR %)" width={["100%"]} height={["320px"]} titleFontSize="12px">
      <Box flex={1} p={3} borderRadius="10px" border={cardBorder} bg={cardBg} overflow="hidden" minH="320px">
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontSize="12px" fontWeight="700" color={titleColor}>
            {/* PERFORMANCE HEATMAP (PR %) */}
          </Text>
        </Flex>

        <div ref={wrapperRef} style={{ position: "relative", height: "100%" }}>
          <HeatmapChart
            height={190}
            apiData={apiData}
            onExportReady={setExportFunctions}
            props={{
              chart: { marginTop: 10 },
              xAxis: { categories: xCategories, labels: { enabled: false }, lineWidth: 0, tickLength: 0, gridLineWidth: 0 },
              yAxis: { categories: yCategories, labels: { enabled: false }, title: { text: null }, gridLineWidth: 0 },
              colorAxis: {
                min,
                max,
                stops: [
                  [0, "#EF4444"],
                  [0.5, "#FACC15"],
                  [1, "#22C55E"],
                ],
              },
              legend: { enabled: true, align: "center", verticalAlign: "bottom", layout: "horizontal", itemStyle: { fontSize: "10px" } },
              tooltip: {
                formatter: function (this: any) {
                  const idx = this.point.x + this.point.y * cols;
                  const label = heatmapData[idx] ? heatmapData[idx].block : "";
                  return `${label}: <b>${this.point.value}%</b>`;
                },
              },
            }}
          />

          <Flex mt={2} justify="center" gap={4} fontSize="12px" color={muted}>
            <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#EF4444" /> <Text>&lt; {min.toFixed(0)}%</Text></Flex>
            <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#FACC15" /> <Text>{min.toFixed(0)} - {max.toFixed(0)}%</Text></Flex>
            <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#22C55E" /> <Text>&gt; {max.toFixed(0)}%</Text></Flex>
          </Flex>
        </div>
      </Box>
    </GraphLayout>
  );
};

export default PerformanceHeatmap;