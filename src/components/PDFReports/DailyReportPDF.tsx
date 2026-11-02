import { useEffect, useState } from "react";
import UseInfoSymbol from "../../Services/Hooks/UseInfoSymbol";
import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { DailyReportSection1Chart, DailyReportSection1Table, DailyReportSection2Chart, DailyReportSection2DataTable } from "./PDFReportRenderer/DailyReportRenders";
import Indexpg from "./PDFReportLayouts/IndexPgLayout";
import TestReportLayout from "./PDFReportLayouts/TetsReportLayout";
import defaultImg from '../../assets/ReportImg.jpg'
import UseDateLastValueTBAPI from "../../Services/Hooks/UseDateLastValueTBAPI";

interface DailyReportPDFProps {
    section1ChartImg?: string;
    section2ChartImg?: string;
    apiData?: any;
    performanceKey : string[];
    performanceData: {
        [key: string]: number;
        success: number;
    }[][];
    selectedDates : {startDate : Date, endDate : Date}
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 17,
        paddingHorizontal: 24,
        fontFamily: 'Oswald',
    },
    heading: {
        fontSize: 18,
        margin: 12,
        marginBottom: 0,
        fontFamily: 'Oswald',
    },
    text: {
        margin: 10,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        color: "#555",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    imageChart: {
        marginVertical: 25,
        marginHorizontal: 'auto',
        width: "100%",
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});


const CoverPg = ({plantImg, date} : { plantImg?: string, date : string }) => {
    // console.log(" IMAGGGGGG", plantImg)
    return (
        <Page
            style={{
                marginTop: 80
            }}
        >
            <Image style={[styles.image, {height : "20vh", width : "400px"}]} src={defaultImg} />
            <Text style={styles.title}>Daily Performance Report</Text>
            <Text style={styles.author}>{date}</Text>
            <Text style={styles.subtitle}>
                Motivaiton:  This Daily basis Report Generated for evaluate performance of plant".
            </Text>
            <Image style={styles.image} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUH1PpohcVWS9LNQ3a1DG4T2dKYbEcDijVA&s"} />
            <Text style={styles.author}>
                ETAFlux
            </Text>
        </Page>
    );
};

const EndPg = () => {
    return (
        <Page>
            <View style={{ transform: "translateY(200px)" }}>
                <Text style={styles.title}>End of Report</Text>
            </View>
        </Page>
    );
}

const DailyReportPDF = ({section1ChartImg, section2ChartImg, apiData, performanceKey, performanceData, selectedDates} : DailyReportPDFProps) => {
    const [plantImg, setPlantImg] = useState<string>('');

    // console.log("SELECTED DATE: ", selectedDates);
    // const performanceKey = ["PV_Daily_Energy_Today", "Specific_Yield", "Total_Inverter_Availability", "PR_Percent", "Total_Cum_POA_Kwhm2", "CUF_AC", "CUF_DC"];
    // const searchPerformanceTag = {
    //     devName : "Calculation",
    //     keys : performanceKey
    // }
    // const performanceData = UseDateLastValueTBAPI(searchPerformanceTag, selectedDates.endDate);
    // console.log("PERFORMACE DATA: ", performanceData);

    const infoKeys = ["Project", "Location", "Commissioned", "Energy System", "PV Capacity", "BESS Capacity", "DG Capacity"];
    const keys = ["image_url", "Plant_Name", "location", "commissioned", "Energy_System", "pv_capacity", "bess_capacity", "dg_capacity"];
    const data = UseInfoSymbol(keys);
    useEffect(() => {
        if (data) {
            // console.log("Plant Info : ", data)
            setPlantImg(data[0])
        }
    }, [data]);
    return (
        <Document>
            <CoverPg plantImg={plantImg} date={selectedDates.endDate.toISOString().slice(0, 10)} />
            <Indexpg topics={["Key Performance", "Plant Performance", "Inverter Performance"]} pageNumbers={[3, 4, 13]} />
            <TestReportLayout>
                <View>
                    <Text style={styles.heading}>Plant Summary</Text>
                    {data.slice(1, data.length).map((value, i) => (
                        <View style={{ marginLeft: "16px", display: "flex", flexDirection: "row", padding: "10px" }}>
                            <Text style={{ color: "gray", fontSize: "16px", width : "30%" }}>{infoKeys[i]} : </Text>
                            <Text style={{ color: "black", fontSize: "16px", marginLeft: "20px" }}>{data[i + 1]}</Text>
                        </View>
                    ))}
                    <Text style={{ color: "blue", fontSize: "16px", margin: "20px", marginLeft: "5px", marginTop : "70px" }}>Key Performance Value</Text>
                    <View style={{ fontSize: "12px", marginBottom: "10px" }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
                            <Text style={{ color: "black", fontWeight: 600 }}>AC Yield - </Text>
                            <Text style={{ color: "gray", fontWeight: 600 }}>{performanceData ? performanceData[0] ? performanceData[0][0][performanceKey[0]] : 0 : 0 } kWh</Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: "10px", paddingLeft: "5px" }}>
                            The total energy produced on previous day.
                        </Text>
                    </View>
                    <View style={{ fontSize: "12px", marginBottom: "10px" }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
                            <Text style={{ color: "black", fontWeight: 600 }}>Specific Yield (kWh/kWp)- </Text>
                            <Text style={{ color: "gray", fontWeight: 600 }}>{performanceData ? performanceData[0] ? performanceData[0][1][performanceKey[1]] : 0 : 0 } </Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: "10px", paddingLeft: "5px" }}>
                            The total amount of energy (kWh) produced for every kWp of the installed solar module.
                        </Text>
                    </View>
                    <View style={{ fontSize: "12px", marginBottom: "10px" }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
                            <Text style={{ color: "black", fontWeight: 600 }}>Availability - </Text>
                            <Text style={{ color: "gray", fontWeight: 600 }}>{performanceData ? performanceData[0] ? performanceData[0][2][performanceKey[2]] : 0 : 0 } %</Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: "10px", paddingLeft: "5px" }}>
                            The average availability of all inverters. If the average hourly yield of an inverter is above 5 Wh, availability is 100%
                        </Text>
                    </View>
                    <View style={{ fontSize: "12px", marginBottom: "10px" }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
                            <Text style={{ color: "black", fontWeight: 600 }}>Performance Ratio - </Text>
                            <Text style={{ color: "gray", fontWeight: 600 }}>{performanceData ? performanceData[0] ? performanceData[0][3][performanceKey[3]] : 0 : 0 } %</Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: "10px", paddingLeft: "5px" }}>
                            The measure of the quality of solar plant independent of weather conditions.
                        </Text>
                    </View>
                    <View style={{ fontSize: "12px", marginBottom: "10px" }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
                            <Text style={{ color: "black", fontWeight: 600 }}>Irradiance - </Text>
                            <Text style={{ color: "gray", fontWeight: 600 }}>{performanceData ? performanceData[0] ? performanceData[0][4][performanceKey[4]] : 0 : 0 } kWh/m2</Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: "10px", paddingLeft: "5px" }}>
                            Solar Irradiance measured by on-site installed sensors, or by satellite. If more than one sensor is installed the average value of th measurements is used.
                        </Text>
                    </View>
                    <View style={{ fontSize: "12px", marginBottom: "10px" }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
                            <Text style={{ color: "black", fontWeight: 600 }}>CUF AC - </Text>
                            <Text style={{ color: "gray", fontWeight: 600 }}>{performanceData ? performanceData[0] ? performanceData[0][5][performanceKey[5]] : 0 : 0 } %</Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: "10px", paddingLeft: "5px" }}>
                            The ratio of actual AC energy output over a period to the maximum possible AC output if the plant operated at full capacity 24/7.
                        </Text>
                    </View>
                    <View style={{ fontSize: "12px", marginBottom: "0px" }}>
                        <View style={{ display: "flex", flexDirection: "row", padding: "5px" }}>
                            <Text style={{ color: "black", fontWeight: 600 }}>CUF DC - </Text>
                            <Text style={{ color: "gray", fontWeight: 600 }}>{performanceData ? performanceData[0] ? performanceData[0][5][performanceKey[5]] : 0 : 0 } %</Text>
                        </View>
                        <Text style={{ color: "gray", fontSize: "10px", paddingLeft: "5px" }}>
                            The ratio of actual DC energy generated over a period to the total DC energy that would have been produced if the solar modules operated at peak capacity continuously.
                        </Text>
                    </View>

                </View>
            </TestReportLayout>
            <TestReportLayout>
                <View>
                    <Text style={styles.heading}>Plant Performace</Text>
                    <Text style={styles.text}>Date: {selectedDates.endDate.toISOString().slice(0, 10)}</Text>
                    <Text style={[styles.text, { marginTop: 0 }]}>Reporting Interval: 5 minutes</Text>
                    {section1ChartImg && <Image src={section1ChartImg} style={styles.imageChart} />}
                    <Text style={styles.heading}>Chart Insights</Text>
                    <Text style={styles.text}>The chart shows how the power output of the PV system, DG, and BESS fluctuated over time.</Text>
                    <Text style={styles.text}>Daily and total energy produced by the PV system helps track the plant's overall energy generation capability, providing insight into solar performance.</Text>
                    <Text style={styles.text}>DG power usage indicates the operational hours when the diesel generator is needed to supplement the power generation from the PV system.</Text>
                    <Text style={styles.text}>The charge/discharge energy and SoC of the BESS show how effectively energy is being stored and used, ensuring optimal battery utilization.</Text>
                    <Text style={styles.text}>Below is the "Tabular" view of Plant Summary Report:</Text>
                </View>
            </TestReportLayout>
            <DailyReportSection1Table apiData={apiData} />
            <TestReportLayout>
                <View>
                    <Text style={styles.heading}>Inverter Summary Report</Text>
                    <Text style={styles.text}>Date: {selectedDates.endDate.toISOString().slice(0, 10)}</Text>
                    <Text style={[styles.text, { marginTop: 0 }]}>Reporting Interval: 5 minutes</Text>
                    {section2ChartImg && <Image src={section2ChartImg} style={styles.imageChart} />}
                    <Text style={styles.heading}>Chart Insights</Text>
                    <Text style={styles.text}>The chart shows how the power output of the PV system over time.</Text>
                    <Text style={styles.text}>Daily and total energy produced by the PV system helps track the plant's overall energy generation capability, providing insight into solar performance.</Text>
                    {/* <Text style={styles.text}>DG power usage indicates the operational hours when the diesel generator is needed to supplement the power generation from the PV system.</Text> */}
                    {/* <Text style={styles.text}>The charge/discharge energy and SoC of the BESS show how effectively energy is being stored and used, ensuring optimal battery utilization.</Text> */}
                    <Text style={styles.text}>Below is the "Tabular" view of Plant Summary Report:</Text>
                </View>
            </TestReportLayout>
            <DailyReportSection2DataTable APIData={apiData} />
            <EndPg />
        </Document>
    );
};

export default DailyReportPDF;


interface ChartImages {
  section1ChartImg?: string;
  section2ChartImg?: string;
}

export const useDailyReportChartGenerator = (
    apiData: any,
    selectedDate: { startDate: Date; endDate: Date }
  ) => {
    const [chartImages, setChartImages] = useState<ChartImages>({
      section1ChartImg: undefined,
      section2ChartImg: undefined,
    });
  
    const isChartDataReady = !!chartImages.section1ChartImg && !!chartImages.section2ChartImg;
  
    useEffect(() => {
      // Reset chart images only if apiData or selectedDate changes significantly
      if (!apiData || !apiData.section1 || !apiData.section2) {
        setChartImages({ section1ChartImg: undefined, section2ChartImg: undefined });
      }
    }, [apiData, selectedDate.startDate, selectedDate.endDate]);
  
    return {
      chartImages,
      isChartDataReady,
      renderCharts: (
        <div style={{ position: "absolute", left: "-9999px" }}>
          <DailyReportSection1Chart
            onGenerate={(img: string) => setChartImages((prev) => ({ ...prev, section1ChartImg: img }))}
            APIData={apiData}
          />
          <DailyReportSection2Chart
            onGenerate={(img: string) => setChartImages((prev) => ({ ...prev, section2ChartImg: img }))}
            timeOfChart={selectedDate}
          />
        </div>
      ),
    };
  };