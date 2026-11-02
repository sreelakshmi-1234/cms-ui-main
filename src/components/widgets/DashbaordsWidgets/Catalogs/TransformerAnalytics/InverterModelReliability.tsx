import { useRef, useState, useEffect } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import StackedColumnChart from "../../../charts/StackedColumnChart";

interface Props {
  height?: string | number;
}

const InverterModelReliability = ({
  height = "290px",
}: Props) => {
  const [exportFunctions, setExportFunctions] =
    useState<any>(null);

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

        if (
          txt === "Show all" ||
          txt === "Hide all"
        ) {
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

    window.addEventListener(
      "resize",
      onResize
    );

    return () => {
      mounted = false;
      window.removeEventListener(
        "resize",
        onResize
      );
    };
  }, []);

  const apiData = [
    {
      name: "MTBF (hrs)",
      data: [
        1280,
        1150,
        980,
        920,
        880,
        810,
        760,
      ],
      color: "#3B82F6",
      unit: "hrs",
    },
  ];

  const categories = [
    "SG250HX",
    "SUN2000",
    "MAX125",
    "STP125",
    "SP110K3",
    "M125HV",
    "100TL",
  ];

  return (
    <GraphLayout
      title="INVERTER MODEL RELIABILITY (MTBF)"
      titleFontSize="11px"
      titleLengthSVG={220}
      titleLengthLongSVG={320}
      width={["416px"]}
      height="290px"
      fullScreen={true}
      onExport={exportFunctions}
      WidgetProps={{ mt: 0 }}
    >
      <div
        ref={wrapperRef}
        style={{ height: "100%" }}
      >
        <StackedColumnChart
          height={210}
          apiData={apiData}
          onExportReady={
            setExportFunctions
          }
          props={{
            chart: {
              backgroundColor:
                "transparent",
            },

            legend: {
              enabled: false,
            },

            xAxis: {
              categories,
              labels: {
                style: {
                  fontSize: "8px",
                },
                rotation: 0,
              },
            },

            yAxis: {
              min: 0,
              max: 1500,
              tickPositions: [
                0,
                250,
                500,
                750,
                1000,
                1250,
                1500,
              ],
              title: {
                text: "",
              },
            },

            plotOptions: {
              column: {
                pointPadding: 0.15,
                groupPadding: 0.12,
                dataLabels: {
                  enabled: true,
                  style: {
                    fontSize: "8px",
                  },
                },
              },
            },
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default InverterModelReliability;