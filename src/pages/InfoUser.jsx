import { Container } from '@mui/material';
import React from 'react';

function InfoUser() {
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <div
          style={{
            backgroundColor: 'orange',
            color: 'white',
            height: '30em',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Información de Usuario</h1>
        </div>
      </Container>
    </>
  );
}

export default InfoUser;
