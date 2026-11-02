import { useState, useRef, useEffect } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseManyDeviceSameKeyChart from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const DGAmpereGraph = () => {
    // ********************* DG Ampere *********************
    const {
        timeWindow: timeWindowDGAmpere,
        handleTimeWindowChange: handleTimeWindowDGAmpereChange,
        handleReset: DGAmpereHandleReset
    } = useTimeHandle(10, "hour", "AVG", [5, "minute"]);


    var searchTagDGAmpere = {
        devName: "DG", // cal
        keys: "AMP_L1", // This widget tag will be present in Cal
        type: "spline",
        name: "DG L- "
    };
    const DGAmpereData = UseManyDeviceSameKeyChart(searchTagDGAmpere, timeWindowDGAmpere);
    // useEffect(() => {
    //     if (DGAmpereData) {
    //         console.log("DGAmpereData:", DGAmpereData);
    //     }
    // }, [DGAmpereData]);

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
            title='DG Ampere'
            titleLengthSVG={80}
            titleLengthLongSVG={435}
            width={["100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowDGAmpereChange}
            onReset={DGAmpereHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowDGAmpere?.startTs}
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowDGAmpereChange(
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
                    apiData={DGAmpereData || [{}]}
                    xAxisInterval={1000*60*60}
                    onExportReady={setExportFunctions}
                    props= {
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

export default DGAmpereGraph