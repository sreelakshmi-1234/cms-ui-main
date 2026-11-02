import { useState } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UsePlantAvailability from "../../../../Services/Hooks/PlantView/UsePlantAvailability";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../charts/ColumnChart";
import LineChart from "../../charts/LineChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const Availability = () => {
    // ******* AVAILABILITY ***********
    var searchTagPlantAvailability = { 
        type : "column",
        marker : true,
        monthCount : 6
    };
    const PlantAvailabilityData : any = UsePlantAvailability(searchTagPlantAvailability);
    // console.log(PlantAvailabilityData)
    const tempData = [
        {
            name : "Month wise availability",
            type : "column",
            color : "#3086F3",
            data : [50, 60, 75, 20, 40]
        }
    ];

    const chartHeight = EnlargeWidgetSize(300);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Availability'
            titleLengthSVG={80}
            titleLengthLongSVG={435}
            initTimeTitle='Last 6 Month'
            width={["full", "100%"]}
            height={["100%"]}
            fullScreen={true}
            onExport={exportFunctions}
            // inProgress={true}
        >
            {/* <LineChart height={EnlargeWidgetContent(230, 215)} props={{ yAxis: { title: { text: "Month Wise Availability %" } } }} apiData={PlantAvailabilityData || [{}]} /> */}
            <ColumnChart
                height={chartHeight} 
                apiData={PlantAvailabilityData} 
                onExportReady={setExportFunctions}
                props={
                    {
                        plotOptions: {
                            column: {
                                pointWidth: 20
                            }
                        },
                        tooltip: {
                            shared: true,
                            formatter: function(this : any) {
                                let s = ""; // Display the category
                                this.points.forEach((point : any) => {
                                    s += '<span style="color:' + point.color + '">●</span><b> ' + point.series.name + '</b>: ' + point.y + '<br>';
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
                        },
                        legend: {
                            enabled: true,
                            align: 'left',
                            verticalAlign: 'bottom',
                            symbolShape: 'square', // Keep this for other chart types, but it won't be applied to column chart symbols
                            symbolHeight: 0,
                            symbolWidth: 0,
                            useHTML: true, // Allow HTML rendering for custom symbols
                            itemStyle: {
                              overflow: "auto",
                              color: '#062D59',
                              fontSize: 12,
                            },
                            labelFormatter: function (this : any) {
                              // Create a custom square legend symbol with the background color of each series
                              // Here we avoid using the default circle symbol
                              return '<span style="width: 10px; height: 10px; display: inline-block; background-color: ' + this.color + '; border-radius: 0;"></span> ' + this.name;
                            },
                          }
                    }
                }
            />
        </GraphLayout>
    );
};

export default Availability