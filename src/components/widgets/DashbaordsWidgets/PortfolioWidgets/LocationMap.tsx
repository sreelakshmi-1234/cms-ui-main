import UseLocationMap from "../../../../Services/Hooks/UseLocationMap";
import GraphLayout from "../../../Layouts/ChartLayouts/GraphLayout"
import LocationMapChart from "../../charts/LocationMapChart"

const LocationMap = () => {
    // ******************LOCATION MAP*********************

    const searchLocationTag = "Plant_Name,AC_Capacity,Latitude,Longitude"

    const LocationMapData = UseLocationMap(searchLocationTag);
    return (
        <GraphLayout
            title="Location Map"
            titleLengthLongSVG={0}
            titleLengthSVG={0}
            width={["auto", "100%"]}
            height={"100%"}
            fullScreen={true}
            downloadOption={false}
        >
            <LocationMapChart apiData={LocationMapData || [{ country: "", lat: 0, long: 0, name: "", type: "", broadType : "", PV : 0, BESS : 0, WIND : 0 }]} />
        </GraphLayout>
    );
};

export default LocationMap