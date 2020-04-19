import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  fixedHeight: {
    height: 240,
  },
}));

const FileUpload = (props) => {
  const classes = useStyles();

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    props.setImage(formData);
  };
  return (
    <div className={classes.paper}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={10000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '200px',
              height: '200px',
              border: '1px solid lightgrey',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}>
            <input {...getInputProps()} />
            <h6>Upload Images</h6>
          </div>
        )}
      </Dropzone>

      <div
        style={{
          width: '200px',
          height: '200px',
          border: '1px solid lightgrey',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'scroll',
        }}>
        <div onclick>
          <img />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
