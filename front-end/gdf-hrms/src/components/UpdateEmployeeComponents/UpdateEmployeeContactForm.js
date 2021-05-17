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

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <h3>Contact Information</h3>
        <Grid container xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                <TextField
                  name="homeNumber" 
                  label="Home Number"
                  InputLabelProps={{ shrink: true,}}
                  value={props.formik.values.homeNumber}
                  onChange={props.formik.handleChange}
                  variant="outlined" 
                  size="small" 
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                  error={Boolean(props.formik.errors.homeNumber && props.formik.touched.homeNumber)}
                  helperText={props.formik.errors.homeNumber && props.formik.touched.homeNumber && String(props.formik.errors.homeNumber)}
                />                
              </Grid>
            </div>            
            <div>
              <Grid item xs={2}>
                <TextField
                  name="cellNumber" 
                  label="Cell Number"
                  InputLabelProps={{ shrink: true,}}
                  value={props.formik.values.cellNumber}
                  onChange={props.formik.handleChange}
                  variant="outlined" 
                  size="small" 
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><PhoneAndroidIcon color="primary"/></InputAdornment>,}}
                  error={Boolean(props.formik.errors.cellNumber && props.formik.touched.cellNumber)}
                  helperText={props.formik.errors.cellNumber && props.formik.touched.cellNumber && String(props.formik.errors.cellNumber)}
                />
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <TextField 
                  name="workNumber" 
                  label="Work Number"
                  InputLabelProps={{ shrink: true,}}
                  value={props.formik.values.workNumber}
                  onChange={props.formik.handleChange}
                  variant="outlined" 
                  size="small" 
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                  error={Boolean(props.formik.errors.workNumber && props.formik.touched.workNumber)}
                  helperText={props.formik.errors.workNumber && props.formik.touched.workNumber && String(props.formik.errors.workNumber)}
                />                
              </Grid >
            </div>
            <div>
              <Grid item xs={2}>
                <TextField                 
                  name="email"
                  label="Email Address"
                  InputLabelProps={{ shrink: true,}}
                  type="email"              
                  value={props.formik.values.email}
                  onChange={props.formik.handleChange}
                  variant="outlined" 
                  size="small"                  
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><MailIcon color="primary"/></InputAdornment>,}}
                  error={Boolean(props.formik.errors.email && props.formik.touched.email)}
                  helperText={props.formik.errors.email && props.formik.touched.email && String(props.formik.errors.email)}
                />
              </Grid >
            </div>
          </React.Fragment> 
        </Grid>
      </Grid>
    </div>
  );
}
