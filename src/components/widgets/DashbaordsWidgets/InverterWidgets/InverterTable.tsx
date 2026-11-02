import { html } from "gridjs";
import { EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import TabsTableLayout from "../../../Layouts/TableLayouts/TabsTableLayout";
import PlantTable from "../../tables/PlantTable";
import UsePlanViewTable from "../../../../Services/Hooks/PlantView/UsePlantViewTable";
import UseManyDeviceSameFilteredKeyTable from "../../../../Services/Hooks/UseManyDeviceSameFilteredKeyTable";
import InverterMPPTGraph from "./InverterMPPTGraph";
import InverterStringsGraph from "./InverterStringsGraph";
import { useState } from "react";


const stringNumberSort = (cell : any) : string => {
    return (cell).split("-")[0] + "-" + (((cell).split("-")[1]).length == 1 ? "0" + (cell).split("-")[1] : (cell).split("-")[1]);
}

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
}

const InverterTable = () => {
    // ******************** Inverter Table ***********************

    var searchInverterTable = {
        Inverter: "Inverter_Communication,AC_Active_Power_Watt,Energy_Daily_kWh,Energy_Total_kWh,AC_Reactive_Power_var,AC_Apparent_Power_VA,Active_Power_referance,Frequency_Hz,Volt_L1_L2,Volt_L2_L3,Volt_L3_L1,Fault_Code"
    }
    var InverterColumn = [{ name: "Name", formatter: (cell: any) => html(`<center>${cell}</center>`) }, {
        name: "State",
        formatter: (cell: any, row: any) => row.cells[2].data ? parseFloat(row.cells[2].data) > 0 ? html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:green; height:15px; width:15px; border-radius:50%;"></div></div>`) : html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:red; height:15px; width:15px; border-radius:50%;"></div></div>`) : ""
    }, "Power kW", "Daily Energy kWh", "Total Energy kWh", "Power kVAR", "Power KVA", "kW % Ref", "Frequency Hz", "L1-L2 Volts", "L2-L3 Volts", "L3-L1 Volts", "Fault State"]

    const InverterTableData = UsePlanViewTable(searchInverterTable) as any;

    // ******************* MPPT Table ***********************

    // var searchMPPTTable = {
    //     "Inverter": "INV-String"
    // };
    // var searchFields = ["DC_String_Amps", "DC_String_Volt"];
    // var FieldDisplayName = ["Volt", "Amps"];

    // const MPPTTableData = UseManyDeviceSameFilteredKeyTable(searchMPPTTable, searchFields, FieldDisplayName) as any;

    // MPPT Graph
    const [exportFunctionsMPPT, setExportFunctionsMPPT] = useState<ExportFunctions | null>(null);   


    return (
        <TabsTableLayout

            tabs={["INV", "MPPT", "String"]}
            dotColors={["yellow", "Blue"]}
            title='Inverters'
            width={["full", "100%"]}
            height={"100%"}
            fullscreen={true}
            onExport={exportFunctionsMPPT}
            childrens={[
                <PlantTable
                    paginationLimitProps={7}
                    column={InverterColumn}
                    apiData={InverterTableData || []}
                    fullScreen={false}
                    autoWidth={false}
                    width='100%'
                    customColumn={true}
                    customColumnCount={10}
                    search={false}
                />,
                <InverterMPPTGraph onExportReady={setExportFunctionsMPPT} />,
                <InverterStringsGraph onExportReady={setExportFunctionsMPPT} />
            ]}
        />
    );
};

export default InverterTable