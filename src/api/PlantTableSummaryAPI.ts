import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface JwtHeader {
    firstName: string;
    lastName: string;
    scopes: string[];
    customerId : string;
  }

const PlantTableSummaryAPI  = async (searchTag : Object, textSearch : string[]) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
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
            "Current_Customer" : customerId
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getPlantTableSummaryData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantTableSummaryAPI;