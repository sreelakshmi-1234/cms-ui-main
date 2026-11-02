import { Box, Image, Text } from "@chakra-ui/react";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../../Services/EnlargeWidget";
import React from "react";

interface MultipleStaticValuesCardType {
    title? : string;
    value : number | string;
    props? : any;
    titleProps? : any;
    valueProps? : any;
}

export const MainValueCard : React.FC <MultipleStaticValuesCardType> = ({ title, value, props, titleProps, valueProps}) => {
    return (
        <Box 
            width={EnlargeWidgetSizeWidth(235)} 
            height={EnlargeWidgetSize(48.5) + "px"}
            fontFamily={"inter"}
            px={1}
            rounded={3}
            shadow={"lg"}
            bg={"#194a7a"}
            {...props}
        >
            <Text color={"#d1dbe4"} textAlign={"left"} textTransform={"uppercase"} fontSize={EnlargeWidgetSize(8)} letterSpacing={1} {...titleProps}>{title || "Enter Title"}</Text>
            <Text color={"#FFFFFF"} mt={-1} fontWeight={300} textAlign={"center"} fontSize={EnlargeWidgetSize(24)} {...valueProps}>{value}</Text>
        </Box>
    );
}

export const AvgValueCard : React.FC <MultipleStaticValuesCardType> = ({ value, props, titleProps, valueProps}) => {
    return (
        <Box 
            width={EnlargeWidgetSizeWidth(115)} 
            height={EnlargeWidgetSize(48.5) + "px"}
            fontFamily={"inter"}
            px={1}
            rounded={3}
            shadow={"lg"}
            bg={"#194a7a"}
            {...props}
        >
            <Text color={"#d1dbe4"} textAlign={"left"} textTransform={"uppercase"} fontSize={EnlargeWidgetSize(8)} letterSpacing={1} {...titleProps}>Average</Text>
            <Text color={"#9bf6ff"} fontWeight={200} fontSize={EnlargeWidgetSize(16)} {...valueProps}>{value}</Text>
        </Box>
    );
}

export const PeakValueCard : React.FC <MultipleStaticValuesCardType> = ({ value, props, titleProps, valueProps}) => {
    return (
        <Box 
            width={EnlargeWidgetSizeWidth(115)} 
            height={EnlargeWidgetSize(48.5) + "px"}
            fontFamily={"inter"}
            px={1}
            rounded={3}
            shadow={"lg"}
            bg={"#194a7a"} //#008585
            {...props}
        >
            <Text color={"#d1dbe4"} textAlign={"left"} textTransform={"uppercase"} fontSize={EnlargeWidgetSize(8)} letterSpacing={1} {...titleProps}>Peak</Text>
            <Text color={"#ffa600"} fontWeight={200} fontSize={EnlargeWidgetSize(16)} {...valueProps}>{value}</Text>
        </Box>
    );
}

