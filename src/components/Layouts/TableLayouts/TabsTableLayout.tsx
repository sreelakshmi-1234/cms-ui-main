import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { TimeWindow } from '../../../Services/TimeWindow';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { MdFullscreen } from 'react-icons/md';
import { ExpandIcon, SqeezIcon } from '../../../assets/Icons';
import { GoClock } from 'react-icons/go';
import { EnlargeWidth } from '../../../Services/EnlargeWidget';
import { HiOutlineDotsVertical } from 'react-icons/hi';

// Define the shape of the export functions
interface ExportFunctions {
  exportPNG: () => void;
  exportCSV: () => void;
}

interface TabsTableLayoutProps {
  tabs : string[];
  dotColors : string[];
  childrens : React.ReactNode[];
  title: string;
  bg? : string;
  width: string[];
  height: string | number;
  px? : string;
  fullscreen? : boolean;
  paginationLimitProps? : number;
  timeWindow? : boolean;
  onTimeWindowChange?: (from: string, to: string, aggregate: string, interval : number) => void;
  onReset? : (Reset : boolean) => void;
  onExport?: ExportFunctions | null; // Optional since it might not be passed initially
  downloadOption?: boolean;
}

const TabsTableLayout: React.FC<TabsTableLayoutProps> = ({
   tabs,
   dotColors,
   childrens,
   title,
   bg,
   width,
   height,
   px,
   timeWindow,
   fullscreen,
   paginationLimitProps=8,
   onTimeWindowChange,
   onReset,
   onExport,
   downloadOption = true, 
  }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chartLayoutRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [paginationLimit, setPaginationLimit] = useState<number>(paginationLimitProps)
  // console.log(apiData)

  const handleFullScreen = () => {
    if (tableRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        (tableRef.current as HTMLElement)?.requestFullscreen();
        setPaginationLimit(20); // Increase pagination limit in fullscreen mode
        setIsFullscreen(true);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setPaginationLimit(paginationLimitProps);
        setIsFullscreen(false); // Exited fullscreen
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [paginationLimitProps]);

  const [currentTab, setCurrentTab] = useState(0);
  const currentColor = useColorModeValue("#062D59", "#fff");
  const currentBG = useColorModeValue("#fff","#131512");
  return (
    <Box
      ref={tableRef}
      w={width}
      h={height}
      borderRadius="5px"
      bgColor={useColorModeValue('white', '#131512')}
      p={3}
      px={px}
      mt={5}
      overflow={"hidden"}
      bg = {bg}
    >
      <HStack height={"56px"} spacing={0} justifyContent={"space-between"}>
        <HStack spacing={5} alignItems={"baseline"}>
          <Text 
          fontSize={"18px"}
          fontWeight={600} 
          color={useColorModeValue('#062D59', 'white')}
          //  mt ={-5}
          >
              {title}
          </Text>

          <Tabs isFitted 
            variant={"unstyled"} 
            border={"1px solid #DFDFDF"} 
            color={useColorModeValue('#062D59', 'white')}
          >
              <TabList bgSize={"xs"}>
              {
                  tabs.map((value, i) => (
                      <Tab 
                          mx={0} 
                          py={1}
                          w={"70px"}
                          fontSize={"12px"}
                          onClick={() => {setCurrentTab(i)}}
                          _selected={{bg : "#8CC73B"}}
                          >
                          {/* <span 
                              style={{width:"10px",height:"10px",backgroundColor:dotColors[i].toLowerCase(), display:"flex", borderRadius:"50%", marginRight:"7px"}}
                              ></span> */}
                          <Text>{value}</Text>
                      </Tab>
                  ))
              }
              </TabList>
          </Tabs>
        </HStack>
        <Flex alignItems={"flex-start"}>
          {/* Fullscreen Icon */}
          {fullscreen && (
            <IconButton
              aria-label="Fullscreen"
              icon={isFullscreen ? <SqeezIcon/> : <ExpandIcon />}
              onClick={handleFullScreen}
              variant="ghost"
              size={"xs"}
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
          )}
          {timeWindow && (
            <TimeWindow
            inFullScreen={isFullscreen}
            isOpen={isOpen}
            onClose={onClose}
            onReset={onReset || (() => {})}
            onSave={onTimeWindowChange || (() => {})}
            >
              <GoClock color={currentColor} size={isFullscreen ? EnlargeWidth(20) : 20} />
            </TimeWindow>
          )}
          {/* Menu Icon */}
          {downloadOption && (<Menu placement='left-start'>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HiOutlineDotsVertical size={20} />}
              variant='ghost'
              size={"xs"}
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
            <MenuList placeItems={"flex-start"} placeContent={'flex-start'}>
              <MenuItem onClick={() => onExport?.exportPNG()}>Download PNG</MenuItem>
              <MenuItem onClick={() => onExport?.exportCSV()}>Download CSV</MenuItem>
            </MenuList>
          </Menu>)}
          {/* Use Portal to render the modal within the fullscreen container */}
        <Portal containerRef={chartLayoutRef}>
            <TimeWindow 
                isOpen={isOpen} 
                onClose={onClose} 
                onSave={onTimeWindowChange || (()=>{})} 
                onReset={onReset || (() => {})}
            />
        </Portal>

        </Flex>
      </HStack>
            <Box as='main' pb={6} height={"full"} width={"full"} _dark={{color : "white"}} ref={chartLayoutRef}>
                {/* Pass the isFullscreen state to children */}
                { childrens.map((children, index) => currentTab == index ? (
                  (React.isValidElement(children) &&
                  React.cloneElement(children as React.ReactElement<any>, {
                  isFullscreen,
                  }))
                  ) : " ")
                }

                {/* {fullscreen && <Icon 
                as={MdFullscreen}
                boxSize={5} 
                float={"right"} 
                pos={"relative"} 
                bottom={"42px"} 
                onClick={handleFullScreen}
                _fullScreen={{
                    bottom : "45px"
                }}
                cursor={"pointer"}
                />} */}
            </Box>
    </Box>
  );
};

export default TabsTableLayout;
