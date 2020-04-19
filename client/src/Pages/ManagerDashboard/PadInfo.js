import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  addMyPad,
  removeMyPad,
  loadMyPad,
} from '../../store/_actions/padActions';

import FileUpload from './utils/FileUpload';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '70vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fixedHeight: {
    height: 240,
  },
}));

function PadInfo(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [pad, setPad] = React.useState({});
  const [Image, setImage] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    const data = {
      padname: e.target.padname.value,
      padaddress: e.target.padaddress.value,
      padmobile: e.target.padmobile.value,
      area: e.target.area.value,
      adpay: e.target.adpay.value,
      district: e.target.district.value,
      padaddress: e.target.padaddress.value,
    };

    props.addMyPad(data);

    console.log(data);
    props.loadMyPad();
    setPad(props.pad);
    handleClose();

    e.preventDefault();
  };

  const handleDelete = () => {
    props.removeMyPad(pad._id);
    props.loadMyPad();
    setPad(props.pad);
  };

  const handleClickOpenUpdate = () => {
    setOpen(true);
  };

  const handleCloseUpdate = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    handleClickOpenUpdate();
  };

  useEffect(() => {
    props.loadMyPad();
    setPad(props.pad);
  }, []);

  const updateImages = (newImage) => {
    setImage(newImage);
  };

  return (
    <div>
      {!pad._id ? (
        <div className={classes.paper}>
          <h1>You dont have any pad</h1>
          <Button variant='outlined' color='primary' onClick={handleClickOpen}>
            Create Your Pad
          </Button>

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
                      id='padname'
                      label='Pad Name'
                      name='padname'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='padmobile'
                      label='Contact Number'
                      name='padmobile'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='padaddress'
                      label='Full Address'
                      name='padaddress'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='area'
                      label='Area'
                      name='area'
                      placeholder='ex: Uttara'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='district'
                      label='District'
                      name='district'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='adpay'
                      label='Advance Payable'
                      name='adpay'
                      placeholder='write %'
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
        </div>
      ) : (
        <div className={classes.paper}>
          <h1>{pad.padname}</h1>
          <Button variant='outlined' color='primary' onClick={handleDelete}>
            Delete Your Pad
          </Button>
          <Button variant='outlined' color='primary' onClick={handleUpdate}>
            Update Pad Details
          </Button>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleCloseUpdate}
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
                  id='padname'
                  label='Pad Name'
                  name='padname'
                  placeholder={pad.padname}
                  value={pad.padname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='padmobile'
                  label='Contact Number'
                  name='padmobile'
                  placeholder={pad.padmobile}
                  value={pad.padmobile}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='padaddress'
                  label='Full Address'
                  name='padaddress'
                  placeholder={pad.padaddress}
                  value={pad.padaddress}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='area'
                  label='Area'
                  name='area'
                  placeholder='ex: Uttara'
                  placeholder={pad.area}
                  value={pad.area}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='district'
                  label='District'
                  name='district'
                  placeholder={pad.district}
                  value={pad.district}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='adpay'
                  label='Advance Payable'
                  name='adpay'
                  placeholder='write %'
                  placeholder={pad.adpay}
                  value={pad.adpay}
                />
              </Grid>
              <Grid item xs={12}>
                <FileUpload
                  refreshFunction={updateImages}
                  setImage={setImage()}
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
    </div>
  );
}

export default connect(null, { addMyPad, removeMyPad, loadMyPad })(PadInfo);
