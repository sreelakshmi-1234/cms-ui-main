import { FaChartColumn } from "react-icons/fa6";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../charts/ColumnChart";
import { EnlargeWidgetContent } from "../../../../Services/EnlargeWidget";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import UseManyDeviceSameKeyChart, { UseManyDeviceSameKeyChartV2 } from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import LineChart from "../../charts/LineChart";
import { useEffect, useState } from "react";
import UseTodayLastValueChartSeriesDataFromDB from "../../../../Services/Hooks/GetSeriesDataFromDB/UseTodayLastValueChartSeriesDataFromDB";
import { mergeSeriesFromDB } from "../../../../Services/AutoUpdateData/AppendAutoUpdateDataOnSeries";
import UseManyDeviceManyKeysChart from "../../../../Services/Hooks/UseManyDeviceManyKeysChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterTempVarGraph = () => {
    // ********************* Inverter Temp Variance *********************
    const {
        timeWindow: timeWindowInverterTempVar,
        handleTimeWindowChange: handleTimeWindowInverterTempVarChange,
        handleReset: InverterTempVarHandleReset,
        manualChanges
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"], 1000);
    // , (updatedTimewindow) => {
        // fetchAutoUpdateData()
        // console.log("AUTO REFRESH :", updatedTimewindow);
    // });


    // var searchTagInverterTempVar = {
    //     devName: "Inverter",
    //     keys: "AVG_Temp",
    //     type: "spline",
    //     name: "INV-"
    // };

    
    // // Initial Load
    //     const {data : InverterTempVar, fetchTelemetryDataFromTB} = UseManyDeviceSameKeyChartV2(searchTagInverterTempVar, timeWindowInverterTempVar);
    //     const [mergedData, setMergedData] = useState(InverterTempVar || [{}]) as any;
        
    //     useEffect(() => {
    //         fetchTelemetryDataFromTB()
    //     }, [])
     
    
    //     // On manual Time Request (calling from TB)
    //     useEffect(() => {
    //         // if(!manualChanges) {
    //         // }
            
    //         fetchTelemetryDataFromTB()
    //         // if(manualChanges) {
    //         //     fetchTelemetryDataFromTB()
    //         // }
    //     }, [manualChanges, timeWindowInverterTempVar])
    
    //     // Fill fetched data from manual to chart series data
    //     useEffect(() => {
    //         if(InverterTempVar) {
    //             setMergedData(InverterTempVar);
    //         }
    //     }, [InverterTempVar])
    
    //     // Auto-update (latest only)
    
    //     const {data : latestData, fetchTelemetryDataFromDB : fetchAutoUpdateData} = UseTodayLastValueChartSeriesDataFromDB(searchTagInverterTempVar, timeWindowInverterTempVar);
    
    //     useEffect(() => {
    //         if(latestData && manualChanges) {
    //             // console.log("AUTO UPDATE DATA:", latestData);
    //             const newSeries = mergeSeriesFromDB(mergedData, latestData)
    //         setMergedData(
    //             newSeries
    //         );
    //         // console.log("APPENDED :", newSeries)
    //         }
    //     }, [manualChanges, latestData])

    var searchTagInverterTempVar = [
        {
            devName: "Inverter",
            keys: "AVG_Temp",
            type: ["spline"],
            name: ["INV"],
            multiple: true
        },
        {
            devName : 'WMS.WMS-',
            keys : "Ambient_Temp",
            type : ["spline"],
            name : ["Ambient Temp (°C)"],
            multiple : true
        },
    ];

    const [Data, setData] = useState<Object[] | undefined>(undefined);
    let TempVarData = UseManyDeviceManyKeysChart(searchTagInverterTempVar, timeWindowInverterTempVar)

    useEffect(() => {
        if(TempVarData) {
            setData(TempVarData?.map((series : any, index : number) => {
                return(
                    {...series}
                )
            })
        )}
    }, [TempVarData])
    
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Temperature Variance'
            titleLengthSVG={210}
            titleLengthLongSVG={710}
            width={["full", "100%"]} //{["100%", "100%", "500px", "450px", "710px", "100%"]}
            height={["100%"]}
            // icon={FaChartColumn}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowInverterTempVarChange}
            onReset={InverterTempVarHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <LineChart 
                height={300} 
                apiData={Data || [{}]}
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

export default InverterTempVarGraph