import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";

const alerts = [
  {
    severity: "HIGH RISK",
    title: "INV-08 DC Side Imbalance",
    revenue: "₹ 8,200",
    color: "#EF4444",
  },
  {
    severity: "MEDIUM RISK",
    title: "SMB-14 Current Drift",
    revenue: "₹ 3,100",
    color: "#F59E0B",
  },
  {
    severity: "LOW RISK",
    title: "Tracker Zone 3 Performance Drop",
    revenue: "₹ 1,200",
    color: "#FACC15",
  },
];

const AIRedFlagCenter = () => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.08)",
    "rgba(255,255,255,0.08)"
  );

  const textColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#718096",
    "#AFC4E8"
  );

  const alertBg = useColorModeValue(
    "#F8FAFC",
    "rgba(255,255,255,0.03)"
  );

  return (
    <GraphLayout
      title="AI RED FLAG CENTER"
      width={["375px"]}
      height="330px"
      fullScreen
      timeWindow={false}
          WidgetProps={{ mt: "-6px", transform: "translateX(20px) translateY(-212px)" }}
    >
      <Box
        h="100%"
        bg={cardBg}
      >
        <VStack
          spacing={3}
          align="stretch"
          mt={0}
        >
          {alerts.map((item, index) => (
            <Flex
              key={index}
              justify="space-between"
              align="center"
              bg={alertBg}
              border={`1px solid ${borderColor}`}
              borderRadius="8px"
              p={3}
            >
              <Flex gap={3}>
                <Flex
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg={`${item.color}20`}
                  align="center"
                  justify="center"
                >
                  <FiAlertTriangle
                    color={item.color}
                    size={15}
                  />
                </Flex>

                <Box>
                  <Text
                    color={item.color}
                    fontSize="10px"
                    fontWeight="700"
                  >
                    {item.severity}
                  </Text>

                  <Text
                    color={textColor}
                    fontSize="12px"
                    fontWeight="600"
                  >
                    {item.title}
                  </Text>

                  <Text
                    color={muted}
                    fontSize="11px"
                  >
                    Revenue Risk : {item.revenue}
                  </Text>
                </Box>
              </Flex>

              <Button
                size="xs"
                variant="outline"
                colorScheme="blue"
                minW="55px"
              >
                View
              </Button>
            </Flex>
          ))}

          <Text
            textAlign="center"
            color="#3B82F6"
            fontSize="12px"
            fontWeight="600"
            cursor="pointer"
            mt={1}
          >
            View All Insights &gt;
          </Text>
        </VStack>
      </Box>
    </GraphLayout>
  );
};

export default AIRedFlagCenter;