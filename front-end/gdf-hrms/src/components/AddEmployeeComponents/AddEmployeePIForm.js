import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';

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

export default function AddEmployeePIForm(props) {  
  const classes = useStyles();  
  const [ethnicities, setEthnicities] = useState();
  const [religions, setReligions] = useState();
  const [maritalStatuses, setMaritalStatuses] = useState();
  const [nationalities, setNationalities] = useState();

  useEffect(() => {
    const getEthnicities = async () => {
      const info = await Axios.get("GetInfo/GetAllEthnicities");
      if(info.data != null){
        if(info.data.length > 0){
          setEthnicities(info.data);
        }
      }
    };
    const getReligions = async () => {
      const info = await Axios.get("GetInfo/GetAllReligions");
      if(info.data != null){
        if(info.data.length > 0){
          setReligions(info.data);
        }
      }
    };
    const getMaritalStatuses = async () => {
      const info = await Axios.get("GetInfo/GetAllMaritalStaus");
      if(info.data != null){
        if(info.data.length > 0){
          setMaritalStatuses(info.data);
        }
      }
    };
    const getNationalitiess = async () => {
      const info = await Axios.get("GetInfo/GetAllNationalities");
      if(info.data != null){
        if(info.data.length > 0){
          setNationalities(info.data);
        }
      }
    };
    getEthnicities();
    getReligions();
    getMaritalStatuses();
    getNationalitiess();
  }, []);

  const showInfo = () => {
    if(ethnicities != null && religions != null && maritalStatuses != null && nationalities != null){
      if(ethnicities.length > 0 && religions.length > 0 && maritalStatuses.length > 0 && nationalities.length > 0){
        return (
          <div className={classes.root}>
            <Grid container spacing={1}>
              <h4>Personal Information</h4>
              <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                  <div>
                    <Grid item xs={2}>
                      <TextField required name="firstName" label="First Name" value={props.employeeInfo && props.employeeInfo.firstName} onChange={props.handleChange} variant="outlined" size="small" />                
                      <TextField name="otherName" label="Middle Name" value={props.employeeInfo && props.employeeInfo.otherName} onChange={props.handleChange} variant="outlined" size="small"  />
                    </Grid>
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField required id="LastName" name="lastName" label="Last Name" value={props.employeeInfo && props.employeeInfo.lastName} onChange={props.handleChange} variant="outlined" size="small" />
                      <TextField id="MiddleNameTwo" label="Middle Name" value={props.employeeInfo && props.employeeInfo.otherName} onChange={props.handleChange} variant="outlined" size="small" />                      
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <Grid item xs={2}>
                        <FormControl variant="outlined" size="small" className={classes.formControl}>
                          <InputLabel id="sex-label">Sex</InputLabel>
                          <Select
                            labelId="sex-label"
                            id="sex"
                            name="sex"
                            value={props.employeeInfo && props.employeeInfo.sex}
                            onChange={props.handleChange}
                            label="Sex"                  
                          >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField id="dateOfBirth" name="dateOfBirth" label="Date of Birth" value={props.employeeInfo && props.employeeInfo.dateOfBirth} onChange={props.handleChange} variant="outlined" InputLabelProps={{ shrink: true,}} size="small" type="date" />                        
                      </Grid>
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <FormControl variant="outlined" size="small" className={classes.formControl}>
                        <InputLabel id="ethnicity-label">Ethnicity</InputLabel>
                        <Select
                          labelId="ethnicity-label"
                          id="ethnicity"
                          name="ethnicityId"
                          value={props.employeeInfo && props.employeeInfo.ethnicityId}
                          onChange={props.handleChange}
                          label="Ethnicity"
                        >
                          <MenuItem value=""><em>Select</em></MenuItem>
                          {ethnicities.map((ethnicity) =>
                            <MenuItem key={ethnicity.id} value={ethnicity.id}>{ethnicity.name}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid >
                    <FormControl variant="outlined" size="small" className={classes.formControl}>
                      <InputLabel id="religion-label">Religion</InputLabel>
                      <Select
                        labelId="religion-label"
                        id="religion"
                        name="religionId"
                        value={props.employeeInfo && props.employeeInfo.religionId}
                        onChange={props.handleChange}
                        label="Religion"
                      >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {religions.map((religion) =>
                          <MenuItem key={religion.id} value={religion.id}>{religion.name}</MenuItem>
                        )}                    
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <FormControl variant="outlined" size="small" className={classes.formControl}>
                        <InputLabel id="marital-status-label">Marital Status</InputLabel>
                        <Select
                          labelId="marital-status-label"
                          id="marital-status"
                          name="maritalStatusId"
                          value={props.employeeInfo && props.employeeInfo.maritalStatusId}
                          onChange={props.handleChange}
                          label="Marital Status"
                        >
                          <MenuItem value=""><em>Select</em></MenuItem>
                          {maritalStatuses.map((maritalStatus) =>
                            <MenuItem key={maritalStatus.id} value={maritalStatus.id}>{maritalStatus.name}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      {/*<TextField id="Nationality" label="Nationality" value={props.nationality} onChange={props.handleNationalityChange} variant="outlined" size="small" />*/}
                      <FormControl variant="outlined" size="small" className={classes.formControl}>
                        <InputLabel id="nationality-label">Nationality</InputLabel>
                        <Select
                          labelId="nationality-label"
                          id="Nationality"
                          name="nationalityId"
                          value={props.employeeInfo && props.employeeInfo.nationalityId}
                          onChange={props.handleChange}
                          label="Nationality"
                        >
                          <MenuItem value=""><em>Select</em></MenuItem>
                          {nationalities.map((nationality) =>
                            <MenuItem key={nationality.id} value={nationality.id}>{nationality.name}</MenuItem>
                          )}                          
                        </Select>
                      </FormControl>
                    </Grid >
                  </div>
                </React.Fragment>
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  }
  return (
    <div>
      {showInfo()}
    </div>
  );
}
