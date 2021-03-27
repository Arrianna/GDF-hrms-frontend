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

export default function AddEmployeeOfficialInfoForm() {
  const classes = useStyles();
 
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField id="regimentalNumber" label="RegimentalNumber" variant="outlined" size="small" />
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="identificationNumber" label="IdentificationNumber" variant="outlined" size="small" />
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="passportNumber" label="PassportNumber" variant="outlined" size="small" />
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="passportExpirationDate" label="Passport Expiration Date" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} type="date" />
          </Grid >
        </div>    
        <div>
          <Grid item xs={2}>
            <TextField id="tinNumber" label="TIN Number" variant="outlined" size="small" />
          </Grid>
        </div>
      </React.Fragment>      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Official Information</h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
