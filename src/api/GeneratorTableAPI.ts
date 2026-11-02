import axios from 'axios';

const GeneratorTableAPI  = async (searchTag : Object[], label : string[], timeWindow : {startTs:Number, endTs:Number, aggregate:string, interval: number}) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("SelectedTimezone");


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
            "label" : label,
            "timeWindow" : timeWindow,
            "timeZone" : timeZone,

        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getGeneratorTableData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default GeneratorTableAPI;