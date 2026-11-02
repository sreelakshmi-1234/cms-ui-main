import {
    Box,
    GridItem,
    HStack,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react'
import { NewTopRibbon } from '../components/TopRibbon'
import LandingTimeService from '../Services/LandingTimeService'
import { useEffect, useState } from 'react'
import { ImPencil } from 'react-icons/im'
import '../App.css'
import GlobalLoader from '../components/GlobalLoader'
import INVvsStringHeatmapGraph from '../components/widgets/DashbaordsWidgets/String/InverterStringWidgets/INVvsStringHeatmapGraph'
import InvStringTable from '../components/widgets/DashbaordsWidgets/String/InverterStringWidgets/InvStringTable'
import InverterStringStatus from '../components/widgets/DashbaordsWidgets/String/InverterStringWidgets/InverterStringStatus'
import StringLayerOptions from '../components/widgets/DashbaordsWidgets/String/StringLayerOptions'
import POAvsInvStringCurrentGraph from '../components/widgets/DashbaordsWidgets/String/InverterStringWidgets/POAvsInvStringCurrentGraph'
import StringStaticInfos from '../components/widgets/DashbaordsWidgets/String/InverterStringWidgets/StringStaticInfos'
import StringICCurveGraph from '../components/widgets/DashbaordsWidgets/String/InverterStringWidgets/StringICCurveGraph'
import StringPower from '../components/widgets/DashbaordsWidgets/String/InverterStringWidgets/StringPower'
const { DragDropContext, Droppable, Draggable } = require("react-beautiful-dnd");

const InverterStringDashboard = () => {


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
            { id: "1", h: "344px", col: 4, content: <INVvsStringHeatmapGraph /> },
            { id: "2", h: "456px", col: 4, content: <InvStringTable /> },
            {id : "3", h : "344px", col: 2, content: <POAvsInvStringCurrentGraph />},
            {id : "4", h : "344px", col: 2, content: <StringICCurveGraph />}
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
            <Box display={showLoader ? "none" : "block"} mt={"87px"} maxW="1816px" ml={10} px={{ base: 2, sm: 12, md: 17 }}>

                {/* String Layer Option */}

                <StringLayerOptions 
                    currentLayer='string'
                />

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

                <HStack
                    h={"259px"}
                    w={"1816px"}
                    gap={5}
                >
                    <GridItem h={"259px"} width={"1236px"} colSpan={1}>
                        <StringStaticInfos />
                    </GridItem>
                    <GridItem h={"259px"} width={"277px"} colSpan={1}>
                        <StringPower />
                    </GridItem>
                    <GridItem h={"259px"} width={"277px"} colSpan={1}>
                        <InverterStringStatus />
                    </GridItem>
                </HStack>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="widgets">
                        {(provided: any) => (
                            <SimpleGrid
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                w={"1816px"}
                                columns={4}
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
    )
}

export default InverterStringDashboard;