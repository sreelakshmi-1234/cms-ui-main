import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  Portal,
  Tabs,
  TabList,
  Tab,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { TimeWindow } from '../../../Services/TimeWindow';
import { MdFullscreen } from 'react-icons/md';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import InfoSymbol from '../InfoSymbolLayout';
import { EnlargeWidgetSize, EnlargeWidth } from '../../../Services/EnlargeWidget';
import { ExpandIcon, SqeezIcon } from '../../../assets/Icons';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GoClock } from 'react-icons/go';
import { windowSetting } from './GraphLayout';

// Define the shape of the export functions
interface ExportFunctions {
  exportPNG: () => void;
  exportCSV: () => void;
}

interface TabsGraphLayoutProps {
  childrens: React.ReactNode[];
  tabs: string[];
  dotColors: string[];
  title?: string;
  titleLengthSVG?: number;
  titleLengthLongSVG?: number;
  initTimeTitle?: string;
  bg?: string;
  border?: string;
  icon?: IconType | undefined;
  fullScreen?: boolean | false;
  width: string[] | number[];
  height: string | string[];
  mt?: string;
  px?: string;
  overflow?: string;
  infoSymbol?: boolean;
  timeWindow?: boolean;
  onTimeWindowChange?: (
    from: string,
    to: string,
    aggregate: string,
    interval: number,
    setting: windowSetting
  ) => void;
  onReset?: (Reset: boolean) => void;
  WidgetProps?: any;
  contentProps?: any;
  onExport?: ExportFunctions | null; // Optional since it might not be passed initially
  downloadOption?: boolean;
  setFullscreen? : (full : boolean) => void;
}

const TabsChartLayout: React.FC<TabsGraphLayoutProps> = ({
  childrens,
  tabs,
  dotColors,
  title,
  titleLengthSVG = 102,
  titleLengthLongSVG = 413,
  initTimeTitle,
  bg,
  border,
  icon,
  fullScreen,
  width,
  height,
  mt,
  px,
  overflow,
  infoSymbol = false,
  timeWindow,
  onTimeWindowChange,
  onReset,
  WidgetProps,
  contentProps,
  onExport,
  downloadOption = true,
  setFullscreen,
}) => {
  const iconColor = useColorModeValue('#004F86', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Full Screen Logic
  const TabsGraphLayoutRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    if (TabsGraphLayoutRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
        if(setFullscreen) {
          setIsFullscreen(true)
        }
      } else {
        TabsGraphLayoutRef.current.requestFullscreen();
        setIsFullscreen(true);
        if(setFullscreen) {
          setIsFullscreen(true)
        }
      }
    }
  };

  // Handle exit fullscreen via ESC key or other methods
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false); // Exited fullscreen
      if(setFullscreen) {
        setIsFullscreen(true)
      }
    }
  };

  // Add event listener for fullscreen change
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const [currentTab, setCurrentTab] = useState<number>(0);
  const currentColor = useColorModeValue("#062D59", "#fff");
  const currentBG = useColorModeValue("#fff", "#131512");
  return (
    <Box
      ref={TabsGraphLayoutRef}
      w={isFullscreen ? '100vw' : width} // Adjust width dynamically
      h={isFullscreen ? '100vh' : height} // Adjust height dynamically
      borderRadius="0px" //5px
      border={border}
      bgColor={useColorModeValue('white', '#131512')}
      p={3}
      px={px}
      mt={5}
      //   boxShadow="md"
      overflow={'hidden'}
      bg={bg}
      {...WidgetProps}
    >
      <Flex justifyContent={'space-between'} alignItems="center">
        <HStack>
          {icon && <Icon as={icon} boxSize={5} color={iconColor} />}
          <Text
            fontSize={"18px"}
            fontWeight={600}
            color={useColorModeValue('#062D59', 'white')}
            pl={2}
          >
            {title}
          </Text>

          {/* <Tabs isFitted variant={"soft-rounded"} colorScheme='purple' mt={0}>
             <TabList bgSize={"xs"}>
            {
                tabs.map((value, i) => (
                    <Tab
                        mx={1} 
                        px={3}
                        fontSize={EnlargeWidgetSize(12)}
                        onClick={() => {setCurrentTab(i)}}
                        >
                        <span 
                            style={{width: EnlargeWidgetSize(10) + "px",height: EnlargeWidgetSize(10) + "px",backgroundColor:dotColors[i].toLowerCase(), display:"flex", borderRadius:"50%", marginRight:EnlargeWidgetSize(7) + "px"}}
                            ></span>
                        <Text>{value}</Text>
                    </Tab>
                ))
            }
            </TabList>
         </Tabs> */}
        </HStack>
        <Flex align={'center'} gap={1}>
          {infoSymbol && <Box mr={2} cursor={"pointer"}>
            <InfoSymbol>
              <BsFillInfoCircleFill />
            </InfoSymbol>
          </Box>}
          {/* Initial Title Time */}
          {initTimeTitle &&
            <Text color={"#999"} fontSize={8}>{initTimeTitle}</Text>
          }
          {/* Fullscreen Icon */}
          {fullScreen && (
            <IconButton
              aria-label="Fullscreen"
              icon={isFullscreen ? <SqeezIcon /> : <ExpandIcon />}
              onClick={handleFullScreen}
              variant="ghost"
              size={"xs"}
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
          )}
          {/* Time Window Icon */}
          {timeWindow && (
            <TimeWindow
              isOpen={isOpen}
              onClose={onClose}
              onReset={onReset || (() => { })}
              onSave={onTimeWindowChange || (() => { })}
            >
              <GoClock color={currentColor} size={20} />
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
        </Flex>
      </Flex>

      <Flex align={'flex-start'} my={1}>
        <HStack>
          {titleLengthSVG && <svg width={`${isFullscreen ? EnlargeWidth(29) : 29}`} height="3" viewBox={`0 0 ${isFullscreen ? EnlargeWidth(29) : 29} 3`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d={`M${isFullscreen ? EnlargeWidth(29) : 29} 3H1L0 0H${isFullscreen ? EnlargeWidth(29) : 29}V3Z`} fill="#07DBFA" />
          </svg>}
          <svg width={isFullscreen ? EnlargeWidth(titleLengthSVG) : titleLengthSVG} height="1" viewBox={`0 0 ${isFullscreen ? EnlargeWidth(titleLengthSVG) : titleLengthSVG} 1`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={`M0 1V0H${isFullscreen ? EnlargeWidth(titleLengthSVG) : titleLengthSVG}V1H0Z`} fill="#DFDFDF" />
          </svg>
        </HStack>
        {/* 413 default width */}
        <Box mt={-1}>
          <svg width={isFullscreen ? EnlargeWidth(1110) : titleLengthLongSVG} height="6" viewBox={`0 0 ${isFullscreen ? EnlargeWidth(1110) : titleLengthLongSVG} 6`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d={`M0 5V6H4.20711L13.2071 1H18H${isFullscreen ? EnlargeWidth(1110) : titleLengthLongSVG}V0H18H12.7929L3.79289 5H0Z`} fill="#DFDFDF" />
          </svg>
        </Box>
      </Flex>

      {/* Use Portal to render the modal within the fullscreen container */}
      {/* <Portal containerRef={TabsGraphLayoutRef}>
        <TimeWindow
          isOpen={isOpen}
          onClose={onClose}
          onReset={onReset || (() => {})}
          onSave={onTimeWindowChange || (() => {})}
        />
      </Portal> */}

      <Box
        as="main"
        pb={6}
        height={'full'}
        width={'full'}
        mt={mt}
        _dark={{ color: 'white' }}
        overflow={overflow}
      >
        {/* Tabs Options */}
        <Tabs isFitted
          variant={"unstyled"}
          size={"sm"}
          width={"214px"}
          border={"1px solid #DFDFDF"}
          color={useColorModeValue('#062D59', 'white')}
        >
          <TabList>
            {
              tabs.map((value, i) => (
                <Tab
                  mx={0}
                  px={1}
                  fontSize={"10px"}
                  onClick={() => { setCurrentTab(i) }}
                  _selected={{ bg: "#8CC73B" }}
                >
                  {/* <span 
                            style={{width: EnlargeWidgetSize(10) + "px",height: EnlargeWidgetSize(10) + "px",backgroundColor:dotColors[i].toLowerCase(), display:"flex", borderRadius:"50%", marginRight:EnlargeWidgetSize(7) + "px"}}
                            ></span> */}
                  <Text>{value}</Text>
                </Tab>
              ))
            }
          </TabList>
        </Tabs>

        {/* Pass the isFullscreen state to children */}
        {childrens.map((children, index) => currentTab == index ? (

          (React.isValidElement(children) &&
            React.cloneElement(children as React.ReactElement<any>, {
              isFullscreen,
            }))
        ) : " ")
        }
      </Box>
    </Box>
  );
};

export default TabsChartLayout;
