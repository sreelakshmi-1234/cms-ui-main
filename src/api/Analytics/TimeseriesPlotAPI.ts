import axios from 'axios';
import { fieldsType } from '../../Dashboards/AnalyticsDashboard';

const TimeseriesPlotAPI  = async (
    fields : fieldsType[],
    timeWindow : {startTs : number, endTs : number, interval : number, intervalName : string}
) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const timeZone = localStorage.getItem("SelectedTimezone");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "fields" : fields,
            "timewindow" : timeWindow,
            "timeZone" : timeZone
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getTimeseriesPlot`, body);
            return Promise.resolve(response.data);
        } catch (error) {
            console.error(error)
        }
    }
}

export default TimeseriesPlotAPI;