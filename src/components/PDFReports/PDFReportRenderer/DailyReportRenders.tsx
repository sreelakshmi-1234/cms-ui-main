import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import UseDailyReport from "../../../Services/Hooks/ReportPDF/UseDailyReport";
import React, { useEffect, useRef, useState } from "react";
import TestReportLayout from "../PDFReportLayouts/TetsReportLayout";
import HighchartsReact from "highcharts-react-official";
import { toPng } from "html-to-image";
import AreaSplineChart from "../../widgets/charts/AreaSplineChart";
import { EnlargeWidgetSize } from "../../../Services/EnlargeWidget";
import ChartLayout from "../../Layouts/ChartLayouts/ChartLayout";
import UseManyDeviceSameKeyChart from "../../../Services/Hooks/UseManyDeviceSameKeyChart";
import LineChart from "../../widgets/charts/LineChart";
import { useTimeHandle } from "../../../Services/TimeWindowSetting";


  const styles = StyleSheet.create({
    table: {
      width: "100%",
      flexDirection: "column",
      marginTop: 10,
      borderBottomWidth: 1, // Outer table border
      borderBottomColor: "#03045e",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1, // Bottom border for each row
      borderColor: "#D4D4D4",
    },
    tableLastRow : {
      flexDirection: "row",
    },
    tableHeader: {
      fontSize: 8,
      paddingTop: 4,
      paddingLeft: 10,
      // height: 20,
      // backgroundColor: "#f0f0f0", // Light background for header
      // borderRightWidth: 1, // Right border for each header cell
      minHeight: 28,
      lineHeight: 1.15,
      borderColor: "#03045e",
      textAlign: "left",
      fontWeight: "bold",
    },
    tableCell: {
      fontSize: 9,
      paddingVertical: 4,
      paddingLeft: 10,
      // borderRightWidth: 1, // Right border for each body cell
      // borderColor: "#D4D4D4",
      textAlign: "left",
    },
    tableFooter: {
      fontSize: 9,
      paddingVertical: 4,
      paddingLeft: 10,
      // borderRightWidth: 1, // Right border for footer cells
      // borderColor: "#03045e",
      textAlign: "left",
      fontWeight: "bold",
      backgroundColor: "#f9f9f9", // Light background for footer
    },
    imageChart : {
      marginVertical: 25,
      marginHorizontal: 'auto',
      width : "100%",
    },
    col1: { width: "20%" }, // Day
    col2: { width: "10%" }, // Daily Energy
    col3: { width: "30%" }, // Energy Consumption
    col4: { width: "20%" }, // Total
  });

const TableHead : React.FC<{columns : string[]}> = ({columns}) => (
    <View style={[styles.tableRow, {borderColor : "#03045e"}]}>
      <Text style={[styles.tableHeader, styles.col1]}>TS</Text>
      {columns.map((column, i) => (
        <Text style={[styles.tableHeader, styles.col2]}>{column}</Text>
      ))}
    </View>
);

const TableHeadSection2 : React.FC<{columns : string[]}> = ({columns}) => (
  <View style={[styles.tableRow, {borderColor : "#03045e"}]}>
      <Text style={[styles.tableHeader, styles.col1]}>Name</Text>
    {columns.map((column, i) => (
      <Text style={[styles.tableHeader, styles.col2]}>{column}</Text>
    ))}
  </View>
);

interface DailyReportsection2DataTable {
  name: string,
  AC_Reactive_Power_var:number,
  Energy_Daily_kWh:number,
  Energy_Total_kWh:number,
  avg_power:number,
  max_power:number,
  min_power:number,
  start_time: string,
  stop_time: string,
}

interface section1DataTable {
    "ts": number,
    "INV_Total_Power": number,
    "PV_Daily_Energy_Today": number,
    "PV_Total_Energy_kWh": number,
    "DG_Total_Power": number,
    "PCS_Total_Power": number,
    "kWhcharged_Day": number,
    "kWhdischarged_Day": number,
    "ESS_SOC": number
}

const TableBodySection1 : React.FC<{data : section1DataTable[]}> = ({data}) => (
    <View>
      {data.map((receipt, i) => (
        <View key={i} style={data.length - 1 == i? styles.tableLastRow : styles.tableRow}>
          <Text style={[styles.tableCell, styles.col1]}>{new Date(receipt.ts).toISOString().replace("T", " ").replace("Z", " ").slice(0, 16)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{(receipt.INV_Total_Power).toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{(receipt.PV_Daily_Energy_Today).toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{(receipt.PV_Total_Energy_kWh).toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{(receipt.DG_Total_Power).toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{(receipt.PCS_Total_Power).toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{(receipt.kWhcharged_Day).toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{receipt.kWhdischarged_Day.toFixed(2)}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{(receipt.ESS_SOC).toFixed(2)}</Text>
        </View>
      ))}
    </View>
);

const TableBodySection2 : React.FC<{data : DailyReportsection2DataTable[]}> = ({data}) => (
  <View>
    {data.map((receipt, i) => (
      <View key={i} style={data.length - 1 == i? styles.tableLastRow : styles.tableRow}>
        <Text style={[styles.tableCell, styles.col1]}>{(receipt.name)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.AC_Reactive_Power_var).toFixed(2)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.Energy_Daily_kWh).toFixed(2)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.Energy_Total_kWh).toFixed(2)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.avg_power).toFixed(2)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.max_power).toFixed(2)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.min_power).toFixed(2)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.start_time)}</Text>
        <Text style={[styles.tableCell, styles.col2]}>{(receipt.stop_time)}</Text>
      </View>
    ))}
  </View>
);

const chunkData = (data : any[], maxRowsPerPage : number) : any[][] => {
  const chunks = [];
  for (let i = 0; i < data.length; i += maxRowsPerPage) {
    chunks.push(data.slice(i, i + maxRowsPerPage));
  }
  return chunks;
};

// Columns
const DailyReportSection1Columns = {
  'INV_Total_Power' : "Solar Power",
  'PV_Daily_Energy_Today' : "Daily Energy kWh",
  'PV_Total_Energy_kWh' : "Total Energy kWh",
  'DG_Total_Power' : "DG Power",
  'PCS_Total_Power' : "ESS Power",
  'kWhcharged_Day' : "Charge kWh",
  'kWhdischarged_Day' : "Discharge kWh",
  'ESS_SOC' : "SoC %"
};

const DailyReportSection2Columns = {
  'AC_Active_Power_Watt' : "Active Power", 
  'AC_Reactive_Power_var' : "Reactive Power", 
  'Energy_Daily_kWh' : "Daily Energy kWh", 
  'Energy_Total_kWh' : "Total Energy kWh"
}

// Keys of Columns
export const DailyReportSection1keys = Object.keys(DailyReportSection1Columns)
export const DailyReportSection2keys = Object.keys(DailyReportSection2Columns)

// Labels of Columns
const section1Labels = Object.values(DailyReportSection1Columns);
const section2Labels = Object.values(DailyReportSection2Columns);


export const DailyReportSection1Table : React.FC<{apiData : any}> = ({apiData}) => {
    const [section1, setSection1] = useState<Object[]>([]);
    const [dataChunks, setDataChunks] = useState<any[][] | null>(null)
    // const data : {section1 : Object[], section2 : Object[]} | null = UseDailyReport(DailyReportSection1keys, DailyReportSection2keys);

    useEffect(() => {
      if (apiData && apiData['section1']) {
        // console.log("DATA", apiData)
        setSection1(apiData['section1']);
        setDataChunks(chunkData(apiData['section1'], MAX_ROWS_PER_PAGE));
      } else {
        console.error("Section1 apiData is undefined or missing.");
      }
    }, [apiData]);

    const PAGE_HEIGHT = 842; // A4 height in points
    const HEADER_HEIGHT = 40;
    const FOOTER_HEIGHT = 40;
    const PADDING = 0;
    const ROW_HEIGHT = 21; // Approximate height of each table row

    const AVAILABLE_HEIGHT = PAGE_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT + PADDING);
    const MAX_ROWS_PER_PAGE = Math.floor(AVAILABLE_HEIGHT / ROW_HEIGHT);
    

    return (
      <>
        {dataChunks?.map((chunk : section1DataTable[], index : number) => (
          <TestReportLayout key={index}>
            <View>
              <TableHead columns={Object.values(DailyReportSection1Columns)} />
              <TableBodySection1 data={chunk} />
            </View>
          </TestReportLayout>
        ))}
      </>
    );
};

export const DailyReportSection1Chart : React.FC<{onGenerate : (str : string) => void, APIData : any}> = ({ onGenerate, APIData }) => {
  // Section1 Chart Config
  const [section1series, setSection1series] = useState<{name : string, data : any, fillOpacity : number, yAxis : number}[] | null >(null);
  
  // console.log(section1series);

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [isLoaded, setIsLoaded] = useState(false); // Flag to track if chart has been captured
  
    const captureChart = async () => {
      const chart = chartComponentRef.current?.chart;
      if (chart && !isLoaded) {
        chart.reflow(); // Ensure the chart is fully adjusted to its container
        const chartContainer = chartComponentRef.current?.container?.current;
      if (chartContainer && !isLoaded) {
        try {
          // Convert the chart container to a PNG image
          const dataUrl = await toPng(chartContainer);
          // console.log(dataUrl)

          onGenerate(dataUrl);
          setIsLoaded(true); // Mark as loaded to prevent re-capture
        } catch (error) {
          console.error('Error capturing chart as PNG:', error);
        }
      }
      }
    };

    // Capture the chart only once when data is first available
      useEffect(() => {
        if (APIData && APIData?.section1.length > 0 && chartComponentRef.current?.chart && !isLoaded) {
          // console.log("SECTION 1 ", APIData)
          let series = DailyReportSection1keys.map((key : string, i : number) => (
            {
              name : section1Labels[i],
              data : APIData.section1.map((row : any) => [row.ts, row[key] ? row[key] : 0]),
              fillOpacity: 0.3 ,
              yAxis: key.toLocaleLowerCase().includes("kwh") ? 0 : 1
            }
          ))
          setSection1series(series);
          setTimeout(captureChart, 2000); // Delay capturing the chart to ensure it's rendered
        }
      }, [APIData]); // Only re-run if PowerCurveData changes

  return (
    <div style={{ position: 'absolute', left: '-9999px' }}>
      <ChartLayout
        title=""
        width={['full', '100%']}
        height="120%"
      >
        <AreaSplineChart
          ref={chartComponentRef}
          height={550}
          legendHeight={100}
          props={
            { 
              chart : { 
                width : 1000
              }, 
              yAxis: [
                {
                  title: {
                    text: 'Energy (kWh)',
                    style: {
                      fontSize: '28px' 
                    }
                  },
                  gridLineWidth : 1,
                  gridLineDashStyle : 'Dash',
                  labels: {
                    style: {
                      fontSize: '24px'
                    }
                  },
                  opposite : false
                },
                {
                  title: {
                    text: 'Power & SoC (kW & %)',
                    style: {
                      fontSize: '28px' 
                    }
                  },
                  gridLineWidth : 1,
                  gridLineDashStyle : 'Dash',
                  labels: {
                    style: {
                      fontSize: '24px'
                    }
                  },
                  opposite : true
                }
              ], 
              xAxis : {
                gridLineWidth : 1,
                gridLineDashStyle : 'Dash',
                minRange : 1000*60*60,
                labels: {
                  style: {
                    fontSize: '24px'
                  }
                }
              }, 
              legend : {
                align : 'center',
                itemStyle: {
                  fontSize: '22px'
                }
              },
              exporting : {
                enabled : false
              }
            }
          }
          apiData={section1series || [{}]}
        />
      </ChartLayout>
    </div>
  );
};

export const DailyReportSection2DataTable : React.FC<{ APIData : any }> = ({APIData}) => {

  const [section2, setSection2] = useState<Object[]>([]);
    const [dataChunks, setDataChunks] = useState<any[][] | null>(null)
    useEffect(() => {
      if (APIData && APIData['section2']) {
        // console.log("APIData 2: ", APIData)
        setSection2(APIData['section2']);
        setDataChunks(chunkData(APIData['section2'], MAX_ROWS_PER_PAGE));
      } else {
        console.error("Section2 data is undefined or missing.");
      }
    }, [APIData]);

    const PAGE_HEIGHT = 842; // A4 height in points
    const HEADER_HEIGHT = 40;
    const FOOTER_HEIGHT = 40;
    const PADDING = 0;
    const ROW_HEIGHT = 21; // Approximate height of each table row

    const AVAILABLE_HEIGHT = PAGE_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT + PADDING);
    const MAX_ROWS_PER_PAGE = Math.floor(AVAILABLE_HEIGHT / ROW_HEIGHT);

  return (
    <>
      {dataChunks?.map((chunk : DailyReportsection2DataTable[], index : number) => (
        <TestReportLayout>
          <View>
            <TableHeadSection2 
              columns={["Reactive power", "Daily Energy", "Total Energy", "Average Power", "Max Power", "Min Power", "Start", "Stop"]}
            />
            <TableBodySection2 data={chunk} />
          </View>
        </TestReportLayout>
      ))}
    </>
  )
}

export const DailyReportSection2Chart : React.FC<{onGenerate : (str : string) => void, timeOfChart : {startDate : Date, endDate : Date}}> = ({ onGenerate, timeOfChart }) => {

    // ********************* Inverter Power *********************
  const {
          timeWindow: timeWindowInverterPower,
          handleTimeWindowChange: handleTimeWindowInverterPowerChange,
          handleReset: InverterPowerHandleReset
      } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);

  var searchTagInverterPower = { 
      devName : "Inverter", 
      keys : "AC_Active_Power_Watt",
      type : "spline",
      name : "INV-"
  };
  const InverterPowerColor = ["#C700BF", "#53971D", "#F4B725", "#09BCC7", "#1325CB", "#19CA16", '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
          '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
          '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
          '#03c69b', '#00f194'
        ]

        const [timeZone, setTimeZone] = useState({
          startTs : (timeOfChart.startDate).getTime(),
          endTs : (timeOfChart.endDate).getTime(),
          aggregate : "AVG",
          interval : 300000
        })
          
  const InverterPowerData = UseManyDeviceSameKeyChart(searchTagInverterPower, timeZone)?.map((series : object, index : number) => ({
      ...series,
      color : InverterPowerColor[index]
  }));

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [isLoaded, setIsLoaded] = useState(false); // Flag to track if chart has been captured
  
    const captureChart = async () => {
      const chart = chartComponentRef.current?.chart;
      if (chart && !isLoaded) {
        chart.reflow(); // Ensure the chart is fully adjusted to its container
        const chartContainer = chartComponentRef.current?.container?.current;
      if (chartContainer && !isLoaded) {
        try {
          // Convert the chart container to a PNG image
          const dataUrl = await toPng(chartContainer);

          onGenerate(dataUrl);
          // console.log(dataUrl)
          setIsLoaded(true); // Mark as loaded to prevent re-capture
        } catch (error) {
          console.error('Error capturing chart as PNG:', error);
        }
      }
      }
    };

    // Capture the chart only once when data is first available
    useEffect(() => {
      if (InverterPowerData && chartComponentRef.current?.chart && !isLoaded) {
        // console.log("90909090099090")
        setTimeout(captureChart, 2000); // Delay capturing the chart to ensure it's rendered
      }
    }, [InverterPowerData]); // Only re-run if PowerCurveData changes


  return (
    <div style={{ position: 'absolute', left: '-9999px' }}>
      <ChartLayout
        title=""
        width={['full', '100%']}
        height="120%"
      >
        <LineChart
          ref={chartComponentRef}
          height={550}
          legendHeight={100}
          props={
            { 
              chart : { 
                width : 1000
              }, 
              yAxis:{
                title: {
                  text: 'Power (kW)',
                  style: {
                    fontSize: '28px' 
                  }
                },
                gridLineWidth : 1,
                gridLineDashStyle : 'Dash',
                labels: {
                  style: {
                    fontSize: '24px'
                  }
                },
                opposite : false
              }, 
              xAxis : {
                gridLineWidth : 1,
                gridLineDashStyle : 'Dash',
                minRange : 1000*60*60,
                labels: {
                  style: {
                    fontSize: '24px'
                  }
                }
              }, 
              legend : {
                align : 'center',
                itemStyle: {
                  fontSize: '22px'
                }
              },
              exporting : {
                enabled : false
              }
            }
          }
          apiData={InverterPowerData || [{}]}
        />
      </ChartLayout>
    </div>
  );
};