import React, { useState, useEffects } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputBase,
  Typography,
  IconButton,
  Paper,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import {
  green,
  red,
  deepOrange,
  indigo,
  amber,
  grey,
} from '@material-ui/core/colors';
import serverURL from '../utils/serverURL';
import SearchIcon from '@material-ui/icons/Search';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: '10px',
  },
  searchRoot: {
    padding: '2px 2px',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
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

  title: {
    marginBottom: 10,
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
}));

function MyBooking() {
  const classes = useStyles();
  const [searchData, setSearchData] = useState({});
  const [booking, setBooking] = useState({});
  const [shift, setShift] = useState({});
  const [notFound, setNotFound] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${serverURL}bookings`, searchData)
      .then((res) => {
        if (!res.data.bandname) {
          setBooking({});
          setShift({});
          setNotFound(true);
        } else {
          console.log(res.data);
          setBooking(res.data);
          setShift(res.data.shift);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Grid container justify='center' spacing='1' className={classes.paper}>
        <Grid item>
          <Paper
            component='form'
            onSubmit={searchHandler}
            className={classes.searchRoot}
          >
            <InputBase
              className={classes.input}
              placeholder='Booking ID'
              inputProps={{ 'aria-label': 'Booking ID' }}
              onChange={(e) => {
                setSearchData({ bookingid: e.target.value });
              }}
            />
            <IconButton
              type='submit'
              className={classes.iconButton}
              aria-label='search'
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={0}>
        {!booking?._id ? (
          <div className={classes.notFound}>
            <ErrorOutlineIcon className={classes.errorIcon} />
            <Typography variant='h3' component='h4' color='textSecondary'>
              Write Your Booking ID
            </Typography>
          </div>
        ) : (
          <div>
            <Grid container justify='center' spacing={0}>
              <Grid className={classes.details} item md={6}>
                <Typography
                  className={classes.title}
                  variant='h6'
                  align='center'
                  color='textPrimary'
                >
                  Booking Details
                </Typography>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size='small'
                    aria-label='a dense table'
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Booking ID: </span>
                        </TableCell>
                        <TableCell>{booking.bookingid}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Pad: </span>
                        </TableCell>
                        <TableCell>{booking.pad}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Shift: </span>
                        </TableCell>
                        <TableCell>
                          {shift.shiftname} ({shift.shiftstart} to{' '}
                          {shift.shiftend})
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Date: </span>
                        </TableCell>
                        <TableCell>{booking.date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Amount: </span>
                        </TableCell>
                        <TableCell>{shift.rent}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>
                            Booking Status:{' '}
                          </span>
                        </TableCell>
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
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid className={classes.details} item md={6}>
                <Typography
                  className={classes.title}
                  variant='h6'
                  align='center'
                  color='textPrimary'
                >
                  Band Details
                </Typography>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    size='small'
                    aria-label='a dense table'
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Band: </span>
                        </TableCell>
                        <TableCell>{booking.bandname}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Mobile: </span>
                        </TableCell>
                        <TableCell>{booking.bandmobile}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Email: </span>
                        </TableCell>
                        <TableCell>{booking.bandmail}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <span className={classes.subtitle}>Message: </span>
                        </TableCell>
                        <TableCell>{booking.message}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default MyBooking;
