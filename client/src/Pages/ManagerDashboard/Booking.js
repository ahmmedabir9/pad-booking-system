import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Components/Title';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Dialog from '@material-ui/core/Dialog';
import { loadMyBooking } from '../../store/_actions/bookingAction';
import { loadMyPad } from '../../store/_actions/padActions';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function Booking(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('');

  useEffect(() => {
    props.loadMyBooking(props.pad);
  }, []);
  let { mybooking } = props;

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setId('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      shiftname: e.target.shiftname.value,
      shiftstart: e.target.shiftstart.value,
      shiftend: e.target.shiftend.value,
      rent: e.target.rent.value,
      pad: props.pad.slug,
    };

    props.addMyShift(data);

    console.log(data);

    handleClose();
  };

  return (
    <React.Fragment>
      <Title>Booking</Title>
      {mybooking ? (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Band</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.mybooking.map((booking) => (
              <TableRow key={booking}>
                <TableCell>{booking.bookingid}</TableCell>
                <TableCell>{booking.bandname}</TableCell>
                <TableCell>{booking.bandmobile}</TableCell>
                <TableCell>{booking.shift}</TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='secondary'
                    size='small'
                    onClick={() => {
                      handleClickOpen(booking._id);
                    }}>
                    Update
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='form-dialog-title'>
                    <form
                      onSubmit={handleSubmit}
                      className={classes.form}
                      noValidate>
                      <DialogTitle id='form-dialog-title'>
                        {booking.bookingid}
                      </DialogTitle>
                      <DialogTitle id='form-dialog-title'>
                        {booking._id}
                      </DialogTitle>
                      <DialogContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              variant='outlined'
                              required
                              fullWidth
                              id='shiftname'
                              label='Shift Name'
                              name='shiftname'
                            />
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                          Cancel
                        </Button>
                        <Button type='submit' color='primary'>
                          Save
                        </Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Button
            variant='outlined'
            color='primary'
            size='small'
            onClick={handleClickOpen}>
            Add new Shift
          </Button>
        </Table>
      ) : (
        <h2>No Bookings</h2>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  mybooking: state.mybooking,
});

export default connect(mapStateToProps, {
  loadMyBooking,
})(Booking);
