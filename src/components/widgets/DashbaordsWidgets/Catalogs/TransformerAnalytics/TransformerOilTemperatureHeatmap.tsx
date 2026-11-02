import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import HeatmapChart from "../../../charts/HeatmapChart";

interface Props {
  height?: string | number;
}

const TransformerOilTemperatureHeatmap = ({
  height = "300px",
}: Props) => {
  const cardBg = useColorModeValue("#ffffff", "#031B44");
  const border = useColorModeValue("1px solid rgba(0,0,0,0.08)", "1px solid #0A4D9B");
  const titleColor = useColorModeValue("#062D59", "#FFFFFF");
  const muted = useColorModeValue("#718096", "#AFC4E8");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  // build heatmap data (6 rows x 7 cols)
  const rows = 6;
  const cols = 7;
  const heatmapData: [number, number, number][] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // simulate oil temp between 40 and 95
      const value = Math.round(40 + Math.random() * 55);
      heatmapData.push([x, y, value]);
    }
  }

  const apiData = [
    {
      borderWidth: 1,
      borderColor: useColorModeValue("#ffffff", "#031B44"),
      data: heatmapData,
      colsize: 1,
      rowsize: 1,
      dataLabels: { enabled: false },
    },
  ];

  const xCategories = Array.from({ length: cols }, (_, i) => `${i + 1}`);
  const yCategories = Array.from({ length: rows }, (_, i) => `R${i + 1}`);

  return (
    <GraphLayout
      title="OIL TEMPERATURE HEATMAP"
      titleFontSize="14px"
      width={["416px"]}
      height={typeof height === 'number' ? `${height}px` : height}
      fullScreen={true}
      onExport={exportFunctions}
      timeWindow={false}
      WidgetProps={{ mt: 0 }}
    >
      <div ref={wrapperRef} style={{ position: "relative", height: "100%" }}>
        <HeatmapChart
          height={260}
          apiData={apiData}
          onExportReady={setExportFunctions}
          props={{
            chart: { marginTop: 10 },
            xAxis: { categories: xCategories, labels: { enabled: false }, lineWidth: 0, tickLength: 0, gridLineWidth: 0 },
            yAxis: { categories: yCategories, labels: { enabled: false }, title: { text: null }, gridLineWidth: 0 },
            colorAxis: {
              min: 40,
              max: 95,
              stops: [
                [0, "#22C55E"],
                [0.5, "#FACC15"],
                [1, "#EF4444"],
              ],
            },
            legend: { enabled: true, align: "center", verticalAlign: "bottom", layout: "horizontal", itemStyle: { fontSize: "10px" } },
            tooltip: {
              formatter: function (this: any) {
                return `Oil Temp: <b>${this.point.value} °C</b>`;
              },
            },
          }}
        />

        <Flex mt={2} justify="center" gap={4} fontSize="12px" color={muted}>
          <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#22C55E" /> <Text>&lt; 60°C</Text></Flex>
          <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#FACC15" /> <Text>60 - 80°C</Text></Flex>
          <Flex align="center" gap={1}><Box w="10px" h="10px" bg="#EF4444" /> <Text>&gt; 80°C</Text></Flex>
        </Flex>
      </div>
    </GraphLayout>
  );
};

export default TransformerOilTemperatureHeatmap;