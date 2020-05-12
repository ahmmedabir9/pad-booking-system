import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  addMyPad,
  removeMyPad,
  loadMyPad,
  updateMyPad,
} from '../../store/_actions/padActions';
import {
  grey,
} from '@material-ui/core/colors';
import { Typography, Paper } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import AddPad from './Components/AddPad';
import PadInfoForm from './Components/PadInfoForm';
import serverURL from '../../utils/serverURL';

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
  notFound: {
    height: '35vh',
    justifyContent: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  errorIcon: {
    fontSize: '20vh',
    color: grey[500],
    textAlign: 'center',
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
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  fixedHeight: {
    height: 240,
  },
}));

function PadInfo(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [pad, setPad] = React.useState({});
  const [Image, setImage] = useState('');
  const [ImageToSave, setImageToSave] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.loadMyPad();
  }, []);

  const { mypad } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      padname: e.target.padname.value,
      desc: e.target.desc.value,
      padaddress: e.target.padaddress.value,
      padmobile: e.target.padmobile.value,
      area: e.target.area.value,
      adpay: e.target.adpay.value,
      district: e.target.district.value,
      padaddress: e.target.padaddress.value,
      image: '',
    };

    props.addMyPad(data);

    console.log(data);
    handleClose();
  };

  const handleDelete = () => {
    props.removeMyPad(pad._id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (ImageToSave === '') {
      setImageToSave(pad.image);
    }
    const data = {
      padname: e.target.padname.value,
      padaddress: e.target.padaddress.value,
      padmobile: e.target.padmobile.value,
      area: e.target.area.value,
      adpay: e.target.adpay.value,
      district: e.target.district.value,
      padaddress: e.target.padaddress.value,
      image: ImageToSave,
    };

    props.updateMyPad(props.pad._id, data);

    console.log(data);
    props.loadMyPad();
    setPad(props.pad);
    handleClose();
  };

  const fileSelectedHandler = (event) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('padimage', event.target.files[0]);

    console.log(formData);

    axios
      .post(`${serverURL}managepad/upload`, formData, config)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.image);
          setImageToSave(response.data.image);
        } else {
          alert('Failed to save the Image in Server');
        }
      });
  };

  return (
    <div>
      {!mypad?._id ? (
        <div className={classes.notFound}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          <Typography variant='h3' component='h4' color='textSecondary'>
            You Don't have any Pad yet!
          </Typography>
          <PrimaryButton onClick={handleClickOpen}>
            Create Your Pad
          </PrimaryButton>
        </div>
      ) : (
        <Paper className={classes.paper}>
          <div style={{ margin: 10 }}>
            <Typography component='h1' variant='h5' align='center'>
              {mypad.padname}
            </Typography>
            <Typography
              component='p'
              variant='p'
              color='textSecondary'
              align='center'
            >
              {mypad.area}, {mypad.district}
            </Typography>
          </div>
          <PadInfoForm
            open={open}
            handleClose={handleClose}
            handleUpdate={handleUpdate}
            pad={mypad}
            fileSelectedHandler={fileSelectedHandler}
            handleDelete={handleDelete}
          />
        </Paper>
      )}

      <AddPad
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        fileSelectedHandler={fileSelectedHandler}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  mypad: state.mypad,
});

export default connect(mapStateToProps, {
  addMyPad,
  removeMyPad,
  loadMyPad,
  updateMyPad,
})(PadInfo);
