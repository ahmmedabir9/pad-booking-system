import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { logout } from '../store/_actions/authActions';

import { connect } from 'react-redux';
function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary'>
      {'Copyright © '}
      <a
        style={{ textDecoration: 'none' }}
        target='_blank'
        href='https://ahmmedabir.me/'
      >
        Ahmmed Abir
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
    textAlign: 'center',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  link: {
    marginBottom: 2,
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth='sm'>
          <div className={classes.link}>
            {props.auth.isAuthenticated ? (
              <Link className='link' to={`/go-jam/ManagerDashboard`}>
                Manager Area
              </Link>
            ) : (
              <Link className='link' to={`/go-jam/Login`}>
                Manager Area
              </Link>
            )}
          </div>

          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Footer);
