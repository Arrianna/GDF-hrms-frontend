import React from 'react';
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper'; 
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';  
import { useState, useEffect } from 'react';

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

  return (  
    <Paper className={classes.root}>  
      <TableContainer className={classes.container}>  
        <Table stickyHeader aria-label="sticky table">  
          <TableHead>  
            <TableRow>  
              <TableCell>Id</TableCell>  
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Rank</TableCell>
              <TableCell align="right">Regiment Number</TableCell>
              <TableCell align="right">Date of Employment</TableCell>              
              <TableCell align="right">Department</TableCell>  
            </TableRow>
          </TableHead> 

          <TableBody>  
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
              return (  
                <TableRow >  
                  <TableCell component="th" scope="row">{row.id}</TableCell>  
                  <TableCell align="right">{row.fname}</TableCell>  
                  <TableCell align="right">{row.lname}</TableCell>  
                  <TableCell align="right">{row.rank}</TableCell>  
                  <TableCell align="right">{row.rNumber}</TableCell>  
                  <TableCell align="right">{row.dob}</TableCell>                    
                  <TableCell align="right">{row.positionName}</TableCell>  
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