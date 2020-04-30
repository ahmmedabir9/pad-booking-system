import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import PrimaryButton from './Buttons/PrimaryButton';
import SecondaryButton from './Buttons/SecondaryButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
} from '@material-ui/core';
import { red, blueGrey } from '@material-ui/core/colors';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
    '&:hover': {
      backgroundColor: blueGrey[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    borderRadius: 2,
  },
  media: {
    height: 'auto',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function PadCard(props) {
  const classes = useStyles();
  const { pad } = props;
  const heroImage = `http://localhost:5000/${pad.image}`;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link className='link' to={`/pad/${pad.slug}`}>
          <CardMedia
            component='img'
            alt='Pad Image'
            height='250'
            image={heroImage}
            title='Pad Image'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h6'
              component='h4'
              className='card-title'
            >
              {pad.padname}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              <LocationOnIcon fontSize='small' />
              {pad.padaddress}
            </Typography>
            <Typography variant='body2' color='textDanger' component='p'>
              {pad.area}, {pad.district}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Link className='link' to={`/pad/${pad.slug}`}>
          <PrimaryButton
            variant='contained'
            color='primary'
            size='small'
            disableElevation
          >
            View Details
          </PrimaryButton>
        </Link>
        <Link className='link' to={`/Booking/${pad.slug}`}>
          <SecondaryButton variant='contained' disableElevation>
            Book Now
          </SecondaryButton>
        </Link>
      </CardActions>
    </Card>
  );
}
