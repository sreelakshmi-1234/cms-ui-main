import { useState, useRef, useEffect } from "react";
import { EnlargeWidgetContent } from "../../../../../Services/EnlargeWidget";
import UseBESSDaily from "../../../../../Services/Hooks/Battery/UseBESSDaily";
import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";
import DateFormatter from "../../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }

const VoltHzGraph = () => {
    // ********************* Voltage & Hz *********************
    const {
        timeWindow: timeWindowVolt,
        handleTimeWindowChange: handleTimeWindowVoltChange,
        handleReset: VoltHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);


    var searchTagVolt = {
        devName: "PCS", // cal
        keys: "ESS_Ph_AB_Volt_Total_PCS,ESS_Ph_BC_Volt_Total_PCS,ESS_Ph_CA_Volt_Total_PCS,HZ_L1,HZ_L2,HZ_L3",
        type: ["spline", "spline", "spline", "spline", "spline", "spline"],
        name: ["line-1 V", "line-2 V", "line-3 V", "L1 Hz", "L2 Hz", "L3 Hz"]
    };
    const VoltData = UseBESSDaily(searchTagVolt, timeWindowVolt);
    // useEffect(() => {
    //     if (VoltData) {
    //         console.log("VoltData:", VoltData);
    //     }
    // }, [VoltData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [dateRight, setDateRight] = useState(300);

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            const width = entries[0].contentRect.width;
            if (width > 1200) setDateRight(860);
            else setDateRight(200);
        });

        if (wrapperRef.current) observer.observe(wrapperRef.current);
        return () => observer.disconnect();
    }, []);
    return (
        <GraphLayout
            title='Voltage & Hz'
            width={["100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowVoltChange}
            onReset={VoltHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowVolt?.startTs}   //  SYNC FIX
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowVoltChange(
                            start,
                            end,
                            "AVG",
                            5 * 60 * 1000,
                            {
                                selectedTab: "history",
                                live: { intervalResolution: 5 * 60 * 1000 }
                            } as any
                        );
                    }}
                />

                <LineChart 
                    height={300} 
                    apiData={VoltData || [{}]} 
                    onExportReady={setExportFunctions}
                />
            </div>
        </GraphLayout>
    );
};


export default VoltHzGraph