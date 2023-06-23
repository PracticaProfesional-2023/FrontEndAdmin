import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { flexbox } from '@mui/system';

function UserCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Typography variant="h7" sx={{ mt: 1, ml: 2 }}>
        Melissa Guardado
      </Typography>
    </div>
  );
}

export default UserCard;
