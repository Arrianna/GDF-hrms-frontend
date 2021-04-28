import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
//import { Dialog, DialogActions, DialogContent, DialogContentText, Slide } from '@material-ui/core';
import axios from 'axios';

import AddEmployeePIForm from './AddEmployeeComponents/AddEmployeePIForm';
import AddEmployeeAddressForm from './AddEmployeeComponents/AddEmployeeAddressForm';
import AddEmployeeContactForm from './AddEmployeeComponents/AddEmployeeContactForm';
import AddEmployeeOfficialInfoForm from './AddEmployeeComponents/AddEmployeeOfficialInfoForm';

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
  const [employeeInfo, setEmployeeInfo] = useState({
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
  })

  const handleChange = e => {
    const {name, value} = e.target;
    setEmployeeInfo(prevState=>({
      ...prevState,
      [name]: value
    }))
  }

  const postDataHandler = () => {    
    let Info = {
      nationalityId: parseInt(employeeInfo.nationalityId, 10),
      religionId: parseInt(employeeInfo.religionId, 10),
      ethnicityId: parseInt(employeeInfo.ethnicityId, 10),
      maritalStatusId: parseInt(employeeInfo.maritalStatusId, 10),
      homeNumber: parseInt(employeeInfo.homeNumber, 10),
      cellNumber: parseInt(employeeInfo.cellNumber, 10),
      workNumber: parseInt(employeeInfo.workNumber, 10),
      email: employeeInfo.email,
      title: '',
      firstName: employeeInfo.firstName,
      lastName: employeeInfo.lastName,
      otherName: employeeInfo.otherName,
      regimentNumber: parseInt(employeeInfo.regimentNumber, 10),
      dateOfBirth: employeeInfo.dateOfBirth,
      sex: employeeInfo.sex,
      nationalIdNumber: parseInt(employeeInfo.nationalIdNumber, 10),
      passportNumber: employeeInfo.passportNumber,
      passportExpirationDate: employeeInfo.passportExpirationDate,
      tinNumber: parseInt(employeeInfo.tinNumber, 10),
      lot: employeeInfo.lot,
      street: employeeInfo.street,
      area: employeeInfo.area,
      village: employeeInfo.village,
      region: parseInt(employeeInfo.region, 10),
      country: parseInt(employeeInfo.country, 10),
    }
    if(Info){
      axios.post('PostInfo/AddAnEmployee', Info)
      .then(response => console.log(response))
      .catch(error => console.log(error))
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
              <Grid item xs={12}>
                <AddEmployeePIForm handleChange={handleChange} employeeInfo={employeeInfo}></AddEmployeePIForm>
              </Grid>

              <Grid item xs={12}>
                <AddEmployeeAddressForm handleChange={handleChange} employeeInfo={employeeInfo}></AddEmployeeAddressForm>
              </Grid>

              <Grid item xs={12}>
                <AddEmployeeContactForm handleChange={handleChange} employeeInfo={employeeInfo}></AddEmployeeContactForm>
              </Grid >

              <Grid item xs={12}>
                <AddEmployeeOfficialInfoForm handleChange={handleChange} employeeInfo={employeeInfo}></AddEmployeeOfficialInfoForm>
              </Grid >

              <Grid item xs={12}>
                <Button type="submit" onClick={postDataHandler} variant="outlined" color="primary"> Add Employee </Button>
              </Grid >
            </Grid>           
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
