import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PersonalInformationForm from './EmployeeProfileComponents/PersonalInformationForm';
import AddressForm from './EmployeeProfileComponents/AddressForm';
import ContactForm from './EmployeeProfileComponents/ContactForm';
import OfficialInformationForm from './EmployeeProfileComponents/OfficialInformationForm';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

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

export default function EmployeeProfileLayout(props) {
  const classes = useStyles();
  const params = useParams();  
  const [employeeInfo, setEmployeeInfo] = useState({});
  
  let regNumber;
  for(let[key, value] of Object.entries(params)){
    regNumber = value;
  }
  
  useEffect(() => {
      const getEmpInfo = async () => {
      if(regNumber){
      const info = await Axios.get("/regnumber/" + regNumber);    
      setEmployeeInfo(info.data);
      }
    };
    getEmpInfo();
  }, [regNumber]);

  //const SexOption = ["Male","Female"];
  function FormRow() {
    return (
        <div>
          < Grid container spacing={3}>
            
            <Grid item xs={12}>
              <PersonalInformationForm employeeInfo={employeeInfo}></PersonalInformationForm>
            </Grid>

            <Grid item xs={12}>
              <AddressForm employeeInfo={employeeInfo}></AddressForm>
            </Grid>

            <Grid item xs={12}>
              <ContactForm employeeInfo={employeeInfo}></ContactForm>
            </Grid >

            <Grid item xs={12}>
              <OfficialInformationForm employeeInfo={employeeInfo}></OfficialInformationForm>
            </Grid >

          </Grid>
           
      </div>
      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} >
        <Grid xs={6}>
         <h1>Employee Profile Page</h1>
        </Grid>
        <Grid xs={6}>
          <h1>
            <Button variant="outlined" color="primary">
            <Link to={'/employee-history/' + regNumber}>View Career History</Link>
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
