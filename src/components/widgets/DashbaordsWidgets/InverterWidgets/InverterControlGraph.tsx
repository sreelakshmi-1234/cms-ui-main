import { useEffect, useState } from "react";
import { EnlargeWidgetContent } from "../../../../Services/EnlargeWidget";
import UseManyDeviceSameKeyChart, { UseManyDeviceSameKeyChartV2 } from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import UseTodayLastValueChartSeriesDataFromDB from "../../../../Services/Hooks/GetSeriesDataFromDB/UseTodayLastValueChartSeriesDataFromDB";
import { mergeSeriesFromDB } from "../../../../Services/AutoUpdateData/AppendAutoUpdateDataOnSeries";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterControlGraph = () => {
    // ********************* Inverter Control *********************
    const {
        timeWindow: timeWindowInverterControl,
        handleTimeWindowChange: handleTimeWindowInverterControlChange,
        handleReset: InverterControlHandleReset,
        manualChanges
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"], 1000, (updatedTimewindow) => {
        fetchAutoUpdateData()
        // console.log("AUTO REFRESH :", updatedTimewindow);
    });


    var searchTagInverterControl = {
        devName: "Inverter", // cal
        keys: "Active_Power_reference",
        type: "spline",
        name: "INV - "
    };
    
    // Initial Load
        const {data : InverterControl, fetchTelemetryDataFromTB} = UseManyDeviceSameKeyChartV2(searchTagInverterControl, timeWindowInverterControl);
        const [mergedData, setMergedData] = useState(InverterControl || [{}]) as any;
        
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
        }, [manualChanges, timeWindowInverterControl])
    
        // Fill fetched data from manual to chart series data
        useEffect(() => {
            if(InverterControl) {
                setMergedData(InverterControl);
            }
        }, [InverterControl])
    
        // Auto-update (latest only)
    
        const {data : latestData, fetchTelemetryDataFromDB : fetchAutoUpdateData} = UseTodayLastValueChartSeriesDataFromDB(searchTagInverterControl, timeWindowInverterControl);
    
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

    return (
        <GraphLayout
            title='Inverter Control'
            titleLengthSVG={120}
            titleLengthLongSVG={710}
            width={["full", "100%"]}
            height='100%'
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowInverterControlChange}
            onReset={InverterControlHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <LineChart 
                height={300} 
                apiData={mergedData || [{}]}
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
                        },
                        yAxis : {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'Dash',
                            gridLineColor: '#DFDFDF',
                        }
                    }
                }
            />
        </GraphLayout>
    );
};

export default InverterControlGraph