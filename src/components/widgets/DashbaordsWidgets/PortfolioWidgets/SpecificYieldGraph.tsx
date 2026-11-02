import { useState } from "react";
import { EnlargeWidgetContent } from "../../../../Services/EnlargeWidget";
import UsePlantsManyDeviceSameKey from "../../../../Services/Hooks/UsePlantsManyDeviceSameKey";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import BarChart from "../../charts/BarChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }

const SpecificYieldGraph = () => {
    // ********************Specific Yield / Ranking Bar Chart ********************

    const {
        timeWindow: timeWindowSpecific,
        handleTimeWindowChange: handleTimeWindowSpecificChange,
        handleReset: SpecificHandleReset
    } = useTimeHandle(5, "mintue", "AVG", [5, "minute"]);
    var typeSpecific = "bar"
    var searchSpecific = { calculation: "Specific_Yield" };      //"BP_Plant_Daily_Energy"; this was previous tag
    const specificYieldData = UsePlantsManyDeviceSameKey(typeSpecific, searchSpecific, [""], timeWindowSpecific)?.map((series : any) => (
        {
            ...series,
            pointWidth: 35
        }
    ));

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

    return (
        <GraphLayout
            title="Specific Yield"
            initTimeTitle="Current Day"
            titleLengthLongSVG={720}
            width={["full", "100%"]}
            height={"100%"}
            fullScreen={true}
            onTimeWindowChange={handleTimeWindowSpecificChange}
            onExport={exportFunctions}
        >
            <BarChart apiData={specificYieldData || [{}]}
                barColors={["#0086CC", "#03BB7D"]}
                height={300}
                onExportReady={setExportFunctions}
                props={{
                    tooltip: {
                        formatter: function (this: any) {
                            var points = this.points.map(function (point: any) {
                                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b>';
                            });
                            return '<br/>' + points.join('<br/>');
                        }
                    },
                    xAxis : {
                        tickAmount : 6
                    }
                }}
            />
        </GraphLayout>
    );
};

export default SpecificYieldGraph