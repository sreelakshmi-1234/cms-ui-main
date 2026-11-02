import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  useColorModeValue,
  Flex,
  Button,
  RadioGroup,
  Radio,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import PlantTable from '../../widgets/tables/PlantTable';
import { h, html } from 'gridjs';
import UsePlantTable, { UsePlantAssetTable } from '../../../Services/Hooks/UsePlantTable';
import UseAssetSummary from '../../../Services/Hooks/UseAssetSummary';
import UsePlantTableSummary from '../../../Services/Hooks/UsePlantTableSummary';
import PlantTableAPI, { PlantAssetTableAPI } from '../../../api/plantTableAPI';
import { MdFullscreen } from 'react-icons/md';
import { ExpandIcon, SqeezIcon } from '../../../assets/Icons';

interface PlantTableLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  width: string[];
  height: string | string[];
}




const PlantTableLayout: React.FC<PlantTableLayoutProps> = ({ children, title, icon, width, height }) => {
  // *********** FULL SCREEN ***************
  const [isFullscreen, setIsFullscreen] = useState(false);

  // *************** View Selection *************
  const [view, setView] = useState('customer')

  const [PVPlantToggle, setPVPlantToggle] = useState<boolean>(false);

  // *************PV PLANT*****************
  const customerPVCol = [
    {
      name: "Customer Name",
      width: 150,
      formatter: (cell: any, row: any) => {
        return h('b', {
          style: { padding: "4px", marginLeft: "4px", borderLeft: `4px solid ${handleBorderColor(parseFloat(row.cells[2]?.data || -1))}`, cursor: "pointer" },
          onClick: () => handlePVClick(cell[0])
        }, cell[1])
      }
    }, { name: "Type", width: 100, sort: true }, { name: "PV Power kW", width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "PV Today kWh", width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "Availability %", width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }]
    
  const [PVColumn, setPVColumn] = useState<any[]>(customerPVCol);
  var PtextSearch = "PV";
  var PsearchTags = {
    calculation: "INV_Total_Power,AC Capacity,DG Make & Model,Country,PV_Total_Energy_kWh",
    // "inverter-1" : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Frequency_Hz"
  }
  let PVPlantData = ""
  // ***************PV***********
  var textSearch = "PV";
  var searchTags = {
    calculation: "INV_Total_Power,AC Capacity,DG Make & Model,Country,PV_Total_Energy_kWh",
    // "inverter-1" : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Frequency_Hz"
  }
  const PVData = UsePlantTable(searchTags, textSearch, "") as any;

  const [pv, setPV] = useState(PVData);
  useEffect(() => {
    if (PVData) {

      setPV(PVData)
    }
  }, [PVData]);

  const PlantPVCol = [
    {
      name: "Plant Name",
      width: 150,
      formatter: (cell: any, row: any) => {
        return h('b', {
          style: { padding: "4px", marginLeft: "4px", borderLeft: `4px solid ${handleBorderColor(parseFloat(row.cells[5]?.data || -1))}`, cursor: "pointer" },
          onClick: () => handlePVClick(cell[0])
        }, cell[1])
      }
    }, { name: "Type", width: 100, sort: true }, { name: "Energy System", width: 130 }, { name: "Capacity", width: 100 }, { name: "Country", width: 100 }, { name: "PV Power kW", width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "Irradiation", width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "PV Today kWh", width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "PR", width: 70, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "Availability %", width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell: "NA" }]

    const LimittedPlantPvCol = [
      {
        name: "Plant Name",
        width: 150,
        formatter: (cell: any, row: any) => {
          return h('b', {
            style: { padding: "4px", marginLeft: "4px", borderLeft: `4px solid ${handleBorderColor(parseFloat(row.cells[5]?.data || -1))}`, cursor: "pointer" },
            onClick: () => handlePVClick(cell[0])
          }, cell[1])
        }
      }, { name: "Type", width: 100, sort: true }, { name: "Energy System", width: 130 }, { name: "Capacity", width: 100 }, { name: "Country", width: 100 }, { name: "PV Power kW", width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }]

  const handlePVClick = async (id: string) => {
    PVPlantData = await PlantTableAPI(PsearchTags, PtextSearch, id);
    if (PVPlantData) {

      setPV(PVPlantData);
      setPVPlantToggle(true);
    }
  }

  function backToPVCustomer() {
    if(isFullscreen) {
      setPVColumn(PlantPVCol);
    } else {
      setPVColumn(LimittedPlantPvCol);
    }
    setPV(PVData);
    setPVPlantToggle(false)
  }


  // **************Hybrid***************\
  const customerHybridCol = [
    {
      name: "Customer Name",
      width: 150,
      formatter: (cell: any, row: any) => {
        return h('b', {
          style: { padding: "4px", marginLeft: "4px", borderLeft: `4px solid ${handleBorderColor(parseFloat(row.cells[2]?.data || -1))}`, cursor: "pointer" },
          onClick: () => handleHybridClick(cell[0])
        }, cell[1])
      }
    }, { name: "Type", width: 100, sort: true }, { name: "PV Power kW", width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "PV Today kWh", width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "BESS Power kW", width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "BESS Discharge kWh", width: 160, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "DG Power kW", width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "DG Today kWh", width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "PR   ", width: 70, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "Availability %", width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }]
  
  const LimittedCustomerHybridCol = [
    {
      name: "Customer Name",
      width: 150,
      formatter: (cell: any, row: any) => {
        return h('b', {
          style: { padding: "4px", marginLeft: "4px", borderLeft: `4px solid ${handleBorderColor(parseFloat(row.cells[2]?.data || -1))}`, cursor: "pointer" },
          onClick: () => handleHybridClick(cell[0])
        }, cell[1])
      }
    }, { name: "Type", width: 100, sort: true }, { name: "PV Power kW", width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "PV Today kWh", width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: "BESS Power kW", width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }]
  
  const [HybridColumn, setHybridColumn] = useState<any[]>(customerHybridCol);

  var CHtextSearch = "Hybrid";
  var CHsearchTags = {
    calculation: "INV_Total_Power,PV_Total_Energy_kWh,PCS_Total_Power,PCS_Total_Discharge_kWh,DG_Total_Power,DG_Total_Energy,pr,Total_Inverter_Availability",
    // "inverter-1" : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Frequency_Hz" 
  }
  const HybridData = UsePlantTable(CHsearchTags, CHtextSearch, "") as any;
  const [hybrid, setHybrid] = useState(HybridData);

  useEffect(() => {
    if (HybridData) {
      setHybrid(HybridData);
    }
  }, [HybridData])

  // **************Plant Hybrid***************
  const [HybridPlantToggle, setHybridPlantToggle] = useState<boolean>(false)
  var HtextSearch = "Hybrid";
  var HsearchTags = {
    calculation: "INV_Total_Power,PV_Total_Energy_kWh,PCS_Total_Power,PCS_Total_Discharge_kWh,DG_Total_Power,DG_Total_Energy,irradiation,pr,Total_Inverter_Availability,AC Capacity,DG Make & Model,Country",
    // "inverter-1" : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Frequency_Hz" 
  }
  let HybridPlantData = ""
  const plantHybridCol = [
    {
      name: html(`<b title="Plant Name">Plant Name</b>`),
      width: 150,
      formatter: (cell: any, row: any) => {
        const borderColor = row.cells && row.cells[2] && row.cells[2].data
          ? handleBorderColor(parseFloat(row.cells[2].data))
          : "#837F97"; // Default color if data is missing
      
        return h('b', {
          style: { padding: "4px", marginLeft: "4px", borderLeft: `4px solid ${borderColor}`, cursor: "pointer" },
          onClick: () => handleHybridClick(cell[0])
        }, cell[1]);
      }
    }, { name: html(`<b title="Type">Type</b>`), width: 70, sort: true }, 
    { name: html(`<b title="PV Power kW">PV Power kW</b>`), width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="PV Today kWh">PV Today kWh</b>`), width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="BESS Power kW">BESS Power kW</b>`), width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="BESS Discharge kWh">BESS Discharge kWh</b>`), width: 160, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="DG Power kW">DG Power kW</b>`), width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="DG Today kWh">DG Today kWh</b>`), width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="Irradiation">Irradiation</b>`), width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="PR">PR   </b>`), width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, { name: html(`<b title="Availability %">Availability %</b>`), width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }]
    /*    rejected column
    { name: html(`<b title="Energy System">Energy System</b>`), width: 100 },
    {
      name: html(`<b title="PV Capacity">PV Capacity</b>`), width: 120,
      formatter: (cell: any, row: any) =>
        html(`${row.cells[3].data ? row.cells[3].data : "NA"}`)
    },
    { name: html(`<b title="BESS Capacity">BESS Capacity</b>`), width: 120, formatter: (cell: any, row: any) => html(`${cell ? cell : "NA"}`) }, { name: html(`<b title="DG Capacity">DG Capacity</b>`), width: 120, formatter: (cell: any, row: any) => html(`${cell ? cell : "NA"}`) }, { name: html(`<b title="Country">Country</b>`), width: 100 },
    */
  // SHORT VIEW
  const plantHybridColShortView = [
    {
      name: html(`<b title="Plant Name">Plant Name</b>`),
      width: 170,
      formatter: (cell: any, row: any) => {
        const borderColor = row.cells && row.cells[2] && row.cells[2].data
          ? handleBorderColor(parseFloat(row.cells[2].data))
          : "#837F97"; // Default color if data is missing
      
        return h('b', {
          style: { padding: "4px", marginLeft: "4px", borderLeft: `4px solid ${borderColor}`, cursor: "pointer" },
          onClick: () => handleHybridClick(cell[0])
        }, cell[1]);
      }
    }, { name: html(`<b title="Type">Type</b>`), width: 70, sort: true },
    { name: html(`<b title="PV Power kW">PV Power kW</b>`), width: 100, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" },
    { name: html(`<b title="PV Today kWh">PV Today kWh</b>`), width: 130, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, 
    { name: html(`<b title="BESS Power kW">BESS Power kW</b>`), width: 120, formatter: (cell: any) => cell == "-1" ? "null" : cell ? cell : "NA" }, 
    ]

  // [
  //   {
  //     name : html(`<b title="Plant Name">Plant Name</b>`),
  //     width : 170, 
  //     formatter: (cell : any, row: any) => {
  //         return h('b', {
  //         style : {padding: "4px", marginLeft:"4px", borderLeft:`4px solid ${handleBorderColor(parseFloat(row.cells[7].data))}`, cursor:  "pointer"},
  //         onClick : () => handleHybridClick(cell[0])
  //       }, cell[1])
  //     }
  //   },
  //   {name : html(`<b title="Type">Type</b>`), width : 70, sort : true},
  //   {name : html(`<b title="Energy System">Energy System</b>`), width : 100},
  //   {name : html(`<b title="Country">Country</b>`), width : 100, formatter : (cell : any, row : any) => cell},
  //   {name : html(`<b title="PV Power">PV Power</b>`), width : 100, formatter : (cell : any, row : any) => cell == "-1" ? "NA" : cell},
  //   {name : html(`<b title="Irradiation">Irradiation</b>`), width : 100, formatter : (cell : any, row : any) => cell},
  //   {name : html(`<b title="PV Today kWh">PV Today kWh</b>`), width : 130, formatter : (cell : any, row : any) => cell}
  // ]
  const handleHybridClick = async (id: string) => {
    if (isFullscreen) {
      setHybridColumn(plantHybridCol);
    } else {
      setHybridColumn(plantHybridColShortView);
    }
    HybridPlantData = await PlantTableAPI(HsearchTags, HtextSearch, id) as any;
    if (HybridPlantData) {
      setHybrid(HybridPlantData)
      setHybridPlantToggle(true);
    }
  }
  function backToHybridCustomer() {
    if(isFullscreen) {
      setHybridColumn(customerHybridCol);
      setHybrid(HybridData);
      setHybridPlantToggle(false);
    } else {
      setHybridColumn(LimittedCustomerHybridCol);
      setHybrid(HybridData);
      setHybridPlantToggle(false);
    }
  };
  const PVPlantAssetData = UsePlantAssetTable(PsearchTags, PtextSearch);
  const HybridPlantAssetData = UsePlantAssetTable(HsearchTags, HtextSearch);


  // ***************** ASSET GRP PLANT Fetch ***************
  const TableSetUp = async () => {
    // console.log(view);
    switch (view) {
      case "customer":
        if (isFullscreen) {
          setPVColumn(customerPVCol);
          setHybridColumn(customerHybridCol);
          setPV(PVData);
          setHybrid(HybridData);
        } else {
          setPVColumn(customerPVCol);
          setHybridColumn(LimittedCustomerHybridCol);
          setPV(PVData);
          setHybrid(HybridData);
        }
        break;
      case "plant":
        if (isFullscreen) {
          setPVColumn(PlantPVCol);
          setHybridColumn(plantHybridCol);
          if (PVPlantAssetData && PVPlantAssetData.length > 0) {
            setPV(PVPlantAssetData);
          } else {
            console.warn("PVPlantAssetData is empty or undefined");
          }
          if (HybridPlantAssetData && HybridPlantAssetData.length > 0) {
            setHybrid(HybridPlantAssetData);
          } else {
            console.warn("HybridPlantAssetData is empty or undefined");
          }
        } else {
          setPVColumn(LimittedPlantPvCol);
          setHybridColumn(plantHybridColShortView);
          if (PVPlantAssetData && PVPlantAssetData.length > 0) {
            setPV(PVPlantAssetData);
          } else {
            console.warn("PVPlantAssetData is empty or undefined");
          }
          if (HybridPlantAssetData && HybridPlantAssetData.length > 0) {
            setHybrid(HybridPlantAssetData);
          } else {
            console.warn("HybridPlantAssetData is empty or undefined");
          }
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    TableSetUp();
  }, [view, isFullscreen]);

  // *****************Summary*************
  var textSearchSummary = ["", "PV", "Wind", "Hybrid"];
  var searchTagsSummary = {
    calculation: "INV_Total_Power"
  }
  const PlantTableSummaryData = UsePlantTableSummary(searchTagsSummary, textSearchSummary) || [];

  const stateNumber: number[] = PlantTableSummaryData[0] || [0, 0, 0] as number[];
  const PVSummary = PlantTableSummaryData[1] || [0, 0, 0, 0] as number[];
  const WindSummary = PlantTableSummaryData[2] || [0, 0, 0, 0] as number[];
  const HybridSummary = PlantTableSummaryData[3] || [0, 0, 0, 0] as number[];


  const stateColor = ["#13CD26", "#CB0511", "#837F97"];

  const tabList = ["PV", "Wind", "Hybrid"];
  const dotColor = ["#0086CC", "#F8931F", "#704199"] // "#7EC800"


  const handleBorderColor = (data: number) => {
    if (data > 0) {
      return "#13CD26";
    } else if (data == 0) {
      return "#CB0511";
    } else {
      return "#837F97";
    }
  }


  // *****************Full Screen**********

  const tableRef = useRef(null);
  const [paginationLimit, setPaginationLimit] = useState<number>(10);

  // console.log(apiData)

  const handleFullScreen = () => {
    if (tableRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        (tableRef.current as HTMLElement)?.requestFullscreen();
        setIsFullscreen(true);
        setPaginationLimit(20); // Increase pagination limit in fullscreen mode
      }
    }
  };

  useEffect(() => {

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setPaginationLimit(10);
        setIsFullscreen(false); // Exited fullscreen
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  return (
    <Box
      ref={tableRef}
      w={width}
      h={height}
      borderRadius="0px" // 5px
      bg={useColorModeValue('white', '#131512')}
      py={3}
      px={2}
      mt={5}
      // boxShadow="md"
      overflow={"hidden"}
    >

      <Tabs isFitted 
        variant='unstyled'
      >
        <Flex align={"center"} flexDir={"row"} justifyContent={"space-between"}>
          <Flex align={"center"}>
            <HStack mr={5}>
              {/* <Icon as={icon} boxSize={5} color={useColorModeValue('#004F86', 'white')}/> */}
              <Text
                fontSize={"18px"}
                fontWeight={600}
                color={useColorModeValue('#062D59', 'white')}
                pl={2}
              >
                {title}
              </Text>
            </HStack>
            <TabList
              border={"1px solid #DFDFDF"}
              color={useColorModeValue('#062D59', 'white')}
            >
              {tabList.map((value, index) => (
                <Tab
                  mx={0}
                  px={1}
                  h={"27px"}
                  fontSize={"12px"}
                  _selected={{ bg: "#8CC73B" }}
                >
                  {/* <span 
                          style={{width:"10px",height:"10px",backgroundColor:dotColor[index], display:"flex", borderRadius:"50%", marginRight:"7px"}}
                          ></span> */}
                  <Text>{value}</Text> &nbsp; <sub><b style={{ color: "red" }}>{PlantTableSummaryData[index + 1]?.[2] || 0}</b>/{PlantTableSummaryData[index + 1]?.[0] || 0}</sub>
                </Tab>
              ))}

            </TabList>
            {/* <Flex ml={4} bg={"#EBEBEB"} borderRadius={"15%"} px={2}>
              {stateNumber.map((value, index) => (
                <HStack>
                  <span
                    style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: stateColor[index], color: "#5A5A5A" }}
                  ></span>
                  <Text ml={-1} mr={2}>{value}</Text>
                </HStack>
              ))}
            </Flex> */}
            <Flex ml={4} mr={4}>
              <RadioGroup onChange={setView} value={view} size={"xs"} sx={{border : "1px solid #DFDFDF", padding : "5px"}}>
                <Stack direction='row'>
                  <Radio  sx={{_checked : {padding : "3px", bg : "#8CC73B", borderColor : "#8CC73B"}, border : "1px solid #DFDFDF", padding : "3px"}} value='customer'><Text fontSize={"12px"}>Customer view</Text></Radio>
                  <Radio sx={{_checked : {padding : "3px", bg : "#8CC73B", borderColor : "#8CC73B"}, border : "1px solid #DFDFDF", padding : "3px"}} value='plant'><Text fontSize={"12px"}>Plant view</Text></Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </Flex>
          <Flex mr={4}>
            {/* Fullscreen Icon */}
            <IconButton
              aria-label="Fullscreen"
              icon={isFullscreen ? <SqeezIcon/> : <ExpandIcon />}
              onClick={handleFullScreen}
              variant="ghost"
              size={"xs"}
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
          </Flex>
        </Flex>
        <TabPanels>
          <TabPanel px={0} overflow={"hidden"}>
            {PVPlantToggle &&
              <Button mb={2} onClick={backToPVCustomer} >Back</Button>}
            <PlantTable
              key={1}
              fullScreen={false}
              width='100%'
              column={PVColumn}
              apiData={pv || []}
              paginationLimitProps={5}
            />
          </TabPanel>
          <TabPanel px={0} key={2} overflow={"hidden"}>
            <PlantTable
              search={true}
              autoWidth={false}
              width='100%'
              fullScreen={false}
              paginationLimitProps={5}
            />
          </TabPanel>
          <TabPanel px={0} key={3} overflow={"hidden"}>
            {HybridPlantToggle &&
              <Button onClick={backToHybridCustomer} mb={2}>Back</Button>}
            <PlantTable
              column={HybridColumn}
              apiData={hybrid || []}
              fullScreen={false}
              paginationLimitProps={5}
              width='100%'
              autoWidth={true}
              // customColumn={true}
              // customColumnCount={5}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Icon 
        as={MdFullscreen}
        boxSize={5} 
        float={"right"} 
        pos={"relative"} 
        bottom={"32px"} 
        mt={-5}
        onClick={handleFullScreen}
        _fullScreen={{
          bottom : "35px"
        }}
        cursor={"pointer"}
        /> */}
    </Box>
  );
};

export default PlantTableLayout;
