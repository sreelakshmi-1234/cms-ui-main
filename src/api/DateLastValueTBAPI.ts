import axios from 'axios';

const DateLastValueTBAPI  = async (searchTag : Object, date : Date) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const timeZone = localStorage.getItem("PlantTimeZone"); // It was User timexone now set to plant time zone becaus it returns array of values that is nothing to do with user timezone.


    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
            "timeZone" : timeZone,
            "date" : date
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getDateLastValueTBAPIData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default DateLastValueTBAPI;