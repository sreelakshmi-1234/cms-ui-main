import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiAlertTriangle,
} from "react-icons/fi";

const alerts = [
  {
    text: "Block-13 PR below threshold",
    time: "09:42 AM",
    color: "#FF5A36",
  },
  {
    text: "Inverter INV-47 DC imbalance",
    time: "09:41 AM",
    color: "#FF5A36",
  },
  {
    text: "Transformer TR-04 Oil Temp High",
    time: "09:39 AM",
    color: "#F5B301",
  },
  {
    text: "String Combiner SCB-14 Comm. Lost",
    time: "09:37 AM",
    color: "#F5B301",
  },
  {
    text: "Soiling detected in Block-07",
    time: "09:35 AM",
    color: "#F5B301",
  },
];

const LiveAlertsWidget = () => {
  const bg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "#E2E8F0",
    "rgba(0,145,255,0.15)"
  );

  const titleColor = useColorModeValue(
    "#1E293B",
    "#FFFFFF"
  );

  const textColor = useColorModeValue(
    "#475569",
    "#C7D2FE"
  );

  const timeColor = useColorModeValue(
    "#64748B",
    "#94A3B8"
  );

  return (
    <Box
      bg={bg}
      borderRadius="12px"
      border="1px solid"
      borderColor={borderColor}
      h="220px"
      overflow="hidden"
    >
      <Box px={3} py={2}>
        <Text
          fontSize="13px"
          fontWeight="700"
          color={titleColor}
        >
          LIVE ALERTS{" "}
          <Text
            as="span"
            color="#3B82F6"
            fontSize="12px"
          >
            (Top 5)
          </Text>
        </Text>
      </Box>

      {alerts.map((alert, index) => (
        <Flex
          key={index}
          align="center"
          justify="space-between"
          px={3}
          py="8px"
          borderTop="1px solid"
          borderColor="rgba(255,255,255,0.06)"
        >
          <Flex
            align="center"
            gap={2}
            flex="1"
            minW="0"
          >
            <Icon
              as={FiAlertTriangle}
              color={alert.color}
              boxSize={3.5}
            />

            <Text
              fontSize="12px"
              color={textColor}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {alert.text}
            </Text>
          </Flex>

          <Text
            fontSize="11px"
            color={timeColor}
            ml={2}
          >
            {alert.time}
          </Text>
        </Flex>
      ))}

      <Flex
        h="32px"
        align="center"
        justify="center"
        borderTop="1px solid"
        borderColor="rgba(255,255,255,0.06)"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue(
            "#F8FAFC",
            "rgba(255,255,255,0.03)"
          ),
        }}
      >
        <Text
          fontSize="12px"
          color="#3B82F6"
          fontWeight="600"
        >
          › View All Alerts
        </Text>
      </Flex>
    </Box>
  );
};

export default LiveAlertsWidget;