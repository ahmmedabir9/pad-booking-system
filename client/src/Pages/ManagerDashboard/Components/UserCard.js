import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from '../../../store/_actions/authActions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SecondaryButton from '../../../Components/Buttons/SecondaryButton';

const useStyles = makeStyles({
  manager: {
    display: 'flex',
    marginBottom: 4,
  },
});

function UserCard(props) {
  const classes = useStyles();

  const { manager, pad } = props;
  return (
    <React.Fragment>
      <div className={classes.manager}>
        <FiberManualRecordIcon
          style={{ fontSize: 20, color: 'green', justifyContent: 'center' }}
        />
        <Typography
          component='p'
          variant='h6'
          style={{ margin: '0px 5px' }}
          gutterBottom
        >
          {manager.username}
        </Typography>
        <Link className='link' to={`/go-jam/Login`}>
          <SecondaryButton
            size='small'
            onClick={() => {
              props.logout(props.history);
            }}
            disableElevation
          >
            Logout
          </SecondaryButton>
        </Link>
      </div>
      <Divider />
      <Typography style={{ marginTop: '5px' }} component='h6' variant='h5'>
        {pad.padname}
      </Typography>
      <Typography color='textSecondary'>{pad.padmobile}</Typography>
      <Typography color='textSecondary'>{pad.padaddress}</Typography>
      <Typography color='textSecondary'>
        {pad.area}, {pad.district}
      </Typography>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(UserCard);
