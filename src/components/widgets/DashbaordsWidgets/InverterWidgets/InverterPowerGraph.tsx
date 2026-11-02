import { useEffect, useRef, useState } from "react";
import { UseManyDeviceSameKeyChartV2 } from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import { formatInTimeZone } from "date-fns-tz";
import UseAutoUpdateAPIData from "../../../../Services/Hooks/AutoUpdateTimeseries/UseAutoUpdateAPIData";
import { appendAutoUpdateData, mergeSeriesFromDB } from "../../../../Services/AutoUpdateData/AppendAutoUpdateDataOnSeries";
import UseChartSeriesDataFromDB from "../../../../Services/Hooks/GetSeriesDataFromDB/UseChartSeriesDataFromDB";
import UseTodayLastValueChartSeriesDataFromDB from "../../../../Services/Hooks/GetSeriesDataFromDB/UseTodayLastValueChartSeriesDataFromDB";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterPowerGraph = () => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // ********************* Inverter Power *********************
    const {
        timeWindow: timeWindowInverterPower,
        handleTimeWindowChange: handleTimeWindowInverterPowerChange,
        handleReset: InverterPowerHandleReset,
        manualChanges,
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"], 1000, (updatedTimewindow) => {
        fetchAutoUpdateData()
        // console.log("AUTO REFRESH :", updatedTimewindow);
    });


    var searchTagInverterPower = {
        devName: "Inverter",
        keys: "AC_Active_Power_Watt",
        type: "spline",
        name: "INV kW - "
    };

    // Initial Load
    const {data : InverterPowerData, fetchTelemetryDataFromTB} = UseManyDeviceSameKeyChartV2(searchTagInverterPower, timeWindowInverterPower);
    const [mergedData, setMergedData] = useState(InverterPowerData || [{}]) as any;
    
    useEffect(() => {
        fetchTelemetryDataFromTB()
    }, [])

    // From DB
    // const {data : InverterPowerData} = UseChartSeriesDataFromDB(searchTagInverterPower, timeWindowInverterPower);
    // useEffect(() => {
    //     if (InverterPowerData) {
    //         console.log("InverterPowerDataFROM DB:", InverterPowerData);
    //         setMergedData(InverterPowerData);
    //     }
    // }, [InverterPowerData]);


    // On manual Time Request (calling from TB)
    useEffect(() => {
        // alert("Manual Changes Occured");
        if(!manualChanges) {
            fetchTelemetryDataFromTB()
        }

        if (manualChanges) {
            fetchTelemetryDataFromTB()
        }
    }, [manualChanges, timeWindowInverterPower])

    // Fill fetched data from manual to chart series data
    useEffect(() => {
        if(InverterPowerData) {
            setMergedData(InverterPowerData);
        }
    }, [InverterPowerData])

    // Auto-update (latest only)
    // const {latestData, fetchAutoUpdateData} = UseAutoUpdateAPIData(searchTagInverterPower);

    // useEffect(() => {
    //     if(latestData && manualChanges) {
    //         // console.log("AUTO UPDATE DATA:", latestData);
    //         const newSeries = appendAutoUpdateData(mergedData, latestData, searchTagInverterPower.keys)
    //     setMergedData(
    //         newSeries
    //     );
    //     // console.log("APPENDED :", newSeries)
    //     }
    // }, [latestData]).

    const {data : latestData, fetchTelemetryDataFromDB : fetchAutoUpdateData} = UseTodayLastValueChartSeriesDataFromDB(searchTagInverterPower, timeWindowInverterPower);

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

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Inverter Power'
            titleLengthSVG={110}
            width={["100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowInverterPowerChange}
            onReset={InverterPowerHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div ref={wrapperRef} style={{ position: 'relative', height: '100%' }}>
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowInverterPower?.startTs}
                    onDateChange={(start, end) => {
                        handleTimeWindowInverterPowerChange(
                            start,
                            end,
                            'AVG',
                            5 * 60 * 1000,
                            { selectedTab: 'history', live: { intervalResolution: 5 * 60 * 1000 } } as any
                        );
                    }}
                />
                <LineChart 
                    height={300} 
                    apiData={mergedData || [{}]}
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
                                    month: '%b %y',
                                    year: '%Y'
                                },
                                tickLength: 0,
                                lineColor : "rgba(0,0,0,0.5)",
                                tickInterval: 60 * 60 * 2 * 1000,
                                min : !manualChanges ? undefined :  new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 4, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
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

export default InverterPowerGraph