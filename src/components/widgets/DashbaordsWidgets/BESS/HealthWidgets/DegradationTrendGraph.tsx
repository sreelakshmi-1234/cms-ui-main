import { useState } from "react";
import { EnlargeWidgetContent } from "../../../../../Services/EnlargeWidget";
import UseMonthlyLastValue from "../../../../../Services/Hooks/UseMonthlyLastValue";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import LineChart from "../../../charts/LineChart";
import UseMonthlyLastValueTBAPI from "../../../../../Services/Hooks/UseMonthlyLastValueTBAPI";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const DegradationTrendGraph = () => {
    // ************************Degradation Trend********************
    // [[1725062400000, 100], [1727654400000, 100], [1730332800000, 100], [1732924800000, 100], [1735603200000, 100], [1738281600000, 100]] // Manually For presentn. 30 jan 25

    var searchTagDegradation = {
        devName: "PCS-1",
        keys: "ESS_SOH",
        type: "spline",
        name: "SOH",
        monthCount: 6,
        marker: true,
        chartData : true
    };
    const DegradationColor = ["#FDA370", "#F4B725"];
    const DegradationData = UseMonthlyLastValueTBAPI(searchTagDegradation)?.map((series: object, index: number) => ({
        ...series,
        color: DegradationColor[index]
    }));
    // useEffect(() => {
    //     if (DegradationData) {
    //         console.log("DegradationData:", DegradationData);
    //     }
    // }, [DegradationData]);
    // const TempData = [
    //     {
    //         "type": "spline",
    //         "name": "SOH %",
    //         "data": [[1725062400000, 100], [1727654400000, 100], [1730332800000, 100], [1732924800000, 100], [1735603200000, 100], [1738281600000, 100]],
    //         "color" : "#FDA370"
    //     }
    // ];
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Degradation Trend'
            titleLengthSVG={150}
            titleLengthLongSVG={680}
            initTimeTitle='Last 6 Month'
            width={["full", "100%"]}
            height={"100%"}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <LineChart 
                height={300}
                onExportReady={setExportFunctions}
                apiData={
                    DegradationData
                 || [{}] }
                props={
                    {
                        tooltip: {
                            shared: true,
                            formatter: function(this : any) {
                                let s = ""; // Display the category
                                this.points.forEach((point : any) => {
                                    s += '<span style="color:' + point.color + '">●</span><b> ' + point.series.name + ' %</b>: ' + point.y + '<br>';
                                });
                                return s;
                            }
                        },
                        xAxis: {
                            type: 'datetime',
                            gridLineDashStyle: 'Dash',
                            gridLineWidth: 1, // Ensure grid line width is set
                            tickLength: 0,
                            gridLineColor: '#DFDFDF',
                            lineColor : "#DFDFDF",
                            dateTimeLabelFormats: {
                                month: '%b %y', // Custom format for months
                            },
                            tickAmount : 6
                        },
                        yAxis : {
                            gridLineDashStyle: 'Dash',
                            gridLineWidth: 1, // Ensure grid line width is set
                            tickLength: 0,
                            gridLineColor: '#DFDFDF',
                            lineColor : "#DFDFDF",
                        }
                    }
                }
            />
        </GraphLayout>
    );
};

export default DegradationTrendGraph