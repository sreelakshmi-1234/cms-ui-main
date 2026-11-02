import React from "react";
import FieldsetLayout from "../Layouts/FieldsetLayout"
import UseBatteryStatus from "../../Services/Hooks/Battery/UseBatteryStatus";
import { useTimeHandle } from "../../Services/TimeWindowSetting";
import UseInverterStatus from "../../Services/Hooks/UseInverterStatus";
import UseLatestValueOfSameKeyMultipleDevice from "../../Services/Hooks/UseLatestValueOfSameKeyMultipleDevice";
import { EnlargeWidgetSize } from "../../Services/EnlargeWidget";

interface Fieldset_kW52860_Type {
    CUF_AC : number | string;
    CUF_DC : number | string;
    mod_temp : number | string;
    GHI : number | string;
    POA : number | string;
    Tilt : number | string;
    PR_Actual : number | string;
}

export const Fieldset_kW52860 : React.FC <Fieldset_kW52860_Type> = ({CUF_AC, CUF_DC, mod_temp, GHI, POA, Tilt, PR_Actual}) => {

    const searchPower = {
        devName : "Calculation",
        keys : "INV_Total_Power"
    };
    const PowerData = UseBatteryStatus(searchPower) || [0];

    return (
    <FieldsetLayout
                        fieldsetStyle={{
                            border : "2px solid #003F6B",
                            borderRadius : "5px",
                            fontFamily : "inter",
                            paddingBottom : "8px",
                            display : "flex",
                            justifyContent : "space-around",
                            marginTop : "-2px"
                        }}
                        legendStyle={{
                            fontWeight : 600,
                            color : "#004F86",
                            marginLeft : "10px",
                            padding : "7px",
                            paddingBottom : 0,
                        }}
                        legendContent={`${PowerData[0] ? (PowerData[0].toFixed(2)) : "0"} kW`}
                        labels = {[<label key="label1" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "column", padding : "0px 10px 0 5px", borderRight : "1px solid #B6B6B6"}}>
                            <span>CUF: AC/DC</span><span>{CUF_AC + "%"}/{CUF_DC + "%"}</span>
                        </label>,
                        // <label key="label2" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "column", padding : "0px 10px 0 15px", borderRight : "1px solid #B6B6B6"}}>
                        //     <span>Inverters Online</span><span>14/14</span>
                        // </label>,
                        <label key="label3" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "column", padding : "0px 10px 0 15px", borderRight : "1px solid #B6B6B6"}}>
                            <span>Module Temp</span><span>{mod_temp} &#x2103;</span>
                        </label>,
                        <label key="label4" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "column", padding : "0px 10px 0 15px", borderRight : "1px solid #B6B6B6"}}>
                            <span>GHI/POA</span><div>{GHI}/{POA} : W/m<sup>2</sup></div>
                        </label>,
                        <label key="label5" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "column", padding : "0px 10px 0 15px", borderRight : "1px solid #B6B6B6"}}>
                            <span>Insolation</span><div>{Tilt} kWh/m<sup>2</sup></div>
                        </label>,
                        <label key="label6" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "column", padding : "0px 10px 0 15px"}}>
                            <span>PR: Actual/Estimated</span><span>{PR_Actual + "%"}/ 0%</span>
                        </label>]}
    />
    );
};

export const Fieldset_Mode = () => {

    // *************************PCS Status ******************
    const {
        timeWindow: timeWindowPCSStatus,
        handleTimeWindowChange: PCSStatusChange,
        handleReset: PCSStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObj = {
        devName : "pcs",
        keys : "ESS_PCSOperation",
    };
    
    const PCSStatusData = UseInverterStatus(searchObj, timeWindowPCSStatus) || [0, 0, 0];

    // *************************PV Status ******************
    const {
        timeWindow: timeWindowInverterStatus,
        handleTimeWindowChange: PVStatusChange,
        handleReset: PVStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObjPCS = {
        devName : "Inverter",
        keys : "AC_Active_Power_Watt",
    };
    
    const PVStatusData = UseInverterStatus(searchObjPCS, timeWindowInverterStatus) || [0, 0, 0];

    const gen = PCSStatusData[0] + PVStatusData[0];
    const Commn = PCSStatusData[2] + PVStatusData[2];

    const searchTripData = [{Inverter : "Trip_Mode_Inv"}, {PCS : "Trip_Mode_Inv"}];
    const TripData = UseLatestValueOfSameKeyMultipleDevice(searchTripData) as any;
    const tripCount = TripData?.flat(0).reduce((acc : number, curr : number) => acc + curr);



    return (
    <FieldsetLayout
                                fieldsetStyle={{
                                    border : "2px solid #A3A3A3",
                                    borderRadius : "5px",
                                    fontFamily : "inter",
                                    padding : "2px 0px",
                                    display : "flex",
                                    flexDirection : "column",
                                    justifyContent : "space-around"
                                }}
                                legendStyle={{
                                    fontWeight : 500,
                                    color : "#4A4A4A",
                                    marginLeft : "10px",
                                    padding : "7px",
                                    paddingBottom : 0,
                                }}
                                legendContent='MODE'
                                labels = {[
                                    <label key="label1" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "row", padding : "0px 5px 0 5px"}}>
                                        <div style={{display : "flex", margin: "0 20px 10px 0", alignItems: "center", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                            <div style={{width: EnlargeWidgetSize(15) + "px", height: EnlargeWidgetSize(15) + "px", background: gen > 0 ? "#7EC800" : "Red"  , borderRadius: "50%", marginRight : "2px"}}></div>Gen
                                        </div>
                                        <div style={{display : "flex", margin: "0 0px 10px 0", alignItems: "center", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                            <div style={{width: EnlargeWidgetSize(15) + "px", height: EnlargeWidgetSize(15) + "px", background: tripCount > 0 ? "#7EC800" : "#D9D9D9", borderRadius: "50%", marginRight : "2px"}}></div>Trip
                                        </div>
                                    </label>,
                                    <label key="label2" style={{fontFamily : "inter", fontWeight : 550, color : "#4A4A4A", display : "flex", flexDirection : "row", padding : "0px 5px 0 5px"}}>
                                        <div style={{display : "flex", margin: "0 10px 0 0", alignItems: "center", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                            <div style={{width: EnlargeWidgetSize(15) + "px", height: EnlargeWidgetSize(15) + "px", background: gen == 0 ? "#7EC800" : "#D9D9D9", borderRadius: "50%", marginRight : "2px"}}></div>Stop
                                        </div>
                                        <div style={{display : "flex", margin: "0 0px 0 0", alignItems: "center", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                            <div style={{width: EnlargeWidgetSize(15) + "px", height: EnlargeWidgetSize(15) + "px", background: Commn > 0 ? "red" : "#7EC800" , borderRadius: "50%", marginRight : "2px"}}></div>Commn.
                                        </div>
                                    </label>
                                ]}
    />
    );
};

export const Fieldset_Plant = () => {
    const searchPlant = {
        devName : "Calculation",
        keys : "Load_Power"
    };
    const PlantData = UseBatteryStatus(searchPlant) || [0];
    return (
    <FieldsetLayout
                                fieldsetStyle={{
                                    border : "2px solid #A3A3A3",
                                    borderRadius : "5px",
                                    fontFamily : "inter",
                                    padding : "7px",
                                    display : "flex",
                                    flexDirection : "column",
                                    justfyContent : "space-around"
                                }}
                                legendStyle={{
                                    fontWeight : 500,
                                    color : "#4A4A4A",
                                    marginLeft : "10px",
                                    padding : "7px",
                                    paddingBottom : 0,
                                }}
                                legendContent='PLANT'
                                labels = {[
                                    <label key="label1" style={{fontFamily : "inter", fontWeight : 600, color : "#4A4A4A", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                        P- {PlantData} kW
                                    </label>,
                                    <label key="label2" style={{fontFamily : "inter", fontWeight : 600, color : "#4A4A4A", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                        F-49.97 Hz
                                    </label>            
                                ]}
    />
    );
};

export const Fieldset_Meter = () => {
    const searchTotalEnergy = {
        devName : "Calculation",
        keys : "PV_Total_Energy_kWh"
    };
    const TotalEnergyData = UseBatteryStatus(searchTotalEnergy) || [0];
    return (
    <FieldsetLayout
                                fieldsetStyle={{
                                    border : "2px solid #A3A3A3",
                                    borderRadius : "5px",
                                    fontFamily : "inter",
                                    padding : "7px",
                                    display : "flex",
                                    flexDirection : "column",
                                    justfyContent : "space-around"
                                }}
                                legendStyle={{
                                    fontWeight : 500,
                                    color : "#4A4A4A",
                                    marginLeft : "10px",
                                    padding : "7px",
                                    paddingBottom : 0,
                                }}
                                legendContent='METER'
                                labels = {[
                                    <label key="label1" style={{fontFamily : "inter", fontWeight : 600, color : "#4A4A4A", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}} title="Total Energy">
                                        T.E-{TotalEnergyData[0].toFixed(1)} kWh
                                    </label>,
                                    <label key="label2" style={{fontFamily : "inter", fontWeight : 600, color : "#4A4A4A", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                        F-49.97 Hz
                                    </label>            
                                ]}
        />
    );
};

export const Fieldset_Temp = () => {
    return (
    <FieldsetLayout
                                fieldsetStyle={{
                                    border : "2px solid #A3A3A3",
                                    borderRadius : "5px",
                                    padding : "7px",
                                    fontFamily : "inter",
                                    display : "flex",
                                    flexDirection : "column",
                                    justfyContent : "space-around"
                                }}
                                legendStyle={{
                                    fontWeight : 500,
                                    color : "#4A4A4A",
                                    marginLeft : "10px",
                                    padding : "7px",
                                    paddingBottom : 0,
                                }}
                                legendContent='TEMP'
                                labels = {[
                                    <label key="label1" style={{fontFamily : "inter", fontWeight : 500, color : "#4A4A4A", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                        Max &nbsp; <b>0.00&#x2103;</b>
                                    </label>,
                                    <label key="label2" style={{fontFamily : "inter", fontWeight : 500, color : "#4A4A4A", fontSize : window.screen.width > 1530 ? EnlargeWidgetSize(16) + "px" : 14}}>
                                        Avg &nbsp; <b>0.00&#x2103;</b>
                                    </label>            
                                ]}
    />
    );
};

export const Fieldset_Devices = () => {

    // *************************PCS Status ******************
    const {
        timeWindow: timeWindowInverterStatus,
        handleTimeWindowChange: PCSStatusChange,
        handleReset: PCSStatusHandleReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
    const searchObj = {
        devName : "pcs",
        keys : "ESS_PCSOperation",
    };
    
    const PCSStatusData = UseInverterStatus(searchObj, timeWindowInverterStatus) || [];

    return (
    <FieldsetLayout
                                fieldsetStyle={{
                                    border : "2px solid #A3A3A3",
                                    borderRadius : "5px",
                                    fontFamily : "inter",
                                    padding : "2px 15px",
                                    display : "flex",
                                    flexDirection : "column",
                                    justifyContent : "space-around"
                                }}
                                legendStyle={{
                                    fontWeight : 500,
                                    color : "#4A4A4A",
                                    marginLeft : "10px",
                                    padding : "7px",
                                    paddingBottom : 0,
                                }}
                                legendContent='DEVICES'
                                labels = {[
                                    <label key="label1" style={{fontFamily : "inter", fontWeight : 500, color : "#4A4A4A", padding : "0px 0 0 5px", display : "flex",}}>
                                        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", background: "#fff", padding:"0 15px 5px 5px"}}>
                                            <span>PCS</span>
                                            <div style={{borderRadius : "5px", color: "#fff"}}>
                                                <b style={{padding:"4px", background:"#ECB526", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px"}}>{ PCSStatusData[2] }</b>
                                                <b style={{padding:"4px", background:"#B3261E"}}>{PCSStatusData[1]}</b>
                                                <b style={{padding:"4px", background:"#B0B0B0",borderTopRightRadius:"5px", borderBottomRightRadius:"5px"}}>{PCSStatusData[0] + PCSStatusData[1] + PCSStatusData[2]}</b>
                                            </div>
                                        </div>
                                        <div style={{display:"flex", flexDirection:"column", background: "#fff", padding:"0 15px 5px 5px"}}>
                                            <span>IoT</span>
                                            <div style={{borderRadius : "5px", color: "#fff"}}>
                                                {/* <b style={{padding:"4px", background:"#ECB526", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px"}}>2</b> */}
                                                <b style={{padding:"4px", background:"#B3261E", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px"}}>NA</b>
                                                <b style={{padding:"4px", background:"#B0B0B0",borderTopRightRadius:"5px", borderBottomRightRadius:"5px"}}>NA</b>
                                            </div>
                                        </div>
                                        <div style={{display:"flex", flexDirection:"column", background: "#fff", padding:"0 15px 5px 5px"}}>
                                            <span>Batteries</span>
                                            <div style={{borderRadius : "5px", color: "#fff"}}>
                                                <b style={{padding:"4px", background:"#ECB526", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px"}}>NA</b>
                                                <b style={{padding:"4px", background:"#B3261E"}}>NA</b>
                                                <b style={{padding:"4px", background:"#B0B0B0",borderTopRightRadius:"5px", borderBottomRightRadius:"5px"}}>NA</b>
                                            </div>
                                        </div>
                                        <div style={{display:"flex", flexDirection:"column", background: "#fff", padding:"0 15px 5px 5px"}}>
                                            <span>SMBs</span>
                                            <div style={{borderRadius : "5px", color: "#fff"}}>
                                                {/* <b style={{padding:"4px", background:"#ECB526", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px"}}>2</b> */}
                                                <b style={{padding:"4px", background:"#B3261E", borderTopLeftRadius:"5px", borderBottomLeftRadius:"5px"}}>NA</b>
                                                <b style={{padding:"4px", background:"#B0B0B0",borderTopRightRadius:"5px", borderBottomRightRadius:"5px"}}>NA</b>
                                            </div>
                                        </div>
                                    </label>,
                                    <label key="label2" style={{fontFamily : "inter", fontWeight : 500, color : "#4A4A4A", padding : "0px 15px 0 5px"}}>
                                        <div style={{display:"flex",flexDirection:"row", paddingRight:"10px", alignItems:"center", alignContent:"center"}}>
                                            <div style={{display:"flex", alignItems:"center", paddingRight:"5px"}}>
                                                <div style={{width:"5px", height:"5px", borderRadius:"50%", background:"#B0B0B0", marginRight:"5px"}}></div>
                                                <div style={{color:"#4A4A4A"}}>Total</div>
                                            </div>
                                            <div style={{display:"flex", alignItems:"center", paddingRight:"5px"}}>
                                                <div style={{width:"5px", height:"5px", borderRadius:"50%", background:"#B3261E", marginRight:"5px"}}></div>
                                                <div style={{color:"#4A4A4A"}}>Not Working</div>
                                            </div>
                                            <div style={{display:"flex", alignItems:"center", paddingRight:"5px"}}>
                                                <div style={{width:"5px", height:"5px", borderRadius:"50%", background:"#ECB526", marginRight:"5px"}}></div>
                                                <div style={{color:"#4A4A4A"}}>Error</div>
                                            </div>
                                        </div>
                                    </label>            
                                ]}
    />
    );
};