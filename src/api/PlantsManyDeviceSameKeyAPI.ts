import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface JwtHeader {
    firstName: string;
    lastName: string;
    scopes: string[];
    customerId : string;
  }

const PlantsManyDeviceSameKeyAPI  = async (type : String, searchTag : Object, textSearch : string[], timeWindow : Object, timeseries? : boolean) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("currentUserTimeZone");

    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const decodedToken: JwtHeader = jwtDecode<JwtHeader>(token);
        const { customerId } = decodedToken;
        const body = {
            "token" : token,
            "textSearch" : textSearch,
            "searchTag" : searchTag,
            "timeWindow" : timeWindow,
            "Current_Customer" : customerId,
            "type" : type,
            "timeZone" : timeZone,
            "timeseries" : timeseries
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getPlantsManyDeviceSameKeyData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantsManyDeviceSameKeyAPI;