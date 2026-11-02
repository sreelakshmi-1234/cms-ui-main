import {
  Box,
  Divider,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import StripsPieChart from "../../../charts/StripsPieChart";

const TopBestAssets = () => {
  const bg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid rgba(0,123,255,0.25)"
  );

  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const headerColor = useColorModeValue(
    "#718096",
    "#7F96B3"
  );

  const rowBorder = useColorModeValue(
    "rgba(0,0,0,0.06)",
    "rgba(255,255,255,0.06)"
  );

  const bestAssets = [
    { rank: 1, name: "INV-04", revenue: "₹ 24,100", eff: "98%" },
    { rank: 2, name: "INV-07", revenue: "₹ 22,000", eff: "96%" },
    { rank: 3, name: "INV-01", revenue: "₹ 22,000", eff: "95%" },
    { rank: 4, name: "INV-12", revenue: "₹ 20,700", eff: "94%" },
    { rank: 5, name: "INV-09", revenue: "₹ 19,100", eff: "93%" },
  ];

  const worstAssets = [
    { rank: 1, name: "INV-08", revenue: "₹ 11,300", eff: "63%" },
    { rank: 2, name: "INV-05", revenue: "₹ 12,200", eff: "64%" },
    { rank: 3, name: "INV-15", revenue: "₹ 13,100", eff: "66%" },
    { rank: 4, name: "INV-11", revenue: "₹ 14,200", eff: "68%" },
    { rank: 5, name: "INV-13", revenue: "₹ 15,000", eff: "69%" },
  ];

  return (
    <Box
      bg={bg}
      border={border}
      borderRadius="8px"
      overflow="hidden"
      h="670px"
      minH="420px"
      w="380px"
      mt="70px"
    >
      {/* TOP BEST */}

      <Box px={3} pt={3}>
        <Text
          color={titleColor}
          fontSize="12px"
          fontWeight="700"
          mb={3}
        >
          TOP 5 BEST ASSETS{" "}
          <Text
            as="span"
            color="#3B82F6"
            fontSize="11px"
          >
            (Today)
          </Text>
        </Text>

        <Flex
          color={headerColor}
          fontSize="10px"
          fontWeight="600"
          pb={2}
        >
          <Box w="14%">#</Box>
          <Box w="36%">Asset</Box>
          <Box w="30%">Revenue (₹)</Box>
          <Box w="20%" textAlign="right">
            Eff.
          </Box>
        </Flex>

        <VStack
          spacing={0}
          align="stretch"
        >
          {bestAssets.map((item) => (
            <Flex
              key={item.rank}
              py="6px"
              borderTop={`1px solid ${rowBorder}`}
              align="center"
            >
              <Box
                w="14%"
                color="#FACC15"
                fontWeight="700"
                fontSize="12px"
              >
                {item.rank}
              </Box>

              <Box
                w="36%"
                color={titleColor}
                fontWeight="600"
                fontSize="12px"
              >
                {item.name}
              </Box>

              <Box
                w="30%"
                color="#22C55E"
                fontWeight="700"
                fontSize="12px"
              >
                {item.revenue}
              </Box>

              <Box
                w="20%"
                textAlign="right"
                color="#22C55E"
                fontWeight="700"
                fontSize="12px"
              >
                {item.eff}
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>

      <Divider
        mt={3}
        borderColor={rowBorder}
      />

      {/* REVENUE LEAKAGE CAUSES */}

      <Box px={3} pt={3} pb={3}>
        <Text
          color={titleColor}
          fontSize="12px"
          fontWeight="700"
          mb={3}
        >
          REVENUE LEAKAGE CAUSES{" "}
          <Text as="span" color="#3B82F6" fontSize="11px">
            (Today)
          </Text>
        </Text>

        <Flex justify="space-between" align="flex-start">
          <Box w="140px" h="140px" flexShrink={0} zIndex={2} display="flex" alignItems="flex-start" justifyContent="center" overflow="visible">
            <StripsPieChart
              apiData={[38, 25, 16, 11, 10]}
              names={["Grid Curtailment", "Inverter Clipping", "Soiling Loss", "Temperature Loss", "Others"]}
              color={["#4F8CFF", "#F6B100", "#FF4D4F", "#8B5CF6", "#7AD3FF"]}
              height={140}
              width={140}
            />
          </Box>

          <Box flex={1} ml={3} mt={-4}>
            {[
              ["Grid Curtailment", "38%", "(₹0.42L)", "#5B6CFF"],
              ["Inverter Clipping", "25%", "(₹0.28L)", "#4BA3FF"],
              ["Soiling Loss", "16%", "(₹0.18L)", "#FF5B5B"],
              ["Temperature Loss", "11%", "(₹0.12L)", "#F6B100"],
              ["Others", "10%", "(₹0.10L)", "#8E5CFF"],
            ].map(([name, percent, value, color]) => (
              <Flex key={name} justify="space-between" align="center" mb={2}>
                <Flex align="center" gap={2}>
                    <Box
                      w="8px"
                      h="8px"
                      borderRadius="full"
                      bg={color}
                      boxShadow={`0 0 6px ${color}`}
                    />

                    <Text fontSize="10px" color={titleColor}>
                      {name}
                    </Text>
                  </Flex>

                  <Box textAlign="right" minW="56px">
                    <Text as="span" fontSize="10px" color={color} fontWeight={700}>
                      {percent}
                    </Text>
                    <Text as="span" fontSize="10px" color={headerColor}>
                      {` ${value}`}
                    </Text>
                  </Box>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Box>

      {/* TOP WORST */}

      <Box px={3} pt={3} pb={3}>
        <Text
          color={titleColor}
          fontSize="12px"
          fontWeight="700"
          mb={3}
        >
          TOP 5 WORST ASSETS{" "}
          <Text
            as="span"
            color="#EF4444"
            fontSize="11px"
          >
            (Today)
          </Text>
        </Text>

        <Flex
          color={headerColor}
          fontSize="10px"
          fontWeight="600"
          pb={2}
        >
          <Box w="14%">#</Box>
          <Box w="36%">Asset</Box>
          <Box w="30%">Revenue (₹)</Box>
          <Box w="20%" textAlign="right">
            Eff.
          </Box>
        </Flex>

        <VStack
          spacing={0}
          align="stretch"
        >
          {worstAssets.map((item) => (
            <Flex
              key={item.rank}
              py="6px"
              borderTop={`1px solid ${rowBorder}`}
              align="center"
            >
              <Box
                w="14%"
                color="#F59E0B"
                fontWeight="700"
                fontSize="12px"
              >
                {item.rank}
              </Box>

              <Box
                w="36%"
                color={titleColor}
                fontWeight="600"
                fontSize="12px"
              >
                {item.name}
              </Box>

              <Box
                w="30%"
                color="#EF4444"
                fontWeight="700"
                fontSize="12px"
              >
                {item.revenue}
              </Box>

              <Box
                w="20%"
                textAlign="right"
                color="#EF4444"
                fontWeight="700"
                fontSize="12px"
              >
                {item.eff}
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default TopBestAssets;