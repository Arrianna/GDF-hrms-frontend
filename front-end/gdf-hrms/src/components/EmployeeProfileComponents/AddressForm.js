import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

export default function AddressForm(props) {
  const classes = useStyles();
  let data = props.employeeInfo;
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


/* import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import SimpleSelect from '../SimpleSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
    }, 
  },
  
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AddressForm(employeePI) {  
  const classes = useStyles();
  //console.log(employeePI.employeeInfo.lot);
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField id="Lot" label="Lot" variant="outlined" size="small" value={employeePI.employeeInfo.lot}/>
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="Street" label="Street" variant="outlined" size="small" value={employeePI.employeeInfo.street}/>
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="Area/Section" label="Area/Section" variant="outlined" size="small" value={employeePI.employeeInfo.addressArea}/>
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="Village" label="Village" variant="outlined" size="small" value={employeePI.employeeInfo.village}/>
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="Region" label="Region" variant="outlined"  size="small" value={employeePI.employeeInfo.region}/>
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="Country" label="Country" variant="outlined" size="small" value={employeePI.employeeInfo.country}/>
          </Grid >
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Address </h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
} */
