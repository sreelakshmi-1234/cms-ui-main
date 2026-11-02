import { useState } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../../Services/EnlargeWidget";
import UseManyDeviceManyKeysChart from "../../../../../Services/Hooks/UseManyDeviceManyKeysChart";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }

const DailyDischargeEnergyGraph = () => {
    // is Chart in Full screen Mode
    const [inFullScreen, setInFullScreen]  = useState<boolean>(false);
    // ************************ DailDischargey********************
    const {
        timeWindow: timeWindowDailyDischarge,
        handleTimeWindowChange: handleTimeWindowDailyDischargeChange,
        handleReset: DailyDischargeHandleReset
    } = useTimeHandle(7, "day", "NONE", [1, "day"]);

    var searchTagDailyDischarge = [
        {
            devName: "PCS",
            keys: "ESS_SOC,ESS_DOD,ESS_SOH,kWhdischarged_Day",
            type: ["column", "column", "column", "area"],
            name: ["SOC %", "DOD %", "SOH %", "Discharge Energy (kW)"],
        }];
    const DailyDischargeColor = ["#FD7070", "#6FD195", "#FFAE4C", "#4C9AFF", "#F4B725"];
    const DailyDischargeData = UseManyDeviceManyKeysChart(searchTagDailyDischarge, timeWindowDailyDischarge, "lastValue")?.map((series: any, index: number) => {
        if(series?.name == "Discharge Energy (kW)") {
            return {
                ...series,
                lineColor: "rgba(76, 154, 255, 1)", // Spline Color
                fillColor: {
                    linearGradient: [0, 0, 0, !inFullScreen ? 200 : EnlargeWidgetSize(700)], // Adjust the height based on your container
                    stops: [
                        [0, 'rgba(76, 154, 255, 0.3)'],
                        [1, 'rgba(76, 154, 255, 0.05)']
                    ]
                },
                marker: {
                    enabled: true,
                    symbol: 'sqaure',
                    fillColor: 'rgba(76, 154, 255, 1)', // Marker color
                    lineColor: "white", // Marker border color
                    lineWidth: 2,
                    // radius: 6 // Adjust the size of the markers
                },
            }
        } else {
            return {
                ...series,
                color: DailyDischargeColor[index]
            }
        }
    });

    /** search for multiple agg API= [
        { 
            devName : "PCS", 
            keys: "ESS_SOC,ESS_DOD,ESS_SOH",
            type : ["column", "column", "column"],
            name : ["SOC", "DOD", "SOH"],
            agg : timeWindowDailyDischarge.aggregate
        },
        {
            devName : "PCS", 
            keys: "kWhdischarged_Day",
            type : ["spline"],
            name : ["Discharge Energy"],
            agg : "LAST"
        }
    ]; */

    // useEffect(() => {
    //     if (DailyDischargeData) {
    //         console.log("DailyDischargeData:", DailyDischargeData);
    //     }
    // }, [DailyDischargeData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

    return (
        <GraphLayout
            title='Daily Discharge Energy'
            titleLengthSVG={190}
            titleLengthLongSVG={330}
            width={["100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowDailyDischargeChange}
            onReset={DailyDischargeHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <ColumnChart 
                height={300} 
                apiData={DailyDischargeData || [{}]}
                inFullScreen={setInFullScreen}
                xAxisInterval={3600 * 1000}
                onExportReady={setExportFunctions}
            />
        </GraphLayout>
    );
};

export default DailyDischargeEnergyGraph