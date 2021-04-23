import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CallIcon from '@material-ui/icons/Call';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
    }, 
  },

  field: {
    margin: '10px 0',
  },

  countryList: {
    ...theme.typography.body1,
  },
  
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function UpdateEmployeeContactForm(props) {
  const classes = useStyles();
  const { register, errors } = useForm();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Contact Information</h4>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                <TextField 
                  id="HomeNumber" 
                  label="Home Number"  
                  value={props.homeNumber}
                  onChange={props.handleHomeNumChange}  
                  InputLabelProps={{ shrink: true,}}
                  type="tel"                           
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
                  value={props.cellNumber}
                  onChange={props.handleCellNumChange} 
                  InputLabelProps={{ shrink: true,}}
                  type="tel"                
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
                  value={props.workNumber}
                  onChange={props.handleWorkNumChange}  
                  InputLabelProps={{ shrink: true,}}
                  type="tel"                
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
                  name="Email"
                  label="Email Address"
                  type="email"              
                  value={props.email}
                  onChange={props.handleEmailChange}
                  InputLabelProps={{ shrink: true,}}
                  variant="outlined" 
                  size="small" 
                  inputRef={register({
                    required: 'You must provide an email address!',
                    /* pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'You must provide a valid email address!',
                    }, */
                  })}
                  autoComplete='email'
                  error={!!errors.email}
                  autoFocus
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><MailIcon color="primary"/></InputAdornment>,}}
                />
                {errors.email && ( <span className={classes.error}>{errors.email.message}</span> )}
              </Grid >
            </div>    
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
