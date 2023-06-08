import { Container } from '@mui/material';
import React from 'react';

function Jobs() {
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <div
          style={{
            backgroundColor: 'red',
            color: 'white',
            height: '30em',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Job Application Tracking</h1>
        </div>
      </Container>
    </>
  );
}

export default Jobs;
