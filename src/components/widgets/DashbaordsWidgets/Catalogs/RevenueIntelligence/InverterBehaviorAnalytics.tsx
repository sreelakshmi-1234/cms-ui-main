import {
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import ScatterChart from "../../../charts/ScatterChart";

const InverterBehaviorAnalytics = () => {
  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#718096",
    "#B8C7E0"
  );

  const apiData = [
    {
      type: "scatter",
      name: "Normal Cluster",
      color: "#22C55E",
      data: [
        [1000, 95],
        [1200, 98],
        [1400, 101],
        [1600, 99],
        [1800, 97],
        [2000, 96],
        [2200, 100],
        [2400, 98],
        [2600, 94],
        [2800, 92],
        [3000, 90],
        [1900, 103],
        [1700, 101],
        [2300, 95],
      ],
    },
    {
      type: "scatter",
      name: "Underperforming",
      color: "#FACC15",
      data: [
        [400, 82],
        [700, 86],
        [900, 80],
        [1200, 84],
        [1400, 85],
        [1600, 83],
        [1800, 81],
        [2000, 84],
      ],
    },
    {
      type: "scatter",
      name: "Anomalous",
      color: "#EF4444",
      data: [
        [2500, 88],
        [2800, 84],
        [3000, 79],
        [3200, 82],
        [3400, 76],
        [3600, 80],
        [3800, 74],
        [4200, 77],
        [4500, 75],
        [4700, 78],
      ],
    },
  ];

  const scatterProps = {
    chart: {
      height: 220,
      backgroundColor: "transparent",
      animation: false,
      marginTop: 0,
      marginBottom: 90,
      spacingTop: 0,
      spacingBottom: 20,
    },

    legend: {
      enabled: true,
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      floating: false,
      y: 0,

      itemStyle: {
        color: titleColor,
        fontSize: "10px",
        fontWeight: "500",
      },

      symbolWidth: 0,
      symbolHeight: 0,
      symbolPadding: 4,
    },

    xAxis: {
      title: {
        text: "Power Output (kW)",
        style: {
          color: muted,
          fontSize: "10px",
        },
      },

      min: 0,
      max: 5000,
      tickInterval: 1000,

      labels: {
        style: {
          color: muted,
          fontSize: "10px",
        },
      },

      gridLineWidth: 0,
      lineColor: "#5B677A",
      tickColor: "#5B677A",
    },

    yAxis: {
      title: {
        text: "",
      },

      min: 70,
      max: 120,
      tickInterval: 10,

      labels: {
        style: {
          color: muted,
          fontSize: "10px",
        },
      },

      gridLineColor: "rgba(255,255,255,0.12)",
    },

    tooltip: {
      shared: false,
    },

    plotOptions: {
      scatter: {
        showInLegend: true,
        marker: {
          radius: 4,
          symbol: "circle",
        },
      },
    },

    credits: {
      enabled: false,
    },
  };

  return (
    <GraphLayout
      title="INVERTER BEHAVIOR ANALYTICS"
      titleFontSize="12px"
      width={["370px"]}
      height="300px"
      infoSymbol={false}
      WidgetProps={{
        p: 0,
        mt: "0px",
        overflow: "visible",
      }}
    >
      <Box
        px={3}
        pt={1}
        pb={4}
        h="100%"
        overflow="visible"
      >
        <Text
          fontSize="10px"
          color={muted}
          fontWeight="600"
          mb={1}
        >
          (AI CLUSTERING)
        </Text>

        <ScatterChart
          apiData={apiData}
          height={220}
          bg="transparent"
          props={scatterProps}
        />
      </Box>
    </GraphLayout>
  );
};

export default InverterBehaviorAnalytics;