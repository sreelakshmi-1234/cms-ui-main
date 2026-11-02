import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import UseCapacityUtilizationHeatmap from "../../../../../Services/Hooks/Catalog/RevenueIntelligence/UseCapacityUtilizationHeatmap";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import HeatmapChart from "../../../charts/HeatmapChart";

interface Props {
  type: "plant" | "portfolio";
}

const CapacityUtilizationMap = ({ type }: Props) => {
  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#718096",
    "#AFC4E8"
  );

  const [exportFunctions, setExportFunctions] = useState<{
    exportPNG: () => void;
    exportCSV: () => void;
  } | null>(null);

  const [heatmapData, setHeatmapData] = useState<any | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dateRight, setDateRight] = useState(300);

  const {
    timeWindow: timeWindowCapacity,
  } = useTimeHandle(
    24,
    "hour",
    "SUM",
    [5, "minute"],
    1000
  );

  const searchTag = {
    Inverter: "revenue",
  };

  const { data, fetchCapacityUtilizationHeatmap } = UseCapacityUtilizationHeatmap(
    searchTag,
    timeWindowCapacity,
    type
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width > 1200) setDateRight(860);
      else setDateRight(200);
    });

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  const yCategories = ["Assets"];

  useEffect(() => {
    fetchCapacityUtilizationHeatmap();
  }, [timeWindowCapacity, type]);

  useEffect(() => {
    if (!data) return;

    try {
      const responseData = data?.data || [];
      const heatmapSeries = [
        {
          borderWidth: 1,
          borderColor: "#031B44",
          data: responseData.map((item: any, index: number) => [
            index,
            0,
            Number(item.revenue || 0),
          ]),
          colsize: 1,
          rowsize: 1,
          dataLabels: { enabled: false },
        },
      ];

      const categories =
        responseData.length && responseData[0].assetName
          ? responseData.map((item: any) => item.assetName)
          : responseData.map((_: any, i: number) => `INV-${i + 1}`);

      setHeatmapData({
        series: heatmapSeries,
        xAxisCategories: categories,
        yAxisCategories: yCategories,
        lastUpdateTime: data?.lastUpdateTime,
      });
    } catch (error) {
      console.error(error);
    }
  }, [data]);

  return (
    <GraphLayout
      title="CAPACITY UTILIZATION MAP"
      titleFontSize="14px"
      width={["370px"]}
      height="323px"
      fullScreen={true}
      onExport={exportFunctions}
      timeWindow={false}
      WidgetProps={{ mt: 0 }}
      initTimeTitle={heatmapData?"Last Update: " + new Date(new Date(parseInt(heatmapData.lastUpdateTime)).setMinutes(0, 0, 0)).toLocaleString() : ""}
    >
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <Flex justify="space-between" align="center" mb={2} />

        {heatmapData && heatmapData.series && (
          <HeatmapChart
            height={205}
            apiData={heatmapData.series || [{}]}
            onExportReady={setExportFunctions}
            props={{
              chart: {
                marginTop: 20,
              },

              xAxis: {
                categories: heatmapData.xAxisCategories,
                labels: {
                  enabled: false,
                },
                lineWidth: 0,
                tickLength: 0,
                gridLineWidth: 0,
              },

              yAxis: {
                categories: heatmapData.yAxisCategories,
                labels: {
                  enabled: false,
                },
                title: {
                  text: null,
                },
                gridLineWidth: 0,
              },

              colorAxis: {
                min: 50,
                max: 100,

                stops: [
                  [0, "#EF4444"],
                  [0.55, "#FACC15"],
                  [1, "#22C55E"],
                ],
              },

              legend: {
                enabled: true,
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
                itemStyle: {
                  fontSize: "10px",
                },
              },

              tooltip: {
                formatter: function (this: any) {
                  return `Revenue : <b>₹ ${this.point.value}</b>`;
                },
              },
            }}
          />
        )}

        <Flex
          mt={1}
          justify="center"
          gap={5}
          fontSize="10px"
          color={muted}
        >
          <Flex align="center" gap={1}>
            <Box
              w="10px"
              h="10px"
              bg="#EF4444"
            />
            <Text>{"< 80%"}</Text>
          </Flex>

          <Flex align="center" gap={1}>
            <Box
              w="10px"
              h="10px"
              bg="#FACC15"
            />
            <Text>80 - 95%</Text>
          </Flex>

          <Flex align="center" gap={1}>
            <Box
              w="10px"
              h="10px"
              bg="#22C55E"
            />
            <Text>{"> 95%"}</Text>
          </Flex>
        </Flex>
      </div>
    </GraphLayout>
  );
};

export default CapacityUtilizationMap;