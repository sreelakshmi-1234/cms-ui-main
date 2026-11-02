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

const DGPowerGraph = () => {
    // ********************* DG Power *********************
    const {
        timeWindow: timeWindowDGPower,
        handleTimeWindowChange: handleTimeWindowDGPowerChange,
        handleReset: DGPowerHandleReset
    } = useTimeHandle(10, "hour", "AVG", [5, "minute"]);


    var searchTagDGPower = {
        devName: "DG", // cal
        keys: "AC_Active_Power_Watt",
        type: "spline",
        name: "DG kW - "
    };
    const DGPowerData = UseManyDeviceSameKeyChart(searchTagDGPower, timeWindowDGPower);
    // useEffect(() => {
    //     if (DGPowerData) {
    //         console.log("DGPowerData:", DGPowerData);
    //     }
    // }, [DGPowerData]);

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
            title='DG Power'
            titleLengthSVG={70}
            titleLengthLongSVG={445}
            width={["100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowDGPowerChange}
            onReset={DGPowerHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowDGPower?.startTs}
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowDGPowerChange(
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
                    apiData={DGPowerData || [{}]}
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

export default DGPowerGraph