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
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { TimeWindow } from '../../../Services/TimeWindow';
import { MdFullscreen } from 'react-icons/md';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import InfoSymbol from '../InfoSymbolLayout';
import { EnlargeWidgetSize } from '../../../Services/EnlargeWidget';
import { windowSetting } from './GraphLayout';

interface TabsChartLayoutProps {
  childrens: React.ReactNode[];
  tabs : string[];
  dotColors : string[];
  title?: string;
  initTimeTitle? : string;
  bg?: string;
  border? : string;
  icon?: IconType | undefined;
  fullScreen?: boolean | false;
  width: string[] | number[];
  height: string | string[];
  mt? : string;
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
}

const TabsChartLayout: React.FC<TabsChartLayoutProps> = ({
  childrens,
  tabs,
  dotColors,
  title,
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
  infoSymbol=false,
  timeWindow,
  onTimeWindowChange,
  onReset,
}) => {
  const iconColor = useColorModeValue('#004F86', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Full Screen Logic
  const TabschartLayoutRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    if (TabschartLayoutRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        TabschartLayoutRef.current.requestFullscreen();
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

  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <Box
      ref={TabschartLayoutRef}
      w={isFullscreen ? '100vw' : width} // Adjust width dynamically
      h={isFullscreen ? '100vh' : height} // Adjust height dynamically
      borderRadius="5px"
      border={border}
      bgColor={useColorModeValue('white', 'gray.800')}
      p={3}
      px={px}
      mt={5}
      boxShadow="md"
      overflow={'hidden'}
      bg={bg}
    >
      <Flex justifyContent={'space-between'} alignItems="center">
        <HStack>
          {icon && <Icon as={icon} boxSize={5} color={iconColor} />}
          <Text
            fontSize={['sm', 'sm', 'sm', 'sm', 'sm', 'md']}
            fontFamily={'inter'}
            fontWeight={600}
            color={useColorModeValue('#004F86', 'white')}
            letterSpacing={1}
          >
            {title}
          </Text>
          {initTimeTitle && 
            <Text color={"#999"} fontSize={8}>{initTimeTitle}</Text>
          }
          <Tabs isFitted variant={"soft-rounded"} colorScheme='purple' mt={0}>
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
         </Tabs>
        </HStack>
        <HStack spacing={2}>
          {infoSymbol && <Box mr={2} cursor={"pointer"}>
            <InfoSymbol>
              <BsFillInfoCircleFill />
            </InfoSymbol>
          </Box>}
          {/* Fullscreen Icon */}
          {fullScreen && (
            <IconButton
              aria-label="Fullscreen"
              icon={<MdFullscreen />}
              onClick={handleFullScreen}
              boxSize={5}
              variant="ghost"
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
          )}
          {/* Time Window Icon */}
          {timeWindow && (
            <IconButton
              aria-label="Time Window"
              icon={<RxCounterClockwiseClock />}
              onClick={onOpen}
              variant="ghost"
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
          )}
        </HStack>
      </Flex>

      {/* Use Portal to render the modal within the fullscreen container */}
      <Portal containerRef={TabschartLayoutRef}>
        <TimeWindow
          isOpen={isOpen}
          onClose={onClose}
          onReset={onReset || (() => {})}
          onSave={onTimeWindowChange || (() => {})}
        />
      </Portal>

      <Box
        as="main"
        pb={6}
        height={'full'}
        width={'full'}
        mt={mt}
        _dark={{ color: 'white' }}
        overflow={overflow}
        >
        {/* Pass the isFullscreen state to children */}
        { childrens.map((children, index) => currentTab == index ? (

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
