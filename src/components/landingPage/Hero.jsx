import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import myteam from '../../assets/myteam.jpg';
import useStyles from '../../styles/styles';
import { NavLink } from 'react-router-dom';

const Hero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            “Unlock Your Potential, Find Your Dream Job!”
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            HireJob provides a convenient and efficient way for job seekers to
            explore a wide range of employment opportunities. With just a few
            clicks, individuals can create a profile, upload their resumes, and
            browse through countless job listings from various industries.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            to="jobs-management"
            component={NavLink}
            sx={{ width: '200px', fontSize: '16px' }}
          >
            Job Positions
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={myteam} alt="My Team" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
