import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
//import SimpleSelect from './SimpleSelect';
import CareerHistoryForm  from './CareerHistoryComponents/CareerHistoryForm';
import CareerHistoryTable from './CareerHistoryComponents/CareerHistoryTable';

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

export default function CareerHistoryLayout() {
  const classes = useStyles();
  function FormRow() {
    return (
      <React.Fragment>
        <div>
         < Grid container spacing={3}>
            <Grid item xs={12}>
            <CareerHistoryForm></CareerHistoryForm>
            </Grid>
        
        <Grid item xs={12}>
            <CareerHistoryTable></CareerHistoryTable>
        </Grid>
        </Grid>
    
      </div>
    
      </React.Fragment>
      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <Grid xs={6}>
      <h1>Career History Page</h1>
      </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}