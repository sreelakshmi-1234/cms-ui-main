import axios from "axios";

// APIs from main server

const BASE_URL = 'https://www.cogneta.cloud/api';


const CustomerGroupAPI = async (customerID : string, GroupType : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {

        try {
    
            const response = await axios.get(`${BASE_URL}/entityGroups/CUSTOMER/${customerID}/${GroupType}`,
                    {
                        params : {
                            pageSize : "100",
                            page : 0,
                            sortProperty : "createdTime",
                            sortOrder : "ASC"
                        }, 
                        headers : {'X-Authorization' :`Bearer ${token}`}
                    }
                );
            if(GroupType == 'CUSTOMER') return response.data;
            return response.data.data.filter((elem : any) => elem.name != "All").map((Element : any) => ({value : Element.id.id, label : Element.name}));

        } catch (error) {
            console.error("Getting error while fetching Entity Group Info!", customerID);
        }
    }
};

const CustomerGroupWithTZAPI = async (customerID : string, GroupType : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {

        try {
    
            const response = await axios.get(`${BASE_URL}/entityGroups/CUSTOMER/${customerID}/${GroupType}`,
                    {
                        params : {
                            pageSize : "100",
                            page : 0,
                            sortProperty : "createdTime",
                            sortOrder : "ASC"
                        }, 
                        headers : {'X-Authorization' :`Bearer ${token}`}
                    }
                );
            if(GroupType == 'CUSTOMER') return response.data;
            return response.data.data.filter((elem : any) => elem.name != "All").map((Element : any) => ({value : Element.id.id, label : Element.name, timeZone : JSON.parse(Element.additionalInfo.description).timeZone}));

        } catch (error) {
            console.error("Getting error while fetching Entity Group Info!", customerID);
        }
    }
};

const CustomersofGroupAPI = async (customerID : string) => {
    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {

        try {
    
            const response = await axios.get(`${BASE_URL}/entityGroup/${customerID}/customers`,
                    {
                        params : {
                            pageSize : "1024",
                            page : 0,
                            sortProperty : "createdTime",
                            sortOrder : "ASC"
                        }, 
                        headers : {'X-Authorization' :`Bearer ${token}`}
                    }
                );
                if (response.data) {
                    
                    return response.data.data.filter((elem : any) => elem.name != "All").map((Element : any) => ({id : Element.id.id, name : Element.name, country : Element.country}));
                } else {
                    return [];
                }

        } catch (error) {
            console.error("Getting error while fetching Customers Info!", customerID);
        }
    }
};

const getAllCustomer = async (customerID: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("JWT not found!")
    } else {
        try {
            const response = await axios.get(`${BASE_URL}/customer/${customerID}/customerInfos`, {
                params: {
                    pageSize: 100024,
                    page: 0,
                    sortProperty: "createdTime",
                    sortOrder: "ASC",
                    includeCustomers: true
                },
                headers: {
                    'X-Authorization': `Bearer ${token}`
                }
            });
            return response?.data;
        } catch (error) {
            return [];
        }
    }
}

export {CustomerGroupAPI, CustomersofGroupAPI, CustomerGroupWithTZAPI, getAllCustomer};