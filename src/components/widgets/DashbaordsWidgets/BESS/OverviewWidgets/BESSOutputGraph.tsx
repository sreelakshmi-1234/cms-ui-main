import { useState, useRef, useEffect } from "react";
import { EnlargeWidgetContent } from "../../../../../Services/EnlargeWidget";
import UseManyDeviceSameMultipleKeys from "../../../../../Services/Hooks/UseManyDeviceSameMultipleKeys";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout"
import LineChart from "../../../charts/LineChart"
import DateFormatter from "../../../../widgets/DashbaordsWidgets/DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const BESSOutputGraph = () => {
    // ********************* BESS Output *********************
    const {
        timeWindow: timeWindowBESSOutput,
        handleTimeWindowChange: handleTimeWindowBESSOutputChange,
        handleReset: BESSOutputHandleReset
    } = useTimeHandle(5, "hour", "AVG", [5, "minute"]);


    var searchTagBESSOutput = {
        devName: "PCS",
        keys: "AC_Active_Power_Watt,AC_Reactive_Power_var,Apperent",
        type: ["spline", "spline", "spline"],
        name: ["kW", "kVar", "kVA"]
    };
    const BESSOutpuColor = [,];
    const BESSOutputData = UseManyDeviceSameMultipleKeys(searchTagBESSOutput, timeWindowBESSOutput)?.map((series: any, index: number) => {
        if (series.name.includes("kW")) {
            return {
                ...series,
                color: "#E370FD"
            }
        } else if (series.name.includes("kVar")) {
            return {
                ...series,
                color: "#82B2FF"
            }
        } else if (series.name.includes("kVA")) {
            return {
                ...series,
                color: "#F4B725"
            }
        } else {
            return {
                ...series,
                color: "#CF4E4E"
            }
        }

    });
    // useEffect(() => {
    //     if (BESSOutputData) {
    //         console.log("BESSOutputData:", BESSOutputData);
    //     }
    // }, [BESSOutputData]);

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

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

    return (
        <GraphLayout
            title='BESS Output'
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowBESSOutputChange}
            onReset={BESSOutputHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowBESSOutput?.startTs}  //  IMPORTANT
                    onDateChange={(start, end) => {
                        handleTimeWindowBESSOutputChange(
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
                    apiData={BESSOutputData || [{}]}
                    onExportReady={setExportFunctions}
                    props={{
                        xAxis: {
                            type: 'datetime',
                            crosshair: true,
                            labels: {
                                enabled: true,
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
                            lineColor: "rgba(0,0,0,0.5)",
                        },
                        yAxis: {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'Dash',
                            gridLineColor: '#DFDFDF',
                        },
                    }}
                />
            </div>
        </GraphLayout>
    );
};

export default BESSOutputGraph