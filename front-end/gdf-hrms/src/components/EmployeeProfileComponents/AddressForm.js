import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Paper, Grid } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  
}));

export default function AddressForm(props) {
  const classes = useStyles();
  const data = props.employeeInfo;
  
  const showResults = () => {
    if(data != null) {
      if(data.length > 0) {
        return ( 
          <div className={classes.root}>
            <Grid container spacing={1}>        
              <h4>Address</h4>
              <Grid container item xs={12} spacing={3}></Grid>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Lot</StyledTableCell>
                      <StyledTableCell align="center">Street</StyledTableCell>
                      <StyledTableCell align="center">Area</StyledTableCell>
                      <StyledTableCell align="center">Village</StyledTableCell>
                      <StyledTableCell align="center">Region</StyledTableCell>
                      <StyledTableCell align="center">Country</StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    {data.map((row) => {            
                      return(
                        <StyledTableRow key={row.id}>              
                          <StyledTableCell align="center">{row.lot}</StyledTableCell>
                          <StyledTableCell align="center">{row.street}</StyledTableCell>
                          <StyledTableCell align="center">{row.area}</StyledTableCell>
                          <StyledTableCell align="center">{row.village}</StyledTableCell>
                          <StyledTableCell align="center">{row.region}</StyledTableCell>
                          <StyledTableCell align="center">{row.country}</StyledTableCell>
                          <StyledTableCell align="center">
                            <Edit className={classes.icon} onClick={() => props.selectRow(row, 'Edit')}/>
                            &nbsp;&nbsp;&nbsp;
                            <Delete  className={classes.icon} onClick={() => props.selectRow(row, 'Delete')}/>
                          </StyledTableCell>                          
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>        
            </Grid>
          </div>
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