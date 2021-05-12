import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CallIcon from '@material-ui/icons/Call';

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

export default function AddEmployeeContactForm(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h3>Contact Information</h3>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                <TextField
                  name="homeNumber"
                  label="Home Number"
                  value={props.formik.values.homeNumber}
                  onChange={props.formik.handleChange}
                  type="tel"
                  variant="outlined"
                  size="small"
                  error={Boolean(props.formik.errors.homeNumber && props.formik.touched.homeNumber)}
                  helperText={props.formik.errors.homeNumber && props.formik.touched.homeNumber && String(props.formik.errors.homeNumber)}
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                />
              </Grid>
              </div>
              
              <div>
              <Grid item xs={2}>
                <TextField
                  name="cellNumber"
                  label="Cell Number"
                  value={props.formik.values.cellNumber}
                  onChange={props.formik.handleChange}
                  type="tel"
                  variant="outlined"
                  size="small"
                  error={Boolean(props.formik.errors.cellNumber && props.formik.touched.cellNumber)}
                  helperText={props.formik.errors.cellNumber && props.formik.touched.cellNumber && String(props.formik.errors.cellNumber)}
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><PhoneAndroidIcon color="primary"/></InputAdornment>,}}
                />
              </Grid>
              </div>
            
              <div>
              <Grid item xs={2}>
                <TextField
                  name="workNumber"
                  label="Work Number"
                  value={props.formik.values.workNumber}
                  onChange={props.formik.handleChange}
                  type="tel"
                  variant="outlined"
                  size="small"
                  error={Boolean(props.formik.errors.workNumber && props.formik.touched.workNumber)}
                  helperText={props.formik.errors.workNumber && props.formik.touched.workNumber && String(props.formik.errors.workNumber)}
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                />
              </Grid >
              </div>
              
              <div>
              <Grid item xs={2}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={props.formik.values.email}
                  onChange={props.formik.handleChange}
                  variant="outlined"
                  size="small"
                  autoComplete='email'
                  error={Boolean(props.formik.errors.email && props.formik.touched.email)}
                  helperText={props.formik.errors.email && props.formik.touched.email && String(props.formik.errors.email)}
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><MailIcon color="primary"/></InputAdornment>,}}
                />
              </Grid >
              </div> 
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
