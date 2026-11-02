import React, { useMemo, ReactNode } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type Props = {
  children: ReactNode;
};

const MUIThemeProvider = ({ children }: Props) => {
  const { colorMode } = useColorMode();

  // Create MUI theme dynamically based on Chakra colorMode
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode === 'dark' ? 'dark' : 'light',
        },
      }),
    [colorMode]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
