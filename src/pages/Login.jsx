import * as React from 'react';
import { useAuthContext } from '../contexts/authContext';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Logo from '../assets/Logo.png';
import Alert from '@mui/material/Alert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';
import validator from 'validator';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { InputAdornment, IconButton } from '@mui/material';

const defaultTheme = createTheme();

function Login() {
  const { login } = useAuthContext();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Maneja el cambio en el campo de usuario
  function handleUserChange(event) {
    setUser(event.target.value);
    validateEmail(event.target.value);
  }

  // Maneja el cambio en el campo de contraseña
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Valida el formato del correo electrónico
  function validateEmail(email) {
    const isValid = validator.isEmail(email);
    setValidEmail(isValid);
  }

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Verifica si se ingresó un usuario y contraseña en los campos
    if (user === '' || password === '') {
      setError('Please, You must enter Email and Password');
      setShowAlert(true);
      return;
    }

    // Verifica si el correo electrónico es válido
    if (!validEmail) {
      setError('Please enter a valid Email.');
      setShowAlert(true);
      return;
    }

    // Verifica si se aceptaron los términos y condiciones
    if (!acceptTerms) {
      setError('You must accept the Terms and Conditions.');
      setShowAlert(true);
      return;
    }

    setLoading(true); // Activa el estado de carga

    try {
      // Llama a la función de inicio de sesión proporcionando el correo y contraseña
      await login(user, password);
    } catch (error) {
      // Captura cualquier error que ocurra durante el inicio de sesión y muestra un mensaje de error
      setError(error.message);
      setShowAlert(true);
    }

    setLoading(false); // Desactiva el estado de carga
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            backgroundColor: '#22406C',
            display: {
              xs: 'none',
              sm: 'none',
              md: 'flex',
            },
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

        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          component={Paper}
          elevation={6}
          square
        >
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
            {showAlert && (
              <Alert
                severity="error"
                onClose={() => setShowAlert(false)}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  mt: 2,
                  mr: 2,
                  zIndex: 9999,
                }}
              >
                {error}
              </Alert>
            )}
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
                position: 'relative', // Añadir posición relativa al contenedor
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
                {loading && (
                  <div
                    style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '100%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 9999,
                    }}
                  >
                    <CircularProgress size={80} style={{ color: 'white' }} />
                  </div>
                )}

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
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={acceptTerms} // Valor controlado por el estado
                      onChange={(event) => setAcceptTerms(event.target.checked)} // Actualizar el estado cuando cambie el valor
                    />
                  }
                  label="I accept the terms and conditions"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
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
