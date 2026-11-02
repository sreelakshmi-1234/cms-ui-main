import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { EnlargeWidgetSize } from '../Services/EnlargeWidget';
import { formatInTimeZone } from 'date-fns-tz';

function TimeDisplay() {
  const [time, setTime] = useState(new Date());
  const SelectedTimezone = localStorage.getItem("SelectedTimezone") || 'Asia/Calcutta';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Text fontSize={"8px"} fontWeight={400} color={"#9BABBD"}>{formatInTimeZone(time, 'UTC', 'yyyy-MM-dd HH:mm:ss.SSS').split(".")[0]} (UTC)</Text>
      <Text fontSize={"8px"} fontWeight={400} color={"#9BABBD"}>{formatInTimeZone(time, SelectedTimezone, 'yyyy-MM-dd HH:mm:ss.SSS').split(".")[0]} ({SelectedTimezone})</Text>
    </Box>
  );
}

export default TimeDisplay;