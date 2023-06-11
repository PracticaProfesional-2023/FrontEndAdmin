import React from 'react';
import { Typography, Container } from '@mui/material/';

const PageNotFound = () => {
  return (
    <div
      style={{
        backgroundColor: '#24406c',
        color: 'white',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" align="center">
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" align="center">
          Sorry, the page you are looking for doesn´t exist.
        </Typography>
      </Container>
    </div>
  );
};

export default PageNotFound;
