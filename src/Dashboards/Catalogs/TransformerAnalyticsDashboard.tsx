import {
  Box,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import GlobalLoader from "../../components/GlobalLoader";
import LandingTimeService from "../../Services/LandingTimeService";

import TransformerKPIRibbon from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TransformerKPIribbon";
import TransformerLoadingDistribution from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TransformerLoadingDistribution";
import TransformerLossBreakdown from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TransformerLossBreakdown";
import TransformerHealthTrend from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TransformerHealthTrend";
import TopTransformersByLoading from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TopTransformersByLoading";
import TransformerPerformanceDetails from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TransformerPerformanceDetails";
import TransformerEfficiencyComparison from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TransformerEfficiencyComparison";
import TransformerOilTemperatureHeatmap from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TransformerOilTemperatureHeatmap";
import InverterHealthDistribution from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/InverterHealthDistribution";
import InverterDowntimeAnalysis from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/InverterDowntimeAnalysis";
import TopUnderperformingInverters from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/TopUnderperformingInverters";
import InverterModelReliability from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/InverterModelReliability";
import InverterFleetKPIs from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/InverterFleetKPIs";
import InverterPerformanceByMake from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/InverterPerformanceByMake";
import InverterPerformanceTable from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/InverterPerformanceTable";
import InverterEfficiencyBenchmark from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/InverterEfficiencyBenchmark";
import MakeModelImpactPortfolio from "../../components/widgets/DashbaordsWidgets/Catalogs/TransformerAnalytics/MakeModelImpactPortfolio";
const TransformerAnalyticsDashboard = () => {
  LandingTimeService();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <GlobalLoader />}

      <Box
        display={showLoader ? "none" : "block"}
        w="100%"
        mt="0"
        px="12px"
      >
        {/* KPI Ribbon */}
        <TransformerKPIRibbon />

        {/* Row 1 */}
        <Box mt={4}>
          <SimpleGrid
            columns={4}
            spacing="12px"
            w="100%"
          >
            <TransformerLoadingDistribution height="300px" />
            <TransformerLossBreakdown height="300px" />
            <TransformerHealthTrend height="300px" />
            <TopTransformersByLoading height="300px" />
          </SimpleGrid>
        </Box>

        {/* Row 2 */}
        <Box mt={3}>
          <SimpleGrid
            columns={12}
            spacing="12px"
            w="100%"
          >
            <GridItem colSpan={6}>
              <TransformerPerformanceDetails height="300px" />
            </GridItem>

            <GridItem colSpan={3}>
              <TransformerEfficiencyComparison height="300px" />
            </GridItem>

            <GridItem colSpan={3}>
              <TransformerOilTemperatureHeatmap height="300px" />
            </GridItem>
          </SimpleGrid>
        </Box>

        {/* Row 3 */}

        <Box mt={3}>
          <SimpleGrid
            columns={12}
            spacing="12px"
            w="100%"
          >
            {/* Inverter Fleet Overview */}
            <GridItem colSpan={6}>
              <SimpleGrid columns={12} spacing="8px">
                <GridItem colSpan={12}>
                  <InverterFleetKPIs height="90px" />
                </GridItem>

                <GridItem colSpan={5}>
                  <InverterPerformanceByMake height="240px" />
                </GridItem>

                <GridItem colSpan={7}>
                  <InverterPerformanceTable height="240px" />
                </GridItem>
              </SimpleGrid>
            </GridItem>

            {/* Right Side */}
            <GridItem colSpan={3}>
              <InverterEfficiencyBenchmark height="340px" />
            </GridItem>

            <GridItem colSpan={3}>
              <MakeModelImpactPortfolio height="340px" />
            </GridItem>
          </SimpleGrid>
        </Box>

        <Box mt={3}>
          <SimpleGrid
            columns={12}
            spacing="12px"
            w="100%"
          >
            <GridItem colSpan={3}>
              <InverterHealthDistribution height="290px" />
            </GridItem>

            <GridItem colSpan={3}>
              <InverterDowntimeAnalysis height="290px" />
            </GridItem>

            <GridItem colSpan={3}>
              <TopUnderperformingInverters height="290px" />
            </GridItem>

            <GridItem colSpan={3}>
              <InverterModelReliability height="290px" />
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default TransformerAnalyticsDashboard;