import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StripsPieChart from "../../../charts/StripsPieChart";

interface Props {
  height?: string | number;
}

const InverterDowntimeAnalysis = ({
  height = "290px",
}: Props) => {
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

  return (
    <Box
      h={height}
      bg={cardBg}
      borderRadius="10px"
      border={border}
      p={3}
      overflow="hidden"
    >
      <Text
        color={titleColor}
        fontWeight="600"
        fontSize="13px"
        mb={3}
      >
        INVERTER DOWNTIME ANALYSIS
        <Text
          as="span"
          color={muted}
          fontSize="10px"
          ml={1}
        >
          (Today)
        </Text>
      </Text>

      <Flex
        h="220px"
        align="center"
        justify="space-between"
      >
        <Box
          w="120px"
          h="120px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StripsPieChart
            apiData={[1.2, 0.8, 0.6, 0.4, 0.2]}
            names={[
              "Communication",
              "DC Side",
              "AC Side",
              "Over Temp",
              "Others",
            ]}
            height={120}
            width={120}
          />
        </Box>

        <Box flex={1} ml={3}>
          {[
            ["#6366F1", "Communication", "1.2 hrs (37%)"],
            ["#22C55E", "DC Side", "0.8 hrs (25%)"],
            ["#06B6D4", "AC Side", "0.6 hrs (19%)"],
            ["#F97316", "Over Temp.", "0.4 hrs (13%)"],
            ["#A855F7", "Others", "0.2 hrs (6%)"],
          ].map((item) => (
            <Flex
              key={item[1]}
              justify="space-between"
              mb={2}
            >
              <Flex align="center">
                <Box
                  w="8px"
                  h="8px"
                  borderRadius="50%"
                  bg={item[0]}
                  mr={2}
                />
                <Text
                  color={muted}
                  fontSize="10px"
                >
                  {item[1]}
                </Text>
              </Flex>

              <Text
                color={titleColor}
                fontSize="10px"
              >
                {item[2]}
              </Text>
            </Flex>
          ))}
        </Box>
      </Flex>

      {/* numeric summary removed per request */}
    </Box>
  );
};

export default InverterDowntimeAnalysis;