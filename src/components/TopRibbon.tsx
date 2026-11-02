import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Grid, GridItem, HStack, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Plant, Fieldset_Meter, Fieldset_Temp } from "./widgets/FieldsetContent";
import UseBatteryStatus from "../Services/Hooks/Battery/UseBatteryStatus";
import { EnlargeWidgetSize } from "../Services/EnlargeWidget";
import { DeviceIcon, MeterIcon, ModeIcon, PlantIcon, PowerIcon, TempIcon } from "../assets/TopRibbonIcons";
import { useTimeHandle } from "../Services/TimeWindowSetting";
import UseInverterStatus from "../Services/Hooks/UseInverterStatus";
import UseLatestValueOfSameKeyMultipleDevice from "../Services/Hooks/UseLatestValueOfSameKeyMultipleDevice";
import { FaClock, FaBolt, FaThermometerHalf } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PiSunLight } from "react-icons/pi";
import { MdBattery3Bar } from "react-icons/md";
import { CiCloudOn } from "react-icons/ci";
import { energyUnitScaling } from "../Services/DynamicUnitScaling/EnergyUnitScaling";


const TopRibbon = () => {

    const searchAC = {
        devName : "Calculation",
        keys : "CUF_AC"
    };
    const ACData = UseBatteryStatus(searchAC) || [0];

    const searchDC = {
        devName : "Calculation",
        keys : "CUF_DC"
    };
    const DCData = UseBatteryStatus(searchDC) || [0];

    return(
        <Box
                display={{base : "none", sm : "none", md : "none", lg : "none", xl : "block", '2xl' : "block"}}
                height={EnlargeWidgetSize(80) + "px"}
            >
                <Grid
                    h={["300px","200px","200px","130px","60px","60px"]}
                    templateRows={["repeat(6, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(2, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)"]}
                    templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(6, 1fr)","repeat(6, 1fr)"]}
                    gap={[5,5,5,1,1]}
                >
                    <GridItem w={"auto"} fontSize={[7, 7, 7, 9, 12, (EnlargeWidgetSize(12) * 1.092) - 1.5 ]} h={59}>
                        <Fieldset_kW52860
                            CUF_AC={ACData[0] ? ACData[0] : ""}
                            CUF_DC={DCData[0] ? DCData[0] : ""}
                            mod_temp={0}
                            GHI={0}
                            POA={0}
                            Tilt={0}
                            PR_Actual={0}
                        />
                    </GridItem>
                    <GridItem w={"auto"} fontSize={[7, 7, 5, 7, 12, EnlargeWidgetSize(12)]} h={58}>
                        <Fieldset_Mode />
                    </GridItem>
                    <GridItem w={"auto"} fontSize={[7, 7, 5, 10, 12, EnlargeWidgetSize(12)]} h={59}>
                        <Fieldset_Plant />
                    </GridItem>
                    <GridItem w={"auto"} fontSize={[7, 7, 7, 10, 12, EnlargeWidgetSize(12)]} h={58}>
                        <Fieldset_Meter />
                    </GridItem>
                    <GridItem w={"auto"} fontSize={[7, 7, 7, 9, 12, EnlargeWidgetSize(12)]} h={58}>
                        <Fieldset_Temp />
                    </GridItem>
                    <GridItem w={"auto"} fontSize={[7, 7, 7, 10, 12, (EnlargeWidgetSize(12) * 0.85) + 1.5]}>
                        <Fieldset_Devices />
                    </GridItem>
                </Grid>
            </Box>
    );
};

export default TopRibbon;


const Solar = () => {
    // PV Power
    const searchPower = {
        devName : "Calculation",
        keys : "INV_Total_Power"
    };
    const PowerData = UseBatteryStatus(searchPower) || [0];

    // CUF
    const searchAC = {
        devName : "Calculation",
        keys : "CUF_AC"
    };
    const ACData = UseBatteryStatus(searchAC) || [0];

    const searchDC = {
        devName : "Calculation",
        keys : "CUF_DC"
    };
    const DCData = UseBatteryStatus(searchDC) || [0];

    const searchPoa = {
        devName : "WMS.WMS-1",
        keys : "Inst_POA"
    };
    const poaData = UseBatteryStatus(searchPoa) || [0];

    var searchAmp = {
        devName : "WMS-1",
        keys : "Inst_GHI"
    }
    const LiveGHI = UseBatteryStatus(searchAmp) || [0];

    var searchCumPOA = {
        devName : "WMS-1",
        keys : "Cum_POA_Kwhm2"
    }
    const LiveCumPOA = UseBatteryStatus(searchCumPOA) || [0];

    var searchPPkW = {
        devName: "WMS-1",
        keys: "Module_temp",
    }
    const LiveModTemp = UseBatteryStatus(searchPPkW) || [0];

    var searchPR = {
        devName: "calculation",
        keys: "PR_Percent",
    }
    const PRPercent = UseBatteryStatus(searchPR) || [0];
    return (
        <Flex padding={"20px"} flexDir={"column"}>
            <HStack mb={"15px"}>
                <PowerIcon />
                <Text color={"#062D59"} fontSize={"18px"} fontWeight={600}>{PowerData[0]} kW</Text>
            </HStack>
            <Flex justify={"space-between"} fontSize={"16px"} fontWeight={400} color={"#062D59"}>
                <HStack borderRight={"1px solid rgba(6, 45, 89, 0.1)"} pr={"10px"}>
                    <VStack>
                        <Text opacity={0.6} fontSize={"14px"}>GHI/POA <Text fontSize={"12px"}>{LiveGHI[0]}/{poaData[0]}</Text></Text>
                        <Text opacity={1}>W / m2</Text>
                    </VStack>
                </HStack>
                <HStack borderRight={"1px solid rgba(6, 45, 89, 0.1)"} pr={"10px"}>
                    <VStack>
                        <Text opacity={0.6} >Tilt Insolation/Day</Text>
                        <Text opacity={1}>{LiveCumPOA[0]} kWh / m2</Text>
                    </VStack>
                </HStack>
                <HStack borderRight={"1px solid rgba(6, 45, 89, 0.1)"} pr={"10px"}>
                    <VStack>
                        <Text opacity={0.6} >CUF</Text>
                        <Text opacity={1}>AC/DC {ACData}%/{DCData}%</Text>
                    </VStack>
                </HStack>
                <HStack borderRight={"1px solid rgba(6, 45, 89, 0.1)"} pr={"10px"}>
                    <VStack>
                        <Text opacity={0.6} >Module Temp.</Text>
                        <Text opacity={1}>{LiveModTemp[0]}°</Text>
                    </VStack>
                </HStack>
                <HStack>
                    <VStack>
                        <Text opacity={0.6} >PR</Text>
                        <Text opacity={1}>Actual / Estimated {PRPercent[0]}% / 0%</Text>
                    </VStack>
                </HStack>
            </Flex>
        </Flex>
    );
};

const Mode = () => {
    // *************************PCS Status ******************
    const {
        timeWindow: timeWindowPCSStatus,
        handleTimeWindowChange: PCSStatusChange,
        handleReset: PCSStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObj = {
        devName : "pcs",
        keys : "ESS_PCSOperation",
    };
    
    const PCSStatusData = UseInverterStatus(searchObj, timeWindowPCSStatus) || [0, 0, 0];

    // *************************PV Status ******************
    const {
        timeWindow: timeWindowInverterStatus,
        handleTimeWindowChange: PVStatusChange,
        handleReset: PVStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObjPCS = {
        devName : "Inverter",
        keys : "AC_Active_Power_Watt",
    };
    
    const PVStatusData = UseInverterStatus(searchObjPCS, timeWindowInverterStatus) || [0, 0, 0];

    const gen = PCSStatusData[0] + PVStatusData[0];
    const Commn = PCSStatusData[2] + PVStatusData[2];

    const searchTripData = [{Inverter : "Trip_Mode_Inv"}, {PCS : "Trip_Mode_Inv"}];
    const TripData = UseLatestValueOfSameKeyMultipleDevice(searchTripData) as any;
    const tripCount = TripData?.flat(0).reduce((acc : number, curr : number) => acc + curr);
    return (
        <Flex padding={"20px"} flexDir={"column"} color={"#062D59"} width={"100%"}>
            <HStack mb={'15px'}>
                <ModeIcon />
                <Text fontWeight={600} fontSize={"18px"}>Mode</Text>
            </HStack>
            <HStack flexDir={'row'} justifyContent={"space-between"} flexWrap={'wrap'} width={"100%"}>
                <HStack pr={3}>
                    <Box border={"1px solid #062D59"} w={"15px"} h={"15px"} borderRadius={"15px"}>
                        <center>
                            <Box bg={gen > 0 ? "#062D59" : "transparent"} w={"9px"} h={"9px"} mt={"2px"} borderRadius={"50%"}></Box>
                        </center>
                    </Box>
                    <Text>Gen</Text>
                </HStack>
                <HStack>
                    <Box border={"1px solid #062D59"} w={"15px"} h={"15px"} borderRadius={"15px"}>
                        <center>
                            <Box bg={tripCount > 0 ? "#062D59" : "transparent"} w={"9px"} h={"9px"} mt={"2px"} borderRadius={"50%"}></Box>
                        </center>
                    </Box>
                    <Text>Trip</Text>
                </HStack>
            </HStack>
            <HStack flexDir={'row'} justifyContent={"space-between"} flexWrap={'wrap'} width={"100%"}>
                <HStack pr={3}>
                    <Box border={"1px solid #062D59"} w={"15px"} h={"15px"} borderRadius={"15px"}>
                        <center>
                            <Box bg={gen == 0 ? "#062D59" : "transparent"} w={"9px"} h={"9px"} mt={"2px"} borderRadius={"50%"}></Box>
                        </center>
                    </Box>
                    <Text>Stop</Text>
                </HStack>
                <HStack>
                    <Box border={"1px solid #062D59"} w={"15px"} h={"15px"} borderRadius={"15px"}>
                        <center>
                            <Box bg={Commn > 0 ? "#FF4848" : "#062D59"} w={"9px"} h={"9px"} mt={"2px"} borderRadius={"50%"}></Box>
                        </center>
                    </Box>
                    <Text>Comm.</Text>
                </HStack>
            </HStack>
        </Flex>
    );
};

const Plant = () => {
    const searchPlant = {
        devName : "Calculation",
        keys : "Load_Power"
    };
    const searchfreq = {
        devName : "Grid Meter-1",
        keys : "Bus_B_frequency_L1"
    };
    const PlantData = UseBatteryStatus(searchPlant) || ['NA'];
    const FreqData = UseBatteryStatus(searchfreq) || ['NA'];
    return (
        <Flex padding={"20px"} flexDir={"column"} color={"#062D59"}>
            <HStack mb={'15px'}>
                <PlantIcon />
                <Text fontWeight={600} fontSize={"18px"}>Plant</Text>
            </HStack>
            <VStack fontWeight={400} alignItems={"flex-start"}>
                <Text>P - {PlantData} kW</Text>
                <Text>F - {FreqData[0]} Hz</Text>
            </VStack>
        </Flex>
    );
};

const Meter = () => {
    const searchTotalEnergy = {
        devName : "Calculation",
        keys : "PV_Total_Energy_kWh"
    };
    const searchfreq = {
        devName : "Grid Meter-1",
        keys : "Bus_B_frequency_L1"
    };
    const TotalEnergyData = UseBatteryStatus(searchTotalEnergy) || [0];
    const FreqData = UseBatteryStatus(searchfreq) || ['NA'];

    return (
        <Flex padding={"20px"} flexDir={"column"} color={"#062D59"}>
            <HStack mb={'15px'}>
                <MeterIcon />
                <Text fontWeight={600} fontSize={"18px"}>Meter</Text>
            </HStack>
            <VStack fontWeight={400} alignItems={"flex-start"}>
                <Text>T.E - {(TotalEnergyData[0] / 1000).toFixed(2)} MWh</Text>
                <Text>F - {FreqData[0]} Hz</Text>
            </VStack>
        </Flex>
    );
};

const Temp = () => {
    return (
        <Flex padding={"20px"} flexDir={"column"} color={"#062D59"}>
            <HStack mb={'15px'}>
                <TempIcon />
                <Text fontWeight={600} fontSize={"18px"}>Temp</Text>
            </HStack>
            <VStack fontWeight={400} alignItems={"flex-start"}>
                <Text>Max - 0.00° C</Text>
                <Text>Avg - 0.00° C</Text>
            </VStack>
        </Flex>
    );
};

const Device = () => {
    // *************************PCS Status ******************
    const {
        timeWindow: timeWindowInverterStatus,
        handleTimeWindowChange: PCSStatusChange,
        handleReset: PCSStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObj = {
        devName : "inverter",
        keys : "AC_Active_Power_Watt",
    };
    
    const PCSStatusData = UseInverterStatus(searchObj, timeWindowInverterStatus) || [];

    const {
        timeWindow: timeWindowInverterStatusSMB,
        handleTimeWindowChange: SMBStatusChange,
        handleReset: SMBStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObjSMB = {
        devName : "smb",
        keys : "Total_Amps",
    };
    
    const SMBStatusData = UseInverterStatus(searchObjSMB, timeWindowInverterStatusSMB) || [];
    return (
        <Flex padding={"20px"} flexDir={"column"} color={"#062D59"}>
            <HStack mb={'15px'}>
                <DeviceIcon />
                <Text fontWeight={600} fontSize={"18px"}>Device</Text>
            </HStack>
            <Flex mb={"30px"}>
                <VStack fontWeight={400} alignItems={"flex-start"} mr={8}>
                    <Text>PCS</Text>
                    <HStack spacing={3}>
                        <Box width={"24px"} height={"24px"} bg={"#9FFFDF"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>{(PCSStatusData[0] + PCSStatusData[1] + PCSStatusData[2]) || 0}</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FFE5A5"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>{ PCSStatusData[0] || 0 }</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FF9F9F"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>{ PCSStatusData[2] || 0 }</Text>
                        </Box>
                    </HStack>
                </VStack>
                <VStack fontWeight={400} alignItems={"flex-start"}>
                    <Text>IoT</Text>
                    <HStack spacing={3}>
                        <Box width={"24px"} height={"24px"} bg={"#9FFFDF"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>0</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FFE5A5"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>0</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FF9F9F"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>0</Text>
                        </Box>
                    </HStack>
                </VStack>
            </Flex>
            <Flex mb={"40px"}>
                <VStack fontWeight={400} alignItems={"flex-start"} mr={8}>
                    <Text>Batteries</Text>
                    <HStack spacing={3}>
                        <Box width={"24px"} height={"24px"} bg={"#9FFFDF"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>0</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FFE5A5"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>0</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FF9F9F"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>0</Text>
                        </Box>
                    </HStack>
                </VStack>
                <VStack fontWeight={400} alignItems={"flex-start"}>
                <Text>SMBs</Text>
                    <HStack spacing={3}>
                        <Box width={"24px"} height={"24px"} bg={"#9FFFDF"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>{(SMBStatusData[0] + SMBStatusData[1] + SMBStatusData[2]) || 0}</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FFE5A5"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>{ SMBStatusData[0] || 0 }</Text>
                        </Box>
                        <Box width={"24px"} height={"24px"} bg={"#FF9F9F"} borderRadius={"50%"} textAlign={"center"} >
                            <Text fontWeight={500}>{ SMBStatusData[2] || 0 }</Text>
                        </Box>
                    </HStack>
                </VStack>
            </Flex>
            <Flex gap={"11px"} fontSize={"12px"} fontWeight={400}>
                <HStack>
                    <Box bg={"#9FFFDF"} width={"10px"} height={"10px"} borderRadius={"50%"}></Box>
                    <Text>Total</Text>
                </HStack>
                <HStack>
                    <Box bg={"#FFE5A5"} width={"10px"} height={"10px"} borderRadius={"50%"}></Box>
                    <Text>Working</Text>
                </HStack>
                <HStack>
                    <Box bg={"#FF9F9F"} width={"10px"} height={"10px"} borderRadius={"50%"}></Box>
                    <Text>Non Comm.</Text>
                </HStack>
            </Flex>
        </Flex>
    );
};

export const SecondNewTopRibbon = () => {
    const searchPower = {
        devName : "Calculation",
        keys : "INV_Total_Power"
    };
    const PowerData = UseBatteryStatus(searchPower) || [0];
    const color = useColorModeValue('#062D59', "#FFFFFF")
    return ( 
        <Box 
            width={"1816px"} 
            m={"auto"} 
            p={"20px"} 
            maxH={"366px"} 
            bg={useColorModeValue("#fff", "#131512")} 
            color={'#062D59'}
        >
            <Accordion allowToggle border={"transparent"} >
                <AccordionItem>
                    {({ isExpanded }) => (
                    <>
                        <Flex justifyContent={"space-between"} flexDir={"row"} width={"full"} mb={3} color={color} >
                            <Box fontSize={"18px"} fontWeight={600}>
                                <Text>Plant overview</Text>
                            </Box>
                            <Box>
                                <AccordionButton _hover={{bg : "transparent"}} p={0}>
                                        {isExpanded ? (
                                            <Flex align={"center"}>
                                                <Text fontSize={"12px"} ml={1}>View less</Text>
                                                <AccordionIcon />
                                            </Flex>

                                        ) : (
                                            <Flex align={"center"}>
                                                <Text fontSize={"12px"} ml={1}>View more</Text>
                                                <AccordionIcon />
                                            </Flex>
                                        )}
                                </AccordionButton>
                            </Box>
                        </Flex>

                        <SimpleGrid 
                            transition={"display 1s ease-in-out, opacity 1s ease-in-out"}
                            minChildWidth={"170px"} 
                            // maxHeight={isExpanded ? "0px" : "180px"} 
                            fontWeight={600} gap={4} 
                            // opacity={isExpanded? 0 : 1}
                            display={isExpanded ? "none" : "grid" } 
                        >    
                            <HStack justifyContent={"space-between"} px={3} h={"50px"} bg={"#FFE2A7"}>
                                <Text fontSize={"18px"}>{PowerData[0]} kW</Text>
                                <PowerIcon />
                            </HStack>
                            <HStack justifyContent={"space-between"} px={3} h={"50px"} bg={"#CDCEFF"}>
                                <Text fontSize={"18px"}>Mode</Text>
                                <ModeIcon />
                            </HStack>
                            <HStack justifyContent={"space-between"} px={3} h={"50px"} bg={"#AFFFCD"}>
                                <Text fontSize={"18px"}>Plant</Text>
                                <PlantIcon />
                            </HStack>
                            <HStack justifyContent={"space-between"} px={3} h={"50px"} bg={"#C6FFF4"}>
                                <Text fontSize={"18px"}>Meter</Text>
                                <MeterIcon />
                            </HStack>
                            <HStack justifyContent={"space-between"} px={3} h={"50px"} bg={"#FFC99A"}>
                                <Text fontSize={"18px"}>Temp</Text>
                                <TempIcon />
                            </HStack>
                            <HStack justifyContent={"space-between"} px={3} h={"50px"} bg={"#9CCCFF"}>
                                <Text fontSize={"18px"}>Devices</Text>
                                <DeviceIcon />
                            </HStack>
                        </SimpleGrid>

                        <AccordionPanel 
                            p={0}
                            transition={"transform 2s ease-out, opacity 2s ease-out"}
                            transform ={ isExpanded ? 'translateX(0)' : 'translateX(100%)'}
                            opacity = {isExpanded ? 1 : 0}
                        >
                            <Grid
                                h={"284px"}
                                templateColumns={'repeat(4, 1fr)'}
                                templateRows={"repeat(2, 1fr)"}
                                gap={4}
                            >
                                <GridItem colSpan={3} rowSpan={2}>
                                    <Grid
                                        h="100%"
                                        templateColumns={'repeat(4, 1fr)'}
                                        templateRows={'repeat(2, 1fr)'}
                                        gap={4}
                                    >
                                        <GridItem colSpan={4} rowSpan={1} bg={"#FFE2A7"}><Solar /></GridItem>
                                        <GridItem colSpan={1} rowSpan={1} bg={"#CDCEFF"}><Mode /></GridItem>
                                        <GridItem colSpan={1} rowSpan={1} bg={"#AFFFCD"}><Plant /></GridItem>
                                        <GridItem colSpan={1} rowSpan={1} bg={"#C6FFF4"}><Meter /></GridItem>
                                        <GridItem colSpan={1} rowSpan={1} bg={"#FFC99A"}><Temp /></GridItem>
                                    </Grid>
                                    </GridItem>
                                <GridItem colSpan={1} rowSpan={2}  bg={"#9CCCFF"}><Device /></GridItem>
                            </Grid>
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
            </Accordion>
        </Box>
    );
};



// NEW NEW TOP RIBBON

const PowerBoltIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={FaBolt} fontSize={`${size}px`} color="#FFB636" />
);

const OrangeSunIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={PiSunLight} fontSize={`${size}px`} color="#FF8C00" />
);

const RedPowerBoltIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={FaBolt} fontSize={`${size}px`} color="#FF0000" />
);

const SkyBlueClockIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={FaClock} fontSize={`${size}px`} color="#87CEEB" />
);

const LightBlueTrendIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={FaArrowTrendUp} fontSize={`${size}px`} color="#ADD8E6" />
);

const GrayCloudIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={CiCloudOn} fontSize={`${size}px`} color="gray.700" />
);

const BlueBatteryIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={MdBattery3Bar} fontSize={`${size}px`} color="#0066CC" />
);

const RedTempIcon = ({ size = 30 }: { size?: number }) => (
  <Box as={FaThermometerHalf} fontSize={`${size}px`} color="#FF4500" />
);

const Tile = ({
  label,
  value,
  unit,
  Icon,
}: {
  label: string;
  value: string | number;
  unit?: string;
  Icon: React.FC;
}) => {
  const cardBg = useColorModeValue("whiteAlpha.500", "whiteAlpha.500");
  const labelC = useColorModeValue("#111827", "whiteAlpha.900");
  const subC = useColorModeValue("blackAlpha.700", "whiteAlpha.500");

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      h="120px"
      w="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box as={Icon} mb={3} fontSize="30px" />
      <Text fontSize="sm" color={labelC} mb={1} mt={1} textAlign="center" fontWeight="500">{label}</Text>
      <HStack spacing={1} align="baseline" justify="center">
        <Text fontSize="2xl" fontWeight="800" color={labelC} lineHeight="28px">
          {value}
        </Text>
        {unit ? (
          <Text fontSize="md" fontWeight="700" color={subC}>
            {unit}
          </Text>
        ) : null}
      </HStack>
    </Box>
  );
};


export const NewTopRibbon = () => {
  // Real data hooks from previous ribbon components
  const searchPower = {
    devName : "Calculation",
    keys : "INV_Total_Power"
  };
  const PowerData = UseBatteryStatus(searchPower) || [0];

  const searchTodayEnergy = {
    devName : "Calculation",
    keys : "PV_Daily_Energy_Today"
  };
  const TodayEnergyData = UseBatteryStatus(searchTodayEnergy) || [0];

  const searchTotalEnergy = {
    devName : "Calculation",
    keys : "PV_Total_Energy_kWh"
  };
  const TotalEnergyData = UseBatteryStatus(searchTotalEnergy) || [0];
  const totalYield = energyUnitScaling(TotalEnergyData[0]);

  const searchAC = {
    devName : "Calculation",
    keys : "CUF_AC"
  };
  const ACData = UseBatteryStatus(searchAC) || [0];

  const searchDC = {
    devName : "Calculation",
    keys : "CUF_DC"
  };
  const DCData = UseBatteryStatus(searchDC) || [0];

  const searchPOA = {
    devName : "WMS-1",
    keys : "Inst_POA"
  };
  const POAData = UseBatteryStatus(searchPOA) || [0];

  const searchGHI = {
    devName : "WMS-1",
    keys : "Inst_GHI"
  };
  const GHIData = UseBatteryStatus(searchGHI) || [0];

  const searchCumPOA = {
    devName : "WMS-1",
    keys : "Cum_POA_Kwhm2"
  };
  const CumPOAData = UseBatteryStatus(searchCumPOA) || [0];

  const searchCumGHI = {
    devName : "WMS-1",
    keys : "Cum_GHI_Kwhm2"
  };
  const CumGHIData = UseBatteryStatus(searchCumGHI) || [0];

  const searchPR = {
    devName: "Calculation",
    keys: "PR_Percent",
  };
  const PRData = UseBatteryStatus(searchPR) || [0];

//   const searchfreq = {
//     devName : "Grid Meter-1",
//     keys : "Bus_B_frequency_L1"
//   };
//   const FreqData = UseBatteryStatus(searchfreq) || [0];

const searchYesterdayYield = {
    devName : "calculation",
    keys : "PV_Daily_Energy_Today",
    special : "yesterday"
  };
  const yesterdayYield = UseBatteryStatus(searchYesterdayYield) || [0];

  
  const D = {
    plantYield: (TodayEnergyData[0] / 1000).toFixed(2), // Real: Today Energy in MWh
    totalYield: totalYield.value, // Real: Total yield for now
    acPower: PowerData[0] || 0, // Real: AC Power in kW (INV_Total_Power is already in kW)
    pr: PRData[0] || 0, // Real: Performance Ratio - same as Solar component PRPercent[0]
    acCuf: ACData[0] || 0, // Real: AC CUF
    dcCuf: DCData[0] || 0, // Real: DC CUF
    irradiance: POAData[0] || 0, // Real: GHI - same as Solar component LiveGHI[0]
    insolation: CumPOAData[0] || 0, // Real: Cumulative POA - same as Solar component LiveCumPOA[0]
    ghi: GHIData[0] || 0, // Real: GHI - same as Solar component LiveGHI[0] and irradiance
    horInsolation: CumGHIData[0] || 0, // Real: Horizontal insolation - same as Solar component LiveCumPOA[0]
    yesterdayYield: (yesterdayYield[0] / 1000).toFixed(2) || 0,
  };

  // Real status logic using actual data hooks (same as Mode component)
  const {
    timeWindow: timeWindowPCSStatus,
    handleTimeWindowChange: PCSStatusChange,
    handleReset: PCSStatusHandleReset
  } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
  
  const searchObj = {
    devName : "pcs",
    keys : "ESS_PCSOperation",
  };
  const PCSStatusData = UseInverterStatus(searchObj, timeWindowPCSStatus) || [0, 0, 0];

  const {
    timeWindow: timeWindowInverterStatus,
    handleTimeWindowChange: PVStatusChange,
    handleReset: PVStatusHandleReset
  } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
  
  const searchObjPCS = {
    devName : "Inverter",
    keys : "AC_Active_Power_Watt",
  };
  const PVStatusData = UseInverterStatus(searchObjPCS, timeWindowInverterStatus) || [0, 0, 0];

  const searchTripData = [{Inverter : "Trip_Mode_Inv"}, {PCS : "Trip_Mode_Inv"}];
  const TripData = UseLatestValueOfSameKeyMultipleDevice(searchTripData) as any;
  const tripCount = TripData?.flat(0).reduce((acc : number, curr : number) => acc + curr);

  const gen = PCSStatusData[0] + PVStatusData[0];
  const Commn = PCSStatusData[2] + PVStatusData[2];
  const Stop = PCSStatusData[1] + PVStatusData[1];
  
  const getStatus = () => {
    if (Commn > 0) return { text: "Non Communication", color: "gray.500" };
    if (tripCount > 0) return { text: "Trip", color: "red.500" };
    if (gen > 0) return { text: "Generating", color: "green.300" };
    if (Stop > 0) return { text: "Stop", color: "orange.500" };
    return { text: "Stop", color: "orange.500" };
  };

  const status = getStatus();

  return (
    <Box
      width={"1816px"} 
      m={"auto"} 
      p={"24px"} 
      maxH={"366px"} 
      bg={useColorModeValue("#fff", "#131512")} 
      color={'#062D59'}
      position="relative"
    >
      {/* Status Indicator - Top Left */}
      <HStack
        position="absolute"
        top="8px"
        left="8px"
        spacing={2}
        alignItems="center"
        zIndex={10}
      >
        <Box
          w="12px"
          h="8px"
          bg={status.color}
          borderRadius="sm"
        />
        <Text fontSize="12px" color="#C0C0C0" fontWeight="500">
          {status.text}
        </Text>
      </HStack>

      <SimpleGrid columns={11} spacing={0} justifyItems="center">
       
        <Tile label="Daily Yield" value={D.plantYield} unit="MWh" Icon={PowerBoltIcon} />
        <Tile label="Total Yield" value={D.totalYield} unit={totalYield.unit} Icon={SkyBlueClockIcon} />
        <Tile label="AC Power" value={D.acPower} unit="KW" Icon={OrangeSunIcon} />
        <Tile label="PR" value={D.pr} unit="%" Icon={RedPowerBoltIcon} />
        <Tile label="AC CUF" value={D.acCuf} unit="%" Icon={BlueBatteryIcon} />
        <Tile label="DC CUF" value={D.dcCuf} unit="%" Icon={LightBlueTrendIcon} />
        <Tile label="Irradiance" value={D.irradiance} unit="W/m²" Icon={GrayCloudIcon} />
        <Tile label="Insolation" value={D.insolation} unit="kWh/m²" Icon={RedTempIcon} />
        <Tile label="GHI" value={D.ghi} unit="W/m²" Icon={OrangeSunIcon} />
        <Tile label="Hor. Insolation" value={D.horInsolation} unit="kWh/m²" Icon={SkyBlueClockIcon} />
        <Tile label="Yesterday Yield" value={D.yesterdayYield} unit="MWh" Icon={LightBlueTrendIcon} />
      </SimpleGrid>
    </Box>
  );
};
