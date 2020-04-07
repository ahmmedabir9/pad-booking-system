import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// import LuxonUtils from "@date-io/luxon";
// import {
//   DatePicker,
//   TimePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider
// } from "@material-ui/pickers";

export default function ShiftForm() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Your Shift
      </Typography>

      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <DatePicker
              required
              value={selectedDate}
              onChange={handleDateChange}
              label="Shift Date"
              id="bookingDate"
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid> */}
        <Grid item xs={12}>
          <InputLabel id="label">Shift</InputLabel>
          <Select
            required
            label="Shift Date"
            id="bookingDate"
            value="s1"
            fullWidth
          >
            <MenuItem value="s1">9:00AM</MenuItem>
            <MenuItem value="s2">12:00AM</MenuItem>
            <MenuItem value="s3">3:00AM</MenuItem>
            <MenuItem value="s4">6:00AM</MenuItem>
            <MenuItem value="s5">9:00AM</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="label">Extra Accesorries</InputLabel>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                value="yes"
                fullWidth
              />
            }
            label="Double Padel"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                value="yes"
                fullWidth
              />
            }
            label="Mre Than 2 Guitars"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
