import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from '../Components/DetailsHeader';
import Detail from '../Components/Detail';
import PadGallery from '../Components/PadGallery';
import Description from '../Components/Description';
import Shift from '../Components/Shift';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(4),
  },
}));

export default function PadDetails({ match }) {
  const classes = useStyles();
  const [detail, setDetail] = React.useState({});

  var slug = match.params.id;

  console.log(slug);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/pads/' + slug)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header detail={detail} />
        <Grid container spacing={4}>
          <PadGallery />
          <Detail pad={detail} />
        </Grid>
        <Grid container spacing={4} className={classes.mainGrid}>
          <Description title='Pad Description' pad={detail} />
          <Shift slug={slug} />
        </Grid>
        <Link className='link' to={`/Booking/${detail.slug}`}>
          <Button
            variant='contained'
            color='secondary'
            size='small'
            disableElevation>
            Book Now
          </Button>
        </Link>
      </Container>
    </React.Fragment>
  );
}
