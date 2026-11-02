import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

interface WidgetProps { height?: string | number }

const TransformerHealthTrend = ({ height = "290px" }: WidgetProps) => {
  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const cardBg = useColorModeValue("#ffffff", "#031B44");
  const border = useColorModeValue("1px solid rgba(0,0,0,0.08)", "1px solid #0A4D9B");
  const titleColor = useColorModeValue("#062D59", "#FFFFFF");

  const categories = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ];

  const apiData = [
    {
      type: "spline",
      name: "Health Score",
      color: "#22c55e",
      lineWidth: 3,
      data: [62, 65, 64, 66, 78, 82, 75, 80, 79, 77, 76],
    },
  ];

  return (
    <GraphLayout
      title="TRANSFORMER HEALTH SCORE TREND"
      titleFontSize="12px"
      width={["370px"]}
      height="290px"
      fullScreen={true}
      timeWindow={false}
      onExport={exportFunctions}
      WidgetProps={{ mt: 0 }}
    >
      <div
        ref={wrapperRef}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LineChart
          height={200}
          apiData={apiData}
          onExportReady={setExportFunctions}
          props={{
            chart: { backgroundColor: "transparent" },
            legend: { enabled: false },
            xAxis: { categories, gridLineWidth: 1, gridLineColor: "rgba(255,255,255,0.04)" },
            yAxis: { min: 0, max: 100, title: { text: "" } },
            tooltip: { shared: true },
            plotOptions: { series: { marker: { enabled: false } } },
          }}
        />

        <Flex mt={3} align="center" justify="center" gap={4}>
          {apiData.map((s: any) => (
            <Flex key={s.name} align="center" gap={2}>
              <Box w="10px" h="10px" borderRadius="2px" bg={s.color} />
              <Text color={titleColor} fontSize="12px">{s.name}</Text>
            </Flex>
          ))}
        </Flex>
      </div>
    </GraphLayout>
  );
};

export default TransformerHealthTrend;