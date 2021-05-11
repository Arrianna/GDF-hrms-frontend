import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

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
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  paragraphColor: {
    color: 'red'
  }  
}));

export default function UpdateEmployeeOfficialInfoForm(props) {
  const classes = useStyles();
  const { register, errors } = useForm();

  const initialValues = {
    regimentalNumber: '',
    nationalIdNumber:'',
    tinNumber:'',
    passportNumber:'',
    passportExpirationDate:''
  }

  const validationSchema = Yup.object().shape({
    regimentalNumber: Yup.number()
      .typeError("Enter valid Regimental Number")
      .required("A Regimental Number is Required")
      .positive("A regimental number can't start with a minus")
      .integer("A regimental number can't include a decimal point"),
    regimentalNumber: Yup.string()
      .required("A Regimental Number is Required")
      .matches(/^[0-9]+$/, "Regimental Number must be digits only")
      .min(6, 'Must be at least 6 digits'),

    nationalIdNumber: Yup.number()
      .typeError("Enter valid National Identification Number")
      .required("A National Identification Number is Required")
      .positive("A National Identification Number can't start with a minus")
      .integer("A National Identification Number can't include a decimal point"),
    nationalIdNumber: Yup.string()
      .required("A National Identification Number is Required")
      .matches(/^[0-9]+$/, "National Identification Number must be digits only")
      .min(9, 'Must be at least 9 digits'),

    tinNumber: Yup.number()
      .typeError("Enter valid TIN Number")
      .required("A TIN Number is Required")
      .positive("A TIN  Number can't start with a minus")
      .integer("A TIN  Number can't include a decimal point"),
    tinNumber: Yup.string()
      .required("A TIN  Number is Required")
      .matches(/^[0-9]+$/, "TIN  Number must be digits only")
      .min(9, 'Must be at least 9 digits'),

    passportNumber: Yup.string()
      .typeError("Enter a valid Passport Number")
      .required("A Passport Number is Required")
      .min(8, 'Must have atleast 8 characters'),
      
      passportExpirationDate:Yup.date()
      .required("Passport Expiration Date is Required")
    
  })
 
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Official Information</h4>
        <Grid container item xs={12} spacing={3}>
          <Formik initialValues={initialValues} validationSchema={validationSchema}>
          {(props) => (
          
          <React.Fragment>
              <Grid item xs={2}>
                <Field as ={TextField} required 
                label="Regimental Number" 
                name="regimentalNumber" 
                InputLabelProps={{ shrink: true,}}
                value={props.regimentNumber} 
                onChange={props.handleRegNumChange} 
                variant="outlined" size="small" 
                error={props.errors.regimentalNumber && props.touched.regimentalNumber}
                helperText={<ErrorMessage name='regimentalNumber' />} 

                />
                {/* {errors.regimentalNumber && errors.regimentalNumber.type === 'required' && (<p className={classes.paragraphColor}>Regiment Number is required</p>)}
                {errors.regimentalNumber && errors.regimentalNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 6 numbers required</p>)}
                {errors.regimentalNumber && errors.regimentalNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 6 numbers required</p>)}
                {errors.regimentalNumber && errors.regimentalNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid regiment number</p>)} */}
              </Grid>
              <Grid item xs={2}>
                <Field as ={TextField} 
                    name="nationalIdNumber" 
                    label=" National ID Number" 
                    InputLabelProps={{ shrink: true,}} 
                    // value={props.nationalIdNumber} 
                    // onChange={props.handleNationalIdNumChange} 
                    variant="outlined" 
                    size="small"
                    error={props.errors.nationalIdNumber && props.touched.nationalIdNumber}
                    helperText={<ErrorMessage name='nationalIdNumber' />} required
                    />
                {/* {errors.identificationNumber && errors.identificationNumber.type === 'required' && (<p className={classes.paragraphColor}>National Identification Number is required</p>)}
                {errors.identificationNumber && errors.identificationNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 9 numbers required</p>)}
                {errors.identificationNumber && errors.identificationNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 9 numbers required</p>)}
                {errors.identificationNumber && errors.identificationNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid ID Number</p>)} */}
              </Grid>

              <Grid item xs={2}>
                <Field as ={TextField}  
                       name="tinNumber" 
                       label="TIN Number" 
                       InputLabelProps={{ shrink: true,}} 
                      //  value={props.tinNumber} 
                      //  onChange={props.handleTinNumChange} 
                       variant="outlined" 
                       size="small" 
                       error={props.errors.tinNumber && props.touched.tinNumber}
                       helperText={<ErrorMessage name='tinNumber' />} required
                       />
                {/* {errors.tinNumber && errors.tinNumber.type === 'required' && (<p className={classes.paragraphColor}>Tin Number is required</p>)}
                {errors.tinNumber && errors.tinNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 9 numbers required</p>)}
                {errors.tinNumber && errors.tinNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 9 numbers required</p>)}
                {errors.tinNumber && errors.tinNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid Tin Number</p>)} */}
              </Grid>  

              <Grid item xs={2}>
                <Field as={TextField}
                       name="passportNumber"
                       label="Passport Number" 
                       InputLabelProps={{ shrink: true,}} 
                      //  value={props.passportNumber} 
                      //  onChange={props.handlePassportNumChange} 
                       variant="outlined" 
                       size="small" 
                       error={props.errors.passportNumber && props.touched.passportNumber}
                       helperText={<ErrorMessage name='passportNumber' />} required
                       />
                {/* {errors.passportNumber && errors.passportNumber.type === 'required' && (<p className={classes.paragraphColor}>Passport Number is required</p>)}
                {errors.passportNumber && errors.passportNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 8 characters required</p>)}
                {errors.passportNumber && errors.passportNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 8 characters required</p>)}
                {errors.passportNumber && errors.passportNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid Passport Number</p>)} */}
              </Grid >

              <Grid item xs={2}>
                <Field as ={TextField}
                       name="passportExpirationDate" 
                       label="Passport Expiration Date" 
                       InputLabelProps={{ shrink: true,}} 
                      //  value={props.passportExpirationDate} 
                      //  onChange={props.handlePassportExpDateChange} 
                       variant="outlined" 
                       size="small" 
                       InputLabelProps={{ shrink: true,}} 
                       type="date"
                       error={props.errors.passportExpirationDate && props.touched.passportExpirationDate}
                       helperText={<ErrorMessage name='passportExpirationDate' />} required
                       />
              
              </Grid >
                
          </React.Fragment>
         
          )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
}
