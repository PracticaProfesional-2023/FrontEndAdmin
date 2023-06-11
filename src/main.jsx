import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContextProvider } from './contexts/authContext.jsx';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#24406c',
      light: '#24406c',
    },
    secondary: {
      main: '#e0e0e0',
    },
    success: {
      main: '#5cb85c',
    },
    warning: {
      main: '#ff7700',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#24406c',
          color: '#e0e0e0',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#e0e0e0',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            border: '2.5px solid #fff',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            border: '2.5px solid #fff',
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
