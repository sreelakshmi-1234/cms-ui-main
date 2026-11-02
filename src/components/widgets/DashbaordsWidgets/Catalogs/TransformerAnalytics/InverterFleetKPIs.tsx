import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiCpu,
  FiZap,
  FiTrendingUp,
  FiActivity,
  FiTool,
  FiAlertTriangle,
} from "react-icons/fi";

interface Props {
  height?: string;
}

const InverterFleetKPIs: React.FC<Props> = ({
  height = "90px",
}) => {
  const bg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.08)",
    "rgba(120,180,255,0.18)"
  );

  const titleColor = useColorModeValue("#062D59", "#E6F0FF");
  const labelColor = useColorModeValue("#4A5568", "#9EB6D8");
  const valueColor = useColorModeValue("#062D59", "#FFFFFF");
  const itemBg = useColorModeValue("transparent", "rgba(7,32,70,0.45)");
  const itemBorder = useColorModeValue("1px solid rgba(0,0,0,0.03)", "1px solid rgba(90,150,255,0.15)");

  const data = [
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
      title: "Health Score",
      value: "86/100",
      icon: FiActivity,
      color: "#EAB308",
    },
    {
      title: "Downtime",
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

  return (
    <Box
      h={height}
      bg={bg}
      borderRadius="14px"
      border="1px solid"
      borderColor={borderColor}
      p={2}
      overflow="hidden"
    >
      <Text
        color={titleColor}
        fontSize="11px"
        fontWeight="700"
        mb={2}
        textTransform="uppercase"
      >
        Inverter Fleet Overview
      </Text>

      <SimpleGrid
        columns={6}
        spacing={2}
      >
        {data.map((item) => (
          <Flex
            key={item.title}
            h="52px"
            px={2}
            align="center"
            gap={2}
            borderRadius="8px"
            bg={itemBg}
            border={itemBorder}
          >
            <Flex
              minW="28px"
              w="28px"
              h="28px"
              borderRadius="full"
              bg={`${item.color}20`}
              align="center"
              justify="center"
            >
              <Icon
                as={item.icon}
                color={item.color}
                boxSize={3.5}
              />
            </Flex>

            <Box overflow="hidden">
              <Text
                color={labelColor}
                fontSize="9px"
                lineHeight="10px"
                noOfLines={1}
              >
                {item.title}
              </Text>

              <Text
                color={valueColor}
                fontSize="14px"
                fontWeight="700"
                lineHeight="16px"
                noOfLines={1}
              >
                {item.value}
              </Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default InverterFleetKPIs;