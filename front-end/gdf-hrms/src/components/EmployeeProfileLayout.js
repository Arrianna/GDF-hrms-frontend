import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SimpleSelect from './SimpleSelect';
import PersonalInformationForm from './EmployeeProfileComponents/PersonalInformationForm';
import AddressForm from './EmployeeProfileComponents/AddressForm';
import ContactForm from './EmployeeProfileComponents/ContactForm';
import OfficialInformationForm from './EmployeeProfileComponents/OfficialInformationForm';
import Button from '@material-ui/core/Button';


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



export default function EmployeeProfileLayout({employeePIs}) {
  const classes = useStyles();
  const SexOption = ["Male","Female"];
  function FormRow() {
    return (
        <div>
          < Grid container spacing={3}>

            <Grid item xs={12}>
               <PersonalInformationForm employeePI={employeePIs}></PersonalInformationForm>
            </Grid>

            <Grid item xs={12}>
            <AddressForm employeePI={employeePIs}></AddressForm>
            </Grid>

            <Grid item xs={12}>
            <ContactForm employeePI={employeePIs}></ContactForm>
            </Grid >

            <Grid item xs={12}>
            <OfficialInformationForm employeePI={employeePIs}></OfficialInformationForm>
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
            <Link to="/employeehistory">View Career History</Link>
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
