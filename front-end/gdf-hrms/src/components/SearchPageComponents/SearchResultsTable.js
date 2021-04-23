import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
  root: {
    width: '100%',
  },

  container: {
    maxHeight: 440,
  },
});

export default function MatPaginationTable(props) {  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);  
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
      setData(props.tableData);
  }, [props.tableData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  /*const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
    },
  };*/

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="customized table" >{/*rowEvents={rowEvents}>*/}
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Rank</StyledTableCell>
              <StyledTableCell align="center">Regiment Number</StyledTableCell>
              <StyledTableCell align="center">Date of Birth</StyledTableCell>
              <StyledTableCell align="center">Cell Number</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <StyledTableRow key={row.regimentNumber}>
                  <StyledTableCell align="center">{row.firstName}</StyledTableCell>
                  <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                  <StyledTableCell align="center">{row.position}</StyledTableCell>
                  <StyledTableCell align="center">{row.regimentNumber}</StyledTableCell>
                  <StyledTableCell align="center">{Moment(row.dateOfBirth).format('DD-MM-YYYY')}</StyledTableCell>
                  <StyledTableCell align="center">{row.cellNumber}</StyledTableCell>
                  <StyledTableCell align="center"><Link to={'/employee-profile/' + row.regimentNumber}><Button variant="contained">View</Button></Link></StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div" count={data.length}
        rowsPerPage={rowsPerPage} page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage} />
    </Paper>
  );
}
