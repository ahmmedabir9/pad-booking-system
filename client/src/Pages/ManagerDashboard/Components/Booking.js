import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red, amber, grey } from '@material-ui/core/colors';
import AddShift from './AddShift';
import DeleteIcon from '@material-ui/icons/Delete';
import { loadMyPad } from '../../../store/_actions/padActions';
import { loadMyBooking } from '../../../store/_actions/bookingAction';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: 8,
  },
  notFound: {
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  errorIcon: {
    fontSize: '30vh',
    color: grey[500],
    textAlign: 'center',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: grey[300],
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Booking(props) {
  const classes = useStyles();
  const { mypad } = props;

  useEffect(() => {
    props.loadMyBooking(mypad);
  }, [props.mypad]);

  const { mybooking } = props;

  return (
    <React.Fragment>
      <Typography
        component='h2'
        variant='h6'
        style={{ color: grey[900], fontWeight: 700, margin: '0px 5px' }}
        gutterBottom
      >
        Pending Bookings
      </Typography>
      <TableContainer className={classes.table}>
        {mybooking[0] ? (
          <Table size='small'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Booking ID</StyledTableCell>
                <StyledTableCell>Band</StyledTableCell>
                <StyledTableCell>Shift</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mybooking.map((booking) =>
                booking.status === 0 ? (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.bookingid}</TableCell>
                    <TableCell>{booking.bandname}</TableCell>
                    <TableCell>{booking.shift.slug}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                  </TableRow>
                ) : null
              )}
            </TableBody>
          </Table>
        ) : (
          <div className={classes.notFound}>
            <ErrorOutlineIcon className={classes.errorIcon} />
            <Typography variant='h5' component='h6' color='textSecondary'>
              No Booking Pending
            </Typography>
          </div>
        )}
      </TableContainer>
      <Link className='link' to={`/go-jam/ManagerDashboard/Booking`}>
        <PrimaryButton fullWidth className={classes.margin} variant='contained'>
          All Booking
        </PrimaryButton>
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  mybooking: state.mybooking,
  mypad: state.mypad,
});

export default connect(mapStateToProps, {
  loadMyBooking,
  loadMyPad,
})(Booking);
