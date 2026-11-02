import {
  Box,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

import UsePlantPerformanceBenchmark from "../../../../../Services/Hooks/Catalog/AssetOptimization/UsePlantPerformanceBenchmark";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

interface Props {
  type?: "plant" | "portfolio";
}

const PlantPerformanceBenchmark = ({
  type = "plant",
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const titleColor = useColorModeValue(
    "#0F172A",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#4A5568",
    "#AFC4E8"
  );

  const {
    timeWindow,
  } = useTimeHandle(
    7,
    "day",
    "AVG",
    [60, "minute"],
    1000
  );

  const searchTag = {
    devName: "calculation",
    keys: "pr_percent",
  };

  const {
    data,
    fetchPlantPerformanceBenchmark,
  } = UsePlantPerformanceBenchmark(
    searchTag,
    timeWindow,
    type
  );

  useEffect(() => {
    fetchPlantPerformanceBenchmark();
  }, [timeWindow, type]);

  const categories =
    data?.data?.map((item: any) => item.plantName) || [];

  const fleetAverage =
    data?.data?.length
      ? data.data.reduce(
          (sum: number, item: any) =>
            sum + Number(item.pr_percent || 0),
          0
        ) / data.data.length
      : 0;

  const apiData = [
    {
      type: "spline",
      name: "PR %",
      color: "#3B82F6",
      lineWidth: 2,
      data:
        data?.data?.map((item: any) =>
          Number(item.pr_percent || 0)
        ) || [],
    },
    {
      type: "spline",
      name: "Fleet Avg",
      color: "#94A3B8",
      dashStyle: "ShortDash",
      lineWidth: 2,
      data: categories.map(() => fleetAverage),
    },
  ];
    return (
    <GraphLayout
      title="PLANT PERFORMANCE BENCHMARK"
      titleFontSize="12px"
      width={["100%"]}
      height="260px"
      fullScreen={false}
      onExport={exportFunctions}
      timeWindow={false}
      WidgetProps={{ p: 3, mt: 0 }}
      initTimeTitle={
        data?.lastUpdateTime
          ? "Last Update: " +
            new Date(data.lastUpdateTime).toLocaleString()
          : ""
      }
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
          height={170}
          apiData={apiData}
          onExportReady={setExportFunctions}
          showHideButtons={false}
          props={{
            chart: {
              backgroundColor: "transparent",
            },

            legend: {
              enabled: false,
            },

            xAxis: {
              categories,
              labels: {
                style: {
                  color: muted,
                },
              },
            },

            yAxis: {
              min: 0,
              max: 100,
              tickInterval: 20,
              title: {
                text: "",
              },
              labels: {
                style: {
                  color: muted,
                },
              },
            },

            tooltip: {
              shared: true,
            },

            plotOptions: {
              series: {
                marker: {
                  enabled: false,
                },
              },
            },
          }}
        />

        <Flex
          mt={3}
          align="center"
          justify="center"
          gap={4}
        >
          {apiData.map((series: any) => (
            <Flex
              key={series.name}
              align="center"
              gap={2}
            >
              <Box
                w="10px"
                h="10px"
                borderRadius="2px"
                bg={series.color}
              />

              <Text
                color={titleColor}
                fontSize="12px"
              >
                {series.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </div>
    </GraphLayout>
  );
};

export default PlantPerformanceBenchmark;