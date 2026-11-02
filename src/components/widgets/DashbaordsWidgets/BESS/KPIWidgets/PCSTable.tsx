import { html } from "gridjs";
import UsePlanViewTable from "../../../../../Services/Hooks/PlantView/UsePlantViewTable";
import PlantViewTableLayout from "../../../../Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../../../tables/PlantTable";



const PCSTable = () => {
    // ******************** PCS Table ***********************

    var searchPCSTable = {
        PCS: "AC_Active_Power_Watt,AC_Reactive_Power_var,ESS_Ph_AB_Volt_Total_PCS,ESS_Ph_BC_Volt_Total_PCS,ESS_Ph_CA_Volt_Total_PCS,ESS_Ph_A_Amps_Total_PCS,ESS_Ph_B_Amps_Total_PCS,ESS_Ph_C_Amps_Total_PCS"
    }
    var PCSColumn = [{ name: "Name", formatter: (cell: any) => html(`<center>${cell}</center>`) }, "Power kW", "Reactive Power", "Volt-1", "Volt-2", "Volt-3", "L1 Amps", "L2 Amps", "L3 Amps"]
    var PCSFirstColName = "ESS"
    const PCSTableData = UsePlanViewTable(searchPCSTable, PCSFirstColName) as any;
    return (
        <PlantViewTableLayout
            title='PCS'
            width={["100%", "100%"]}
            height={"100%"}
            fullscreen={true}
        >
            <PlantTable
                paginationLimitProps={5}
                column={PCSColumn}
                apiData={PCSTableData || []}
                autoWidth={false}
                width='100%'
                customColumn={true}
                customColumnCount={6}
                fullScreen={false}
                search={false}
            />
        </PlantViewTableLayout>
    );
};


export default PCSTable