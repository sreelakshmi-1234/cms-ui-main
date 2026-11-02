import {
  Box,
  Flex,
  Grid,
  Text,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
// Info icon removed per request
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import HeatmapChart from "../../../charts/HeatmapChart";

const RevenueHeatmap = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );
  const cardBorder = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue('#1A202C', '#FFFFFF');
  const muted = useColorModeValue('#4A5568', '#D6E4FF');

  const heatmapData = [
    { name: "INV-01", value: 2.42, color: "#18A84B" },
    { name: "INV-02", value: 2.31, color: "#179E47" },
    { name: "INV-03", value: 2.28, color: "#1DA94C" },
    { name: "INV-04", value: 2.15, color: "#249E44" },
    { name: "INV-05", value: 1.82, color: "#48A93F" },

    { name: "INV-06", value: 2.18, color: "#1EA34B" },
    { name: "INV-07", value: 2.12, color: "#289B44" },
    { name: "INV-08", value: 1.64, color: "#D68C1E" },
    { name: "INV-09", value: 1.58, color: "#D4821A" },
    { name: "INV-10", value: 1.33, color: "#D94034" },

    { name: "INV-11", value: 2.05, color: "#259B43" },
    { name: "INV-12", value: 2.00, color: "#2C9541" },
    { name: "INV-13", value: 1.78, color: "#A9A52A" },
    { name: "INV-14", value: 1.62, color: "#B89726" },
    { name: "INV-15", value: 1.41, color: "#C9821F" },

    { name: "INV-16", value: 1.29, color: "#E65039" },
    { name: "INV-17", value: 1.21, color: "#EB4A35" },
    { name: "INV-18", value: 1.18, color: "#E84431" },
    { name: "INV-19", value: 1.05, color: "#E53935" },
    { name: "INV-20", value: 0.98, color: "#D62828" },
  ];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const cols = 4;
  const rows = Math.ceil(heatmapData.length / cols);

  const heatmapPoints: [number, number, number][] = heatmapData.map((item, idx) => {
    const x = idx % cols;
    const y = Math.floor(idx / cols);
    return [x, y, Number(item.value.toFixed(2))];
  });

  const values = heatmapData.map((h) => h.value);
  const min = Math.max(0, Math.min(...values) - 0.2);
  const max = Math.max(...values) + 0.2;

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
    <GraphLayout title="REVENUE HEATMAP (₹ Lakh)" width={["100%"]} height={["100%"]}>
      <Box flex={1} p={3} borderRadius="10px" border={cardBorder} bg={cardBg} overflow="hidden" minH="320px">
        {/* Header */}

        <Flex justify="space-between" align="center" mb={3}>
          <Text fontSize="12px" fontWeight="700" color={titleColor}>
            {/* REVENUE HEATMAP (₹ Lakh) */}
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
                  [0, "#22C55E"],
                  [0.5, "#FACC15"],
                  [1, "#EF4444"],
                ],
              },
              legend: { enabled: true, align: "center", verticalAlign: "bottom", layout: "horizontal", itemStyle: { fontSize: "10px" } },
              tooltip: {
                formatter: function (this: any) {
                  // find label for point
                  const idx = this.point.x + this.point.y * cols;
                  const label = heatmapData[idx] ? heatmapData[idx].name : "";
                  return `${label}: <b>₹ ${this.point.value}k</b>`;
                },
              },
            }}
          />

          <Flex mt={2} justify="center" gap={4} fontSize="12px" color={muted}>
            <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#22C55E" /> <Text>&lt; {min.toFixed(1)}k</Text></Flex>
            <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#FACC15" /> <Text>{min.toFixed(1)} - {max.toFixed(1)}k</Text></Flex>
            <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#EF4444" /> <Text>&gt; {max.toFixed(1)}k</Text></Flex>
          </Flex>
        </div>
      </Box>
    </GraphLayout>
  );
};

export default RevenueHeatmap;