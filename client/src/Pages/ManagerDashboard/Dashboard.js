import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserCard from './Components/UserCard';
import Booking from './Components/Booking';
import Shift from './Components/Shift';
import { connect } from 'react-redux';
import { logout } from '../../store/_actions/authActions';
import { loadMyPad } from '../../store/_actions/padActions';
import { loadMyShift } from '../../store/_actions/shiftActions';
import { loadMyBooking } from '../../store/_actions/bookingAction';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '70vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  dashHero: {
    maxHeight: 240,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const heroImage = `https://picsum.photos/800/600`;

  useEffect(() => {
    props.loadMyPad();
  }, []);
  let { mypad } = props;

  const manager = props.auth.user;
  return (
    <div>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9} lg={9}>
            <Paper className={classes.dashHero}>
              {<img src={heroImage} className={classes.img} />}
            </Paper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Paper className={fixedHeightPaper}>
              <UserCard manager={manager} pad={mypad} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.paper}>
              <Shift />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Paper className={classes.paper}>
              <Booking pad={mypad} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  mypad: state.mypad,
  myshift: state.myshift,
  mybooking: state.mybooking,
});

export default connect(mapStateToProps, {
  logout,
  loadMyPad,
  loadMyShift,
  loadMyBooking,
})(Dashboard);
