import { html } from "gridjs";
import UsePlanViewTable from "../../../../Services/Hooks/PlantView/UsePlantViewTable";
import PlantViewTableLayout from "../../../Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../../tables/PlantTable";


const GridTable = () => {
    // ******************** Generator Table ***********************

    var searchGeneratorTable = {
        ["Grid Meter"]: "Grid_Power_kW,Grid_Power_kVAR,Grid_Power_KVA,Grid_Daily_Energy_Export_kWh,Grid_Daily_Energy_Import_kWh,Grid_AVG_Current,Grid_AVG_Voltage,Grid_AVG_Frequency,Grid_PF"
    }
    var GeneratorColumn = [{ name: "Name", formatter: (cell: any) => html(`<b"><center>${cell}</center></b>`) }, "Power kW", "Power kVAR", "Power KVA", "Consumption kWh", "Feed kWh", "Line Avg Amps", "Line Avg Volt", "Line Avg Hz", "PF"]
    const GeneratorTableData = UsePlanViewTable(searchGeneratorTable) as any;
    // console.log("GeneratorTableData", GeneratorTableData);

    return (
        <PlantViewTableLayout
            title='Meters'
            width={["100%", "100%"]}
            height={"100%"}
            fullscreen={true}
        >
            <PlantTable
                paginationLimitProps={8}
                column={GeneratorColumn}
                apiData={GeneratorTableData || []}
                autoWidth={false}
                width='100%'
                customColumn={false}
                // customColumnCount={9}
                fullScreen={false}
                search={false}
            />
        </PlantViewTableLayout>
    );
};


export default GridTable