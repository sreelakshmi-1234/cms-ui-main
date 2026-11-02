import { useState, useRef, useEffect } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import UseBESSDaily from "../../../../Services/Hooks/Battery/UseBESSDaily";
import DateFormatter from "../DateFormatter";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const DGFuelCunsumptionGraph = () => {
    // ********************* Fuel Consumption *********************
    const {
        timeWindow: timeWindowFuelConsumtion,
        handleTimeWindowChange: handleTimeWindowFuelConsumtionChange,
        handleReset: FuelConsumtionHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);


    var searchTagFuelConsumtion = {
        devName: "Calculation",
        keys: "Diesel_used_current_load",
        type: ["spline"],
        name: ["Fuel Consumption (Litres)"]
    };
    const FuelConsumtionColor = ["#A068E6", "#03BB7D", "#1284C0"] // 3 keys
    const FuelConsumtionData = UseBESSDaily(searchTagFuelConsumtion, timeWindowFuelConsumtion)?.map((series: object, index: number) => ({
        ...series,
        color: FuelConsumtionColor[index]
    }));
    // useEffect(() => {
    //     if (FuelConsumtionData) {
    //         console.log("FuelConsumtionData:", FuelConsumtionData);
    //     }
    // }, [FuelConsumtionData]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [dateRight, setDateRight] = useState(300);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

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
            title='Fuel Cunsumption'
            titleLengthSVG={145}
            titleLengthLongSVG={370}
            width={["100%"]}
            height={["100%"]}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowFuelConsumtionChange}
            onReset={FuelConsumtionHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowFuelConsumtion?.startTs}
                    onDateChange={(start: string, end: string) => {
                        handleTimeWindowFuelConsumtionChange(
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
                    apiData={FuelConsumtionData || [{}]}
                    xAxisInterval={1000*60*60}
                    onExportReady={setExportFunctions}
                    props= {
                        {
                        chart: {
                            zoomType: 'x',
                            style: {
                                fontFamily: 'Montserrat, sans-serif',
                                color: "#062D59"
                              },
                            plotBorderWidth: 0,
                            plotBorderColor: '#DFDFDF',
                            plotBorderDashStyle: 'Dash',
                            className : "dashed-border"
                        },
                        title: {
                            text: '',
                        },
                        xAxis: {
                            type: 'datetime',
                            crosshair: true,
                            labels : {
                                enabled : true,
                                style: {
                                    color: '#062D59',
                                    fontSize: '12px'
                                }
                            },
                            dateTimeLabelFormats: {
                                month: '%b %y', // Custom format for months
                                year: '%Y' // Format for years if needed
                            },
                            tickLength: 0,
                            lineColor : "rgba(0,0,0,0.5)",
                        },
                        yAxis : {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'Dash',
                            gridLineColor: '#DFDFDF',
                        }
                    }
                }
            />
            </div>
        </GraphLayout>
    );
};

export default DGFuelCunsumptionGraph