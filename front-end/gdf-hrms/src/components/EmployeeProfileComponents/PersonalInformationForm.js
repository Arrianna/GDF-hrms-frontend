import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

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
  
  return (
    <div className={classes.root}>
      <Grid container >
        <h4>Personal Information</h4>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
           
              <Grid item xs={2}>
                <TextField id="FirstName" label="First Name" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.firstName}/>
             </Grid> 

              <Grid item xs={2}>
                <TextField id="MiddleNameOne" label="Middle Name" variant="outlined" size="small"  InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.otherName} />
              </Grid>
           
              <Grid item xs={2}>
                <TextField id="LastName" label="Last Name" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.lastName}/>
              </Grid> 

              <Grid item xs={2}>
                <TextField id="Race" label="Race" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.ethnicity} />
              </Grid >
           
              <Grid item xs={2}>
                  <TextField id="Sex" label="Sex" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.sex} />              
              </Grid> 

              <Grid item xs={2}>
                  <TextField id="Nationality" label="Nationality" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.nationality} />
             </Grid>
             
           
              <Grid item xs={2}>
                <TextField id="MiddleNameTwo" label="Middle Name" InputLabelProps={{ shrink: true,}} variant="outlined" size="small" />
              </Grid >

              <Grid item xs={2}>
                <TextField id="Religion" label="Religion" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.religion} />
              </Grid>

              <Grid item xs={2}>
                <TextField id="dateOfBirth" label="Date of Birth" variant="outlined" InputLabelProps={{ shrink: true,}} size="small" type="text" value={moment(employeeInfo.employeeInfo.dateOfBirth).format('DD-MM-YYYY')}/>
               </Grid>

               <Grid item xs={2}>
                <TextField id="Marital Status" label="Marital Status" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} value={employeeInfo.employeeInfo.maritalStatus} />
              </Grid >
           
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
