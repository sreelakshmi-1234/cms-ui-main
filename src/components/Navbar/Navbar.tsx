import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Icon,
  HStack,
  VStack,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Button,
} from "@chakra-ui/react";
import { MdDarkMode, MdLightMode, MdSunny } from "react-icons/md";
import { FaAngleDown, FaBell, FaCaretRight, FaChevronRight, FaRegMoon, FaSignOutAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { useLocation, useNavigate } from "react-router";
import SidebarContent from "./SidebarContent";
import useAuth from "../../Services/Hooks/UseAuth";
import cogneta_logo from "../../assets/cogneta_logo.png";
import cogneta from "../../assets/cogneta-removebg-preview.png";
import flux from "../../assets/NewEtaFluxLogo.svg";
import { Select } from "chakra-react-select";
import { useCustomerOptionsContext } from "../../Context/CustomerOptionsContext";
import { useSelectedCustomerIDContext } from "../../Context/SelectedCustomerIDContext";
import { Link } from "react-router-dom";
import { useBESSNavTabsContext } from "../../Context/BESSNavTabsContext";
import NotificationPopup from "./NotificationPopup";
import { PlantTimeZoneSelection } from "../../Services/CustomerHandlingService";
import { EnlargeWidgetSize } from "../../Services/EnlargeWidget";
import { AiOutlineRight } from "react-icons/ai";
import { LuMoon } from "react-icons/lu";
import { DarkMode, LightMode } from "../ColorMode";
import TimeDisplay from "../TimeDisplay";
import { IoArrowBackOutline } from "react-icons/io5";
import HierarchicalTreeSelect from "./MultiLevelSelect";

interface breadcrumbTypes {
  title: string,
  to: string,
  color: string
}

interface JwtHeader {
  firstName: string;
  lastName: string;
  scopes: string[];
}

const Navbar: React.FC<{ children: React.JSX.Element, breadcrumbs: breadcrumbTypes[] | null, enableSideNavigation? : boolean }> = ({ children, breadcrumbs, enableSideNavigation=true }) => {
  const jwt = localStorage.getItem("token");
  if (!jwt) {
    throw new Error("JWT not found in localStorage");
  }

  let fname = "";
  let lname = "";
  let user = "";

  try {
    const decodedToken: JwtHeader = jwtDecode<JwtHeader>(jwt);
    const { firstName, lastName, scopes } = decodedToken;
    fname = firstName;
    lname = lastName;
    user = scopes[0];
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout, loginByUserId } = useAuth();
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const handleLogOut = async () => {
    const response = await logout();
    if (response === true) {
      navigate("/");
    }
  };

  const tenantUserId = localStorage.getItem('tenantUserId');
  const authority = localStorage.getItem('authority');
  const enableBackTrack = authority ? authority !== 'Tenant Administrators' ? true : false : false;

  const handleBackToTenant = async () => {
    if(tenantUserId) {
      await loginByUserId(tenantUserId)
    }
  }

  const handleToggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const { customerOptions } = useCustomerOptionsContext();
  const { selectedCustomerID, setSelectedCustomerID } = useSelectedCustomerIDContext();

  const handlePlantChange = (selectedOption: any) => {
    setSelectedCustomerID(selectedOption?.value);
    localStorage.setItem("SelectedCustomerId", selectedOption?.value || "");
    PlantTimeZoneSelection(selectedOption?.value);
    localStorage.setItem("SelectedPlantName", selectedOption?.name || "");

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

  const { BESSNavTabs } = useBESSNavTabsContext();

  // ******************* Mouse Child Event********
  const handleChildBox = () => {
    if (isSidebarExpanded) {
      setSidebarExpanded(false)
    }
  };

  // Timezone Selection Logic
  const plantTimezone = localStorage.getItem("PlantTimeZone") || 'Asia/Calcutta';
  const currentUserTimezone = localStorage.getItem("currentUserTimeZone") || 'Asia/Calcutta';
  const [currentTimezone, setCurrentTime] = useState<string>(handleTimezoneLabel(localStorage.getItem("SelectedTimezone") || 'Asia/Calcutta'));
  function handleTimezoneLabel(timezone: string): string {
    if (timezone == currentUserTimezone) {
      return "User Timezone";
    } else {
      return "Plant Timezone";
    }
  }
  function handleSelectTimezone(chosen: "user" | "plant") {
    if (chosen == "plant") {
      localStorage.setItem("SelectedTimezone", plantTimezone);
      setCurrentTime("Plant Timezone");
      window.location.reload()
    } else {
      localStorage.setItem("SelectedTimezone", currentUserTimezone);
      setCurrentTime("User Timezone");
      window.location.reload()
    }
  }

  // Resizing Logic
  const [scale, setScale] = useState(1);
  const initialDPR = useRef(window.devicePixelRatio);

  useEffect(() => {
    const updateScale = () => {
      // If devicePixelRatio changed, assume it's zooming, so don't update scale
      if (window.devicePixelRatio !== initialDPR.current) return;

      const baseWidth = 1920;
      const baseHeight = 1080;
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      const widthScale = currentWidth / baseWidth;
      const heightScale = currentHeight / baseHeight;
      const scaleFactor = Math.max(widthScale, heightScale);

      setScale(scaleFactor); // You may choose widthScale if you prefer
    };

    updateScale(); // Run once on mount
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // console.log(scale)
  const defaultBreadcrumb: breadcrumbTypes[] = [
    {
      title: "Home",
      to: "",
      color: ""
    },
    {
      title: "Sites",
      to: "",
      color: ""
    },
    {
      title: "Assets",
      to: "",
      color: ""
    },
    {
      title: "Plant View",
      to: "/plantview",
      color: "#062D59"
    }
  ];

  const currentColor = useColorModeValue("#062D59", "#fff");
  const currentBG = useColorModeValue("#fff", "#131512");
  return (
    <Box
      as="section"
      bg="#F5F7F8"
      _dark={{ bg: "black" }}
      minH="1000px" width={"1920px"}
      // transform={`scale(${scale})`}
      // transformOrigin={"top left"}
      sx={{zoom : scale}}
    >
      {enableSideNavigation && <SidebarContent
        isSidebarExpanded={isSidebarExpanded}
        onToggleSidebar={handleToggleSidebar}
        display={{ base: "block", md: "block" }}
        boxShadow="rgba(0, 0, 0, 0.25)"
        bgColor="#062D59"
      />}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="1920px"
        pos="fixed"
        top={0}
        left={0}
        px="4"
        pl="0"
        bg={"#FFFFFF"}
        _dark={{ bg: "#131512" }}
        // borderBottomWidth="1px"
        color="inherit"
        h={"87px"}
        maxH={"87px"}
        // boxShadow="rgba(0, 0, 0, 0.06)"
        zIndex={"sticky"}
      >
        <Flex px={["2", "4"]} py="5" align="center" width={"auto"} h={"auto"} maxW={"648px"} maxH={"54px"}>
          {/* <Flex> */}
          {/* <Image src={cogneta_logo} alt="logo" w={["11", "30"]} h={["10", "20"]} display={["none", "block"]} /> */}
          <Image src={cogneta} alt="logo" w={["11", "30"]} h={["10", "20"]} mr={2} />
          <Image src={flux} alt="logo" h={"30px"} mt={-1}  display={["none", "block"]} mr={2} />
          {/* <Image src={flux} alt="logo" w={["11","30"]} h={["10", "20"]} mr={2} mt={-2} /> */}
          {/* </Flex> */}
          {enableSideNavigation && (<VStack borderLeft={"1px solid #D1D8DD"} h={"auto"} width={"auto"} maxH={"54px"} spacing={"10px"} alignItems={"left"}>
            <FormControl
              ml={2}
              w={"250px"} // 198px
              h={"auto"}
              maxH={"24px"}
              color={currentColor}
              size={"20px"}
              lineHeight={"24.38px"}
            // display={["none", "block"]}
            >
              <Box fontWeight={600}>
                {localStorage.getItem("authority") !== 'Customer Administrators'
                  ? 
                  <Select
                    isMulti={false}
                    name="plants"
                    placeholder=""
                    closeMenuOnSelect={true}
                    variant="unstyle"
                    focusBorderColor="transparent"
                    options={customerOptions || []}
                    value={customerOptions?.find(option => option.value === localStorage.getItem("SelectedCustomerId"))}
                    onChange={handlePlantChange}
                    // useBasicStyles={true}
                    chakraStyles={{
                      menuList: (provided) => ({
                        ...provided,
                        backgroundColor: "#fff",
                        color: "#062D59",
                        fontSize: "12px",
                        borderRadius: "0",
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        fontSize: "16px"
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        bgColor: "transparent",
                        fontSize: "10px",
                        paddingTop: "2px",
                        paddingBottom: "2px"
                      })
                    }}
                  />
                  :
                  <HierarchicalTreeSelect onSelect={handlePlantChangeByHierarchy} />
                }
              </Box>
            </FormControl>
            <Box ml={2} color={"#9BABBD"} fontWeight={400}>
              <Breadcrumb spacing="8px" separator={<AiOutlineRight color="#062D59" height={"4px"} width={"8px"} />}>
                {breadcrumbs ? breadcrumbs.map((item: breadcrumbTypes, index) =>
                (
                  <BreadcrumbItem color={item.color == "#062D59" ? currentColor : item.color} fontSize={16} as={Link} to={item.to}>
                    <BreadcrumbLink>{item.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                )
                ) : defaultBreadcrumb.map((item: breadcrumbTypes, index) =>
                (
                  <BreadcrumbItem color={item.color == "#062D59" ? currentColor : item.color} fontSize={16} as={Link} to={item.to}>
                    <BreadcrumbLink>{item.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                )
                )
                }
              </Breadcrumb>
            </Box>
          </VStack>)}
          {/* For Battery - Tabs Required- Work for battery Only */}
          {/* {BESSNavTabs && <Tabs variant={"soft-rounded"} colorScheme="gray">
            <TabList>
              <Tab 
                fontWeight={600} 
                color={"#004F86"} 
                fontFamily={"inter"} 
                fontSize={[10, 16]}
                as={Link}
                to={"/bess/overview"}
                bg = {location.pathname == "/bess/overview" ? "#D9D9D9" : ""}
              >BESS Overview</Tab>
              <Tab 
                fontWeight={600} 
                color={"#004F86"} 
                fontFamily={"inter"} 
                fontSize={[10, 16]}
                as={Link}
                to={"/bess/kpi"}
                bg={location.pathname=="/bess/kpi"? "#D9D9D9" : ""}
              >KPI</Tab>
              <Tab 
                fontWeight={600} 
                color={"#004F86"} 
                fontFamily={"inter"} 
                fontSize={[10, 16]}
                as={Link}
                to={"/bess/health"}
                bg={location.pathname == "/bess/health" ?  "#D9D9D9" : ""}
              >Health</Tab>
            </TabList>
          </Tabs>} */}
        </Flex>
        <VStack spacing={"10px"} alignItems={"flex-end"} alignContent={"flex-end"}>
          <Flex align="center">
            <Menu placement="bottom-end" variant={"ghosted"}>
              <MenuButton as={Button} fontSize={"16px"} fontWeight={500} bg={"transparent"} rightIcon={<FaAngleDown fontWeight={500} />} _active={{ opacity: 0.6 }}>
                <Text textTransform={"capitalize"}>{currentTimezone}</Text>
              </MenuButton>
              {enableSideNavigation && <MenuList fontSize={"14px"} fontWeight={400} color={currentColor} bg={currentBG}>
                <MenuItem p={"10px"} onClick={() => handleSelectTimezone("user")}>User Timezone</MenuItem>
                <MenuItem p={"10px"} onClick={() => handleSelectTimezone("plant")}>Plant Timezone</MenuItem>
              </MenuList>}
            </Menu>
            <IconButton
              aria-label="Color Switcher"
              display={["none", "flex"]}
              icon={colorMode === "light" ? <LightMode /> : <DarkMode />}
              onClick={toggleColorMode}
              cursor="pointer"
              ml={"4"}
              mr="15"
              boxSize="auto"
            />
            <NotificationPopup>
              <Icon color="gray.500" as={FaBell} cursor="pointer" boxSize="20px" />
            </NotificationPopup>
            {/* <Icon
              as={FaCircleUser}
              color="gray.500"
              cursor="pointer"
              ml="4"
              boxSize="25px"
            /> */}
            <Flex alignItems="center" display={["none", "flex"]}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack
                    ml={"4"}
                    bg={"#062D59"}
                    color={"white"}
                    py={1}
                    px={2}
                    rounded={"sm"}
                  >
                    <Text
                      fontSize="sm"
                      textTransform="capitalize"
                      fontWeight="600"
                      letterSpacing="1px"
                      fontFamily="sans-serif"
                    >
                      {(fname[0] ? fname[0] : 'ND') + (lname[0] ? lname[0] : "")}
                    </Text>
                    {/* <Icon
                      as={FaCircleUser}
                      color="gray.500"
                      cursor="pointer"
                      ml="4"
                      boxSize="25px"
                    /> */}
                    {/* <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text
                        fontSize="sm"
                        textTransform="capitalize"
                        fontWeight="600"
                        letterSpacing="1px"
                        fontFamily="sans-serif"
                      >
                        {fname + " " + lname}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.600"
                        textTransform="lowercase"
                        fontWeight="500"
                      >
                        {user.replace("_", " ")}
                      </Text>
                    </VStack> */}
                    {/* <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box> */}
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    color="red.500"
                    fontWeight="700"
                    onClick={handleLogOut}
                  >
                    <Icon as={FaSignOutAlt} color="gray.500" mr="5" />
                    Log out
                  </MenuItem>
                  {tenantUserId && enableBackTrack && (<MenuItem
                    color="#062D59"
                    fontWeight="700"
                    onClick={handleBackToTenant}
                  >
                    <Icon as={IoArrowBackOutline } color="gray.500" mr="5" />
                    Back to Tenant
                  </MenuItem>)}
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <TimeDisplay />
        </VStack>
      </Flex>
      <Box as="main" p="20px" m={"auto"} mb={0} onMouseEnter={handleChildBox}>
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;
