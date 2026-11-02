import {
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Info icon removed
import { useState, useRef, useEffect } from "react";

import LineChart from "../../../charts/LineChart";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";

const DegradationIntelligence = () => {
  const titleColor = useColorModeValue(
    "#1A202C",
    "#FFFFFF"
  );

  const muted = useColorModeValue(
    "#718096",
    "#AFC4E8"
  );

  const [exportFunctions, setExportFunctions] = useState<{
    exportPNG: () => void;
    exportCSV: () => void;
  } | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dateRight, setDateRight] = useState(300);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;

      if (width > 1200) setDateRight(860);
      else setDateRight(200);
    });

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  const categories = [
    "Mar 2023",
    "Jun 2023",
    "Sep 2023",
    "Dec 2023",
    "Mar 2024",
    "Jun 2024",
    "Sep 2024",
    "Dec 2024",
    "Mar 2025",
  ];

  const apiData = [
    {
      type: "line",
      name: "Expected Degradation",
      color: "#29B6F6",
      dashStyle: "Dash",
      data: [102, 101.5, 101, 100.5, 100, 99.5, 99, 98.5, 98],
      unit: "%",
    },
    {
      type: "line",
      name: "Actual Degradation",
      color: "#FF4D4F",
      data: [100, 98, 97, 95, 97, 94, 91, 90, 87],
      unit: "%",
    },
  ];

  return (
    <GraphLayout
      title="DEGRADATION INTELLIGENCE"
      titleFontSize="14px"
      width={["350px"]}
      height="323px"
      fullScreen={true}
      onExport={exportFunctions}
      timeWindow={false}
      WidgetProps={{ mt: 0 }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <Flex justify="space-between" align="center" mb={2} />

        <LineChart
          height={250}
          apiData={apiData}
          onExportReady={setExportFunctions}
          props={{
            yAxis: {
              title: {
                text: "",
              },
              min: 70,
              max: 110,
              tickInterval: 10,
            },

            xAxis: {
              categories,
              gridLineWidth: 1,
              gridLineColor: "rgba(255,255,255,0.08)",
            },

            legend: {
              enabled: true,
            },

            annotations: [
              {
                labels: [
                  {
                    point: {
                      xAxis: 0,
                      yAxis: 0,
                      x: 7,
                      y: 87,
                    },

                    text:
                      "Modules degrading<br/>faster than warranty",

                    backgroundColor: "#220000",
                    borderColor: "#FF4D4F",

                    style: {
                      color: "#FF4D4F",
                      fontSize: "11px",
                    },
                  },
                ],
              },
            ],
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default DegradationIntelligence;