import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Dashboard from './Dashboard';
import Booking from './Booking';
import PadInfo from './PadInfo';
import Manager from './Manager';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import BookIcon from '@material-ui/icons/Book';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import { connect } from 'react-redux';
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
}));

function ManagerDashboard(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    props.loadMyPad();
    props.loadMyShift();
  }, []);

  const manager = props.auth.user;
  const { mypad, myshift } = props;

  const booking = [
    {
      bandName: 'Greeen Heartz',
      bandPhone: '6:00 PM',
      shift: 'Evening(6:00 to 9:00)',
      date: '12/5/2020',
      payment: 700,
    },
    {
      bandName: 'Shongkranti',
      bandPhone: '0176353422',
      shift: 'Evening(6:00 to 9:00)',
      date: '12/5/2020',
      payment: 700,
    },
  ];

  // const [pad, setPad] = React.useState([]);

  return (
    <div className={classes.root}>
      <Drawer variant='permanent' className='drawerPaper'>
        <List>
          <div>
            <Link className='link' to={`/go-jam/ManagerDashboard`}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Dashboard' />
              </ListItem>
            </Link>
            <Link className='link' to={`/go-jam/ManagerDashboard/Booking`}>
              <ListItem button>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Booking' />
              </ListItem>
            </Link>
            <Link className='link' to={`/go-jam/ManagerDashboard/PadInfo`}>
              <ListItem button>
                <ListItemIcon>
                  <MusicVideoIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Pad Info' />
              </ListItem>
            </Link>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth='lg' className={classes.container}>
          <Switch>
            <Route
              path='/go-jam/ManagerDashboard'
              exact
              render={() => <Dashboard />}
            />
            <Route
              path='/go-jam/ManagerDashboard/Booking'
              render={() => <Booking pad={mypad} />}
            />
            <Route
              path='/go-jam/ManagerDashboard/PadInfo'
              render={() => <PadInfo pad={mypad} />}
            />
          </Switch>
        </Container>
      </main>
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
  loadMyPad,
  loadMyShift,
  loadMyBooking,
})(ManagerDashboard);
