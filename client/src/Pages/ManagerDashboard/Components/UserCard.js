import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Button from '@material-ui/core/Button';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function UserCard(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.manager.username}</Title>
      <Typography component='p' variant='h4'>
        {props.pad.padname}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {props.pad.area}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {props.pad.district}
      </Typography>
    </React.Fragment>
  );
}