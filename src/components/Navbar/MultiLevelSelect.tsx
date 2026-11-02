import React, { useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    IconButton,
    Collapse,
    useDisclosure,
    Menu,
    MenuButton,
    Button,
    MenuList,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import UsePortfolioTable from "../../Services/Hooks/Portfolio/UsePortfolioTable";
import { useLocation } from "react-router";

export interface BaseNode {
    name: string;
    createdTime?: string;
    country?: string | null;
    type?: string | null;
    category?: string | null;
    action?: string | null;
    totalPower?: number;
    totalEnergy?: number;
    isActive?: boolean;
    latestUpdateTime?: string;
    subRows?: BaseNode[];
}

interface TreeNodeProps {
    node: BaseNode;
    onSelect: (node: BaseNode) => void;
    depth?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onSelect, depth = 0 }) => {
    const isLeaf = node.type === "Plant" && node.action != null;

    const [isOpen, setIsOpen] = React.useState(false);

    const currentColor = useColorModeValue("#062D59", "#fff");
    const currentBG = useColorModeValue("#fff", "#131512");

    function selection(name: string): number {
        localStorage.setItem("SelectedPlantName", name);
        return 600
    }

    return (
        <>
            {!isLeaf ? (
                <Box
                    px={4}
                    py={1}
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    onClick={() => setIsOpen(!isOpen)}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ paddingLeft: `${depth * 5}px` }}
                    fontSize={"10px"}
                    color={currentColor}
                >
                    <Text fontWeight="400">{node.name.split(".").length > 1 ? node.name.split(".")[1] : node.name.split(".")[0]}</Text>
                    {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                </Box>
            ) : (
                <Box
                    px={4}
                    py={1}
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => onSelect(node)}
                    style={{ paddingLeft: `${depth * 5 + 2}px` }}
                    fontSize={"10px"}
                    color={currentColor}
                    fontWeight={localStorage.getItem("SelectedCustomerId") == node.action ? selection(node.name) : "400"}
                >
                    {node.name.split(".").length > 1 ? node.name.split(".")[1] : node.name.split(".")[0]}
                </Box>
            )}

            {/* Render children if open */}
            <Collapse in={isOpen}>
                {node.subRows && node.subRows?.length > 0 && (
                    <Box pl={`${depth * 5 + 1}px`} borderLeft="0px solid #E2E8F0">
                        {node.subRows.map((child, idx) => (
                            <TreeNode key={idx} node={child} onSelect={onSelect} depth={depth + 1} />
                        ))}
                    </Box>
                )}
            </Collapse>
        </>
    );
};

interface HierarchicalTreeSelectProps {
    onSelect: (node: BaseNode) => void;
}

const HierarchicalTreeSelect: React.FC<HierarchicalTreeSelectProps> = ({
    onSelect,
}) => {
    const { isOpen, onToggle } = useDisclosure();

    const currentColor = useColorModeValue("#062D59", "#fff");
    const currentBG = useColorModeValue("#fff", "#131512");
    const storedData = localStorage.getItem("PortfolioHierarchy");
    let parsedData: BaseNode[] | null = null;

    if (storedData) {
        try {
            const tempData = JSON.parse(storedData);
            if (Array.isArray(tempData) && tempData.length > 0) {
                parsedData = tempData;
            }
        } catch (e) {
            console.error("Failed to parse stored PortfolioHierarchy", e);
        }
    }

    const fetchedData = UsePortfolioTable() || []; // fallback to empty array

    const data = parsedData ?? fetchedData;

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0 && !parsedData) {
            localStorage.setItem("PortfolioHierarchy", JSON.stringify(data));
        }
    }, [data, parsedData]);

    const location = useLocation();

    return (
        <Menu closeOnSelect autoSelect={false} isOpen={isOpen} onOpen={onToggle} onClose={onToggle}>
            <MenuButton as={Button} variant="ghosted" p={1} rounded={"none"} w="full" textAlign="left">
                <Flex justifyContent="space-between" alignItems="center">
                    <Box width="90%" overflow="hidden">
                        <Text
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            color={currentColor}
                        >
                            {location.pathname == "/portfolio" || location.pathname == "/alarm" ? localStorage.getItem("UserOwner") || "" : localStorage.getItem("SelectedPlantName") || "Select Plant"}
                        </Text>
                    </Box>
                    <FaChevronDown size={15} fontWeight={400} />
                </Flex>

            </MenuButton>
            <MenuList
                maxH="300px"
                overflowY="auto"
                // borderRadius="md"
                // borderWidth="0px"
                // borderColor="gray.200"
                mt={0}
                bg={currentBG}
                boxShadow="md"
            >
                <Box p={1}>
                    {data.map((node, idx) => (
                        <TreeNode key={idx} node={node} onSelect={onSelect} />
                    ))}
                </Box>
            </MenuList>
        </Menu>
    );
};

export default HierarchicalTreeSelect;

// It is for Side navigation Bar
export const TreeNodeSideNav: React.FC<TreeNodeProps> = ({ node, onSelect, depth = 0 }) => {
    const isLeaf = node.type === "Plant" && node.action != null;

    const [isOpen, setIsOpen] = React.useState(false);

    const currentColor = "rgba(255, 255, 255, 0.6)";
    const currentBG = useColorModeValue("#fff", "#131512");

    function selection(name: string): number {
        localStorage.setItem("SelectedPlantName", name);
        return 600
    }

    return (
        <>
            {!isLeaf ? (
                <Box
                    px={4}
                    py={1}
                    cursor="pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ paddingLeft: `${depth * 5 + 0}px` }}
                    fontSize={"10px"}
                    color={currentColor}
                    borderLeft={"px solid #D1D8DD"}
                >
                    <Text fontWeight="400" >{node.name.split(".").length > 1 ? node.name.split(".")[1] : node.name.split(".")[0]}</Text>
                    {isOpen ? <FaChevronDown color="rgba(255, 255, 255, 0.6)" size={"8px"} /> : <FaChevronRight color="rgba(255, 255, 255, 0.6)" size={"8px"} />}
                </Box>
            ) : (
                <Box
                    px={4}
                    py={1}
                    cursor="pointer"
                    onClick={() => onSelect(node)}
                    style={{ paddingLeft: `${depth * 5 + 0}px` }}
                    fontSize={"10px"}
                    color={localStorage.getItem("SelectedCustomerId") == node.action ? " #8CC73B" : "rgba(255, 255, 255, 0.6)"}
                    fontWeight={400}
                    // borderLeft={"1px solid #D1D8DD"}
                >
                    {node.name.split(".").length > 1 ? node.name.split(".")[1] : node.name.split(".")[0]}
                </Box>
            )}

            {/* Render children if open */}
            <Collapse in={isOpen}>
                {node.subRows && node.subRows?.length > 0 && (
                    <Box pl={`${depth * 5 + 10}px`} borderLeft={"0px solid #D1D8DD"}>
                        {node.subRows.map((child, idx) => (
                            <TreeNodeSideNav key={idx} node={child} onSelect={onSelect} depth={depth + 1} />
                        ))}
                    </Box>
                )}
            </Collapse>
        </>
    );
};