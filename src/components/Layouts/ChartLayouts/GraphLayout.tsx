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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Button,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { TimeWindow } from '../../../Services/TimeWindow';
import { GoClock } from "react-icons/go";
import { BsFillInfoCircleFill } from 'react-icons/bs';
import InfoSymbol from '../InfoSymbolLayout';
import { EnlargeHeight, EnlargeWidgetSize, EnlargeWidth } from '../../../Services/EnlargeWidget';
import { ExpandIcon, SqeezIcon } from '../../../assets/Icons';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { FaAngleDown } from 'react-icons/fa';



// Define the shape of the export functions
interface ExportFunctions {
  exportPNG: () => void;
  exportCSV: () => void;
}

// Time window settings
export interface windowSetting {
    selectedTab: "live" | "history",
    humanInteraction: boolean,
    live: {
        timeResolution: number;
        intervalResolution: number;
        timeResolutionName: string | undefined;
        intervalResolutionName: string;
    },
    history: {
        startTs: string | null;
        endTs: string | null;
        intervalResolution: number;
        intervalResolutionName: string;
    }
}

interface GraphLayoutProps {
  children: React.ReactNode;
  title?: string;
  titleFontSize?: string;
  titleLengthSVG? : number;
  titleLengthLongSVG? : number;
  initTimeTitle? : string;
  bg?: string;
  boxShadow? : string;
  border? : string;
  icon?: IconType | undefined;
  fullScreen?: boolean | false;
  width: string[] | number[];
  height: string | string[];
  mt? : string | any[];
  px?: string;
  overflow?: string;
  infoSymbol? : boolean;
  timeWindow?: boolean;
  onTimeWindowChange?: (
    from: string,
    to: string,
    aggregate: string,
    interval: number,
    setting: windowSetting
  ) => void;
  onReset?: (Reset: boolean) => void;
  WidgetProps? : any;
  contentProps? : any;
  onExport?: ExportFunctions | null; // Optional since it might not be passed initially
  downloadOption? : boolean;
  inProgress? : boolean;
  preDefineTimeInvterval? : boolean;
  setCurrentWidgetInterval? : (interval : "daily" | "month" | "year") => void;
}

const GraphLayout: React.FC<GraphLayoutProps> = ({
  children,
  title,
  titleFontSize="18px",
  titleLengthSVG=102,
  titleLengthLongSVG=413,
  initTimeTitle,
  bg,
  // boxShadow,
  border,
  icon,
  fullScreen,
  width,
  height,
  mt,
  px,
  overflow,
  infoSymbol=false,
  timeWindow,
  onTimeWindowChange,
  onReset,
  WidgetProps,
  contentProps,
  onExport,
  downloadOption=true,
  inProgress=false,
  preDefineTimeInvterval=false,
  setCurrentWidgetInterval
}) => {
  const iconColor = useColorModeValue('#004F86', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Full Screen Logic
  const GraphLayoutRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    if (GraphLayoutRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        GraphLayoutRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  };

  // Handle exit fullscreen via ESC key or other methods
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false); // Exited fullscreen
    }
  };

  // Add event listener for fullscreen change
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  //   Interval Selection
  const [currentInterval, setCurrentInterval] = useState<"daily" | "month" | "year">("daily");

  function handleSelectInterval(interval : "daily" | "month" | "year") : void {
      setCurrentInterval(interval);
      if(setCurrentWidgetInterval && preDefineTimeInvterval) {
        setCurrentWidgetInterval(interval);
      }
  }

  const currentColor = useColorModeValue("#062D59", "#fff");
  const currentBG = useColorModeValue("#fff","#131512");
  return (
    <Box
      ref={GraphLayoutRef}
      w={isFullscreen ? '1176px' : width} // Adjust width dynamically
      h={isFullscreen ? '100vh' : height} // Adjust height dynamically
      borderRadius="0px" //5px
      border={border}
      bgColor={useColorModeValue('white', '#131512')}
      p={3}
      px={px}
      mt={5}
      // boxShadow={boxShadow ? boxShadow : "md"}
      overflow={'hidden'}
      bg={bg}
      {...WidgetProps}
    >
      <Flex justifyContent={'space-between'} alignItems="center">
        <HStack>
          {icon && <Icon as={icon} boxSize={5} color={iconColor} />}
          <Text
            fontSize={isFullscreen ? EnlargeHeight(18) + "px" : titleFontSize}
            fontWeight={600}
            color={useColorModeValue('#062D59', 'white')}
            pl={2}
          >
            {title}
          </Text>
        </HStack>
        <Flex align={'center'} gap={1}>
          {infoSymbol && <Box mr={2} cursor={"pointer"}>
            <InfoSymbol>
              <BsFillInfoCircleFill size={isFullscreen ? EnlargeWidth(20) : 20} />
            </InfoSymbol>
          </Box>}
          {/* In Progress Status */}
          {inProgress &&
            <Badge fontWeight={300}>In Progress</Badge>
          }
          {/* Init Title Name */}
          {initTimeTitle && 
            <Text color={"#9BABBD"} fontSize={"10px"} mr={2}>{initTimeTitle}</Text>
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
            inFullScreen={isFullscreen}
            isOpen={isOpen}
            onClose={onClose}
            onReset={onReset || (() => {})}
            onSave={onTimeWindowChange || (() => {})}
            >
              <GoClock color={currentColor} size={isFullscreen ? EnlargeWidth(20) : 20} />
            </TimeWindow>
          )}
          {/* Pre DefineTime Invterval */}
          {preDefineTimeInvterval && (<Menu placement="bottom-end">
            <MenuButton as={Button} rounded={"none"} size={"xs"} px={"10px"} py={"6px"} fontSize={"10px"} fontWeight={500} bg={"#F5F7F8"} rightIcon={<FaAngleDown fontWeight={500} />} _active={{ opacity: 0.6 }}>
              <Text textTransform={"capitalize"}>{currentInterval}</Text>
            </MenuButton>
            <MenuList fontSize={"10px"} width={"50px"} fontWeight={400} color={currentColor} >
              <MenuItem p={"10px"} onClick={() => handleSelectInterval("daily")}>Daily</MenuItem>
              <MenuItem p={"10px"} onClick={() => handleSelectInterval("month")}>Month</MenuItem>
              <MenuItem p={"10px"} onClick={() => handleSelectInterval("year")}>Year</MenuItem>
            </MenuList>
          </Menu>)}
          {/* Menu Icon */}
          {downloadOption && (<Menu placement='end-start'>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HiOutlineDotsVertical size={isFullscreen ? EnlargeWidth(20) : 20} />}
              variant='ghost'
              size={"xs"}
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
            <Portal>
              <MenuList boxSize={"min-content"} placeItems={"flex-start"} placeContent={'flex-start'}>
                <MenuItem fontSize={"12px"} onClick={ () => onExport?.exportPNG()}>Download PNG</MenuItem>
                <MenuItem fontSize={"12px"} onClick={() => onExport?.exportCSV()}>Download CSV</MenuItem>
              </MenuList>
            </Portal>
          </Menu>)}
        </Flex>
      </Flex>
      <Flex align={'flex-start'} my={1}>
        <HStack>
          {titleLengthSVG && <svg width={`${isFullscreen ? EnlargeWidth(29) : 29}`} height="3" viewBox={`0 0 ${isFullscreen ? EnlargeWidth(29) : 29} 3`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d={`M${isFullscreen ? EnlargeWidth(29) : 29} 3H1L0 0H${isFullscreen ? EnlargeWidth(29) : 29}V3Z`} fill="#07DBFA" />
          </svg>}
          <svg width={isFullscreen ? EnlargeWidth(titleLengthSVG) :titleLengthSVG} height="1" viewBox={`0 0 ${isFullscreen ? EnlargeWidth(titleLengthSVG) :titleLengthSVG} 1`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={`M0 1V0H${isFullscreen ? EnlargeWidth(titleLengthSVG) :titleLengthSVG}V1H0Z`} fill="#DFDFDF" />
          </svg>
        </HStack>
          {/* 413 default width */}
          <Box mt={-1}>
            <svg width={isFullscreen ? titleLengthLongSVG ? EnlargeWidth(1750) : 0 : titleLengthLongSVG} height="6" viewBox={`0 0 ${isFullscreen ? titleLengthLongSVG ? EnlargeWidth(1110) : 0 : titleLengthLongSVG} 6`}fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d={`M0 5V6H4.20711L13.2071 1H18H${isFullscreen ? titleLengthLongSVG ? EnlargeWidth(1110) : 0 : titleLengthLongSVG}V0H18H12.7929L3.79289 5H0Z`} fill="#DFDFDF"/>
            </svg> 
          </Box>
      </Flex>

      {/* Use Portal to render the modal within the fullscreen container */}
      {/* <Portal containerRef={GraphLayoutRef}>
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
        height={'100%'}
        width={'100%'}
        mt={mt}
        _dark={{ color: 'white' }}
        overflow={overflow}
        {...contentProps}
      >
        {/* Pass the isFullscreen state to children */}
        {React.isValidElement(children) &&
          React.cloneElement(children as React.ReactElement<any>, {
            isFullscreen,
          })}
      </Box>
    </Box>
  );
};

export default GraphLayout;
