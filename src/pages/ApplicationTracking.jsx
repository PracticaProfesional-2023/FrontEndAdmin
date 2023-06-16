import { Container } from '@mui/material';
import React from 'react';

const ApplicationTracking = () => {
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <div
          style={{
            color: 'black',
            backgroundColor: 'thistle',
            height: '30em',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          Job Tracking
        </div>
      </Container>
    </>
  );
};

export default ApplicationTracking;
