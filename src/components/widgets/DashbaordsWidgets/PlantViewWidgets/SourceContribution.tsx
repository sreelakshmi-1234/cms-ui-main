import { useState } from "react";
import { EnlargeWidgetContent, EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UseBatteryStatus from "../../../../Services/Hooks/Battery/UseBatteryStatus";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import BarChart from "../../charts/BarChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const SourceContribution = () => {
    // ****************** Plant Source Contribution => PSC****************

    var search = {
        devName : "Calculation",
        keys : "PV_Contribution"
    }
    const batteryStatusPVContri = UseBatteryStatus(search) || [null];
    var search = {
        devName : "Calculation",
        keys : "DG_Contribution"
    }
    const batteryStatusDGContri = UseBatteryStatus(search) || [null];
    var search = {
        devName : "Calculation",
        keys : "PCS_Contribution"
    }
    const batteryStatusBESSContri = UseBatteryStatus(search) || [null];
    var search = {
        devName : "Calculation",
        keys : "WIND_Contribution"
    }
    const batteryStatusWINDContri = UseBatteryStatus(search) || [null];
    const PSCData = [{
        name : 'Contribution %',
        data : 
            [
                {
                    y : batteryStatusPVContri[0] ? batteryStatusPVContri[0] : 40,
                    color : batteryStatusPVContri[0] ? "#6FD195" : "#DFDFDF"
                },
                {
                    y : batteryStatusDGContri[0] ? batteryStatusDGContri[0] : 40,
                    color : batteryStatusDGContri[0] ? "#7086FD" : "#DFDFDF"
                },
                {
                    y : batteryStatusBESSContri[0] ? batteryStatusBESSContri[0] : 40,
                    color : batteryStatusBESSContri[0] ? "#16FFE4" : "#DFDFDF"
                },
                {
                    y : batteryStatusWINDContri[0] ? batteryStatusWINDContri[0] : 40,
                    color : batteryStatusWINDContri[0] ? "#FFAE4C" : "#DFDFDF"
                }
            ]
    }];

    const chartHeight = EnlargeWidgetSize(300);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   

    return (
        <GraphLayout
            title='Source Contribution'
            titleLengthSVG={171}
            titleLengthLongSVG={340}
            initTimeTitle='Current Day'
            width={["full"]}
            height={["100%"]}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <BarChart height={chartHeight} apiData={PSCData || [{}]} onExportReady={setExportFunctions}
                props={{
                    xAxis: {
                        categories: ["PV", "DG", "BESS", "WIND"],
                        title: {
                            text: null
                        },
                        gridLineDashStyle: 'Dash',
                        gridLineWidth: 1, // Ensure grid line width is set
                        tickLength: 0,
                        gridLineColor: '#DFDFDF',
                        lineColor : "#DFDFDF",
                        labels: {
                            enabled: true,
                            style: {
                                fontSize: '12px',
                                color : '#062D59'
                            }
                        },
                    },
                    tooltip: {
                        formatter: function (this: any) {
                            var points = this.points.map(function (point: any) {
                                return '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b>';
                            });
                            return '<br/>' + points.join('<br/>');
                        }
                    },
                    legend : {
                        enabled : false
                    }
                }}
            />
        </GraphLayout>
    )
};

export default SourceContribution