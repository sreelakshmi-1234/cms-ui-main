import cogneta_logo from "../../../assets/cogneta_logo.png"
// import cogneta from "../../../assets/cogneta.png";
import { Image, View } from "@react-pdf/renderer";


const ReportHeader = () => {
    return (
        <View
            style={{
                position: "absolute", // Fix it to the top
                top: 0,
                left: 0,
                right: 0,
                padding: 10, // Add some padding from the edges
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end", // Align content to the right
            }}
            fixed // Ensures it appears on every page
        >
            <Image
                src={cogneta_logo}
                style={{
                    width: "140px",
                    height: "70px",
                }}
            />
        </View>
    );
};

export default ReportHeader