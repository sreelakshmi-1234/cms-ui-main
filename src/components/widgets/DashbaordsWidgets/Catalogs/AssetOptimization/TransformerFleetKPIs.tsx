import {
  Box,
  Flex,
  Text,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiGrid,
  FiZap,
  FiTrendingDown,
  FiActivity,
} from "react-icons/fi";

const TransformerFleetKPIs = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const labelColor = useColorModeValue(
    "gray.600",
    "gray.300"
  );

  const valueColor = useColorModeValue(
    "#062D59",
    "#FFFFFF"
  );

  const kpis = [
    {
      title: "Total Transformers",
      value: "32",
      icon: FiGrid,
      color: "#60A5FA",
    },
    {
      title: "Avg. Efficiency",
      value: "98.13%",
      icon: FiZap,
      color: "#22C55E",
    },
    {
      title: "Total Losses",
      value: "412 kW",
      icon: FiTrendingDown,
      color: "#F59E0B",
    },
    {
      title: "Health Score",
      value: "87 /100",
      icon: FiActivity,
      color: "#22C55E",
    },
  ];

  return (
    <HStack
      spacing={3}
      align="stretch"
      h="64px"
    >
      {kpis.map((item) => (
        <Box
          key={item.title}
          flex={1}
          bg={cardBg}
          borderRadius="10px"
          border="1px solid rgba(0,153,255,0.12)"
          p={2}
          h="100%"
        >
          <Flex
            align="center"
            gap={2}
            h="100%"
          >
            <Icon
              as={item.icon}
              boxSize={4}
              color={item.color}
            />

            <Box>
              <Text
                fontSize="9px"
                color={labelColor}
                lineHeight="12px"
              >
                {item.title}
              </Text>

              <Text
                fontSize="12px"
                fontWeight="700"
                color={valueColor}
                lineHeight="16px"
              >
                {item.value}
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </HStack>
  );
};

export default TransformerFleetKPIs;