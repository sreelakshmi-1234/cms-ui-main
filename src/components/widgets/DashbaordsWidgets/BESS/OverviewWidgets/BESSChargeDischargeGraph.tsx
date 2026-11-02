import { useState } from "react";
import { EnlargeWidgetContent } from "../../../../../Services/EnlargeWidget";
import UseManyDeviceManyKeysChart from "../../../../../Services/Hooks/UseManyDeviceManyKeysChart";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import StackedColumnChart from "../../../charts/StackedColumnChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const BESSChargeDischargeGraph = () => {
    // ************************BESS Daily********************
    const {
        timeWindow: timeWindowBESSDaily,
        handleTimeWindowChange: handleTimeWindowBESSDailyChange,
        handleReset: BESSDailyHandleReset
    } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

    var searchTagBESSDaily = [{
        devName: "PCS",
        keys: "kWhcharged_Day,kWhdischarged_Day",
        type: ["column", "column"],
        name: ["Daily Cahrge (kWh)", "Daily Discharge (kWh)"]
    }];
    const BESSDailyColor = ["#7086FD", "#6FD195", "#B11F24", "#7F5B9F", "#F4B725"]
    const BESSDailyData = UseManyDeviceManyKeysChart(searchTagBESSDaily, timeWindowBESSDaily, "LastValue")?.map((series: object, index: number) => ({
        ...series,
        color: BESSDailyColor[index]
    }));
    // useEffect(() => {
    //     if (BESSDailyData) {
    //         console.log("BESSDailyData:", BESSDailyData);
    //     }
    // }, [BESSDailyData]);

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Daily Charge/Discharge'
            titleLengthSVG={200}
            titleLengthLongSVG={320}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowBESSDailyChange}
            onReset={BESSDailyHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <StackedColumnChart 
                height={300} 
                apiData={BESSDailyData || [{}]}
                onExportReady={setExportFunctions}
                props={
                    {
                        xAxis : {
                            tickInterval : 1000 * 60 * 60 * 24
                        },
                        legend : {
                            align : "center"
                        }
                    }
                }
            />
        </GraphLayout>
    );
};

export default BESSChargeDischargeGraph