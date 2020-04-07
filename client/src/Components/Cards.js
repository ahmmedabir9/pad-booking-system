import React, { useState, useEffect } from "react";
import PadCard from "./PadCard";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function Cards() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pads")
      .then(res => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {cards.map(pad => (
            <Grid key={pad} item>
              <PadCard key={pad._id} pad={pad} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
