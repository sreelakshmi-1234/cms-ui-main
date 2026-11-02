import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import HeatmapChart from "../../../charts/HeatmapChart";

const RevenueContributionByAsset = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [exportFunctions, setExportFunctions] = useState<any>(null);

  const muted = useColorModeValue("#4A5568", "#AFC4E8");
  const borderColor = useColorModeValue("#ffffff", "#031B44");
  const legendColor = useColorModeValue("#0F172A", "#FFFFFF");

  const assetMap: Record<
    string,
    {
      name: string;
      revenue: string;
      contribution: string;
    }
  > = {
    "0-0": {
      name: "INV-07",
      revenue: "₹ 4.8 Lakh",
      contribution: "9.1%",
    },
    "1-0": {
      name: "INV-12",
      revenue: "₹ 4.5 Lakh",
      contribution: "8.5%",
    },
    "2-0": {
      name: "INV-03",
      revenue: "₹ 4.2 Lakh",
      contribution: "8.0%",
    },
    "3-0": {
      name: "INV-08",
      revenue: "₹ 3.6 Lakh",
      contribution: "6.8%",
    },
    "4-0": {
      name: "INV-01",
      revenue: "₹ 3.2 Lakh",
      contribution: "6.1%",
    },

    "0-1": {
      name: "INV-05",
      revenue: "₹ 3.1 Lakh",
      contribution: "5.9%",
    },
    "1-1": {
      name: "INV-11",
      revenue: "₹ 2.9 Lakh",
      contribution: "5.4%",
    },
    "2-1": {
      name: "INV-02",
      revenue: "₹ 2.7 Lakh",
      contribution: "5.1%",
    },
    "3-1": {
      name: "INV-15",
      revenue: "₹ 2.5 Lakh",
      contribution: "4.7%",
    },
    "4-1": {
      name: "INV-09",
      revenue: "₹ 2.3 Lakh",
      contribution: "4.4%",
    },
  };

  const xCategories = [
    "INV-07",
    "INV-12",
    "INV-03",
    "INV-08",
    "INV-01",
  ];

  const yCategories = [
    "Row 1",
    "Row 2",
  ];

  const heatmapData: [number, number, number][] = [
    [0, 0, 9.1],
    [1, 0, 8.5],
    [2, 0, 8.0],
    [3, 0, 6.8],
    [4, 0, 6.1],

    [0, 1, 5.9],
    [1, 1, 5.4],
    [2, 1, 5.1],
    [3, 1, 4.7],
    [4, 1, 4.4],
  ];

  const apiData = [
    {
      borderWidth: 2,
      borderColor,
      data: heatmapData,
      colsize: 1,
      rowsize: 1,

      dataLabels: {
        enabled: true,
        useHTML: true,

        formatter: function (this: any) {
          const key = `${this.point.x}-${this.point.y}`;
          const item = assetMap[key];

          if (!item) return "";

          return `
            <div
              style="
                width:100%;
                height:100%;
                text-align:left;
                color:white;
                padding:2px;
                line-height:1.2;
              "
            >
              <div
                style="
                  font-size:9px;
                  font-weight:700;
                  margin-bottom:2px;
                "
              >
                ${item.name}
              </div>

              <div
                style="
                  font-size:10px;
                  margin-bottom:2px;
                "
              >
                ${item.revenue}
              </div>

              <div
                style="
                  font-size:9px;
                  opacity:0.9;
                "
              >
                ${item.contribution}
              </div>
            </div>
          `;
        },
      },
    },
  ];

  return (
    <GraphLayout
      title="REVENUE CONTRIBUTION BY ASSET (Top 10)"
      titleFontSize="12px"
      width={["100%"]}
      height="260px"
      fullScreen={false}
      onExport={exportFunctions}
      WidgetProps={{ p: 2, mt: 0 }}
    >
      <div
        ref={wrapperRef}
        style={{
          height: "100%",
        }}
      >
        <HeatmapChart
          height={180}
          apiData={apiData}
          onExportReady={setExportFunctions}
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

            colorAxis: {
              min: 4,
              max: 10,
              stops: [
                [0, "#D97706"],
                [0.5, "#4B8B4B"],
                [1, "#2E7D32"],
              ],
            },

            legend: {
              enabled: false,
            },

            tooltip: {
              formatter: function (this: any) {
                const key = `${this.point.x}-${this.point.y}`;
                const item = assetMap[key];

                return `
                  <b>${item.name}</b><br/>
                  Revenue: ${item.revenue}<br/>
                  Contribution: ${item.contribution}
                `;
              },
            },
          }}
        />

        <Flex
          mt={2}
          align="center"
          gap={2}
        >
          <Text
            fontSize="9px"
            color={muted}
            whiteSpace="nowrap"
          >
            Low Contribution
          </Text>

          <Box
            flex={1}
            h="6px"
            borderRadius="999px"
            bg="linear-gradient(90deg,#2E7D32,#F59E0B,#DC2626)"
          />

          <Text
            fontSize="9px"
            color={muted}
            whiteSpace="nowrap"
          >
            High Contribution
          </Text>
        </Flex>
      </div>
    </GraphLayout>
  );
};

export default RevenueContributionByAsset;