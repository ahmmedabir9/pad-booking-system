import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const BookingDialouge = () => {
  <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
    <form onSubmit={handleSubmit} className={classes.form} noValidate>
      <DialogTitle id='form-dialog-title'>{booking.bookingid}</DialogTitle>
      <DialogTitle id='form-dialog-title'>{booking._id}</DialogTitle>
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
  </Dialog>;
};

export default BookingDialouge;
