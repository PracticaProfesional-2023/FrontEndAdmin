import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import bestTeams from '../../assets/bestTeams.jpg';
import useStyles from '../../styles/styles';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.aboutUsContainer}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={5}>
          <img src={bestTeams} alt="My Team" className={classes.largeImage} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            We hire, We revive
          </Typography>
          <Typography className={classes.aboutUsSubtitle}>
            Your business needs to be in good hands at all times. We make sure
            you never run out of workers and have no losses. More than 500
            companies trust us to offer our qualified employee recruitment
            services.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            to="users"
            component={NavLink}
            sx={{ width: '200px', fontSize: '16px' }}
          >
            Applicant List
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
