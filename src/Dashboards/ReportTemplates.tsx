import React, { useEffect, useState } from 'react';
import { Box, Text as ChakraText, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Flex, VStack, Input, ModalFooter, Spinner, FormControl, FormLabel, useColorModeValue, HStack } from '@chakra-ui/react';
import { PDFViewer, Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import DailyReportPDF, { useDailyReportChartGenerator } from '../components/PDFReports/DailyReportPDF';
import UseDailyReport from '../Services/Hooks/ReportPDF/UseDailyReport';
import { DailyReportSection1keys, DailyReportSection2keys } from '../components/PDFReports/PDFReportRenderer/DailyReportRenders';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import ReportLayerOptions from '../components/widgets/DashbaordsWidgets/Reports/ReportLayerOptions';
import { Select } from 'chakra-react-select';
import { useCustomerOptionsContext } from '../Context/CustomerOptionsContext';
import { useSelectedCustomerIDContext } from '../Context/SelectedCustomerIDContext';
import { PlantTimeZoneSelection } from '../Services/CustomerHandlingService';
import UseDateLastValueTBAPI from '../Services/Hooks/UseDateLastValueTBAPI';

// Style definition for the PDF layout
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
  },
});

// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.body}>
//       <Text style={styles.title}>Test PDF</Text>
//       <Text style={styles.text}>This is a simple test for the PDF preview.</Text>
//     </Page>
//   </Document>
// );

const ReportTemplates = () => {

  // Time zone
  const timeZone = localStorage.getItem("PlantTimeZone") || 'Asia/Coloumbo'

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDateModalOpen, onOpen: onDateModalOpen, onClose: onDateModalClose } = useDisclosure();
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Default date function
  const getDefaultDateString = () => {
    const currentDate = new Date();
    const zonedCurrentDate = toZonedTime(currentDate, timeZone);
    const startDate = new Date(zonedCurrentDate.setDate(zonedCurrentDate.getDate() - 1));
    const zonedStartDate = startDate;
    startDate.setHours(0, 0, 0, 0); // Midnight in local time, then adjust to timezone

    const endDate = new Date();
    const zonedEndDate = toZonedTime(endDate, timeZone);
    zonedEndDate.setHours(0, 0, 0, 0); // Midnight in timezone
    return { startDate: zonedStartDate, endDate: zonedEndDate };
  };

  // State for selected dates
  const [selectedDates, setSelectedDates] = useState<{ startDate: Date; endDate: Date }>(getDefaultDateString());
  const [tempDate, setTempDate] = useState<string>("");

  const [isDailyReportReportReady, setIsDailyReportReportReady] = useState(false);

  // Daily Report Performance Keys
  const performanceKey = ["PV_Daily_Energy_Today", "Specific_Yield", "Total_Inverter_Availability", "PR_Percent", "Total_Cum_POA_Kwhm2", "CUF_AC", "CUF_DC"];
    const searchPerformanceTag = {
        devName : "Calculation",
        keys : performanceKey
    }
    const performanceData = UseDateLastValueTBAPI(searchPerformanceTag, selectedDates.endDate);

  // Daily Report Configuration
  const effectiveDates = selectedDates;
  const DailyReportApiData = UseDailyReport(
    DailyReportSection1keys,
    DailyReportSection2keys,
    effectiveDates
  ) as any;
  const { chartImages, renderCharts, isChartDataReady } = useDailyReportChartGenerator(
    DailyReportApiData,
    effectiveDates
  );

  useEffect(() => {
    if (
      DailyReportApiData &&
      DailyReportApiData["section1"] &&
      DailyReportApiData["section2"] &&
      isChartDataReady &&
      performanceData
    ) {
      setIsDailyReportReportReady(true);
    } else {
      setIsDailyReportReportReady(false);
    }
  }, [DailyReportApiData, isChartDataReady]);

  const reports = isDailyReportReportReady
    ? [
      {
        id: 1,
        code: "D/100",
        initDdate: "25/04/08",
        name: "Daily Report",
        preview: (
          <DailyReportPDF
            section1ChartImg={chartImages.section1ChartImg}
            section2ChartImg={chartImages.section2ChartImg}
            apiData={DailyReportApiData}
            performanceKey={performanceKey}
            performanceData={performanceData}
            selectedDates={selectedDates || getDefaultDateString()} // Pass dates to PDF
          />
        ),
        fileName: "daily_report.pdf",
      },
    ]
    : [];

  const handlePreview = (report: any) => {
    setSelectedReport(report);
    onOpen();
  };

  // Date Edit Handles
  const handleDateIconClick = () => {
    // Initialize temp dates with current selected dates or default
    const defaultDates = selectedDates;
    setTempDate(formatInTimeZone(defaultDates.endDate, timeZone, "yyyy-MM-dd"));
    onDateModalOpen();
  };

  const handleDateConfirm = () => {
    const start = toZonedTime(new Date(tempDate), timeZone);
    start.setHours(0, 0, 0, 0); // Ensure midnight in timezone
    const end = toZonedTime(new Date(tempDate), timeZone);
    end.setHours(23, 59, 59, 999); // End of day in timezone

    if (start && end && start <= end) {
      setSelectedDates({ startDate: start, endDate: end });
      setIsDailyReportReportReady(false)
    }
    onDateModalClose();
  };

  const handleDateCancel = () => {
    setTempDate("");
    onDateModalClose();
  };

  //****************Handle Select Customer */
  const { customerOptions, setCustomerOptions } = useCustomerOptionsContext();
  const { selectedCustomerID, setSelectedCustomerID } = useSelectedCustomerIDContext();

  const handlePlantChange = (selectedOption: any) => {
    setSelectedCustomerID(selectedOption?.value);
    localStorage.setItem("SelectedCustomerId", selectedOption?.value || "");
    PlantTimeZoneSelection(selectedOption?.value);
    window.location.reload();
  };
  // console.log(customerOptions)
  // console.log(selectedCustomerID)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  useEffect(() => {
    if (customerOptions) {
      // console.log(customerOptions)
      setSelectedCustomerId(selectedCustomerID);
      localStorage.setItem("SelectedCustomerId", selectedCustomerID || "");
      if (selectedCustomerID) {
        PlantTimeZoneSelection(selectedCustomerID);
      }

    }
  }, []);

  const currentColor = useColorModeValue("#062D59", "#fff");
  const currentBG = useColorModeValue("#fff", "#131512");
  return (
    <Box mt={"87px"} w="1816px" height={"1000px"} ml={10} px={{ base: 2, sm: 12, md: 17 }}>
      {renderCharts} {/* Render charts off-screen */}
      <ReportLayerOptions
        currentLayer='report'
      />
      <HStack ml={2} alignContent={"baseline"} h={"24px"} mb={10} mt={10}>
        <FormLabel color={currentColor} mt={2} fontSize={"16px"}>
          Select Plant:
        </FormLabel>
        <FormControl
          w={"250px"} // 198px
          // h={"auto"}
          // maxH={"24px"}
          color={useColorModeValue("#062D59", "#FFFFFF")}
          size={"20px"}
          lineHeight={"24.38px"}
        // display={["none", "block"]}
        >
          <Box fontWeight={600} borderBottom={`1px solid ${currentColor}`}>
            <Select
              isMulti={false}
              name="plants"
              placeholder="Select Any Plant"
              closeMenuOnSelect={true}
              variant="unstyle"
              focusBorderColor="transparent"
              options={Array.from(
                new Map(
                  (customerOptions || []).map((option) => [option.value, option])
                ).values()
              )}
              value={customerOptions?.find(option => option.value === localStorage.getItem("SelectedCustomerId"))}
              onChange={handlePlantChange}
              // useBasicStyles={true}
              chakraStyles={{
                menuList: (provided) => ({
                  ...provided,
                  backgroundColor: currentBG,
                  color: currentColor,
                  fontSize: "18px"
                }),
                option: (provided, state) => ({
                  ...provided,
                  bgColor: "transparent"
                })
              }}
            />
          </Box>
        </FormControl>
      </HStack>
      <Box bg={"white"} ml={2} width={"1816px"} height={"80vh"}>
        <Table width={"1816px"} variant="simple" color={"#062D59"}>
          <Thead h={"30px"}>
            <Tr bg={"#DDE3E8"} h={"30px"}>
              <Th color={"#062D59"} textAlign={"center"} fontSize={"12px"}>Code</Th>
              <Th color={"#062D59"} textAlign={"center"} fontSize={"12px"}>Date</Th>
              <Th color={"#062D59"} textAlign={"center"} fontSize={"12px"}>Report Name</Th>
              <Th color={"#062D59"} textAlign={"center"} fontSize={"12px"}>Preview</Th>
              <Th color={"#062D59"} textAlign={"center"} fontSize={"12px"}>Download</Th>
            </Tr>
          </Thead>
          {/* {!isDailyReportReportReady ? (
            <Flex justify="center" align="center" height="100%" width={"1816px"}>
              <Spinner size="sm" />
              <ChakraText ml={4}>Loading report data...</ChakraText>
            </Flex>
          ) : ( */}
          <Tbody>
            {reports.map((report) => (
              <Tr key={report.id}>
                <Td fontSize={"14px"} color={"#062D59"} textAlign={"center"} px={"18px"} border={"1px solid #DDE3E8"}>{report.code}</Td>
                <Td fontSize={"14px"} color={"#062D59"} textAlign={"center"} px={"18px"} border={"1px solid #DDE3E8"}>
                  <Flex justify={"center"}>
                    <BsCalendar2DateFill cursor={"pointer"} onClick={handleDateIconClick} />
                  </Flex>
                </Td>
                <Td fontSize={"14px"} color={"#062D59"} textAlign={"center"} px={"18px"} border={"1px solid #DDE3E8"}>{report.name}</Td>
                <Td fontSize={"14px"} color={"#062D59"} textAlign={"center"} px={"18px"} border={"1px solid #DDE3E8"}>
                  {/* Preview Button: Open the overlay modal */}
                  <Button onClick={() => handlePreview(report)} variant="outline" size={"xs"}>
                    View PDF
                  </Button>
                </Td>
                <Td fontSize={"14px"} color={"#062D59"} textAlign={"center"} px={"18px"} border={"1px solid #DDE3E8"}>
                  {/* Download Link: Provide a download button */}
                  <PDFDownloadLink document={report.preview} fileName={report.fileName}>
                    {({ loading }) =>
                      loading ? (
                        <Button isLoading loadingText="Loading..." variant="outline" size={"xs"}>
                          Download PDF
                        </Button>
                      ) : (
                        <Button variant="outline" size={"xs"}>Download PDF</Button>
                      )
                    }
                  </PDFDownloadLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* )} */}
        </Table>
      </Box>

      {/* Modal for PDF Preview */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent color={"#062D59"}>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedReport && (
              <PDFViewer style={{ width: '100%', height: '80vh', border: '1px solid #ccc' }}>
                {selectedReport.preview}
              </PDFViewer>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for Date Selection */}
      <Modal isOpen={isDateModalOpen} onClose={onDateModalClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box>
                <ChakraText mb={2}>Select Date</ChakraText>
                <Input
                  type="date"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={handleDateCancel}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleDateConfirm}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReportTemplates;
