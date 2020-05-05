import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { red, amber, grey } from '@material-ui/core/colors';
import AddShift from './AddShift';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  loadMyShift,
  removeMyShift,
  addMyShift,
} from '../../../store/_actions/shiftActions';
import { loadMyPad } from '../../../store/_actions/padActions';

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: 8,
  },
}));

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
  const [notAvailable, setNotAvailable] = React.useState(false);
  const [require, setRequire] = React.useState(false);
  useEffect(() => {
    props.loadMyShift();
  }, []);

  let { myshift, mypad } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !e.target.shiftname.value ||
      !e.target.shiftstart.value ||
      !e.target.shiftend.value ||
      !e.target.rent.value
    )
      setRequire(true);
    else {
      const data = {
        shiftname: e.target.shiftname.value,
        shiftstart: e.target.shiftstart.value,
        shiftend: e.target.shiftend.value,
        rent: e.target.rent.value,
        pad: mypad.slug,
      };

      const res = props.addMyShift(data);
      if (!res) {
        setNotAvailable(true);
      } else {
        handleClose();
      }
    }
  };

  return (
    <React.Fragment>
      <Typography
        component='h2'
        variant='h6'
        style={{ color: grey[900], fontWeight: 700, margin: '0px 5px' }}
        gutterBottom
      >
        Shifts
      </Typography>
      <TableContainer className={classes.table}>
        <Table size='small' gutterBottom>
          <TableHead>
            <TableRow>
              <StyledTableCell>Shift</StyledTableCell>
              <StyledTableCell>Start</StyledTableCell>
              <StyledTableCell>End</StyledTableCell>
              <StyledTableCell>Rent</StyledTableCell>
              <StyledTableCell>Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myshift.map((shift) => (
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
                    <DeleteIcon style={{ color: red[900] }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PrimaryButton variant='contained' onClick={handleClickOpen}>
        Add new Shift
      </PrimaryButton>
      <AddShift
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        notAvailable={notAvailable}
        require={require}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  myshift: state.myshift,
  mypad: state.mypad,
});

export default connect(mapStateToProps, {
  loadMyShift,
  removeMyShift,
  addMyShift,
})(Shift);
