import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Info icon removed

import { useState, useRef, useEffect } from "react";
import Highcharts from "highcharts";
import UseIrradianceToRevenueConversion from "../../../../../Services/Hooks/Catalog/RevenueIntelligence/UseIrradianceToRevenueConversion";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import LineChart from "../../../charts/LineChart";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
// import DateFormatter from "../DateFormatter";

interface Props { type?: "plant" | "portfolio" }

const IrradianceToRevenueConversion = ({ type }: Props) => {
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

  const options: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 240,
      spacingTop: 20,
    },

    title: {
      text: "₹ Earned per kWh/m²",
      style: {
        color: titleColor,
        fontSize: "13px",
        fontWeight: "600",
      },
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: false,
    },

    xAxis: {
      categories: [],
      labels: {
        style: {
          color: muted,
        },
      },
      gridLineColor: "rgba(255,255,255,0.08)",
    },

    yAxis: {
      title: {
        text: "₹ / (kWh/m²)",
        style: {
          color: muted,
        },
      },
      min: 0,
      max: 2.5,
      tickInterval: 0.5,
      labels: {
        style: {
          color: muted,
        },
      },
      gridLineColor: "rgba(255,255,255,0.08)",
    },

    tooltip: {
      valueDecimals: 2,
      valuePrefix: "₹ ",
    },

    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 3,
          fillColor: "#22C55E",
        },
      },
    },

    series: [],
  };

  const [exportFunctions, setExportFunctions] = useState<{
    exportPNG: () => void;
    exportCSV: () => void;
  } | null>(null);

  const [apiData, setApiData] = useState<any[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dateRight, setDateRight] = useState(300);
  const [currentStartTs, setCurrentStartTs] = useState<number | undefined>(undefined);

  const {
  timeWindow: timeWindowIrradianceRevenue,
} = useTimeHandle(
  7,
  "day",
  "AVG",
  [60, "minute"],
  1000
);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      if (width > 1200) setDateRight(860);
      else setDateRight(200);
    });

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const searchTag = [
  {
    devName: "wms",
    keys: "Cum_POA_Kwhm2",
    type: ["spline"],
    name: ["Irradiance"],
  },
  {
    devName: "calculation",
    keys: "PV_Daily_Energy_Today",
    type: ["column"],
    name: ["PV Daily Energy"],
  },
];

  const { data, fetchIrradianceToRevenueConversion } =
    UseIrradianceToRevenueConversion(
      searchTag,
      timeWindowIrradianceRevenue,
      type
    );

  useEffect(() => {
    fetchIrradianceToRevenueConversion();
  }, [timeWindowIrradianceRevenue, type]);

  useEffect(() => {
    if (!data) return;

    try {
      setApiData(data || []);
    } catch (error) {
      console.error("Irradiance To Revenue Error", error);
      setApiData([]);
    }
  }, [data]);

  return (
    <GraphLayout
      title="IRRADIANCE TO REVENUE CONVERSION"
      titleFontSize="14px"
      width={["370px"]}
      height="323px"
      fullScreen={true}
      onExport={exportFunctions}
      timeWindow={false}
      WidgetProps={{ mt: 0 }}
    >
      <div ref={wrapperRef} style={{ position: 'relative', height: '100%' }}>
        {/* <DateFormatter
          right={dateRight}
          currentStartTs={currentStartTs}
          onDateChange={(start, end) => {
            setCurrentStartTs(new Date(start).getTime());
          }}
        /> */}

        <Flex justify="space-between" align="center" mb={2} />

        <LineChart
          height={250}
          apiData={apiData}
          onExportReady={setExportFunctions}
          props={{
            xAxis: {
              type: "datetime",
              labels: {
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
                  return Highcharts.dateFormat("%H:%M", this.value as number);
                },
              },
              gridLineWidth: 1,
              gridLineColor: "rgba(255,255,255,0.08)",
            },
            tooltip: {
              xDateFormat: "%H:%M",
            },
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default IrradianceToRevenueConversion;