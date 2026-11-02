import { Grid, GridItem } from "@chakra-ui/react"
import KPIProgressBarLayout from "./KPIProgressBarLayout";
import UseBatteryStatus from "../../../../../Services/Hooks/Battery/UseBatteryStatus";



const KPIProgressBars = () => {
    // **************************** CARDS ******************

    var search = {
        devName : "PCS",
        keys : "ESS_SOC,kWhdischarged_Day,ESS_Rated_Ah,ESS_DC_Amps",
    }
    const batteryStatus = UseBatteryStatus(search) || [0,0,0,0];

    var search1 = {
        devName : "PCS",
        keys : "ESS_SOC",
        special : "7daysSOCavg"
    }
    const batteryStatusSoc = UseBatteryStatus(search1) || [0];
    // console.log(1, batteryStatusSoc)

    // var search2 = {
    //     devName : "inverter-1",
    //     keys : "yet to decide",
    //     special : "temp30"
    // }
    // const batteryStatus2 = UseBatteryStatus(search2) || [0];
    // console.log(2, batteryStatus2)

     var search3 = {
        devName : "Calculation",
        keys : "PCS_Availability",
     }
     const batteryStatusAvail = UseBatteryStatus(search3) || [0]
    return (
        <Grid
            templateRows={["repeat(1, 1fr)","repeat(2, 1fr)"]}
            templateColumns={["repeat(1, 1fr)","repeat(4, 1fr)"]}
            gap={5}
            mt={5}
            ml={[-3,0]}
        >
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='Depth of Discharge'
                    value={100 - batteryStatus[0]}
                    unit="%"
                    barColor="#FFECDE"
                    filledColor="#FFB27D"
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='DC Discharge Energy'
                    value={batteryStatus[1]}
                    unit="kWh"
                    srcMax={470}
                    barColor="#C9FFFC"
                    filledColor="#30EFE5"
                    percentWhenValueInFill={30}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='Reliability'
                    value={parseFloat((((24 - (0*0))/24)*100).toFixed(2))} // 2 (failure rate) * 5 (avg repair time) = prev
                    unit="%"
                    barColor="#C9E4FF"
                    filledColor="#63B1FF"
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='Availability'
                    value={batteryStatusAvail[0]}
                    unit="%"
                    barColor="#C9FFE7"
                    filledColor="#42E69D"
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='Average SOC'
                    secondaryTitle='(7 days)'
                    value={batteryStatusSoc[0]}
                    unit="%"
                    barColor="#EBC9FF"
                    filledColor="#DA9FFC"
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='Resting SOC'
                    value={78} // Dummy Value, needs to create logic by sir
                    unit="%"
                    barColor="#FFD4DE"
                    filledColor="#FF7B98"
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='Average C-Rate'
                    value={parseFloat((batteryStatus[3] / batteryStatus[2]).toFixed(2)) || 0} 
                    unit="%"
                    barColor="#FFEEAA"
                    filledColor="#FFC30D"
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <KPIProgressBarLayout
                    title='Temperature' // within Warranty Range
                    value={91} // Dummy Value = pending by sir
                    unit="%"
                    barColor="#FFC9FF"
                    filledColor="#FF9DFF"
                />
            </GridItem>
            
        </Grid>
    );
};

export default KPIProgressBars