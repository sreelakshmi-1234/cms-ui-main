import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { EnlargeWidgetSize, EnlargeWidgetSizeWidth } from "../../../Services/EnlargeWidget";
import { useColorModeValue } from "@chakra-ui/react";

const styles = {
  dial: {
    display: "flex",
    width: "101px",
    height: "50px",
    color: "#000",
    padding: "2px",
    marginTop : -15 + "px",
    marginLeft : -10 + "px"
  },
  title: {
    // fontSize: (1) + "em",
    color: "#000"
  }
};

interface SolidGaugeChartProps {
  value?: number;
}

const SolidGaugeChart: React.FC<SolidGaugeChartProps> = ({ value = 40 }) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {setPercent(value / 100)}, [value]);

  return (

    <div style={styles.dial}>
      <GaugeChart
        nrOfLevels={5}
        colors={["#12D622", "#A1E453", "#FFD739", "#FF5223", "#FF2929"]}
        arcWidth={(0.3)}
        marginInPercent={0} 
        style={{
          width : "80px",
          height : "50px"
        }}
        cornerRadius = {0}
        percent={percent}
        textColor={"transparent"}
        needleBaseColor={useColorModeValue("#062D59" ,"#FFFFFF")}
        needleColor={useColorModeValue("#062D59" ,"#FFFFFF")}
        formatTextValue={(value) => (value)}
      />
      <div style={styles.title}>{""}</div>
    </div>

  );
};

export default SolidGaugeChart;
