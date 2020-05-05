import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import serverURL from '../../../utils/serverURL';
import {
  Input,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  TextareaAutosize,
  Typography,
  Paper,
} from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  loadMyBooking,
  removeMyBooking,
  updateMyBooking,
} from '../../../store/_actions/bookingAction';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  status: {
    marginTop: 10,
  },
}));

function UpdateBooking(props) {
  const classes = useStyles();
  const [status, setStatus] = useState(0);
  let { open, handleClose, booking, shift } = props;

  useEffect(() => {
    setStatus(booking.status);
  }, [booking]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth='true' maxWidth='sm'>
      <DialogTitle>Booking status</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={5}>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Booking ID: </strong>
              {booking.bookingid}
            </Typography>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Band: </strong>
              {booking.bandname}
            </Typography>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Mobile: </strong>
              {booking.bandmobile}
            </Typography>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Email: </strong>
              {booking.bandmail}
            </Typography>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Shift: </strong>
              {shift.shiftname}
            </Typography>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Date: </strong>
              {booking.date}
            </Typography>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Shift Time: </strong>
              {shift.shiftstart}
            </Typography>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Amount: </strong>
              {shift.rent}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <Typography component='p' variant='p' gutterBottom>
              <strong>Message: </strong>
              {booking.message}
            </Typography>
            <Typography
              className={classes.status}
              component='p'
              variant='p'
              gutterBottom
            >
              <strong>Status: </strong>
              <FormControl className={classes.formControl}>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  value={status}
                >
                  <MenuItem value={0}>Pending</MenuItem>
                  <MenuItem value={1}>Confirmed</MenuItem>
                  <MenuItem value={2}>Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.container}></Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            props.updateMyBooking(booking._id, { status: status });
            handleClose();
          }}
          color='primary'
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  mybooking: state.mybooking,
});

export default connect(mapStateToProps, {
  loadMyBooking,
  removeMyBooking,
  updateMyBooking,
})(UpdateBooking);
