import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FaDollarSign,
  FaCalendarAlt,
  FaChartLine,
  FaChartBar,
  FaBullseye,
  FaWallet,
} from "react-icons/fa";

const RevenueKPIRow = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.06)",
    "rgba(255,255,255,0.08)"
  );

  const titleColor = useColorModeValue("gray.600", "gray.400");
  const valueColor = useColorModeValue("gray.900", "white");
  const unitColor = useColorModeValue("gray.600", "gray.300");
  const defaultSubColor = useColorModeValue("gray.600", "gray.300");
  const sparklineGradient = useColorModeValue(
    "linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.12) 50%, transparent 100%)",
    "linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.15) 50%, transparent 100%)"
  );

  const kpis = [
    {
      title: "REVENUE TODAY",
      value: "₹ 52.7",
      unit: "Lakh",
      sub: "↑ 6.5% vs Yesterday",
      icon: FaDollarSign,
      iconBg: "rgba(0,255,136,0.12)",
      iconColor: "#00E676",
      subColor: "#00E676",
    },
    {
      title: "EXPECTED REVENUE (TODAY)",
      value: "₹ 53.9",
      unit: "Lakh",
      sub: "",
      icon: FaCalendarAlt,
      iconBg: "rgba(0,153,255,0.12)",
      iconColor: "#2196F3",
      subColor: "#2196F3",
    },
    {
      title: "REVENUE THIS MONTH",
      value: "₹ 15.82",
      unit: "Cr",
      sub: "↑ 8.8% vs Apr 2025",
      icon: FaChartLine,
      iconBg: "rgba(0,255,136,0.12)",
      iconColor: "#00E676",
      subColor: "#00E676",
    },
    {
      title: "REVENUE THIS YEAR",
      value: "₹ 1.86",
      unit: "Cr",
      sub: "↑ 12.4% vs YTD Apr 2024",
      icon: FaChartBar,
      iconBg: "rgba(155,89,255,0.15)",
      iconColor: "#B388FF",
      subColor: "#00E676",
    },
    {
      title: "REVENUE OPPORTUNITY",
      value: "₹ 1.18",
      unit: "Lakh / day",
      sub: "2.2% of Potential",
      icon: FaBullseye,
      iconBg: "rgba(255,152,0,0.15)",
      iconColor: "#FF9800",
      subColor: "#CFCFCF",
    },
    {
      title: "LIFETIME REVENUE",
      value: "₹ 28.64",
      unit: "Cr",
      sub: "",
      icon: FaWallet,
      iconBg: "rgba(255,82,82,0.15)",
      iconColor: "#FF6B6B",
      subColor: "#FF6B6B",
    },
  ];

  return (
    <HStack
      spacing={3}
      mb={4}
      align="stretch"
      w="1500px"
    >
      {kpis.map((item, index) => (
        <Box
          key={index}
          flex="1"
          h="82px"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="10px"
          px={3}
          py={2}
          position="relative"
          overflow="hidden"
          boxShadow="0 0 12px rgba(0,0,0,0.15)"
        >
          <Flex
            h="100%"
            align="center"
            gap={3}
          >
            <Flex
              w="38px"
              h="38px"
              borderRadius="full"
              bg={item.iconBg}
              align="center"
              justify="center"
            >
              <Icon
                as={item.icon}
                color={item.iconColor}
                fontSize="18px"
              />
            </Flex>

            <VStack
              align="start"
              spacing={0}
              flex="1"
            >
              <Text
                fontSize="10px"
                color={titleColor}
                fontWeight="600"
                letterSpacing="0.5px"
              >
                {item.title}
              </Text>

              <Flex
                align="baseline"
                gap={1}
              >
                <Text
                  color={valueColor}
                  fontWeight="700"
                  fontSize="26px"
                  lineHeight="1"
                >
                  {item.value}
                </Text>

                <Text
                  color={unitColor}
                  fontSize="14px"
                  fontWeight="500"
                >
                  {item.unit}
                </Text>
              </Flex>

              {item.sub && (
                <Text
                  fontSize="11px"
                  color={item.subColor || defaultSubColor}
                  fontWeight="500"
                >
                  {item.sub}
                </Text>
              )}
            </VStack>
          </Flex>

          {/* Bottom Sparkline Effect */}
          <Box
            position="absolute"
            left="0"
            bottom="0"
            w="100%"
            h="18px"
            bg={sparklineGradient}
          />
        </Box>
      ))}
    </HStack>
  );
};

export default RevenueKPIRow;