import axios from "axios";

// APIs from main server

const BASE_URL = 'https://www.cogneta.cloud/api';

const GetUserInfo = async (userID : string, token : string) => {
    try {

        const response = await axios.get(`${BASE_URL}/user/info/${userID}`, {headers : {'X-Authorization' :`Bearer ${token}`}});
        return response;

    } catch (error) {
        console.error("Getting error while fetching User Info!");
    }
};

export default GetUserInfo;



const GetPlantInfo = async (PlantID : string) => {

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("JWT Not Found!");
    } else {
        
        try {
    
            const response = await axios.get(`${BASE_URL}/entityGroup/${PlantID}`, {headers : {'X-Authorization' :`Bearer ${token}`}});
            return response.data;
    
        } catch (error) {
            console.error("Getting error while fetching Plant Info!");
        }
    }
};

const GetCustomerTitle = async (customerID : string) => {

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("JWT Not Found!");
    } else {
        
        try {
    
            const response = await axios.get(`${BASE_URL}/customer/${customerID}/title`, {headers : {'X-Authorization' :`Bearer ${token}`}});
            return response.data;
    
        } catch (error) {
            console.error("Getting error while fetching Plant Info!");
        }
    }
};

export { GetPlantInfo, GetCustomerTitle };