import axios from 'axios';

const ManyDeviceManyKeysChartAPI  = async (searchTag : Object[], timeWindow : {startTs:Number, endTs:Number, aggregate:string, interval: number}, LastValue? : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone");
    const plantTimeZone = localStorage.getItem("PlantTimeZone");


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
            "timeWindow" : timeWindow,
            "timeZone" : timeZone,
            "plantTimeZone" : plantTimeZone
        };
        if (LastValue) {
            try {
                const response = await axios.post(`${BASE_URL}/v1/GetManyDeviceManyKeysChartData/${LastValue}`, body);
                return response;
            } catch (error) {
                console.error(error)
            }
        } else {
            
            try {
                const response = await axios.post(`${BASE_URL}/v1/GetManyDeviceManyKeysChartData`, body);
                return response;
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default ManyDeviceManyKeysChartAPI;