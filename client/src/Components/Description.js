import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Description(props) {
  const classes = useStyles();
  const { desc, title } = props;

  return (
    <div>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Typography variant='p' paragraph gutterBottom>
        {desc}
      </Typography>
    </div>
  );
}

Description.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
