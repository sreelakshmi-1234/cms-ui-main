import { html } from "gridjs";
import UsePlanViewTable from "../../../../Services/Hooks/PlantView/UsePlantViewTable";
import PlantViewTableLayout from "../../../Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../../tables/PlantTable";


const MeterTable = () => {
    // ******************** Generator Table ***********************

    var searchGeneratorTable = {
        ["Meter."]: "AC_Active_Power_Watt,AC_Reactive_Power_kVAr,AC_Apparant_Power_KVA,Daily_Energy_Export_kWh,Daily_Energy_Import_kWh,AVG_Amps_L,AVG_Volt_L,AVG_Freq_L,AC_PF",
    }
    var GeneratorColumn = [{ name: "Name", formatter: (cell: any) => html(`<b"><center>${cell ? cell.replace("Meter.", "") : ""}</center></b>`) }, "Power kW", "Power kVAR", "Power KVA", "Consumption kWh", "Feed kWh", "Line Avg Amps", "Line Avg Volt", "Line Avg Hz", "PF"]
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


export default MeterTable