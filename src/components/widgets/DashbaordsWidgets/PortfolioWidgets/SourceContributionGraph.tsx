import { lazy, Suspense } from "react";
import TabsGraphLayout from "../../../Layouts/ChartLayouts/TabsGraphLayout";
import UseSourceContribution from "../../../../Services/Hooks/UseSourceContribution";
const DonutPieChart = lazy(() => import("../../charts/DonutPieChart"));




const SourceContributionGraph = () => {
    // ********** Source Contribution ***********
    // Daily
    var textSearch = "Portfolio";
    var key = "PV_Contribution,Wind_Total_Power,PCS_Contribution,DG_Contribution";
    var title = ["PV", "Wind", "BESS", "DG"];
    var resolutionDaily = "Daily";
    const SourceContributionDaily = UseSourceContribution(textSearch, key, title, resolutionDaily) || [];

    var resolutionWeekly = "Weekly";
    const SourceContributionWeekly = UseSourceContribution(textSearch, key, title, resolutionWeekly) || [];

    var resolutionMonthly = "Monthly";
    const SourceContributionMonthly = UseSourceContribution(textSearch, key, title, resolutionMonthly) || [];
    return (
        <TabsGraphLayout
            tabs={["Daily", "Weekly", "Monthly"]}
            dotColors={["green", "yellow", "#333"]}
            title="Source Contribution"
            titleLengthSVG={170}
            titleLengthLongSVG={650}
            width={["full", "auto"]}
            height={"100%"}
            mt="10px"
            downloadOption={false}
            childrens={[
              <Suspense fallback={<div style={{position:"relative", top : "45%", left : "45%"}}>Loading...</div>}>
                <DonutPieChart height={250} name="AVG %" apiData={SourceContributionDaily}
                  pieColors={["#8CDAAA", "#82B2FF", "#39E2FB", "#FFAE4C",'#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                    '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                    '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                    '#03c69b', '#00f194']}
                />
              </Suspense>,
              <Suspense fallback={<div style={{position:"relative", top : "45%", left : "45%"}}>Loading...</div>}>
                <DonutPieChart height={250} name="AVG %" apiData={SourceContributionWeekly}
                  pieColors={["#8CDAAA", "#82B2FF", "#39E2FB", "#FFAE4C",'#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                    '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                    '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                    '#03c69b', '#00f194']}
                />
              </Suspense>,
              <Suspense fallback={<div style={{position:"relative", top : "45%", left : "45%"}}>Loading...</div>}>
                <DonutPieChart height={250} name="AVG %" apiData={SourceContributionMonthly}
                  pieColors={["#8CDAAA", "#82B2FF", "#39E2FB", "#FFAE4C",'#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                    '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                    '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                    '#03c69b', '#00f194']}
                />
              </Suspense>,
            ]}
          />
    );
};

export default SourceContributionGraph