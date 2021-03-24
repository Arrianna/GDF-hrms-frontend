import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

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
  const [employeeInfo, setEmployeeInfo] = useState({});
  
  useEffect(() => {
     
  }, []);

  //const SexOption = ["Male","Female"];
  function FormRow() {
    return (
      <div>
        < Grid container spacing={3}>
          
          <Grid item xs={12}>
            <AddEmployeePIForm employeeInfo={employeeInfo}></AddEmployeePIForm>
          </Grid>

          <Grid item xs={12}>
            <AddEmployeeAddressForm employeeInfo={employeeInfo}></AddEmployeeAddressForm>
          </Grid>

          <Grid item xs={12}>
            <AddEmployeeContactForm employeeInfo={employeeInfo}></AddEmployeeContactForm>
          </Grid >

          <Grid item xs={12}>
            <AddEmployeeOfficialInfoForm employeeInfo={employeeInfo}></AddEmployeeOfficialInfoForm>
          </Grid >

        </Grid>           
      </div>      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
         <h1>Employee Profile Page</h1>
        </Grid>
        <Grid item xs={6}>
          <h1>
            <Button variant="outlined" color="primary">
            <Link to={'/employee-history/'}>View Career History</Link>
            </Button>
          </h1>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
