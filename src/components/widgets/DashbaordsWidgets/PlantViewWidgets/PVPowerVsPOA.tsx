import { useRef, useState } from "react";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../charts/LineChart";
import { EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import UseManyDeviceSameMultipleKeys from "../../../../Services/Hooks/UseManyDeviceSameMultipleKeys";
import UseManyDeviceManyKeysChart from "../../../../Services/Hooks/UseManyDeviceManyKeysChart";
import { formatInTimeZone } from "date-fns-tz";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}


const PVPowerVsPOA = () => {

    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    // *********************  PowerPOA *********************
    const {
        timeWindow: timeWindowPowerPOA,
        handleTimeWindowChange: handleTimeWindowPowerPOAChange,
        handleReset: PowerPOAHandleReset,
        manualChanges
    } = useTimeHandle(16, "hour", "AVG", [1, "hour"]);


    var searchTagPowerPOA = [{
        devName: "calculation",
        keys: "INV_Total_Power,POA",
        type: ["spline", "spline"],
        name: ["PV Power (kW)", "POA values W/m2 values"]
    }];
    const PowerPOAColor = ["#C700BF", "#53971D", "#F4B725", "#09BCC7", "#1325CB", "#19CA16", '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
        '#03c69b', '#00f194']

    const PowerPOAData = UseManyDeviceManyKeysChart(searchTagPowerPOA, timeWindowPowerPOA)?.map((series : any) => {
        if(series.name == "PV Power (kW)") {
            return (
                {
                    ...series,
                    color : "rgba(111, 209, 149, 1)", 
                    lineColor : "rgba(111, 209, 149, 1)", // Spline Color
                    marker : {
                        enabled : true,
                        symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%236FD195%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%236FD195%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                        fillColor: 'rgba(111, 209, 149, 1)', // Marker color
                        lineColor: "white", // Marker border color
                        lineWidth: 2,
                        radius: 6 // Adjust the size of the markers
                    },
                }
            )
        } else if(series.name == "POA values W/m2 values") {
            return (
                {
                    ...series,
                    color : "rgba(112, 134, 253, 1)",
                    lineColor : "rgba(112, 134, 253, 1)", // Spline Color            
                    marker : {
                        enabled : true,
                        symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%237086FD%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%237086FD%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                        fillColor: 'rgba(112, 134, 253, 1)', // Marker color
                        lineColor: "white", // Marker border color
                        lineWidth: 2,
                        radius: 6 // Adjust the size of the markers
                    },
                }
            )
        }
    })

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    // const tempData = 
    // [
    //     {
    //         name: 'Power kW values',
    //         type : "spline",
    //         data: [
    //             [Date.UTC(2023, 0, 1), 29],
    //             [Date.UTC(2023, 0, 2), 71],
    //             [Date.UTC(2023, 0, 3), 106],
    //             [Date.UTC(2023, 0, 4), 129],
    //             [Date.UTC(2023, 0, 5), 144],
    //             [Date.UTC(2023, 0, 6), 176],
    //             [Date.UTC(2023, 0, 7), 135],
    //             [Date.UTC(2023, 0, 8), 148],
    //             [Date.UTC(2023, 0, 9), 216],
    //             [Date.UTC(2023, 0, 10), 194]
    //         ],
    //         lineColor : "rgba(111, 209, 149, 1)", // Spline Color
    //         marker : {
    //             enabled : true,
    //             symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%236FD195%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%236FD195%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
    //             fillColor: 'rgba(111, 209, 149, 1)', // Marker color
    //             lineColor: "white", // Marker border color
    //             lineWidth: 2,
    //             radius: 6 // Adjust the size of the markers
    //         },
    //     },
    //     {
    //         name: 'POA values W/m2 values',
    //         type : "spline",
    //         data: [
    //             [Date.UTC(2023, 0, 1), 35],
    //             [Date.UTC(2023, 0, 2), 76],
    //             [Date.UTC(2023, 0, 3), 100],
    //             [Date.UTC(2023, 0, 4), 120],
    //             [Date.UTC(2023, 0, 5), 160],
    //             [Date.UTC(2023, 0, 6), 190],
    //             [Date.UTC(2023, 0, 7), 100],
    //             [Date.UTC(2023, 0, 8), 130],
    //             [Date.UTC(2023, 0, 9), 200],
    //             [Date.UTC(2023, 0, 10), 250]
    //         ],
    //         lineColor : "rgba(112, 134, 253, 1)", // Spline Color            
    //         marker : {
    //             enabled : true,
    //             symbol : 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%237086FD%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%237086FD%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
    //             fillColor: 'rgba(112, 134, 253, 1)', // Marker color
    //             lineColor: "white", // Marker border color
    //             lineWidth: 2,
    //             radius: 6 // Adjust the size of the markers
    //         },
    //     }
    // ];
    const chartHeight = EnlargeWidgetSize(300);
    return (
        <GraphLayout
            title="PV Power vs POA"
            width={["full"]}
            height={"100%"}
            onExport={exportFunctions}
            titleLengthSVG={135}
            titleLengthLongSVG={380}
            fullScreen={true}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowPowerPOAChange}
            onReset={PowerPOAHandleReset}
            // inProgress={true}
        >
            <LineChart
                height={chartHeight}
                apiData={PowerPOAData || [{}]}
                onExportReady={setExportFunctions}
                props = {
                    {
                        xAxis : {
                            type : "datetime",
                            gridLineDashStyle: 'Dash',
                            lineWidth : 2,
                            gridLineWidth: 1, // Ensure grid line width is set
                            tickLength: 0,
                            tickInterval: 60 * 60 * 2 * 1000, // 2 hours interval
                            min : !manualChanges ? undefined : new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 4, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
                            max : !manualChanges ? undefined : new Date(formatInTimeZone(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 20, 0, 0, 0), timeZone, "yyyy-MM-dd HH:mm:ss.SSS")).getTime(),
                            gridLineColor: '#DFDFDF',
                            lineColor : "#DFDFDF",
                            // tickInterval: 3600 * 1000, // 1 hours interval
                            labels: {
                                style: {
                                    color: '#062D59',
                                    fontSize: '12px'
                                }
                            },
                        }
                    }
                }
            />
        </GraphLayout>
    );
};

export default PVPowerVsPOA;