import { FC, ReactNode, useEffect, useState } from "react";
import useAuth from "./Hooks/UseAuth";
import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types';
import Login from "../components/Auth/Login";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import RouteProtectionService from "./RouteProtectionService"; // Import the RouteProtectionService

interface AuthGurdProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGurdProps> = (props) => {
  const { children } = props;
  const auth = useAuth() as any;
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async check for authentication
    const checkAuth = async () => {
      await auth.checkAndRefreshToken(); // Assuming `initialize` is a method to load auth state
      setIsLoading(false); // Set loading to false once auth state is determined
    };

    checkAuth();
  }, [auth]);

  if (isLoading) {
    // Render a loading spinner while checking authentication
    return (
      <Box as={Flex} height={"100vh"} w={"100vw"} justify={"center"} align={"center"}>
        <Spinner
          thickness='3px'
          speed='0.65s'
          emptyColor='gray.200'
          color='#062D59'
          size='md'
        />
      </Box>
    );
  }

  if (!auth.isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
      localStorage.setItem("requestedLocation", location.pathname);
    }
    return <Login />;
  }

  // Use RouteProtectionService to validate the requested route
  const protectedRoute = RouteProtectionService(location.pathname);

  // If the requested route is not allowed, redirect to the protected route
  if (location.pathname !== protectedRoute) {
    return <Navigate to={protectedRoute} />;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    localStorage.setItem("requestedLocation", requestedLocation || "/");
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node as any,
};

export default AuthGuard;