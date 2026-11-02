import {
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react";

import LineChart from "../../../charts/LineChart";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";

import UseSunriseToSunsetEnergy from "../../../../../Services/Hooks/Catalog/RevenueIntelligence/UseSunriseToSunsetEnergy";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

interface Props {
  type?: "plant" | "portfolio";
}

const SunriseToSunsetEnergySignature = ({
  type = "plant",
}: Props) => {
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

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [dateRight, setDateRight] = useState(300);

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
    devName: "Inverter",
    keys: "revenue",
  };

  const {
    data,
    fetchSunriseToSunsetEnergy,
  } = UseSunriseToSunsetEnergy(
    searchTag,
    timeWindow,
    type
  );

  useEffect(() => {
    fetchSunriseToSunsetEnergy();
  }, [timeWindow, type]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width > 1200) {
        setDateRight(860);
      } else {
        setDateRight(200);
      }
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = data?.categories || [];

  const apiData =
    data?.data?.map((series: any, index: number) => ({
      type: "line",
      name: series.name,
      data: series.data,
      unit: "%",

      color:
        index === 0
          ? "#22C55E"
          : index === 1
          ? "#FFFFFF"
          : index === 2
          ? "#2EA8FF"
          : "#FACC15",

      dashStyle:
        index === 1 || index === 3
          ? "Dash"
          : "Solid",
    })) || [];
      return (
    <GraphLayout
      title="SUNRISE TO SUNSET ENERGY SIGNATURE"
      titleFontSize="14px"
      width={["370px"]}
      height="323px"
      fullScreen={true}
      onExport={exportFunctions}
      timeWindow={false}
      WidgetProps={{ mt: 0, ml: "-120px" }}
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
          position: "relative",
          height: "100%",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          mb={2}
        />

        <LineChart
          height={250}
          apiData={apiData}
          onExportReady={setExportFunctions}
          props={{
            yAxis: {
              min: 0,
              max: 100,
              tickInterval: 20,
              title: {
                text: "",
              },
            },

            xAxis: {
              categories,
              gridLineWidth: 1,
              gridLineColor: "rgba(255,255,255,0.08)",
            },

            legend: {
              enabled: true,
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },

            tooltip: {
              shared: true,
            },
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default SunriseToSunsetEnergySignature;