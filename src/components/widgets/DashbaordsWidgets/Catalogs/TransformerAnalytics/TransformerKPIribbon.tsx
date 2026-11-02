import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaBolt,
  FaExclamationTriangle,
  FaTemperatureHigh,
} from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { IoPulse } from "react-icons/io5";
import { MdSpeed } from "react-icons/md";

const TransformerKPIRibbon = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.06)",
    "rgba(0,180,255,0.25)"
  );

  const titleTextColor = useColorModeValue("gray.600", "gray.300");
  const valueColor = useColorModeValue("#062D59", "#FFFFFF");
  const unitColor = useColorModeValue("gray.500", "gray.300");
  const cardShadow = useColorModeValue("sm", "0 0 12px rgba(0,120,255,0.15)");

  const cards = [
    {
      title: "Avg. Transformer Load",
      value: "68",
      unit: "%",
      icon: GiElectric,
      color: "#22c55e",
    },
    {
      title: "Transformer Efficiency",
      value: "98.42",
      unit: "%",
      icon: MdSpeed,
      color: "#8b5cf6",
    },
    {
      title: "Total Transformer Losses",
      value: "412",
      unit: "kW",
      icon: FaBolt,
      color: "#f97316",
    },
    {
      title: "Transformer Health Score",
      value: "87",
      unit: "/100",
      icon: IoPulse,
      color: "#22c55e",
    },
    {
      title: "Oil Temp. (Avg)",
      value: "54.3",
      unit: "°C",
      icon: FaTemperatureHigh,
      color: "#ef4444",
    },
    {
      title: "Top Overloaded TX",
      value: "2",
      unit: "",
      icon: FaExclamationTriangle,
      color: "#f59e0b",
    },
  ];

  return (
    <HStack spacing={2} w="100%" align="stretch">
      {cards.map((item) => (
        <Box
          key={item.title}
          flex={1}
          h="72px"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="10px"
          px={4}
          display="flex"
          alignItems="center"
          boxShadow={cardShadow}
        >
          <Flex align="center" w="100%">
            <Flex
              w="42px"
              h="42px"
              borderRadius="full"
              bg={`${item.color}22`}
              align="center"
              justify="center"
              mr={3}
            >
              <Icon
                as={item.icon}
                color={item.color}
                boxSize={5}
              />
            </Flex>

            <Box>
              <Text fontSize="11px" color={titleTextColor} lineHeight="1" mb={1}>
                {item.title}
              </Text>

              <Text fontSize="28px" fontWeight="700" color={valueColor} lineHeight="1">
                {item.value}

                <Text as="span" ml={1} fontSize="14px" color={unitColor} fontWeight="500">
                  {item.unit}
                </Text>
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </HStack>
  );
};

export default TransformerKPIRibbon;