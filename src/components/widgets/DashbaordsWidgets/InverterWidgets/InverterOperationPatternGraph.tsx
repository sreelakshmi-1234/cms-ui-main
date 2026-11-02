import { useState } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseGanttChart from "../../../../Services/Hooks/UseGanttChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import GanttChart from "../../charts/GanttChart";


// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterOperationPatternGraph = () => {
    // ********************* Inverter Operation Controll *********************
    const {
        timeWindow: timeWindowOperationControll,
        handleTimeWindowChange: handleTimeWindowOperationControllChange,
        handleReset: OperationControllHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);


    var searchTagOperationControll = {
        devName: "Inverter",
        keys: "AC_Active_Power_Watt",
        name: "INV-"
    };

    var OperationControllData = UseGanttChart(searchTagOperationControll, timeWindowOperationControll) || [];

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Operation Pattern'
            titleLengthSVG={140}
            titleLengthLongSVG={375}
            initTimeTitle='Current Day'
            width={["full", "100%"]}
            height={["100%"]}
            // timeWindow={true}
            onTimeWindowChange={handleTimeWindowOperationControllChange}
            onReset={OperationControllHandleReset}
            fullScreen={true}
            downloadOption={true}
            onExport={exportFunctions}
        >
            <GanttChart 
                height={310} 
                apiData={OperationControllData} 
                onExportReady={setExportFunctions}
            />
        </GraphLayout>
    );
};

export default InverterOperationPatternGraph