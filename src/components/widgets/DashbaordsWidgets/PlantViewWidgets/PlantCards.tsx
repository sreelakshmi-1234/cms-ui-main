import { Box, Button, Flex, GridItem, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import PlantViewCalculationCardLayout from "../../../Layouts/PlantViewCalculationCardLayout";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../../../../Services/EnlargeWidget";
import UsePlantStatusCard from "../../../../Services/Hooks/PlantView/UsePlantStatusCard";
import UsePlantCard from "../../../../Services/Hooks/PlantView/UsePlantCard";
import GridBG from '../../../../assets/PlantView/PlantViewGridBG.svg';
import DGBG from '../../../../assets/PlantView/PlantViewDGBG.svg';
import SolarBG from '../../../../assets/PlantView/PlantViewSolarBG.svg';
import BESSBG from '../../../../assets/PlantView/PlantViewBESSBG.svg';
import { useEffect, useRef, useState } from "react";
import { ExpandIcon, SqeezIcon, DownloadIcon } from "../../../../assets/Icons";
import { FaAngleDown } from "react-icons/fa";

interface PlantCardDataType {
    daily : string[];
    month : string[];
    year : string[];
}

const PlantCards = () => {
    // ******************** STATUS *********************

    const StatusCardLabel = ["Plant Availability", "Grid Availability", "Grid Out", "Grid Down Occurrence", "Plant Downtime", "Plant Downtime Occurrence", "Load Loss"];
    const StatusCardDailyData = UsePlantStatusCard(StatusCardLabel, "daily") || {daily : []};
    const StatusCardMonthData = UsePlantStatusCard(StatusCardLabel, "month") || {month : []};
    const StatusCardYearData = UsePlantStatusCard(StatusCardLabel, "year") || {year : []};
    const [StatusCardData, setStatusCardData] = useState<PlantCardDataType | undefined>(undefined);
    
    useEffect(() => {
        setStatusCardData({
            ...StatusCardDailyData,
            ...StatusCardMonthData,
            ...StatusCardYearData
        });
    }, [StatusCardDailyData, StatusCardMonthData, StatusCardYearData]);
    // console.log("STATUS : ", StatusCardData)

    //******************************Solar Card*************** */
    // Columns => Always "Key"
    // Values => Telemetry Name
    // Status => 0 : AVG / 1 : SUM
    var searchSolarCard = '[{"columns" : "Key","values" : "INV_Total_Power","status" : 0, "device" : "Calculation"},{"columns" : "Key","values" : "PV_Daily_Energy_Today","status" : 1, "device" : "Calculation"}, {"columns" : "Key","values" : "CUF_AC","status" : 0, "device" : "Calculation"},{"columns" : "Key","values" : "CO2_EmissionsKg_Saved","status" : 0, "device" : "Calculation"},{"columns" : "Key","values" : "PR_Percent","status" : 1, "device" : "Calculation"}]'
    var SolarDataLabel = ["PV Power kW", "PV Generation kWh", "CUF %", "CO2 Saving kg", "PR %"]
    const SolarPlantCardDailyData = UsePlantCard(searchSolarCard, SolarDataLabel, "daily") || {daily : []};
    const SolarPlantCardMonthData = UsePlantCard(searchSolarCard, SolarDataLabel, "month") || {month : []};
    const SolarPlantCardYearData = UsePlantCard(searchSolarCard, SolarDataLabel, "year") || {year : []};
    const [SolarPlantCardData, setSolarPlantCardData] = useState<PlantCardDataType | undefined>(undefined);
    
    useEffect(() => {
        setSolarPlantCardData({
            ...SolarPlantCardDailyData,
            ...SolarPlantCardMonthData,
            ...SolarPlantCardYearData
        });
    }, [SolarPlantCardDailyData, SolarPlantCardMonthData, SolarPlantCardYearData]);
    // console.log(SolarPlantCardData)

    //******************************DG Card*************** */
    // Columns => Always "Key"
    // Values => Telemetry Name
    // Status => 0 : AVG / 1 : SUM
    var searchDGCard = '[{"columns" : "Key","values" : "DG_Total_Power","status" : 0, "device" : "Calculation"},{"columns" : "Key","values" : "DG_Total_Energy","status" : 1, "device" : "Calculation"},{"columns" : "Key","values" : "VOLT_L1_L2","status" : 1, "device" : "Calculation"},{"columns" : "Key","values" : "Daily_Runtime_Sum","status" : 1, "device" : "Calculation"},{"columns" : "Key","values" : "Daily_Saving_Sum","status" : 1, "device" : "Calculation"}]'
    var DGDataLabel = ["DG Power kW", "DG Generation kWh", "DG Line Voltage V", "DG Runtime Min", "Savings INR"]
    const DGPlantCardDailyData = UsePlantCard(searchDGCard, DGDataLabel, "daily") || {daily : []};
    const DGPlantCardMonthData = UsePlantCard(searchDGCard, DGDataLabel, "month") || {month : []};
    const DGPlantCardYearData = UsePlantCard(searchDGCard, DGDataLabel, "year") || {year : []};
    const [DGPlantCardData, setDGPlantCardData] = useState<PlantCardDataType | undefined>(undefined);
    
    useEffect(() => {
        setDGPlantCardData({
            ...DGPlantCardDailyData,
            ...DGPlantCardMonthData,
            ...DGPlantCardYearData
        });
    }, [DGPlantCardDailyData, DGPlantCardMonthData, DGPlantCardYearData]);
    // console.log(DGPlantCardData)

    //******************************Grid Card*************** */

    var searchGridCard = '[{"columns" : "Key","values" : "Grid_Power_kW","status" : 0, "device" : "Grid-Meter"},{"columns" : "Key","values" : "Grid_AVG_Frequency","status" : 0, "device" : "Calculation"},{"columns" : "Key","values" : "Grid_Daily_Energy_Export_kWh","status" : 1, "device" : "Grid-Meter"}, {"columns" : "Key","values" : "Grid_Daily_Energy_Import_kWh","status" : 0, "device" : "Grid-Meter"},{"columns" : "Key","values" : "Grid_AVG_Voltage","status" : 0, "device" : "Calculation"}, {"columns" : "Key","values" : "AGC_AMP_L1","status" : 0, "device" : "Grid-Meter"}]'
    var GridDataLabel = ["Grid kW", "Grid Hz", "Consumption kWh", "Feed kWh", "Line Voltage V", "Line Current A"]
    const GridPlantCardDailyData = UsePlantCard(searchGridCard, GridDataLabel, "daily") || {daily : []};
    const GridPlantCardMonthData = UsePlantCard(searchGridCard, GridDataLabel, "month") || {month : []};
    const GridPlantCardYearData = UsePlantCard(searchGridCard, GridDataLabel, "year") || {year : []};
    const [GridPlantCardData, setGridPlantCardData] = useState<PlantCardDataType | undefined>(undefined);
    
    useEffect(() => {
        setGridPlantCardData({
            ...GridPlantCardDailyData,
            ...GridPlantCardMonthData,
            ...GridPlantCardYearData
        });
    }, [GridPlantCardDailyData, GridPlantCardMonthData, GridPlantCardYearData]);
    // console.log("GridPlantCardData", GridPlantCardData)

    //******************************BESS Card*************** */

    var searchBESSCard = '[{"columns" : "Key","values" : "PCS_Total_Power","status" : 0, "device" : "Calculation"},{"columns" : "Key","values" : "kWhcharged_Day","status" : 1, "device" : "PCS-1"},{"columns" : "Key","values" : "kWhdischarged_Day","status" : 1, "device" : "PCS-1"},{"columns" : "Key","values" : "ESS_SOC","status" : 0, "device" : "PCS-1"}, {"columns" : "Key","values" : "Line_AVG_HZ","status" : 0, "device" : "PCS-1"},{"columns" : "Key","values" : "ESS_AVG_Line_Volt","status" : 0, "device" : "PCS-1"}, {"columns" : "Key","values" : "ESS_AVG_Line_Amps","status" : 0, "device" : "PCS-1"}]'
    var BESSDataLabel = ["BESS kW", "Charge kWh", "Discharge kWh", "SoC%", "BESS Hz", "Line Voltage V", "Line Current A"]
    const BESSPlantCardDailyData = UsePlantCard(searchBESSCard, BESSDataLabel, "daily") || {daily : []};
    const BESSPlantCardMonthData = UsePlantCard(searchBESSCard, BESSDataLabel, "month") || {month : []};
    const BESSPlantCardYearData = UsePlantCard(searchBESSCard, BESSDataLabel, "year") || {year : []};
    const [BESSPlantCardData, setBESSPlantCardData] = useState<PlantCardDataType | undefined>(undefined);
    
    useEffect(() => {
        setBESSPlantCardData({
            ...BESSPlantCardDailyData,
            ...BESSPlantCardMonthData,
            ...BESSPlantCardYearData
        });
    }, [BESSPlantCardDailyData, BESSPlantCardMonthData, BESSPlantCardYearData]);
    // console.log("BESSPlantCardData", BESSPlantCardData)

    // Full Screen Logic
      const PlantCardLayoutRef = useRef<HTMLDivElement>(null);
      const [isFullscreen, setIsFullscreen] = useState(false);
    
      const handleFullScreen = () => {
        if (PlantCardLayoutRef.current) {
          if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
          } else {
            PlantCardLayoutRef.current.requestFullscreen();
            setIsFullscreen(true);
          }
        }
      };
    
      // Handle exit fullscreen via ESC key or other methods
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          setIsFullscreen(false); // Exited fullscreen
        }
      };
    
      // Add event listener for fullscreen change
      useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
      }, []);

    //   Interval Selection
    const [currentInterval, setCurrentInterval] = useState<"daily" | "month" | "year">("daily");

    // Tab Selection
    const [selectedTab, setSelectedTab] = useState(0);

    function handleSelectInterval(interval : "daily" | "month" | "year") : void {
        setCurrentInterval(interval);
    }

    // Download CSV logic (only current tab)
    function handleDownloadCSV() {
      // Find current tab index (0:Status, 1:Grid, 2:Solar, 3:DG, 4:BESS)
      const tabInfo = [
        { label: 'Status', labels: StatusCardLabel, data: StatusCardData?.[currentInterval] || [] },
        { label: 'Grid', labels: GridDataLabel, data: GridPlantCardData?.[currentInterval] || [] },
        { label: 'Solar', labels: SolarDataLabel, data: SolarPlantCardData?.[currentInterval] || [] },
        { label: 'DG', labels: DGDataLabel, data: DGPlantCardData?.[currentInterval] || [] },
        { label: 'BESS', labels: BESSDataLabel, data: BESSPlantCardData?.[currentInterval] || [] },
      ];

      // Get current tab index from Tabs (default 0)
      const tabList = ['Status', 'Grid', 'Solar', 'DG', 'BESS'];
      // Find selected tab by checking which TabPanel is visible
      // We'll track selected tab index in state

      // Move Tabs' value and onChange to stateful
      // (see JSX patch below)

      const tab = tabInfo[selectedTab];
      let csvContent = '';
      csvContent += tab.labels.join(',') + '\n';
      csvContent += tab.data.map(val => typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val).join(',') + '\n';

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${tab.label}_${currentInterval.toUpperCase()}_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    return (
      <Box
        ref={PlantCardLayoutRef}
        w={isFullscreen ? "100vW" : "100%"}
        h={isFullscreen ? "100vh" : "100%"}
        bg={useColorModeValue('white', '#131512')}
        overflow={"hidden"}
      >
        <Tabs
          variant='unstyled'
          bg={"transparent"}
          index={selectedTab}
          onChange={setSelectedTab}
        >
                <HStack justifyContent={"space-between"} height={"54px"}>
                    <TabList fontSize={"18px"} fontWeight={400} color={"#9BABBD"} >
                    <Tab _selected={{color : "#8CC73B", fontWeight : 600}} >{"Status"}</Tab>
                    <Tab _selected={{color : "#8CC73B", fontWeight : 600}} >{"Grid"}</Tab>
                    <Tab _selected={{color : "#8CC73B", fontWeight : 600}}>{"Solar"}</Tab>
                    <Tab _selected={{color : "#8CC73B", fontWeight : 600}} >{"DG"}</Tab>
                    <Tab _selected={{color : "#8CC73B", fontWeight : 600}}>{"BESS"}</Tab>
                    </TabList>
                    <HStack pr={5}>
                    {/* Interval / Resolution Selection */}
                        <Menu placement="bottom-end">
                            <MenuButton as={Button} fontSize={"16px"} fontWeight={500} bg={"transparent"} rightIcon={<FaAngleDown fontWeight={500} />} _active={{opacity : 0.6}}>
                                <Text textTransform={"capitalize"}>{currentInterval}</Text>
                            </MenuButton>
                            <MenuList fontSize={"18px"} fontWeight={400} color={"#062D59"} >
                                <MenuItem p={"10px"} onClick={() => handleSelectInterval("daily")}>Daily</MenuItem>
                                <MenuItem p={"10px"} onClick={() => handleSelectInterval("month")}>Month</MenuItem>
                                <MenuItem p={"10px"} onClick={() => handleSelectInterval("year")}>Year</MenuItem>
                            </MenuList>
                        </Menu>
                    {/* Download CSV Icon */}
                      <IconButton
                        aria-label="Download CSV"
                        icon={<DownloadIcon />}
                        onClick={handleDownloadCSV}
                        variant="ghost"
                        size={"xs"}
                        _hover={{ bg: 'transparent', color: 'gray.500' }}
                      />
                    {/* Fullscreen Icon */}
                      <IconButton
                        aria-label="Fullscreen"
                        icon={isFullscreen ? <SqeezIcon/> : <ExpandIcon />}
                        onClick={handleFullScreen}
                        variant="ghost"
                        size={"xs"}
                        _hover={{ bg: 'transparent', color: 'gray.500' }}
                      />
                    </HStack>
                </HStack>
                <TabIndicator  height= {EnlargeWidgetSize(3) + "px"} bg='#8CC73B' borderRadius='1px' />
                <hr style={{border: "1px solid #DDE3E8", width: "100%"}} />
                <TabPanels>
                    <TabPanel width={"736px"}>
                        <PlantView3ColumnPanel dataLabels={StatusCardLabel} data={StatusCardData ? StatusCardData[currentInterval] : []} />
                    </TabPanel>
                    <TabPanel width={"736px"}>
                        <PlantView3ColumnPanel dataLabels={GridDataLabel} data={GridPlantCardData ? GridPlantCardData[currentInterval] : []} />
                    </TabPanel>
                    <TabPanel width={"736px"}>
                        <PlantView2ColumnPanel dataLabels={SolarDataLabel} data={SolarPlantCardData ? SolarPlantCardData[currentInterval] : []} />
                    </TabPanel>
                    <TabPanel width={"736px"}>
                        <PlantView3ColumnPanel dataLabels={DGDataLabel} data={DGPlantCardData ? DGPlantCardData[currentInterval] : []} />
                    </TabPanel>
                    <TabPanel width={"736px"}>
                        <PlantView3ColumnPanel dataLabels={BESSDataLabel} data={BESSPlantCardData ? BESSPlantCardData[currentInterval] : []} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default PlantCards

interface PlantViewPanelProps {
  data : string[];
  dataLabels : string[];
}

const PlantView3ColumnPanel:React.FC<PlantViewPanelProps> = ({dataLabels, data}) => {
    const color = useColorModeValue("#062D59", "#FFFFFF");
    return (
        <Box h={"100%"}>
                <Flex flexDirection={"row"} wrap={"wrap"} w={"100%"}>
                  {data.length > 0? data.map((_, index) => (
                    <Flex key={index} w={"230px"} direction={"column"} mb={10} alignItems={"start"} textAlign={"left"}>
                      <Text color={"#9BABBD"} fontWeight={400} fontSize={"16px"}>{dataLabels[index]}</Text>
                      <Text color={color} fontWeight={700} fontSize={"22px"}>{ data[index] && typeof data[index] == "string"? ((data[index]).includes("404 error") ? (data[index].replace("404 error", "") + "⚠️") : data[index]) : "0" }</Text>
                    </Flex>
                  )) : <Box></Box>}
                  {/* {data[0].map((_, index) => (
                    <Flex key={index} mr={"30px"} ml={"20px"} justifyContent={"space-between"} mb={2} alignItems={"start"} textAlign={"left"}>
                      <Text color={"#3D3D3D"} fontWeight={600} fontSize={12}>{dataLabels[index]}:</Text>
                      <Text color={"#000000"} fontWeight={700} fontSize={12}>{parseFloat(data[valueIndex][index]).toFixed(2) || 0}</Text>
                    </Flex>
                  ))} */}
                </Flex>
        </Box>
    );
};

const PlantView2ColumnPanel:React.FC<PlantViewPanelProps> = ({dataLabels, data}) => {
  const color = useColorModeValue("#062D59", "#FFFFFF");
  return (
      <Box h={"100%"}>
              <Flex flexDirection={"row"} wrap={"wrap"} w={"100%"}>
                {data.length > 0 ? data.map((_, index) => (
                  <Flex key={index} w={"343px"} direction={"column"} mb={10} alignItems={"start"} textAlign={"left"}>
                    <Text color={"#9BABBD"} fontWeight={400} fontSize={"16px"}>{dataLabels[index]}</Text>
                    <Text color={color} fontWeight={700} fontSize={"22px"}>{ data[index] && typeof data[index] == "string"? ((data[index]).includes("404 error") ? (data[index].replace("404 error", "") + "⚠️") : data[index]) : "0" }</Text>
                  </Flex>
                )) : <Box></Box>}
              </Flex>
      </Box>
  );
};