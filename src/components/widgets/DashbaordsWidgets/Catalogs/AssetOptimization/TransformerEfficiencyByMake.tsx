import {
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";

import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import BarChart from "../../../charts/BarChart";
import UseTransformerEfficiencyByMake from "../../../../../Services/Hooks/Catalog/AssetOptimization/UseEfficiencyByMake";

interface Props {
  type?: "plant" | "portfolio";
}

const TransformerEfficiencyByMake = ({
  type = "plant",
}: Props) => {
  const cardBg = useColorModeValue(
    "#FFFFFF",
    "linear-gradient(180deg,#031B44 0%,#00152E 100%)"
  );

  const searchTag = {
    Inverter: "Sp_Yield",
  };

  const {
    data,
    fetchTransformerEfficiencyByMake,
  } = UseTransformerEfficiencyByMake(
    searchTag,
    type
  );

  useEffect(() => {
    fetchTransformerEfficiencyByMake();
  }, [type]);

  const categories = Array.isArray(data)
    ? data.map((item: any) => item.make)
    : [];

  const values = Array.isArray(data)
    ? data.map((item: any) => Number(item.efficiency))
    : [];

  const apiData = [
    {
      name: "Efficiency",
      type: "column",
      color: "#2563EB",
      data: values,
    },
  ];

  const maxValue =
    values.length > 0
      ? Math.ceil(Math.max(...values) + 5)
      : 100;

  const chartProps: any = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 220,
    },

    title: {
      text: "",
    },

    xAxis: {
      categories,
      labels: {
        enabled: true,
        rotation: 0,
        style: {
          fontSize: "10px",
        },
      },
      tickLength: 0,
    },

    yAxis: {
      title: {
        text: "",
      },
      min: 0,
      max: maxValue,
    },

    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
  };

  return (
    <Box
      h="290px"
      bg={cardBg}
      borderRadius="12px"
      border="1px solid rgba(0,153,255,0.15)"
      p={1}
    >
      <Text
        fontSize="12px"
        fontWeight="700"
        mb={2}
      />

      <GraphLayout
        title="EFFICIENCY BY MAKE"
        titleFontSize="12px"
        width={["100%"]}
        height="260px"
        fullScreen={false}
        WidgetProps={{ p: 1 }}
      >
        <BarChart
          apiData={apiData}
          props={chartProps}
          height="220px"
        />
      </GraphLayout>
    </Box>
  );
};

export default TransformerEfficiencyByMake;