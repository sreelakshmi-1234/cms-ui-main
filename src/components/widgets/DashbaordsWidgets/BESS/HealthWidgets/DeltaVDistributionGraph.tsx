import { useState } from "react";
import { EnlargeWidgetContent } from "../../../../../Services/EnlargeWidget";
import UseBESSDaily from "../../../../../Services/Hooks/Battery/UseBESSDaily";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const DeltaVDistributionGraph = () => {
    // ************************Delta V Distribution********************
    const {
        timeWindow: timeWindowVDistribution,
        handleTimeWindowChange: handleTimeWindowVDistributionChange,
        handleReset: VDistributionHandleReset
    } = useTimeHandle(7, "day", "AVG", [1, "day"]);

    var searchTagVDistribution = {
        devName: "PCS",
        keys: "ESS_AVG_Line_Volt",
        type: ["column"],
        name: ["Percent %"]
    };
    const VDistributionColor = "#E370FD"
    const VDistributionData = UseBESSDaily(searchTagVDistribution, timeWindowVDistribution)?.map((series: object, index: number) => ({
        ...series,
        color: VDistributionColor
    }));

    // useEffect(() => {
    //     if (VDistributionData) {
    //         console.log("VDistributionData:", VDistributionData);
    //     }
    // }, [VDistributionData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Delta V Distribution'
            titleLengthSVG={170}
            titleLengthLongSVG={650}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowVDistributionChange}
            onReset={VDistributionHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <ColumnChart 
                height={300} 
                onExportReady={setExportFunctions}
                apiData={VDistributionData?.map((elem: any) => ({
                name: elem.name,
                type: elem.type,
                data: elem.data.map((elem: any) => [elem[0], parseFloat(((400 - parseFloat(elem[1])) / 400).toFixed(2))])

            })) || [{}]} />
        </GraphLayout>
    );
};

export default DeltaVDistributionGraph