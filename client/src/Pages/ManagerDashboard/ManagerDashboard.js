import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Dashboard from './Dashboard';
import Shift from './Shift';
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

import { connect } from 'react-redux';
import { logout } from '../../store/_actions/authActions';

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

  const user = props.auth.user;

  const pad = {
    padname: 'Get Funked Practice Pad',
    location: 'Uttara',
  };

  const padShift = [
    {
      shiftName: 'Evening',
      startTime: '6:00 PM',
      endTime: '9:00 PM',
      rent: 700,
    },
    {
      shiftName: 'Night',
      startTime: '9:00 PM',
      endTime: '12:00 PM',
      rent: 700,
    },
    {
      shiftName: 'Afternoon',
      startTime: '3:00 PM',
      endTime: '6:00 PM',
      rent: 700,
    },
  ];

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

  console.log(user);

  // const [pad, setPad] = React.useState([]);

  useEffect(() => {
    // axios
    //   .get('http://localhost:5000/api/pads')
    //   .then((res) => {
    //     console.log(res.data);
    //     setPad(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <Drawer variant='permanent' className='drawerPaper'>
        <List>
          <div>
            <Link className='link' to={`/ManagerDashboard`}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Dashboard' />
              </ListItem>
            </Link>
            <Link className='link' to={`/ManagerDashboard/Shift`}>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Shift' />
              </ListItem>
            </Link>
            <Link className='link' to={`/ManagerDashboard/Booking`}>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Booking' />
              </ListItem>
            </Link>
            <Link className='link' to={`/ManagerDashboard/PadInfo`}>
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Pad Info' />
              </ListItem>
            </Link>
            <Link className='link' to={`/ManagerDashboard/Manager`}>
              <ListItem button>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText className='dashText' primary='Manager' />
              </ListItem>
            </Link>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth='lg' className={classes.container}>
          <Route
            path='/ManagerDashboard'
            exact
            render={() => (
              <Dashboard
                manager={user}
                pad={pad}
                booking={booking}
                padShift={padShift}
              />
            )}
          />
          <Route
            path='/ManagerDashboard/Shift'
            render={() => <Shift padShift={padShift} />}
          />
          <Route path='/ManagerDashboard/Booking' render={() => <Booking />} />
          <Route path='/ManagerDashboard/PadInfo' render={() => <PadInfo />} />
          <Route path='/ManagerDashboard/Manager' render={() => <Manager />} />
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(ManagerDashboard);
