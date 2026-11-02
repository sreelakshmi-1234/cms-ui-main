import { useRef, useState } from "react";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import SankeyChart from "../../../charts/SankeyChart";

const LostEnergyAttributionSankey = () => {
  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sankeyData = [
    ["Solar Resource", "Potential Energy", 100],

    ["Potential Energy", "Available Energy", 83],

    ["Available Energy", "Generated Energy", 83],

    ["Generated Energy", "Exported Energy", 70.4],

    ["Generated Energy", "Soiling", 4.1],
    ["Generated Energy", "Temperature", 3.2],
    ["Generated Energy", "Inverter", 2.0],
    ["Generated Energy", "Curtailment", 6.0],
    ["Generated Energy", "Grid & O&M", 0.9],
    ["Generated Energy", "Aux", 1.4],
    ["Generated Energy", "Auxiliary", 2.0],
  ];

  return (
    <GraphLayout
      title="LOST ENERGY ATTRIBUTION (SANKEY)"
      titleFontSize="14px"
      width={["355px"]}
      height="323px"
      fullScreen={true}
      timeWindow={false}
      onExport={exportFunctions}
      WidgetProps={{ mt: 0, ml: "-240px" }}
    >
      <div
        ref={wrapperRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <SankeyChart
          height={250}
          onExportReady={setExportFunctions}
          props={{
            chart: {
              backgroundColor: "transparent",
              height: 250,
            },

            title: {
              text: null,
            },

            credits: {
              enabled: false,
            },

            exporting: {
              enabled: false,
            },

            tooltip: {
              pointFormat:
                "<b>{point.fromNode.name}</b> → <b>{point.toNode.name}</b>: {point.weight}%",
            },

            series: [
              {
                type: "sankey",

                keys: ["from", "to", "weight"],

                nodeWidth: 26,
                curveFactor: 0.45,

                data: sankeyData,

                nodes: [
                  {
                    id: "Solar Resource",
                    color: "#2D6BFF",
                  },
                  {
                    id: "Potential Energy",
                    color: "#3F8CFF",
                  },
                  {
                    id: "Available Energy",
                    color: "#1E9E5A",
                  },
                  {
                    id: "Generated Energy",
                    color: "#E67E22",
                  },
                  {
                    id: "Exported Energy",
                    color: "#B63A2B",
                  },

                  {
                    id: "Soiling",
                    color: "#D35400",
                  },
                  {
                    id: "Temperature",
                    color: "#C0392B",
                  },
                  {
                    id: "Inverter",
                    color: "#A93226",
                  },
                  {
                    id: "Curtailment",
                    color: "#8E44AD",
                  },
                  {
                    id: "Grid & O&M",
                    color: "#9B59B6",
                  },
                  {
                    id: "Aux",
                    color: "#AF7AC5",
                  },
                  {
                    id: "Auxiliary",
                    color: "#D2B4DE",
                  },
                ],

                dataLabels: {
                  enabled: true,

                  style: {
                    color: "#FFFFFF",
                    textOutline: "none",
                    fontSize: "11px",
                    fontWeight: "500",
                  },

                  nodeFormatter: function () {
                    const labels: Record<string, string> = {
                      "Solar Resource":
                        "Solar\nResource\n(100%)",

                      "Potential Energy":
                        "Potential\nEnergy\n(100%)",

                      "Available Energy":
                        "Available\nEnergy\n(83.0%)",

                      "Generated Energy":
                        "Generated\nEnergy\n(83.0%)",

                      "Exported Energy":
                        "Exported\nEnergy\n(70.4%)",

                      Soiling: "Soiling (4.1%)",

                      Temperature:
                        "Temperature (3.2%)",

                      Inverter: "Inverter (2.0%)",

                      Curtailment:
                        "Curtailment (6.0%)",

                      "Grid & O&M":
                        "Grid & O&M (0.9%)",

                      Aux: "Aux (1.4%)",

                      Auxiliary:
                        "Auxiliary (2.0%)",
                    };

                    return (
                      labels[
                        (this as any).name
                      ] || (this as any).name
                    );
                  },
                },
              },
            ],
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default LostEnergyAttributionSankey;