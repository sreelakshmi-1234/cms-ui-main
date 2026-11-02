import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    ModalOverlay,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
    Tooltip,
    Icon,
    HStack
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Select as SelectLib } from "chakra-react-select";
import swal from 'sweetalert';
import { calculateTimeOption } from "../utility/calculateTimeOption";
import { windowSetting } from "../components/Layouts/ChartLayouts/GraphLayout";
import { FaInfoCircle } from "react-icons/fa";

interface TimeWindowProps {
    isOpen: boolean;
    onClose: () => void;
    // firstInterval : [number, string];
    // onFirstInit : (startTs: number, endTs: number, aggregate: string) => void;
    onSave: (from: string, to: string, aggregation: string, interval: number, setting: windowSetting) => void;
    onReset: (reset: boolean) => void;
    children?: React.ReactNode;
    inFullScreen?: boolean;
}

interface IntervalOption {
    label: string;
    value: number;
}

// Time Setting Options
const SECONDS = 1000;
const MINUTE = 60 * SECONDS;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const QUATER = 3 * MONTH;
const YEAR = 4 * QUATER;

export const TimeWindow: React.FC<TimeWindowProps> = ({ onClose, onSave, onReset, children, inFullScreen = false }) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );

    const [overlay] = useState(<OverlayOne />);

    const handleNoneSelection = (): string => {
        const plantResolutionMinute = localStorage.getItem("plantResolutionMinute");
        if (plantResolutionMinute) {
            if (plantResolutionMinute == "1") {
                return "RAW";
            } else {
                return "NONE";
            }
        } else {
            return "NONE";
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [aggregation, setAggregation] = useState<string>(handleNoneSelection());
    const [interval, setInterval] = useState<number>(5 * MINUTE);
    const [validIntervals, setValidIntervals] = useState<number[]>([]);

    /* ------------------------------- State -------------------------------- */
    const [humanInteraction, setHumanInteraction] = useState(false);

    // Active tab state
    const [activeTab, setActiveTab] = useState<"live" | "history">("live");

    // Live Selection State
    const [liveTimeResolution, setLiveTimeResolution] = useState<number>(
        calculateTimeOption(5, "minute")
    );
    const [liveTimeResolutionName, setLiveTimeResolutionName] = useState<string>(
        'Last 5 Minute'
    );
    const [intervalResolution, setIntervalResolution] = useState<number>(
        5 * MINUTE
    );
    const [intervalResolutionName, setIntervalResolutionName] = useState<string>(
        '5 Minutes'
    );

    // Predefined Options
    const [intervalResolutions, setIntervalResolutions] = useState<
        IntervalOption[]
    >([
        { label: "5 Minutes", value: 5 * MINUTE },
        { label: "10 Minutes", value: 10 * MINUTE },
        { label: "15 Minutes", value: 15 * MINUTE },
        { label: "30 Minutes", value: 30 * MINUTE },
        { label: "1 Hour", value: 1 * HOUR },
        { label: "2 Hours", value: 2 * HOUR },
        { label: "5 Hours", value: 5 * HOUR },
        { label: "10 Hours", value: 10 * HOUR },
        { label: "12 Hours", value: 12 * HOUR },
        { label: "1 Day", value: 1 * DAY },
        { label: "1 Week", value: 1 * WEEK },
    ]);

    const timeResolutions: IntervalOption[] = [
        { label: "Last 5 Minute", value: calculateTimeOption(5, "minute") },
        { label: "Last 10 Minute", value: calculateTimeOption(10, "minute") },
        { label: "Last 15 Minute", value: calculateTimeOption(15, "minute") },
        { label: "Last 30 Minute", value: calculateTimeOption(30, "minute") },
        { label: "Last 1 Hour", value: calculateTimeOption(1, "hour") },
        { label: "Last 2 Hours", value: calculateTimeOption(2, "hour") },
        { label: "Last 5 Hours", value: calculateTimeOption(5, "hour") },
        { label: "Last 10 Hours", value: calculateTimeOption(10, "hour") },
        { label: "Last 12 Hours", value: calculateTimeOption(12, "hour") },
        { label: "Last 1 Day", value: calculateTimeOption(1, "day") },
        { label: "Last 3 Day", value: calculateTimeOption(3, "day") },
        { label: "Last 7 Days", value: 7 * DAY },
        { label: "Last 30 Days", value: 30 * DAY },
        { label: "Last 6 Months", value: 6 * MONTH },
        { label: "Yesterday", value: calculateTimeOption(1, "ydsf") },
        { label: "Current Day So Far", value: calculateTimeOption(1, "cdsf") },
        { label: "Current Week So Far", value: calculateTimeOption(1, "cwsf") },
        { label: "Current Month So Far", value: calculateTimeOption(1, "cmsf") },
    ];

    /* ------------------------------- Effects ------------------------------- */

    const updateValidIntervalsHistory = (diff: number) => {
        const filtered = intervalResolutions.filter((interval) => {
            const minutes = interval.value / MINUTE;
            const hours = interval.value / HOUR;

            // Hide 5-minute option when difference > 1 day
            if (diff > 1 * DAY && minutes === 5) {
                return false;
            }

            // Hide up to 15-minute options when difference >= 3 days
            if (diff >= 3 * DAY && [5, 10, 15].includes(minutes)) {
                return false;
            }

            // Hide up to 30-minute options when difference >= 7 days
            if (diff >= 7 * DAY && [5, 10, 15, 30].includes(minutes)) {
                return false;
            }

            // Hide up to 2-hour options when difference >= 1 month
            if (diff >= 1 * MONTH && (
                [5, 10, 15, 30].includes(minutes) || [1, 2].includes(hours)
            )) {
                return false;
            }

            return true;
        });

        setValidIntervals(filtered.map((option) => option.value));

        if (filtered.length > 0) {
            setIntervalResolution(filtered[0].value);
            setIntervalResolutionName(filtered[0].label);
        }
    };


    useEffect(() => {
        if (activeTab === "live") {
            if (!liveTimeResolution) return;
            updateValidIntervalsHistory(liveTimeResolution);
        } else
            if (activeTab === "history") {
                if (!fromDate || !toDate) return;
                const diff = new Date(toDate).getTime() - new Date(fromDate).getTime();
                updateValidIntervalsHistory(diff);
            }
    }, [liveTimeResolution, fromDate, toDate, activeTab]);

    const handleSave = () => {
        if (activeTab === "history") {
            if (!fromDate || !toDate || isNaN(new Date(fromDate).getTime()) || isNaN(new Date(toDate).getTime()) || new Date(toDate).getTime() < new Date(fromDate).getTime()) {
                swal("Please select valid 'From' and 'To' dates.");
                return;
            }
        }
        setHumanInteraction(true)
        const setting = {
            selectedTab: activeTab,
            humanInteraction: humanInteraction,
            live: {
                timeResolution: liveTimeResolution,
                intervalResolution: intervalResolution,
                timeResolutionName: liveTimeResolutionName,
                intervalResolutionName: intervalResolutionName
            },
            history: {
                startTs: fromDate,
                endTs: toDate,
                intervalResolution: intervalResolution,
                intervalResolutionName
            }
        };

        onSave(fromDate, toDate, aggregation == "Cumulative" ? "MAX" : aggregation, interval, setting);
        setIsOpen(false);
    };

    const handleReset = () => {
        onReset(true)
        setFromDate("");
        setToDate("");

        setLiveTimeResolution(
            calculateTimeOption(5, "minute")
        );
        setLiveTimeResolutionName(
            'Last 5 Minute'
        );
        setIntervalResolution(
            5 * MINUTE
        );
        setIntervalResolutionName(
            '5 Minutes'
        );

        setAggregation(handleNoneSelection());
        setInterval(5 * MINUTE);
        setIsOpen(false);
        setHumanInteraction(false);
    };

    // Resizing Logic
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const baseWidth = 1280; // Your design's base resolution width
            const baseHeight = 832; // Your design's base resolution height
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;

            // Calculate scale factor based on width or height
            const widthScale = currentWidth / baseWidth;
            const heightScale = currentHeight / baseHeight;
            const scaleFactor = Math.max(widthScale, heightScale); // Maintain aspect ratio

            setScale(scaleFactor);
        };

        updateScale(); // Initial scale calculation
        window.addEventListener("resize", updateScale); // Update on window resize
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    return (
        <Popover
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            placement="auto-end" isLazy
        >
            <PopoverTrigger>
                <Box as="span" display="inline-block">
                    {children}
                </Box>
            </PopoverTrigger>
            <PopoverContent
                color={useColorModeValue("#062D59", "#FFF")}
                bg={useColorModeValue("#fff", "#131512")}
                sx={{

                    transform: inFullScreen ? `scale(${scale}) !important` : "scale(1) !important",
                }}
            >
                <PopoverHeader fontWeight={700}>Time Window</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <Tabs
                        isFitted
                        colorScheme="green"
                        onChange={(index) => {
                            const tabs = ["live", "history", "relative"];
                            setActiveTab(tabs[index] as typeof activeTab);
                        }}
                        defaultIndex={activeTab == 'live' ? 0 : activeTab == 'history' ? 1 : 0}
                    >
                        <TabList>
                            <Tab fontSize={"12px"}>Live</Tab>
                            <Tab fontSize={"12px"}>History</Tab>
                        </TabList>

                        <TabPanels>
                            {/* Live Selection */}
                            <TabPanel>
                                <FormControl fontSize={"12px"} ml={2} mb={5} isRequired>
                                    <FormLabel fontSize={"14px"}>Time Resolution</FormLabel>
                                    <SelectLib
                                        isMulti={false}
                                        placeholder="Select Resolution"
                                        variant="outline"
                                        focusBorderColor="#062D59"
                                        size={"sm"}
                                        chakraStyles={{
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                fontSize: "12px",
                                            }),
                                            menuList: (p) => ({
                                                ...p,
                                                height: "180px",
                                            }),
                                        }}
                                        options={timeResolutions}
                                        onChange={(e) => {
                                            setLiveTimeResolution(e?.value || 0)
                                            setLiveTimeResolutionName(e?.label || '')
                                        }}
                                        value={timeResolutions.find(
                                            (option) => option.value === liveTimeResolution
                                        )}
                                        selectedOptionColorScheme="gray"
                                    />
                                </FormControl>

                                <FormControl fontSize={"12px"} ml={2} mb={5} isRequired>
                                    <HStack spacing={1}>
                                        <FormLabel fontSize="14px" mb="0">
                                            Aggregate
                                        </FormLabel>

                                        <Tooltip
                                            hasArrow
                                            placement="right"
                                            fontSize="12px"
                                            label={
                                                "Cumulative is typically used for energy and revenue-type values. " +
                                                "NONE means no aggregation is applied and raw data is returned."
                                            }
                                        >
                                            <span>
                                                <Icon
                                                    as={FaInfoCircle}
                                                    boxSize={3}
                                                    color="gray.500"
                                                    cursor="pointer"
                                                />
                                            </span>
                                        </Tooltip>
                                    </HStack>
                                    <Select
                                        height={"30px"}
                                        fontSize={"12px"}
                                        value={aggregation}
                                        onChange={(e) => setAggregation(e.target.value)}
                                    >
                                        <option value="MIN" style={{fontSize: "12px"}}>Min</option>
                                        <option value="MAX" style={{fontSize: "12px"}}>Max</option>
                                        <option value="SUM" style={{fontSize: "12px"}}>SUM</option>
                                        <option value="AVG" style={{fontSize: "12px"}}>AVG</option>
                                        <option value="Cumulative" style={{fontSize: "12px"}}>Cumulative</option>
                                        <option value={handleNoneSelection()}>NONE</option>
                                    </Select>
                                </FormControl>

                                <FormControl fontSize={"12px"} ml={2} mb={2} isRequired>
                                    <HStack spacing={1}>
                                        <FormLabel fontSize="14px" mb="0">
                                            Interval Resolution
                                        </FormLabel>

                                        <Tooltip
                                            hasArrow
                                            placement="right"
                                            fontSize="12px"
                                            label={
                                                "Interval Resolution groups data based on the selected aggregation. " +
                                                "It divides the selected time frame into intervals (e.g., 5 min, 1 day). " +
                                                "This is not applied when aggregation is set to NONE."
                                            }
                                        >
                                            <span>
                                                <Icon
                                                    as={FaInfoCircle}
                                                    boxSize={3}
                                                    color="gray.500"
                                                    cursor="pointer"
                                                />
                                            </span>
                                        </Tooltip>
                                    </HStack>
                                    <SelectLib
                                        isMulti={false}
                                        placeholder="Select Interval"
                                        variant="outline"
                                        focusBorderColor="#062D59"
                                        size={"sm"}
                                        chakraStyles={{
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                fontSize: "12px",
                                            }),
                                            menuList: (p) => ({
                                                ...p,
                                                height: "180px",
                                            }),
                                        }}
                                        options={intervalResolutions.filter((option) =>
                                            validIntervals.includes(option.value)
                                        )}
                                        onChange={(e) => {
                                            setIntervalResolution(e?.value || 0)
                                            setIntervalResolutionName(e?.label || "")
                                        }}
                                        value={intervalResolutions.find(
                                            (option) => option.value === intervalResolution
                                        )}
                                        selectedOptionColorScheme="gray"
                                    />
                                </FormControl>
                            </TabPanel>

                            {/* History Selection */}
                            <TabPanel>
                                <FormControl mb={2} isRequired>
                                    <FormLabel fontSize={"14px"} ml={2}>From</FormLabel>
                                    <Input
                                        type="datetime-local"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        height={"30px"}
                                        fontSize={"12px"}
                                    />
                                </FormControl>

                                <FormControl mb={5} isRequired>
                                    <FormLabel fontSize={"14px"} ml={2}>To</FormLabel>
                                    <Input
                                        type="datetime-local"
                                        value={toDate}
                                        onChange={(e) => {
                                            setToDate(e.target.value)
                                        }}
                                        height={"30px"}
                                        fontSize={"12px"}
                                    />
                                </FormControl>

                                <FormControl fontSize={"12px"}mb={5} isRequired>
                                    <HStack spacing={1}>
                                        <FormLabel fontSize="14px" ml={2} mb="0">
                                            Aggregate
                                        </FormLabel>

                                        <Tooltip
                                            hasArrow
                                            placement="right"
                                            fontSize="12px"
                                            label={
                                                "Cumulative is typically used for energy and revenue-type values. " +
                                                "NONE means no aggregation is applied and raw data is returned."
                                            }
                                        >
                                            <span>
                                                <Icon
                                                    as={FaInfoCircle}
                                                    boxSize={3}
                                                    color="gray.500"
                                                    cursor="pointer"
                                                />
                                            </span>
                                        </Tooltip>
                                    </HStack>
                                    <Select
                                        height={"30px"}
                                        fontSize={"12px"}
                                        value={aggregation}
                                        onChange={(e) => setAggregation(e.target.value)}
                                    >
                                        <option value="MIN" style={{fontSize: "12px"}}>Min</option>
                                        <option value="MAX" style={{fontSize: "12px"}}>Max</option>
                                        <option value="SUM" style={{fontSize: "12px"}}>SUM</option>
                                        <option value="AVG" style={{fontSize: "12px"}}>AVG</option>
                                        <option value="Cumulative" style={{fontSize: "12px"}}>Cumulative</option>
                                        <option value={handleNoneSelection()}>NONE</option>
                                    </Select>
                                </FormControl>

                                <FormControl mb={2} isRequired>
                                    <HStack spacing={1}>
                                        <FormLabel fontSize="14px" ml={2} mb="0">
                                            Interval Resolution
                                        </FormLabel>

                                        <Tooltip
                                            hasArrow
                                            placement="right"
                                            fontSize="12px"
                                            label={
                                                "Interval Resolution groups data based on the selected aggregation. " +
                                                "It divides the selected time frame into intervals (e.g., 5 min, 1 day). " +
                                                "This is not applied when aggregation is set to NONE."
                                            }
                                        >
                                            <span>
                                                <Icon
                                                    as={FaInfoCircle}
                                                    boxSize={3}
                                                    color="gray.500"
                                                    cursor="pointer"
                                                />
                                            </span>
                                        </Tooltip>
                                    </HStack>
                                    <SelectLib
                                        isMulti={false}
                                        placeholder="Select Interval"
                                        variant="outline"
                                        focusBorderColor="#062D59"
                                        size={"sm"}
                                        chakraStyles={{
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                fontSize: "12px",
                                            }),
                                            menuList: (p) => ({
                                                ...p,
                                                height: "180px",
                                            }),
                                        }}
                                        options={intervalResolutions.filter((option) =>
                                            validIntervals.includes(option.value)
                                        )}
                                        onChange={(e) => {
                                            setIntervalResolution(e?.value || 0)
                                            setIntervalResolutionName(e?.label || "")
                                        }}
                                        value={intervalResolutions.find(
                                            (option) => option.value === intervalResolution
                                        )}
                                        selectedOptionColorScheme="gray"
                                    />
                                </FormControl>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </PopoverBody>
                <PopoverFooter display={"flex"} justifyContent={"space-between"}>
                    <Button color={"#FF4646"} fontWeight={400} variant={"ghost"} mr={3} onClick={handleReset}>
                        Reset
                    </Button>
                    <Box>
                        <Button fontWeight={400} variant={"ghost"} bg={useColorModeValue("#062D59", "#fff")} rounded={"none"} color={useColorModeValue("#fff", "#062D59")} mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button fontWeight={400} variant={"ghost"} color={useColorModeValue("#062D59", "#fff")} onClick={() => setIsOpen(false)}>Close</Button>
                    </Box>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};
