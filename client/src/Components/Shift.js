import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {
  Paper,
  Divider,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
    textAlign: 'center',
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: grey[300],
    color: theme.palette.common.black,
    fontWeight: 600,
  },
}))(TableCell);

export default function Shift({ slug }) {
  const classes = useStyles();
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/shifts/' + slug)
      .then((res) => {
        setShifts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardDetails}>
        <Paper elevation={0}>
          <Typography variant='h6' gutterBottom>
            Shifts
          </Typography>
          <Divider />
          <TableContainer>
            <Table aria-label='Shifts'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Shift</StyledTableCell>
                  <StyledTableCell>Start</StyledTableCell>
                  <StyledTableCell>End</StyledTableCell>
                  <StyledTableCell>Rent</StyledTableCell>
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
    </Card>
  );
}
