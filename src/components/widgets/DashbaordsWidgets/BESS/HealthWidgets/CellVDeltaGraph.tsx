import { useState } from "react";
import { EnlargeWidgetContent } from "../../../../../Services/EnlargeWidget";
import UseCellVDelta from "../../../../../Services/Hooks/Battery/UseCellVDelta";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const CellVDeltaGraph = () => {
    // ************************Cell V Delta*********************
    var searchTagCellV = {
        devName: "PCS",
        keys: "ESS_AVG_Line_Volt",
        type: ["column"],
        name: ["Count"],
        color: "#3086F3"
    };
    const CellVData = UseCellVDelta(searchTagCellV);
    // useEffect(() => {
    //     if (CellVData) {
    //         console.log("CellVData:", CellVData);
    //     }
    // }, [CellVData]);
    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   
    
    return (
        <GraphLayout
            title='Cell Voltage Delta'
            titleLengthLongSVG={720}
            initTimeTitle='Previous Day'
            width={["100%", "100%"]}
            height={"100%"}
            fullScreen={true}
            onExport={exportFunctions}
        >
            <ColumnChart 
                height={300} 
                category={["0.01", "0.02", "0.03", "0.04", "0.05", "0.06", "0.07", "0.08", "0.09"]} 
                apiData={CellVData || [{}]} 
                onExportReady={setExportFunctions}
                props={
                    {
                        xAxis : {
                            gridLineWidth : 0
                        },
                        plotOptions : {
                            column : {
                                pointWidth : 21
                            }
                        }
                    }
                }
            />
        </GraphLayout>
    );
};

export default CellVDeltaGraph