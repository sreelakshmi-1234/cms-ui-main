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

const CurrentKPIGraph = () => {
    // ********************* Grid Current *********************
    const {
        timeWindow: timeWindowGridCurrent,
        handleTimeWindowChange: handleTimeWindowGridCurrentChange,
        handleReset: GridCurrentHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);


    var searchTagGridCurrent = {
        devName: "PCS",
        keys: "ESS_Ph_A_Amps_Total_PCS,ESS_Ph_B_Amps_Total_PCS,ESS_Ph_C_Amps_Total_PCS,BESS1_PF",
        type: ["spline", "spline", "spline", "spline"],
        name: ["L1 AMP", "L2 AMP", "L3 AMP", "PF"]
    };
    const GridCurrentData = UseBESSDaily(searchTagGridCurrent, timeWindowGridCurrent);
    // useEffect(() => {
    //     if (GridPowerData) {
    //         console.log("GridPowerData:", GridPowerData);
    //     }
    // }, [GridPowerData]);
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
            title='Current'
            titleLengthSVG={60}
            titleLengthLongSVG={450}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowGridCurrentChange}
            onReset={GridCurrentHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowGridCurrent?.startTs}
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowGridCurrentChange(
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
                    apiData={GridCurrentData || [{}]}
                    onExportReady={setExportFunctions}
                />
            </div>
        </GraphLayout>
    );
};

export default CurrentKPIGraph