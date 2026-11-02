import { useRef, useState } from "react";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";

const CurtailmentIntelligence = () => {
    const [exportFunctions, setExportFunctions] = useState<any>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const categories = [
        "00:00",
        "02:00",
        "04:00",
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
    ];

    const apiData = [
        {
            type: "line",
            name: "Available Power",
            color: "#16A3FF",
            lineWidth: 3,
            data: [2, 5, 12, 35, 75, 95, 88, 82, 72, 45, 15, 3],
            unit: "%",
        },
        {
            type: "line",
            name: "Allowed Export",
            color: "#FFFFFF",
            lineWidth: 2,
            data: [1, 4, 10, 30, 65, 82, 76, 70, 60, 38, 12, 2],
            unit: "%",
        },
        {
            type: "line",
            name: "Actual Export",
            color: "#30D158",
            lineWidth: 3,
            data: [0, 2, 8, 20, 55, 45, 58, 25, 52, 28, 8, 1],
            unit: "%",
            fillOpacity: 0.2,
        },
    ];

    return (
        <GraphLayout
            title="CURTAILMENT INTELLIGENCE"
            titleFontSize="14px"
            width={["374px"]}
            height="323px"
            fullScreen={true}
            timeWindow={false}
            onExport={exportFunctions}
            WidgetProps={{ mt: 0 }}
        >
            <div
                ref={wrapperRef}
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <LineChart
                    height={220}
                    apiData={apiData}
                    onExportReady={setExportFunctions}
                    props={{
                        chart: {
                            backgroundColor: "transparent",
                        },

                        legend: {
                            enabled: true,
                            align: "center",
                            verticalAlign: "bottom",
                            layout: "horizontal",
                            itemStyle: {
                                color: "#AFC4E8",
                                fontSize: "11px",
                            },
                        },

                        xAxis: {
                            categories,
                            gridLineWidth: 1,
                            gridLineColor: "rgba(255,255,255,0.08)",
                        },

                        yAxis: {
                            min: 0,
                            max: 100,
                            tickInterval: 20,
                            title: {
                                text: "",
                            },
                            gridLineColor: "rgba(255,255,255,0.08)",
                        },

                        tooltip: {
                            shared: true,
                        },

                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: false,
                                },
                            },
                            area: {
                                fillOpacity: 0.15,
                            },
                        },
                    }}
                />

                <div
                    style={{
                        marginTop: "8px",
                        background: "#C53D3D",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "nowrap",
                    }}
                >
                    <span
                        style={{
                            color: "#FFF",
                            fontSize: "10px",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginRight: "8px",
                            flex: 1,
                        }}
                    >
                        Revenue Lost Due to Grid Curtailment
                    </span>

                    <span
                        style={{
                            color: "#FFF",
                            fontSize: "20px",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            marginLeft: "8px",
                        }}
                    >
                        ₹ 42,000
                    </span>
                </div>
            </div>
        </GraphLayout>
    );
};

export default CurtailmentIntelligence;