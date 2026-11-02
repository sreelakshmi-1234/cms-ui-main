import { Box, Heading, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface ReportSummaryTableType {
    name : string;
}

const ReportSummaryTable : React.FC<ReportSummaryTableType> = ( {name} ) => {

    return(
        <Box>
            Hi Im Report Summary Table Layout!! -- {name}

            <Heading fontSize={"lg"}>Report</Heading>
            <TableContainer
                bg={"white"}
                height={"30vh"}
            >
                <Table
                    variant={"simple"}
                    size={"sm"}
                >
                    <Thead>
                        <Tr
                            borderBottom={"2px solid gray"}
                        >
                            <Th textAlign={"center"}>Report Name</Th>
                            <Th textAlign={"center"}>Template</Th>
                            <Th textAlign={"center"}>Format</Th>
                            <Th textAlign={"center"}>Site Name</Th>
                            <Th textAlign={"center"}>Recipient</Th>
                            <Th textAlign={"center"}>Type</Th>
                            <Th textAlign={"center"}>Last Send</Th>
                            <Th textAlign={"center"}>Next Send</Th>
                            <Th textAlign={"center"}>Autosend</Th>
                            <Th textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr
                            borderBottom={"1px solid #999"}
                        >
                            <Td textAlign={"center"}>Zakir 1st Report</Td>
                            <Td textAlign={"center"}>Farzi Template</Td>
                            <Td textAlign={"center"}>CSV</Td>
                            <Td textAlign={"center"}>TEST SITE</Td>
                            <Td textAlign={"center"}>ZAKIR SIDDIQUI</Td>
                            <Td textAlign={"center"}>PERIODIC</Td>
                            <Td textAlign={"center"}>1 day ago</Td>
                            <Td textAlign={"center"}>19h 35m</Td>
                            <Td textAlign={"center"}>ACTIVE</Td>
                            <Td textAlign={"center"} cursor={"pointer"}>
                                <Menu size={"sm"} placement="left">
                                            <MenuButton>
                                                <BsThreeDotsVertical />
                                            </MenuButton>
                                            <MenuList minWidth={"20px"} fontSize={14} color={"green.500"}>
                                                <MenuItem
                                                    fontWeight={600}
                                                    // onClick={() => handleOpenModal(elem.action)}
                                                    _focus={{ fontWeight : 700}}
                                                >
                                                    Show Report
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                            </Td>
                        </Tr>
                        <Tr
                            borderBottom={"1px solid #999"}
                        >
                            <Td textAlign={"center"}>Zakir 1st Report</Td>
                            <Td textAlign={"center"}>Farzi Template</Td>
                            <Td textAlign={"center"}>CSV</Td>
                            <Td textAlign={"center"}>TEST SITE</Td>
                            <Td textAlign={"center"}>ZAKIR SIDDIQUI</Td>
                            <Td textAlign={"center"}>PERIODIC</Td>
                            <Td textAlign={"center"}>1 day ago</Td>
                            <Td textAlign={"center"}>19h 35m</Td>
                            <Td textAlign={"center"}>ACTIVE</Td>
                            <Td textAlign={"center"} cursor={"pointer"}>
                                <Menu size={"sm"} placement="left">
                                            <MenuButton>
                                                <BsThreeDotsVertical />
                                            </MenuButton>
                                            <MenuList minWidth={"20px"} fontSize={14} color={"green.500"}>
                                                <MenuItem
                                                    fontWeight={600}
                                                    // onClick={() => handleOpenModal(elem.action)}
                                                    _focus={{ fontWeight : 700}}
                                                >
                                                    Show Report
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ReportSummaryTable;