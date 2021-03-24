import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function AddEmployeeContactForm() {
  const classes = useStyles();
  //const SexOption = ["Male","Female"];
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField name="homeNumber" label="Home Number" variant="outlined" size="small" />
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField name="cellNumber" label="Cell Number" variant="outlined" size="small" />
          </Grid>
        </div>
        <div>   
          <Grid item xs={2}>
            <TextField name="workNumber" label="Work Number" variant="outlined" size="small" />
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField name="email" label="Email" variant="outlined" size="small" />
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
