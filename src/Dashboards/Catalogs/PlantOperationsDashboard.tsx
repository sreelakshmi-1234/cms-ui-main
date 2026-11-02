import {
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";

import PlantKPIRibbon from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/PlantKPIRibbon";

import PlantDigitalTwinMap from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/PlantDigitalTwinMap";

import EnergyFlowWidget from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/EnergyFlowWidget";
import PerformanceHeatmap from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/PerformanceHeatmap";
import AssetHealthOverview from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/AssetHealthOverview";
import LiveAlertsWidget from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/LiveAlertsWidget";

import InverterPerformance from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/InverterPerformance";
import UnderperformingInverters from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/UnderperformingInverters";
import TransformerLoading from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/TransformerLoading";
import EnvironmentalConditions from "../../components/widgets/DashbaordsWidgets/Catalogs/PlantOperation/EnvironmentalConditions";

const PlantOperationsDashboard = () => {
  return (
    <Box
  w="1500px"
  minH="1200px"
  mt="10px"
  pl="14px"
  pr="2px"
>
      {/* KPI ROW */}

      <PlantKPIRibbon />

      {/* MAIN CONTENT */}

      <HStack
        align="start"
        spacing={4}
        mt={3}
      >
        {/* LEFT SECTION */}

        <VStack
          spacing={4}
          align="stretch"
          w="1180px"
        >
          {/* DIGITAL TWIN */}

          <Box
            w="1180px"
            h="705px"
          >
            <PlantDigitalTwinMap />
          </Box>

          {/* BOTTOM ROW */}

          <HStack
            spacing={4}
            align="stretch"
            h="175px"
            mt={8}
          >
            <Box
              w="285px"
              h="175px"
            >
              <InverterPerformance />
            </Box>

            <Box
              w="285px"
              h="175px"
            >
              <UnderperformingInverters />
            </Box>

            <Box
              w="285px"
              h="175px"
            >
              <TransformerLoading />
            </Box>

            <Box
              w="285px"
              h="175px"
            >
              <EnvironmentalConditions />
            </Box>
          </HStack>
        </VStack>

        {/* RIGHT SIDEBAR */}

        <VStack
          spacing={4}
          align="stretch"
          w="300px"
        >
          <Box
            h="180px"
            w="300px"
          >
            <EnergyFlowWidget />
          </Box>

          <Box
            h="320px"
            w="300px"
            mt={14}
          >
            <PerformanceHeatmap />
          </Box>

          <Box
            h="150px"
            w="300px"
            mt={6}
          >
            <AssetHealthOverview />
          </Box>

          <Box
            h="165px"
            w="300px"
            mt={16}
          >
            <LiveAlertsWidget />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default PlantOperationsDashboard;