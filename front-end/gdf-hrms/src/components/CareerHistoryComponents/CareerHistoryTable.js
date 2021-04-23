import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

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
  let data = props.data;
  //console.log(data);
  const showResults = () => {
    if(data!= null) {
      if(data.length > 0) {  
        return (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Position</StyledTableCell>
                  <StyledTableCell align="center">Department</StyledTableCell>
                  <StyledTableCell align="center">Start Date</StyledTableCell>
                  <StyledTableCell align="center">End Date</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row) => {            
                  return(
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">{row.position}</StyledTableCell>
                      <StyledTableCell align="center">{row.department}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.startDate).format('DD-MM-YYYY')}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.endDate).format('DD-MM-YYYY')}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }
    }
  }
  return (
    <div>
      {showResults()}
    </div>
  );
}
