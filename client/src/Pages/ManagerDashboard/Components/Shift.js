import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import {
  green,
  red,
  deepOrange,
  indigo,
  amber,
  grey,
} from '@material-ui/core/colors';
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

import { Dialog, Icon, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import {
  loadMyShift,
  removeMyShift,
  addMyShift,
} from '../../../store/_actions/shiftActions';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
    '&:hover': {
      backgroundColor: amber[700],
    },
  },
}))(Button);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: grey[300],
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Shift(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [shifts, setShifts] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    props.loadMyShift();
    setShifts(props.padShift);
  }, [props.padShift]);

  const handleClose = () => {
    setOpen(false);
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
    props.loadMyShift();
    handleClose();
  };

  return (
    <React.Fragment>
      <Title>Shift</Title>
      <Table size='small' gutterBottom>
        <TableHead>
          <TableRow>
            <StyledTableCell>Shift</StyledTableCell>
            <StyledTableCell>Start</StyledTableCell>
            <StyledTableCell>End</StyledTableCell>
            <StyledTableCell>Rent</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.map((shift) => (
            <TableRow key={shift}>
              <TableCell>{shift.shiftname}</TableCell>
              <TableCell>{shift.shiftstart}</TableCell>
              <TableCell>{shift.shiftend}</TableCell>
              <TableCell>{shift.rent}</TableCell>
              <TableCell>
                <IconButton
                  aria-label='delete'
                  onClick={() => props.removeMyShift(shift._id)}
                >
                  <DeleteIcon style={{ color: red[800] }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ColorButton
        className={classes.margin}
        variant='contained'
        color='secondary'
        onClick={handleClickOpen}
      >
        Add new Shift
      </ColorButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
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
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='shiftstart'
                  label='Shift Start Time'
                  name='shiftstart'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='shiftend'
                  label='Shift End Time'
                  name='shiftend'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='rent'
                  label='Rent'
                  name='rent'
                  placeholder='ex: Uttara'
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
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  myshift: state.myshift,
});

export default connect(mapStateToProps, {
  loadMyShift,
  removeMyShift,
  addMyShift,
})(Shift);
