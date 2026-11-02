import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AssetHealthOverview = () => {
  const bg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%, #00152E 100%)"
  );

  const borderColor = useColorModeValue(
    "#E2E8F0",
    "rgba(0,145,255,0.15)"
  );

  const textColor = useColorModeValue(
    "#1E293B",
    "#FFFFFF"
  );

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 180,
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
        innerSize: "70%",
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
            name: "Healthy",
            y: 92,
            color: "#2FA84F",
          },
          {
            name: "Monitor",
            y: 23,
            color: "#F4B400",
          },
          {
            name: "Attention",
            y: 7,
            color: "#F57C00",
          },
          {
            name: "Critical",
            y: 3,
            color: "#E74C3C",
          },
        ],
      },
    ],
  };

  return (
    <Box
      bg={bg}
      borderRadius="12px"
      border="1px solid"
      borderColor={borderColor}
      h="220px"
      p={3}
    >
      <Text
        fontSize="13px"
        fontWeight="700"
        color={textColor}
        mb={2}
      >
        ASSET HEALTH OVERVIEW
      </Text>

      <Flex
        align="center"
        justify="space-between"
        h="170px"
      >
        <Box
          position="relative"
          w="150px"
          h="150px"
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />

          <Flex
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            direction="column"
            align="center"
          >
            <Text
              fontSize="34px"
              fontWeight="700"
              color={textColor}
              lineHeight="1"
            >
              125
            </Text>

            <Text
              fontSize="12px"
              color="gray.400"
            >
              Total Assets
            </Text>
          </Flex>
        </Box>

        <Box flex="1" pl={3}>
          <Flex mb={3} align="center">
            <Box
              w="10px"
              h="10px"
              bg="#2FA84F"
              borderRadius="2px"
              mr={2}
            />
            <Text flex="1" fontSize="13px">
              Healthy
            </Text>
            <Text fontSize="13px">
              92 (74%)
            </Text>
          </Flex>

          <Flex mb={3} align="center">
            <Box
              w="10px"
              h="10px"
              bg="#F4B400"
              borderRadius="2px"
              mr={2}
            />
            <Text flex="1" fontSize="13px">
              Monitor
            </Text>
            <Text fontSize="13px">
              23 (18%)
            </Text>
          </Flex>

          <Flex mb={3} align="center">
            <Box
              w="10px"
              h="10px"
              bg="#F57C00"
              borderRadius="2px"
              mr={2}
            />
            <Text flex="1" fontSize="13px">
              Attention
            </Text>
            <Text fontSize="13px">
              7 (6%)
            </Text>
          </Flex>

          <Flex align="center">
            <Box
              w="10px"
              h="10px"
              bg="#E74C3C"
              borderRadius="2px"
              mr={2}
            />
            <Text flex="1" fontSize="13px">
              Critical
            </Text>
            <Text fontSize="13px">
              3 (2%)
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AssetHealthOverview;