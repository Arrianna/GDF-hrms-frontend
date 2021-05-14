import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import AddEmployeePIForm from './AddEmployeeComponents/AddEmployeePIForm';
import AddEmployeeAddressForm from './AddEmployeeComponents/AddEmployeeAddressForm';
import AddEmployeeContactForm from './AddEmployeeComponents/AddEmployeeContactForm';
import AddEmployeeOfficialInfoForm from './AddEmployeeComponents/AddEmployeeOfficialInfoForm';
import Notification from './Notification';

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

   careerButton: {
     marginLeft: '20px,'
   }

}));

export default function AddEmployeeInformation() {
  const classes = useStyles();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  
  const formik = useFormik ({
    initialValues: {
      nationalityId: '',
      religionId: '',
      ethnicityId: '',
      maritalStatusId: '',
      homeNumber: '',
      cellNumber: '',
      workNumber: '',
      email: '',
      title: '',
      firstName: '',
      lastName: '',
      otherName: '',
      regimentNumber: '',
      dateOfBirth: '',
      sex: '',
      nationalIdNumber: '',
      passportNumber: '',
      passportExpirationDate: '',
      tinNumber: '',
      lot: '',
      street: '',
      area: '',
      village: '',
      region: '',
      country: '',
    },

    validationSchema: Yup.object().shape({
      nationalityId: Yup.number()
        .required("Nationality is Required"),
      religionId: Yup.number()
        .required("Religion is Required"),
      ethnicityId: Yup.number()
        .required("Ethnicity is Required"),
      maritalStatusId: Yup.number()
        .required("Marital Status is Required"),
      homeNumber: Yup.number()
        .typeError("Enter a Valid Telephone Number")
        .positive("A Telephone Number cannot start with a minus")
        .integer("A Telephone Number cannot include a decimal point")
        .test('len', 'Must be 7 digits', (val) => { if(val) return val.toString().length === 7; })
        .required("A Telephone Number is Required"),
      cellNumber: Yup.number()
        .typeError("Enter a Valid Cell Number")
        .positive("A Cell Number cannot start with a minus")
        .integer("A Cell Number cannot include a decimal point")
        .test('len', 'Must be 7 digits', (val) => { if(val) return val.toString().length === 7; })
        .required("A Cell Number is Required"),
      workNumber: Yup.number()
        .typeError("Enter a Valid Telephone Number")
        .positive("A Telephone Number cannot start with a minus")
        .integer("A Telephone Number cannot include a decimal point")
        .test('len', 'Must be 7 digits', (val) => { if(val) return val.toString().length === 7; })
        .required("A Telephone Number is Required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is Required"),
      title: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid Title'),
      firstName: Yup.string()
        .required("First Name is Required")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid First Name'),
      lastName: Yup.string()
        .required("Last Name is Required")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid Last Name'),
      otherName: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
      regimentNumber: Yup.number()
        .typeError("Enter a Valid Regimental Number")
        .positive("A Regimental Number cannot start with a minus")
        .integer("A Regimental Number cannot include a decimal point")
        .test('len', 'Must be at least 6 digits', (val) => { if(val) return val.toString().length >= 6; })
        .required("A Regimental Number is Required"),
      dateOfBirth: Yup.date()
        .required("Date of Birth is Required"),
      sex: Yup.string()
        .required("This is required"),
      nationalIdNumber: Yup.number()
        .typeError("Enter a Valid ID Number")
        .positive("A ID Number cannot start with a minus")
        .integer("A ID Number cannot include a decimal point")
        .test('len', 'Must be 9 digits', (val) => { if(val) return val.toString().length === 9; })
        .required("A ID Number is Required"),
      passportNumber: Yup.string()
        .length(8, "Must be 8 Characters")
        .required("Passport Number is Required"),
      passportExpirationDate: Yup.date()
        .required("Passport Expiration Date is Required"),
      tinNumber: Yup.number()
        .typeError("Enter a Valid TIN Number")
        .positive("A TIN Number cannot start with a minus")
        .integer("A TIN Number cannot include a decimal point")
        .test('len', 'Must be 9 digits', (val) => { if(val) return val.toString().length === 9; })
        .required("A TIN Number is Required"),
      lot: Yup.string()
      .required("Lot is Required"),
      street: Yup.string()
        .required("Street is Required")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid Street Name'),
      area: Yup.string()
        .required("Area is Required")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid Area'),
      village: Yup.string()
        .required("Village is Required")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid Village'),
      region: Yup.number()
        .required("Region is Required"),
      country: Yup.number()
        .required("Country is Required"),
    }),

    onSubmit: values => {
      let Info = {
        nationalityId: parseInt(values.nationalityId, 10),
        religionId: parseInt(values.religionId, 10),
        ethnicityId: parseInt(values.ethnicityId, 10),
        maritalStatusId: parseInt(values.maritalStatusId, 10),
        homeNumber: parseInt(values.homeNumber, 10),
        cellNumber: parseInt(values.cellNumber, 10),
        workNumber: parseInt(values.workNumber, 10),
        email: values.email,
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        otherName: values.otherName,
        regimentNumber: parseInt(values.regimentNumber, 10),
        dateOfBirth: values.dateOfBirth,
        sex: values.sex,
        nationalIdNumber: parseInt(values.nationalIdNumber, 10),
        passportNumber: values.passportNumber,
        passportExpirationDate: values.passportExpirationDate,
        tinNumber: parseInt(values.tinNumber, 10),
        lot: values.lot,
        street: values.street,
        area: values.area,
        village: values.village,
        region: parseInt(values.region, 10),
        country: parseInt(values.country, 10),
      }

      if(Info){
        axios.post('PostInfo/AddAnEmployee', Info)
        .then(response => getNotification(response))
        .catch(error => getNotification(error))
      }
      formik.resetForm();
    }
  })

  const getNotification = (option) => {
    if(option.statusText === 'OK'){
      setNotify({
        isOpen: true,
        message: 'Employee Information Successfully Added',
        type: 'success'
      })
    }
    else{
      setNotify({
        isOpen: true,
        message: 'An error occurred',
        type: 'error'
      })
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
         <h1>Add Employee Information</h1>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <div>
            <Grid container spacing={3}>
              <form onSubmit={formik.handleSubmit}>
                <Grid item xs={12}>
                  <AddEmployeePIForm formik={formik}></AddEmployeePIForm>
                </Grid>

                <Grid item xs={12}>
                  <AddEmployeeAddressForm formik={formik}></AddEmployeeAddressForm>
                </Grid>

                <Grid item xs={12}>
                  <AddEmployeeContactForm formik={formik}></AddEmployeeContactForm>
                </Grid >

                <Grid item xs={12}>
                  <AddEmployeeOfficialInfoForm formik={formik}></AddEmployeeOfficialInfoForm>
                </Grid >

                <Grid item xs={12}>
                  <Button type="submit" variant="outlined" color="primary"> Add Employee </Button>
                </Grid >
              </form>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify}/>
    </div>
  );
}
