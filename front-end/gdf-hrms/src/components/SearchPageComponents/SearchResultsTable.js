import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'react-moment';

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
      console.log(props.tableData);
  }, [props.tableData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*const getDate = (date) => {
    if(date != null){
      return date.split('T')[0]
    }
    else{
      return date;
    }
  }*/

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Rank</TableCell>
              <TableCell align="right">Regiment Number</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Cell Number</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow >
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.position}</TableCell>
                  <TableCell align="right">{row.regimentNumber}</TableCell>
                  <TableCell align="right"><Moment format="D MMM YYYY">{row.dateOfBirth}</Moment></TableCell>
                  <TableCell align="right">{row.cellNumber}</TableCell>
                </TableRow>
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
