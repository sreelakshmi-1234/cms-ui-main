import { ChakraProvider } from '@chakra-ui/react';
import { useRoutes } from 'react-router';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const content = useRoutes(Routes)
  return content
}

export default App;
