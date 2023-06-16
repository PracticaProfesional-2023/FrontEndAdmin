import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import useStyles from '../styles/styles';

const Footer = () => {
  const date = new Date().getFullYear();
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Typography className={classes.footerText}>
        Provided by HireJob
      </Typography>
      <Typography className={classes.footerDate}>
        Get Your Dream Job - ©Copyright 2023
      </Typography>
    </Box>
  );
};

export default Footer;
