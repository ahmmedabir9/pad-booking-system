import React, { useState, useEffect, Suspense, lazy } from 'react';

import PadCard from './PadCard';
import CardLoading from './Loading/CardLoading';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {
  InputBase,
  Typography,
  IconButton,
  Paper,
  Grid,
  Box,
} from '@material-ui/core';
import serverURL from '../utils/serverURL';
import SearchIcon from '@material-ui/icons/Search';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: '10px',
  },
  searchRoot: {
    padding: '2px 2px',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  notFound: {
    height: '63vh',
    justifyContent: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  errorIcon: {
    fontSize: '30vh',
    color: grey[500],
    textAlign: 'center',
  },
}));

export default function Cards() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [loading, setLoading] = useState(true);
  let imgID = 1000;

  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${serverURL}pads`, searchData)
      .then((res) => {
        setLoading(false);
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setSearchData({});
    axios
      .post(`${serverURL}pads`)
      .then((res) => {
        setLoading(false);
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div container className={classes.root} spacing={2}>
      <Grid container justify='center' spacing='1' className={classes.paper}>
        <Grid item>
          <Paper
            component='form'
            onSubmit={searchHandler}
            className={classes.searchRoot}
          >
            <InputBase
              className={classes.input}
              placeholder='Search by Pad, Area, District'
              inputProps={{ 'aria-label': 'Search by Pad, Area, District' }}
              onChange={(e) => {
                setSearchData({ key: e.target.value });
              }}
            />
            <IconButton
              type='submit'
              className={classes.iconButton}
              aria-label='search'
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          {loading ? (
            <Grid container justify='center' spacing={2}>
              <Grid item>
                <CardLoading />
              </Grid>
              <Grid item>
                <CardLoading />
              </Grid>
              <Grid item>
                <CardLoading />
              </Grid>
            </Grid>
          ) : (
            <Grid container justify='center' spacing={2}>
              {!cards[0] ? (
                <div className={classes.notFound}>
                  <ErrorOutlineIcon className={classes.errorIcon} />
                  <Typography variant='h3' component='h4' color='textSecondary'>
                    No Pad Found
                  </Typography>
                </div>
              ) : (
                cards.map((pad) => (
                  <Grid key={pad} item>
                    <PadCard key={pad._id} pad={pad} imgID={imgID++} />
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
