import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

export default function ShiftForm(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const shifts = props.shift;

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Select Your Shift
      </Typography>

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
            required
            onChange={(e) => {
              props.setBookingDetails({
                shift: e.target.value,
              });
            }}
            label='Shift'
            id='shift'
            fullWidth
          >
            {shifts.map((shift, i) => (
              <option key={i} value={shift._id}>
                {shift.shiftname} - {shift.shiftstart}
              </option>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id='label'>Extra Accesorries</InputLabel>
          <FormControlLabel
            control={
              <Checkbox
                color='secondary'
                name='saveAddress'
                value='yes'
                fullWidth
              />
            }
            label='Double Padel'
          />
          <FormControlLabel
            control={
              <Checkbox
                color='secondary'
                name='saveAddress'
                value='yes'
                fullWidth
              />
            }
            label='Mre Than 2 Guitars'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
