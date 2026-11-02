import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Thead, Tooltip, Tr, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight, FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import UseDeviceOverview from "../Services/Hooks/DeviceOverview/UseDeviceOverview";
import { useEffect, useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import ChartOnModal from "../components/Layouts/ChartLayouts/ChartOnModal";
import { IoSearchSharp } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import TimeDisplay from "../components/TimeDisplay";
import LandingTimeService from "../Services/LandingTimeService";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../Services/EnlargeWidget";
import GlobalLoader from "../components/GlobalLoader";

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

const DeviceOverviewDashboard = () => {

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

    const [textSearch, setTextSearch] = useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setTextSearch(event.target.value); // Update textSearch on input change
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    // Create a state to hold the selected action for the modal
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    // Function to handle opening the modal with the selected action
    const handleOpenModal = (action: string) => {
        setSelectedAction(action); // Set the current row's action
        onOpen(); // Open the modal
    };

    const [page, setPage] = useState(0);
    const pageSize = 20;

    const data = UseDeviceOverview(pageSize, page, textSearch) as dataType[];
    const filteredData = data?.filter(elem => (elem.action.toLowerCase() !== "calculation" && elem.action.toLowerCase() !== "summation" && !elem.action.toLowerCase().includes("bess")));

    const handleNext = () => {
        if (data[0].hasNext) {
            setPage(page + 1);
        }
    }
    const handlePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    const handleFirst = () => {
        setPage(0);
    }

    const handleLast = () => {
        setPage(data[0].totalPages - 1);
    }
    const borderColor = useColorModeValue("#DDE3E8", "#262B27")
    const color = useColorModeValue("#062D59", "#fff")
    return (
        <>
            {showLoader && <GlobalLoader />}
            <Box display={showLoader ? "none" : "block"} mt={"87px"} w="1816px" height={"100vh"} ml={10} px={{ base: 2, sm: 12, md: 17 }}>

                <Box w={"1816px"}>
                    <Flex justify={"end"} >
                        <InputGroup w={80}>
                            <Input
                                pr='4.5rem'
                                type={'text'}
                                placeholder='Enter Device Name'
                                onChange={handleInputChange}
                            />
                            <InputRightElement width='4.5rem'>
                                <IoSearchSharp />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                    <TableContainer bg={useColorModeValue("white", "#131512")} mt={5}>
                        <Table variant={"simple"} color={color} textAlign="center" size={window.screen.width > 2000 ? window.screen.width > 5000 ? "lg" : "md" : "sm"}>
                            <Thead fontSize={12 + "px"} height={"30px"} fontWeight={500} bg={borderColor} border={`1px solid ${borderColor}`}>
                                <Tr fontWeight={600}>
                                    <Td textAlign={"center"}>Name</Td>
                                    <Td textAlign={"center"}>Serial</Td>
                                    <Td textAlign={"center"}>Status</Td>
                                    <Td textAlign={"center"}>Instantaneous</Td>
                                    <Td textAlign={"center"}>Aggregated</Td>
                                    <Td textAlign={"center"}>Last Update</Td>
                                    <Td textAlign={"center"}>Action</Td>
                                </Tr>
                            </Thead>
                            <Tbody color={color}>
                                {filteredData && filteredData?.map((elem, i) => (
                                    <Tr key={i} fontSize={14 + "px"} >
                                        <Td border={(`1px solid ${borderColor}`)} textAlign={"center"} color={color} fontWeight={600}>{elem.action.replace("Meter.", '')}</Td> {/* action is Label */}
                                        <Td border={(`1px solid ${borderColor}`)} textAlign={"center"}>{elem.serial}</Td>
                                        <Td border={(`1px solid ${borderColor}`)}
                                            color={elem.status ? "green.500" : "red.500"}
                                            w={"min-content"}
                                            p={-10}
                                            textAlign={"center"}
                                            borderRadius={"16px"}
                                            fontWeight={600}
                                        // bgColor={elem.status? "rgba(25, 128, 56, 0.08)" : "rgba(209, 39, 48, 0.08)"}
                                        >
                                            <Text>{elem.status == "true" ? "Active" : "Inactive"}</Text>
                                        </Td>
                                        <Td border={(`1px solid ${borderColor}`)} textAlign={"center"}>{elem.power}</Td>
                                        <Td border={(`1px solid ${borderColor}`)} textAlign={"center"}>{elem.energy}</Td>
                                        <Td border={(`1px solid ${borderColor}`)} textAlign={"center"}>{elem.lastUpdate}</Td>
                                        <Td border={(`1px solid ${borderColor}`)} textAlign={"center"}>
                                            <Menu size={"sm"} placement="left">
                                                <MenuButton>
                                                    <HiDotsVertical />
                                                </MenuButton>
                                                <MenuList minWidth={EnlargeWidgetSizeWidth(20) + "px"} fontSize={EnlargeWidgetSize(14)} height={"auto"} color={"green.500"}>
                                                    <MenuItem
                                                        fontWeight={600}
                                                        onClick={() => handleOpenModal(elem.action)}
                                                        _focus={{ fontWeight: 700 }}
                                                    >
                                                        Show Chart
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <HStack m={5} mx={10} justify={"end"}>
                            <Tooltip label='First Page'>
                                <Box as="span" cursor={"pointer"}>
                                    <FaAnglesLeft onClick={handleFirst} color={page == 0 ? "#999" : "#000"} fontSize={20} />
                                </Box>
                            </Tooltip>
                            <Tooltip label='Previous'>
                                <Box as="span" cursor={"pointer"}>
                                    <FaAngleLeft onClick={handlePrev} color={page == 0 ? "#999" : "#000"} fontSize={20} />
                                </Box>
                            </Tooltip>
                            <Tooltip label='Next'>
                                <Box as="span" cursor={"pointer"}>
                                    <FaAngleRight onClick={handleNext} color={page == (data[0]?.totalPages - 1 || 0) ? "#999" : "#000"} fontSize={20} />
                                </Box>
                            </Tooltip>
                            <Tooltip label='Last Page'>
                                <Box as="span" cursor={"pointer"}>
                                    <FaAnglesRight onClick={handleLast} color={page == (data[0]?.totalPages - 1 || 0) ? "#999" : "#000"} fontSize={20} />
                                </Box>
                            </Tooltip>
                        </HStack>

                    </TableContainer>
                </Box>
                {/* Only show the modal if selectedAction is set */}
                {selectedAction && (
                    <ChartOnModal isOpen={isOpen} onClose={onClose} devName={selectedAction} />
                )}
            </Box>
        </>
    );
};

export default DeviceOverviewDashboard;