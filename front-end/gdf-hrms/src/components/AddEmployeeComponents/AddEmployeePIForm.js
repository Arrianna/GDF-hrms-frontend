import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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

export default function AddEmployeePIForm() {  
  const classes = useStyles();  
  
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField name="FirstName" label="First Name" variant="outlined" size="small" />
            <TextField name="otherNameTwo" label="Middle Name" variant="outlined" size="small"  />
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField name="LastName" label="Last Name" variant="outlined" size="small" />
            <TextField name="ethnicityId" label="Ethnicity" variant="outlined" size="small" />
          </Grid >
        </div> 
        <div>
          <Grid item xs={2}>
            <Grid item xs={2}>
              <TextField named="sex" label="Sex" variant="outlined" size="small" />              
              <TextField name="nationalityId" label="Nationality" variant="outlined" size="small" />
            </Grid>
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField name="otherName" label="Middle Name" variant="outlined" size="small" />
          </Grid >
            <TextField name="religionId" label="Religion" variant="outlined" size="small" />
        </div>
        <div>
          <Grid item xs={2}>
            <TextField name="dateOfBirth" label="Date of Birth" variant="outlined" InputLabelProps={{ shrink: true,}} size="small" type="date" />            
            <TextField name="maritalStatusId" label="Marital Status" variant="outlined" size="small" />
          </Grid >
        </div>
      </React.Fragment>      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <h4>Personal Information</h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
