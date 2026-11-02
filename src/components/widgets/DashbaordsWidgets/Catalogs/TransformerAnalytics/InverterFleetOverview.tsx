import React, { useState } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiCpu,
  FiActivity,
  FiZap,
  FiAlertTriangle,
  FiTool,
  FiTrendingUp,
} from "react-icons/fi";

import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../../charts/ColumnChart";

interface Props {
  height?: string | number;
}

const InverterFleetOverview: React.FC<Props> = ({
  height = "340px",
}) => {
  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.08)",
    "rgba(120,180,255,0.18)"
  );

  const titleColor = useColorModeValue(
    "#1A202C",
    "#E6F0FF"
  );

  const subtitleColor = useColorModeValue(
    "#718096",
    "#9EB6D8"
  );

  const {
    timeWindow,
    handleTimeWindowChange,
    handleReset,
  } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

  const categories = [
    "Sungrow",
    "Huawei",
    "Growatt",
    "SMA",
    "Sineng",
    "Delta",
    "Ingeteam",
    "Others",
  ];

  const apiData = [
    {
      name: "Efficiency (%)",
      data: [99.5, 98.7, 98.3, 99.1, 98.4, 98.8, 99.0, 98.6],
      color: "#3B82F6",
    },
    {
      name: "Availability (%)",
      data: [98.0, 97.5, 97.7, 97.6, 97.4, 97.8, 97.9, 97.5],
      color: "#22C55E",
    },
  ];

  const kpis = [
    {
      title: "Total Inverters",
      value: "158",
      icon: FiCpu,
      color: "#60A5FA",
    },
    {
      title: "Total Capacity",
      value: "100 MW",
      icon: FiZap,
      color: "#38BDF8",
    },
    {
      title: "Avg. Efficiency",
      value: "98.13 %",
      icon: FiTrendingUp,
      color: "#22C55E",
    },
    {
      title: "Inverter Health Score",
      value: "86/100",
      icon: FiActivity,
      color: "#EAB308",
    },
    {
      title: "Total Downtime",
      value: "3.2 hrs",
      icon: FiTool,
      color: "#EF4444",
    },
    {
      title: "Underperforming",
      value: "14",
      icon: FiAlertTriangle,
      color: "#F59E0B",
    },
  ];

  const tableData = [
    {
      model: "SG250HX",
      make: "Sungrow",
      cap: 250,
      units: 28,
      eff: 99.65,
      avail: 99.2,
      health: 90,
    },
    {
      model: "SUN2000-215KTL",
      make: "Huawei",
      cap: 215,
      units: 24,
      eff: 99.42,
      avail: 98.8,
      health: 88,
    },
    {
      model: "MAX 125KTL-3-X LV",
      make: "Growatt",
      cap: 125,
      units: 20,
      eff: 97.96,
      avail: 97.5,
      health: 85,
    },
    {
      model: "Sunny Tripower 125",
      make: "SMA",
      cap: 125,
      units: 16,
      eff: 98.10,
      avail: 98.3,
      health: 87,
    },
    {
      model: "SP-110K3",
      make: "Sineng",
      cap: 110,
      units: 18,
      eff: 97.55,
      avail: 96.9,
      health: 82,
    },
    {
      model: "M125HV",
      make: "Delta",
      cap: 125,
      units: 14,
      eff: 97.31,
      avail: 96.2,
      health: 80,
    },
    {
      model: "INGECON SUN 100TL",
      make: "Ingeteam",
      cap: 100,
      units: 12,
      eff: 97.12,
      avail: 96.0,
      health: 79,
    },
  ];

  return (
    <GraphLayout
      title="INVERTER FLEET OVERVIEW"
      titleFontSize="13px"
      width={["100%", "100%"]}
      height={typeof height === 'number' ? `${height}px` : height}
      timeWindow={true}
      onTimeWindowChange={handleTimeWindowChange}
      onReset={handleReset}
      fullScreen={true}
      onExport={exportFunctions}
      WidgetProps={{ p: 3 }}
    >
      <SimpleGrid columns={6} spacing={2} mb={3}>
        {kpis.map((item) => (
          <Flex
            key={item.title}
            align="center"
            gap={3}
            bg="rgba(7,32,70,0.55)"
            border="1px solid rgba(90,150,255,0.18)"
            borderRadius="10px"
            px={3}
            py={2}
          >
            <Flex
              w="36px"
              h="36px"
              borderRadius="full"
              align="center"
              justify="center"
              bg={`${item.color}20`}
            >
              <Icon
                as={item.icon}
                color={item.color}
                boxSize={4}
              />
            </Flex>

            <Box>
              <Text
                fontSize="10px"
                color={subtitleColor}
              >
                {item.title}
              </Text>

              <Text
                fontWeight="700"
                fontSize="16px"
                color={titleColor}
              >
                {item.value}
              </Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={12} spacing={3}>
        <Box
          gridColumn="span 5"
          bg="rgba(7,32,70,0.35)"
          borderRadius="10px"
          border="1px solid rgba(90,150,255,0.12)"
          p={2}
        >
          <Text
            fontSize="11px"
            fontWeight="700"
            color={titleColor}
            mb={2}
          >
            INVERTER PERFORMANCE BY MAKE
          </Text>

          <ColumnChart
            height={220}
            apiData={apiData}
            onExportReady={setExportFunctions}
            props={{
              chart: { backgroundColor: 'transparent' },
              xAxis: { categories, labels: { style: { color: '#AFC4E8', fontSize: '10px' } } },
              yAxis: { min: 92, max: 100, title: { text: '' }, labels: { style: { color: '#AFC4E8' } } },
              legend: { enabled: true, itemStyle: { color: '#D7E6FF' } },
              tooltip: { shared: true },
              plotOptions: { column: { borderRadius: 2, pointPadding: 0.12, groupPadding: 0.15 } }
            }}
          />
        </Box>

        <Box
          gridColumn="span 7"
          bg="rgba(7,32,70,0.35)"
          borderRadius="10px"
          border="1px solid rgba(90,150,255,0.12)"
          p={2}
        >
          <Text
            fontSize="11px"
            fontWeight="700"
            color={titleColor}
            mb={2}
          >
            INVERTER PERFORMANCE BY MODEL (TOP 10)
          </Text>

          <Table size="sm" variant="unstyled">
            <Thead>
              <Tr>
                <Th color="#8FB2DD" fontSize="10px">Model</Th>
                <Th color="#8FB2DD" fontSize="10px">Make</Th>
                <Th color="#8FB2DD" fontSize="10px">Capacity</Th>
                <Th color="#8FB2DD" fontSize="10px">Units</Th>
                <Th color="#8FB2DD" fontSize="10px">Efficiency</Th>
                <Th color="#8FB2DD" fontSize="10px">Availability</Th>
                <Th color="#8FB2DD" fontSize="10px">Health</Th>
              </Tr>
            </Thead>

            <Tbody>
              {tableData.map((row) => (
                <Tr key={row.model}>
                  <Td color="#DCE8FF" fontSize="11px">{row.model}</Td>
                  <Td color="#DCE8FF" fontSize="11px">{row.make}</Td>
                  <Td color="#DCE8FF" fontSize="11px">{row.cap}</Td>
                  <Td color="#DCE8FF" fontSize="11px">{row.units}</Td>

                  <Td
                    color="#22C55E"
                    fontWeight="700"
                    fontSize="11px"
                  >
                    {row.eff}
                  </Td>

                  <Td
                    color="#22C55E"
                    fontWeight="700"
                    fontSize="11px"
                  >
                    {row.avail}
                  </Td>

                  <Td
                    color="#F59E0B"
                    fontWeight="700"
                    fontSize="11px"
                  >
                    {row.health}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </GraphLayout>
  );
};

export default InverterFleetOverview;