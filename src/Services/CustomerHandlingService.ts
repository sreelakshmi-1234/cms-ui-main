// src/Services/CustomerHandlingService.ts

import { jwtDecode } from 'jwt-decode';
import { GetCustomersAPI, GetCustomerAPI } from '../api/GetCustomersAPI';
import { Customer } from '../Context/CustomerOptionsContext';
import GetUserInfo, { GetPlantInfo } from '../api/Authentication/UserAPI';
import {CustomerGroupAPI, CustomersofGroupAPI, getAllCustomer} from '../api/Authentication/CustomerGroupAPI';

interface JwtHeader {
  lastName: string;
  customerId: string;
  userId : string;
  sub: string;
}

let PlantOfCustomers = [] as any; // Golabally Declare for a customer has grp customer with plants (grp opf Asset)

const CustomerHandlingService = async (setCustomerOptions: (customers: Customer[]) => void, setSelectedCustomerID : (id: string) => void) => {

  // Reset on Login
  localStorage.removeItem("defaultDashboardId");

  const jwt = localStorage.getItem("token");
  let authority = "";
  let customerID = "";
  let userID = "";
  let email = "";
  let ownerName = "";
  if (!jwt) {
    throw new Error("JWT not found in localStorage");
  }
  try {
    const Decoded : JwtHeader = jwtDecode<JwtHeader>(jwt);
    const {lastName , customerId, userId, sub} = Decoded;
    authority = lastName;
    customerID = customerId;
    userID = userId;
    email = sub;

    try {
      const response = await GetUserInfo(userID, jwt);
      authority = response?.data["groups"][0].name;
      ownerName = response?.data["ownerName"] as string;

      const defaultDashboardId = response?.data?.additionalInfo?.defaultDashboardId;

      if (defaultDashboardId) {
        const existingDashboardId = localStorage.getItem("defaultDashboardId");

        // Only set if not already present OR user changed
        if (!existingDashboardId || existingDashboardId !== defaultDashboardId) {
          localStorage.setItem("defaultDashboardId", defaultDashboardId);
          console.log("Dashboard ID updated:", defaultDashboardId);
        } else {
          console.log("Dashboard ID already exists, skipping update");
        }
      }
      
      localStorage.setItem("authority", authority);
      localStorage.setItem("email", email);
      localStorage.setItem("UserOwner", ownerName)
      localStorage.setItem("currentUserTimeZone", Intl.DateTimeFormat().resolvedOptions().timeZone);
      localStorage.setItem("SelectedTimezone", Intl.DateTimeFormat().resolvedOptions().timeZone)
    } catch (error) {
      throw new Error("Authority Is Not Present In Current User!")
    }
    
  } catch (error) {
    throw new Error("Last Name Not present in JWT")
  }

  
  if (authority === "Customer Administrators") {
    
    try {

      PlantOfCustomers = [];

      const CustomerGroupResponse = await CustomerGroupAPI(customerID, "CUSTOMER");
      const CustomerResponse = await getAllCustomer(customerID);
      // console.log("CustomerResponse :", CustomerResponse)
      const CustomerPlantAssetResponse = await CustomerGroupAPI(customerID, "ASSET");
      
      if(CustomerGroupResponse && CustomerGroupResponse.data.length > 0) {
        const customerResponseAll = CustomerGroupResponse.data.filter((elem : any) => elem.name == "All").map((Element : any) => ({value : Element.id.id, label : Element.name}));
        localStorage.setItem("AllGroup", JSON.stringify(customerResponseAll));
        // const AllGroupOptions = await CustomersofGroupAPI(customerResponseAll[0].value);
        const AllGroupOptions = CustomerResponse.data.filter((elem : any) => elem.name != "All").map((Element : any) => ({id : Element.id.id, name : Element.name, country : Element.country}));
        if(AllGroupOptions.length > 0) {
          AllGroupOptions.push({id : customerID, label : ownerName});
          localStorage.setItem("AllGroupOptions", JSON.stringify(AllGroupOptions));
        }
        // const customerResponsePortfolio = CustomerGroupResponse.data.filter((elem : any) => elem.name != "All").map((Element : any) => ({value : Element.id.id, label : Element.name}));
        // if(customerResponsePortfolio.length > 0) {
          // localStorage.setItem("PortfolioType", JSON.stringify(customerResponsePortfolio));
          // localStorage.setItem("SelectedTypeId", customerResponsePortfolio[0].value);
          // await GetPlantGroup(customerResponsePortfolio[0].value, setCustomerOptions, setSelectedCustomerID)
        // }

        // New One from 23-07-25 (from portfolio to customer)
        const customerResponsePortfolio = CustomerResponse.data.filter((elem : any) => elem.name != "All").map((Element : any) => ({value : Element.id.id, label : Element.name}));
        customerResponsePortfolio.push({value : customerID, label : ownerName});
        localStorage.setItem("PortfolioType", JSON.stringify(customerResponsePortfolio));
        localStorage.setItem("SelectedTypeId", customerResponsePortfolio[0].value);
        await GetPlantGroupOnGroupIds(customerResponsePortfolio.map((elem : any) => elem.value), setCustomerOptions, setSelectedCustomerID)
      };

      if(CustomerPlantAssetResponse && CustomerPlantAssetResponse.length > 0) {
        PlantOfCustomers.push(CustomerPlantAssetResponse);
          setCustomerOptions(PlantOfCustomers.flat(1) || ""); // CustomerOption is PLANT OPTIONS
          setSelectedCustomerID((PlantOfCustomers.flat(1))[0]?.value || "");  // SELECTED CUTOMER ID is PLANT ID
          localStorage.setItem("SelectedPlantName", ((PlantOfCustomers.flat(1))[0]?.label || ""))
          if((PlantOfCustomers.flat(1))[0]?.value) {
            await  PlantTimeZoneSelection((PlantOfCustomers.flat(1))[0]?.value);
          }
      }
      
      // const response = await GetCustomersAPI(jwt);
      // if (response.length > 0) {
      //   setCustomerOptions(response); // CustomerOption is PLANT OPTIONS
      //   setSelectedCustomerID(response[0].value);  // SELECTED CUTOMER ID is PLANT ID
      // }


    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  } else if(authority === "Customer Users") {
    // console.log(authority, customerID, 8989898989)
    try {
      const response = await GetCustomerAPI(customerID, jwt);
      setCustomerOptions(response);
      setSelectedCustomerID(response[0].value);
    } catch (error) {
      console.error("Error fetching customer Data: ", error);
    }
  } else if(authority == "Tenant Administrators") {
    localStorage.setItem('tenantUserId', userID);
    localStorage.setItem('tenantToken', jwt);
  }
};

export default CustomerHandlingService;

export const GetPlantGroup = async (
  GroupId: string,
  setCustomerOptions: (customer: Customer[]) => void,
  setSelectedCustomerID: (id: string) => void,
  emptyOption?: boolean
) => {
  if (emptyOption) {
    PlantOfCustomers = [];
  }

  const CustomersOfGroupAPI = await CustomersofGroupAPI(GroupId);

  if (CustomersOfGroupAPI && CustomersOfGroupAPI.length > 0) {
    for (let i = 0; i < CustomersOfGroupAPI.length; i++) {
      PlantOfCustomers.push(await CustomerGroupAPI(CustomersOfGroupAPI[i].id, "ASSET"));
    }

    const plantOptions = PlantOfCustomers.flat(1) || [];
    setCustomerOptions(plantOptions);

    // Get selectedCustomerId from localStorage
    const storedCustomerId = localStorage.getItem("SelectedCustomerId");

    // Check if stored ID is present in options
    const isStoredIdValid = plantOptions.some((opt : any) => opt.value === storedCustomerId);

    let selectedId = "";

    if (storedCustomerId && isStoredIdValid) {
      selectedId = storedCustomerId;
    } else {
      selectedId = plantOptions[0]?.value || "";
      localStorage.setItem("SelectedPlantName", plantOptions[0]?.label || "")
    }

    // Set selected customer ID and timezone
    setSelectedCustomerID(selectedId);
    if (selectedId) {
      await PlantTimeZoneSelection(selectedId);
    }
  }
};


export const GetPlantGroupOnGroupIds = async (
  GroupId: string[],
  setCustomerOptions: (customer: Customer[]) => void,
  setSelectedCustomerID: (id: string) => void,
  emptyOption?: boolean
) => {
  if (emptyOption) {
    PlantOfCustomers = [];
  }

  if (GroupId && GroupId.length > 0) {
    for (let i = 0; i < GroupId.length; i++) {
      PlantOfCustomers.push(await CustomerGroupAPI(GroupId[i], "ASSET"));
    }

    const plantOptions = PlantOfCustomers.flat(1) || [];
    // console.log("Plant Option : ", PlantOfCustomers)
    setCustomerOptions(plantOptions);

    // Get selectedCustomerId from localStorage
    const storedCustomerId = localStorage.getItem("SelectedCustomerId");

    // Check if stored ID is present in options
    const isStoredIdValid = plantOptions.some((opt : any) => opt.value === storedCustomerId);
    
    let selectedId = "";

    if (storedCustomerId && isStoredIdValid) {
      selectedId = storedCustomerId;
    } else {
      selectedId = plantOptions[0]?.value || "";
      localStorage.setItem("SelectedPlantName", plantOptions[0]?.label || "")
    }

    // Set selected customer ID and timezone
    setSelectedCustomerID(selectedId);
    if (selectedId) {
      await PlantTimeZoneSelection(selectedId);
    }
  }
};

export const PlantTimeZoneSelection = async (plantID : string) => {
  const plantInfo = await GetPlantInfo(plantID);
  if(plantInfo) {
    const description = plantInfo.additionalInfo.description;
    if(description) {
      const info = JSON.parse(description);
      const timeZone = info.timeZone;
      const type = info.type;
      const plantResolutionMinute = info.plantResolutionMinute;
      if(timeZone) {
        // alert(timeZone)
        localStorage.setItem("PlantTimeZone", timeZone);
        localStorage.setItem("PlantType", type);
      } else {
        localStorage.setItem("PlantTimeZone", "Asia/Kolkata");
        localStorage.setItem("PlantType", "PV-DG-BESS");
      }
      if(plantResolutionMinute) {
        if(plantResolutionMinute == 1) {
          localStorage.setItem("plantResolutionMinute", "1");
        } else {
          localStorage.setItem("plantResolutionMinute", "5");
        }
      } else {
          localStorage.setItem("plantResolutionMinute", "5");
      }
    }
  }
}


