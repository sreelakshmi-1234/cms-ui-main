import { html } from "gridjs";
import { EnlargeWidgetSize } from "../../../../Services/EnlargeWidget";
import UsePlantAvailability from "../../../../Services/Hooks/PlantView/UsePlantAvailability";
import UsePlanViewBlocksTable from "../../../../Services/Hooks/PlantView/UsePlantVeiwBlocksTable";
import PlantViewTableLayout from "../../../Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../../tables/PlantTable";




const BlockTable = () => {
    // ******************** Blocks Inverter Table ***********************
    
    var searchInverterTable = [
        {
            "Calculation" : "INV_Total_Power,PV_Total_Energy_kWh,PV_Daily_Energy_Today,Load_Power,CUF_DC"
        },
    ]
    var InverterColumn = [
        {name : "Name", formatter : (cell : any) => html(`<center>${cell}</center>`)}, 
        {name : "Power kW"}, 
        {name : "Energy kWh"},
        {name : "Total Energy kWh"}
    ];

    const InverterTableData = UsePlanViewBlocksTable(searchInverterTable) as any;

    return (
        <PlantViewTableLayout
            title='Blocks'
            width={["full", "100%"]}
            height={"100%"}
            fullscreen={true}
            // bg="red"
        >
            <PlantTable
                paginationLimitProps={5}
                search={false}
                column={InverterColumn}
                apiData={InverterTableData || []}
                fullScreen={false}
                autoWidth={false}
                width='100%'
            />
        </PlantViewTableLayout>
    );
};

export default BlockTable