import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Input,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
  TextareaAutosize,
} from '@material-ui/core';

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

function AddPad(props) {
  const classes = useStyles();
  let { open, handleClose, pad, handleSubmit, fileSelectedHandler } = props;
  let padImage;
  if (pad?.image) {
    padImage = `http://localhost:5000/${pad.image}`;
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className={classes.container}>
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
                <textarea
                  variant='outlined'
                  required
                  fullWidth
                  id='desc'
                  label='Description'
                  name='desc'
                  placeholder={pad.desc}
                  value={pad.desc}
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
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input type='file' onChange={fileSelectedHandler} />
              </Grid>
              {pad.image && (
                <Grid item xs={12}>
                  <img src={padImage} style={{ maxWidth: '100%' }} />
                </Grid>
              )}
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
  );
}

export default AddPad;
