import {
  Box,
  Flex,
  GridItem,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  MdBolt,
  MdShowChart,
  MdTrendingUp,
  MdWarning,
} from "react-icons/md";

const KPIItem = ({
  title,
  value,
  unit,
  change,
  color,
  icon,
}: {
  title: string;
  value: string;
  unit?: string;
  change: string;
  color: string;
  icon: React.ReactNode;
}) => {
  const bg = useColorModeValue("#ffffff", "#041C4A");

  return (
    <Box
      h="90px"
      bg={bg}
      borderRadius="10px"
      border="1px solid"
      borderColor="rgba(80,140,255,0.20)"
      px={3}
      py={2}
      position="relative"
      overflow="hidden"
      boxShadow="0px 2px 10px rgba(0,0,0,0.15)"
    >
      <Flex gap={3}>
        <Flex
          w="36px"
          h="36px"
          borderRadius="full"
          bg={`${color}20`}
          color={color}
          align="center"
          justify="center"
          fontSize="18px"
          flexShrink={0}
        >
          {icon}
        </Flex>

        <Box flex={1}>
          <Text
            fontSize="10px"
            fontWeight="600"
            opacity={0.75}
            textTransform="uppercase"
            noOfLines={1}
          >
            {title}
          </Text>

          <Flex align="baseline" gap={1}>
            <Text
              fontSize="20px"
              fontWeight="700"
              lineHeight="1"
            >
              {value}
            </Text>

            {unit && (
              <Text
                fontSize="10px"
                opacity={0.7}
              >
                {unit}
              </Text>
            )}
          </Flex>

          <Text
            fontSize="10px"
            color={color}
            fontWeight="600"
          >
            {change}
          </Text>
        </Box>
      </Flex>

      {/* Bottom Trend Line */}
      <Box
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        h="3px"
        bg={color}
      />
    </Box>
  );
};

const FleetBenchmarkKPI = () => {
  return (
    <HStack
      h="90px"
      w="100%"
      gap={3}
    >
      <GridItem flex={1}>
        <KPIItem
          title="Performance Ratio (PR)"
          value="98.12"
          unit="%"
          change="▲ 1.35%"
          color="#00D26A"
          icon={<MdShowChart />}
        />
      </GridItem>

      <GridItem flex={1}>
        <KPIItem
          title="Capacity Utilization (CUF)"
          value="23.48"
          unit="%"
          change="▲ 0.84%"
          color="#00D26A"
          icon={<MdBolt />}
        />
      </GridItem>

      <GridItem flex={1}>
        <KPIItem
          title="Specific Yield"
          value="4.62"
          unit="kWh/kWp"
          change="▲ 1.18%"
          color="#B56CFF"
          icon={<MdTrendingUp />}
        />
      </GridItem>

      <GridItem flex={1}>
        <KPIItem
          title="Availability"
          value="99.21"
          unit="%"
          change="▲ 0.49%"
          color="#00A8FF"
          icon={<MdShowChart />}
        />
      </GridItem>

      <GridItem flex={1}>
        <KPIItem
          title="Revenue / MW"
          value="₹ 5.27"
          unit="Lakh"
          change="▲ 3.21%"
          color="#FF9F1A"
          icon={<MdTrendingUp />}
        />
      </GridItem>

      <GridItem flex={1}>
        <KPIItem
          title="Alarm Rate"
          value="0.42"
          unit="/MW"
          change="▼ 10.5%"
          color="#FF4D4F"
          icon={<MdWarning />}
        />
      </GridItem>
    </HStack>
  );
};

export default FleetBenchmarkKPI;