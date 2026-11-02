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
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { TimeWindow } from '../../../Services/TimeWindow';
import { MdFullscreen } from 'react-icons/md';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import InfoSymbol from '../InfoSymbolLayout';
import { EnlargeWidgetSize } from '../../../Services/EnlargeWidget';
import { windowSetting } from './GraphLayout';

interface ChartLayoutProps {
  children: React.ReactNode;
  title?: string;
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
}

const ChartLayout: React.FC<ChartLayoutProps> = ({
  children,
  title,
  initTimeTitle,
  bg,
  boxShadow,
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
}) => {
  const iconColor = useColorModeValue('#004F86', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Full Screen Logic
  const chartLayoutRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    if (chartLayoutRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        chartLayoutRef.current.requestFullscreen();
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

  return (
    <Box
      ref={chartLayoutRef}
      w={isFullscreen ? '100vw' : width} // Adjust width dynamically
      h={isFullscreen ? '100vh' : height} // Adjust height dynamically
      borderRadius="5px"
      border={border}
      bgColor={useColorModeValue('white', 'gray.800')}
      p={3}
      px={px}
      mt={5}
      boxShadow={boxShadow ? boxShadow : "md"}
      overflow={'hidden'}
      bg={bg}
      {...WidgetProps}
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
            <Text color={"#999"} fontSize={EnlargeWidgetSize(8)} mt={1}>{initTimeTitle}</Text>
          }
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
      <Portal containerRef={chartLayoutRef}>
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

export default ChartLayout;
