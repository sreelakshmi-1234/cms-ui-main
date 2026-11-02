import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import HeatmapChart from "../../../charts/HeatmapChart";

const StringLevelOutlierDetection = () => {
  const muted = useColorModeValue(
    "#718096",
    "#AFC4E8"
  );

  const [exportFunctions, setExportFunctions] = useState<{
    exportPNG: () => void;
    exportCSV: () => void;
  } | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => { });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const heatmapData: [number, number, number][] = [];

  const rows = 14;
  const cols = 28;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let value = 0;

      const rnd = Math.random();

      if (
        (x >= 5 && x <= 7 && y >= 2 && y <= 5) ||
        (x >= 22 && x <= 24 && y >= 8 && y <= 11)
      ) {
        value = -25;
      } else if (
        (x >= 10 && x <= 12) ||
        (x >= 17 && x <= 18)
      ) {
        value = -15;
      } else if (
        (x >= 2 && x <= 3) ||
        (x >= 14 && x <= 15) ||
        (x >= 25 && x <= 26)
      ) {
        value = -8;
      } else {
        value = 5;
      }

      if (rnd > 0.985) value = -25;
      else if (rnd > 0.96) value = -15;
      else if (rnd > 0.90) value = -8;

      heatmapData.push([x, y, value]);
    }
  }

  const apiData = [
    {
      borderWidth: 1,
      borderColor: "#031B44",
      data: heatmapData,
      colsize: 1,
      rowsize: 1,
      dataLabels: {
        enabled: false,
      },
    },
  ];

  const xCategories = Array.from(
    { length: cols },
    (_, i) => `${i + 1}`
  );

  const yCategories = Array.from(
    { length: rows },
    (_, i) => `S${i + 1}`
  );

  return (
    <GraphLayout
      title="STRING LEVEL OUTLIER DETECTION"
      titleFontSize="14px"
      width={["1125px"]}
      height="323px"
      fullScreen={true}
      onExport={exportFunctions}
      timeWindow={false}
      WidgetProps={{ mt: 0 }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <Flex justify="space-between" align="center" mb={2} />

        <Flex
          justify="space-between"
          align="flex-start"
          gap={3}
        >
          <Box flex={1}>
            <HeatmapChart
              height={205}
              apiData={apiData}
              onExportReady={setExportFunctions}
              props={{
                chart: {
                  marginTop: 10,
                  marginRight: 5,
                },

                xAxis: {
                  categories: xCategories,
                  labels: {
                    enabled: false,
                  },
                  lineWidth: 0,
                  tickLength: 0,
                  gridLineWidth: 0,
                },

                yAxis: {
                  categories: yCategories,
                  labels: {
                    enabled: false,
                  },
                  title: {
                    text: null,
                  },
                  gridLineWidth: 0,
                },

                colorAxis: {
                  min: -30,
                  max: 20,

                  stops: [
                    [0, "#EF4444"],
                    [0.25, "#F97316"],
                    [0.5, "#FACC15"],
                    [1, "#22C55E"],
                  ],
                },

                legend: {
                  enabled: false,
                },

                tooltip: {
                  formatter: function (this: any) {
                    return `
                      String Deviation :
                      <b>${this.point.value}%</b>
                    `;
                  },
                },
              }}
            />
          </Box>

          <VStack
            align="start"
            spacing={2}
            minW="85px"
            pt={2}
          >
            <Text
              fontSize="11px"
              fontWeight="600"
              color={muted}
            >
              Deviation (%)
            </Text>

            <Flex align="center" gap={2}>
              <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg="#EF4444"
              />
              <Text fontSize="10px" color={muted}>
                &lt; -20%
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg="#F97316"
              />
              <Text fontSize="10px" color={muted}>
                -20% to -10%
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg="#FACC15"
              />
              <Text fontSize="10px" color={muted}>
                -10% to +10%
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg="#22C55E"
              />
              <Text fontSize="10px" color={muted}>
                +10% to +20%
              </Text>
            </Flex>

            <Box pt={3}>
              <Text
                fontSize="10px"
                color={muted}
                textAlign="center"
                lineHeight="12px"
              >
                N
              </Text>

              <Text
                fontSize="12px"
                color={muted}
                textAlign="center"
                lineHeight="12px"
              >
                ▲
              </Text>
            </Box>
          </VStack>
        </Flex>
      </div>
    </GraphLayout>
  );
};

export default StringLevelOutlierDetection;