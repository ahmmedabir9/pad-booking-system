import React, { useState } from 'react';
import {
  Input,
  Grid,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { updateMyPad } from '../../../store/_actions/padActions';

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
    display: 'flex',
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

function PadInfoForm(props) {
  const classes = useStyles();

  let { pad, handleUpdate, fileSelectedHandler } = props;
  const [data, setData] = useState(pad);

  const changeHandler = (event) => {
    setData({ [event.target.name]: event.target.value });
  };

  let padImage;
  if (pad.image) {
    padImage = `http://localhost:5000/${pad.image}`;
  }
  return (
    <div>
      <form onSubmit={handleUpdate} className={classes.form} noValidate>
        <Grid container spacing={2} className={classes.container} xs={12}>
          <Grid xs={12}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                label='Pad Name'
                name='padname'
                value={data.padname}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                id='padmobile'
                label='Contact Number'
                name='padmobile'
                value={data.padmobile}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                id='padaddress'
                label='Full Address'
                name='padaddress'
                value={data.padaddress}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                id='area'
                label='Area'
                name='area'
                placeholder='ex: Uttara'
                value={data.area}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                id='district'
                label='District'
                name='district'
                value={data.district}
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                id='adpay'
                label='Advance Payable'
                name='adpay'
                placeholder='write %'
                value={data.adpay}
                onChange={changeHandler}
              />
            </Grid>
          </Grid>
          <Grid xs={12}>
            {!pad.image ? (
              <Grid item xs={12}>
                <Input type='file' onChange={fileSelectedHandler} />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <img src={padImage} style={{ maxWidth: '420px' }} />
                <p>Change Image</p>
                <Input type='file' onChange={fileSelectedHandler} />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Button type='submit' color='primary'>
          Update
        </Button>
      </form>
    </div>
  );
}

export default PadInfoForm;
