import * as React from 'react';
import { useAuthContext } from '../contexts/authContext';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Logo from '../assets/Logo.png';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        HireJob
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  const UserAuth = 'admin@gmail.com'; // ESTA ES EL CORREO
  const PasswordAuth = 'root123'; //ESTE ES LA CONTRASEÑA
  const { login } = useAuthContext();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function handleUserChange(event) {
    setUser(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if ((user === UserAuth) & (password === PasswordAuth)) {
      login();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={3}
          md={4}
          sx={{
            backgroundColor: '#22406C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              padding: {
                xs: '10px',
                sm: '20px',
                md: '10px',
              },
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              loading="lazy"
              style={{
                marginBottom: '0',
                width: '100%',
                height: 'auto',
                minWidth: '170px',
              }}
            />
          </Box>
          <Typography
            variant="h5"
            sx={{ mt: 2, px: 2, ml: 4, color: 'white', textAlign: 'left' }}
          >
            “Unlock Your Potential, Find Your Dream Job!”
          </Typography>
          <Typography
            variant="h6"
            sx={{
              width: '100',
              marginLeft: '0',
              color: 'white',
              textAlign: 'left',
              fontSize: '15px',
            }}
          >
            — Scrum Master, CEO & Co-Founder
          </Typography>
        </Grid>

        <Grid item xs={12} sm={9} md={8} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              minHeight: '100vh',
              bgcolor: '#f5f5f5',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: {
                  xs: '90%',
                  sm: '80%',
                  md: '70%',
                },
                height: '100%',
                maxHeight: {
                  xs: '90%',
                  sm: '80%',
                  md: '60%',
                },
                p: {
                  xs: 3,
                  sm: 4,
                  md: 5,
                },
                bgcolor: '#E0E0E0',
                borderRadius: '8px',
              }}
            >
              <Typography sx={{ mb: 0, color: 'black', fontSize: '30px' }}>
                Log In
              </Typography>
              <Typography
                sx={{
                  mt: 0.5,
                  color: 'black',
                  fontSize: '15px',
                  textAlign: 'center',
                }}
              >
                This is an internal account, contact your supervisor for any
                questions
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  onChange={handleUserChange}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  onChange={handlePasswordChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="I accept the terms and conditions"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  /* to="private/home"
                  component={NavLink}*/
                  sx={{
                    mt: 1,
                    mb: 2,
                    backgroundColor: '#22406C',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '8px',
                  }}
                >
                  <span style={{ marginRight: '4px' }}>Log In</span>
                  <ArrowForwardIcon sx={{ fontSize: '20px', color: 'white' }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
