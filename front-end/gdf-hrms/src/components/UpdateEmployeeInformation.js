import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import Axios from 'axios';
import Notification from './Notification';
import { useFormik } from 'formik';
import * as Yup from 'yup'

import UpdateEmployeePIForm from './UpdateEmployeeComponents/UpdateEmployeePIForm';
import UpdateEmployeeContactForm from './UpdateEmployeeComponents/UpdateEmployeeContactForm';
import UpdateEmployeeOfficialInfoForm from './UpdateEmployeeComponents/UpdateEmployeeOfficialInfoForm';

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

export default function UpdateEmployeeInformation() {
  const classes = useStyles();
  const history = useHistory();
  const [empInfoGet, setEmpInfoGet] = useState({});
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const params = useParams();
  const eId = params.empId;
  
  useEffect(() => {   
    const getEmpInfo = async () => {
      const info = await Axios.get("EmployeeInfo/id/" + eId);
      setEmpInfoGet(info.data);
    };
    getEmpInfo();
  }, [eId]);

  const formik = useFormik ({
    enableReinitialize: true,
    
    initialValues: {
      nationalityId: empInfoGet.nationalityId,
      religionId: empInfoGet.religionId,
      ethnicityId: empInfoGet.ethnicityId,
      maritalStatusId: empInfoGet.maritalStatusId,
      homeNumber: empInfoGet.homeNumber,
      cellNumber: empInfoGet.cellNumber,
      workNumber: empInfoGet.workNumber,
      email: empInfoGet.email,
      title: empInfoGet.title,
      firstName: empInfoGet.firstName,
      lastName: empInfoGet.lastName,
      otherName: empInfoGet.otherName,
      regimentNumber: empInfoGet.regimentNumber,
      dateOfBirth: empInfoGet.dateOfBirth,
      sex: empInfoGet.sex,
      nationalIdNumber: empInfoGet.nationalIdNumber,
      passportNumber: empInfoGet.passportNumber,
      passportExpirationDate: empInfoGet.passportExpirationDate,
      tinNumber: empInfoGet.tinNumber,
    },

    validationSchema: Yup.object().shape({
      nationalityId: Yup.string()
        .required("Nationality is Required")
        .typeError("Select a nationality"),
      religionId: Yup.number()
        .required("Religion is Required")
        .typeError("Select a religion"),
      ethnicityId: Yup.number()
        .required("Ethnicity is Required")
        .typeError("Select an ethnicity"),
      maritalStatusId: Yup.number()
        .required("Marital Status is Required")
        .typeError("Select a marital status"),
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
    }),

    onSubmit: values => {
      let Info = {
        id: parseInt(eId, 10),
        nationalityId: values.nationalityId,
        religionId: values.religionId,
        ethnicityId: values.ethnicityId,
        maritalStatusId: values.maritalStatusId,
        homeNumber: parseInt(values.homeNumber, 10),
        cellNumber: parseInt(values.cellNumber, 10),
        workNumber: parseInt(values.workNumber, 10),
        email: values.email,
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        otherName: values.otherName,
        regimentNumber: values.regimentNumber,
        dateOfBirth: values.dateOfBirth,
        sex: values.sex,
        nationalIdNumber: parseInt(values.nationalIdNumber, 10),
        passportNumber: values.passportNumber,
        passportExpirationDate: values.passportExpirationDate,
        tinNumber: parseInt(values.tinNumber, 10),
      }
      
      if(Info){
        Axios.patch('UpdateInfo/update/employeePI/' + eId, Info)
        .then(response => {
          getNotification(response)
          if(response.status === 204){
            history.push('/employee-profile/' + values.regimentNumber);
          }
        })
        .catch(error => console.log(error))     
      }
    }
  })  
  
  const getNotification = (response) => {
    if(response.status === 204){
      setNotify({
        isOpen: true,
        message: 'Employee Information Successfully Saved',
        type: 'success'
      })
    }
    if(response === 'error'){
      setNotify({
        isOpen: true,
        message: 'An error was detected',
        type: 'error'
      })
    }
  }

  return (    
    <div className={classes.root}>
      {empInfoGet ?
        <Grid container spacing={3}>
          <Grid item xs={6}>
          <h1>Update Employee Profile</h1>
          </Grid>
          <Grid container>
            <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12}>
                <UpdateEmployeePIForm formik={formik}></UpdateEmployeePIForm>
              </Grid>       

              <Grid item xs={12}>
                <UpdateEmployeeContactForm formik={formik}></UpdateEmployeeContactForm>
              </Grid >

              <Grid item xs={12}>
                <UpdateEmployeeOfficialInfoForm formik={formik}></UpdateEmployeeOfficialInfoForm>
              </Grid >
                <br></br>
              <Grid item xs={6}>
                <Button type="submit" variant="outlined" color="primary" >Update Employee</Button>
              </Grid >
            </form>
            <Notification  notify={notify} setNotify={setNotify}></Notification>
          </Grid>       
        </Grid>
      : <CircularProgress size={65} style={{ marginTop: "120px" }} />}
    </div>
  );
}