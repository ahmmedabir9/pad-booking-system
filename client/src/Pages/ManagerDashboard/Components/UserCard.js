import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logout } from '../../../store/_actions/authActions';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function UserCard(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.manager.username}</Title>
      <Typography component='p' variant='h4'>
        {props.pad.padname}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {props.pad.area}
      </Typography>
      <Typography color='textSecondary' className={classes.depositContext}>
        {props.pad.district}
      </Typography>
      <Link className='link' to={`/Login`}>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={() => {
            props.logout(props.history);
          }}
          disableElevation
        >
          Logout
        </Button>
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(UserCard);
