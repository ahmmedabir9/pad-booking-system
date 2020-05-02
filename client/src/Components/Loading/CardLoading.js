import React from 'react';
import { Card, CardContent, CardActionArea } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    borderRadius: 2,
  },
  content: {
    padding: 12,
  },
}));

function CardLoading() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton animation='wave' variant='rect' height={220} />
        <CardContent className={classes.content}>
          <Skeleton animation='wave' height={35} style={{ marginBottom: 6 }} />
          <Skeleton animation='wave' height={16} width='80%' />
          <Skeleton animation='wave' height={16} width='80%' />
        </CardContent>
        <Skeleton animation='wave' variant='rect' height={42} />
      </CardActionArea>
    </Card>
  );
}

export default CardLoading;
