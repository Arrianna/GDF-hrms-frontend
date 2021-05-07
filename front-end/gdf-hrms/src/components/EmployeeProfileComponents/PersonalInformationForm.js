import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'


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

export default function PersonalInformationForm(employeeInfo) {  
  const classes = useStyles();

  const initialValues={
    firstName:'',
    lastName:'',
    ethnicity:'',
    sex:'',
    nationality:'',
    religion:'',
    dateOfBirth:'',
    maritalStatus:''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[aA-zZ\s]+$/,"First Name must be letters only")
      .required("First Name is Required"),

    lastName: Yup.string()
      .matches(/^[aA-zZ\s]+$/,"Last Name must be letters only")
      .required("Last Name is Required"),

    ethnicity: Yup.string()
      .matches(/^[aA-zZ\s]+$/,"Ethnicity must be letters only")
      .required("Ethnicity is Required"),

    sex: Yup.string()
      .matches(/^[aA-zZ\s]+$/,"Sex must be letters only")
      .required("Sex is Required"),

    nationality: Yup.string()
      .matches(/^[aA-zZ\s]+$/,"Nationality must be letters only")
      .required("Nationality is Required"),

    religion: Yup.string()
      .matches(/^[aA-zZ\s]+$/,"Religion must be letters only")
      .required("Religion is Required"),

    dateOfBirth:Yup.date()
      .required("Date of Birth is Required"),

    maritalStatus: Yup.string()
      .matches(/^[aA-zZ\s]+$/,"Marital Status must be letters only")
      .required("Marital Status  is Required"),

    
  })
  
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <h4>Personal Information</h4>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <Formik initialValues={initialValues} validationSchema={validationSchema}>
            {(props) => (
            <Form>
            <div>
              <Grid item xs={2}>
                <Field as={TextField} 
                      name="firstName" 
                      label="First Name" 
                      variant="outlined"
                      size="small" 
                      InputLabelProps={{ shrink: true,}} 
                      error={props.errors.firstName && props.touched.firstName}
                      helperText={<ErrorMessage name='firstName' />} 
                      required 
                      // value={employeeInfo.employeeInfo.firstName}
                      />
                <TextField id="MiddleNameOne" label="Middle Name" variant="outlined" size="small"  InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.otherName} />
                <TextField id="MiddleNameTwo" label="Middle Name 2" InputLabelProps={{ shrink: true,}} variant="outlined" size="small" />
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <Field as={TextField} 
                  name="lastName" 
                  label="Last Name" 
                  variant="outlined" 
                  size="small" 
                  InputLabelProps={{ shrink: true,}} 
                  error={props.errors.lastName && props.touched.lastName}
                  helperText={<ErrorMessage name='lastName' />} 
                  required 
                  // value={employeeInfo.employeeInfo.lastName}
                  />
                <Field as ={TextField}
                       name="ethnicity" 
                       label="Ethnicity" 
                       variant="outlined" 
                       size="small" 
                       InputLabelProps={{ shrink: true,}} 
                       error={props.errors.ethnicity && props.touched.ethnicity}
                       helperText={<ErrorMessage name='ethnicity' />} 
                       required 
                      //  value={employeeInfo.employeeInfo.ethnicity} 
                       />
              </Grid >
            </div> 
            <div>
              <Grid item xs={2}>
                <Grid item xs={2}>
                  <Field as= {TextField} 
                        name="sex" 
                        label="Sex" 
                        variant="outlined" 
                        size="small" 
                        InputLabelProps={{ shrink: true,}} 
                        error={props.errors.sex && props.touched.sex}
                        helperText={<ErrorMessage name='sex' />} 
                        required 
                        // value={employeeInfo.employeeInfo.sex} 
                        />              
                  <Field as={TextField} 
                         name="nationality" 
                         label="Nationality" 
                         variant="outlined" 
                         size="small" 
                         InputLabelProps={{ shrink: true,}} 
                         error={props.errors.nationality && props.touched.nationality}
                         helperText={<ErrorMessage name='nationality' />} 
                         required 
                        //  value={employeeInfo.employeeInfo.nationality} 
                  />
                </Grid>
              </Grid >
            </div>
            <div>
              <Grid item xs={2}>
                
              </Grid >
                <Field as={TextField}
                       name="religion" 
                       label="Religion" 
                       variant="outlined" 
                       size="small" 
                       InputLabelProps={{ shrink: true,}} 
                       error={props.errors.religion && props.touched.religion}
                       helperText={<ErrorMessage name='religion' />} 
                      required 
                      //  value={employeeInfo.employeeInfo.religion} 
                       />
            </div>
            <div>
              <Grid item xs={2}>
                <Field as={TextField} 
                  name="dateOfBirth" 
                  label="Date of Birth" 
                  variant="outlined" 
                  InputLabelProps={{ shrink: true,}} 
                  size="small" 
                  type="date"
                  error={props.errors.dateOfBirth && props.touched.dateOfBirth}
                  helperText={<ErrorMessage name='dateOfBirth' />} 
                  required  
                  // value={moment(employeeInfo.employeeInfo.dateOfBirth).format('DD-MM-YYYY')}
                  />
                <Field as={TextField} 
                       name="maritalStatus" 
                       label="Marital Status" 
                       variant="outlined" 
                       size="small" 
                       InputLabelProps={{ shrink: true,}} 
                       error={props.errors.maritalStatus && props.touched.maritalStatus}
                       helperText={<ErrorMessage name='maritalStatus' />} 
                       required  
                      //  value={employeeInfo.employeeInfo.maritalStatus} 
                       />
              </Grid >
            </div>
            </Form>
             )}
            </Formik>
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
