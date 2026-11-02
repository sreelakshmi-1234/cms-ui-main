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

const GridCurrentGraph  = () => {
    // ********************* Grid Current *********************
    const {
        timeWindow: timeWindowGridCurrent,
        handleTimeWindowChange: handleTimeWindowGridCurrentChange,
        handleReset: GridCurrentHandleReset
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


    var searchTagGridCurrent = {
        devName: localStorage.getItem("currentGridMeter") || "Grid Meter-1", // cal
        keys: "AGC_AMP_L1,AGC_AMP_L2,AGC_AMP_L3", // AMP isnt present in Durtek
        type: ["spline", "spline", "spline"],
        name: ["L1 Amps", "L2 Amps", "L3 Amps"]
    };
    const GridCurrentData = UseBESSDaily(searchTagGridCurrent, timeWindowGridCurrent);
    // useEffect(() => {
    //     if (GridCurrentData) {
    //         console.log("GridCurrentData:", GridCurrentData);
    //     }
    // }, [GridCurrentData]);

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Current'
            titleLengthSVG={50}
            titleLengthLongSVG={465}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowGridCurrentChange}
            onReset={GridCurrentHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowGridCurrent?.startTs}
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowGridCurrentChange(
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
                    apiData={GridCurrentData || [{}]}
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
                                    month: '%b %y', // Custom format for months
                                    year: '%Y' // Format for years if needed
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

export default GridCurrentGraph