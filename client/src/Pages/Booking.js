import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import {
  Typography,
  IconButton,
  Collapse,
  Paper,
  InputAdornment,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BookingConfirmation from '../Components/BookingConfirmation';
import LuxonUtils from '@date-io/luxon';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
  container: {
    marginTop: 10,
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  form: {
    marginTop: '15px',
  },
}));

export default function BookingPage({ match }) {
  const classes = useStyles();

  const [selectedDate, handleDateChange] = useState(null);
  const [pad, setPad] = React.useState({});
  const [shifts, setShifts] = React.useState([]);
  const [bookingShift, setBookingShift] = React.useState(null);
  const [bandName, setBandName] = React.useState(null);
  const [bandMobile, setBandMobile] = React.useState(null);
  const [bandMail, setBandMail] = React.useState(null);
  const [message, setMessage] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [errOpen, setErrOpen] = React.useState(true);
  const [notAvailable, setNotAvailable] = React.useState(false);
  const [require, setRequire] = React.useState(false);
  const [savedBooking, setSavedBooking] = React.useState({});
  const [savedShift, setSavedShift] = React.useState({});

  let slug = match.params.id;

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/pads/' + slug)
      .then((res) => {
        setPad(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get('http://localhost:5000/api/shifts/' + slug)
      .then((res) => {
        setShifts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!bandName || !bandMobile || !bandMail || !bookingShift || !selectedDate)
      setRequire(true);
    else {
      let dateToSubmit = `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`;
      let data = {
        bandname: bandName,
        bandmobile: bandMobile,
        bandmail: bandMail,
        pad: slug,
        date: dateToSubmit,
        shift: bookingShift,
        message: message,
      };

      axios
        .post('http://localhost:5000/api/bookings/add-booking', data)
        .then((res) => {
          if (res.data.booking) {
            setNotAvailable(false);
            setRequire(false);
            setSavedBooking(res.data.booking);
            setSavedShift(res.data.booking.shift);
            setOpen(true);
          } else if (!res.data.booking) {
            setNotAvailable(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h5' align='center'>
          {pad.padname}
        </Typography>
        <Typography
          component='p'
          variant='p'
          color='textSecondary'
          align='center'
        >
          {pad.area}, {pad.district}
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <React.Fragment>
          <Typography variant='h6' align='center' gutterBottom>
            Booking
          </Typography>
          {notAvailable ? (
            <Collapse in={errOpen}>
              <Alert
                variant='outlined'
                severity='warning'
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setErrOpen(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
              >
                This Shift is Already Booked<strong>Select another!</strong>
              </Alert>
            </Collapse>
          ) : null}
          {require ? (
            <Collapse in={errOpen}>
              <Alert
                variant='outlined'
                severity='error'
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setErrOpen(false);
                    }}
                  >
                    <CloseIcon fontSize='inherit' />
                  </IconButton>
                }
              >
                <strong>Please Fillup all the Fields!</strong>
              </Alert>
            </Collapse>
          ) : null}
          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='label'>Shift</InputLabel>
                  <Select
                    onChange={(e) => {
                      setBookingShift(e.target.value);
                    }}
                    label='Shift'
                    id='shift'
                    fullWidth
                    placeholder='Select a Shift'
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    {shifts.map((shift, i) => (
                      <MenuItem key={i} value={shift}>
                        {shift.shiftname} - {shift.shiftstart}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                  <KeyboardDatePicker
                    variant='inline'
                    format='dd/MM/yyyy'
                    value={selectedDate}
                    onChange={handleDateChange}
                    label='Shift Date'
                    id='bookingDate'
                    fullWidth
                    placeholder='DD/MM/YYYY'
                    displayEmpty
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EventAvailableIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SupervisorAccountIcon />
                      </InputAdornment>
                    ),
                  }}
                  id='bandname'
                  name='bandname'
                  label='Band Name'
                  onChange={(e) => {
                    setBandName(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  id='bandmobile'
                  name='bandmobile'
                  label='Mobile Number'
                  onChange={(e) => {
                    setBandMobile(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  id='bandmail'
                  name='bandmail'
                  onChange={(e) => {
                    setBandMail(e.target.value);
                  }}
                  label='Email'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='message'
                  name='message'
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  label='Leave a Message for Pad Manager'
                  fullWidth
                  multiline
                  rows={4}
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <Grid className={classes.container} container>
              <PrimaryButton
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Book Now
              </PrimaryButton>
            </Grid>
          </form>
        </React.Fragment>
      </Paper>

      <BookingConfirmation
        open={open}
        handleClose={handleClose}
        savedBooking={savedBooking}
        pad={pad}
        shift={savedShift}
      />
    </React.Fragment>
  );
}
