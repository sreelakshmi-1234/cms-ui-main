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

const GridPowerFactorThreadGraph = () => {
    // ********************* Grid PowerFactorThread *********************
    const {
        timeWindow: timeWindowGridPowerFactorThread,
        handleTimeWindowChange: handleTimeWindowGridPowerFactorThreadChange,
        handleReset: GridPowerFactorThreadHandleReset
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


    var searchTagGridPowerFactorThread = {
        devName: localStorage.getItem("currentGridMeter") || "Grid Meter-1", // cal
        keys: "Grid_PF", // AMP isnt present in Durtek
        type: ["spline", "spline", "spline"],
        name: ["Power Factor", "L2 Amps", "L3 Amps"]
    };
    const GridPowerFactorThreadData = UseBESSDaily(searchTagGridPowerFactorThread, timeWindowGridPowerFactorThread)?.map((series : any, i) => (
        {
            ...series,
            color : "#FF8A0D"
        }
    ));
    // useEffect(() => {
    //     if (GridPowerFactorThreadData) {
    //         console.log("GridPowerFactorThreadData:", GridPowerFactorThreadData);
    //     }
    // }, [GridPowerFactorThreadData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Power Factor'
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowGridPowerFactorThreadChange}
            onReset={GridPowerFactorThreadHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowGridPowerFactorThread?.startTs}
                    onDateChange={(start, end) => {
                        handleTimeWindowGridPowerFactorThreadChange(
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
                    apiData={GridPowerFactorThreadData || [{}]}
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

export default GridPowerFactorThreadGraph