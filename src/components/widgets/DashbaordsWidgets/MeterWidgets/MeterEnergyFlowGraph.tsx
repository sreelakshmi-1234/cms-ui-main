import { useState } from "react";
import UseManyDeviceManyKeysChart from "../../../../Services/Hooks/UseManyDeviceManyKeysChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../charts/ColumnChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const MeterEnergyFlowGraph = () => {
    // ********************* Grid Energy Flow *********************
    const {
        timeWindow: timeWindowGridEnergy,
        handleTimeWindowChange: handleTimeWindowGridEnergyChange,
        handleReset: GridEnergyHandleReset
    } = useTimeHandle(7, "day", "NONE", [5, "minute"]);


    var searchTagGridEnergy = [{
        devName: localStorage.getItem("currentOtherMeter") || "Meter.Load Meter-1",
        keys: "Daily_Energy_Export_kWh,Daily_Energy_Import_kWh",
        type: ["column", "column"],
        name: ["Consumption kWh", "Feed kWh"]
    },
    {
        devName: "Calculation",
        keys: "PV_Contribution,DG_Contribution,PCS_Contribution",
        type: ["spline", "spline", "spline"],
        name: ["PV %", "DG %", "BESS %"]
    }];
    const GridEnergyColors = ["#DA594D", "#35CB6E", "#324AFF", "#FF9130", "#CD5AFF"]
    const GridEnergyData = UseManyDeviceManyKeysChart(searchTagGridEnergy, timeWindowGridEnergy, "LastValue")?.map((series: any, index: number) => {
        if (series.name == "Consumption kWh") {
            return {
                ...series,
                color: "#DA594D"
            }
        }
        else if (series.name == "Feed kWh") {
            return {
                ...series,
                color: "#35CB6E"
            }
        }
        else if (series.name == "PV %") {
            return {
                ...series,
                color: "#324AFF",
                yAxis: 1
            }
        }
        else if (series.name == "DG %") {
            return {
                ...series,
                color: "#FF9130",
                yAxis: 1
            }
        }
        else if (series.name == "BESS %") {
            return {
                ...series,
                color: "#CD5AFF",
                yAxis: 1
            }
        }
    });
    // useEffect(() => {
    //     if (GridEnergyData) {
    //         console.log("GridEnergyData:", GridEnergyData);
    //     }
    // }, [GridEnergyData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Energy Flow'
            titleLengthSVG={100}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowGridEnergyChange}
            onReset={GridEnergyHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <ColumnChart
                height={300}
                apiData={GridEnergyData || [{}]}
                onExportReady={setExportFunctions}
                props=
                {
                    {
                        yAxis: [{
                            title: {
                                text: ""
                            },
                        }, {
                            title: {
                                text: ""
                            },
                            tickAmount : 6,
                            opposite: true
                        }],
                        legend : {
                            useHTML : true,
                            itemStyle : {
                                // display:"inline-block",
                                overflow : "auto",
                                color: '#062D59',
                                fontSize: '12px'
                            },
                            symbolHeight: 0,    // This helps to remove default legends
                            symbolWidth: 0, // This helps to remove default legends
                            labelFormatter: function(this : any) {
                                return '<span style="display:inline-block;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                   '<circle opacity="0.25" cx="8" cy="11" r="8" fill="' + this.color + '"/>' +
                                   '<circle cx="8" cy="11" r="3.5" fill="' + this.color + '" stroke="white"/>' +
                                   '</svg></span> ' + this.name;
                            },
                            navigation: {
                                enabled: true,
                            }   
                        },
                    }
                }
            />
        </GraphLayout>
    );
};

export default MeterEnergyFlowGraph