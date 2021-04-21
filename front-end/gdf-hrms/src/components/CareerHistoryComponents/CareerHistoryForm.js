
//FIRST SET OF CODE HERE!!
import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const defaultValues = {
  rank: "",
  department:"",
  
};
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

export default function CareerHistoryForm(props) {  
  const classes = useStyles();
  
  function FormRow() {
    return (
      <React.Fragment>
        <div>
            <Grid item xs={2}>
            <Grid item xs={2}>
              <TextField id="Rank" label="Rank" variant="outlined" size="small" />
              <TextField id="Department" label="Department" variant="outlined" size="small" />
            </Grid >
          </Grid> 
        </div>    

        <div>
           <Grid>
            <Grid item xs={2} >
              <TextField id="StartDate" label="StartDate" variant="outlined" InputLabelProps={{ shrink: true,}} size="small" type="date" />
              <TextField id="EndDate" label="EndDate" variant="outlined" InputLabelProps={{ shrink: true,}} size="small" type="date" />
            </Grid >
            <Button type='submit' color='primary'  variant='contained'>Add<SearchIcon /></Button>
          </Grid> 
        </div>
      </React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <h4>Add Career Options </h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}