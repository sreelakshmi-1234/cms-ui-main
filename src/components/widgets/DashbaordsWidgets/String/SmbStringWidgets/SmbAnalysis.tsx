import { Box } from "@chakra-ui/react"
import { useState } from "react";
import TabsChartLayout from "../../../../Layouts/ChartLayouts/TabsGraphLayout";
import SmbICCurveGraph from "./SmbICCurveGraph";
import SmbStringGraph from "./SmbStringGraph";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const SmbAnalysis = () => {

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   


    return (
        <TabsChartLayout
            tabs={["Strings", "Volt-Current Curve"]}
            dotColors={["green", "yellow"]}
            title="Analysis"
            titleLengthSVG={70}
            titleLengthLongSVG={1040}
            width={["full", "auto"]}
            height={"100%"}
            mt="10px"
            downloadOption={true}
            fullScreen={true}
            initTimeTitle="Current Day"
            onExport={exportFunctions}
            childrens={[
                (<Box
                    mt={-6}
                >
                    <SmbStringGraph onExportReady={setExportFunctions} />
                </Box>),
                (<Box
                    mt={4}
                >
                    <SmbICCurveGraph onExportReady={setExportFunctions} />
                </Box>)
            ]}
        />
    )
}

export default SmbAnalysis