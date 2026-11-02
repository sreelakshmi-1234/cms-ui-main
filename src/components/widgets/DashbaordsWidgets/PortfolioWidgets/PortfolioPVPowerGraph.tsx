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
import UsePlantsManyDeviceSameKey from "../../../../Services/Hooks/UsePlantsManyDeviceSameKey";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const PortfolioPVPowerGraph = () => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // ********************* Portfolio PV Power *********************
    
    const {
        timeWindow: timeWindowPortfolioPV,
        handleTimeWindowChange: handleTimeWindowPortfolioPVChange,
        handleReset: PortfolioPVHandleReset,
        manualChanges
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);


    var textSearchPortfolioPV = [""];
    var searchTagsPortfolioPV = {
        calculation: "INV_Total_Power"
    }
    var PortfolioPVType = "spline"

    const PortfolioPV = UsePlantsManyDeviceSameKey(PortfolioPVType, searchTagsPortfolioPV, textSearchPortfolioPV, timeWindowPortfolioPV, true)?.map((series : any) => (
        {
            ...series,
            name : series.name + " (kW)"
        }
    ));

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
            title='Portfolio PV Power'
            titleLengthSVG={130}
            width={["100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowPortfolioPVChange}
            onReset={PortfolioPVHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div ref={wrapperRef} style={{ position: 'relative', height: '100%' }}>
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowPortfolioPV?.startTs}
                    onDateChange={(start, end) => {
                        handleTimeWindowPortfolioPVChange(
                            start,
                            end,
                            'AVG',
                            5 * 60 * 1000,
                            {
                                selectedTab: 'history',
                                live: { intervalResolution: 5 * 60 * 1000 }
                            } as any
                        );
                    }}
                />

                <LineChart 
                    height={300} 
                    apiData={PortfolioPV || [{}]}
                    // xAxisInterval={1000*60*60}
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

export default PortfolioPVPowerGraph