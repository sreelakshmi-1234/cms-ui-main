import { useState } from "react";
import { EnlargeWidgetContent } from "../../../../../Services/EnlargeWidget"
import UseCandleStickChart from "../../../../../Services/Hooks/UseCandleStickChart";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout"
import CandlestickChart from "../../../charts/CandlestickChart"

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const TempDistributionGraph = () => {
    // ************************Temp Distribution********************
    const {
        timeWindow: timeWindowTrend,
        handleTimeWindowChange: handleTimeWindowTrendChange,
        handleReset: TrendHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);

    var searchTagTrend = [
        {
            devName: "PCS",
            keys: "B1_Inverter_Inverter_1_AC_Active_Power_Watt",
            type: ["candlestick"],
            name: ["Daily Energy 1"]
        },
        // {
        //     devName : "Inverter-2",
        //     keys : "B1_Inverter_Inverter_2_AC_Active_Power_Watt",
        //     type : ["candlestick"],
        //     name : ["Daily Energy 2"]  
        // }
    ];
    const TrendData = UseCandleStickChart(searchTagTrend, timeWindowTrend);
    // useEffect(() => {
    //     if (TrendData) {
    //         console.log("TrendData:", TrendData);
    //     }
    // }, [TrendData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Temperature Distribution'
            titleLengthSVG={210}
            titleLengthLongSVG={620}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowTrendChange}
            onReset={TrendHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <CandlestickChart
                height={295}
                onExportReady={setExportFunctions}
                apiData={TrendData || [{
                    name: "Temp",
                    type: "candlestick",
                    color: '#3C5FC5', // Sky blue color for the candlesticks
                    upColor: '#3C5FC5', // Color for up days (when the close is higher than the open)
                    downColor: '#3C5FC5',
                    data: [
                        [1675056000000, 19.0, 20.5, 18.5, 19.5],    // 12:00 AM - 12:30 AM
                        [1675057800000, 19.5, 21.0, 19.0, 20.0],    // 12:30 AM - 1:00 AM
                        [1675059600000, 20.0, 22.0, 19.5, 21.0],    // 1:00 AM - 1:30 AM
                        [1675061400000, 21.0, 22.5, 20.5, 22.0],    // 1:30 AM - 2:00 AM
                        [1675063200000, 22.0, 23.0, 21.5, 22.5],    // 2:00 AM - 2:30 AM
                        [1675065000000, 22.5, 23.5, 22.0, 23.0],    // 2:30 AM - 3:00 AM
                        [1675066800000, 23.0, 24.0, 22.5, 23.5],    // 3:00 AM - 3:30 AM
                        [1675068600000, 23.5, 24.5, 23.0, 24.0],    // 3:30 AM - 4:00 AM
                        [1675070400000, 24.0, 25.0, 23.5, 24.5],    // 4:00 AM - 4:30 AM
                        [1675072200000, 24.5, 25.5, 24.0, 25.0],    // 4:30 AM - 5:00 AM
                        [1675074000000, 25.0, 26.0, 24.5, 25.5],    // 5:00 AM - 5:30 AM
                        [1675075800000, 25.5, 26.5, 25.0, 26.0],    // 5:30 AM - 6:00 AM
                        [1675077600000, 26.0, 27.0, 25.5, 26.5],    // 6:00 AM - 6:30 AM
                        [1675079400000, 26.5, 27.5, 26.0, 27.0],    // 6:30 AM - 7:00 AM
                        [1675081200000, 27.0, 28.0, 26.5, 27.5],    // 7:00 AM - 7:30 AM
                        [1675083000000, 27.5, 28.5, 27.0, 28.0],    // 7:30 AM - 8:00 AM
                        [1675084800000, 28.0, 29.0, 27.5, 28.5],    // 8:00 AM - 8:30 AM
                        [1675086600000, 28.5, 29.5, 28.0, 29.0],    // 8:30 AM - 9:00 AM
                        // [1675088400000, 29.0, 30.0, 28.5, 29.5],    // 9:00 AM - 9:30 AM
                        // [1675090200000, 29.5, 30.5, 29.0, 30.0],    // 9:30 AM - 10:00 AM
                        // [1675092000000, 30.0, 31.0, 29.5, 30.5],    // 10:00 AM - 10:30 AM
                        // [1675093800000, 30.5, 31.5, 30.0, 31.0],    // 10:30 AM - 11:00 AM
                        // [1675095600000, 31.0, 32.0, 30.5, 31.5],    // 11:00 AM - 11:30 AM
                        // [1675097400000, 31.5, 32.5, 31.0, 32.0],    // 11:30 AM - 12:00 PM
                        // [1675170000000, 32.0, 33.0, 31.5, 32.5],    // 12:00 PM - 12:30 PM
                        // [1675171800000, 32.5, 33.5, 32.0, 33.0],    // 12:30 PM - 1:00 PM
                        // [1675173600000, 33.0, 34.0, 32.5, 33.5],    // 1:00 PM - 1:30 PM
                        // [1675175400000, 33.5, 34.5, 33.0, 34.0],    // 1:30 PM - 2:00 PM
                        // [1675177200000, 34.0, 35.0, 33.5, 34.5],    // 2:00 PM - 2:30 PM
                        // [1675179000000, 34.5, 35.5, 34.0, 35.0],    // 2:30 PM - 3:00 PM
                        // [1675180800000, 35.0, 36.0, 34.5, 35.5],    // 3:00 PM - 3:30 PM
                        // [1675182600000, 35.5, 36.5, 35.0, 36.0],    // 3:30 PM - 4:00 PM
                        // [1675184400000, 36.0, 37.0, 35.5, 36.5],    // 4:00 PM - 4:30 PM
                        // [1675186200000, 36.5, 37.5, 36.0, 37.0],    // 4:30 PM - 5:00 PM
                        // [1675188000000, 37.0, 38.0, 36.5, 37.5],    // 5:00 PM - 5:30 PM
                        // [1675189800000, 37.5, 38.5, 37.0, 38.0],    // 5:30 PM - 6:00 PM
                        // [1675191600000, 38.0, 39.0, 37.5, 38.5],    // 6:00 PM - 6:30 PM
                        // [1675193400000, 38.5, 39.5, 38.0, 39.0],    // 6:30 PM - 7:00 PM
                        // [1675195200000, 39.0, 40.0, 38.5, 39.5],    // 7:00 PM - 7:30 PM
                        // [1675197000000, 39.5, 40.5, 39.0, 40.0],    // 7:30 PM - 8:00 PM
                        // [1675198800000, 40.0, 41.0, 39.5, 40.5],    // 8:00 PM - 8:30 PM
                        // [1675200600000, 40.5, 41.5, 40.0, 41.0],    // 8:30 PM - 9:00 PM
                        // [1675202400000, 41.0, 42.0, 40.5, 41.5],    // 9:00 PM - 9:30 PM
                        // [1675204200000, 41.5, 42.5, 41.0, 42.0],    // 9:30 PM - 10:00 PM
                        // [1675206000000, 42.0, 43.0, 41.5, 42.5],    // 10:00 PM - 10:30 PM
                        // [1675207800000, 42.5, 43.5, 42.0, 43.0],    // 10:30 PM - 11:00 PM
                        // [1675209600000, 43.0, 44.0, 42.5, 43.5],    // 11:00 PM - 11:30 PM
                        // [1675211400000, 43.5, 44.5, 43.0, 44.0],    // 11:30 PM - 12:00 AM
                    ]
                }]}
            />
        </GraphLayout>
    );
};

export default TempDistributionGraph