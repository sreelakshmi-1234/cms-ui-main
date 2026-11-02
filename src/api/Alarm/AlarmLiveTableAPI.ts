import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface JwtHeader {
    firstName: string;
    lastName: string;
    scopes: string[];
    customerId : string;
  }

const AlarmLiveTableAPI  = async (searchDev : object, timeWindow : {startTs:Number, endTs:Number, aggregate:string, interval: number}, plant? : boolean) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("SelectedTimezone");

    const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const decodedToken: JwtHeader = jwtDecode<JwtHeader>(token);
        const { customerId } = decodedToken;
        const body = {
            "token" : token,
            "searchDev" : searchDev,
            "timeWindow" : timeWindow,
            "timeZone" : timeZone,
            "customerId" : customerId
        };
        if(plant) {
            const plantBody = {
                "token" : token,
                "searchDev" : searchDev,
                "timeWindow" : timeWindow,
                "timeZone" : timeZone,
                "customerID" : customerID
            };
            try {
                const response = await axios.post(`${BASE_URL}/v2/getLivePlantAlarmTableData`, plantBody);
                return response;
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const response = await axios.post(`${BASE_URL}/v2/getLiveAlarmTableData`, body);
                return response;
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default AlarmLiveTableAPI;