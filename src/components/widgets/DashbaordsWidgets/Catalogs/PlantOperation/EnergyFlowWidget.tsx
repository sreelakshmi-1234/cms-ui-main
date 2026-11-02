import { useRef, useState } from "react";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import SankeyChart from "../../../charts/SankeyChart";

const EnergyFlowWidget = () => {
  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sankeyData = [
    ["Solar Resource", "DC Generation", 30.32],

    ["DC Generation", "AC Generation", 24.18],

    ["DC Generation", "Clipping Loss", 1.26],
    ["DC Generation", "Other DC Losses", 0.88],

    ["AC Generation", "Grid Export", 18.02],

    ["AC Generation", "Inverter Loss", 1.32],
    ["AC Generation", "Transformer Loss", 0.78],
    ["AC Generation", "Auxiliary", 0.26],
  ];

  return (
    <GraphLayout
      title="ENERGY FLOW (Live)"
      titleFontSize="13px"
      width={["100%"]}
      height="255px"
      fullScreen={false}
      timeWindow={false}
      onExport={exportFunctions}
      WidgetProps={{ mt: 0 }}
    >
      <div
        ref={wrapperRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <SankeyChart
          height={220}
          onExportReady={setExportFunctions}
          props={{
            chart: {
              backgroundColor: "transparent",
              height: 220,
              margin: [10, 10, 10, 10],
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
                "<b>{point.fromNode.name}</b> → <b>{point.toNode.name}</b>: {point.weight} MW",
            },

            plotOptions: {
              sankey: {
                nodePadding: 18,
                nodeWidth: 8,
                curveFactor: 0.55,
              },
            },

            series: [
              {
                type: "sankey",

                keys: ["from", "to", "weight"],

                data: sankeyData,

                nodes: [
                  {
                    id: "Solar Resource",
                    color: "#00D084",
                  },

                  {
                    id: "DC Generation",
                    color: "#11D1A6",
                  },

                  {
                    id: "AC Generation",
                    color: "#26C6DA",
                  },

                  {
                    id: "Grid Export",
                    color: "#00E676",
                  },

                  {
                    id: "Clipping Loss",
                    color: "#0A3B5C",
                  },

                  {
                    id: "Other DC Losses",
                    color: "#0A3B5C",
                  },

                  {
                    id: "Inverter Loss",
                    color: "#0A3B5C",
                  },

                  {
                    id: "Transformer Loss",
                    color: "#0A3B5C",
                  },

                  {
                    id: "Auxiliary",
                    color: "#0A3B5C",
                  },
                ],

                dataLabels: {
                  enabled: true,
                  allowOverlap: true,

                  style: {
                    color: "#FFFFFF",
                    textOutline: "none",
                    fontSize: "11px",
                    fontWeight: "500",
                  },

                  nodeFormatter: function () {
                    const labels: Record<string, string> = {
                      "Solar Resource":
                        "Solar Resource\n\n30.32 MW\n100%",

                      "DC Generation":
                        "DC Generation\n\n24.18 MW\n79.7%",

                      "AC Generation":
                        "AC Generation\n\n18.62 MW\n61.3%",

                      "Grid Export":
                        "Grid Export\n\n18.02 MW\n59.4%",

                      "Clipping Loss":
                        "Clipping Loss\n\n1.26 MW\n4.2%",

                      "Other DC Losses":
                        "Other DC Losses\n\n0.88 MW",

                      "Inverter Loss":
                        "Inverter Loss\n\n1.32 MW\n4.4%",

                      "Transformer Loss":
                        "Transformer Loss\n\n0.78 MW\n2.6%",

                      Auxiliary:
                        "Auxiliary\n\n0.26 MW\n0.9%",
                    };

                    return (
                      labels[(this as any).name] ||
                      (this as any).name
                    );
                  },
                },

                linkOpacity: 0.55,
              },
            ],
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default EnergyFlowWidget;