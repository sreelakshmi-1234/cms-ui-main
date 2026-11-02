import axios from 'axios';

const ManyDeviceManyKeysMultipleAggChartAPI  = async (searchTag : Object[], timeWindow : {startTs:Number, endTs:Number, aggregate:string, interval: number}) => {
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
           
        try {
            const response = await axios.post(`${BASE_URL}/v1/GetManyDeviceManyKeysMultipleAggChartData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default ManyDeviceManyKeysMultipleAggChartAPI;