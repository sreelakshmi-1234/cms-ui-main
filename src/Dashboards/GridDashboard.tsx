import {
    Box,
    Grid,
    GridItem,
    SimpleGrid,
    HStack,
    useColorModeValue,
    FormControl,
    Text
} from '@chakra-ui/react';
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus';
import { NewTopRibbon } from '../components/TopRibbon';
import LandingTimeService from '../Services/LandingTimeService';
import GridMeter from '../components/widgets/DashbaordsWidgets/GridWidgets/GridMeter';
import GridPower from '../components/widgets/DashbaordsWidgets/GridWidgets/GridPower';
import GridMetersStatus from '../components/widgets/DashbaordsWidgets/GridWidgets/GridMetersStatus';
import { useEffect, useState } from 'react';
import '../App.css'
import { ImPencil } from 'react-icons/im';
import GridPowerFactorThreadGraph from '../components/widgets/DashbaordsWidgets/GridWidgets/GridPowerFactorThreadGraph';
import GridVoltageGraph from '../components/widgets/DashbaordsWidgets/GridWidgets/GridVoltageGraph';
import GridEnergyFlowGraph from '../components/widgets/DashbaordsWidgets/GridWidgets/GridEnergyFlowGraph';
import GridCurrentGraph from '../components/widgets/DashbaordsWidgets/GridWidgets/GridCurrentGraph';
import GridFrequencyGraph from '../components/widgets/DashbaordsWidgets/GridWidgets/GridFrequencyGraph';
import GridPowerGraph from '../components/widgets/DashbaordsWidgets/GridWidgets/GridPowerGraph';
import GridAggregatedBlocks from '../components/widgets/DashbaordsWidgets/GridWidgets/GridAggregatedBlocks';
import GridTable from '../components/widgets/DashbaordsWidgets/GridWidgets/GridTable';
import UseDeviceOverview from '../Services/Hooks/DeviceOverview/UseDeviceOverview';
import { Select } from 'chakra-react-select';
import { Link } from 'react-router-dom';
import GlobalLoader from '../components/GlobalLoader';
const { DragDropContext, Droppable, Draggable } = require("react-beautiful-dnd");

interface dataType {
    name: string;
    serial: string;
    status: string;
    power: number;
    energy: number;
    action: string;
    lastUpdate: string;
    hasNext: boolean;
    totalPages: number;
}

const GridDashboard = () => {

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

    // Meter Selection
    const [meter, setMeter] = useState<string>('Grid Meter-1');

    // Meter Options
    const AllMeters = UseDeviceOverview(1000, 0, 'Grid Meter-') as dataType[];
    const [MeterOption, setMeterOption] = useState([{ label: "", value: "" }]);
    useEffect(() => {
        if (AllMeters && AllMeters.length > 0) {
            setMeterOption(
                AllMeters.map((elem) => (
                    {
                        label: elem.action,
                        value: elem.action
                    }
                ))
            )
        }
    }, [AllMeters]);

    // Handle Dragging
    const [isDrag, setIsDrag] = useState<boolean>(false);
    function handleDrag(): void {
        setIsDrag(!isDrag);
    }
    // Widgets
    const [widgets, setWidgets] = useState(
        [
            { id: "1", h: "344px", col: 1, content: <GridPowerGraph /> },
            { id: "2", h: "344px", col: 1, content: <GridEnergyFlowGraph /> },
            { id: "3", h: "344px", col: 1, content: <GridCurrentGraph /> },
            { id: "4", h: "344px", col: 1, content: <GridPowerFactorThreadGraph /> },
            { id: "5", h: "344px", col: 1, content: <GridVoltageGraph /> },
            { id: "6", h: "344px", col: 1, content: <GridFrequencyGraph /> },
            { id: "7", h: "152px", col: 3, content: <GridAggregatedBlocks /> },
            { id: "8", h: "460px", col: 3, content: <GridTable /> },
            // { id: "9", h: "344px", col: 1, content: <InverterTempVarGraph /> }
        ]
    );

    // Function to handle drag-and-drop
    const onDragEnd = (result: any) => {
        const { destination, source } = result;

        // If dropped outside the droppable area, do nothing
        if (!destination) return;

        // If dropped in the same position, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Reorder the widgets array
        const newWidgets = Array.from(widgets);
        const [removed] = newWidgets.splice(source.index, 1);
        newWidgets.splice(destination.index, 0, removed);

        setWidgets(newWidgets);
    };
    // ************************* Digital Bar Chart ******************

    var search = {
        devName: localStorage.getItem("currentGridMeter") || "Grid Meter-1", // Grid Meter
        keys: "Bus_B_voltage_L1_L2,Bus_B_voltage_L2_L3,Bus_B_voltage_L3_L1"   // Line AMP Daata is not present in Grid-Meter in Durteck
    }
    const DigitalBarData = UseBatteryStatus(search) || [0, 0, 0, 0, 0, 0];

    const currentColor = useColorModeValue("#062D59", "#fff");
    const currentBG = useColorModeValue("#fff", "#131512");
    return (
        <>
            {showLoader && <GlobalLoader />}
            <Box display={showLoader ? "none" : "block"} mt={"87px"} w="1816px" ml={10} px={{ base: 2, sm: 12, md: 17 }}>

                {/* ****************** TOP RIBBON ************ */}
                <Box
                    position={"absolute"}
                    zIndex={10000000000}
                    right={0}
                    p={2}
                    bg={useColorModeValue("rgba(0,0,0, 0.8)", "#131512")}
                    opacity={isDrag ? 0.8 : 0.2}
                    _hover={{
                        opacity: 0.8
                    }}
                    cursor={"pointer"}
                    borderRadius={"10px"}
                    onClick={handleDrag}
                >
                    <ImPencil color='white' size={12} />
                </Box>
                <NewTopRibbon />

                {/* Meter Selection */}
                <HStack spacing={3} mt={"20px"}>
                    <Box width={"220px"} height={"40px"} border={"1px solid #9BABBD"} bg={"white"}>
                        <FormControl
                            ml={-2}
                            w={"100%"}
                            h={"auto"}
                            maxH={"24px"}
                            color={useColorModeValue("#062D59", "#FFFFFF")}
                            size={"20px"}
                            lineHeight={"24.38px"}
                        >
                            <Box fontWeight={600}>
                                <Select
                                    isMulti={false}
                                    name="Meters"
                                    placeholder="Select Any Meter"
                                    closeMenuOnSelect={true}
                                    variant="unstyle"
                                    focusBorderColor="transparent"
                                    options={MeterOption || []}
                                    value={MeterOption?.find(option => option.value == (localStorage.getItem("currentGridMeter") ? localStorage.getItem("currentGridMeter") : meter))}
                                    onChange={(e) => {
                                        localStorage.setItem("currentGridMeter", e?.value || "Grid Meter-1")
                                        setMeter(e?.value || "Grid Meter-1")
                                        window.location.reload()
                                    }}
                                    // useBasicStyles={true}
                                    chakraStyles={{
                                        menuList: (provided) => ({
                                            ...provided,
                                            backgroundColor: currentBG,
                                            color: currentColor,
                                            fontSize: "16px"
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            bgColor: "transparent",
                                            fontSize: "14px",
                                            padding: 1
                                        }),
                                        valueContainer: (provided) => ({
                                            ...provided,
                                            fontSize: "14px"
                                        }),
                                    }}
                                />
                            </Box>
                        </FormControl>

                    </Box>
                    <Box
                        py={"8px"}
                        px={"12px"}
                        border={"1px solid"}
                        borderColor={"#062D59"}
                        bgColor={"#062D59"}
                        as={Link}
                        to={"/othermeter"}
                    >
                        <Text fontSize={"14px"} color={"#FFFFFF"}>Plant Meters</Text>
                    </Box>
                </HStack>

                <HStack
                    h={"259px"}
                    w={"1816px"}
                    gap={5}
                >
                    <GridItem h={"259px"} width={"1236px"} colSpan={1}>
                        <GridMeter />
                    </GridItem>
                    <GridItem h={"259px"} width={"248px"} colSpan={1}>
                        <GridPower />
                    </GridItem>
                    <GridItem h={"259px"} width={"353px"} colSpan={1}>
                        <GridMetersStatus />
                    </GridItem>
                </HStack>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="widgets">
                        {(provided: any) => (
                            <SimpleGrid
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                w={"1816px"}
                                minChildWidth={["578px"]}
                                gap={5}
                                mt={5}
                                mb={5}
                            >
                                {widgets.map((widget, index) => (
                                    isDrag ? (
                                        // Render Draggable component only when `isDrag` is true
                                        <Draggable key={widget.id} draggableId={widget.id} index={index}>
                                            {(provided: any) => (
                                                <GridItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    transition="transform 0.2s ease-in-out"
                                                    // className='shake-animation'
                                                    boxShadow={"xl"}
                                                    h={widget.h}
                                                    colSpan={widget.col}
                                                    _hover={{ cursor: "grabbing" }}
                                                    style={{ ...provided.draggableProps.style }}
                                                >
                                                    {widget.content}
                                                </GridItem>
                                            )}
                                        </Draggable>
                                    ) : (
                                        // Render static GridItem when `isDrag` is false
                                        <GridItem
                                            key={widget.id}
                                            transition="transform 0.2s ease-in-out"
                                            h={widget.h}
                                            colSpan={widget.col}
                                        >
                                            {widget.content}
                                        </GridItem>
                                    )
                                ))}
                                {/* {provided.placeholder} */}
                            </SimpleGrid>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </>
    );
};

export default GridDashboard;
