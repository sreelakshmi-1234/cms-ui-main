import { html } from "gridjs";
import UsePlanViewTable from "../../../../Services/Hooks/PlantView/UsePlantViewTable";
import PlantViewTableLayout from "../../../Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../../tables/PlantTable";




const DGTable = () => {
    // ******************** Generator Table ***********************

    var searchGeneratorTable = {
        DG: "AC_Active_Power_Watt,Energy_Daily_kWh,AC_Reactive_Power_var,AMP_L1,AMP_L2,AMP_L3,Frequency_Hz_L1,Frequency_Hz_L2,Frequency_Hz_L3,Bus_B_voltage_L1_L2,Bus_B_voltage_L2_L3,Bus_B_voltage_L3_L1,Fuel_Rate,Engine_Speed_RPM"
    }
    var GeneratorColumn = [{ name: "Name", formatter: (cell: any) => html(`<b"><center>${cell}</center></b>`) }, "Power kW", "Daily Export kWh", "Power kVAR", "L1 Amps", "L2 Amps", "L3 Amps", "L1 Hz", "L2 Hz", "L3 Hz", "L1-L2 Volts", "L2-L3 Volts", "L3-L1 Volts", "Fuel Rate", "Engine Speed"]
    const GeneratorTableData = UsePlanViewTable(searchGeneratorTable) as any;
    // console.log("GeneratorTableData", GeneratorTableData);

    return (
        <PlantViewTableLayout
            title='DG'
            width={["100%", "100%"]}
            height={"100%"}
            fullscreen={true}
        >
            <PlantTable
                paginationLimitProps={6}
                column={GeneratorColumn}
                apiData={GeneratorTableData || []}
                autoWidth={false}
                width='100%'
                customColumn={true}
                customColumnCount={10}
                fullScreen={false}
                search={false}
            />
        </PlantViewTableLayout>
    );
};


export default DGTable