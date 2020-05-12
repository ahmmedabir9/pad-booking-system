import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import UpdateBooking from './Components/UpdateBooking';
import Typography from '@material-ui/core/Typography';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Paper, Icon, IconButton } from '@material-ui/core';
import {
  loadMyBooking,
  removeMyBooking,
  updateMyBooking,
} from '../../store/_actions/bookingAction';
import { green, red, amber, grey } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  notFound: {
    height: '63vh',
    justifyContent: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  errorIcon: {
    fontSize: '30vh',
    color: grey[500],
    textAlign: 'center',
  },
  pending: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: amber[900],
    textAlign: 'center',
    fontWeight: 700,
  },
  confirmed: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: green[900],
    textAlign: 'center',
    fontWeight: 700,
    color: '#fff',
  },
  cancelled: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: red[900],
    textAlign: 'center',
    fontWeight: 700,
  },
  paper: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
}));

function Booking(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [booking, setBooking] = React.useState({});
  const [shift, setShift] = React.useState({});
  const [status, setStatus] = useState([]);
  const { pad } = props;

  useEffect(() => {
    props.loadMyBooking(props.mypad);
  }, [props.mypad]);
  const { mybooking } = props;

  const handleClose = () => {
    setOpen(false);
    setId('');
  };

  return (
    <React.Fragment>
      {mybooking[0] ? (
        <Paper className={classes.paper}>
          <Typography
            component='h2'
            variant='h6'
            style={{ color: grey[900], fontWeight: 700, margin: '0px 5px' }}
            gutterBottom
          >
            Bookings
          </Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Booking ID</TableCell>
                  <TableCell>Band</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mybooking.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.bookingid}</TableCell>
                    <TableCell>{booking.bandname}</TableCell>
                    <TableCell>{booking.bandmobile}</TableCell>
                    <TableCell>{booking.shift.slug}</TableCell>
                    <TableCell>
                      {(booking.status === 0 && (
                        <div className={classes.pending}>Pending</div>
                      )) ||
                        (booking.status === 1 && (
                          <div className={classes.confirmed}>Confirmed</div>
                        )) ||
                        (booking.status === 2 && (
                          <div className={classes.cancelled}>Cancelled</div>
                        ))}
                    </TableCell>

                    <TableCell>
                      <PrimaryButton
                        onClick={() => {
                          setBooking(booking);
                          setShift(booking.shift);
                          setOpen(true);
                        }}
                        size='small'
                      >
                        Update
                      </PrimaryButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label='delete'
                        onClick={() => props.removeMyBooking(booking._id)}
                      >
                        <DeleteIcon style={{ color: red[800] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <UpdateBooking
              open={open}
              booking={booking}
              handleClose={handleClose}
              shift={shift}
            />
          </TableContainer>
        </Paper>
      ) : (
        <div className={classes.notFound}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          <Typography variant='h3' component='h4' color='textSecondary'>
            No Booking
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  mybooking: state.mybooking,
  mypad: state.mypad,
});

export default connect(mapStateToProps, {
  loadMyBooking,
  removeMyBooking,
  updateMyBooking,
})(Booking);
