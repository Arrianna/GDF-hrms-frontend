import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Paper, Grid, Button, ButtonGroup } from '@material-ui/core';
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
            <Grid container>        
              <h3>Address</h3>
              <Grid container spacing={3}></Grid>
              <Grid item xs={12}>
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
                            <ButtonGroup>
                              <Button variant="text"><Edit color="primary" className={classes.icon} onClick={() => props.selectRow(row, 'Edit')}/></Button>
                              <Button variant="text"><Delete color="secondary" className={classes.icon} onClick={() => props.selectRow(row, 'Delete')}/></Button>
                            </ButtonGroup>
                          </StyledTableCell>                     
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="contained" color="primary" onClick={props.handleClickOpen}  style={{margin: '10px'}}>
                Add Address
              </Button>
              </Grid>     
            </Grid>
          </div>
        );
      }
      else{
        return ( 
          <div className={classes.root}>
            <Grid container>        
              <h3>Address</h3>
              <Grid container spacing={3}></Grid>
              <Grid item xs={12}>
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
                    <StyledTableRow>              
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">                            
                        <ButtonGroup>
                          <Button disabled variant="text"><Edit color="primary" className={classes.icon} /></Button>
                          <Button disabled variant="text"><Delete color="secondary" className={classes.icon} /></Button>
                        </ButtonGroup>
                      </StyledTableCell>                     
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>   
              </Grid>     
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