import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiActivity,
  FiTrendingUp,
  FiZap,
  FiDollarSign,
} from "react-icons/fi";

const kpis = [
  {
    title: "PLANT GENERATION (AC)",
    value: "18.62 MW",
    change: "+74.5%",
    icon: FiZap,
    color: "#22C55E",
  },
  {
    title: "SPECIFIC YIELD (DC)",
    value: "4.62 kWh/kWp",
    change: "+4.12%",
    icon: FiTrendingUp,
    color: "#22C55E",
  },
  {
    title: "PERFORMANCE RATIO",
    value: "92.1 %",
    change: "+3.6%",
    icon: FiActivity,
    color: "#22C55E",
  },
  {
    title: "AVAILABILITY",
    value: "99.32 %",
    change: "+0.28%",
    icon: FiActivity,
    color: "#22C55E",
  },
  {
    title: "ENERGY TODAY",
    value: "112.47 MWh",
    change: "",
    icon: FiZap,
    color: "#3B82F6",
  },
  {
    title: "ENERGY THIS MONTH",
    value: "2.45 GWh",
    change: "",
    icon: FiZap,
    color: "#3B82F6",
  },
  {
    title: "REVENUE TODAY",
    value: "₹ 12.47 Lakh",
    change: "+6.3%",
    icon: FiDollarSign,
    color: "#F59E0B",
  },
];

const PlantKPIRibbon = () => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#05214D 0%, #031631 100%)"
  );

  const borderColor = useColorModeValue(
    "#E2E8F0",
    "rgba(59,130,246,0.18)"
  );

  const titleColor = useColorModeValue(
    "#64748B",
    "#9FB3D9"
  );

  const valueColor = useColorModeValue(
    "#111827",
    "#FFFFFF"
  );

  const cardShadow = useColorModeValue(
    "0 2px 8px rgba(0,0,0,0.06)",
    "0 0 12px rgba(59,130,246,0.08)"
  );

  const hoverShadow = useColorModeValue(
    "0 6px 18px rgba(0,0,0,0.12)",
    "0 0 18px rgba(59,130,246,0.15)"
  );

  return (
    <SimpleGrid columns={7} spacing={2}>
      {kpis.map((item) => (
        <Box
          key={item.title}
          position="relative"
          overflow="hidden"
          h="76px"
          px={3}
          py={2}
          bg={cardBg}
          borderRadius="10px"
          border="1px solid"
          borderColor={borderColor}
          boxShadow={cardShadow}
          transition="all .25s ease"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: hoverShadow,
          }}
        >
          <Flex gap={2} align="flex-start">
            <Flex
              w="24px"
              h="24px"
              minW="24px"
              borderRadius="full"
              align="center"
              justify="center"
              bg={`${item.color}15`}
              border={`1px solid ${item.color}40`}
            >
              <Icon
                as={item.icon}
                color={item.color}
                boxSize={3}
              />
            </Flex>

            <Box flex="1">
              <Text
                fontSize="9px"
                fontWeight="600"
                color={titleColor}
                letterSpacing="0.3px"
                textTransform="uppercase"
                lineHeight="1"
              >
                {item.title}
              </Text>

              <Text
                mt="3px"
                fontSize="14px"
                fontWeight="700"
                color={valueColor}
                lineHeight="1.1"
              >
                {item.value}
              </Text>

              {item.change && (
                <Text
                  mt="2px"
                  fontSize="10px"
                  fontWeight="600"
                  color="#22C55E"
                  lineHeight="1"
                >
                  ↑ {item.change} vs Yesterday
                </Text>
              )}
            </Box>
          </Flex>

          {/* Bottom Sparkline - show only for Plant Generation KPI */}
          {item.title === "PLANT GENERATION (AC)" && (
            <Box
              position="absolute"
              left={0}
              right={0}
              bottom={0}
              h="14px"
              opacity={0.9}
            >
              <svg
                width="100%"
                height="14"
                viewBox="0 0 180 14"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 10 L15 9 L30 10 L45 7 L60 8 L75 6 L90 7 L105 5 L120 6 L135 4 L150 6 L165 3 L180 5"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Box>
          )}
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default PlantKPIRibbon;