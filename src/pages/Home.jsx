import React, { useContext, useState } from 'react';
import { Box, Container, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';

const Home = () => {
  const { isAuthenticated } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  // Muestra la alerta cuando el usuario está autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      setShowAlert(true);
    }
  }, [isAuthenticated]);

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <div
        style={{
          backgroundColor: 'pink',
          color: 'black',
          height: '30em',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>HOME</h1>
      </div>
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleAlertClose} severity="success">
          Successful Login
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
