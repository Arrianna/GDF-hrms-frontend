import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CallIcon from '@material-ui/icons/Call';
import InputAdornment from '@material-ui/core/InputAdornment';
// import { useForm } from 'react-hook-form';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  // const { register, errors } = useForm();

  const initialValues={
    homeNumber:'',
    cellNumber:'',
    email:''
  }

  const validationSchema=Yup.object().shape({
    homeNumber: Yup.number()
      .typeError("Enter valid Home Number")
      .required("A Home Number is Required")
      .positive("A Home number can't start with a minus")
      .integer("A Home number can't include a decimal point"),
    homeNumber: Yup.string()
      .required("A Home Number is Required")
      .matches(/^[0-9]+$/, "Home Number must be digits only")
      .min(7, 'Must be at least 7 digits'),

    cellNumber: Yup.number()
      .typeError("Enter valid Cell Number")
      .required("A Cell Number is Required")
      .positive("A Cell number can't start with a minus")
      .integer("A Cell number can't include a decimal point"),
    cellNumber: Yup.string()
      .required("A Cell Number is Required")
      .matches(/^[0-9]+$/, "Celll Number must be digits only")
      .min(7, 'Must be at least 7 digits'),

    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email')
  })

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Contact Information</h4>
        <Grid container xs={12} spacing={3}>
          <Formik initialValues={initialValues} validationSchema={validationSchema}>
          {(props) => (
           
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                <Field as= {TextField} 
                  name="homeNumber" 
                  label="Home Number"  
                  // value={props.homeNumber}
                  // onChange={props.handleHomeNumChange}  
                  InputLabelProps={{ shrink: true,}}
                  type="tel"                           
                  variant="outlined" 
                  size="small" 
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                    error={props.errors.homeNumber && props.touched.homeNumber}
                    helperText={<ErrorMessage name='homeNumber' />} required
                />                
              </Grid>
            </div>
            
            <div>
              <Grid item xs={2}>
                <Field as ={TextField }
                  name="cellNumber" 
                  label="Cell Number"  
                  // value={props.cellNumber}
                  // onChange={props.handleCellNumChange} 
                  InputLabelProps={{ shrink: true,}}
                  type="tel"                
                  variant="outlined" 
                  size="small" 
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><PhoneAndroidIcon color="primary"/></InputAdornment>,}}
                    error={props.errors.cellNumber && props.touched.cellNumber}
                    helperText={<ErrorMessage name='cellNumber' />} required
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
                <Field as ={TextField}
                 
                  name="email"
                  label="Email Address"
                  type="email"              
                  // value={props.email}
                  // onChange={props.handleEmailChange}
                  InputLabelProps={{ shrink: true,}}
                  variant="outlined" 
                  size="small" 
                  error={props.errors.email && props.touched.email}
                  helperText={<ErrorMessage name='email' />} required
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><MailIcon color="primary"/></InputAdornment>,}}
                />
              </Grid >
              </div>
          </React.Fragment> 
          )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
}
