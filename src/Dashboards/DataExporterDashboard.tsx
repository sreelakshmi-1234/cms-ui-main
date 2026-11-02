import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Image, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import ReportSelector from "../components/ReportSelector";
import { useEffect, useState } from "react";
import PlantViewTableLayout from "../components/Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../components/widgets/tables/PlantTable";
import Cogneta from '../assets/cogneta-removebg-preview.png';
import { useCustomerOptionsContext } from "../Context/CustomerOptionsContext";
import { useTimeHandle } from "../Services/TimeWindowSetting";
import UseGeneratorTable from "../Services/Hooks/UseGeneratorTable";
import { html } from "gridjs";
import LandingTimeService from "../Services/LandingTimeService";
import ReportLayerOptions from "../components/widgets/DashbaordsWidgets/Reports/ReportLayerOptions";
import GlobalLoader from "../components/GlobalLoader";
const Papa = require('papaparse');

const DataExporterDashboard = () => {

    // ************ Landing Time Process **********
    LandingTimeService();

    // Loading State for dashboard
    const [showLoader, setShowLoader] = useState(true);

    // Simulate minimum loading time (2 sec)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 3000);
    })

    const { customerOptions } = useCustomerOptionsContext();
    var selectedCustomerID = localStorage.getItem("SelectedCustomerId");
    var currentCustomerName = customerOptions?.find(option => option.value == selectedCustomerID);

    const [searchTag, setSearchTag] = useState<Object[]>([{ Inverter: "AC_Active_Power_Watt" }, { Inverter: "AC_Reactive_Power_var" }, { Inverter: "AC_Apparent_Power_VA" }]);
    const [label, setLabel] = useState(["Power kW", "Power kVAR", "Power kVA"]);

    // ********************** Power Table Previous (Date & Time First Row) *********************
    // Time Period
    const [timePeriod, setTimePeriod] = useState("cdsf");

    // Aggregation
    const [agg, setAgg] = useState("AVG");

    // Daily
    const {
        timeWindow: timeWindowPowerTable,
        handleTimeWindowChange: handleTimeWindowPowerTableChange,
        handleReset: handlePowerTableReset
    } = useTimeHandle(1, timePeriod, agg, [5, "minute"]);

    var PowerTableData = UseGeneratorTable(searchTag, label, timeWindowPowerTable);
    
    // Monthly
    // const {
    //     timeWindow: timeWindowMonthlyPowerTable,
    //     handleTimeWindowChange: handleTimeWindowMonthlyPowerTableChange,
    //     handleReset: handleMonthlyPowerTableReset
    // } = useTimeHandle(1, "cmsf", "AVG", [5, "minute"]);

    // var MonthlyPowerTableData = UseGeneratorTable(searchTag, label, timeWindowMonthlyPowerTable);


    // ********************** Energy Table Previous (Date & Time First Row) *********************

    const [currentReport, setCurrentReport] = useState("Power Report");
    const [currentReportData, setCurrentReportData] = useState(PowerTableData);

    useEffect(() => {
        if (PowerTableData) {
            setCurrentReportData(PowerTableData)
        }
    }, [PowerTableData, searchTag, label])

    const handleOptionChange = (newOption: any) => {
        setCurrentReport(newOption.label);

        switch (newOption.value) {
            // case 0:
            //     setTimePeriod("cdsf");
            //     setAgg("AVG")
            //     setSearchTag([{ Calculation: "INV_Total_Power" }, { Meter: "Grid_Power_kW" }, { Calculation: "DG_Total_Power" }, { Calculation: "Load_Power" }]);
            //     setLabel(["INV Power kW", "Grid Power kW", "DG Power kW", "Load Power kW"]);
            //     handlePowerTableReset();
            //     break;
            case 0:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ Inverter: "AC_Active_Power_Watt" }, { Inverter: "AC_Reactive_Power_var" }, { Inverter: "AC_Apparent_Power_VA" }]);
                setLabel(["INV_0 kW", "INV_0 kVAR", "INV_0 kVA"]);
                handlePowerTableReset();
                break;
            case 1:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ Inverter: "Energy_Daily_kWh" }]);
                setLabel(["INV_0 kWh"]);
                handlePowerTableReset();
                break;
            case 2:
                setTimePeriod("cdsf");
                setAgg("NONE")
                setSearchTag([{ WMS: "Inst_POA" }, {WMS: "Cum_POA_Kwhm2"}, { WMS: "Inst_GHI" }, {WMS: "Cum_GHI_Kwhm2"}, {WMS: "Ambient_Temp"}, {WMS: "Module_temp"}, {WMS: "Wind_Dir"}, {WMS: "Wind_Speed"}]);
                setLabel(["POA_0 W/m2", "Cum.POA_0 kWh/m2", "GHI_0 W/m2", "Cum_0 kWh/m2", "A.Temp_0","M.Temp_0", "WindDir_0", "WindSpeed_0"]);
                break;
            case 3:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ DG: "AC_Active_Power_Watt" }]);
                setLabel(["DG_0 kW"]);
                handlePowerTableReset();
                break;
            case 4:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ ["Grid Meter-"]: "Grid_Power_kW" }, { ["Grid Meter-"]: "Grid_Power_kVAR" }, { ["Grid Meter-"]: "Grid_Power_kVA" }, { ["Grid Meter-"]: "Grid_AVG_Frequency" }, { ["Grid Meter-"]: "Grid_AVG_Voltage" }, { ["Grid Meter-"]: "Grid_AVG_Current" }, { ["Grid Meter-"]: "Grid_Daily_Energy_Import_kWh" }, { ["Grid Meter-"]: "Grid_Daily_Energy_Export_kWh" }]);
                setLabel(["Power_0 kW", "Power_0 kVAR", "Power_0 kVA", "AvgFreq_0 Hz", "AvgVolt_0 V", "AvgCurrent_0 A", "Export_0 kWh", "Import_0 kWh"]);
                break;
            case 5:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ ["Meter."]: "AC_Active_Power_Watt" }, { ["Meter."]: "AC_Reactive_Power_Var" }, { ["Meter."]: "AC_Apparant_Power_VA" }, { ["Meter."]: "AVG_Freq_L" }, { ["Meter."]: "AVG_Volt_L" }, { ["Meter."]: "AVG_Amps_L" }]);
                setLabel(["Power_0 kW", "Power_0 kVAR", "Power_0 kVA", "AvgFreq_0 Hz", "AvgVolt_0 V", "AvgCurrent_0 A"]);
                break;
            case 6:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ PCS: "ESS_SOC" }, { Calculation: "PCS_Total_Power" }, { PCS: "AC_Reactive_Power_var" }, { PCS: "kWhcharged_Day" }, { PCS: "kWhdischarged_Day" }, { PCS: "ESS_Ph_A_Amps_Total_PCS" }, { PCS: "ESS_Ph_B_Amps_Total_PCS" }, { PCS: "ESS_Ph_C_Amps_Total_PCS" }, { PCS: "ESS_Ph_AB_Volt_Total_PCS" }, { PCS: "ESS_Ph_BC_Volt_Total_PCS" }, { PCS: "ESS_Ph_CA_Volt_Total_PCS" }]);
                setLabel(["SoC %", "BESS kW", "BESS Var", "Charge kWh", "Discharge kWh", "L1 AMP", "L2 AMP", "L3 AMP", "L1 V", "L1 V", "L1 V"]);
                break;
            case 7:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ SMB: "Total_Amps" }]);
                setLabel(["T.Current_0 A"]);
                handlePowerTableReset();
                break;
            case 8:
                setTimePeriod("cdsf");
                setAgg("NONE")
                setSearchTag([{ Calculation: "PV_Daily_Energy_Today" }, { ["WMS.WMS-1"]: "Cum_POA_Kwhm2" }, { Calculation: "PR_Percent" }, { Calculation: "CUF_AC" }, { Calculation: "CUF_DC" }, { Calculation: "CO2_EmissionsKg_Saved" }]);
                setLabel(["PV kWh", "Cum.POA kWh/m2", "PR %", "CUF AC %", "CUF DC %", "CO2 kg"]);
                handlePowerTableReset();
                break;
            // case 9:
            //     setTimePeriod("cmsf");
            //     setAgg("NONE")
            //     setSearchTag([{ Inverter: "Energy_Daily_kWh" }]);
            //     setLabel(["INV_0 kWh"]);
            //     handlePowerTableReset();
            //     break;
            // case 10:
            //     setTimePeriod("cmsf");
            //     setAgg("NONE")
            //     setSearchTag([{ DG: "Energy_Daily_kWh" }, { DG: "DG_Runtime" }, { DG: "DG_DieselUsed" }]);
            //     setLabel(["DG_0 kWh", "DG_0 Min", "DG_0 L"]);
            //     handlePowerTableReset();
            //     break;
            default:
                setTimePeriod("cdsf");
                setAgg("AVG")
                setSearchTag([{ Inverter: "AC_Active_Power_Watt" }, { Inverter: "AC_Reactive_Power_var" }, { Inverter: "AC_Apparent_Power_VA" }]);
                setLabel(["Power kW", "Power kVAR", "Power kVA"]);
                handlePowerTableReset();
                break;
        }
    };

    const downloadCSV = () => {
        var csvData = []
        if (currentReportData) {
            csvData.push(currentReportData[0].column);
            csvData.push(...currentReportData[0].dataFromAPI);

            var csv = Papa.unparse(csvData);
            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

            // Trigger the download
            var downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.setAttribute('download', `${currentReport}_${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}.csv`);
            downloadLink.click();
        }
    }
    const currentColor = useColorModeValue("#062D59", "#fff");
    const currentBG = useColorModeValue("#fff", "#131512");
    return (
        <>
            {showLoader && <GlobalLoader />}
            <Box display={showLoader ? "none" : "block"} mt={"87px"} w="1176px" ml={10} px={{ base: 2, sm: 12, md: 17 }}>
                <ReportLayerOptions
                    currentLayer="dataexport"
                />
                {/* <Tabs variant={"enclosed"} colorScheme="green">
                <TabList>
                    <Tab>Portfolio</Tab>
                    <Tab>Plant</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ReportSummaryTable
                            name = "Porfolio"
                        />
                    </TabPanel>
                    <TabPanel>
                        <ReportSummaryTable 
                            name="Plant"
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs> */}
                <ReportSelector
                    handleOptionChange={handleOptionChange}
                />
                <Box my={5} ml={2} width={"1176px"} bg={useColorModeValue("#fff", "#131512")} height={currentReportData ? "max-content" : "100vh"}>
                    <Flex width={"1176px"} px={"20px"} justifyContent={"space-between"} align={"center"} mb={0}>
                        <Box>
                            <Image src={Cogneta} bg={"transparent"} width={60} height={40} />
                        </Box>
                        <Box>
                            <Text fontSize={15} fontWeight={300} textDecoration={"underline"}>
                                {(currentCustomerName?.label)?.split(".")[1]}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize={25} fontWeight={600}>{currentReport}</Text>
                        </Box>
                    </Flex>
                    {currentReportData ? (
                        <Box mt={-65} width={"1176px"} pb={5}>
                            <PlantViewTableLayout
                                title=""
                                width={["full", "100%"]}
                                height={"auto"}
                                timeWindow={true}
                                onTimeWindowChange={handleTimeWindowPowerTableChange}
                                onReset={handlePowerTableReset}
                                fullscreen={true}
                            >
                                <PlantTable
                                    // mt={5}
                                    paginationLimitProps={10}
                                    column={currentReportData ? currentReportData[0].column.map((elem, i) => {
                                        if (i == 0) {
                                            return ({
                                                name: "Date & Time",
                                                // width : 60,
                                                formatter: (cell: any) => html(`<center>${cell}</center>`)
                                            })
                                        } else {
                                            return elem;
                                        }
                                    }) : []}
                                    apiData={currentReportData || [{ column: [], dataFromAPI: [] }]}
                                    width="100%"
                                    search={false}
                                    sort={false}
                                    autoWidth={true}
                                    customColumn={true}
                                    customColumnCount={10}
                                    fullScreen={false}
                                />
                            </PlantViewTableLayout>
                            <Box mt={-3} mb={6}>
                                <Flex justify={"center"} my={5}>
                                    <Button
                                        fontSize={16 + "px"}
                                        h={"auto"}
                                        letterSpacing={2}
                                        color={currentColor}
                                        cursor={"pointer"}
                                        border={"2px solid"}
                                        p={["0.25em 0.75em", "0.25em 0.5em"]}
                                        boxShadow={"1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px"}
                                        userSelect={"none"}
                                        position={"relative"}
                                        _active={{
                                            boxShadow: "0px 0px 0px 0px",
                                            top: "5px",
                                            left: "5px"
                                        }}
                                        onClick={downloadCSV}
                                    >
                                        Download CSV
                                    </Button>
                                </Flex>
                            </Box>
                        </Box>
                    ) : (
                        <Flex width={"100%"} height={"40vh"} justify={"center"} alignItems={"center"}>
                            <Spinner color={currentColor} />
                        </Flex>
                    )}

                </Box>
            </Box>
        </>
    );
};

export default DataExporterDashboard;