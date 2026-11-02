import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import React, { useEffect, useState } from "react";
import UsePortfolioBenchmarkRadar from "../../../../../Services/Hooks/Catalog/RevenueIntelligence/UsePortfolioBenchmarkRadar";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

HighchartsMore(Highcharts);

interface Props { type?: "plant" | "portfolio" }

const PortfolioBenchmarkRadar = ({ type }: Props) => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#718096",
    "#AFC4E8"
  );

  const [seriesData, setSeriesData] = useState<any[]>([]);
  const [xCategories, setXCategories] = useState<string[]>([
    "PR",
    "CUF",
    "Availability",
    "Revenue / MW",
    "Specific Yield",
    "Alarm Rate",
    "MTBF",
    "Forecast Accuracy",
  ]);

  const {
    timeWindow: timeWindowPortfolioRadar,
  } = useTimeHandle(
    24,
    "hour",
    "AVG",
    [5, "minute"],
    1000
  );

  const searchTag = {
    devName: "Inverter",
    keys: "pr,cuf,availability,revenue_per_mw,specific_yield,alarm_rate,mtbf,forecast_accuracy",
  };
  

  const { data, fetchPortfolioBenchmarkRadar } =
    UsePortfolioBenchmarkRadar(searchTag, timeWindowPortfolioRadar, type);

  useEffect(() => {
    fetchPortfolioBenchmarkRadar();
  }, [timeWindowPortfolioRadar, type]);

  useEffect(() => {
    if (!data) return;

    const responseData = data?.data || [];

    if (responseData.length) {
      const metricKeys = Object.keys(responseData[0]).filter(
        (k) => k !== "assetName" && k !== "lastUpdateTime"
      );

      setXCategories(metricKeys);

      const formattedSeries = responseData.map((item: any) => ({
        type: "line",
        name: item.assetName,
        pointPlacement: "on",
        data: metricKeys.map((k) => Number(item[k] || 0)),
      }));

      setSeriesData(formattedSeries);
    } else {
      setSeriesData([]);
    }
  }, [data]);

  const options: Highcharts.Options = {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: "transparent",
      height: 250,
      spacingTop: 10,
    },
    exporting: { enabled: false },

    title: {
      text: undefined,
    },

    credits: {
      enabled: false,
    },

    pane: {
      size: "70%",
    },

    xAxis: {
      categories: xCategories,
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          color: muted,
          fontSize: "10px",
        },
      },
    },

    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      labels: {
        style: {
          color: muted,
          fontSize: "9px",
        },
      },
    },

    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "top",
      y: 10,
      itemStyle: {
        color: titleColor,
        fontSize: "10px",
      },
      itemDistance: 15,
      navigation: {
        enabled: true,
        activeColor: "#2563EB",
        inactiveColor: "#BDBDBD",
        arrowSize: 12,
      },
      maxHeight: 45,
    },

    tooltip: {
      shared: true,
    },

    series: seriesData,
  };

  return (
    <Box
      bg={cardBg}
      border={border}
      borderRadius="10px"
      p={3}
      h="320px"
    >
      <Flex
        justify="space-between"
        align="center"
        mb={2}
      >
        <Flex align="center" gap={2}>
          <Box
            w="18px"
            h="18px"
            borderRadius="full"
            bg="#2563EB"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              color="white"
              fontSize="10px"
              fontWeight="700"
            >
              7
            </Text>
          </Box>

          <Text
            color={titleColor}
            fontSize="12px"
            fontWeight="700"
          >
            PORTFOLIO BENCHMARK RADAR
          </Text>
        </Flex>
      </Flex>

      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </Box>
  );
};

export default PortfolioBenchmarkRadar;