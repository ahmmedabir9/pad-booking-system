import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent } from '@material-ui/core';
const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  title: {
    fontWeight: 700,
  },
});

export default function Detail({ pad }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography className={classes.title} component='h3' variant='title'>
            {pad.padname}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            <span className={classes.title}>Mobile: </span>
            {pad.padmobile}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            <span className={classes.title}>Location: </span>
            {pad.padaddress}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            <span className={classes.title}>Area: </span>
            {pad.area}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            <span className={classes.title}>District: </span>
            {pad.district}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
