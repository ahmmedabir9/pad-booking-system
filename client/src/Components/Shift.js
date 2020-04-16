import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    Width: 365,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function Shift(props) {
  const classes = useStyles();
  const { slug } = props;

  const [shifts, setShifts] = React.useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/shifts/' + slug)
      .then((res) => {
        console.log(res.data);
        setShifts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //http://localhost:5000/api/shifts/

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <div className={classes.cardDetails}>
          <CardContent>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
              <Typography
                variant='h6'
                gutterBottom
                className={classes.sidebarSection}>
                Shift Details
              </Typography>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Shift</TableCell>
                      <TableCell>Start Time</TableCell>
                      <TableCell>End Time</TableCell>
                      <TableCell>Rent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shifts.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell>{row.shiftname}</TableCell>
                        <TableCell>{row.shiftstart}</TableCell>
                        <TableCell>{row.shiftend}</TableCell>
                        <TableCell>{row.rent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
