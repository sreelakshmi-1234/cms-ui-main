
import { useState } from "react";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";
import UseManyDeviceManyKeysChart from "../../../../../Services/Hooks/UseManyDeviceManyKeysChart";


// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const POAvsScbStringCurrentGraph = () => {
    // ********************* POA vs DC Current *********************
    const {
        timeWindow: timeWindowPoaDcCurrent,
        handleTimeWindowChange: handleTimeWindowPoaDcCurrentChange,
        handleReset: PoaDcCurrentHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);


    var searchTagPoaDcCurrent = [
        {
            devName: 'WMS.WMS-',
            keys: "Inst_POA",
            type: ["spline"],
            name: ["POA.W/m2"],
            multiple: true
        },
        {
            devName : 'SMB-',
            keys : "Total_Amps",
            type : ["spline"],
            name : ["SMB"],
            multiple : true
        }
    ];
    const PoaDcCurrentData = UseManyDeviceManyKeysChart(searchTagPoaDcCurrent, timeWindowPoaDcCurrent)?.map((series : any, index : number) => {
        if(series.name.includes("DC.Amps")) {
            return {
                ...series,
                yAxis : 1,
                opposite : true
            }
        } else {
            return {
                ...series,
            }
        }
    });
    // useEffect(() => {
    //     if (PoaDcCurrentData) {
    //         console.log("PoaDcCurrentData:", PoaDcCurrentData);
    //     }
    // }, [PoaDcCurrentData]);

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='POA vs DC Current'
            titleLengthSVG={150}
            titleLengthLongSVG={680}
            width={["100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowPoaDcCurrentChange}
            onReset={PoaDcCurrentHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <LineChart
                height={300} 
                apiData={PoaDcCurrentData || [{}]}
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
                        yAxis : [{
                            gridLineWidth: 1,
                            gridLineDashStyle: 'Dash',
                            gridLineColor: '#DFDFDF',
                        },
                        {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'Dash',
                            gridLineColor: '#DFDFDF',
                            opposite: true,
                            title: {
                                text: ''
                            }
                        }]
                    }
                }
            />
        </GraphLayout>
    );
};

export default POAvsScbStringCurrentGraph