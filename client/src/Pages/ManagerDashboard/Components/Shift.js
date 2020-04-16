import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
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

function Shift(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [shifts, setShifts] = React.useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

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

    console.log(data);

    handleClose();
  };

  useEffect(() => {
    props.loadMyShift();
  }, []);

  return (
    <React.Fragment>
      <Title>Shift</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Shift</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Rent</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.padShift.map((shift) => (
            <TableRow key={shift}>
              <TableCell>{shift.shiftname}</TableCell>
              <TableCell>{shift.shiftstart}</TableCell>
              <TableCell>{shift.shiftend}</TableCell>
              <TableCell>{shift.rent}</TableCell>
              <TableCell>
                <Button variant='outlined' size='small' color='primary'>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant='outlined'
                  color='primary'
                  size='small'
                  onClick={() => props.removeMyShift(shift._id)}>
                  Delete
                </Button>
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
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
