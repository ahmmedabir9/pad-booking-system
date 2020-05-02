import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PrimaryButton from './Buttons/PrimaryButton';
import SecondaryButton from './Buttons/SecondaryButton';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
} from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    borderRadius: 2,
  },
  area: {
    paddingLeft: 5,
    fontWeight: 600,
  },
  cardTitle: {
    minHeight: '35px',
    wordWrap: 'break-word',
    margin: 0,
  },
  content: {
    padding: 12,
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
            height='220'
            image={heroImage}
            title='Pad Image'
          />
          <CardContent className={classes.content}>
            <Typography
              variant='h6'
              component='h4'
              className={classes.cardTitle}
            >
              {pad.padname}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              <LocationOnIcon fontSize='small' />
              {pad.padaddress}
            </Typography>
            <Typography
              className={classes.area}
              variant='body2'
              color='textSecondary'
            >
              {pad.area}, {pad.district}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Link className='link' to={`/pad/${pad.slug}`}>
          <PrimaryButton variant='contained' size='small' disableElevation>
            View Details
          </PrimaryButton>
        </Link>
        <Link className='link' to={`/Booking/${pad.slug}`}>
          <SecondaryButton variant='contained' size='small' disableElevation>
            Book Now
          </SecondaryButton>
        </Link>
      </CardActions>
    </Card>
  );
}
