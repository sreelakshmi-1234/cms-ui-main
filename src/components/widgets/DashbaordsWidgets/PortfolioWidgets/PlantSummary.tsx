import TabsChartLayout from "../../../Layouts/ChartLayouts/TabsGraphLayout"
import AssetContributionGraph from "./AssetContributionGraph";
import PlantDowntimeGraph from "./PlantDowntimeGraph"



const PlantSummary = () => {
    return (
        <TabsChartLayout 
            tabs={["Downtime", "Asset"]}
            dotColors={["green", "yellow", "#333"]}
            title="Plant Summary"
            titleLengthSVG={120}
            titleLengthLongSVG={700}
            width={["full", "auto"]}
            height={"100%"}
            mt="10px"
            downloadOption={false}
            childrens={[
                <PlantDowntimeGraph />,
                <AssetContributionGraph />
            ]}
        />
    );
};

export default PlantSummary;