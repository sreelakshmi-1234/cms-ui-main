import { useState, useEffect, useCallback, useRef } from 'react';
import {CustomerGroupAPI} from '../../api/Authentication/CustomerGroupAPI';
const jp = require('jsonpath');

const useCustomerGroup = (customerID : string, GroupType  : string) => {
    const [data, setData] = useState(null);
    const hasFetchedRef = useRef(false);

    const fetchTelemetryData = useCallback(async () => {
        try {
            const response = await CustomerGroupAPI(customerID, GroupType);
            if(response?.data) {
                const filteredData = response.data.filter((elem : any) => (elem.name).toLowerCase() != "all");
                if(filteredData.length > 0) {
                    setData(filteredData.map((elem : any) => ({id : elem.id.id, name : elem.name})));
                }else {
                    const AssetResponse = await CustomerGroupAPI(customerID, "ASSET");
                    const filteredAssetResponse = AssetResponse?.data((elem : any) => (elem.name).toLowerCase() != "all");
                    setData(filteredAssetResponse.map((elem : any) => ({id : elem.id.id, name : elem.name})));
                }
            }
            // setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [customerID, GroupType]);

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchTelemetryData();
            hasFetchedRef.current = true;
        }
    }, [fetchTelemetryData]);

    return data;
};

export default useCustomerGroup;
