import { FaChartColumn } from "react-icons/fa6";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import { EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import ColumnChart from "../../charts/ColumnChart";
import UseManyDeviceManyKeysChart from "../../../../Services/Hooks/UseManyDeviceManyKeysChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import { useState } from "react";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const DailyEnergy = () => {
    // is Chart in Full screen Mode
    const [inFullScreen, setInFullScreen]  = useState<boolean>(false);

    // ********************* Daily Energy Graph *********************
    const {
        timeWindow: timeWindowPowerColumn,
        handleTimeWindowChange: handleTimeWindowPowerColumnChange,
        handleReset: PowerColumnHandleReset
    } = useTimeHandle(6, "day", "NONE", [5, "minute"]);

    
    var searchTagPowerColumn = [
        {
            devName : "Calculation",
            keys : "PV_Daily_Energy_Today,DG_Total_Energy,Generation_Loss", //Node_Generation_Loss_BP : PG API doesn't work
            type : ["column","column","column"],
            name : ["PV Daily Energy (kWh)","DG Daily Energy (kWh)", "Generation Loss"]   
        }, 
        {
            devName : "PCS-1",      // This tag would be addition of all PCS, so it will be in calculation
            keys : "kWhdischarged_Day",
            type : ["column"],
            name : ["Battery Discharge (kWh)"]
        },
        {
            devName : "Grid Meter-",      
            keys : "Grid_Daily_Energy_Export_kWh",
            type : ["column"],
            name : ["Grid Consumption (kWh)"],
            multiple : true
        }
    ];
    
    // Colors
    // PV => rgba(111, 209, 149, 1)
    // ESS => rgba(7, 219, 250, 1) => #16FFE4
    // DG => rgba(112, 134, 253, 1)
    // GRID Feed => rgba(112, 134, 253, 1) => #7086FD
    // GRID Consumption => rgba(255, 174, 76, 1) => #FFAE4C  EXCLUDED Date 4/5/25

    const colors = ["#3CB4FF", "#FFBE3D", "#C45EFF", "#FF8C28", "#FFAE4C", "#FF3E98", "#FF68F5", "#A0C81F", "#33E2C2", "#1865FF", "#FF3E98"];
    const rgbaColors =[
        "rgba(60, 180, 255, ?)",
        "rgba(255, 190, 61, ?)",
        "rgba(196, 94, 255, ?)",
        "rgba(255, 140, 40, ?)",
        'rgba(255, 174, 76, ?)',
        "rgba(255, 62, 152, ?)",
        "rgba(255, 104, 245, ?)",
        "rgba(160, 200, 31, ?)",
        "rgba(51, 226, 194, ?)",
        "rgba(24, 101, 255, ?)",
        "rgba(255, 62, 152, ?)"
      ]
    
    const PowerColumnData = UseManyDeviceManyKeysChart(searchTagPowerColumn, timeWindowPowerColumn, "LastValue")?.map((series : any, index : number) => {
        if(series.name == "PV Daily Energy (kWh)") {
            return {
                ...series,
                color : "rgba(111, 209, 149, 1)"
            }
        } else if(series.name == "DG Daily Energy (kWh)") {
            return {
                ...series,
                color : "rgba(112, 134, 253, 1)"
            }
        } else if(series.name == "Battery Discharge (kWh)") {
            return {
                ...series,
                color : "#16FFE4"
            }
        
        } else {
            return {
                ...series,
                color : colors[index % colors.length]
            }
        }
    });
    // useEffect(() => {
    //     if (PowerColumnData) {
    //         console.log("PowerColumnData:", PowerColumnData);
    //     }
    // }, [PowerColumnData]);

    const chartHeight = EnlargeWidgetSize(300);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   
    return (
        <GraphLayout
            title='Daily Energy'
            width={["full", "100%"]}
            height='100%'
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowPowerColumnChange}
            onReset={PowerColumnHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <ColumnChart 
                height={chartHeight}
                apiData={PowerColumnData || [{}]} 
                onExportReady={setExportFunctions}
                inFullScreen={setInFullScreen}
                // props={
                //     {
                //         tooltip : {
                //             shared : true,

                //         }
                //     }
                // }
            />
        </GraphLayout>
    )
};

export default DailyEnergy