import { FaChartColumn } from "react-icons/fa6";
import ColumnChart from "../../charts/ColumnChart";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import UseManyDeviceSameKeyChart from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import AreaSplineChart from "../../charts/AreaSplineChart";
import LineChart from "../../charts/LineChart";
import { useState } from "react";
import UseInverterAvailability from "../../../../Services/Hooks/UseInverterAvailability";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterAvailabilityGraph = () => {
    // ********************** Inverter Availability *******************

    // *** THIS IS PREVIOUS AVAILABILITY FORMULA MADE IN NODE EXPRESS SERVER. IT WILL AUTOMATICALLY CALCULATE AVAILABILITY.
    /* const {
        timeWindow : timeWindowInverterAvail,
        handleTimeWindowChange : handleTimeWindowInverterAvailability,
        handleReset : InverterAvailabilityHandleRESET

    } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

    var searchTagInverterAvail = {
        devName : "Inverter",
        keys : "AC_Active_Power_Watt",
        type : "spline",
        name : "INV -"
    }
    var POA = " B1_WMS_POA_W/m2";

    const InverterAvailData = UseInverterAvailability(searchTagInverterAvail, POA, timeWindowInverterAvail) 
    */

    // **** This is Last Value API for SAME KEY MANY DEVICE.
    const {
        timeWindow: timeWindowInverterAvail,
        handleTimeWindowChange: handleTimeWindowInverterAvailability,
        handleReset: InverterAvailabilityHandleRESET

    } = useTimeHandle(6, "day", "NONE", [5, "minute"]);

    var searchTagInverterAvail = {
        devName: "Inverter",
        keys: "Inverter_Availability",
        type: "spline",
        name: "INV -"
    }

    // const InverterAvailData = UseManyDeviceSameKeyChart(searchTagInverterAvail, timeWindowInverterAvail, true)?.map((value : any, index) => (
    //     {
    //         ...value,
    //         opacity : 0.8,
    //         marker : {
    //             enabled: true,
    //             symbol: 'circle',
    //             radius : 6,
    //             opacity : 0.3,
    //         }
    //     }
    // ));
    const InverterAvailData = UseInverterAvailability(searchTagInverterAvail, timeWindowInverterAvail)?.map((value : any, index) => (
        {
            ...value,
            opacity : 0.8,
            marker : {
                enabled: true,
                symbol: 'circle',
                radius : 6,
                opacity : 0.3,
            }
        }
    ));
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Inverter Availability'
            titleLengthSVG={150}
            titleLengthLongSVG={370}
            initTimeTitle='Last 7 Days'
            width={["full", "100%"]}
            height={["100%"]}
            // timeWindow ={true}
            onTimeWindowChange={handleTimeWindowInverterAvailability}
            onReset={InverterAvailabilityHandleRESET}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <LineChart 
                height={300} 
                apiData={InverterAvailData || [{}]}
                onExportReady={setExportFunctions}
                props={
                    {
                        xAxis:
                        {
                            type : "datetime",
                            gridLineDashStyle: 'Dash',
                            lineWidth : 2,
                            gridLineWidth: 1, // Ensure grid line width is set
                            tickLength: 0,
                            gridLineColor: '#DFDFDF',
                            lineColor : "#DFDFDF",
                            tickInterval: 3600 * 1000 * 24, // 1 hours interval
                            labels: {
                                style: {
                                    color: '#062D59',
                                    fontSize: '12px'
                                }
                            },
                        },
                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: true,
                                    radius: 6,
                                    lineWidth: 2,
                                    symbol : "circle",
                                    lineColor: '#FFFFFF'
                                }
                            }
                            // series: {
                            //     point: {
                            //         events: {
                            //             // Use the 'afterAnimate' event to create markers after the chart is rendered
                            //             afterAnimate: function (this : any) {
                            //                 const point = this;
                            //                 const color = point.color;
                    
                            //                 // Create custom SVG for the marker
                            //                 const svg = `
                            //                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                         <circle opacity="0.25" cx="8" cy="8" r="8" fill="${color}"/>
                            //                         <circle cx="8" cy="8" r="3.5" fill="${color}" stroke="white"/>
                            //                     </svg>`;
                    
                            //                 // Create the marker as an image
                            //                 point.graphic = point.series.chart.renderer
                            //                     .image('data:image/svg+xml;utf8,' + encodeURIComponent(svg), point.plotX - 8, point.plotY - 8, 16, 16)
                            //                     .add(point.series.group);
                            //             }
                            //         }
                            //     }
                            // }
                        },
                    }
                }
            />
        </GraphLayout>
    );
};

export default InverterAvailabilityGraph