import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Flex,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";

import AssetOptimizationDashboard from "../../Dashboards/Catalogs/AssetOptimizationDashboard";
import RevenueIntelligenceDashboard from "../../Dashboards/Catalogs/RevenueIntelligenceDashboard";
import TransformerAnalyticsDashboard from "../../Dashboards/Catalogs/TransformerAnalyticsDashboard";
import FleetBenchmarkDashboard from "../../Dashboards/Catalogs/FleetBenchmarkDashboard";
import RevenueAnalyticsDashboard from "../../Dashboards/Catalogs/RevenueAnalyticsDashboard";
import PlantOperationsDashboard from "../../Dashboards/Catalogs/PlantOperationsDashboard";
const CatalogDashboardLayout = () => {
  // catalogDashboards is defined after `catalogType` state so it can be passed into dashboards

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sidebarBg = useColorModeValue("white", "gray.800");
  const sidebarBorder = useColorModeValue("gray.200", "gray.700");
  const activeBg = useColorModeValue("blue.50", "blue.900");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const titleColor = useColorModeValue("gray.700", "gray.200");

  const [catalogType, setCatalogType] = useState<"plant" | "portfolio">(
    "plant"
  );

  const catalogDashboards = [
    {
      title: "Revenue Intelligence Dashboard",
      dashboard: (
        <RevenueIntelligenceDashboard type={catalogType} />
      ),
    },
    {
      title: "Asset Optimization Dashboard",
      dashboard: <AssetOptimizationDashboard type={catalogType} />,
    },
    {
      title: "Fleet Benchmark Dashboard",
      dashboard: <FleetBenchmarkDashboard type={catalogType} />,
    },
    {
      title: "Transformer Analytics Dashboard",
      dashboard: <TransformerAnalyticsDashboard />,
    },
    {
      title: "Revenue Analytics Dashboard",
      dashboard: <RevenueAnalyticsDashboard />,
    },
    {
      title: "Plant Operations Dashboard",
      dashboard: <PlantOperationsDashboard />,
    },
  ];

  const [selectedDashboardIndex, setSelectedDashboardIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedDashboardIndex]);

  return (
    <Flex
      mt={"87px"} 
      width="1816px" 
      ml={10} 
      minH={"1000px"}
    //   position="relative"
    >
      {/* Main Dashboard Area */}
      <Box
        flex="1"
        pr="340px"
        // px={{ base: 4, md: 6 }}
      >
        <Box
          w="100%" // 1816px total width - 320px sidebar - 40px padding = 1496px
          minH="100%"
        >
          {catalogDashboards[selectedDashboardIndex].dashboard}
        </Box>
      </Box>

      {/* Fixed Catalog Sidebar */}
      <Box
        position="fixed"
        top="87px"
        right="0"
        h="100%"
        w="320px"
        bg={sidebarBg}
        borderLeft="1px solid"
        borderColor={sidebarBorder}
        overflowY="auto"
        p={5}
        boxShadow="sm"
        zIndex={10}
      >
        <Flex align="center" justify="space-between" mb={4}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={titleColor}
          >
            Catalogs
          </Text>

          <Flex align="center" gap={2}>
            <Text fontSize="xs">Plant</Text>
            <Switch
              isChecked={catalogType === "portfolio"}
              onChange={(e) =>
                setCatalogType(e.target.checked ? "portfolio" : "plant")
              }
              colorScheme="blue"
            />
            <Text fontSize="xs">Portfolio</Text>
          </Flex>
        </Flex>

        <VStack spacing={2} align="stretch">
          {catalogDashboards.map((item, index) => (
            <Box
              key={item.title}
              p={4}
              borderRadius="lg"
              cursor="pointer"
              bg={
                selectedDashboardIndex === index ? activeBg : "transparent"
              }
              _hover={{
                bg: hoverBg,
              }}
              transition="all 0.2s"
              onClick={() => setSelectedDashboardIndex(index)}
            >
              <Text
                fontSize="sm"
                fontWeight={selectedDashboardIndex === index ? "semibold" : "medium"}
              >
                {item.title}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default CatalogDashboardLayout;