import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import useStyles from '../styles/styles';

const Section = () => {
  const classes = useStyles();

  const sectionItems = [
    {
      id: 1,
      icon: <EngineeringOutlinedIcon sx={{ fontSize: 130 }} color="primary" />,
      sentence:
        'Unlike traditional job fairs or classified ads, these platforms are available 24/7',
    },
    {
      id: 2,
      icon: <AllInclusiveIcon sx={{ fontSize: 130 }} color="primary" />,
      sentence:
        'For employers, online job platforms provide a vast pool of talent from all over the world.',
    },
    {
      id: 3,
      icon: <PaidOutlinedIcon sx={{ fontSize: 130 }} color="primary" />,
      sentence:
        'A strong professional network for well-paying job opportunities',
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Grid container className={classes.sectionGridContainer}>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            minHeight={300}
            key={item.id}
            className={classes.sectionGridItem}
          >
            {item.icon}
            <Typography>{item.sentence}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section;
