import axios from 'axios';

const PortfolioTableAPI  = async () => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("currentUserTimeZone");

    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/GetPortfolioHierarchy`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PortfolioTableAPI;