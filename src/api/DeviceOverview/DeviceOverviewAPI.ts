import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface JwtHeader {
    firstName: string;
    lastName: string;
    scopes: string[];
    customerId : string;
  }

const DeviceOverviewAPI  = async (pageSize : number, page : number, textSearch : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone");


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        // const decodedToken: JwtHeader = jwtDecode<JwtHeader>(token);
        // const { customerId } = decodedToken;
        const body = {
            "token" : token,
            "customerID" : customerID,
            "pageSize" : pageSize,
            "page" : page,
            "textSearch" : textSearch,
            "timeZone" : timeZone
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getDeviceOverviewData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default DeviceOverviewAPI;