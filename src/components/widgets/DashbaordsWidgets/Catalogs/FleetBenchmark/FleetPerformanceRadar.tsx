import {
  Box,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const FleetPerformanceRadar = () => {
  const bg = useColorModeValue("#ffffff", "#041C4A");
  const titleColor = useColorModeValue("#1A202C", "#FFFFFF");
  const axisLabelColor = useColorModeValue("#4A5568", "#FFFFFF");
  const legendColor = useColorModeValue("#1A202C", "#FFFFFF");

  const options: Highcharts.Options = {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: "transparent",
      height: 300,
    },

    title: {
      text: undefined,
    },

    pane: {
      size: "78%",
    },

    xAxis: {
      categories: [
        "PR",
        "CUF",
        "Availability",
        "Revenue / MW",
        "Specific Yield",
        "Alarm Rate",
        "MTBF\n(Days)",
        "Forecast\nAccuracy",
      ],
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          color: axisLabelColor,
          fontSize: "11px",
        },
      },
    },

    yAxis: {
      gridLineInterpolation: "polygon",
      min: 0,
      max: 100,
      tickInterval: 20,

      labels: {
        style: {
          color: axisLabelColor,
          fontSize: "10px",
        },
      },

      gridLineColor: "rgba(255,255,255,0.08)",
    },

    legend: {
      align: "left",
      verticalAlign: "top",
      itemStyle: {
        color: legendColor,
        fontSize: "11px",
      },
    },

    credits: {
      enabled: false,
    },

    exporting: {
      // disable the default context (three-dot) menu
      buttons: {
        contextButton: {
          enabled: false,
        },
      },
    },

    tooltip: {
      shared: true,
    },

    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 3,
        },
      },
    },

    series: [
      {
        type: "area",
        name: "Your Fleet Avg",
        color: "#00E676",

        data: [88, 82, 90, 80, 76, 72, 78, 84],

        fillOpacity: 0.15,
      },
      {
        type: "area",
        name: "Top 25% Fleets",
        color: "#4DA3FF",

        data: [95, 88, 92, 87, 84, 82, 80, 86],

        fillOpacity: 0.08,
      },
    ],
  };

  return (
    <Box
      h="360px"
      bg={bg}
      borderRadius="10px"
      border="1px solid rgba(80,140,255,0.20)"
      p={3}
      boxShadow="0px 4px 20px rgba(0,0,0,0.25)"
    >
      <Text
        fontSize="13px"
        fontWeight="700"
        color={titleColor}
        textTransform="uppercase"
        mb={2}
      >
        Fleet Performance Radar
      </Text>

      <HStack justify="center" h="300px">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </HStack>
    </Box>
  );
};

export default FleetPerformanceRadar;