import { useState, useRef, useEffect } from "react";
import UseBESSDaily from "../../../../Services/Hooks/Battery/UseBESSDaily";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import AreaSplineChart from "../../charts/AreaSplineChart";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const GridPowerGraph = () => {
    // ********************* Grid Power *********************
    const {
        timeWindow: timeWindowGridPower,
        handleTimeWindowChange: handleTimeWindowGridPowerChange,
        handleReset: GridPowerHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);


    var searchTagGridPower = {
        devName: localStorage.getItem("currentGridMeter") || "Grid Meter-1",
        keys: "Grid_Power_kW,Grid_Power_kVAR,Grid_Power_KVA",
        type: ["area", "line", "line"],
        name: ["Power kW", "Power kVAR", "Power KVA"]
    };
    const GridPowerData = UseBESSDaily(searchTagGridPower, timeWindowGridPower)?.map((series : any, index : number) => {
        if(series.name == "Power kW") {
            return {
                ...series,
                color : "rgba(27, 232, 123, 1)",
                fillColor: {
                    linearGradient: [0, 0, 0, 300], // Adjust the height based on your container
                    stops: [
                        [0, 'rgba(27, 232, 123, 0.2)'],
                        [1, 'rgba(27, 232, 123, 0.2)']
                    ]
                },
                negativeFillColor : "rgba(255, 80, 121, 0.2)",
                negativeColor : "rgba(255, 80, 121, 1)"
            }
        } else if(series.name == "Power kVAR") {
            return {
                ...series,
                lineColor : "#698CFF"
            }
        } else if(series.name == "Power KVA") {
            return {
                ...series,
                lineColor : "#FFA550"
            }
        }
    });
    // useEffect(() => {
    //     if (GridPowerData) {
    //         console.log("GridPowerData:", GridPowerData);
    //     }
    // }, [GridPowerData]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [dateRight, setDateRight] = useState(300);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width;
            if (width > 1200) setDateRight(860);
            else setDateRight(200);
        });

        if (wrapperRef.current) observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <GraphLayout
            title='Power'
            titleLengthSVG={40}
            titleLengthLongSVG={475}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowGridPowerChange}
            onReset={GridPowerHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowGridPower?.startTs}
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowGridPowerChange(
                            start,
                            end,
                            "AVG",
                            5 * 60 * 1000,
                            {
                                selectedTab: "history",
                                live: { intervalResolution: 5 * 60 * 1000 }
                            } as any
                        );
                    }}
                />
                <AreaSplineChart
                    height={300}
                    apiData={GridPowerData || [{}]}
                    onExportReady={setExportFunctions}
                    props=
                    {
                        {
                        xAxis: {
                            type : "datetime",
                            gridLineDashStyle: 'Dash',
                            lineWidth : 2,
                            tickLength: 0,
                            gridLineWidth: 1,
                            lineColor : "#D9D9D9"
                        },
                        yAxis: {
                            title: {
                                text: '',
                            },
                            gridLineDashStyle: 'Dash',
                            gridLineWidth: 1,
                            plotLines: [{
                                value: 0,
                                color: '#DFDFDF', 
                                width: 2, 
                                zIndex: 5, 
                                dashStyle: 'Solid' 
                            }],
                        },
                    }
                }
            />
            </div>
        </GraphLayout>
    );
};

export default GridPowerGraph