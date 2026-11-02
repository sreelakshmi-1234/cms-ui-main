import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface JwtHeader {
    firstName: string;
    lastName: string;
    scopes: string[];
    customerId : string;
  }

const LocationMapAPI  = async (searchTag : string, tenant? : boolean) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        if(tenant) {
            const body = {
                "token" : token
            };
            
            try {
                const response = await axios.post(`${BASE_URL}/v1/getTenantLocationMapData`, body);
                return response;
            } catch (error) {
                console.error(error)
            }
        } else {
            const decodedToken: JwtHeader = jwtDecode<JwtHeader>(token);
            const { customerId } = decodedToken;
            const body = {
                "token" : token,
                "searchTag" : searchTag,
                "customerID" : customerId,
            };
            try {
                const response = await axios.post(`${BASE_URL}/v1/getLocationMapData`, body);
                return response;
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default LocationMapAPI;