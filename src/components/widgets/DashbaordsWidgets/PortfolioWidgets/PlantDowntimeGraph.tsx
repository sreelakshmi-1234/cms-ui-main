import { lazy, Suspense, useState } from "react";
import { EnlargeWidgetContent } from "../../../../Services/EnlargeWidget";
import UsePlantsManyDeviceSameKey from "../../../../Services/Hooks/UsePlantsManyDeviceSameKey";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import { Box } from "@chakra-ui/react";
const DonutPieChart = lazy(() => import("../../charts/DonutPieChart"));
const jp = require('jsonpath');

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }


const PlantDowntimeGraph = () => {
    // ********************* Plant Downtime *********************
    const {
        timeWindow: timeWindowPlantDowntime,
        handleTimeWindowChange: handleTimeWindowPlantDowntimeChange,
        handleReset: PlantDowntimeHandleReset
    } = useTimeHandle(1, "cmsf", "COUNT", [1, "month"]);


    var textSearchPlantDowntime = [""];
    var searchTagsPlantDowntime = {
        calculation: "Plant_Down_instance"
    }
    var PlantDowntimeType = "pie"

    const PlantDowntime = UsePlantsManyDeviceSameKey(PlantDowntimeType, searchTagsPlantDowntime, textSearchPlantDowntime, timeWindowPlantDowntime);
    const PlantDowntimePieFormat = PlantDowntime?.map((series : any) => ({
        name : series.name,
        y : series.data[0] * 5   
    }));
    const PlantDowntimeValues = PlantDowntime ? (jp.query(PlantDowntime, "$..data")).flat(1) : [0];
    const AVGPlantDowntime = PlantDowntimeValues.reduce((sum: number, current: number) => { return sum + current })  // / PlantDowntimeValues.length;
    // console.log(PlantDowntime? jp.query(PlantDowntime, "$..data") : []);
    // console.log("AVGPlantDowntime :", AVGPlantDowntime)

    // ********* Runtime Format hr:min ********
    function runtimeFormat(runtime: number): string {
        // Get the total number of hours
        const hour = Math.floor(runtime / 60);

        // Get the remaining minutes
        const min = Math.round(runtime % 60);

        // Return formatted result
        return `${hour}h ${min}m`;
    };

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

    return (
        <Suspense fallback={<div style={{position:"relative", top : "45%", left : "45%"}}>Loading...</div>}>
            <DonutPieChart
                height={250}
                apiData={PlantDowntimePieFormat || [{}]}
                name="Monthly (min)"
                legends={false}
                title={`Portfolio Downtime: ${runtimeFormat(AVGPlantDowntime * 5)}`}
                titleAlign="center"
                titleVerticalAlign="bottom"
                plotOptionDataEnabled={true}
                pieColors={["#8CDAAA", "#82B2FF", "#39E2FB", "#FFAE4C",'#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                    '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                    '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                    '#03c69b', '#00f194']}
            />
        </Suspense>
    );
};

export default PlantDowntimeGraph