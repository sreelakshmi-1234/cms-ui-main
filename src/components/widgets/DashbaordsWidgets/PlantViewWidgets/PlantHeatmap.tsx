import { Box } from "@chakra-ui/react"
import TabsChartLayout from "../../../Layouts/ChartLayouts/TabsGraphLayout"
import CustomHeatmapGraph from "./CustomHeatmapGraph"
import Heatmap from "./Heatmap"
import { useState } from "react";

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const PlantHeatmap = () => {

    const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);   


    return (
        <TabsChartLayout
            tabs={["Performance", "Status"]}
            dotColors={["green", "yellow"]}
            title="Heatmap"
            titleLengthSVG={70}
            titleLengthLongSVG={1680}
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
                    <CustomHeatmapGraph onExportReady={setExportFunctions} />
                </Box>),
                (<Box
                    mt={4}
                >
                    <Heatmap />
                </Box>)
            ]}
        />
    )
}

export default PlantHeatmap