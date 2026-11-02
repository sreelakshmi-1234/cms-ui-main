import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTimeHandle } from "../../../Services/TimeWindowSetting";
import UseBESSDaily from "../../../Services/Hooks/Battery/UseBESSDaily";
import GraphLayout from "./GraphLayout";
import LineChart from "../../widgets/charts/LineChart";

interface ChartOnModalType {
    isOpen: boolean;
    onClose: () => void;
    devName : string;
}

// Define the shape of the export functions
interface ExportFunctions {
    exportPNG: () => void;
    exportCSV: () => void;
  }

function keySelection(device : string) {
    const InverterKeys = "AC_Active_Power_Watt,AC_Reactive_VAr,AC_Apparant_Power_VA";
    const DGKeys = "AC_Active_Power_Watt,AMP_L1,AMP_L2,AMP_L3";
    const GridKeys = "Grid_Power_kW,Bus_B_voltage_L1_L2,Bus_B_voltage_L2_L3,Bus_B_voltage_L3_L1,Grid_AVG_Frequency";
    const PCSKeys = "AC_Active_Power_Watt,AC_Reactive_Power_var";
    const COMKeys = "PV_Power_kW,Plant_Active_Power_reference";
    const WMSKeys = "Inst_POA,Inst_GHI"
    switch (device) {
        case "inverter":
            return [InverterKeys, ["Active Power", "Reactive Power", "Apparent"]];
            break;
        case "grid meter":
            return [GridKeys, ["Grid Power", "Voltage L1 L2", "Voltage L2 L3", "Voltage L2 L1", "Frequency"]];
            break;
        case "dg":
            return [DGKeys, ["Active Power", "AMP L1", "AMP L2", "AMP L3"]];
            break;
        case "pcs":
            return [PCSKeys, ["Active Power", "Reactive Power"]];
            break;
        case "wms":
            return [WMSKeys, ["POA W/m2", "GHI W/m2"]];
            break;
        case "com100":
            return [COMKeys, ["PV Power", "Setpoint"]];
            break;
    
        default:
            return [InverterKeys, ["Active Power", "Reactive Power", "Apparent"]];
            break;
    }
}

const ChartOnModal: React.FC<ChartOnModalType> = ({ isOpen, onClose, devName }) => {

    // ******************Modal Chart *******************
    const {
        timeWindow: timeWindowModalChart,
        handleTimeWindowChange: handleTimeWindowModalChartChange,
        handleReset: ModalChartHandleReset
    } = useTimeHandle(1, "cdsf", "NONE", [5, "minute"]);


    let details = keySelection(devName.split("-")[0].toLowerCase());
    
    var searchTagModalChart = {     
        devName : devName,
        keys: details[0],
        type : ["spline", "spline", "spline", "spline"],
        name : details[1],
        marker : false
    };
    // const ModalChartColor = ["#3853A5", "#F4B725"];
    const ModalChartData = UseBESSDaily(searchTagModalChart, timeWindowModalChart);
    // Resizing Logic
        const [scale, setScale] = useState(1);
    
        useEffect(() => {
            const updateScale = () => {
                const baseWidth = 1280; // Your design's base resolution width
                const baseHeight = 832; // Your design's base resolution height
                const currentWidth = window.innerWidth;
                const currentHeight = window.innerHeight;
    
                // Calculate scale factor based on width or height
                const widthScale = currentWidth / baseWidth;
                const heightScale = currentHeight / baseHeight;
                const scaleFactor = Math.max(widthScale, heightScale); // Maintain aspect ratio
    
                setScale(scaleFactor);
            };
    
            updateScale(); // Initial scale calculation
            window.addEventListener("resize", updateScale); // Update on window resize
            return () => window.removeEventListener("resize", updateScale);
        }, []);
            const [exportFunctions, setExportFunctions] = useState<ExportFunctions | null>(null);
        

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size={"6xl"}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
            />
            <ModalContent
            sx={{
                transform : `scale(${scale}) !important`
            }}
            >
                <ModalHeader>{devName} Chart</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <GraphLayout
                        title=""
                        titleLengthLongSVG={0}
                        titleLengthSVG={0}
                        width={["full", "full"]}
                        height={"50vh"}
                        timeWindow={false}
                        onTimeWindowChange={handleTimeWindowModalChartChange}
                        onReset={ModalChartHandleReset}
                        fullScreen={false}
                        bg="transparent"
                        boxShadow="none"
                        onExport={exportFunctions}
                    >
                        <LineChart 
                            height={300} 
                            apiData={ModalChartData || []} 
                            onExportReady={setExportFunctions}
                        />
                    </GraphLayout>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ChartOnModal;
