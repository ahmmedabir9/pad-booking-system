import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Card, CardMedia } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  img: {
    maxHeight: '50vh',
  },
}));

export default function PadGallery({ pad }) {
  const classes = useStyles();
  // const heroImage = `http://localhost:5000/${pad.image}`;
  const heroImage = `https://picsum.photos/500/400`;

  return (
    <Paper className={classes.gallery}>
      <Card>
        <CardMedia
          className={classes.img}
          component='img'
          alt='Pad Image'
          image={heroImage}
          title='Pad Image'
        />
      </Card>
    </Paper>
  );
}
