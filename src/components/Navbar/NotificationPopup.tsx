import { Box, Button, Flex, Image, Popover, PopoverAnchor, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react";
import React from "react";
import UseNotificationData from "../../Services/Hooks/Notification/UseNotificationData";
import { useNavigate } from "react-router";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../../Services/EnlargeWidget";

const NotificationPopup: React.FC<{ children?: React.ReactNode }> = ({ children }) => {

    const navigate = useNavigate();
    function handleVeiwAll() {
      const authority = localStorage.getItem("authority");

      if(authority == "Customer Administrators") {
        navigate('/alarm');
      } else if(authority == "Customer Users") {
        navigate('/plantalarm');
      }
    }

    const RankingList = ["critical", "warning", "major", "minor"];
    const notificationCount : number = UseNotificationData(RankingList, true);
    const notificationData = UseNotificationData(RankingList);

  return (
    <Popover placement="bottom" isLazy>
      <PopoverTrigger>
        <Box as="span" display="inline-block" mt={notificationCount > 0 ? 0 : 2}>
          {
            notificationCount > 0? 
          <Box fontSize={EnlargeWidgetSize(10) + "px"} pos={"relative"}  top={2} left={2} color={"#FFFFFF"} bg={"red"} borderRadius={"100%"}>
            <Text pl={"3px"} fontWeight={500}>{notificationCount > 99 ? "99+" : notificationCount}</Text>
          </Box>
           : ""
          }
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent width={EnlargeWidgetSizeWidth(350) + "px"} height={"auto"} overflow={"hidden"} backdropFilter={"blur(13px) saturate(180%)"} bgColor={"rgba(255, 255, 255, 0.75)"}>
        <PopoverArrow />
        <PopoverHeader>
            <Text fontSize={EnlargeWidgetSize(16)} fontWeight={600} letterSpacing={0}>Notification</Text>
            <PopoverCloseButton />
        </PopoverHeader>
        <PopoverBody overflow={"auto"} scrollBehavior={"smooth"}>
          <Flex direction={"column"}>
            {notificationData? notificationData.map((value : any, i : any) => (
                <Box key={i} fontSize={EnlargeWidgetSize(14)} borderBottom={"1px solid #999"} pt={3}>
                    <Text fontWeight={500}>{i+1}. {value.subject}</Text>
                    <Text fontWeight={400} pl={5}>{value.text}</Text>
                    {value.alarmSeverity == "CRITICAL" ? <Text textAlign={"right"} fontWeight={600} letterSpacing={"1px"} fontFamily={"inter"} color={"red"}>Critical</Text> : <></>}
                    {value.alarmSeverity == "WARNING" ? <Text textAlign={"right"} fontWeight={600} letterSpacing={"1px"} fontFamily={"inter"} color={"yellow.500"}>Warning</Text> : <></>}
                    <Text textAlign={"right"} fontSize={EnlargeWidgetSize(10)} fontWeight={500} color={"#999"}>{new Date(value.createdTime).toLocaleDateString() + " " + new Date(value.createdTime).toLocaleTimeString()}</Text>
                </Box>
            )) : <center style={{background : "#FFF"}} ><Image src="https://www.cogneta.cloud/assets/notification-bell.svg" />Notification Box is Empty</center>}
          </Flex>
        </PopoverBody>
        <PopoverFooter>
            <Button colorScheme="green" width={"100%"} onClick={handleVeiwAll}>View All</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopup;
