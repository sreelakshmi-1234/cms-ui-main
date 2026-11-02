import { Box, Button, Flex, HStack, Input, Text, useColorModeValue } from "@chakra-ui/react";
import ConfigurationFields from "../components/widgets/DashbaordsWidgets/Reports/CreateReport/ConfigurationFields";
import { useEffect, useState } from "react";
import TripleTabTimeWindowSelector from "../components/widgets/DashbaordsWidgets/Reports/CreateReport/TripleTabTimeWindowSelector";
import swal from "sweetalert";
import "../index.css";
import GlobalLoader from "../components/GlobalLoader";
import ReportLayerOptions from "../components/widgets/DashbaordsWidgets/Reports/ReportLayerOptions";
import { useSaveReport } from "../Services/Hooks/Report/useSaveReport";
import LandingTimeService from "../Services/LandingTimeService";
import { useLocation, useNavigate } from "react-router";
import { usePromiseToast } from "../Services/Hooks/Toast/usePromiseToast";

export interface ReportFieldsType {
    portfolio: string | null;
    plantName: string[] | null;
    plant: string[] | null;
    plantTimeZone: string[] | null;
    assetType: string | null;
    ids: { label: string; value: string }[][] | { label: string; value: string }[] | null;
    params: string[] | null;
    agg: string | null;
}

export interface TripleTimewindowType {
    selectedTab: "live" | "history" | "relative",
    live: {
        timeResolution: number;
        intervalResolution: number;
        timeResolutionName: string | undefined;
        intervalResolutionName: string;
    },
    history: {
        startTs: number | null;
        endTs: number | null;
        intervalResolution: number;
        intervalResolutionName: string;
    },
    relative: {
        type: "daily" | "monthly";
        range: number;
    }
}

const CreateReport: React.FC = () => {

    // ************ Landing Time Process **********
    LandingTimeService();

    // Loading State for dashboard
    const [showLoader, setShowLoader] = useState(true);

    // Simulate minimum loading time (2 sec)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1500);
    })

    const navigate = useNavigate();

    // Prmoise Toast
    const showPromiseToast = usePromiseToast();

    let parsedConfig: { fields?: ReportFieldsType[]; timewindow?: any } = {};


    const [configFields, setConfigFields] = useState<ReportFieldsType[]>(
        parsedConfig.fields ?? [
            {
                portfolio: null,
                plantName: null,
                plant: null,
                plantTimeZone: null,
                assetType: null,
                ids: null,
                params: null,
                agg: null,
            },
        ]
    );

    const [timewindow, setTimewindow] = useState<TripleTimewindowType | null>(null);
    const [reportName, setReportName] = useState<string | null>();

    const [reportData, setReportData] = useState<{
        title : typeof reportName;
        createdAt : string;
        fields: ReportFieldsType[];
        timewindow: typeof timewindow;
    } | null>({ title: reportName, createdAt : "", fields: configFields, timewindow: timewindow });
    const [readyToReport, setReadyToReport] = useState(parsedConfig ? true : false);

    const handleTimewindowSave = (
        output : TripleTimewindowType
    ) => {
        setTimewindow(output);
    };

    const { saveReport, loading, error, data } = useSaveReport();

    const handleReportSubmit = () => {
        const isReportNameMissing = !reportName || reportName.trim() === "";

        const hasNullInConfig = configFields.some((field) =>
            Object.entries(field).some(([key, value]) => {
                if (key === "portfolio") {
                    field.portfolio = value === null ? "" : value;
                    return false;
                }

                if (Array.isArray(value)) {
                    return value.length === 0 || value.includes(null);
                }

                return value === null || value === undefined;
            })
        );

        const hasInvalidTimewindow = !timewindow || Object.values(timewindow).some(
            (value) => value === null || value === undefined
        );

        if (hasNullInConfig) {
            swal({
                title: "Cannot Save",
                text: "Config fields contain null or invalid values.",
                icon: "error"
            });
            setReadyToReport(false);
            return;
        }

        if (hasInvalidTimewindow) {
            swal({
                title: "Cannot Save",
                text: "time window contain null or invalid values.",
                icon: "error"
            });
            setReadyToReport(false);
            return;
        }

        if (isReportNameMissing) {
            swal({
                title: "Cannot Save",
                text: "Enter Report Name",
                icon: "error"
            });
            setReadyToReport(false);
            return;
        }

        const reportPayload = {
            title: reportName,
            createdAt: new Date().toLocaleString(),
            fields: [...configFields],
            timewindow: { ...timewindow }
        };

        setReadyToReport(true);
        setReportData(reportPayload);
        
        // console.log("Report ready:", reportPayload);
        
        showPromiseToast(
            saveReport(reportPayload, isUpdate), // must return a rejecting promise on error
            {
                error: {
                    title: "Failed",
                    description: error || "Failed to save report.",
                },
                success: {
                    description: data?.message || "Report saved successfully!",
                    title: "Success",
                },
                loading: {
                    title: "Saving Report",
                    description: "Please wait...",
                },
            }
        ).then(() => {
            navigate('/savedreport');
        }).catch(() => {});
    };

    // Update
    const location = useLocation();
    const updateReport = location.state?.updateReport || null;

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if(updateReport) {
            setReportName(updateReport.title);
            setReportData(updateReport);
            setConfigFields(updateReport.fields);
            setTimewindow(updateReport.timewindow);
            setIsUpdate(true);
        }
    }, [updateReport]);



    return (
        <>
            {showLoader && <GlobalLoader />}
            <Box display={showLoader ? "none" : "block"} mt={"87px"} width="1816px" ml={10} minH={"1000px"} px={{ base: 2, sm: 12, md: 17 }}>
                <ReportLayerOptions
                        currentLayer='createreport'
                />
                <Flex width={"1816px"} color={"#062D59"} direction={"column"}>
                    <Box borderBottom={"1px solid #888"} width={"100%"}>
                        {/* <Text fontSize={"18px"} fontWeight={700} textTransform={"capitalize"} px={2} mb={1}>
                            analytics
                        </Text> */}
                    </Box>
                    <Box
                        className="scroll-enabled"
                        mt={2}
                        px={2}
                        fontSize="14px"
                        width="100%"
                        h="300px"
                        overflow="auto"
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '5px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#aaa', // or your preferred color
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#888',
                            },
                        }}
                    >
                        <Text color="#555">Configurations -</Text>
                        <ConfigurationFields setFields={setConfigFields} isUpdate={isUpdate} fields={updateReport?.fields} />
                    </Box>

                    <HStack mt={5} px={2} fontSize={"14px"}>
                        <Text color={"#555"}>Time Configuration -</Text>
                        <TripleTabTimeWindowSelector onSave={handleTimewindowSave} isUpdate={isUpdate} timewindow={updateReport?.timewindow} />
                        {timewindow?.selectedTab == "history" ? (
                            <HStack>
                                <Text>Start time: </Text>
                                <Text borderBottom={"1px solid #062D59"}>
                                    {formatDateForInput(timewindow.history.startTs)}
                                </Text>
                                <Text ml={5}>End time: </Text>
                                <Text borderBottom={"1px solid #062D59"}>
                                    {formatDateForInput(timewindow.history.endTs)}
                                </Text>
                                <Text ml={5}>Interval: </Text>
                                <Text borderBottom={"1px solid #062D59"}>{timewindow.history.intervalResolutionName}</Text>
                            </HStack>
                        ) : timewindow?.selectedTab == "live" ? (
                            <HStack>
                                <Text>Time Resolution: </Text>
                                <Text borderBottom={"1px solid #062D59"}>
                                    {(timewindow.live.timeResolutionName)}
                                </Text>
                                <Text ml={5}>Interval: </Text>
                                <Text borderBottom={"1px solid #062D59"}>{timewindow.history.intervalResolutionName}</Text>
                            </HStack>
                        ) : timewindow?.selectedTab == "relative" ? (
                            <HStack>
                                <Text>Relative Type: </Text>
                                <Text borderBottom={"1px solid #062D59"}>
                                    {(timewindow.relative.type)}
                                </Text>
                                <Text ml={5}>Range: </Text>
                                <Text borderBottom={"1px solid #062D59"}>{timewindow.relative.range}</Text>
                            </HStack>
                        ) : (
                            <Text ml={5}>Select Time Configuration </Text>
                        )}
                    </HStack>
                    <HStack mt={5} px={2} fontSize={"14px"}>
                        <Text color={"#555"}>Report Name - </Text>
                        <Input 
                            type="text"
                            placeholder="Daily Report/D-3457"
                            border={"none"}
                            borderBottom={"1px solid #555"}
                            color={"#062D59"}
                            width={"200px"}
                            rounded={"0"}
                            _focus={{
                                border : "none",
                                borderBottom:  "1px solid #062D59"
                            }}
                            focusBorderColor="transparent"
                            fontSize={"13px"}
                            onChange={(e) => setReportName(e.target.value)}
                            defaultValue={reportName || ""}
                        />
                    </HStack>
                    <HStack mt={5} ml={3}>
                        <Button
                            fontWeight={600}
                            variant={"ghost"}
                            bg={useColorModeValue("#062D59", "#fff")}
                            rounded={"none"}
                            color={useColorModeValue("#fff", "#062D59")}
                            mr={3}
                            onClick={handleReportSubmit}
                            _hover={{ opacity: 0.8 }}
                            fontSize={"14px"}
                        >
                            Save Report
                        </Button>
                        {/* <Button
                            fontWeight={600}
                            variant={"ghost"}
                            bg={useColorModeValue("#062D59", "#fff")}
                            rounded={"none"}
                            color={useColorModeValue("#fff", "#062D59")}
                            mr={3}
                            onClick={handleReset}
                            _hover={{ opacity: 0.8 }}
                            fontSize={"14px"}
                        >
                            Reset
                        </Button> */}
                    </HStack>
                </Flex>
            </Box>
        </>
    );
};

export default CreateReport;


// Format date for datetime-local input
    const formatDateForInput = (timestamp: number | null): string => {
      if (!timestamp || isNaN(timestamp)) return "";

      const date = new Date(timestamp);
      const pad = (n: number) => n.toString().padStart(2, '0');

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // Months are 0-based
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${year}-${month}-${day}  ${hours}:${minutes}`;
    };