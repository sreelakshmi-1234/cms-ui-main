
const RouteProtectionService = (location? : string): string => {
    const requestedLocation = location ? location : localStorage.getItem('requestedLocation');
    const authority = localStorage.getItem("authority");
    const indexDashboard = localStorage.getItem("indexDashboard");
    const type = localStorage.getItem("PlantType") || "PV-DG-BESS";

    if (requestedLocation) {
        if (requestedLocation == '/') {
            if (authority == "Customer Users") {
                localStorage.setItem("indexDashboard", "/plantview");
                return "/plantview";
            } else if (authority == 'Tenant Administrators') {
                localStorage.setItem("indexDashboard", "/tenant");
                return "/tenant";
            } else {
                localStorage.setItem("indexDashboard", "/portfolio");
                return "/portfolio";
            }
        } else if (requestedLocation == '/tenant') {
            if (authority == 'Tenant Administrators') {
                localStorage.setItem("indexDashboard", "/tenant");
                return requestedLocation;
            } else if (authority == "Customer Users") {
                localStorage.setItem("indexDashboard", "/plantview");
                return "/plantview";
            } else {
                localStorage.setItem("indexDashboard", "/portfolio");
                return "/portfolio";
            }

        } else if (requestedLocation == "/portfolio" || requestedLocation == '/alarm') {
            if (authority == 'Customer Administrators') {
                localStorage.setItem("indexDashboard", "/portfolio");
                return requestedLocation;
            } else {
                if (indexDashboard) {
                    return indexDashboard;
                } else {
                    if (authority == "Customer Users") {
                        localStorage.setItem("indexDashboard", "/plantview");
                        return "/plantview";
                    } else if (authority == 'Tenant Administrators') {
                        localStorage.setItem("indexDashboard", "/tenant");
                        return "/tenant";
                    } else {
                        return requestedLocation;
                    }
                }
            }
        } else if(requestedLocation == "/bess/overview") {
            const result = isTypeMatched(requestedLocation, type);
            if(result) {
                return requestedLocation;
            } else {
                return "/plantview"
            }
        } else {
            return requestedLocation;
        }
    } else {
        return "/";
    }
}

export default RouteProtectionService;


function isTypeMatched(requestUrl: string, allowedTypes: string): boolean {
  const typeMap: Record<string, string> = {
    "/inverter": "PV",
    "/dg": "DG",
    "/bess": "BESS"
  };

  const urlPrefix = Object.keys(typeMap).find(prefix =>
    requestUrl.startsWith(prefix)
  );

  if (!urlPrefix) return false;

  const matchedType = typeMap[urlPrefix];

  return allowedTypes.includes(matchedType);
}
