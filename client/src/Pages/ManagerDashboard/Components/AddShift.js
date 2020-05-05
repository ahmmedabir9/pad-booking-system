import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  DialogTitle,
  DialogContent,
  IconButton,
  Collapse,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  error: {
    margin: '0px 20px 20px 20px',
  },
}));

function AddPad(props) {
  const classes = useStyles();
  const { open, handleClose, handleSubmit, notAvailable, require } = props;
  const [errOpen, setErrOpen] = React.useState(true);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <DialogTitle id='form-dialog-title'>Add Shift</DialogTitle>

        {notAvailable ? (
          <Collapse in={errOpen}>
            <Alert
              className={classes.error}
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
              The Shift Name is already Taken<strong>Select another!</strong>
            </Alert>
          </Collapse>
        ) : null}
        {require ? (
          <Collapse in={errOpen}>
            <Alert
              className={classes.error}
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

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='shiftname'
                label='Shift Name'
                name='shiftname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='shiftstart'
                label='Shift Start Time'
                name='shiftstart'
                placeholder='ex: 3PM'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='shiftend'
                label='Shift End Time'
                placeholder='ex: 6PM'
                name='shiftend'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                id='rent'
                label='Rent'
                name='rent'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddPad;
