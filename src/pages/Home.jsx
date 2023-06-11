import { Box, Container } from '@mui/material';
import React from 'react';

const Home = () => {
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
    </Container>
  );
};

export default Home;
