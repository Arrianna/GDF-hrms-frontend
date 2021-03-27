import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CallIcon from '@material-ui/icons/Call';
import InputAdornment from '@material-ui/core/InputAdornment';

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

export default function AddEmployeeContactForm() {
  const classes = useStyles();
  //const SexOption = ["Male","Female"];
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField 
              id="HomeNumber" 
              label="Home Number" 
              variant="outlined" 
              size="small" 
              InputProps={{
                endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
            />
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField 
              id="CellNumber" 
              label="Cell Number" 
              variant="outlined" 
              size="small" 
              InputProps={{
                endAdornment:<InputAdornment position="end"><PhoneAndroidIcon color="primary"/></InputAdornment>,}}
            />
          </Grid>
        </div>
        <div>   
          <Grid item xs={2}>
            <TextField 
              id="WorkNumber" 
              label="Work Number" 
              variant="outlined" 
              size="small" 
              InputProps={{
                endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
            />
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField 
              id="Email" 
              label="Email" 
              type="email" 
              variant="outlined" 
              size="small" 
              InputProps={{
                endAdornment:<InputAdornment position="end"><MailIcon color="primary"/></InputAdornment>,}}
            />
          </Grid >
        </div>    
      </React.Fragment>      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Contact Information</h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
