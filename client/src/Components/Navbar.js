import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { logout } from '../store/_actions/authActions';

import logo from '../assets/images/Icons/GoJam-Logo.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: '50px',
  },
}));

function NavBar(props) {
  const classes = useStyles();

  return (
    <AppBar position='fixed' className='appBar'>
      <Toolbar>
        <Link className='nav-link' to='/'>
          <strong className='nav-logo'>
            <img className={classes.logo} src={logo} />
          </strong>
        </Link>
        <div className={classes.grow} />

        <Link className='link' to='/Login'>
          <Button
            variant='contained'
            color='danger'
            size='small'
            disableElevation
          >
            My Booking
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
