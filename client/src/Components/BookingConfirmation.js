import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import SecondaryButton from '../Components/Buttons/SecondaryButton';

import { grey, red } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';

import logo from '../assets/images/Icons/GoJam-Logo.png';
const styles = (theme) => ({
  root: {
    margin: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
  },
  logo: {
    width: '50px',
  },
  grow: {
    flexGrow: 1,
  },
});

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: 700,
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    color: grey[700],
  },
  highlight: {
    color: red[700],
    fontWeight: 'bold',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      <div className={classes.grow} />
      <img className={classes.logo} src={logo} />
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
function BookingConfirmation(props) {
  const { handleClose, open, savedBooking, pad, shift } = props;

  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby='form-dialog-title'
        className={classes.dialog}
        fullWidth='true'
        maxWidth='sm'
      >
        <DialogTitle id='customized-dialog-title'>Booking</DialogTitle>
        <DialogContent dividers>
          <Alert severity='success' align='center'>
            <AlertTitle>Booking Successful</AlertTitle>
            Your Booking is saved!
          </Alert>
          {pad.adpay === 0 ? null : (
            <Typography
              variant='subtitle1'
              align='center'
              color='textSecondary'
            >
              <span>
                To confirm your booking Please send{' '}
                <span className={classes.highlight}>
                  {(shift.rent / 100) * pad.adpay} Taka
                </span>
                ({pad.adpay}% of your Payment) by Bkash/Rocket to{' '}
                <span className={classes.highlight}>{pad.padmobile}</span> using{' '}
                <span className={classes.highlight}>
                  '{savedBooking.bookingid}'
                </span>{' '}
                (your booking id) as reference.
              </span>
            </Typography>
          )}
          <Typography
            className={classes.title}
            variant='h6'
            align='center'
            color='textPrimary'
          >
            Booking Details
          </Typography>
          <TableContainer>
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
                  <TableCell>{savedBooking.bookingid}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Pad: </span>
                  </TableCell>
                  <TableCell>{savedBooking.pad}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Shift: </span>
                  </TableCell>
                  <TableCell>
                    {shift.shiftname} ({shift.shiftstart} to {shift.shiftend})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Date: </span>
                  </TableCell>
                  <TableCell>{savedBooking.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Amount: </span>
                  </TableCell>
                  <TableCell>{shift.rent}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Paid Amount: </span>
                  </TableCell>
                  <TableCell>{savedBooking.paid}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            className={classes.title}
            variant='h6'
            align='center'
            color='textPrimary'
          >
            Band Details
          </Typography>
          <TableContainer>
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
                  <TableCell>{savedBooking.bandname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Mobile: </span>
                  </TableCell>
                  <TableCell>{savedBooking.bandmobile}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Email: </span>
                  </TableCell>
                  <TableCell>{savedBooking.bandmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <span className={classes.subtitle}>Message: </span>
                  </TableCell>
                  <TableCell>{savedBooking.message}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BookingConfirmation;
