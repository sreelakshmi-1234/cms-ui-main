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

const SoCCharGraph = () => {
    // ****************** MIN MAX SOC*******************
    const {
        timeWindow: timeWindowMinMax,
        handleTimeWindowChange: handleTimeWindowMinMaxChange,
        handleReset: MinMaxHandleReset
    } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

    var searchTagMinMax = {
        devName: "PCS",
        keys: "ESS_SOC",
        type: ["spline"],
        name: ["SoC %"]
    };
    const MinMaxColor = ["#3853A5", "#F4B725"];
    const MinMaxData = UseBESSDaily(searchTagMinMax, timeWindowMinMax)?.map((series: object, index: number) => ({
        ...series,
        color: MinMaxColor[index]
    }));
    // useEffect(() => {
    //     if (MinMaxData) {
    //         console.log("MinMaxData:", MinMaxData);
    //     }
    // }, [MinMaxData]);

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
            title='SoC Characteristics' // previous => Min mAx Soc
            titleLengthSVG={160}
            titleLengthLongSVG={360}
            width={["100%", "100%"]}
            height={"100%"}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowMinMaxChange}
            onReset={MinMaxHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowMinMax?.startTs}   //  SYNC FIX
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowMinMaxChange(
                            start,
                            end,
                            "NONE",
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
                    apiData={MinMaxData || [{}]}
                    onExportReady={setExportFunctions}
                    props={{
                        xAxis: {
                            type: 'datetime',
                            crosshair: true,
                            labels: {
                                enabled: true,
                                style: {
                                    color: '#062D59',
                                    fontSize: '12px'
                                }
                            },
                            dateTimeLabelFormats: {
                                month: '%b %y',
                                year: '%Y'
                            },
                            tickLength: 0,
                            lineColor: "rgba(0,0,0,0.5)",
                        },
                        yAxis: {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'Dash',
                            gridLineColor: '#DFDFDF',
                        },
                    }}
                />
            </div>
        </GraphLayout>
    );
};

export default SoCCharGraph