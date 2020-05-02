import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { CssBaseline, Grid, Container } from '@material-ui/core';
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Detail from '../Components/Detail';
import PadGallery from '../Components/PadGallery';
import Description from '../Components/Description';
import Shift from '../Components/Shift';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(4),
  },
  book: {
    marginTop: '8px',
    textAlign: 'right',
  },
}));

export default function PadDetails({ match }) {
  const classes = useStyles();
  const [detail, setDetail] = useState({});
  var slug = match.params.id;

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/pads/' + slug)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={7}>
            <PadGallery pad={detail} />
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Detail pad={detail} />
            <div className={classes.book}>
              <Link className='link' to={`/Booking/${slug}`}>
                <PrimaryButton fullWidth variant='contained'>
                  Book
                </PrimaryButton>
              </Link>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.mainGrid}>
          <Grid item xs={12} md={6} lg={6}>
            <Description title='Description' desc={detail.desc} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Shift slug={slug} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
