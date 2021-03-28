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
  
  let date = employeeInfo.employeeInfo.dateOfBirth;
  const formattedDate = moment(date).format('DD-MM-YYYY');
  
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField id="FirstName" label="First Name" variant="outlined" size="small" value={employeeInfo.employeeInfo.firstName}/>
            <TextField id="MiddleNameOne" label="Middle Name" variant="outlined" size="small" value={employeeInfo.employeeInfo.otherName} />
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="LastName" label="Last Name" variant="outlined" size="small" value={employeeInfo.employeeInfo.lastName}/>
            <TextField id="Race" label="Race" variant="outlined" size="small" value={employeeInfo.employeeInfo.ethnicity} />
          </Grid >
        </div> 
        <div>
          <Grid item xs={2}>
            <Grid item xs={2}>
              <TextField id="Sex" label="Sex" variant="outlined" size="small" value={employeeInfo.employeeInfo.sex} />              
              <TextField id="Nationality" label="Nationality" variant="outlined" size="small" value={employeeInfo.employeeInfo.nationality} />
            </Grid>
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="MiddleNameTwo" label="Middle Name" variant="outlined" size="small" />
          </Grid >
            <TextField id="Religion" label="Religion" variant="outlined" size="small" value={employeeInfo.employeeInfo.religion} />
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="dateOfBirth" label="Date of Birth" variant="outlined" InputLabelProps={{ shrink: true,}} size="small" type="text" defaultValue={null}/>            
            <TextField id="Marital Status" label="Marital Status" variant="outlined" size="small" value={employeeInfo.employeeInfo.maritalStatus} />
          </Grid >
        </div>
      </React.Fragment>      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <h4>Personal Information</h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
