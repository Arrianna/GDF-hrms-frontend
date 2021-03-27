import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
    }, 
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AddEmployeePIForm() {  
  const classes = useStyles();
  const [maritalStatus, setMaritalStatus] = useState('');
  const [religion, setReligion] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [sex, setSex] = useState('');

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };

  const handleEthnicityChange = (event) => {
    setEthnicity(event.target.value);
  };

  // DON'T LAUGH TOO MUCH, YOU MIGHT POP A VEIN
  const handleSexChange = (event) => {
    setSex(event.target.value);
  }
  
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField name="FirstName" label="First Name" variant="outlined" size="small" />
            <TextField name="otherNameTwo" label="Middle Name" variant="outlined" size="small"  />
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="LastName" label="Last Name" variant="outlined" size="small" />            
            <TextField id="MiddleNameTwo" label="Middle Name" variant="outlined" size="small" />
          </Grid >
        </div> 
        <div>
          <Grid item xs={2}>
            <Grid item xs={2}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                  labelId="sex-label"
                  id="sex"
                  value={sex}
                  onChange={handleSexChange}
                  label="Sex"
                >
                  <MenuItem value=""><em>Select</em></MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                  <MenuItem value={3}>Other</MenuItem>
                </Select>
              </FormControl>

              <TextField id="dateOfBirth" label="Date of Birth" variant="outlined" InputLabelProps={{ shrink: true,}} size="small" type="date" />
            </Grid>
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="ethnicity-label">Ethnicity</InputLabel>
              <Select
                labelId="ethnicity-label"
                id="ethnicity"
                value={ethnicity}
                onChange={handleEthnicityChange}
                label="Ethnicity"
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                <MenuItem value={1}>African</MenuItem>
                <MenuItem value={2}>Indian</MenuItem>
                <MenuItem value={3}>Amerindian</MenuItem>
                <MenuItem value={4}>Chinese</MenuItem>
                <MenuItem value={5}>Portuguese</MenuItem>
                <MenuItem value={6}>Mixed</MenuItem>
              </Select>
            </FormControl>            
          </Grid >            
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="religion-label">Religion</InputLabel>
              <Select
                labelId="religion-label"
                id="religion"
                value={religion}
                onChange={handleReligionChange}
                label="Religion"
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                <MenuItem value={1}>Christian</MenuItem>
                <MenuItem value={2}>Muslim</MenuItem>
                <MenuItem value={3}>Hindu</MenuItem>
                <MenuItem value={4}>Other</MenuItem>                
              </Select>
            </FormControl>
        </div>
        <div>
          <Grid item xs={2}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="marital-status-label">Marital Status</InputLabel>
              <Select
                labelId="marital-status-label"
                id="marital-status"
                value={maritalStatus}
                onChange={handleMaritalStatusChange}
                label="Marital Status"
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                <MenuItem value={1}>Single</MenuItem>
                <MenuItem value={2}>Married</MenuItem>
                <MenuItem value={3}>Divorced</MenuItem>
              </Select>
            </FormControl>
            <TextField id="Nationality" label="Nationality" variant="outlined" size="small" />            
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
