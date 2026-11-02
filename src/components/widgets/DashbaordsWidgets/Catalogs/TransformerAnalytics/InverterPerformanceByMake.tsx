import { useRef, useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";

interface Props {
  height?: string | number;
}

const InverterPerformanceByMake = ({
  height = "240px",
}: Props) => {
  // compute internal chart height from widget height (leave padding room)
  const chartHeight = (() => {
    if (typeof height === 'number') return Math.max(120, height - 60);
    const m = typeof height === 'string' && height.match(/^(\d+)px$/);
    if (m) return Math.max(120, parseInt(m[1], 10) - 60);
    return 150;
  })();
  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const BUTTON_SHIFT = 10;
    let attempts = 0;
    let mounted = true;

    const shiftOnce = () => {
      if (!mounted) return false;

      const root = wrapperRef.current;
      if (!root) return false;

      const texts = Array.from(
        root.querySelectorAll("text")
      ) as SVGTextElement[];

      let found = false;

      texts.forEach((t) => {
        const txt = (t.textContent || "").trim();

        if (txt === "Show all" || txt === "Hide all") {
          const g = t.closest("g");

          if (g) {
            const existing =
              g.getAttribute("transform") || "";

            if (
              !existing.includes(
                `translate(0,${BUTTON_SHIFT})`
              )
            ) {
              g.setAttribute(
                "transform",
                `translate(0,${BUTTON_SHIFT}) ${existing}`.trim()
              );
            }

            found = true;
          }
        }
      });

      return found;
    };

    const tryShift = () => {
      attempts++;

      const ok = shiftOnce();

      if (!ok && attempts < 8) {
        setTimeout(tryShift, 300);
      }
    };

    tryShift();

    const onResize = () => tryShift();

    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      window.removeEventListener(
        "resize",
        onResize
      );
    };
  }, []);

  const {
    handleTimeWindowChange,
    handleReset,
  } = useTimeHandle(
    7,
    "day",
    "NONE",
    [5, "minute"]
  );

  const bars = [
    {
      name: "Sungrow",
      efficiency: 99.5,
      availability: 98.0,
    },
    {
      name: "Huawei",
      efficiency: 98.8,
      availability: 97.5,
    },
    {
      name: "Growatt",
      efficiency: 98.4,
      availability: 97.2,
    },
    {
      name: "SMA",
      efficiency: 98.9,
      availability: 97.8,
    },
    {
      name: "Sineng",
      efficiency: 98.2,
      availability: 97.1,
    },
    {
      name: "Delta",
      efficiency: 98.6,
      availability: 97.6,
    },
    {
      name: "Ingeteam",
      efficiency: 98.8,
      availability: 97.9,
    },
    {
      name: "Others",
      efficiency: 98.3,
      availability: 97.4,
    },
  ];

  const apiData = [
    {
      name: "Efficiency (%)",
      data: bars.map(
        (item) => item.efficiency
      ),
      color: "#3B82F6",
      unit: "%",
    },
    {
      name: "Availability (%)",
      data: bars.map(
        (item) => item.availability
      ),
      color: "#22C55E",
      unit: "%",
    },
  ];

  const categories = bars.map(
    (item) => item.name
  );

  return (
    <GraphLayout
      title="INVERTER PERFORMANCE BY MAKE"
      titleFontSize="11px"
      titleLengthSVG={250}
      titleLengthLongSVG={350}
      width={["100%", "100%"]}
      height="245px"
      timeWindow={true}
      onTimeWindowChange={
        handleTimeWindowChange
      }
      onReset={handleReset}
      fullScreen={true}
      onExport={exportFunctions}
      WidgetProps={{ mt: 0 }}
    >
      <div
        ref={wrapperRef}
        style={{ height: "100%" }}
      >
        <ColumnChart
          height={chartHeight}
          apiData={apiData}
          category={categories}
          onExportReady={setExportFunctions}
          props={{
            chart: { backgroundColor: "transparent" },
            legend: { enabled: true, align: "center" },
            xAxis: { labels: { style: { fontSize: "10px" }, rotation: 0 } },
            yAxis: { min: 92, max: 100, title: { text: "" } },
            plotOptions: { column: { pointPadding: 0.15, groupPadding: 0.12 } },
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default InverterPerformanceByMake;