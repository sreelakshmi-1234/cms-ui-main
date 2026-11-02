import { useState, useRef, useEffect } from "react";
import UseBESSDaily from "../../../../Services/Hooks/Battery/UseBESSDaily";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const GridFrequencyGraph = () => {
    // ********************* Grid Frequency *********************
    const {
        timeWindow: timeWindowGridFrequency,
        handleTimeWindowChange: handleTimeWindowGridFrequencyChange,
        handleReset: GridFrequencyHandleReset
    } = useTimeHandle(10, "hour", "AVG", [5, "minute"]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [dateRight, setDateRight] = useState(300);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width;
            if (width > 1200) setDateRight(860);
            else setDateRight(200);
        });

        if (wrapperRef.current) observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);


    var searchTagGridFrequency = {
        devName: localStorage.getItem("currentGridMeter") || "Grid Meter-1", // cal
        keys: "Bus_B_frequency_L1,Bus_B_frequency_L2,Bus_B_frequency_L3", // AMP isnt present in Durtek
        type: ["spline", "spline", "spline"],
        name: ["L1 Hz", "L2 Hz", "L3 Hz"]
    };
    const GridFrequencyData = UseBESSDaily(searchTagGridFrequency, timeWindowGridFrequency);
    // useEffect(() => {
    //     if (GridFrequencyData) {
    //         console.log("GridFrequencyData:", GridFrequencyData);
    //     }
    // }, [GridFrequencyData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Frequency'
            titleLengthSVG={80}
            titleLengthLongSVG={430}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowGridFrequencyChange}
            onReset={GridFrequencyHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowGridFrequency?.startTs}
                    onDateChange={(start, end) => {
                        handleTimeWindowGridFrequencyChange(
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

                <LineChart 
                    height={300} 
                    apiData={GridFrequencyData || [{}]}
                    onExportReady={setExportFunctions}
                    props=
                    {
                        {
                            chart: {
                                zoomType: 'x',
                                style: {
                                    fontFamily: 'Montserrat, sans-serif',
                                    color: "#062D59"
                                  },
                                plotBorderWidth: 0,
                                plotBorderColor: '#DFDFDF',
                                plotBorderDashStyle: 'Dash',
                                className : "dashed-border"
                            },
                            title: {
                                text: '',
                            },
                            xAxis: {
                                type: 'datetime',
                                crosshair: true,
                                labels : {
                                    enabled : true,
                                    style: {
                                        color: '#062D59',
                                        fontSize: '12px'
                                    }
                                },
                                dateTimeLabelFormats: {
                                    month: '%b %y',
                                    year: '%Y'
                                },
                                tickLength: 0,
                                lineColor : "rgba(0,0,0,0.5)",
                            },
                            yAxis : {
                                gridLineWidth: 1,
                                gridLineDashStyle: 'Dash',
                                gridLineColor: '#DFDFDF',
                            }
                        }
                    }
                />
            </div>
        </GraphLayout>
    );
};

export default GridFrequencyGraph