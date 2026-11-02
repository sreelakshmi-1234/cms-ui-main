import { useState } from "react";
import { EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import StackedColumnChart from "../../charts/StackedColumnChart";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import UseManyDeviceManyKeysChart from "../../../../Services/Hooks/UseManyDeviceManyKeysChart";


// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const PerformanceGraph = () => {
    const [inFullScreen, setInFullScreen] = useState(false);

    // ********************* Performance Graph *********************
    const {
        timeWindow: timeWindowPerformance,
        handleTimeWindowChange: handleTimeWindowPerformanceChange,
        handleReset: PerformanceHandleReset
    } = useTimeHandle(6, "day", "NONE", [5, "minute"]);

    
    var searchTagPerformance = [
        {
            devName : "Calculation",
            keys : "CUF_AC,PR_Percent,PV_Daily_Energy_Today",
            type : ["areaspline","areaspline","column"],
            name : ["CUF %","PR %", "PV Energy kWh"]   
        }] 

    // Color
    //  Stack bar 1 => rgba(40, 74, 255, 1) => #284AFF
    //  Stack bar 2 => rgba(0, 198, 77, 1) => #00C64D
    // Line color 1 => rgba(111, 209, 149, 1) => #6FD195
    //  Line Color 2 => rgba(76, 139, 255, 1)  => #4C8BFF
    // Area color => rgba(255, 174, 76, 0.3) rgba(255, 174, 76, 0.05)

    const PerformanceData = UseManyDeviceManyKeysChart(searchTagPerformance, timeWindowPerformance, "LastValue")?.map((series : any, index : number) => {
        if(series.name == "CUF %") {
            return {
                ...series,
                color : "rgba(40, 74, 255, 0.6)",
                yAxis : 1,
                fillColor: {
                    linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeWidgetSize(700)], // Adjust the height based on your container
                    stops: [
                        [0, 'rgba(40, 74, 255, 0.3)'],
                        [1, 'rgba(40, 74, 255, 0.5)']
                    ]
                },
                marker: {
                    enabled: true,
                    symbol: 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%23284AFF%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%23284AFF%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                    fillColor: 'rgba(40, 74, 255, 1)', // Marker color
                    lineColor: "white", // Marker border color
                    lineWidth: 2,
                    radius: 6 // Adjust the size of the markers
                },
            }
        } else if (series.name == "PR %") {
            return {
                ...series,
                color : "rgba(0, 198, 77, 0.6)",
                yAxis : 1,
                fillColor: {
                    linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeWidgetSize(700)], // Adjust the height based on your container
                    stops: [
                        [0, 'rgba(0, 198, 77, 0.3)'],
                        [1, 'rgba(0, 198, 77, 0.5)']
                    ]
                },
                marker: {
                    enabled: true,
                    symbol: 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%2300C64D%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%2300C64D%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                    fillColor: 'rgba(0, 198, 77, 1)', // Marker color
                    lineColor: "white", // Marker border color
                    lineWidth: 2,
                    radius: 6 // Adjust the size of the markers
                },
            }
        } else if (series.name == "PV Energy kWh") {
            return {
                ...series,
                color: "rgba(111, 209, 149, 1)", // Spline Color
                // fillColor: {
                //     linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeWidgetSize(700)], // Adjust the height based on your container
                //     stops: [
                //         [0, 'rgba(111, 209, 149, 0.3)'],
                //         [1, 'rgba(111, 209, 149, 0.5)']
                //     ]
                // },
                // marker: {
                //     enabled: true,
                //     symbol: 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%236FD195%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%236FD195%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                //     fillColor: 'rgba(111, 209, 149, 1)', // Marker color
                //     lineColor: "white", // Marker border color
                //     lineWidth: 2,
                //     radius: 6 // Adjust the size of the markers
                // },
            }
        } else if (series.name == "PV Budgeted Energy (kWh)") {
            return {
                ...series,
                lineColor: "rgba(111, 209, 149, 1)", // Spline Color
                fillColor: {
                    linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeWidgetSize(700)], // Adjust the height based on your container
                    stops: [
                        [0, 'rgba(255, 174, 76, 0.3)'],
                        [1, 'rgba(255, 174, 76, 0.05)']
                    ]
                },
                marker: {
                    enabled: true,
                    symbol: 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%234C8BFF%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%234C8BFF%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                    fillColor: 'rgba(111, 209, 149, 1)', // Marker color
                    lineColor: "white", // Marker border color
                    lineWidth: 2,
                    radius: 6 // Adjust the size of the markers
                },
            }
        }
    })
    // const tempData = [{
    //     name: 'CUF %',
    //     color : "rgba(40, 74, 255, 0.6)",
    //     data: [
    //         // [Date.UTC(2023, 0, 1), 5],
    //         // [Date.UTC(2023, 0, 2), 3],
    //         // [Date.UTC(2023, 0, 3), 5],
    //         // [Date.UTC(2023, 0, 4), 3],
    //         // [Date.UTC(2023, 0, 5), 5],
    //         // [Date.UTC(2023, 0, 6), 3],
    //         // [Date.UTC(2023, 0, 7), 5],
    //         // [Date.UTC(2023, 0, 8), 3],
    //         // [Date.UTC(2023, 0, 9), 8],

    //     ]
    // }, {
    //     name: 'PR %',
    //     color : "rgba(0, 198, 77, 0.6)",
    //     data: [
    //         // [Date.UTC(2023, 0, 1), 2],
    //         // [Date.UTC(2023, 0, 2), 2],
    //         // [Date.UTC(2023, 0, 3), 5],
    //         // [Date.UTC(2023, 0, 4), 3],
    //         // [Date.UTC(2023, 0, 5), 5],
    //         // [Date.UTC(2023, 0, 6), 3],
    //         // [Date.UTC(2023, 0, 7), 5],
    //         // [Date.UTC(2023, 0, 8), 3],
    //         // [Date.UTC(2023, 0, 9), 8],
    //     ]
    // }, {
    //     name: 'PV Energy kWh',
    //     type : 'areaspline',
    //     data: [
    //         // [Date.UTC(2023, 0, 1), 1],
    //         // [Date.UTC(2023, 0, 2), 10],
    //         // [Date.UTC(2023, 0, 3), 15],
    //         // [Date.UTC(2023, 0, 4), 3],
    //         // [Date.UTC(2023, 0, 5), 6],
    //         // [Date.UTC(2023, 0, 6), 7],
    //         // [Date.UTC(2023, 0, 7), 2],
    //         // [Date.UTC(2023, 0, 8), 19],
    //         // [Date.UTC(2023, 0, 9), 8],
    //     ],
    //     lineColor : "rgba(111, 209, 149, 1)", // Spline Color
    //     fillColor: {
    //         linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeWidgetSize(700)], // Adjust the height based on your container
    //         stops: [
    //             [0, 'rgba(111, 209, 149, 0.3)'],
    //             [1, 'rgba(111, 209, 149, 0.5)']
    //         ]
    //     },
    //     marker : {
    //         enabled : true,
    //         symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%236FD195%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%236FD195%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
    //         fillColor: 'rgba(111, 209, 149, 1)', // Marker color
    //         lineColor: "white", // Marker border color
    //         lineWidth: 2,
    //         radius: 6 // Adjust the size of the markers
    //     },
    // }, {
    //     name: 'PV Budgeted Energy (kWh)',
    //     type: 'areaspline',
    //     data: [
    //         // [Date.UTC(2023, 0, 1), 7],
    //         // [Date.UTC(2023, 0, 2), 6],
    //         // [Date.UTC(2023, 0, 3), 12],
    //         // [Date.UTC(2023, 0, 4), 11],
    //         // [Date.UTC(2023, 0, 5), 17],
    //         // [Date.UTC(2023, 0, 6), 19],
    //         // [Date.UTC(2023, 0, 7), 11],
    //         // [Date.UTC(2023, 0, 8), 4],
    //         // [Date.UTC(2023, 0, 9), 8],
    //     ],
    //     lineColor : "rgba(111, 209, 149, 1)", // Spline Color
    //     fillColor: {
    //         linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeWidgetSize(700)], // Adjust the height based on your container
    //         stops: [
    //             [0, 'rgba(255, 174, 76, 0.3)'],
    //             [1, 'rgba(255, 174, 76, 0.05)']
    //         ]
    //     },
    //     marker : {
    //         enabled : true,
    //         symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%234C8BFF%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%234C8BFF%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
    //         fillColor: 'rgba(111, 209, 149, 1)', // Marker color
    //         lineColor: "white", // Marker border color
    //         lineWidth: 2,
    //         radius: 6 // Adjust the size of the markers
    //     },
    // }]
    const chartHeight = EnlargeWidgetSize(300);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);
    
    return ( 
        <GraphLayout
            title="Performance"
            width={["full"]}
            height={"100%"}
            fullScreen={true}
            onExport={exportFunctions}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowPerformanceChange}
            onReset={PerformanceHandleReset}
            // inProgress={true}
        >
            <StackedColumnChart 
                height={chartHeight}
                apiData={PerformanceData || [{}]}
                onExportReady={setExportFunctions}
                inFullScreen={setInFullScreen}
                props={
                    {
                        yAxis: [
                            {
                                title: {
                                    text: null
                                },
                                stackLabels: {
                                    enabled: false
                                },
                                labels: {
                                    enabled: true,
                                    style: {
                                        color: '#062D59',
                                        fontSize: '12px'
                                    }
                                },
                                tickAmount: !inFullScreen ? 6 : 10,
                                gridLineDashStyle: 'Dash',
                                gridLineWidth: 1, // Ensure grid line width is set
                                tickLength: 0,
                                gridLineColor: '#DFDFDF',
                                lineColor: "#DFDFDF",
                            },
                            {
                                title: {
                                    text: null
                                },
                                stackLabels: {
                                    enabled: false
                                },
                                labels: {
                                    enabled: true,
                                    style: {
                                        color: '#062D59',
                                        fontSize: '12px'
                                    }
                                },
                                tickAmount: !inFullScreen ? 6 : 10,
                                gridLineDashStyle: 'Dash',
                                gridLineWidth: 1, // Ensure grid line width is set
                                tickLength: 0,
                                gridLineColor: '#DFDFDF',
                                lineColor: "#DFDFDF",
                                opposite : true
                            }
                        ]
                    }
                }
            />
        </GraphLayout>
    );
};

export default PerformanceGraph