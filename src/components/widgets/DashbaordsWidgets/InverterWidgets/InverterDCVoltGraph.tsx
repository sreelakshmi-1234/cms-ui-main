import { useEffect, useRef, useState } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseManyDeviceSameKeyChart, { UseManyDeviceSameKeyChartV2 } from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import { formatInTimeZone } from "date-fns-tz";
import UseTodayLastValueChartSeriesDataFromDB from "../../../../Services/Hooks/GetSeriesDataFromDB/UseTodayLastValueChartSeriesDataFromDB";
import { mergeSeriesFromDB } from "../../../../Services/AutoUpdateData/AppendAutoUpdateDataOnSeries";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterDCVoltGraph = () => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // ********************* Inverter DC Volt *********************
    const {
        timeWindow: timeWindowInverterDCVolt,
        handleTimeWindowChange: handleTimeWindowInverterDCVoltChange,
        handleReset: InverterDCVoltHandleReset,
        manualChanges
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"], 1000, (updatedTimewindow) => {
        fetchAutoUpdateData()
        // console.log("AUTO REFRESH :", updatedTimewindow);
    });


    var searchTagInverterDCVolt = {
        devName: "Inverter",
        keys: "DC_String2_Volt",
        type: "spline",
        name: "INV - "
    };
    
    // Initial Load
        const {data : InverterDCVolt, fetchTelemetryDataFromTB} = UseManyDeviceSameKeyChartV2(searchTagInverterDCVolt, timeWindowInverterDCVolt);
        const [mergedData, setMergedData] = useState(InverterDCVolt || [{}]) as any;
        
        useEffect(() => {
            fetchTelemetryDataFromTB()
        }, [])
     
    
        // On manual Time Request (calling from TB)
        useEffect(() => {
            if(!manualChanges) {
                fetchTelemetryDataFromTB()
            }

            if(manualChanges) {
                fetchTelemetryDataFromTB()
            }
        }, [manualChanges, timeWindowInverterDCVolt])
    
        // Fill fetched data from manual to chart series data
        useEffect(() => {
            if(InverterDCVolt) {
                setMergedData(InverterDCVolt);
            }
        }, [InverterDCVolt])
    
        // Auto-update (latest only)
    
        const {data : latestData, fetchTelemetryDataFromDB : fetchAutoUpdateData} = UseTodayLastValueChartSeriesDataFromDB(searchTagInverterDCVolt, timeWindowInverterDCVolt);
    
        useEffect(() => {
            if(latestData && manualChanges) {
                // console.log("AUTO UPDATE DATA:", latestData);
                const newSeries = mergeSeriesFromDB(mergedData, latestData)
            setMergedData(
                newSeries
            );
            // console.log("APPENDED :", newSeries)
            }
        }, [manualChanges, latestData])
    

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
            title='Inverter DC Volt'
            titleLengthSVG={120}
            titleLengthLongSVG={395}
            width={["full", "100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowInverterDCVoltChange}
            onReset={InverterDCVoltHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowInverterDCVolt?.startTs}
                    onDateChange={(start, end) => {
                        handleTimeWindowInverterDCVoltChange(
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
                    apiData={mergedData || [{}]}
                    xAxisInterval={1000*60*60}
                    onExportReady={setExportFunctions}
                    props={
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
                                tickInterval: 60 * 60 * 2 * 1000, // 2 hours interval
                                min : !manualChanges ? undefined : new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 4, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
                                max : !manualChanges ? undefined : new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 20, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
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

export default InverterDCVoltGraph