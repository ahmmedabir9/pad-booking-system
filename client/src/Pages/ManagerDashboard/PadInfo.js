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

import { Button } from '@material-ui/core';

import AddPad from './Components/AddPad';
import PadInfoForm from './Components/PadInfoForm';

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
    display: 'flex',
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
  const [Image, setImage] = useState('');
  const [ImageToSave, setImageToSave] = useState('');
  const [open, setOpen] = React.useState(false);

  // useEffect(() => {
  //   props.loadMyPad();
  // }, []);

  useEffect(() => {
    props.loadMyPad();
    setPad(props.pad);
  }, [props.pad]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    const data = {
      padname: e.target.padname.value,
      desc: e.target.desc.value,
      padaddress: e.target.padaddress.value,
      padmobile: e.target.padmobile.value,
      area: e.target.area.value,
      adpay: e.target.adpay.value,
      district: e.target.district.value,
      padaddress: e.target.padaddress.value,
      image: ImageToSave,
    };

    props.addMyPad(data);

    console.log(data);
    // props.loadMyPad();
    // setPad(props.pad);
    handleClose();

    e.preventDefault();
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

    axios.post('/api/managepad/upload', formData, config).then((response) => {
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
      {!pad?._id ? (
        <div className={classes.paper}>
          <h1>You dont have any pad</h1>
          <Button variant='outlined' color='primary' onClick={handleClickOpen}>
            Create Your Pad
          </Button>
        </div>
      ) : (
        <div className={classes.paper}>
          <h1>{pad.padname}</h1>
          <PadInfoForm
            open={open}
            handleClose={handleClose}
            handleUpdate={handleUpdate}
            pad={pad}
            fileSelectedHandler={fileSelectedHandler}
          />
          <Button variant='outlined' color='primary' onClick={handleDelete}>
            Delete Your Pad
          </Button>
        </div>
      )}

      <AddPad
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        pad={pad}
        fileSelectedHandler={fileSelectedHandler}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  pad: state.mypad,
});

export default connect(null, { addMyPad, removeMyPad, loadMyPad, updateMyPad })(
  PadInfo
);
