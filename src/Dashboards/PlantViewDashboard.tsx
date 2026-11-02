import {
    Box,
    GridItem,
    HStack,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';
import Heatmap from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/Heatmap';
import { NewTopRibbon } from '../components/TopRibbon';
import LandingTimeService from '../Services/LandingTimeService';
import PowerFlow from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/PowerFlow';
import PlantCards from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/PlantCards';
import PowerCurve from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/PowerCurve';
import DailyEnergy from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/DailyEnergy';
import BlockTable from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/BlockTable';
import SourceContribution from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/SourceContribution';
import Availability from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/Availability';
import PVPowerVsPOA from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/PVPowerVsPOA';
import PerformanceGraph from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/PerformanceGraph';
import EnergyBreakdown from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/EnergyBreakdown';
import FinancialMatrix from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/FinancialMatrix';
import DataAvailability from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/DataAvailability';
import { ImPencil } from "react-icons/im";
import { useEffect, useState } from 'react';
import '../App.css';
import CustomHeatmapGraph from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/CustomHeatmapGraph';
import PlantHeatmap from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/PlantHeatmap';
import GlobalLoader from '../components/GlobalLoader';
import ActiveAlarm from '../components/widgets/DashbaordsWidgets/PlantViewWidgets/ActiveAlarm';
const { DragDropContext, Droppable, Draggable } = require("react-beautiful-dnd");

const PlantViewDashboard = () => {

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

    // Handle Dragging
    const [isDrag, setIsDrag] = useState<boolean>(false);
    function handleDrag(): void {
        setIsDrag(!isDrag);
    }
    // Widgets
    const [widgets, setWidgets] = useState(
        [
            { id: "1", h: "344px", col: 1, content: <PowerCurve /> },
            { id: "2", h: "344px", col: 1, content: <DailyEnergy /> },
            { id: "3", h: "344px", col: 1, content: <PerformanceGraph /> },
            { id: "4", h: "434px", col: 3, content: <PlantHeatmap /> },
            { id: "5", h: "334px", col: 1, content: <EnergyBreakdown /> },
            { id: "6", h: "334px", col: 1, content: <FinancialMatrix /> },
            { id: "7", h: "344px", col: 1, content: <Availability /> },
            // { id: "6", h: "210px", col: 2, content: <DataAvailability /> },
            { id: "8", h: "334px", col: 2, content: <BlockTable /> },
            // { id: "7", h: "344px", col: 1, content: <PVPowerVsPOA /> },
            { id: "9", h: "344px", col: 1, content: <SourceContribution /> },
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

    return (
        <>
            {showLoader && <GlobalLoader />}
            <Box display={showLoader ? "none" : "block"} maxW="1816px" mt={"87px"} ml={10} px={{ base: 2, sm: 12, md: 17 }}>
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


                <HStack h={"auto"} w={"1816px"} mt={5} spacing={"20px"}>
                    <Box h={"403px"} w={"800px"}>
                        <PlantCards />
                    </Box>
                    <Box h={"403px"} w={"385px"}>
                        <PowerFlow />
                    </Box>
                    <Box h={"403px"} w={"590px"}>
                        <ActiveAlarm />
                    </Box>
                </HStack>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="widgets">
                        {(provided: any) => (
                            <SimpleGrid
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                w={"1816px"}
                                minChildWidth={["572px"]}
                                gap={5}
                                mt={0}
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

export default PlantViewDashboard


// ******************** Generator Table ***********************

// var searchGeneratorTable = {
//     DG : "B1_DG_DG_0_Energy_Daily_kwh,B1_DG_DG_0_Energy_Total_kwh,B1_DG_DG_0_AC_Reactive_Power_var,B1_DG_DG_0_AMP_L1,B1_DG_DG_0_AMP_L2,B1_DG_DG_0_AMP_L2,B1_DG_DG_0_AMP_L3,B1_DG_DG_0_Frequency_Hz_L1,B1_DG_DG_0_VOLT_L1_L2,B1_DG_DG_0_VOLT_L2_L3,B1_DG_DG_0_VOLT_L3_L1,B1_DG_DG_0_Fuel_Rate,B1_DG_DG_0_Engine_Speed_RPM"
// }
// var GeneratorColumn = ["Name","Power kW","Daily Export kWh","Power kVAR","L1 Amps","L2 Amps","L3 Amps","Frequency Hz","L1-L2 Volts","L2-L3 Volts","L3-L1 Volts","Fuel Rate","Engine Speed"]
// const GeneratorTableData = UsePlanViewTable(searchGeneratorTable) as any;
// console.log("GeneratorTableData", GeneratorTableData);

