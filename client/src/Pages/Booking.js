import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import ShiftForm from '../Components/ShiftForm';
import BookingForm from '../Components/BookingForm';
import BookingReview from '../Components/BookingReview';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import LuxonUtils from '@date-io/luxon';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function BookingPage({ match }) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [pad, setPad] = React.useState({});
  const [shifts, setShifts] = React.useState([]);

  const [bookingShift, setBookingShift] = React.useState('');
  const [bookingDate, setBookingDate] = React.useState('');
  const [bandName, setBandName] = React.useState('');
  const [bandMobile, setBandMobile] = React.useState('');
  const [bandMail, setBandMail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const [notAvailable, setNotAvailable] = React.useState(false);

  let slug = match.params.id;

  const [savedBooking, setSavedBooking] = React.useState({});

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/pads/' + slug)
      .then((res) => {
        console.log(res.data);
        setPad(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get('http://localhost:5000/api/shifts/' + slug)
      .then((res) => {
        console.log(res.data);
        setShifts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setBookingDate(selectedDate.c);
  });

  const handleClickOpen = (event, res) => {
    setOpen(true);

    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (e) => {
    handleClose();
  };

  const submitHandler = (event) => {
    let dateToSubmit = `${bookingDate.day}/${bookingDate.month}/${bookingDate.year}`;

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
        console.log(res.data);
        if (res.data.booking) {
          setSavedBooking(res.data.booking);
          setOpen(true);
        } else if (!res.data.booking) {
          setNotAvailable(true);
        }
      })
      .catch((err) => console.log(err));

    event.preventDefault();
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='left'>
            {pad.padname}
          </Typography>
          <Typography component='p' variant='span' align='left'>
            {pad.area}, {pad.district}
          </Typography>
        </Paper>

        <Typography component='h1' variant='h4' align='center'>
          Booking
        </Typography>
        {notAvailable ? (
          <Typography variant='h4' gutterBottom>
            This Shift is not available, Select another
          </Typography>
        ) : null}
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant='h6' gutterBottom>
              Select Your Shift
            </Typography>
            <form onSubmit={submitHandler} className={classes.form} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <DatePicker
                      required
                      value={selectedDate}
                      onChange={handleDateChange}
                      label='Shift Date'
                      id='bookingDate'
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='label'>Shift</InputLabel>
                  <Select
                    native
                    required
                    onChange={(e) => {
                      setBookingShift(e.target.value);
                    }}
                    label='Shift'
                    id='shift'
                    fullWidth>
                    {shifts.map((shift, i) => (
                      <option key={i} value={shift.slug}>
                        {shift.shiftname} - {shift.shiftstart}
                      </option>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id='bandname'
                    name='bandname'
                    label='Band Name'
                    onChange={(e) => {
                      setBandName(e.target.value);
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
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
                    required
                    id='bandmail'
                    name='bandmail'
                    onChange={(e) => {
                      setBandMail(e.target.value);
                    }}
                    label='Email ID'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id='message'
                    name='message'
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    label='Leave a Message for Pad Manager'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}>
                Book Now
              </Button>
            </form>
          </React.Fragment>
        </Paper>
      </main>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {savedBooking.bookingid} has booked
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
