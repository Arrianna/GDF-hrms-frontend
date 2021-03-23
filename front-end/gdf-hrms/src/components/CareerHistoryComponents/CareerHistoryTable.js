import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CareerHistoryTable(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let resultArray = [];        
    if(props.data !== {}){
      resultArray.push(props.data);
    }  
    setData(resultArray);
  }, [props.data]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Regimental Number</StyledTableCell>
            <StyledTableCell align="center">Position</StyledTableCell>
            <StyledTableCell align="center">Department</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => {
            return(
            <StyledTableRow key={row.regimentNumber}>
              <StyledTableCell align="center">{row.regimentNumber}</StyledTableCell>
              <StyledTableCell align="center">{row.position}</StyledTableCell>
              <StyledTableCell align="center">{row.department}</StyledTableCell>
              <StyledTableCell align="center">{row.startDate}</StyledTableCell>
              <StyledTableCell align="center">{row.endDate}</StyledTableCell>
            </StyledTableRow>
            );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
