import {
    Box,
    Button,
    filter,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Select,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tooltip,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { Select as SelectLib } from "chakra-react-select";
  import React, { useEffect, useState } from "react";
  import swal from 'sweetalert';
  import { CgSandClock } from "react-icons/cg";
import { TripleTimewindowType } from "../../../../../Dashboards/CreateReport";
import { calculateTimeOption } from "../../../../../utility/calculateTimeOption";
import { FaInfoCircle } from "react-icons/fa";
import { formatInTimeZone } from "date-fns-tz";
  
  /* -------------------------------------------------------------------------- */
  /*                               Time Constants                               */
  /* -------------------------------------------------------------------------- */
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  
  /* -------------------------------------------------------------------------- */
  /*                                   Types                                    */
  /* -------------------------------------------------------------------------- */
  interface TimeWindowProps {
    onSave: (output : TripleTimewindowType) => void;
    isUpdate? : boolean;
    timewindow? : TripleTimewindowType;
    icon? : React.ReactNode;
    downloadTextInsteadOfSave? : boolean;
  }
  
  interface IntervalOption {
    label: string;
    value: number;
  }
  
  /* -------------------------------------------------------------------------- */
  /*                               Main Component                               */
  /* -------------------------------------------------------------------------- */
  const TripleTabTimeWindowSelector: React.FC<TimeWindowProps> = ({
    onSave,
    isUpdate,
    timewindow,
    icon,
    downloadTextInsteadOfSave
  }) => {
    /* ------------------------------- State -------------------------------- */
    const [humanInteraction, setHumanInteraction] = useState(false);

    // Active tab state
    const [activeTab, setActiveTab] = useState<"live" | "history" | "relative">("live");

    // Open close of popover
    const [isOpen, setIsOpen] = useState(false);
  
    // Live Selection State
    const [liveTimeResolution, setLiveTimeResolution] = useState<number>(
      calculateTimeOption(1, "hour")
    );
    const [liveTimeResolutionName, setLiveTimeResolutionName] = useState<string>(
        'Last 1 Hour'
    );
    const [intervalResolution, setIntervalResolution] = useState<number>(
      5 * MINUTE
    );
    const [intervalResolutionName, setIntervalResolutionName] = useState<string>(
        '5 Minutes'
    );
  
    // History Selection State
    const [fromDate, setFromDate] = useState<number | null>(null);
    const [toDate, setToDate] = useState<number | null>(null);
  
    // Predefined Options
    const [validIntervals, setValidIntervals] = useState<number[]>([]);
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

    // Relative State
  const [relativeType, setRelativeType] = useState<"daily" | "monthly">("daily");
  const [relativeRange, setRelativeRange] = useState<number>(1);

  const relativeTypeOptions = [
    { label: "Daily", value: "daily" },
    { label: "Monthly", value: "monthly" },
  ];

  const getRelativeRangeOptions = () => {
    const max = relativeType === "daily" ? 8 : 1;
    return Array.from({ length: max }, (_, i) => ({
      label: `${i + 1}`,
      value: i + 1,
    }));
  };
  
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
        if (!fromDate || !toDate || isNaN(fromDate) || isNaN(toDate)) return;
        const diff = toDate - fromDate;
        updateValidIntervalsHistory(diff);
      }
    }, [liveTimeResolution, fromDate, toDate, activeTab]);


    /* ----------------------------- Handlers ----------------------------- */
    const timeZone = localStorage.getItem("SelectedTimezone") || 'Asia/Colombo';

    const handleSave = () => {
      const output = {
        selectedTab: activeTab,
        live: {
          timeResolution: liveTimeResolution,
          intervalResolution: intervalResolution,
          timeResolutionName : liveTimeResolutionName,
          intervalResolutionName : intervalResolutionName
        },
        history: {
          startTs: fromDate != null ? intervalResolution == (1000*60*60*24) ? new Date(formatInTimeZone(fromDate, timeZone, 'yyyy-MM-dd HH:mm:ss') + "Z").getTime() : fromDate : fromDate,
          endTs: toDate != null ? intervalResolution == (1000*60*60*24) ? new Date(formatInTimeZone(toDate, timeZone, 'yyyy-MM-dd HH:mm:ss') + "Z").getTime() : toDate : toDate,
          intervalResolution: intervalResolution,
          intervalResolutionName
        },
        relative: {
          type: relativeType,
          range: relativeRange,
        },
      };

      if (activeTab === "history") {
        if (!fromDate || !toDate || isNaN(fromDate) || isNaN(toDate) || toDate < fromDate) {
          swal("Please select valid 'From' and 'To' dates.");
          return;
        }
      }

      onSave(
        output
      );
      // console.log("Selected Output", output);
      setIsOpen(false);
    };
  
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

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    /* -----------------------------Rehydrate------------------------------ **/
    useEffect(() => {
      if(isUpdate && timewindow) {
        // Tab
        setActiveTab(timewindow.selectedTab);

        // Live
        if(timewindow.selectedTab == "live") {
          setLiveTimeResolution(timewindow.live.timeResolution);
          setLiveTimeResolutionName(timewindow.live?.timeResolutionName || "");
          setIntervalResolution(timewindow.live.intervalResolution);
          setIntervalResolutionName(timewindow.live.intervalResolutionName);
        } else if(timewindow.selectedTab == "history") {
          setFromDate(timewindow.history.startTs);
          setToDate(timewindow.history.endTs);
          setIntervalResolution(timewindow.history.intervalResolution);
          setIntervalResolutionName(timewindow.history.intervalResolutionName);
        } else {
          setRelativeType(timewindow.relative.type);
          setRelativeRange(timewindow.relative.range);
        }

      }
    }, [isUpdate, timewindow]);
  
    /* ------------------------------ Render ------------------------------- */
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
        const scaleFactor = Math.min(widthScale, heightScale); // Maintain aspect ratio

        setScale(scaleFactor);
      };

      updateScale(); // Initial scale calculation
      window.addEventListener("resize", updateScale); // Update on window resize
      return () => window.removeEventListener("resize", updateScale);
    }, []);

    return (
      <Popover 
        placement="end-end" 
        closeOnBlur={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
    >
        <PopoverTrigger>
          {icon ? (<Box>{icon}</Box>): (  
            <Box
              border="1px solid #ccc"
              p={2}
              borderRadius="md"
              cursor="pointer"
              _hover={{ opacity: 0.8}}
              bg={"#062D59"}
            >
              <CgSandClock color="white" />
            </Box>
          )}
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            width="400px"
            color={useColorModeValue("#062D59", "#FFF")}
            bg={useColorModeValue("#fff", "#131512")}
            sx={{

              transform: `scale(${scale}) !important`,
            }}
            >
            <PopoverHeader fontWeight="bold">Time Window</PopoverHeader>
            <PopoverCloseButton />
    
            <PopoverBody>
              <Tabs
                isFitted
                colorScheme="green"
                onChange={(index) => {
                  const tabs = ["live", "history", "relative"];
                  setActiveTab(tabs[index] as typeof activeTab);
                }}
                defaultIndex={timewindow ? timewindow.selectedTab == 'live' ? 0 : timewindow.selectedTab == 'history' ? 1 : 2 : 0}
              >
                <TabList>
                  <Tab fontSize={"12px"}>Live</Tab>
                  <Tab fontSize={"12px"}>History</Tab>
                  <Tab fontSize={"12px"}>Relative</Tab>
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
                          setHumanInteraction(true);
                        }}
                        value={timeResolutions.find(
                          (option) => option.value === liveTimeResolution
                        )}
                        selectedOptionColorScheme="gray"
                      />
                    </FormControl>
    
                    <FormControl fontSize={"12px"} ml={2} mb={2} isRequired>
                      <HStack spacing={1}>
                        <FormLabel fontSize="14px" mb="0" ml={2}>
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
                        value={formatDateForInput(fromDate)}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          if (!isNaN(date.getTime())) {
                            setFromDate(date.getTime());
                          } else {
                            setFromDate(null);
                          }
                        }}
                        height={"30px"}
                        fontSize={"12px"}
                      />
                    </FormControl>
    
                    <FormControl mb={5} isRequired>
                      <FormLabel fontSize={"14px"} ml={2}>To</FormLabel>
                      <Input
                        type="datetime-local"
                        value={formatDateForInput(toDate)}
                        onChange={(e) => {
                          const date = new Date(e.target.value);
                          if (!isNaN(date.getTime())) {
                            setToDate(date.getTime());
                          } else {
                            setToDate(null);
                          }
                        }}
                        height={"30px"}
                        fontSize={"12px"}
                      />
                    </FormControl>
    
                    <FormControl mb={2} isRequired>
                      <HStack spacing={1}>
                        <FormLabel fontSize="14px" mb="0" ml={2}>
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
                  {/* Relative Selection */}
                  <TabPanel>
                    <FormControl mb={4} isRequired>
                      <HStack spacing={1}>
                        <FormLabel fontSize="14px">
                          Relative Type
                        </FormLabel>

                        <Tooltip
                          hasArrow
                          placement="right"
                          fontSize="12px"
                          label={
                            "Relative type is used to fetch past data. If you select ‘Daily’ and set the range to 3, it will return the last value from each of the past 3 days. " +
                            "Similarly for ‘Monthly’. "
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
                        placeholder="Select Type"
                        options={relativeTypeOptions}
                        value={relativeTypeOptions.find((o) => o.value === relativeType)}
                        onChange={(e) => {
                          setRelativeType(e ? e.value == 'daily' || e?.value == 'monthly'? e.value : "daily" : 'daily');
                          setRelativeRange(1);
                        }}
                        size="sm"
                        selectedOptionColorScheme="gray"
                        focusBorderColor="#062D59"
                        chakraStyles={{
                          valueContainer: (provided) => ({
                            ...provided,
                            fontSize: "12px",
                          }),
                          menuList: (p) => ({
                            ...p,
                            height: "70px",
                          }),
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="14px" ml={2}>
                        Range
                      </FormLabel>
                      <SelectLib
                        isMulti={false}
                        placeholder="Select Range"
                        options={getRelativeRangeOptions()}
                        value={getRelativeRangeOptions().find((o) => o.value === relativeRange)}
                        onChange={(e) => {
                          setRelativeRange(e?.value || 1);
                        }}
                        size="sm"
                        selectedOptionColorScheme="gray"
                        focusBorderColor="#062D59"
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
                      />
                    </FormControl>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </PopoverBody>
    
            <PopoverFooter display="flex" justifyContent="flex-end">
              <Button
                fontWeight={400}
                variant={"ghost"}
                color={useColorModeValue("#062D59", "#fff")}
                onClick={() => setIsOpen(false)}
                mr={3}
                fontSize={"12px"}
              >
                Cancel
              </Button>
              <Button
                fontWeight={400}
                variant={"ghost"}
                bg={useColorModeValue("#062D59", "#fff")}
                rounded={"none"}
                color={useColorModeValue("#fff", "#062D59")}
                mr={3}
                onClick={handleSave}
                _hover={{opacity : 0.8}}
                fontSize={"12px"}
              >
                {downloadTextInsteadOfSave ? "Download" : "Save"}
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    );
  };
  
  export default TripleTabTimeWindowSelector;