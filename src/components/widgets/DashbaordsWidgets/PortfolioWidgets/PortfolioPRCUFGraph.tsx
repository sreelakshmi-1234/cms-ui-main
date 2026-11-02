import { FaChartColumn } from "react-icons/fa6";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import { EnlargeHeight, EnlargeWidgetContent } from "../../../../Services/EnlargeWidget";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import UseColumnLine from "../../../../Services/Hooks/UseColumnLine";
import ColumnChart from "../../charts/ColumnChart";
import { useState } from "react";
import AreaSplineChart from "../../charts/AreaSplineChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }

const PortfolioPRCUFGraph = () => {
    // ***********************Energy Yield******************
    // var textSearch = "portfolio";
    // const type = { // Line for PV PR only
    //     column : "PV_Portfolio_Energy,Grid_Portfolio_Daily_Energy_Export",
    //     line : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Energy_Total_kWh,B1_Inverter_Inverter_1_Frequency_Hz,B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Energy_Total_kWh,B1_Inverter_Inverter_1_Frequency_Hz,B1_Inverter_Inverter_1_Energy_Total_kWh",
    // };
    // const ColumnLineData = UseColumnLine(textSearch, type) || [{}];

    const {
        timeWindow: timeWindowEnergyYield,
        handleTimeWindowChange: handleTimeWindowEnergyYieldChange,
        handleReset: EnergyYieldHandleReset
    } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

    var searchTagEnergyYield = {
        devName: "portfolio",
        keys: "AVG_Portfolio_PR_Percent,AVG_Portfolio_CUF_AC",
        type: ["areaspline", "areaspline"],
        name: ["PR (%)", "CUF (%)"]
    };
    const colors = ["#7086FD", "#6FD195"]
    // is Chart in Full screen Mode
    const [inFullScreen, setInFullScreen]  = useState<boolean>(false);
    const ColumnLineData = UseColumnLine(searchTagEnergyYield, timeWindowEnergyYield)?.map((series : any, index) => {
        if (series.name == "PR (%)") {
            return {
                ...series,
                lineColor: "rgba(255, 174, 76, 1)",
                color: "#FFAE4C",
                fillColor: {
                    linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                    stops: [
                        [0, 'rgba(255, 174, 76, 0.3)'],
                        [1, 'rgba(255, 174, 76, 0.05)']
                    ]
                },
                marker: {
                    enabled: true,
                    symbol: 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%23FFAE4C%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%23FFAE4C%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                    fillColor: 'rgba(255, 174, 76, 1)', // Marker color
                    lineColor: "white", // Marker border color
                    lineWidth: 2,
                    radius: 6 // Adjust the size of the markers
                },
            }
        } else if (series.name == "CUF (%)") {
            return {
                ...series,
                lineColor: "rgba(255, 120, 143, 1)",
                color: "#EB623B",
                fillColor: {
                    linearGradient: [0, 0, 0, !inFullScreen ? 300 : EnlargeHeight(700)], // Adjust the height based on your container
                    stops: [
                        [0, 'rgba(255, 120, 143, 0.3)'],
                        [1, 'rgba(255, 120, 143, 0.05)']
                    ]
                },
                marker: {
                    enabled: true,
                    symbol: 'url(data:image/svg+xml;utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Ccircle%20opacity%3D%220.25%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%23EB623B%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223.5%22%20fill%3D%22%23EB623B%22%20stroke%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E)',
                    fillColor: 'rgba(255, 120, 143, 1)', // Marker color
                    lineColor: "white", // Marker border color
                    lineWidth: 2,
                    radius: 6 // Adjust the size of the markers
                },
            }
        }
    });
    
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

    return (
        <GraphLayout
            title="Performance"
            titleLengthSVG={90}
            titleLengthLongSVG={720}
            initTimeTitle="Last 7 Days"
            width={["full", "100%"]}
            height={"100%"}
            // icon={FaChartColumn}
            timeWindow={true}
            onTimeWindowChange={handleTimeWindowEnergyYieldChange}
            onReset={EnergyYieldHandleReset}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <AreaSplineChart 
                height={300} 
                apiData={ColumnLineData || [{}]} // column line = energy yield
                onExportReady={setExportFunctions}
                inFullScreen={setInFullScreen}
            />
        </GraphLayout>
    );
};

export default PortfolioPRCUFGraph