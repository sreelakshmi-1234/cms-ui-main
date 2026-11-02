import { useState } from "react";
import { EnlargeWidgetContent } from "../../../../Services/EnlargeWidget";
import UsePortfolioPlantsStackedAvailability from "../../../../Services/Hooks/UsePortfolioPlantsStackedAvailability";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout";
import ColumnChart from "../../charts/ColumnChart";
import { numberFormat } from "highcharts";

// Define the shape of the export functions
interface ExportFunctions {
  exportPNG: () => void;
  exportCSV: () => void;
}

const TotalAvailabilityGraph = () => {
  // ********************** Portfolio Plants Availability ****************

  const {
    timeWindow: timeWindowProtfolioPlantsAvailability,
    handleTimeWindowChange: handleTimeWindowProtfolioPlantsAvailabilityChange,
    handleReset: ProtfolioPlantsAvailabilityHandleReset
  } = useTimeHandle(1, "cmsf", "NONE", [6.5, "month"]);

  const ProtfolioPlantsAvailabilityType = "line"
  const textSearchProtfolioPlantsAvailability = [""];

  const ProtfolioPlantsAvailabilityData = UsePortfolioPlantsStackedAvailability(ProtfolioPlantsAvailabilityType, textSearchProtfolioPlantsAvailability, timeWindowProtfolioPlantsAvailability);

  const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);

  return (
    <GraphLayout
      title="Total Availability"
      titleLengthSVG={120}
      titleLengthLongSVG={700}
      initTimeTitle="Last 6 Month"
      width={["full", "auto"]}
      height={"100%"}
      onTimeWindowChange={handleTimeWindowProtfolioPlantsAvailabilityChange}
      fullScreen={true}
      onExport={exportFunctions}
    >
      <ColumnChart
        height={300} 
        apiData={ProtfolioPlantsAvailabilityData || [{}]}
        onExportReady={setExportFunctions}
        props={
          {
            yAxis: [{
              title: {
                text: "" // "Availability",
              },
              // labels: {
              //   format: '{value}'
              // }
            }, {
              title: {
                text: ""// "kWh"
              },
              labels: {
                formatter: function(this : any) {
                    const value = this.value;
                    if (value >= 100000) {
                        return numberFormat(value / 100000, 2) + ' L';
                    } else if (value >= 1000) {
                        return numberFormat(value / 1000, 2) + ' k';
                    } else {
                        return value;
                    }
                }
              },
              tickAmount : 6,
              opposite: true
            }],
            plotOptions: {
              column: {
                  stacking : "normal",
                  pointWidth: 20
              }
          },
          tooltip: {
              shared: true,
              formatter: function(this : any) {
                  let s = '<b>' + this.series.options.stack + '</b><br>'; // Display the category
                  this.points.forEach((point : any) => {
                      s += '<span style="color:' + point.color + '">●</span><b> ' + point.series.name + '</b>: ' + point.y + '<br>';
                  });
                  return s;
              }
          },
          legend: {
            labelFormatter: function(this : any) {
                // Append the index to the name to make it unique
                if(this.name == "Expected Energy") {
                  return '<span style="display:inline-block; marginTop:-3px;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                  '<circle opacity="0.25" cx="8" cy="11" r="8" fill="' + this.color + '"/>' +
                  '<circle cx="8" cy="11" r="3.5" fill="' + this.color + '" stroke="white"/>' +
                  '</svg></span> ' + this.name + " (kWh)";
                } else {
                  return '<span style="width: 8px; height: 8px; display: inline-block; background-color: ' + this.color + '; border-radius: 0;"></span> ' + this.name;
                }
            }
        },
          xAxis: {
              type: 'datetime',
              gridLineDashStyle: 'Dash',
              gridLineWidth: 1, // Ensure grid line width is set
              tickLength: 0,
              gridLineColor: '#DFDFDF',
              lineColor : "#DFDFDF",
              dateTimeLabelFormats: {
                  month: '%b %y', // Custom format for months
              },
          },
          }
        }
      />
    </GraphLayout>
  );
};

export default TotalAvailabilityGraph