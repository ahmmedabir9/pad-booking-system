import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
  green,
  red,
  deepOrange,
  indigo,
  amber,
  grey,
} from '@material-ui/core/colors';

export default function Title(props) {
  return (
    <Typography
      component='h2'
      variant='h6'
      style={{ color: grey[900], fontWeight: 700 }}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
