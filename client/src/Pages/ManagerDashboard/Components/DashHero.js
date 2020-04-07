import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import heroImage from '../../../assets/images/PadProfile/pad.jpg';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  DashHero: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  DashHeroContent: {
    position: 'relative',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
      paddingRight: 0,
    },
  },
}));

export default function DashHero(props) {
  const classes = useStyles();
  const { detail } = props;

  return (
    <Paper
      className={classes.DashHero}
      style={{ backgroundImage: `url(${heroImage})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={heroImage} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.DashHeroContent}>
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom>
              jhjh
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

DashHero.propTypes = {
  post: PropTypes.object,
};
