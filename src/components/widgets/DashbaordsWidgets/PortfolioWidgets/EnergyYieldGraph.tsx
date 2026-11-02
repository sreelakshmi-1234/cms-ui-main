import { FaChartColumn } from "react-icons/fa6";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import ColumnLineChart from "../../charts/ColumnLineChart";
import { EnlargeWidgetContent } from "../../../../Services/EnlargeWidget";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import UseColumnLine from "../../../../Services/Hooks/UseColumnLine";
import ColumnChart from "../../charts/ColumnChart";
import { useState } from "react";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }

const EnergyYieldGraph = () => {
    // ***********************Energy Yield******************
    // var textSearch = "portfolio";
    // const type = { // Line for PV PR only
    //     column : "PV_Portfolio_Energy,Grid_Portfolio_Daily_Energy_Export",
    //     line : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Energy_Total_kWh,B1_Inverter_Inverter_1_Frequency_Hz,B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Energy_Total_kWh,B1_Inverter_Inverter_1_Frequency_Hz,B1_Inverter_Inverter_1_Energy_Total_kWh",
    // };
    // const ColumnLineData = UseColumnLine(textSearch, type) || [{}];

    const {
        timeWindow: timeWindowEnergyYield,
        handleTimeWindowChange: handleTimeWindowEnergyYieldChange,
        handleReset: EnergyYieldHandleReset
    } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

    var searchTagEnergyYield = {
        devName: "portfolio",
        keys: "PV_Portfolio_Energy,Grid_Portfolio_Daily_Energy_Export",
        type: ["bar", "bar"],
        name: ["Daily Generation (kWh)", "Daily Consumption (kWh)"]
    };
    const colors = ["#7086FD", "#6FD195"]
    const ColumnLineData = UseColumnLine(searchTagEnergyYield, timeWindowEnergyYield)?.map((series : any, index) => (
        {
            ...series,
            color : colors[index]
        }
    ));
    
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

    return (
        <GraphLayout
            title="Energy Yield"
            titleLengthSVG={90}
            titleLengthLongSVG={720}
            initTimeTitle="Last 7 Days"
            width={["full", "100%"]}
            height={"100%"}
            // icon={FaChartColumn}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowEnergyYieldChange}
            onReset={EnergyYieldHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <ColumnChart 
                height={300} 
                apiData={ColumnLineData || [{}]} // column line = energy yield
                onExportReady={setExportFunctions}
            />
        </GraphLayout>
    );
};

export default EnergyYieldGraph