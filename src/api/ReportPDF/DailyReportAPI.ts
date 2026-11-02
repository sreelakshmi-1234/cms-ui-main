import axios from 'axios';

const DailyReportAPI  = async (section1Keys : string[], section2Keys : string[], dates : {startDate : Date, endDate : Date}) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");
    const userTimeZone = localStorage.getItem("SelectedTimezone"); //Currently not in use (Backend) ~ Before it was user time.
    const plantTimeZone = localStorage.getItem("PlantTimeZone");



    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "userTimeZone" : userTimeZone,
            "plantTimeZone" : plantTimeZone,
            "section1Keys" : section1Keys,
            "section2Keys": section2Keys,
            "startDate" : dates.startDate.getTime(),
            "endDate" : dates.endDate.getTime()
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getDailyReport`, body);
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export default DailyReportAPI;