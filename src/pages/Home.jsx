import { Box, Container } from '@mui/material';
import React from 'react';

const Home = () => {
  const containerStyle = {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    minWidth: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <div style={containerStyle}>
        <div>
          <h1 style={titleStyle}>Welcome to the Homepage</h1>
          <p>Start exploring our amazing website!</p>
          <button style={buttonStyle}>Get Started</button>
        </div>
      </div>
    </Container>
  );
};

export default Home;
