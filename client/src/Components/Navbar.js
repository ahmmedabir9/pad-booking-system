import React, { Component } from 'react';
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 6,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(9),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
  },
  logo: {
    width: '60px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
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

        {props.auth.isAuthenticated ? (
          <Link className='link' to={`/Login`}>
            <Button
              variant='contained'
              color='danger'
              size='small'
              onClick={() => {
                props.logout(props.history);
              }}
              disableElevation
            >
              Logout
            </Button>
          </Link>
        ) : (
          <Link className='link' to={`/Login`}>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              disableElevation
            >
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
