import { Box, Button, HStack, Table, TableContainer, Tbody, Td, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingTimeService from "../Services/LandingTimeService";
import GlobalLoader from "../components/GlobalLoader";
import ReportLayerOptions from "../components/widgets/DashbaordsWidgets/Reports/ReportLayerOptions";
import { useGetUserReport } from "../Services/Hooks/Report/useGetUserReports";
import { useGetCustomReportData } from "../Services/Hooks/Report/useGetCustomReportData";
import { ExportReportToExcel } from "../Services/Export/ExportReportToExcel";
import { usePromiseToast } from "../Services/Hooks/Toast/usePromiseToast";
import { useDeleteUserReport } from "../Services/Hooks/Report/useDeleteUserReport";
import TripleTabTimeWindowSelector from "../components/widgets/DashbaordsWidgets/Reports/CreateReport/TripleTabTimeWindowSelector";
import { MdDeleteForever, MdEdit, MdOutlineFileDownload } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";


const SavedReport = () => {

    // ************ Landing Time Process **********
    LandingTimeService();

    // Loading State for dashboard
    const [showLoader, setShowLoader] = useState(true);

    // Simulate minimum loading time (2 sec)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);
    });

    // Toast
    const showPromiseToast = usePromiseToast();

    // Handle Download
    const { getUserReportData, data: TableData, loading: downloadLoading, error } = useGetCustomReportData();
    const handleReportDownload = (report: any) => {
        showPromiseToast(getUserReportData(report), {
            loading : {title : "Request to download..."},
            success : {description : "Report downloaded successfully."}
        }).catch(() => {});
    };

    useEffect(() => {
        if (TableData && Object.keys(TableData?.data || {}).length > 0) {
            ExportReportToExcel(TableData);
        }
    }, [TableData]);

    // handle change time and download report
    const handleTimeChangeAndDownload = (changeTime : any, report : any) => {
        report.timewindow = changeTime;
        handleReportDownload(report);
    }

    // handle Edit
    const navigate = useNavigate();

    // Handle Delete
    const {deleteUserReport, data : deleteResult} = useDeleteUserReport();
    const handleReportDelete = (report : any) => {
        showPromiseToast(deleteUserReport(report), {
            loading : {title : "Request to delete..."},
            success : {description : "Report deleted successfully."}
        }).catch(() => {});
    }

    // Get User Report
    const { getUserReport, data } = useGetUserReport();

    useEffect(() => {
        getUserReport()
    }, [deleteResult]);


    const borderColor = useColorModeValue("#DDE3E8", "#262B27");
    const color = useColorModeValue("#062D59", "#fff");
    return (
        <>
            {showLoader && <GlobalLoader />}
            <Box display={showLoader ? "none" : "block"} mt={"87px"} w="1816px" height={"1000px"} ml={10} px={{ base: 2, sm: 12, md: 17 }}>
                <ReportLayerOptions
                    currentLayer='savedreport'
                />
                <Box w={"1816px"}>
                    <TableContainer bg={useColorModeValue("white", "#131512")} mt={5}>
                        <Table variant={"simple"} color={color} textAlign="center" size={"xs"}>
                            <Thead fontSize={12 + "px"} height={"30px"} fontWeight={500} bg={borderColor} border={`1px solid ${borderColor}`}>
                                <Tr fontWeight={600}>
                                    <Td textAlign={"center"}>Created Time</Td>
                                    <Td textAlign={"center"}>Report Name</Td>
                                    <Td textAlign={"center"}>Action</Td>
                                </Tr>
                            </Thead>
                            <Tbody color={color}>
                                {data &&
                                    (() => {
                                        const reports = data.AllReports || [];
                                        const totalRows = 8;
                                        const remainingRows = totalRows - reports.length;

                                        // Create array of real reports + dummy entries
                                        const rows = [
                                            ...reports,
                                            ...Array(remainingRows).fill(null) // Fill missing rows with null (dummy)
                                        ];

                                        return rows.map((elem, i) => (
                                            <Tr key={i} fontSize="12px">
                                                <Td border={`1px solid ${borderColor}`} textAlign="center">
                                                    {elem ? elem.createdAt.replace(',', ' ') : '\u00A0'} {/* Non-breaking space */}
                                                </Td>
                                                <Td border={`1px solid ${borderColor}`} textAlign="center" color={color} fontWeight={600}>
                                                    {elem ? elem.title : '\u00A0'}
                                                </Td>
                                                <Td border={`1px solid ${borderColor}`} textAlign="center">
                                                    {elem ? (
                                                        <HStack justify="center" spacing={3} width="100%">
                                                            <Button
                                                                fontWeight={600}
                                                                variant="ghost"
                                                                // bg={color}
                                                                rounded="none"
                                                                // color="#fff"
                                                                mr={1}
                                                                onClick={() => handleReportDownload(elem)}
                                                                _hover={{ opacity: 0.8 }}
                                                                fontSize="10px"
                                                                size="xs"
                                                            >
                                                                <MdOutlineFileDownload color={color} fontSize={16} />
                                                            </Button>
                                                            <Button
                                                                fontWeight={600}
                                                                variant="ghost"
                                                                // bg="green.500"
                                                                rounded="none"
                                                                // color="#fff"
                                                                mr={1}
                                                                onClick={() => navigate('/createreport', { state: { updateReport: elem } })}
                                                                _hover={{ opacity: 0.8 }}
                                                                fontSize="10px"
                                                                size="xs"
                                                            >
                                                                <MdEdit color={color} fontSize={16} />
                                                            </Button>
                                                            <Button
                                                                fontWeight={600}
                                                                variant="ghost"
                                                                // bg="teal.500"
                                                                rounded="none"
                                                                // color="#fff"
                                                                mr={1}
                                                                _hover={{ opacity: 0.8 }}
                                                                fontSize="10px"
                                                                size="sm"
                                                                title="Edit Resolution and Download"
                                                            >
                                                                <TripleTabTimeWindowSelector 
                                                                    onSave={(changedTime) => handleTimeChangeAndDownload(changedTime, elem)} 
                                                                    isUpdate 
                                                                    icon={<BsCalendar2DateFill color={color} fontSize={14} />} 
                                                                    downloadTextInsteadOfSave 
                                                                    timewindow={elem?.timewindow} 
                                                                />
                                                            </Button>
                                                            <Button
                                                                fontWeight={600}
                                                                variant="ghost"
                                                                // bg="red.500"
                                                                rounded="none"
                                                                // color="#fff"
                                                                mr={1}
                                                                onClick={() => handleReportDelete(elem)}
                                                                _hover={{ opacity: 0.8 }}
                                                                fontSize="10px"
                                                                size="xs"
                                                            >
                                                                <MdDeleteForever color={color} fontSize={16} />
                                                            </Button>
                                                        </HStack>
                                                    ) : (
                                                        <Button
                                                            fontWeight={600}
                                                            variant="ghost"
                                                            // bg="red.500"
                                                            rounded="none"
                                                            // color="#fff"
                                                            visibility={"hidden"}
                                                            mr={1}
                                                            _hover={{ opacity: 0.8 }}
                                                            fontSize="10px"
                                                            size="xs"
                                                        >
                                                            <MdDeleteForever color={color} fontSize={16} />
                                                        </Button>
                                                    )}
                                                </Td>
                                            </Tr>
                                        ));
                                    })()
                                }

                                {/* Fallback when no data */}
                                {!data && (
                                    <>
                                        {Array(8)
                                            .fill(null)
                                            .map((_, i) => (
                                                <Tr key={`dummy-${i}`} fontSize="10px">
                                                    <Td border={`1px solid ${borderColor}`} textAlign="center">&nbsp;</Td>
                                                    <Td border={`1px solid ${borderColor}`} textAlign="center">&nbsp;</Td>
                                                    <Td border={`1px solid ${borderColor}`} textAlign="center">&nbsp;</Td>
                                                </Tr>
                                            ))}
                                    </>
                                )}
                            </Tbody>
                        </Table>
                        <Box height={"20px"} width={"100%"} bg={"white"}></Box>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default SavedReport;