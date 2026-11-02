import { Box, HStack, VStack } from "@chakra-ui/react";

import AssetOptimizationKPIRow from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/AssetOptimizationKPIRow";

import RevenueLeakageAnalysis from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/RevenueLeakageAnalysis";
import RevenueContributionByAsset from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/RevenueContributionByAsset";
import PlantPerformanceBenchmark from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/PlantPerformanceBenchmark";

import TransformerFleetOverview from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/TransformerFleetOverview";
import InverterFleetPerformance from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/InverterFleetPerformance";

import MakeModelImpact from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/MakeModelImpact";
import PortfolioHealthMatrix from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/PortfolioHealthMatrix";
import TopUnderperformingAssets from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/TopUnderperformingAssets";
import PortfolioTrendSummary from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/PortfolioTrendSummary";
import TransformerFleetKPIs from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/TransformerFleetKPIs";
import TransformerEfficiencyByMake from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/TransformerEfficiencyByMake";
import TopUnderperformingTransformers from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/TopUnderperformingTransformers";
import AIAgentPanel from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/AIAgentPanel";
import TopRevenueRisks from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/TopRevenueRisks";
import PredictedFailures from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/PredictedFailures";
import RevenueOpportunities from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/RevenueOpportunities";
import AIRecommendedActions from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/AIRecommendedActions";

import AIInsightsSummary from "../../components/widgets/DashbaordsWidgets/Catalogs/AssetOptimization/AIInsightsSummary";

interface Props { type: "plant" | "portfolio"; }

const AssetOptimizationDashboard = ({ type }: Props) => {
    return (
        <Box
            w="1500px"
            mt="10px"
            pl="14px"
            pr="2px"
        >
            {/* KPI ROW */}

            <AssetOptimizationKPIRow />

            {/* MAIN CONTENT */}

            <HStack
                align="start"
                spacing={4}
            >
                {/* LEFT CONTENT */}

                <VStack
                    spacing={4}
                    align="stretch"
                    w="1180px"
                >
                    {/* ROW 1 */}

                    <HStack
                        h="260px"
                        spacing={4}
                        align="stretch"
                    >
                        <Box
                            w="360px"
                            h="260px"
                        >
                            <RevenueLeakageAnalysis />
                        </Box>

                        <Box
                            w="320px"
                            h="260px"
                        >
                            <RevenueContributionByAsset />
                        </Box>

                        <Box
                            w="484px"
                            h="260px"
                        >
                            <PlantPerformanceBenchmark type={type} />
                        </Box>
                    </HStack>



                    {/* ROW 2 */}

                    <HStack
                        h="280px"
                        spacing={4}
                        align="stretch"
                    >
                        {/* LEFT SIDE : Transformer Fleet Section */}

                        <Box
                            w="560px"
                            h="280px"
                        >
                            <VStack
                                h="100%"
                                spacing={3}
                                align="stretch"
                            >
                                {/* KPI CARDS */}

                                <Box h="75px">
                                    <TransformerFleetKPIs />
                                </Box>

                                {/* CHART + TABLE */}

                                <HStack
                                    flex={1}
                                    spacing={3}
                                    align="stretch"
                                >
                                    <Box
                                        w="300px"
                                        h="100%"
                                    >
                                        <TransformerEfficiencyByMake />
                                    </Box>

                                    <Box
                                        w="420px"
                                        h="290px"
                                        // ml="60px"
                                    >
                                        <TopUnderperformingTransformers />
                                    </Box>
                                </HStack>
                            </VStack>
                        </Box>

                        {/* RIGHT SIDE : Existing Widget */}

                        <Box
                            w="530px"
                            h="370px"
                            ml="80px"
                        >
                            <InverterFleetPerformance />
                        </Box>
                    </HStack>

                    {/* ROW 3 */}

                    <HStack
                        h="240px"
                        spacing={4}
                        align="stretch"
                        mt="90px"
                    >
                        <Box
                            w="280px"
                            h="240px"
                        >
                            <MakeModelImpact />
                        </Box>

                        <Box
                            w="280px"
                            h="240px"
                        >
                            <PortfolioHealthMatrix />
                        </Box>

                        <Box
                            w="280px"
                            h="240px"
                        >
                            <TopUnderperformingAssets />
                        </Box>

                        <Box
                            w="308px"
                            h="240px"
                        >
                            <PortfolioTrendSummary />
                        </Box>
                    </HStack>

                    {/* BOTTOM INSIGHTS */}

                    <Box
                        h="165px"
                        w="1180px"
                    >
                        <AIInsightsSummary />
                    </Box>
                </VStack>

                {/* RIGHT SIDEBAR */}

                <VStack
                    spacing={4}
                    align="stretch"
                    w="300px"
                >
                    <Box
                        h="200px"
                        w="300px"
                    >
                        <AIAgentPanel />
                    </Box>

                    <Box
                        h="180px"
                        w="300px"
                    >
                        <TopRevenueRisks />
                    </Box>

                    <Box
                        h="250px"
                        w="300px"
                    >
                        <PredictedFailures />
                    </Box>

                    <Box
                        h="210px"
                        w="300px"
                    >
                        <RevenueOpportunities />
                    </Box>

                    <Box
                        h="180px"
                        w="300px"
                    >
                        <AIRecommendedActions />
                    </Box>
                </VStack>
            </HStack>
        </Box>
    );
};

export default AssetOptimizationDashboard;