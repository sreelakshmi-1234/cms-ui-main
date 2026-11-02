import PlantViewTableLayout from "../../../../Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../../../tables/PlantTable";




const HealthTable = () => {
    return (
        <PlantViewTableLayout
            title=''
            width={["330px", "full"]}
            height={"100%"}
        >
            <PlantTable
                paginationLimitProps={8}
                width='auto'
                autoWidth={true}
            />
        </PlantViewTableLayout>
    );
};

export default HealthTable