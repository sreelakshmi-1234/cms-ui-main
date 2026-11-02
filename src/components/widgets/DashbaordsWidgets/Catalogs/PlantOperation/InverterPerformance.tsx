import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const InverterPerformance = () => {
  const textColor = useColorModeValue(
    "#1E293B",
    "#FFFFFF"
  );

  const legendColor = useColorModeValue(
    "#475569",
    "#B8C5D9"
  );

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 135,
      margin: [0, 0, 0, 0],
    },

    title: {
      text: "",
    },

    credits: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        innerSize: "72%",
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      },
    },

    series: [
      {
        type: "pie",
        data: [
          {
            name: "Normal",
            y: 49,
            color: "#2FA84F",
          },
          {
            name: "Underperforming",
            y: 7,
            color: "#F4B400",
          },
          {
            name: "Attention",
            y: 3,
            color: "#F57C00",
          },
          {
            name: "Critical",
            y: 1,
            color: "#E74C3C",
          },
        ],
      },
    ],
  };

  return (
    <Box h="100%" px={2}>
      <Text
        fontSize="12px"
        fontWeight="500"
        color={textColor}
        mb={1}
      >
        Inverter Performance
      </Text>

      <Flex
        align="center"
        justify="space-between"
      >
        {/* DONUT */}

        <Box
          position="relative"
          w="120px"
          h="120px"
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />

          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            direction="column"
            align="center"
          >
            <Text
              fontSize="34px"
              fontWeight="700"
              color={textColor}
              lineHeight="1"
            >
              60
            </Text>

            <Text
              fontSize="12px"
              color="gray.400"
            >
              Total
            </Text>
          </Flex>
        </Box>

        {/* LEGEND */}

        <Box w="110px">
          <Flex
            justify="space-between"
            mb={2}
            fontSize="11px"
          >
            <Flex align="center">
              <Box
                w="8px"
                h="8px"
                bg="#2FA84F"
                mr={2}
              />
              <Text color={legendColor}>
                Normal
              </Text>
            </Flex>

            <Text color={legendColor}>
              49 (82%)
            </Text>
          </Flex>

          <Flex
            justify="space-between"
            mb={2}
            fontSize="11px"
          >
            <Flex align="center">
              <Box
                w="8px"
                h="8px"
                bg="#F4B400"
                mr={2}
              />
              <Text color={legendColor}>
                Underperforming
              </Text>
            </Flex>

            <Text color={legendColor}>
              7 (12%)
            </Text>
          </Flex>

          <Flex
            justify="space-between"
            mb={2}
            fontSize="11px"
          >
            <Flex align="center">
              <Box
                w="8px"
                h="8px"
                bg="#F57C00"
                mr={2}
              />
              <Text color={legendColor}>
                Attention
              </Text>
            </Flex>

            <Text color={legendColor}>
              3 (5%)
            </Text>
          </Flex>

          <Flex
            justify="space-between"
            fontSize="11px"
          >
            <Flex align="center">
              <Box
                w="8px"
                h="8px"
                bg="#E74C3C"
                mr={2}
              />
              <Text color={legendColor}>
                Critical
              </Text>
            </Flex>

            <Text color={legendColor}>
              1 (1%)
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default InverterPerformance;