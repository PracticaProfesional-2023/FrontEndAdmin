import React from 'react';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

function Jobs() {
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <CssBaseline />
        <div
          style={{
            backgroundColor: 'orange',
            height: '30em',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Jobs Management</p>
        </div>
      </Container>
    </>
  );
}

export default Jobs;
