import { Container } from '@mui/material';
import React from 'react';

function Users() {
  return (
    <>
      <Container sx={{ mt: 5, mb: 5 }}>
        <div
          style={{
            backgroundColor: 'gray',
            height: '30em',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>User Management</h1>
        </div>
      </Container>
    </>
  );
}

export default Users;
