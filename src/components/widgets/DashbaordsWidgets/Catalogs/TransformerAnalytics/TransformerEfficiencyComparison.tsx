import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";

import { useTimeHandle } from "../../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../../Layouts/ChartLayouts/GraphLayout";
import StackedColumnChart from "../../../charts/StackedColumnChart";

interface Props {
  height?: string | number;
}

const TransformerEfficiencyComparison = ({
  height = "300px",
}: Props) => {
  const [exportFunctions, setExportFunctions] = useState<any>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Shift the Highcharts 'Show all' / 'Hide all' button groups down without
  // modifying the chart component. We query the SVG <text> nodes and move
  // their ancestor <g> groups by setting a translate transform.
  useEffect(() => {
    const BUTTON_SHIFT = 10; // pixels to move down
    let attempts = 0;
    let mounted = true;

    const shiftOnce = () => {
      if (!mounted) return;
      const root = wrapperRef.current;
      if (!root) return false;

      // Find any <text> nodes that match the button labels
      const texts = Array.from(root.querySelectorAll('text')) as SVGTextElement[];
      let found = false;
      texts.forEach((t) => {
        const txt = (t.textContent || '').trim();
        if (txt === 'Show all' || txt === 'Hide all') {
          const g = t.closest('g');
          if (g) {
            // preserve existing transform if present
            const existing = g.getAttribute('transform') || '';
            // only apply if we haven't already shifted
            if (!/translate\(/.test(existing) || !existing.includes(`,${BUTTON_SHIFT}`)) {
              // apply an additional translate downwards
              g.setAttribute('transform', `translate(0,${BUTTON_SHIFT}) ${existing}`.trim());
            }
            found = true;
          }
        }
      });

      return found;
    };

    const tryShift = () => {
      attempts += 1;
      const ok = shiftOnce();
      if (!ok && attempts < 8) {
        setTimeout(tryShift, 300);
      }
    };

    // try initially and on resize
    tryShift();
    const onResize = () => tryShift();
    window.addEventListener('resize', onResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const titleColor = useColorModeValue("#062D59", "#FFFFFF");

  const {
    timeWindow,
    handleTimeWindowChange,
    handleReset,
  } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

  const bars = [
    { name: "ABB", value: 98.8, color: "#8b5cf6" },
    { name: "Siemens", value: 98.2, color: "#16a34a" },
    { name: "CG", value: 97.9, color: "#22c55e" },
    { name: "Schneider", value: 97.4, color: "#f97316" },
  ];

  const apiData = [
    {
      name: "Efficiency",
      data: bars.map((b) => b.value),
      colorByPoint: true,
      color: undefined,
      colors: bars.map((b) => b.color),
      unit: '%'
    } as any,
  ];

  const categories = bars.map((b) => b.name);

  return (
    <GraphLayout
      title="EFFICIENCY COMPARISON"
      titleFontSize="12px"
      titleLengthSVG={200}
      titleLengthLongSVG={320}
      width={["100%", "100%"]}
      height={"300px"}
      timeWindow={true}
      onTimeWindowChange={handleTimeWindowChange}
      onReset={handleReset}
      fullScreen={true}
      onExport={exportFunctions}
      WidgetProps={{ mt: 0 }}
    >
      <div ref={wrapperRef} style={{ height: '100%' }}>
        <StackedColumnChart
          height={260}
          apiData={apiData}
          onExportReady={setExportFunctions}
          props={{
            chart: { backgroundColor: 'transparent' },
            legend: { enabled: true, align: 'center' },
            xAxis: { categories, labels: { style: { fontSize: '11px' }, rotation: 0 } },
            yAxis: { min: 90, max: 100, title: { text: '' } },
            plotOptions: { column: { pointPadding: 0.2 } }
          }}
        />
      </div>
    </GraphLayout>
  );
};

export default TransformerEfficiencyComparison;