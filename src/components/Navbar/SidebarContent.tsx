// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Collapse,
  useDisclosure,
  FormControl,
  FormLabel,
  Text,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Portal,
  VStack,
  Divider,
  HStack,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSliderVertical } from "react-icons/ci";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import { Home, AlertTicket, Analysis, Site, Tools, Alarm, Config, Tenant } from "../../assets/Navbar/SideNavBar";
import { Select } from "chakra-react-select";
import { useCustomerOptionsContext } from "../../Context/CustomerOptionsContext";
import { useSelectedCustomerIDContext } from "../../Context/SelectedCustomerIDContext";
import useAuth from "../../Services/Hooks/UseAuth";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
import { VscKebabVertical } from "react-icons/vsc";
import { GetPlantGroup, GetPlantGroupOnGroupIds, PlantTimeZoneSelection } from "../../Services/CustomerHandlingService";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineLogout } from "react-icons/hi";
import state from "sweetalert/typings/modules/state";
import UsePortfolioTable from "../../Services/Hooks/Portfolio/UsePortfolioTable";
import { BaseNode, TreeNodeSideNav } from "./MultiLevelSelect";

interface SidebarContentProps {
  isSidebarExpanded: boolean;
  onToggleSidebar: () => void;
  [x: string]: any;
}

interface JwtHeader {
  firstName: string;
  lastName: string;
  scopes: string[];
  customerId: string;
}

interface PortfolioTypeEntries {
  value: string;
  label: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  isSidebarExpanded,
  onToggleSidebar,
  ...props
}) => {

  // ******************Handle Mobile Logout Button **************** */

  const jwt = localStorage.getItem("token");
  if (!jwt) {
    throw new Error("JWT not found in localStorage");
  }

  let fname = "";
  let lname = "";
  let user = "";
  let customerID = ""

  try {
    const decodedToken: JwtHeader = jwtDecode<JwtHeader>(jwt);
    const { firstName, lastName, scopes, customerId } = decodedToken;
    fname = firstName;
    lname = lastName;
    user = scopes[0];
    customerID = customerId;
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogOut = async () => {
    const response = await logout();
    if (response === true) {
      navigate("/");
    }
  };

  const handleLogOutButton = async () => {
    const response = await swal("Are you sure you want to Logout?",
      {
        buttons: ["Cancel", "Logout"]
      })
    if (response) {
      handleLogOut();
    }
  }

  // ************* Handle PortfolioTypeOption **********

  const PortfolioTypeOption = localStorage.getItem("PortfolioType");
  // if(!PortfolioTypeOption) {
  //   throw Error("Portfolio option not found!");
  // }


  //****************Handle Select Customer */
  const { customerOptions, setCustomerOptions } = useCustomerOptionsContext();
  const { selectedCustomerID, setSelectedCustomerID } = useSelectedCustomerIDContext();

  const handlePlantChange = (selectedOption: any) => {
    setSelectedCustomerID(selectedOption?.value);
    localStorage.setItem("SelectedCustomerId", selectedOption?.value || "");
    PlantTimeZoneSelection(selectedOption?.value);
    
    window.location.reload();
  };
  const handlePlantChangeByHierarchy = (selectedOption: any) => { 
      setSelectedCustomerID(selectedOption?.action);
      localStorage.setItem("SelectedCustomerId", selectedOption?.action || "");
      PlantTimeZoneSelection(selectedOption?.action);
      localStorage.setItem("SelectedPlantName", selectedOption?.name || "");
  
      window.location.reload();
    };
  // console.log(customerOptions)
  // console.log(selectedCustomerID)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  useEffect(() => {
    if (customerOptions) {
      // console.log(customerOptions)
      setSelectedCustomerId(selectedCustomerID);
      localStorage.setItem("SelectedCustomerId", selectedCustomerID || "");
      if (selectedCustomerID) {
        PlantTimeZoneSelection(selectedCustomerID);
      }

    }
  }, []);

  const portfolio = useDisclosure();
  const sites = useDisclosure();
  const Type = useDisclosure();
  const CountryType = useDisclosure();
  const PortfolioType = useDisclosure();
  const Assets = useDisclosure();
  const tools = useDisclosure();
  const tenant = useDisclosure();
  const config = useDisclosure();
  const analytics = useDisclosure();
  const showLabels = isSidebarExpanded;

  // Default opens

  useEffect(() => {
    Type.onOpen()
  }, [Type.onOpen])

  useEffect(() => {
    PortfolioType.onOpen()
  }, [PortfolioType.onOpen])

  useEffect(() => {
    Assets.onOpen()
  }, [Assets.onOpen])

  // ********** Active Links Color ***********
  // Function to determine active link styles
  const isActiveLink = (path: string) => location.pathname === path ? "#8CC73B" : "rgba(255, 255, 255, 0.6)";

  // ********* Handle Expand All *********

  const HandleExpandAll = () => {
    portfolio.onOpen();
    sites.onOpen();
    PortfolioType.onOpen();
    Assets.onOpen();
    tools.onOpen();
  }


  // ********* Handle Collapse All *********
  const handleCollapseAll = () => {
    portfolio.onClose();
    PortfolioType.onClose();
    sites.onClose();
    Assets.onClose();
    tools.onClose();
  };

  // ***************** Type Selection *******************
  const SelectedType = localStorage.getItem('selectedType')
  const [type, setType] = useState<string | null>(SelectedType || "hierarchy");
  useEffect(() => {
    if (type) {
      localStorage.setItem('selectedType', type)
    } else {
      localStorage.setItem('selectedType', 'hierarchy')
    }
  }, [type]);

  const handleTypeChange = (type: "country" | "portfolio" | "hierarchy") => {
    setType(prev => (prev === type ? null : type));
    if (type == 'country') {
      CountryType.onToggle()
    } else if (type == 'portfolio') {
      PortfolioType.onToggle()
    }
  };

  // ***** All Groups Option *****
  const AllGroupOptions = localStorage.getItem('AllGroupOptions');
  const parsedAllGroupOption: { country: string, id: string }[] = AllGroupOptions ? JSON.parse(AllGroupOptions) : [];
  const uniqueCountries = Array.from(new Set(parsedAllGroupOption.map((item) => item.country)));


  // *************** Select Country *****************
  const [country, setCountry] = useState<string | null>(localStorage.getItem('SelectedCountry'));

  function handleCountryTypeId(type: string) {
    // setCountry(type);
    const idsOfSelectedCountry = parsedAllGroupOption
      .filter(item => item.country === type)
      .map(item => item.id);
    localStorage.setItem("SelectedCountry", type);
    setPortfolioType('');
    GetPlantGroupOnGroupIds(idsOfSelectedCountry, setCustomerOptions, setSelectedCustomerID, true);
  }

  useEffect(() => {
    if (country) {
      handleCountryTypeId(country)
    }
  }, [country])

  // ********** Selected Portfolio Type *********

  const [portfolioType, setPortfolioType] = useState("");
  const currentPlant = PortfolioTypeOption ? JSON.parse(PortfolioTypeOption)[0].id == localStorage.getItem('SelectedTypeId') ? JSON.parse(PortfolioTypeOption)[0].label : "" : "";

  useEffect(() => {
    if (SelectedType == 'portfolio') {
      setPortfolioType(currentPlant);
    }
  }, [currentPlant])

  const SelectedPortfolioTypeID = localStorage.getItem("SelectedTypeId");

  function handlePortfolioTypeId(type: string, id: string) {
    setPortfolioType(type);
    setCountry(null);
    localStorage.setItem('SelectedCountry', '')
    localStorage.setItem("SelectedTypeId", id);
    GetPlantGroupOnGroupIds([id], setCustomerOptions, setSelectedCustomerID, true);
  }

  const authority = localStorage.getItem("authority");
  const plantType = localStorage.getItem("PlantType");
  const email = localStorage.getItem("email");

  const [link, setLink] = useState("");
  function portfolioPermission() {
    if (authority == "Customer Users") {
      swal("Access Denied!", "You don't have permission to access this.", "error");
    } else {
      navigate(link)
    }
  };

  function catalogPermission() {
    if (!email?.toLowerCase().includes("zakir")) {
      swal("Access Denied!", "You don't have permission to access this.", "error");
    } else {
      navigate(link)
    }
  };

  function portfolioLink(Rlink: string) {
    if (authority !== "Customer Users") {
      setLink(Rlink);
    };
  }

  function isPlantTypeMatched(requestUrl: string, allowedTypes: string): boolean {
    const typeMap: Record<string, string> = {
      "/inverter": "PV",
      "/string" : "PV",
      "/smb" : "PV",
      "/dg": "DG",
      "/bess": "BESS"
    };

    const urlPrefix = Object.keys(typeMap).find(prefix =>
      requestUrl.startsWith(prefix)
    );

    if (!urlPrefix) return false;

    const matchedType = typeMap[urlPrefix];

    return allowedTypes.includes(matchedType);
  }

  function handlePlantTypeDashboard(url : string) {
    if(!isPlantTypeMatched(url, plantType||"")) {
      swal("Access Denied!", "You don't have permission to access this.", "error");
    }
  }

  // Type Hierarchy
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

    const HierarchyData = parsedData ?? fetchedData;

    useEffect(() => {
        if (Array.isArray(HierarchyData) && HierarchyData.length > 0 && !parsedData) {
            localStorage.setItem("PortfolioHierarchy", JSON.stringify(HierarchyData));
        }
    }, [HierarchyData, parsedData]);

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="100%"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      blur={"4px"}
      dropShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      // _dark={{ bg: "gray.800" }}
      // borderRightWidth="1px"
      w={showLabels ? "300px" : "64px"}
      transition="width 0.3s"
      {...props}
    >
      <Flex
        direction="column"
        as="nav"
        h={"full"}
        m={"auto"}
        // mt={10}
        width="90%"
        fontSize={"16px"}
        lineHeight={"100%"}
        aria-label="Main Navigation"
        justifyContent={"space-between"}
      >
        <Box width={"100%"}>
          <Flex
            direction="column"
            // as="nav"
            m={"auto"}
            mt={20}
            width="100%"
            fontSize={"16px"}
            lineHeight={"100%"}
            flex={1}
          // aria-label="Main Navigation"
          >
            <Button
              variant={"none"}
              mt={10}
              ml={2}
              p={0}
              height={"24px"}
              width={"24px"}
              aria-label="Menu"
              color={"#FFFFFFFF"}
              bg={"transparent"}
              // icon={<FiMenu />}
              display={{ base: "inline-flex", md: "inline-flex" }}
              _hover={{ bg: "transparent" }}
              cursor={"pointer"}
              alignSelf={isSidebarExpanded ? "flex-end" : "center"}
              onClick={onToggleSidebar}
              mb={8}
            >
              {isSidebarExpanded ? <RxCross2 size={"18px"} color="rgba(198, 225, 255, 0.5)" /> : <FiMenu size={"18px"} />}
            </Button>

            <Box
              borderBottom={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.2)" : ""}
              p={0}
              pb={portfolio.isOpen ? 3 : -3}
              w={"100%"}
            >
              <NavItem
                icon={Home}
                onClick={portfolio.onToggle}
                fontSize={"16px"}
                lineHeight={"100%"}
                showLabel={showLabels}
                isOpen={portfolio.isOpen}
                color={"rgba(255, 255, 255, 0.6)"}
                alignSelf={isSidebarExpanded ? "" : "center"}
              >
                Portfolio
                <Icon
                  as={MdKeyboardArrowRight}
                  ml="auto"
                  transform={portfolio.isOpen ? "rotate(90deg)" : undefined}
                />
              </NavItem>
              <Collapse in={portfolio.isOpen}>
                <NavItem
                  ml="12"
                  py="2"
                  borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                  showLabel={showLabels}
                  color={isActiveLink("/portfolio")}
                  _activeLink={{
                    color: "#8CC73B"
                  }}
                  as={Link}
                  to={authority !== "Customer Users" ? link : ""}
                  onClick={() => portfolioPermission()}
                  onMouseEnter={() => portfolioLink("/portfolio")}
                >
                  Dashboard
                </NavItem>
                <NavItem
                  pl="3"
                  ml="12"
                  py="2"
                  borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                  // icon={AlertTicket}
                  // alignSelf={isSidebarExpanded? "" : "center"}
                  showLabel={showLabels}
                  color={isActiveLink("/alarm")}
                  // fontSize={12}
                  fontWeight={500}
                  as={Link}
                  to={authority !== "Customer Users" ? link : ""}
                  onClick={() => portfolioPermission()}
                  onMouseEnter={() => portfolioLink("/alarm")}
                >
                  Alerts
                </NavItem>
              </Collapse>
            </Box>
            <Box
              borderBottom={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.2)" : ""}
              p={0}
              pb={sites.isOpen ? 3 : -3}
              w={"100%"}
            >
              <NavItem
                icon={Site}
                alignSelf={isSidebarExpanded ? "" : "center"}
                fontSize={"16px"}
                lineHeight={"100%"}
                color={"rgba(255, 255, 255, 0.6)"}
                onClick={sites.onToggle}
                showLabel={showLabels}
                isOpen={sites.isOpen}
              >
                Sites
                <Icon
                  as={MdKeyboardArrowRight}
                  transform={sites.isOpen ? "rotate(90deg)" : undefined}
                  ml="auto"
                />
              </NavItem>
              <Collapse in={sites.isOpen}>
                <NavItem
                  fontSize={"16px"}
                  ml={0}
                  lineHeight={"100%"}
                  color={"rgba(255, 255, 255, 0.6)"}
                  showLabel={showLabels}
                  onClick={Type.onToggle}
                >
                  &nbsp; Type
                  <Icon
                    as={MdKeyboardArrowRight}
                    transform={Type.isOpen ? "rotate(90deg)" : undefined}
                    ml="auto"
                  />
                </NavItem>
                <Collapse in={Type.isOpen}>
                  <NavItem
                    fontSize={"14px"}
                    ml={'6'}
                    lineHeight={"100%"}
                    color={type == 'country' ? "#8CC73B" : "rgba(255, 255, 255, 0.6)"}
                    showLabel={showLabels}
                    onClick={() =>
                      handleTypeChange('country')
                    }
                  >
                    &nbsp; Country
                    <Icon
                      as={MdKeyboardArrowRight}
                      transform={CountryType.isOpen ? "rotate(90deg)" : undefined}
                      ml="auto"
                    />
                  </NavItem>
                  <Collapse in={type == 'country'}>
                    {uniqueCountries.map((elem: string, i: number) => (
                      <NavItem key={i} ml="16" fontSize={"14px"} borderLeft={isSidebarExpanded ? `1px solid ${country == elem ? "#8CC73B" : "white"}` : ""} py="2" showLabel={showLabels} color={country == elem ? "#8CC73B" : "rgba(255, 255, 255, 0.6)"} onClick={() => setCountry(elem)}>
                        {elem}
                      </NavItem>
                    ))}
                  </Collapse>

                  {/* <NavItem
                    fontSize={"14px"}
                    ml={'6'}
                    lineHeight={"100%"}
                    color={type == 'portfolio' ? " #8CC73B" : "rgba(255, 255, 255, 0.6)"}
                    showLabel={showLabels}
                    onClick={() => { handleTypeChange('portfolio') }}
                  >
                    &nbsp; Portfolio
                    <Icon
                      as={MdKeyboardArrowRight}
                      transform={PortfolioType.isOpen ? "rotate(90deg)" : undefined}
                      ml="auto"
                    />
                  </NavItem>
                  <Collapse in={type == 'portfolio'}>
                    {(PortfolioTypeOption ? JSON.parse(PortfolioTypeOption).map((elem: PortfolioTypeEntries, i: number) => (
                      <NavItem key={i} ml="16" fontSize={"14px"} borderLeft={isSidebarExpanded ? `1px solid ${portfolioType == elem.label ? "#8CC73B" : "white"}` : ""} py="2" showLabel={showLabels} color={portfolioType == elem.label ? "#8CC73B" : "rgba(255, 255, 255, 0.6)"} onClick={() => handlePortfolioTypeId(elem.label, elem.value)}>
                        {elem.label}
                      </NavItem>
                    )) : "")}
                  </Collapse> */}
                  {localStorage.getItem("authority") !== 'Customer Administrators'
                    ? <></> :
                    <NavItem
                      fontSize={"14px"}
                      ml={'6'}
                      lineHeight={"100%"}
                      color={type == 'hierarchy' ? " #8CC73B" : "rgba(255, 255, 255, 0.6)"}
                      showLabel={showLabels}
                      onClick={() => { handleTypeChange('hierarchy') }}
                    >
                      {/* Before it was hierarchy */}
                      &nbsp; Portfolio 
                    </NavItem>
                  }
                </Collapse>
                <FormControl
                  ml={showLabels ? 5 : 60}
                  px={5}
                  width={300}
                  h={"auto"}
                  borderLeft={"1px solid #D1D8DD"}
                >
                  <FormLabel
                    fontSize={"10px"}
                    lineHeight={"100%"}
                    color={"rgba(255, 255, 255, 0.6)"}
                    mt={2}
                  >
                    Select Plant
                  </FormLabel>
                  <Box mt={3} ml={1} fontWeight={500} zIndex={9999} color={"rgba(255, 255, 255, 0.8)"} h={"auto"} >
                    {type !== "hierarchy" 
                     ? 
                      customerOptions?.map((elem, i) => (
                        <Box key={i}
                          mb={1}
                          width="90%"
                          overflow="hidden"
                        >
                          <Text
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            fontSize={'11px'}
                            color={elem.value == localStorage.getItem("SelectedCustomerId") ? " #8CC73B" : "rgba(255, 255, 255, 0.8)"}
                            onClick={() => handlePlantChange(elem)}
                            cursor={'pointer'}
                          >
                            {elem.label}
                          </Text>
                        </Box>
                      ))
                     :
                      <Box width="90%">
                        {HierarchyData.map((node, idx) => (
                          <TreeNodeSideNav key={idx} node={node} onSelect={handlePlantChangeByHierarchy} />
                        ))}
                      </Box>
                    }
                    
                  </Box>
                </FormControl>
                <NavItem
                  showLabel={showLabels}
                  color={isActiveLink("/plantview")}
                  fontSize={"16px"}
                  lineHeight={"100%"}
                  as={Link}
                  to={'/plantview'}
                >
                  &nbsp; Dashboard
                  {/* <Icon
                    as={MdKeyboardArrowRight}
                    ml="auto"
                    transform={"rotate(90deg)"}
                  /> */}
                </NavItem>
                <NavItem
                  onClick={Assets.onToggle}
                  showLabel={showLabels}
                  color={"rgba(255, 255, 255, 0.6)"}
                  fontSize={"16px"}
                  lineHeight={"100%"}
                >
                  &nbsp; Assets
                  <Icon
                    as={MdKeyboardArrowRight}
                    ml="auto"
                    transform={Assets.isOpen ? "rotate(90deg)" : undefined}
                  />
                </NavItem>
                <Collapse in={Assets.isOpen}>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/overview")}` : ""} py="2" color={isActiveLink("/overview")} showLabel={showLabels} as={Link} to={'/overview'}>
                    Overview
                  </NavItem>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/plantalarm")}` : ""} py="2" color={isActiveLink("/plantalarm")} showLabel={showLabels} as={Link} to={'/plantalarm'}>
                    Alarms
                  </NavItem>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/inverter")}` : ""} py="2" color={isActiveLink("/inverter")} showLabel={showLabels} as={Link} to={isPlantTypeMatched('/inverter', plantType||"") ? '/inverter' : ""} onClick ={() => handlePlantTypeDashboard("/inverter")}>
                    Inverter
                  </NavItem>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/smb")}}` : ""} py="2" color={isActiveLink("/smb")} showLabel={showLabels} as={Link} to={isPlantTypeMatched('/smb', plantType||"") ? '/smb' : ""} onClick ={() => handlePlantTypeDashboard("/smb")}>
                    DC Zone
                  </NavItem>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/wms")}` : ""} py="2" color={isActiveLink("/wms")} showLabel={showLabels} as={Link} to={'/wms'}>
                    WMS
                  </NavItem>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/energymeter")}` : ""} py="2" color={isActiveLink("/energymeter")} showLabel={showLabels} as={Link} to={'/energymeter'}>
                    Energy Meter
                  </NavItem>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/bess/overview")}` : ""} py="2" color={isActiveLink("/bess/overview")} showLabel={showLabels} as={Link} to={isPlantTypeMatched('/bess/overview', plantType||"") ? '/bess/overview' : ""} onClick ={() => handlePlantTypeDashboard("/bess/overview")}>
                    BESS
                  </NavItem>
                  <NavItem fontSize={"14px"} ml="12" borderLeft={isSidebarExpanded ? `1px solid ${isActiveLink("/dg")}` : ""} py="2" color={isActiveLink("/dg")} showLabel={showLabels} as={Link} to={isPlantTypeMatched('/dg', plantType||"") ? '/dg' : ""} onClick ={() => handlePlantTypeDashboard("/dg")}>
                    Diesel Generator
                  </NavItem>
                </Collapse>
              </Collapse>
            </Box>
            <Box
              borderBottom={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.2)" : ""}
              p={0}
              pb={tools.isOpen ? 3 : -3}
              w={"100%"}
            >
              <NavItem
                icon={Tools}
                alignSelf={isSidebarExpanded ? "" : "center"}
                fontSize={"16px"}
                lineHeight={"100%"}
                color={"rgba(255, 255, 255, 0.6)"}
                onClick={tools.onToggle}
                showLabel={showLabels}
                isOpen={tools.isOpen}
              // mb={5}
              >
                Tools
                <Icon
                  as={MdKeyboardArrowRight}
                  ml="auto"
                  transform={tools.isOpen ? "rotate(90deg)" : undefined}
                />
              </NavItem>
              <Collapse in={tools.isOpen}>
                <NavItem
                  fontSize={"14px"}
                  lineHeight={"100%"}
                  ml="12"
                  borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                  py="2"
                  color={isActiveLink("/report")}
                  showLabel={showLabels}
                  as={Link}
                  to={"/report"}
                >
                  Reports
                </NavItem>
                <NavItem
                  showLabel={showLabels}
                  color={"rgba(255, 255, 255, 0.6)"}
                  fontSize={"14px"}
                  lineHeight={"100%"}
                  ml="12"
                  borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                  onClick={() => {
                    const dashboardId = localStorage.getItem("defaultDashboardId");
                    const token = localStorage.getItem("token");

                    if (dashboardId && token) {
                      window.open(
                        `https://cogneta.cloud/dashboard/${dashboardId}`,
                        "_blank"
                      );
                    } else {
                      alert("Dashboard ID or token not found!");
                    }
                  }}
                >
                  Intel-IQ
                </NavItem>
                <NavItem
                  onClick={analytics.onToggle}
                  showLabel={showLabels}
                  color={"rgba(255, 255, 255, 0.6)"}
                  fontSize={"16px"}
                  lineHeight={"100%"}
                >
                  &nbsp; Analytics
                  <Icon
                    as={MdKeyboardArrowRight}
                    ml="auto"
                    transform={analytics.isOpen ? "rotate(90deg)" : undefined}
                  />
                </NavItem>
                <Collapse in={analytics.isOpen}>
                  <NavItem
                    showLabel={showLabels}
                    fontSize={"14px"}
                    lineHeight={"100%"}
                    ml="12"
                    color={isActiveLink("/analytics/custom")}
                    borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                    as={Link}
                    to={"/analytics/custom"}
                  >
                    Custom
                  </NavItem>
                  <NavItem
                    showLabel={showLabels}
                    fontSize={"14px"}
                    lineHeight={"100%"}
                    ml="12"
                    color={isActiveLink("/analytics/catalogs")}
                    borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                    as={Link}
                    // to={authority !== "Customer Users" ? link : ""}
                    onClick={() => catalogPermission()}
                    // onMouseEnter={() => portfolioLink("/portfolio")}
                    to={email?.toLowerCase().includes("zakir") ? "/analytics/catalogs" : ""}
                  >
                    Catalogs
                  </NavItem>
                </Collapse>
              </Collapse>
            </Box>
            {authority == "Tenant Administrators" ?
              (
                <Box
                  borderBottom={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.2)" : ""}
                  p={0}
                  pb={tenant.isOpen ? 3 : -3}
                  w={"100%"}
                >
                  <NavItem
                    icon={Tenant}
                    alignSelf={isSidebarExpanded ? "" : "center"}
                    fontSize={"16px"}
                    lineHeight={"100%"}
                    color={"rgba(255, 255, 255, 0.6)"}
                    onClick={tenant.onToggle}
                    showLabel={showLabels}
                    isOpen={tenant.isOpen}
                  // mb={5}
                  >
                    Tenant View
                    <Icon
                      as={MdKeyboardArrowRight}
                      ml="auto"
                      transform={tenant.isOpen ? "rotate(90deg)" : undefined}
                    />
                  </NavItem>
                  <Collapse in={tenant.isOpen}>
                    <NavItem
                      fontSize={"14px"}
                      lineHeight={"100%"}
                      ml="12"
                      borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                      py="2"
                      color={isActiveLink("/tenant")}
                      showLabel={showLabels}
                      as={Link}
                      to={"/tenant"}
                    >
                      Main
                    </NavItem>
                    <NavItem
                    icon={Config}
                    alignSelf={isSidebarExpanded ? "" : "center"}
                    fontSize={"16px"}
                    lineHeight={"100%"}
                    color={"rgba(255, 255, 255, 0.6)"}
                    onClick={config.onToggle}
                    showLabel={showLabels}
                    isOpen={config.isOpen}
                  // mb={5}
                  >
                    &nbsp; Config
                    <Icon
                      as={MdKeyboardArrowRight}
                      ml="auto"
                      transform={config.isOpen ? "rotate(90deg)" : undefined}
                    />
                  </NavItem>
                  <Collapse in={config.isOpen}>
                    <NavItem
                      fontSize={"14px"}
                      lineHeight={"100%"}
                      ml="12"
                      borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                      py="2"
                      color={isActiveLink("/plantInfo")}
                      showLabel={showLabels}
                      as={Link}
                      to={"/plantInfo"}
                    >
                      Plant Info
                    </NavItem>
                    <NavItem
                      fontSize={"14px"}
                      lineHeight={"100%"}
                      ml="12"
                      borderLeft={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.4)" : ""}
                      py="2"
                      color={isActiveLink("/alarmProfileRule")}
                      showLabel={showLabels}
                      as={Link}
                      to={"/alarmProfileRule"}
                    >
                      Alarm Profile Rule
                    </NavItem>
                  </Collapse>
                  </Collapse>
                </Box>
              ) : (<></>)}
            {/* {authority == "Tenant Administrators" ?
              (
                <Box
                  borderBottom={isSidebarExpanded ? "1px solid rgba(255, 255, 255, 0.2)" : ""}
                  p={0}
                  pb={config.isOpen ? 3 : -3}
                  w={"100%"}
                >
                  
                </Box>
              ) : (<></>)} */}
            
          </Flex>
        </Box>
        {/* Menu Bar Icon */}
        <Flex justify={"center"}>
          <Box
            // ml={"2px"}
            // bg={"#8842E0"}
            mb={5}
            px={2}
            py={2}
            borderRadius={"6px"}
            bg={"rgba(255, 255, 255, 0.06)"}
            width={"100%"}
            // position={"absolute"}
            // bottom={Assets.isOpen && isSidebarExpanded? 50 : 20}
            display={"inline-flex"}
            alignContent={"center"}
          >
            <HStack width={"100%"} justify={"center"} onClick={handleLogOutButton} >
              <HiOutlineLogout size={24} color="rgba(255, 255, 255, 0.6)" />
              {isSidebarExpanded ?
                (
                  <Text
                    fontSize={"16px"}
                    color={"rgba(255, 255, 255, 0.6)"}
                  >
                    Logout
                  </Text>
                )
                : <></>
              }
            </HStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
