import { Box, Flex, FormControl, FormLabel, useColorModeValue } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../Services/EnlargeWidget";

interface ReportSelectorType {
    handleOptionChange : (option : any) => void
}

const ReportSelector : React.FC <ReportSelectorType> = ({handleOptionChange}) => {
    const handleChange = (option : any) => {
        handleOptionChange(option)
    }

    const options = [
        {value : 0, label : "Inverter Power Report"},
        {value : 1, label : "Inverter Energy Report"},
        {value : 2, label : "WMS Report"},
        {value : 3, label : "DG Power Report"},
        {value : 4, label : "Grid Meter Report"},
        {value : 5, label : "Plant Meter Report"},
        {value : 6, label : "BESS Report"},
        {value : 7, label : "SMB Report"},
        {value : 8, label : "Plant Report"},
        // {value : 9, label : "Monthly Inverter wise Generation"},
        // {value : 10, label : "Monthly DG wise Generation"}

    ];
    
    const currentColor = useColorModeValue("#062D59", "#fff");
    const currentBG = useColorModeValue("#fff","#131512");
    return(
        <Box
            w={"1176px"}
        >
            <Flex width={"1176px"} justify={"center"}>
                <FormControl width={["300px", "400px"]}>
                    <FormLabel fontWeight={200} fontSize={10}>
                        Select Report
                    </FormLabel>
                    <Box fontWeight={600} fontSize={12 + "px"}>
                        <Select 
                            isMulti={false}
                            placeholder={"Select Report"}
                            closeMenuOnSelect={true}
                            variant="outline"
                            focusBorderColor="green.500"
                            options={options}
                            selectedOptionColorScheme="green"
                            onChange={handleChange}
                            defaultValue={options[0]}
                            chakraStyles={{
                                menuList : (provided) => ({
                                  ...provided,
                                  backgroundColor : currentBG,
                                  color : currentColor,
                                  fontSize : "18px"
                                }),
                                option : (provided, state) => ({
                                  ...provided,
                                  bgColor : "transparent"
                                })
                              }}
                        />
                    </Box>
                </FormControl>
            </Flex>
        </Box>
    );
};

export default ReportSelector;