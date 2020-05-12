import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PrimaryButton from '../../../Components/Buttons/PrimaryButton';
import DangerButton from '../../../Components/Buttons/DangerButton';

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
  form: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function PadInfoForm(props) {
  const classes = useStyles();

  let { pad, handleUpdate, fileSelectedHandler, handleDelete } = props;
  const [data, setData] = useState(pad);

  const changeHandler = (event) => {
    setData({ [event.target.name]: event.target.value });
  };

  // let padImage;
  // if (pad.image) {
  //   padImage = `${serverURL}${pad.image}`;
  // }
  return (
    <form onSubmit={handleUpdate} className={classes.form} noValidate>
      <Grid container spacing={2} className={classes.container} xs={12}>
        <Grid xs={12}>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              label='Pad Name'
              name='padname'
              value={data.padname}
              onChange={changeHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='desc'
              name='desc'
              label='Description'
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              value={data.desc}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              id='padmobile'
              label='Contact Number'
              name='padmobile'
              value={data.padmobile}
              onChange={changeHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              id='padaddress'
              label='Full Address'
              name='padaddress'
              value={data.padaddress}
              onChange={changeHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              id='area'
              label='Area'
              name='area'
              placeholder='ex: Uttara'
              value={data.area}
              onChange={changeHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              id='district'
              label='District'
              name='district'
              value={data.district}
              onChange={changeHandler}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='outlined'
              id='adpay'
              label='Advance Payable'
              name='adpay'
              placeholder='write %'
              value={data.adpay}
              onChange={changeHandler}
              fullWidth
            />
          </Grid>
        </Grid>
        {/* <Grid xs={12}>
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
          </Grid> */}
      </Grid>
      <Grid className={classes.button}>
        <PrimaryButton type='submit'>Update</PrimaryButton>
        <DangerButton onClick={handleDelete}>Delete Your Pad</DangerButton>
      </Grid>
    </form>
  );
}

export default PadInfoForm;
