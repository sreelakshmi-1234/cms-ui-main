import axios from 'axios';

const NotificationDataAPI  = async (RankingList : string[], Count? : Boolean) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("SelectedTimezone");

    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "RankingList" : RankingList
        };
        try {
            if(Count) {
                const response = await axios.get("https://cogneta.cloud/api/notifications/unread/count?deliveryMethod=WEB", {
                    headers: { 'X-Authorization': `Bearer ${token}` }
                });
                return response;
            } else {
                const response = await axios.post(`${BASE_URL}/v1/getNotificationData`, body);
                return response;
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default NotificationDataAPI;