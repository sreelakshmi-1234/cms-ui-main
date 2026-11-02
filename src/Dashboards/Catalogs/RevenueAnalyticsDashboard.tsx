import {
  Box,
  GridItem,
  HStack,
} from "@chakra-ui/react";

import RevenueKPIRow from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueKPIRow";

import RevenueTrend from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueTrend";
import RevenueLeakageWaterfall from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueLeakageWaterfall";
import RevenueBreakdown from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueBreakdown";

import PlantRevenueLeaderboard from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/PlantRevenueLeaderboard";
import RevenueHeatmap from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueHeatmap";
import RevenueVsGeneration from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueVsGeneration";

import CurtailmentImpact from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/CurtailmentImpact";
import TariffContractPerformance from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/TariffContractPerformance";
import RevenueForecast from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueForecast";

import RevenueAIInsights from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueAnalytics/RevenueAIInsights";

const RevenueAnalyticsDashboard = () => {
  return (
    <Box
      w="1500px"
      mt="10px"
      pl="14px"
      pr="2px"
    >
      {/* KPI ROW */}

      <HStack
        h="90px"
        w="1500px"
        gap={3}
        mb={2}
      >
        <GridItem
          h="90px"
          w="1500px"
        >
          <RevenueKPIRow />
        </GridItem>
      </HStack>

      {/* ROW 1 */}

      <HStack
        h="260px"
        w="1500px"
        gap={4}
        mt={2}
      >
        <GridItem
          h="260px"
          w="494px"
          mt={-10}
          position="relative"
          zIndex={2}
        >
          <RevenueTrend />
        </GridItem>

        <GridItem
          h="260px"
          w="494px"
        >
          <RevenueLeakageWaterfall />
        </GridItem>

        <GridItem
          h="260px"
          w="494px"
          mt={-10}
        >
          <RevenueBreakdown />
        </GridItem>
      </HStack>

      {/* ROW 2 */}

      <HStack
        h="260px"
        w="1500px"
        gap={4}
        mt={4}
      >
        <GridItem
          h="260px"
          w="494px"
        >
          <PlantRevenueLeaderboard />
        </GridItem>

        <GridItem
          h="260px"
          w="494px"
          mt={-10}
        >
          <RevenueHeatmap />
        </GridItem>

        <GridItem
          h="260px"
          w="494px"
          mt={-10}
        >
          <RevenueVsGeneration />
        </GridItem>
      </HStack>

      {/* ROW 3 */}

      <HStack
        h="260px"
        w="1500px"
        gap={4}
        mt={4}
      >
        <GridItem
          h="350px"
          w="494px"
          mt={12}
        >
          <CurtailmentImpact />
        </GridItem>

        <GridItem
          h="350px"
          w="494px"
          mt={24}
        >
          <TariffContractPerformance />
        </GridItem>

        <GridItem
          h="350px"
          w="494px"
          mt={14}
        >
          <RevenueForecast />
        </GridItem>
      </HStack>

      {/* AI INSIGHTS */}

      <HStack
        h="150px"
        w="1500px"
        gap={4}
        mt={28}
      >
        <GridItem
          h="150px"
          w="1500px"
        >
          <RevenueAIInsights />
        </GridItem>
      </HStack>
    </Box>
  );
};

export default RevenueAnalyticsDashboard;