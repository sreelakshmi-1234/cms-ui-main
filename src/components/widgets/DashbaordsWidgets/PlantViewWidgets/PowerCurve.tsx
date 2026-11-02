import { FaChartArea } from "react-icons/fa";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import { EnlargeHeight, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import AreaSplineChart from "../../charts/AreaSplineChart";
import UseManyDeviceManyKeysChart from "../../../../Services/Hooks/UseManyDeviceManyKeysChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import { useEffect, useState, useRef } from "react";
import DateFormatter from "../DateFormatter";
import LineChart from "../../charts/LineChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }

const PowerCurve = () => {
    // is Chart in Full screen Mode
    const [inFullScreen, setInFullScreen]  = useState<boolean>(false);

    // ********************* Power Curve *********************
    const [Data, setData] = useState<Object[] | undefined>(undefined);
    const {
        timeWindow: timeWindowPowerCurve,
        handleTimeWindowChange: handleTimeWindowPowerCurveChange,
        handleReset: PowerCurveHandleReset
    } = useTimeHandle(12, "hour", "AVG", [60, "minute"]);

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

    
    var searchTagPowerCurve = [{ 
        devName : "Calculation",
        keys : "INV_Total_Power,DG_Total_Power,Load_Power,PCS_Total_Power",
        type : ["areaspline","areaspline", "areaspline", "areaspline"],
        name : ["PV kW","DG kW","Load kW","ESS kW"]
    },
    {
        devName : 'Grid Meter-',
        keys : "Grid_Power_kW",
        type : ["areaspline"],
        name : ["Grid kW"],
        multiple : true
    },
    {
        devName : 'Meter.Load Meter-',
        keys : "AC_Active_Power_Watt",
        type : ["areaspline"],
        name : ["Load kW"],
        multiple : true
    },
    {
        devName : 'WMS.WMS-',
        keys : "Inst_POA",
        type : ["areaspline"],
        name : ["POA"],
        multiple : true
    },
    {
        devName : 'COM100',
        keys : "Plant_Active_Power_reference",
        type : ["line"],
        name : ["kW Setpoint"],
        multiple : false
    }
    // {
    //     devName : "PCS-1",          // This tag would be addition of all PCS, so it will be in calculation
    //     keys : "AC_Active_Power_Watt",
    //     type : ["areaspline"],
    //     name : ["ESS kW"]
    // }
    ];

    // Colors
    // PV => rgba(111, 209, 149, 1) => #6FD195
    // ESS => rgba(22, 255, 228, 1) => #16FFE4
    // DG => rgba(112, 134, 253, 1) => #7086FD
    // GRID => rgba(255, 174, 76, 1) => #FFAE4C  => EXLUDED date 4/5/25
    // LOAD => rgba(255, 120, 143, 1) => #FF788F
    // WIND => rgba(30, 199, 255, 1) => #1EC7FF

    const colors = ["#3CB4FF", "#FFBE3D", "#C45EFF", "#FF8C28", "#FFAE4C", "#FF3E98", "#FF68F5", "#A0C81F", "#33E2C2", "#1865FF", "#FF3E98"];
    const rgbaColors =[
        "rgba(60, 180, 255, ?)",
        "rgba(255, 190, 61, ?)",
        "rgba(196, 94, 255, ?)",
        "rgba(255, 140, 40, ?)",
        'rgba(255, 174, 76, ?)',
        "rgba(255, 62, 152, ?)",
        "rgba(255, 104, 245, ?)",
        "rgba(160, 200, 31, ?)",
        "rgba(51, 226, 194, ?)",
        "rgba(24, 101, 255, ?)",
        "rgba(255, 62, 152, ?)"
      ]

    let PowerCurveData = UseManyDeviceManyKeysChart(searchTagPowerCurve, timeWindowPowerCurve)
    useEffect(() => {
        if (PowerCurveData) {
            setData(PowerCurveData?.map((series : any, index : number) => {
                if(series.name == "PV kW") {
                    return {
                        ...series,
                        lineColor : "rgba(111, 209, 149, 1)", // Spline Color
                        color : "#6FD195",
                        fillColor: {
                            linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                            stops: [
                                [0, 'rgba(111, 209, 149, 0.3)'],
                                [1, 'rgba(111, 209, 149, 0.05)']
                            ]
                        },
                        marker : {
                            enabled : true,
                            symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%236FD195%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%236FD195%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                            fillColor: 'rgba(111, 209, 149, 1)', // Marker color
                            lineColor: "white", // Marker border color
                            lineWidth: 2,
                            radius: 6 // Adjust the size of the markers
                        },
                        pointStart : timeWindowPowerCurve.startTs,
                        pointInterval : timeWindowPowerCurve.interval,
                    }
                } else if(series.name == "DG kW") {
                    return {
                        ...series,
                        lineColor : "rgba(112, 134, 253, 1)",
                        color : "#7086FD",
                        fillColor: {
                            linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                            stops: [
                                [0, 'rgba(112, 134, 253, 0.3)'],
                                [1, 'rgba(112, 134, 253, 0.05)']
                            ]
                        },
                        marker : {
                            enabled : true,
                            symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%237086FD%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%237086FD%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                            fillColor: 'rgba(112, 134, 253, 1)', // Marker color
                            lineColor: "white", // Marker border color
                            lineWidth: 2,
                            radius: 6 // Adjust the size of the markers
                            
                        },
                    }
                } else if(series.name == "ESS kW") {
                    return {
                        ...series,
                        lineColor : "rgba(22, 255, 228, 1)",
                        color : "#16FFE4",
                        fillColor: {
                            linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                            stops: [
                                [0, 'rgba(22, 255, 228, 0.3)'],
                                [1, 'rgba(22, 255, 228, 0.05)']
                            ]
                        },
                        marker : {
                            enabled : true,
                            symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%23016FFE4A%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%23016FFE4A%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                            fillColor: 'rgba(22, 255, 228, 1)', // Marker color
                            lineColor: "white", // Marker border color
                            lineWidth: 2,
                            radius: 6 // Adjust the size of the markers
                            
                        },
                    }
                } else if(series.name == "Load kW"){
                    return { 
                        ...series,
                        lineColor : "rgba(235, 98, 59, 1)",
                        color: "#FF788F",
                        fillColor: {
                            linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                            stops: [
                                [0, 'rgba(235, 98, 59, 0.3)'],
                                [1, 'rgba(235, 98, 59, 0.05)']
                            ]
                        },
                        marker : {
                            enabled : true,
                            symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%23FF788F%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%23FF788F%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                            fillColor: 'rgba(235, 98, 59, 1)', // Marker color
                            lineColor: "white", // Marker border color
                            lineWidth: 2,
                            radius: 6 // Adjust the size of the markers
                        },
                    }
                } else if(series.name == "kW Setpoint"){
                    return { 
                        ...series,
                        lineColor : "rgba(255, 120, 143, 1)",
                        color: "#EB623B",
                        fillColor: {
                            linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                            stops: [
                                [0, 'rgba(255, 120, 143, 0.3)'],
                                [1, 'rgba(255, 120, 143, 0.05)']
                            ]
                        },
                        marker : {
                            enabled : true,
                            symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%23EB623B%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%23EB623B%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                            fillColor: 'rgba(255, 120, 143, 1)', // Marker color
                            lineColor: "white", // Marker border color
                            lineWidth: 2,
                            radius: 6 // Adjust the size of the markers
                        },
                    }
                }
                else {
                    return { 
                        ...series,
                        lineColor : rgbaColors[index % colors.length].replace("?", "1"),
                        color: colors[index % colors.length],
                        fillColor: {
                            linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                            stops: [
                                [0, rgbaColors[index % colors.length].replace("?", "0.3")],
                                [1, rgbaColors[index % colors.length].replace("?", "0.05")]
                            ]
                        },
                        marker : {
                            enabled : true,
                            symbol : `url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%23${colors[index % colors.length].replace("#", "")}%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%23${colors[index % colors.length].replace("#", "")}%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)`,
                            fillColor: rgbaColors[index % colors.length].replace("?", "1"), // Marker color
                            lineColor: "white", // Marker border color
                            lineWidth: 2,
                            radius: 6 // Adjust the size of the markers
                        },
                    }
                }
            }));
        }
    }, [PowerCurveData, inFullScreen]);
    
    const chartHeight = EnlargeWidgetSize(300);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

    return (
        <GraphLayout
            title='Power Curve'
            width={["full", "100%"]}
            height='100%'
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowPowerCurveChange}
            onReset={PowerCurveHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <div
                ref={wrapperRef}
                style={{ position: "relative", height: "100%" }}
            >
                <DateFormatter
                    right={dateRight}
                    currentStartTs={timeWindowPowerCurve?.startTs}
                    onDateChange={(start, end) => {
                        handleTimeWindowPowerCurveChange(
                            start,
                            end,
                            "AVG",
                            60 * 60 * 1000,
                            {
                                selectedTab: "history",
                                live: { intervalResolution: 60 * 60 * 1000 }
                            } as any
                        );
                    }}
                />

                <LineChart 
                    apiData={Data || [{}]}
                    height={300} 
                    onExportReady={setExportFunctions}
                    // inFullScreen={setInFullScreen}
                    props={ PowerCurveData ? 
                        { 
                            yAxis: 
                            {
                                title: 
                                { 
                                    enabled : false,
                                    text: "AC Power",
                                    style: {
                                        color: '#062D59',
                                        fontSize: inFullScreen ? EnlargeHeight(12) : '12px'
                                    }
                                },
                                gridLineWidth: 1,
                                gridLineDashStyle: 'Dash',
                                // tickAmount: 6,
                                gridLineColor: '#DFDFDF',
                                lineColor : "#DFDFDF",
                                labels: {
                                    style: {
                                        color: '#062D59',
                                        fontSize: inFullScreen ? EnlargeHeight(12) : '12px'
                                    }
                                },
                            },
                            xAxis:
                            {
                                type : "datetime",
                                gridLineDashStyle: 'Dash',
                                lineWidth : 2,
                                gridLineWidth: 1, // Ensure grid line width is set
                                tickLength: 0,
                                gridLineColor: '#DFDFDF',
                                lineColor : "#DFDFDF",
                                tickInterval: 3600 * 1000, // 1 hours interval
                                labels: {
                                    style: {
                                        color: '#062D59',
                                        fontSize: inFullScreen ? EnlargeHeight(12) : '12px'
                                    }
                                },
                            } 
                        } : {}
                    }  
                />
            </div>
        </GraphLayout>
    );
};

export default PowerCurve