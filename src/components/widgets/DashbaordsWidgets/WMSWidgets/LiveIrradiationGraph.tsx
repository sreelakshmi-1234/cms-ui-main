import { useRef, useState } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseManyDeviceSameKeyChart from "../../../../Services/Hooks/UseManyDeviceSameKeyChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import { formatInTimeZone } from "date-fns-tz";
import UseManyDeviceManyKeysChart from "../../../../Services/Hooks/UseManyDeviceManyKeysChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const LiveIrradiationGraph = () => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // ********************* Inverter Power *********************
    const {
        timeWindow: timeWindowInverterPower,
        handleTimeWindowChange: handleTimeWindowInverterPowerChange,
        handleReset: InverterPowerHandleReset,
        manualChanges
    } = useTimeHandle(16, "hour", "AVG", [5, "minute"]);


    var searchTagPowerCurve = [{ 
        devName : "WMS-1",
        keys : "Inst_POA,Inst_GHI",
        type : ["spline","spline"],
        name : ["POA W/m2","GHI W/m2"]
    }]
    const colors = ["#3CB4FF", "#FFBE3D", "#C45EFF", "#FF8C28", "#FFAE4C", "#FF3E98", "#FF68F5", "#A0C81F", "#33E2C2", "#1865FF", "#FF3E98"];
    const InverterPowerData = UseManyDeviceManyKeysChart(searchTagPowerCurve, timeWindowInverterPower)?.map((series : any, index : number) => {
        if(series.name == "POA W/m2") {
            return {
                ...series,
                color : "rgba(255, 174, 76, 1)"
            }
        } else if(series.name == "GHI W/m2") {
            return {
                ...series,
                color : "rgba(112, 134, 253, 1)"
            }
        } else {
            return {
                ...series,
                color : colors[index % colors.length]
            }
        }
    });
    /*useEffect(() => {
        if (InverterPowerData) {
            console.log("InverterPowerData:", InverterPowerData);
        }
    }, [InverterPowerData]);*/

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Live Irradiation'
            titleLengthSVG={110}
            titleLengthLongSVG={720}
            width={["100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowInverterPowerChange}
            onReset={InverterPowerHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <LineChart 
                height={300} 
                apiData={InverterPowerData || [{}]}
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
                            tickInterval: 60 * 60 * 2 * 1000, // 2 hours interval
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
        </GraphLayout>
    );
};

export default LiveIrradiationGraph