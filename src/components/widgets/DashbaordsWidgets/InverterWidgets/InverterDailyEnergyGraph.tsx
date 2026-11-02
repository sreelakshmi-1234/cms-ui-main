import { FaChartColumn } from "react-icons/fa6";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseManyDeviceSameKeyChart, { UseManyDeviceSameKeyChartV2 } from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../charts/ColumnChart";
import { useEffect, useRef, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import UseTodayLastValueChartSeriesDataFromDB from "../../../../Services/Hooks/GetSeriesDataFromDB/UseTodayLastValueChartSeriesDataFromDB";
import DateFormatter from "../DateFormatter";
import Highcharts from "highcharts";
import type { AxisLabelsFormatterContextObject } from "highcharts";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterDailyEnergyGraph = () => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';
    
    // ********************* Daily Energy kWh *********************
    const {
        timeWindow: timeWindowDailyEnergykWh,
        handleTimeWindowChange: handleTimeWindowDailyEnergykWhChange,
        handleReset: DailyEnergykWhHandleReset,
        manualChanges
    } = useTimeHandle(6, "minute", "NONE", [10, "minute"], 1000, (updatedTimeWindow) => {
        fetchTelemetryDataFromDB()
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleDateChange = (startISO: string, endISO: string) => {

        const startOfDay = new Date(
            formatInTimeZone(
                new Date(startISO),
                timeZone,
                "yyyy-MM-dd HH:mm:ss"
            ) + "Z"
        ).getTime();

        const endOfDay = new Date(
            formatInTimeZone(
                new Date(endISO),
                timeZone,
                "yyyy-MM-dd HH:mm:ss"
            ) + "Z"
        ).getTime();

        handleTimeWindowDailyEnergykWhChange(
            new Date(startOfDay).toISOString(),
            new Date(endOfDay).toISOString(),
            "MAX",
            86400000,
            {
                selectedTab: "history",
                live: {
                    intervalResolution: 86400000
                }
            } as any
        );
    };


    var searchTagDailyEnergykWh = {
        devName: "Inverter",
        keys: "Energy_Daily_kWh",
        type: "column",
        name: "INV - "
    };
    const DailyEnergykWhColor = ["#C92323", "#19CA16", "#0086CC", "#A38415", "#940386", "#8842E0", '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
        '#03c69b', '#00f194']
    const {data : DailyEnergykWhData, fetchTelemetryDataFromDB} = UseTodayLastValueChartSeriesDataFromDB(searchTagDailyEnergykWh, timeWindowDailyEnergykWh);
    const [mergedData, setMergedData] = useState(DailyEnergykWhData || [{}]) as any;
    
    useEffect(() => {
        fetchTelemetryDataFromDB()
    }, [])

    useEffect(() => {
        if (DailyEnergykWhData && manualChanges) {
            setMergedData(
                DailyEnergykWhData?.map((series: any, index: number) => ({
                    ...series,
                    data: series.data.map((point: any) => [
                        Date.UTC(new Date(point[0]).getUTCFullYear(), new Date(point[0]).getUTCMonth(), new Date(point[0]).getUTCDate()), // Convert to UTC date
                        point[1]
                    ]),
                    color: DailyEnergykWhColor[index]
                }))
            )
            // console.log("DailyEnergykWhData:", DailyEnergykWhData);
        }
    }, [manualChanges, DailyEnergykWhData]);

    // manual loading
    const {data : DailyEnergykWhDataManual, fetchTelemetryDataFromTB} = UseManyDeviceSameKeyChartV2(searchTagDailyEnergykWh, timeWindowDailyEnergykWh);
    // On manual Time Request (calling from TB)
        useEffect(() => {
            if(!manualChanges) {
                fetchTelemetryDataFromTB()
            }

            if(manualChanges) {
                fetchTelemetryDataFromDB()
            }
        }, [manualChanges, timeWindowDailyEnergykWh]);
    
        // Fill fetched data from manual to chart series data
        useEffect(() => {
            if(DailyEnergykWhDataManual) {
                setMergedData(DailyEnergykWhDataManual);
            }
        }, [DailyEnergykWhDataManual])

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    const [dateRight, setDateRight] = useState(300);
    const [chartHeight, setChartHeight] = useState<number | string>(300);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width;

            if (width > 1200) {
                setDateRight(860);  // fullscreen
                setChartHeight('860');
            } else {
                setDateRight(200);              // normal
                setChartHeight(300);
            }
        });

        if (wrapperRef.current) observer.observe(wrapperRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <GraphLayout
            title='Daily Energy kWh'
            titleLengthSVG={140}
            titleLengthLongSVG={380}
            width={["full", "100%"]} //{["100%", "100%", "500px", "450px", "710px", "100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowDailyEnergykWhChange}
            onReset={DailyEnergykWhHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div ref={wrapperRef} style={{ position: "relative" }}>

                <DateFormatter
                    currentStartTs={timeWindowDailyEnergykWh?.startTs}
                    onDateChange={handleDateChange}
                    right={dateRight}   
                    top={-40}          
                    size="md"
                />

                <ColumnChart
                height={chartHeight} 
                apiData={mergedData || [{}]}
                onExportReady={setExportFunctions}
                props={{
                    plotOptions : {
                        column : {
                            pointWidth : 7,
                            pointPadding : 0.12,
                            groupPadding : 0.08,
                            maxPointWidth : 16
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            formatter: function (this: AxisLabelsFormatterContextObject): string {
                                return Highcharts.dateFormat('%Y-%m-%d', this.value as number);
                            },
                            style: {
                                color: '#062D59',
                                fontSize: '14px'
                            }
                        },
                        gridLineDashStyle: 'Dash',
                        gridLineWidth: 0,
                        tickLength: 0,
                        gridLineColor: '#DFDFDF',
                        lineColor : "#DFDFDF",
                        dateFormat: '%Y-%m-%d',
                        // dateTimeLabelFormats: {
                        //     second: '', // No label for seconds
                        //     minute: '', // No label for minutes
                        //     hour: '',   // No label for hours
                        //     day: '%e %b', // Custom format for days
                        //     month: '%b %y', // Custom format for months
                        //     year: '%Y' // Format for years if needed
                        // },
                    },
                    exporting: {
                        csv: {
                            dateFormat: '%Y-%m-%d' // Format to export only the date
                        }
                    }
                }}
            />
            </div>
        </GraphLayout>
    );
};

export default InverterDailyEnergyGraph

function floor5Min(min : number) {
    if(min % 5 == 0) {
        return min
    } else {
        var diff = (min % 5)
        return min - diff;
    }
}