import { Box } from "@chakra-ui/react";
import MUIThemeProvider from "../../../../styles/MUIThemeProvider";
import PlantTableLayout from "../../../Layouts/TableLayouts/PlantTableLayout";
import TenantTable from "../../PageWidgets/Tenant/TenantTable";
import PlantTable from "../../tables/PlantTable";
import PortfolioTableContent from "./PortfolioTableContent";



const PortfolioPlantTable = () => {
  return (
    // <PlantTableLayout
    //   title="Assets"
    //   width={["full", "100%"]}
    //   height={"100%"}
    // >
    //   <PlantTable
    //     paginationLimitProps={6}
    //   />
    // </PlantTableLayout>
    <Box my={5} h={"100%"} width={"100%"} overflow={"auto"}>
      <MUIThemeProvider>
        <PortfolioTableContent />
      </MUIThemeProvider>
    </Box>
  );
};

export default PortfolioPlantTable