import {
    Box,
    GridItem,
    HStack,
} from "@chakra-ui/react";

import FleetBenchmarkKPIRow from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/FleetBenchmarkKPI";
import TopPerformers from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/TopPerformers";
import Underperformers from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/Underperformers";
import KeyInsights from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/KeyInsights";
import CustomBenchmark from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/CustomBenchmark";
import FleetPerformanceRadar from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/FleetPerformanceRadar";
import PlantPerformanceComparison from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/PlantPerformanceComparison";
import FleetDistributionAnalysis from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/FleetDistributionAnalysis";
import MetricBenchmarkTrends from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/MetricBenchmarkTrends";
import { BenchmarkByPlantSize } from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark";
import PerformanceVsPlantAge from "../../components/widgets/DashbaordsWidgets/Catalogs/FleetBenchmark/PerformanceVsPlantAge";

interface Props { type: "plant" | "portfolio"; }
const FleetBenchmarkDashboard = ({ type }: Props) => {
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
                mb={4}
            >
                <GridItem
                    h="90px"
                    w="1500px"
                >
                    <FleetBenchmarkKPIRow />
                </GridItem>
            </HStack>

            {/* SECOND ROW */}

            <HStack
                h="360px"
                w="1500px"
                gap={4}
            >
                {/* Left Widget */}

                <GridItem
                    h="360px"
                    w="280px"
                >
                    <FleetPerformanceRadar />
                </GridItem>

                {/* Center Widget */}

                <GridItem
                    h="360px"
                    w="860px"
                >
                    <PlantPerformanceComparison type={type} />
                </GridItem>

                {/* Right Widget */}

                <GridItem
                    h="360px"
                    w="320px"
                    mt="-24px"
                >
                    <FleetDistributionAnalysis />
                </GridItem>
            </HStack>
            {/* THIRD ROW */}

            <HStack
                h="280px"
                w="1500px"
                gap={4}
                mt={0}
            >
                <GridItem h="280px" w="494px">
                    <MetricBenchmarkTrends />
                </GridItem>

                <GridItem h="280px" w="494px">
                    <BenchmarkByPlantSize />
                </GridItem>

                <GridItem h="280px" w="494px">
                    <PerformanceVsPlantAge />
                </GridItem>
            </HStack>
            {/* FOURTH ROW */}

            <HStack
                h="220px"
                w="1500px"
                gap={4}
                mt={9}
            >
                <GridItem
                    h="220px"
                    w="363px"
                >
                    <TopPerformers type={type} />
                </GridItem>

                <GridItem
                    h="220px"
                    w="363px"
                >
                    <Underperformers type={type}/>
                </GridItem>

                <GridItem
                    h="220px"
                    w="363px"
                >
                    <KeyInsights />
                </GridItem>

                <GridItem
                    h="220px"
                    w="363px"
                >
                    <CustomBenchmark />
                </GridItem>
            </HStack>
        </Box>

    );
};

export default FleetBenchmarkDashboard;