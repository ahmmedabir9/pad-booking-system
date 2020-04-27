import React, { useState, useEffect } from 'react';
import PadCard from './PadCard';
import axios from 'axios';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { InputBase, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: '10px',
  },
  control: {
    padding: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    display: 'flex',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    width: '100%',
  },
}));

export default function Cards() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [cards, setCards] = React.useState([]);
  const [searchData, setSearchData] = React.useState({});

  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/pads', searchData)
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post('http://localhost:5000/api/pads')
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div container className={classes.root} spacing={2}>
      <Grid
        container
        justify='center'
        spacing={spacing}
        className={classes.paper}>
        <Grid item xs={12} md={3}>
          <form onSubmit={searchHandler}>
            <div className={classes.search}>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(e) => {
                  setSearchData({ key: e.target.value });
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button type='submit' size='small'>
                Search
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={spacing}>
            {cards.map((pad) => (
              <Grid key={pad} item>
                <PadCard key={pad._id} pad={pad} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
