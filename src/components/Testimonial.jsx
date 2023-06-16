import React from 'react';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import useStyles from '../styles/styles';

const Testimonial = () => {
  const classes = useStyles();
  const reviews = [
    {
      id: 1,
      name: 'Karl Brighton',
      statement:
        'Discovering my ideal job through an online job platform was a game-changer.Online job platforms are incredibly convenient and efficient but HireJob is the best choice for most people',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-kady.78fc482c.jpg',
      position: 'Software Engineer at Kadex',
    },
    {
      id: 2,
      name: 'Krishna Bells',
      statement:
        'HireJob transformed my career. Their advanced search features helped me find remote work opportunities that perfectly matched my skills and offered competitive pay.',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-aiysha.e119a0c1.jpg',
      position: 'Product Manager at Google',
    },
    {
      id: 3,
      name: 'Ben Spiff',
      statement:
        'The user-friendly interface and vast job listings allowed me to apply to positions aligned with my expertise. I found a job that offered a significant salary increase and growth opportunities.',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-arthur.098c2e26.jpg',
      position: 'Founder of Crypto',
    },
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
      }}
    >
      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item sm={12} md={4} key={review.id}>
            <Card className={classes.testimonialCard}>
              <CardContent>
                <Typography className={classes.testimonialStatement}>
                  "{review.statement}"
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Avatar
                    src={review.image_url}
                    size="large"
                    className={classes.avatar}
                  />
                  <Box>
                    <Typography>{review.name}</Typography>
                    <Typography className={classes.testimonialPosition}>
                      {review.position}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonial;
