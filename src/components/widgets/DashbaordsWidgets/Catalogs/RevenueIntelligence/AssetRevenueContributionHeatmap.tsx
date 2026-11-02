import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UseAssetRevenueHeatmap from "../../../../../Services/Hooks/Catalog/RevenueIntelligence/UseAssetRevenueHeatmap";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import HeatmapChart from "../../../charts/HeatmapChart";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";

interface AssetData {
  name: string;
  value: string;
  color: string;
  revenueNumber: number;
}

interface Props {
  type: "plant" | "portfolio";
}

const getShortAssetName = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length < 3) return name;
  const capacity = parts.slice(-2).join(" ");
  const words = parts.slice(0, -2);
  const initials = words.map((w) => w.charAt(0).toUpperCase()).join("");
  return `${initials} ${capacity}`;
};

const AssetRevenueContributionHeatmap = ({ type }: Props) => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const cardBorder = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue("#1A202C", "#FFFFFF");

  const muted = useColorModeValue("#4A5568", "#D6E4FF");

  const [assets, setAssets] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    timeWindow: timeWindowAssetRevenue,
  } = useTimeHandle(
    24,
    "hour",
    "NONE",
    [5, "minute"],
    1000
  );

  const searchTag = {
  Inverter: "revenue",
};

  const { data, fetchAssetRevenueHeatmap } = UseAssetRevenueHeatmap(
    searchTag,
    timeWindowAssetRevenue,
    type
  );

  const getColor = (value: number) => {
    if (value >= 20000) return "#4CAF50";
    if (value >= 17000) return "#43A047";
    if (value >= 15000) return "#689F38";
    if (value >= 13000) return "#D2691E";
    return "#C62828";
  };

  useEffect(() => {
    setLoading(true);
    fetchAssetRevenueHeatmap();
  }, [timeWindowAssetRevenue, type]);

  useEffect(() => {
    if (!data) return;

    try {
      const responseData = data?.data || [];
      const formattedData: AssetData[] = responseData.map((item: any) => ({
        name:
          type === "portfolio"
            ? getShortAssetName(item.assetName)
            : item.assetName,
        value: `₹${(Number(item.revenue || 0) / 1000).toFixed(1)}k`,
        color: getColor(Number(item.revenue || 0)),
        revenueNumber: Number(item.revenue || 0),
      }));
      setAssets(formattedData);
    } catch (error) {
      console.error(error);
      setAssets([]);
    } finally {
      setLoading(false);
    }
  }, [data]);

  const columns = 4;
  const assetMap: Record<
    string,
    {
      name: string;
      revenue: string;
    }
  > = {};
  const heatmapData: [number, number, number][] = [];

  assets.forEach((asset, index) => {
    const x = index % columns;
    const y = Math.floor(index / columns);

    assetMap[`${x}-${y}`] = {
      name: asset.name,
      revenue: asset.value,
    };

    heatmapData.push([x, y, asset.revenueNumber]);
  });

  const rowCount = Math.ceil(assets.length / columns);
  const chartHeight = Math.min(Math.max(rowCount * 55, 55), 200);
  const xCategories = Array.from({ length: columns }, (_, i) => `${i}`);
  const yCategories = Array.from({ length: rowCount }, (_, i) => `Row ${i + 1}`);

  return (
    <GraphLayout
      title="ASSET REVENUE CONTRIBUTION HEATMAP"
      titleFontSize="14px"
      width={["100%"]}
      height="320px"
      fullScreen={true}
      timeWindow={false}
      WidgetProps={{ mt: 0 }}
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        minH="240px"
        pt={1}
      >
        <Box flex={1} overflow="hidden">
          {loading ? (
            <Flex
              h="220px"
              align="center"
              justify="center"
            >
              <Text color={muted}>
                Loading...
              </Text>
            </Flex>
          ) : (
            <HeatmapChart
              height={chartHeight}
              onExportReady={() => {}}
              apiData={
                assets.length
                  ? [
                      {
                        borderWidth: 2,
                        borderColor: "#ffffff",
                        data: heatmapData,
                        colsize: 1,
                        rowsize: 1,
                        dataLabels: {
                          enabled: true,
                          useHTML: true,
                          formatter: function (this: any) {
                            const item = assetMap[`${this.point.x}-${this.point.y}`];
                            if (!item) return "";
                            return `
          <div
            style="
              color:white;
              text-align:left;
              padding:2px;
              line-height:1.2;
            "
          >
            <div
              style="
                font-size:10px;
                font-weight:700;
              "
            >
              ${item.name}
            </div>
            <div
              style="
                font-size:11px;
                font-weight:600;
              "
            >
              ${item.revenue}
            </div>
          </div>
          `;
                          },
                        },
                      },
                    ]
                  : []
              }
              props={{
                chart: {
                  marginTop: 10,
                  marginBottom: 10,
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
                  reversed: true,
                  labels: {
                    enabled: false,
                  },
                  title: {
                    text: null,
                  },
                  lineWidth: 0,
                  tickLength: 0,
                  gridLineWidth: 0,
                },
                legend: {
                  enabled: false,
                },
                colorAxis: {
                  min: Math.min(...assets.map((a) => a.revenueNumber)),
                  max: Math.max(...assets.map((a) => a.revenueNumber)),
                  stops: [
                    [0, "#DC2626"],
                    [0.35, "#F97316"],
                    [0.7, "#84CC16"],
                    [1, "#16A34A"],
                  ],
                },
                tooltip: {
                  formatter: function (this: any) {
                    const item = assetMap[`${this.point.x}-${this.point.y}`];
                    return `
          <b>${item.name}</b><br/>
          Revenue : ${item.revenue}
        `;
                  },
                },
              }}
            />
          )}
        </Box>

        <Box mt="auto">
          <Text
            color={muted}
            fontSize="10px"
            mb={1}
          >
            Revenue Contribution (%)
          </Text>

          <Flex align="center" gap={2}>
            <Text
              fontSize="9px"
              color={muted}
              minW="20px"
            >
              Low
            </Text>

            <Box
              flex={1}
              h="6px"
              borderRadius="full"
              bg="linear-gradient(90deg,#16A34A,#F59E0B,#DC2626)"
            />

            <Text
              fontSize="9px"
              color={muted}
              minW="24px"
              textAlign="right"
            >
              High
            </Text>
          </Flex>
        </Box>
      </Box>
    </GraphLayout>
  );
};

export default AssetRevenueContributionHeatmap;