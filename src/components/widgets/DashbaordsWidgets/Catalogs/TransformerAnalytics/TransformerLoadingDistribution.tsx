import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StripsPieChart from "../../../charts/StripsPieChart";

interface WidgetProps {
  height?: string | number;
}

const TransformerLoadingDistribution = ({
  height = "290px",
}: WidgetProps) => {
  const cardBg = useColorModeValue(
    "#ffffff",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const border = useColorModeValue(
    "1px solid rgba(0,0,0,0.08)",
    "1px solid #0A4D9B"
  );

  const titleColor = useColorModeValue(
    "#062D59",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#4A5568",
    "#AFC4E8"
  );

  const data = [
    { color: "#22c55e", label: "0 - 40%", value: "7 (22%)" },
    { color: "#16a34a", label: "40 - 60%", value: "9 (28%)" },
    { color: "#eab308", label: "60 - 80%", value: "10 (31%)" },
    { color: "#f97316", label: "80 - 100%", value: "4 (13%)" },
    { color: "#ef4444", label: ">100%", value: "2 (6%)" },
  ];

  return (
    <Box
      h={height}
      bg={cardBg}
      borderRadius="10px"
      border={border}
      p={4}
      overflow="visible"
    >
      <Text
        color={titleColor}
        fontWeight="600"
        fontSize="12px"
        mb={5}
      >
        TRANSFORMER LOADING DISTRIBUTION
      </Text>

      <Flex
        h="220px"
        align="center"
        justify="space-between"
      >
        {/* Donut */}
        <Box
          w="170px"
          h="170px"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StripsPieChart
            apiData={[7, 9, 10, 4, 2]}
            names={[
              "0 - 40%",
              "40 - 60%",
              "60 - 80%",
              "80 - 100%",
              ">100%",
            ]}
            color={[
              "#22c55e",
              "#16a34a",
              "#eab308",
              "#f97316",
              "#ef4444",
            ]}
            height={170}
            width={170}
            props={{
              tooltip: {
                enabled: false,
              },
              plotOptions: {
                series: {
                  borderRadius: 0,
                  states: {
                    hover: {
                      enabled: false,
                    },
                  },
                },
                pie: {
                  innerSize: "68%",
                  borderWidth: 0,
                  size: "100%",
                  states: {
                    hover: {
                      enabled: false,
                    },
                  },
                },
              },
            }}
          />

          {/* Center */}
          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="82px"
            h="82px"
            borderRadius="50%"
            bg={useColorModeValue(
              "#FFFFFF",
              "#02142D"
            )}
            direction="column"
            justify="center"
            align="center"
            zIndex={10}
          >
            <Text
              color={muted}
              fontSize="11px"
            >
              Total
            </Text>

            <Text
              color={titleColor}
              fontWeight="700"
              fontSize="20px"
              lineHeight="1"
            >
              32
            </Text>
          </Flex>
        </Box>

        {/* Legend */}
        <Box flex={1} ml={6}>
          {data.map((item) => (
            <Flex
              key={item.label}
              justify="space-between"
              align="center"
              mb={4}
            >
              <Flex align="center">
                <Box
                  w="9px"
                  h="9px"
                  borderRadius="50%"
                  bg={item.color}
                  mr={2}
                />

                <Text
                  color={muted}
                  fontSize="13px"
                >
                  {item.label}
                </Text>
              </Flex>

              <Text
                color={titleColor}
                fontWeight="500"
                fontSize="13px"
              >
                {item.value}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default TransformerLoadingDistribution;