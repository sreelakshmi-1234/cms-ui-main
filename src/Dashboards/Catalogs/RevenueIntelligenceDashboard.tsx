import { Box, GridItem, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import GlobalLoader from "../../components/GlobalLoader";

import RevenueTopCards from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/RevenueTopCards";

import RevenueLeakageWaterfall from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/RevenueLeakageWaterfall";
import AssetRevenueContributionHeatmap from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/AssetRevenueContributionHeatmap";
import DigitalTwinPerformanceScatter from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/DigitalTwinPerformanceScatter";

import PRDecomposition from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/PRDecomposition";
import InverterBehaviorAnalytics from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/InverterBehaviorAnalytics";
import RevenueRankingLeaderboard from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/RevenueRankingLeaderboard";

import PortfolioBenchmarkRadar from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/PortfolioBenchmarkRadar";
import IrradianceToRevenueConversion from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/IrradianceToRevenueConversion";
import DegradationIntelligence from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/DegradationIntelligence";

import CapacityUtilizationMap from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/CapacityUtilizationMap";
import SunriseToSunsetEnergySignature from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/SunriseToSunsetEnergySignature";
import LostEnergyAttributionSankey from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/LostEnergyAttributionSankey";

import CurtailmentIntelligence from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/CurtailmentIntelligence";
import AlarmImpactMatrix from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/AlarmImpactMatrix";
import AssetHealthVsRevenue from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/AssetHealthVsRevenue";

import StringLevelOutlierDetection from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/StringLevelOutlierDetection";

import TopBestAssets from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/TopBestAssets";
import ForecastAccuracy from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/ForecastAccuracy";
import AIRedFlagCenter from "../../components/widgets/DashbaordsWidgets/Catalogs/RevenueIntelligence/AIRedFlagCenter";

interface Props {
  type: "plant" | "portfolio";
}

const RevenueIntelligenceDashboard = ({ type }: Props) => {
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
        w="1500px"
        minH="2200px"
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
            <RevenueTopCards />
          </GridItem>
        </HStack>

        {/* ROW 1 */}

        <HStack
          h="260px"
          w="1500px"
          gap={4}
          mt={12}
        >
          <GridItem
            h="260px"
            w="370px"
          >
            <RevenueLeakageWaterfall />
          </GridItem>

          <GridItem
            h="260px"
            w="370px"
          >
            <AssetRevenueContributionHeatmap type={type} />
          </GridItem>

          <GridItem
            h="260px"
            w="350px"
          >
            <DigitalTwinPerformanceScatter />
          </GridItem>

          <GridItem
            h="450px"
            w="340px"
            mt={12}
          >
            <TopBestAssets />
          </GridItem>
        </HStack>

        {/* ROW 2 */}

        <HStack
          h="260px"
          w="1500px"
          gap={4}
          mt={20}
        >
          <GridItem
            h="260px"
            w="370px"
          >
            <PRDecomposition />
          </GridItem>

          <GridItem
            h="260px"
            w="370px"
          >
            <InverterBehaviorAnalytics />
          </GridItem>

          <GridItem
            h="260px"
            w="350px"
          >
            <RevenueRankingLeaderboard type={type} />
          </GridItem>

          
        </HStack>

        {/* ROW 3 */}

        <HStack
          h="260px"
          w="1500px"
          gap={4}
          mt={14}
        >
          <GridItem
            h="260px"
            w="370px"
          >
            <PortfolioBenchmarkRadar type={type} />
          </GridItem>

          <GridItem
            h="260px"
            w="370px"
          >
            <IrradianceToRevenueConversion type={type} />
          </GridItem>

          <GridItem
            h="260px"
            w="370px"
          >
            <DegradationIntelligence />
          </GridItem>

          <GridItem
            h="260px"
            w="340px"
          >
            <ForecastAccuracy />
          </GridItem>
        </HStack>

        {/* ROW 4 */}

        <HStack
          h="260px"
          w="1500px"
          gap={4}
          mt={20}
        >
          <GridItem
            h="260px"
            w="494px"
          >
            <CapacityUtilizationMap type={type} />
          </GridItem>

          <GridItem
            h="260px"
            w="494px"
          >
            <SunriseToSunsetEnergySignature type={type} />
          </GridItem>

          <GridItem
            h="260px"
            w="494px"
          >
            <LostEnergyAttributionSankey />
          </GridItem>

            {/* <GridItem
            h="260px"
            w="494px"
          >
            <AIRedFlagCenter />
          </GridItem> */}
        </HStack>

        {/* ROW 5 */}

        <HStack
          h="260px"
          w="1500px"
          gap={4}
          mt={20}
        >
          <GridItem
            h="260px"
            w="494px"
          >
            <CurtailmentIntelligence />
          </GridItem>

          <GridItem
            h="260px"
            w="494px"
            ml={0}
          >
            <AlarmImpactMatrix />
          </GridItem>

          <GridItem
            h="260px"
            w="494px"
          >
            <AssetHealthVsRevenue />
          </GridItem>
          <GridItem
            h="260px"
            w="494px"
            ml={-54}
          >
            <AIRedFlagCenter />
          </GridItem>
        </HStack>

        {/* ROW 6 */}

        <HStack
          h="260px"
          w="1125px"
          gap={4}
          mt={20}
        >
          <GridItem
            h="260px"
            w="1125px"
          >
            <StringLevelOutlierDetection />
          </GridItem>
        </HStack>
      </Box>
    </>
  );
};

export default RevenueIntelligenceDashboard;