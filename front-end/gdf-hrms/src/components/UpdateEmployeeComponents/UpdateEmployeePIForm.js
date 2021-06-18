import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, MenuItem } from '@material-ui/core';
import moment from 'moment';
import Axios from 'axios';

/* const useStyles = makeStyles((theme) => ({
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
})); */

export default function UpdateEmployeePIForm(props) {
  // const classes = useStyles();
  const [nationalities, setNationalities] = useState();
  const [religions, setReligions] = useState();
  const [maritalStatuses, setMaritalStatuses] = useState();
  const [ethnicities, setEthnicities] = useState();
// console.log(props.formik.values);
// console.log(props.formik.values.ethnicityId);
// console.log(props.formik.values.religionId);
// console.log(props.formik.values.nationalityId);
// console.log(props.formik.values.maritalStatusId);
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

    const getNationalities = async () => {
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
    getNationalities();
  }, []);

  const showInfo = () => {    
    if(ethnicities != null && religions != null && maritalStatuses != null && nationalities != null){
      if(ethnicities.length > 0 && religions.length > 0 && maritalStatuses.length > 0 && nationalities.length > 0){        
        return(
          <Grid container spacing = {1}>
            <h3>Personal Information</h3>
            <Grid container xs={12} spacing={3}>
              <React.Fragment> 
                <div>             
                  <Grid item xs={2}>
                    <TextField
                      name="firstName" 
                      label="First Name"
                      InputLabelProps={{ shrink: true,}}
                      value={props.formik.values.firstName} 
                      onChange={props.formik.handleChange} 
                      variant="outlined" 
                      size="small"
                      error={Boolean(props.formik.errors.firstName && props.formik.touched.firstName)}
                      helperText={props.formik.errors.firstName && props.formik.touched.firstName && String(props.formik.errors.firstName)}
                    />            
                  </Grid>       
                </div>
                <div>
                  <Grid item xs={2}>
                    <TextField 
                      name="otherName" 
                      label="Middle Name"
                      InputLabelProps={{ shrink: true,}}
                      value={props.formik.values.otherName} 
                      onChange={props.formik.handleChange} 
                      variant="outlined" 
                      size="small"
                      error={Boolean(props.formik.errors.otherName && props.formik.touched.otherName)}
                      helperText={props.formik.errors.otherName && props.formik.touched.otherName && String(props.formik.errors.otherName)}
                    />
                  </Grid>
                </div>
                <div>
                  <Grid item xs={2}>
                    <TextField
                      name="lastName" 
                      label="Last Name"
                      InputLabelProps={{ shrink: true,}}
                      value={props.formik.values.lastName}
                      onChange={props.formik.handleChange} 
                      variant="outlined" 
                      size="small"error={Boolean(props.formik.errors.lastName && props.formik.touched.lastName)}
                      helperText={props.formik.errors.lastName && props.formik.touched.lastName && String(props.formik.errors.lastName)}
                    />
                  </Grid>
                </div>
                <div>
                  <Grid item xs={4}>
                    <TextField
                      required
                      name="title"
                      label="Title"
                      InputLabelProps={{ shrink: true,}}
                      value={props.formik.values.title}
                      onChange={props.formik.handleChange}
                      variant="outlined"
                      size="small"
                      error={Boolean(props.formik.errors.title && props.formik.touched.title)}
                      helperText={props.formik.errors.title && props.formik.touched.title && String(props.formik.errors.title)}
                    />
                  </Grid>
                </div>
                <div>
                  <Grid item xs={2}>
                    <TextField
                      select
                      name="sex"
                      label="Sex"
                      InputLabelProps={{ shrink: true,}}
                      value={props.formik.values.sex || ''}
                      onChange={props.formik.handleChange}
                      variant="outlined"  
                      size="small"
                      error={Boolean(props.formik.errors.sex && props.formik.touched.sex)}
                      helperText={props.formik.errors.sex && props.formik.touched.sex && String(props.formik.errors.sex)}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>                      
                    </TextField>
                  </Grid>
                </div>
                <div>
                  <Grid item xs={2}>
                    <TextField
                      name="dateOfBirth" 
                      label="Date of Birth"
                      InputLabelProps={{ shrink: true,}}
                      value={moment(props.formik.values.dateOfBirth).format('YYYY-MM-DD')} 
                      onChange={props.formik.handleChange} 
                      variant="outlined"
                      size="small" 
                      type="date" 
                      error={Boolean(props.formik.errors.dateOfBirth && props.formik.touched.dateOfBirth)}
                      helperText={props.formik.errors.dateOfBirth && props.formik.touched.dateOfBirth && String(props.formik.errors.dateOfBirth)}
                    />
                  </Grid>
                </div>
                <div>
                  <Grid item xs={2}>
                    <TextField
                      select
                      name="ethnicityId"
                      value={props.formik.values.ethnicityId || ''}
                      onChange={props.formik.handleChange}
                      label="Ethnicity"
                      InputLabelProps={{ shrink: true,}}
                      variant="outlined"
                      size="small"
                      error={Boolean(props.formik.errors.ethnicityId && props.formik.touched.ethnicityId)}
                      helperText={props.formik.errors.ethnicityId && props.formik.touched.ethnicityId && String(props.formik.errors.ethnicityId)}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {ethnicities.map((ethnicity) => 
                        <MenuItem key={ethnicity.id} value={ethnicity.id}>{ethnicity.name}</MenuItem>
                      )}
                    </TextField>                      
                  </Grid >         
                </div>
                <div>
                  <Grid item xs={2}>   
                    <TextField
                      select
                      name="religionId"
                      label= "Religion"
                      InputLabelProps={{ shrink: true,}}
                      value={props.formik.values.religionId || ''}
                      onChange={props.formik.handleChange}
                      variant="outlined"
                      size="small"
                      error={Boolean(props.formik.errors.religionId && props.formik.touched.religionId)}
                      helperText={props.formik.errors.religionId && props.formik.touched.religionId && String(props.formik.errors.religionId)}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {religions.map((religion) =>
                        <MenuItem key={religion.id} value={religion.id}>{religion.name}</MenuItem>
                      )}                      
                    </TextField>
                  </Grid>
                </div>
                <div>
                  <Grid item xs={2}>
                    <TextField
                      select
                      name="maritalStatusId"
                      label=" Marital Status"
                      InputLabelProps={{ shrink: true,}}
                      size="small"
                      variant="outlined"
                      value={props.formik.values.maritalStatusId || ''}
                      onChange={props.formik.handleChange}
                      error={Boolean(props.formik.errors.maritalStatusId && props.formik.touched.maritalStatusId)}
                      helperText={props.formik.errors.maritalStatusId && props.formik.touched.maritalStatusId && String(props.formik.errors.maritalStatusId)}
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {maritalStatuses.map((maritalStatus) =>
                        <MenuItem key={maritalStatus.id} value={maritalStatus.id}>{maritalStatus.name}</MenuItem>
                      )}
                    </TextField>                
                  </Grid>
                </div>
                <div>
                  <Grid item xs={2}>
                    <TextField
                      select
                      name="nationalityId"
                      label="Nationality"
                      InputLabelProps={{ shrink: true,}}
                      value={props.formik.values.nationalityId || ''}
                      onChange={props.formik.handleChange}
                      variant="outlined"
                      size="small"
                      error={Boolean(props.formik.errors.nationalityId && props.formik.touched.nationalityId)}
                      helperText={props.formik.errors.nationalityId && props.formik.touched.nationalityId && String(props.formik.errors.nationalityId)}                
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {nationalities.map((nationality) =>
                        <MenuItem key={nationality.id} value={nationality.id}>{nationality.name}</MenuItem>
                      )}
                    </TextField>
                  </Grid >              
                </div>  
              </React.Fragment>
            </Grid>
          </Grid>
        )
      }
    }
  }
  return (
    <div>
      {showInfo()}
    </div>
  );
}