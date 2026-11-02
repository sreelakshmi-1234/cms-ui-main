import { useEffect, useRef, useState } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseManyDeviceSameKeyChart, { UseManyDeviceSameKeyChartV2 } from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import { formatInTimeZone } from "date-fns-tz";
import { mergeSeriesFromDB } from "../../../../Services/AutoUpdateData/AppendAutoUpdateDataOnSeries";
import UseTodayLastValueChartSeriesDataFromDB from "../../../../Services/Hooks/GetSeriesDataFromDB/UseTodayLastValueChartSeriesDataFromDB";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterACCurrentGraph = () => {
    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // ********************* Inverter AC Current *********************
    const {
        timeWindow: timeWindowInverterACCurrent,
        handleTimeWindowChange: handleTimeWindowInverterACCurrentChange,
        handleReset: InverterACCurrentHandleReset,
        manualChanges
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"], 1000, (updatedTimewindow) => {
        fetchAutoUpdateData()
        // console.log("AUTO REFRESH :", updatedTimewindow);
    });


    var searchTagInverterACCurrent = {
        devName: "Inverter",
        keys: "AVG_Amps_L",
        type: "spline",
        name: "INV - "
    };

    
    // Initial Load
        const {data : InverterACCurrent, fetchTelemetryDataFromTB} = UseManyDeviceSameKeyChartV2(searchTagInverterACCurrent, timeWindowInverterACCurrent);
        const [mergedData, setMergedData] = useState(InverterACCurrent || [{}]) as any;
        
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
        }, [manualChanges, timeWindowInverterACCurrent])
    
        // Fill fetched data from manual to chart series data
        useEffect(() => {
            if(InverterACCurrent) {
                setMergedData(InverterACCurrent);
            }
        }, [InverterACCurrent])
    
        // Auto-update (latest only)
    
        const {data : latestData, fetchTelemetryDataFromDB : fetchAutoUpdateData} = UseTodayLastValueChartSeriesDataFromDB(searchTagInverterACCurrent, timeWindowInverterACCurrent);
    
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
            title='Inverter AC Current'
            titleLengthSVG={155}
            titleLengthLongSVG={360}
            width={["full", "auto"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowInverterACCurrentChange}
            onReset={InverterACCurrentHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowInverterACCurrent?.startTs}
                    onDateChange={(start, end) => {
                        handleTimeWindowInverterACCurrentChange(
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
                    xAxisInterval={1000 * 60 * 60}
                    onExportReady={setExportFunctions}
                    props={{
                        chart: {
                            zoomType: 'x',
                            style: {
                                fontFamily: 'Montserrat, sans-serif',
                                color: "#062D59"
                            },
                            plotBorderWidth: 0,
                            plotBorderColor: '#DFDFDF',
                            plotBorderDashStyle: 'Dash',
                            className: "dashed-border"
                        },
                        title: { text: '' },
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
                            tickInterval: 60 * 60 * 2 * 1000,
                            min: !manualChanges ? undefined : new Date(formatInTimeZone(
                                Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 4, 0, 0, 0),
                                timeZone,
                                "yyyy-MM-dd HH:mm:ss.SSS"
                            )).getTime(),
                            max: !manualChanges ? undefined : new Date(formatInTimeZone(
                                Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 20, 0, 0, 0),
                                timeZone,
                                "yyyy-MM-dd HH:mm:ss.SSS"
                            )).getTime(),
                        },
                        yAxis: {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'Dash',
                            gridLineColor: '#DFDFDF',
                        }
                    }}
                />
            </div>
        </GraphLayout>
    );
};

export default InverterACCurrentGraph