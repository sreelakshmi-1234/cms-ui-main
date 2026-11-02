import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GetAuthToken, GetAuthTokenByUserID, GetRefreshedToken, sendLogOutRequest, sendResetPasswordRequest } from '../../api/Authentication/AuthAPIs';
import {jwtDecode} from 'jwt-decode';
import { promises } from 'dns';
import swal from 'sweetalert';
import { useCustomerOptionsContext } from '../../Context/CustomerOptionsContext';
import { useSelectedCustomerIDContext } from '../../Context/SelectedCustomerIDContext';
import CustomerHandlingService from '../CustomerHandlingService';
import RouteProtectionService from '../RouteProtectionService';
import { useNavigate } from 'react-router';

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  loginByUserId : (userId : string) => Promise<void>;
  logout: () => Promise<boolean>;
  forgotPasswordHandle: (email: string) => Promise<boolean>;
  checkAndRefreshToken : () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { setCustomerOptions } = useCustomerOptionsContext();
  const { setSelectedCustomerID } = useSelectedCustomerIDContext();
  const navigate = useNavigate();

  const checkAndRefreshToken = async () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
    
    if (token && refreshToken && tokenExpirationDate) {
      const tokenExpiration = parseInt(tokenExpirationDate, 10);

      if (tokenExpiration <= Date.now() / 1000) {
        try {
          const response = await GetRefreshedToken(refreshToken);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          const decoded = jwtDecode<{ exp: number }>(response.data.token);
          localStorage.setItem('tokenExpirationDate', decoded.exp.toString());
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('tokenExpirationDate');
        }
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAndRefreshToken();
    const interval = setInterval(checkAndRefreshToken, 4 * 60 * 1000); // Check every 4 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await GetAuthToken(username, password);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        const decoded = jwtDecode<{ exp: number }>(response.data.token);
        localStorage.setItem('tokenExpirationDate', decoded.exp.toString());
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    }
  };

  const loginByUserId = async (userId: string) => {
    try {
      const response = await GetAuthTokenByUserID(userId);
      if (response.status === 200) {
        localStorage.removeItem("PortfolioHierarchy");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        const decoded = jwtDecode<{ exp: number }>(response.data.token);
        localStorage.setItem('tokenExpirationDate', decoded.exp.toString());
        setIsAuthenticated(true);
        localStorage.setItem('requestedLocation', '/');
        try {
          await CustomerHandlingService(setCustomerOptions, setSelectedCustomerID);

        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      const location = RouteProtectionService()
      navigate(location);
      } else if (response.status == 401) {
        swal({
          title : 'Tenant Token Expired',
          text : 'Logout -> Login to get tenant view.',
          icon : 'error'
        })
      } else {
        console.log(response.status)
        swal({
          title : 'Error',
          text : 'Invalid user id',
          icon : 'error'
        })
      }
    } catch (error : any) {
      if (error?.response.status == 401) {
        swal({
          title : 'Token Expired',
          text : 'Please Logout & Login once again.',
          icon : 'error'
        })
      } else swal({
        title : 'Error',
        text : 'Invalid user id',
        icon : 'error'
      })
    }
  }

  const logout = async () => {
    // Implement logout logic
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("JWT not found in localStorage");
      }
      const response = await sendLogOutRequest(token);
      if(response.status === 200){
        localStorage.clear();
        setIsAuthenticated(false);
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const forgotPasswordHandle = async (email : string) => {
    const response = await sendResetPasswordRequest(email);
    if(response.status === 200) {
      return true;
    }else{
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loginByUserId, logout, forgotPasswordHandle, checkAndRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
