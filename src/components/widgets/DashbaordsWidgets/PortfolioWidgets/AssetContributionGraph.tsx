import { lazy, Suspense } from "react";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import UseAssetSummary from "../../../../Services/Hooks/UseAssetSummary";
import { Box } from "@chakra-ui/react";
const DonutPieChart = lazy(() => import("../../charts/DonutPieChart"));


const AssetContributionGraph = () => {
    // ************** Asset Summarry **************

    var searchObj = {
        inverter: `AC_Active_Power_Watt`,
        DG: `AC_Active_Power_Watt`,
        PCS: `AC_Active_Power_Watt`,
        Wind: `Wind_power`
    }
    const AssetSummary = UseAssetSummary(searchObj) || [];
    return (
        <Suspense fallback={<div style={{ position: "relative", top: "45%", left: "45%" }}>Loading...</div>}>
            <DonutPieChart height={250} name="Source" apiData={AssetSummary}
                pieColors={["#8CDAAA", "#82B2FF", "#39E2FB", "#FFAE4C", '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                    '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                    '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                    '#03c69b', '#00f194']}
            />
        </Suspense>
    );
};

export default AssetContributionGraph