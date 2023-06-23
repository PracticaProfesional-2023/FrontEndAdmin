import React, { useContext } from 'react';
import { Container, Typography, Paper, Avatar, Grid } from '@mui/material';
import { AuthContext } from '../contexts/authContext';

const InfoUser = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  const getInitials = (name) => {
    const names = name.split(' ');
    let initials = '';
    names.forEach((name) => {
      initials += name.charAt(0);
    });
    return initials.slice(0, 2).toUpperCase();
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Grid container justifyContent="center" alignItems="center" height="100%">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Paper
            elevation={3}
            sx={{
              padding: '2rem',
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              User Info
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              marginBottom="1rem"
            >
              <Avatar
                alt={user?.name}
                src={user?.avatar}
                sx={{
                  width: '100px',
                  height: '100px',
                  fontSize: '3rem',
                }}
              >
                {getInitials(user?.name)}
              </Avatar>
            </Grid>
            {isAuthenticated ? (
              <>
                <Typography
                  variant="h6"
                  style={{ fontWeight: 'lighter' }}
                  gutterBottom
                >
                  <Typography style={{ fontWeight: 'bold' }}>Name:</Typography>{' '}
                  {user.name}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ fontWeight: 'lighter' }}
                  gutterBottom
                >
                  <Typography style={{ fontWeight: 'bold' }}>Email:</Typography>{' '}
                  {user.email}
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle1" gutterBottom>
                User not logged in.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoUser;
