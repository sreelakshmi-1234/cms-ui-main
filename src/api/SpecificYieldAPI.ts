import axios from 'axios';

const SpecificYieldAPI  = async (textSearch : string, key : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";           //"http://localhost:7001/api"; 

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("currentUserTimeZone");

    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!");
    }else {
        const body = {
            "token" : token,
            "textSearch" : textSearch,
            "key" : key,
            "timeZone" : timeZone,

        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getSpecificYield`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default SpecificYieldAPI;