import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

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

export default function OfficialInformationForm(employeePI) {
  const classes = useStyles();
 
  function FormRow() {
    return (
      <React.Fragment>
       
          <Grid item xs={2}>
            <TextField id="RegimentalNumber" label="RegimentalNumber" variant="outlined" size="small" value={employeePI.employeeInfo.regimentNumber}/>
          </Grid>
       
          <Grid item xs={2}>
            <TextField id="IdentificationNumber" label="IdentificationNumber" variant="outlined" size="small" value={employeePI.employeeInfo.nationalIdNumber}/>
          </Grid>
        
       
          <Grid item xs={2}>
            <TextField id="PassportNumber" label="PassportNumber" variant="outlined" size="small" value={employeePI.employeeInfo.passportNumber}/>
          </Grid >
       
          <Grid item xs={2}>
            <TextField id="PassportExpirationDate" label="Passport Expiration Date" variant="outlined" size="small" type="text" value={moment(employeePI.employeeInfo.passportExpirationDate).format('DD-MM-YYYY')}/>
          </Grid >
      
          <Grid item xs={2}>
            <TextField id="NISNumber" label="TIN Number" variant="outlined" size="small" value={employeePI.employeeInfo.tinNumber}/>
          </Grid>
       
      </React.Fragment>      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container>
      <h4>Official Information</h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
