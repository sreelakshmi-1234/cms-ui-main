import axios from 'axios';
import { jwtDecode } from "jwt-decode";


interface JwtHeader {
    firstName: string;
    lastName: string;
    scopes: string[];
    customerId : string;
  }

const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

const PlantTableAPI = async (searchTag: Object, textSearch: string, plant: string | null) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("JWT not found!");
    }

    const body = {
        token: token,
        textSearch: textSearch,
        searchTag: searchTag
    };

    try {
        const url = plant ? `${BASE_URL}/v1/getCustomerPlantTableData/${plant}` : `${BASE_URL}/v1/getCustomerPlantTableData`;
        const response = await axios.post(url, body);

        // Return response data
        if (plant) {
            return response.data;
        } else {
            return response;
        }
    } catch (error) {
        console.error('Error fetching plant table data:', error);
        // throw error; // Rethrow the error to allow caller to handle it
    }
};

export default PlantTableAPI;

export const PlantAssetTableAPI = async (searchTag: Object, textSearch: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("JWT not found!");
    }

    const decodedToken: JwtHeader = jwtDecode<JwtHeader>(token);
        const { customerId } = decodedToken;

    const body = {
        token: token,
        textSearch: textSearch,
        searchTag: searchTag,
        "Current_Customer" : customerId
    };

    try {
        const response = await axios.post(`${BASE_URL}/v1/getPlantAssetTableData`, body);
        return response; // Explicitly return response data
    } catch (error) {
        console.error('Error fetching plant asset table data:', error);
        // throw error; // Rethrow the error to allow caller to handle it
    }
};
