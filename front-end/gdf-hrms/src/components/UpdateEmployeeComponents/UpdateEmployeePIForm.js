import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';
import axios from './axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'


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

export default function UpdateEmployeePIForm(props) {  
  const classes = useStyles();  
  const [nationalities, setNationalities] = useState();
  const [religions, setReligions] = useState();
  const [maritalStatuses, setMaritalStatuses] = useState();
  const [ethnicities, setEthnicities] = useState();

  const initialValues={
    firstName:'',
    lastName:'',
    sex:'',
    dateOfBirth:'',
    ethnicity:'',
    religion:'',
    maritalStatus:'',
    nationality:''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for First Name")
    .required("First Name is required"),

    lastName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Last Name")
    .required("Last Name is required"),

    sex: Yup.string().required("Required"),

    dateOfBirth:Yup.date()
      .required("Date Of Birth is Required"),

    ethnicity: Yup.string().required("Required"),

    religion: Yup.string().required("Religion is Required"),

    maritalStatus:Yup.string().required("Marital Status is Required"),

    nationality:Yup.string().required("Nationality is Required")
  });

  useEffect(() => {
   // console.log("heller");
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

    if(nationalities != null && religions != null && ethnicities != null && maritalStatuses != null) {
      if(nationalities.length > 0 && religions.length > 0 && ethnicities.length > 0 && maritalStatuses.length > 0){

        return(
          <Grid container spacing = {1}>
          <h4>Personal Information</h4>
          <Grid container xs={12} spacing={3}>
            <Formik  initialValues={initialValues} validationSchema={validationSchema}>
            {(props) => (
              <Form >
            <React.Fragment>
              
                <Grid item xs={2}>
                  <TextField
                         name="firstName" 
                         label="First Name" 
                         InputLabelProps={{ shrink: true,}} 
                        //  value={props.firstName} 
                        //  onChange={props.handleFirstNameChange} 
                         variant="outlined" 
                         size="small"
                         error={props.errors.firstName && props.touched.firstName}
                         helperText={<ErrorMessage name='firstName' />} required />            
                  </Grid>

                 <Grid item xs={2}>
                  <TextField name="otherNameTwo" label="Middle Name" InputLabelProps={{ shrink: true,}} value={props.otherName} onChange={props.handleOtherNameChange} variant="outlined" size="small"  />
                </Grid>

                <Grid item xs={2}>
                <TextField 
                       name="lastName" 
                       name="lastName" 
                       label="Last Name" 
                       InputLabelProps={{ shrink: true,}} 
                      //  value={props.lastName}
                      //  onChange={props.handleLastNameChange} 
                       variant="outlined" 
                       size="small" 
                       error={props.errors.lastName && props.touched.lastName}
                       helperText={<ErrorMessage name='lastName' />} required
                      />
                  </Grid>
                  <Grid item xs={2}>
                    <Field as={TextField}
                      select
                        name="sex"
                        label="Sex"
                        // value={props.sex}
                        // onChange={props.handleSexChange}
                        label="Sex" 
                        variant="outlined"  
                        size="small"                
                        InputLabelProps={{ shrink: true,}}
                        error={props.errors.sex && props.touched.sex}
                        helperText={<ErrorMessage name='sex' />} 
                        required >

                        <MenuItem value=""><em>Select</em></MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      
                      </Field>
                    </Grid>


                 <Grid item xs={2}>
                    <Field as= {TextField }
                           name="dateOfBirth" 
                           label="Date of Birth" 
                          //  value={props.dateOfBirth} 
                          //  onChange={props.handleDoBChange} 
                           variant="outlined"
                           size="small" 
                           type="date" 
                           InputLabelProps={{ shrink: true,}} 
                           error={props.errors.dateOfBirth && props.touched.dateOfBirth}
                           helperText={<ErrorMessage name='dateOfBirth' />} required
                           />
                  </Grid>
      
                <Grid item xs={2}>
                <Field as = {TextField}
                    select
                      name="ethnicity"
                      // value={props.ethnicity}
                      // onChange={props.handleEthnicityChange}
                      label="Ethnicity"
                      variant="outlined"
                      size="small" 
                      InputLabelProps={{ shrink: true,}}
                      error={props.errors.ethnicity && props.touched.ethnicity}
                      helperText={<ErrorMessage name='ethnicity' />} 
                      required >
                     <MenuItem value=""><em>Select</em></MenuItem>
                       {ethnicities.map((ethnicity) =>
                     <MenuItem key={ethnicity.id} value={ethnicity.id}>{ethnicity.name}</MenuItem>
                    )}
                    </Field>
                      
                </Grid >         
               
                 <Grid item xs={2}>   
                  <Field as ={TextField}
                    select
                      name="religion"
                      label= "Religion"
                      // value={props.religion}
                      // onChange={props.handleReligionChange}
                      label="Religion"
                      variant="outlined"
                      size="small"
                      InputLabelProps={{ shrink: true,}}
                      error={props.errors.religion && props.touched.religion}
                      helperText={<ErrorMessage name='religion' />} 
                      required >
                    
                      <MenuItem value=""><em>Select</em></MenuItem>
                      <MenuItem value={1}>Christian</MenuItem>
                      <MenuItem value={2}>Muslim</MenuItem>
                      <MenuItem value={3}>Hindu</MenuItem>
                      <MenuItem value={4}>Other</MenuItem>                
                   </Field>
                  </Grid>


                <Grid item xs={2}>
                  <Field as={TextField}
                    select
                      name="maritalStatus"
                      label=" Marital Status"
                      size="small"
                      variant="outlined"
                      // value={props.maritalStatus}
                      // onChange={props.handleMaritalStatusChange}
                      label="Marital Status"
                      InputLabelProps={{ shrink: true,}}
                      error={props.errors.maritalStatus && props.touched.maritalStatus}
                      helperText={<ErrorMessage name='maritalStatus' />} 
                      required
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                       {maritalStatuses.map((maritalStatus) =>
                     <MenuItem key={maritalStatus.id} value={maritalStatus.id}>{maritalStatus.name}</MenuItem>
                    )}
                    </Field>
                
                  </Grid>

                 <Grid item xs={2}>
                  <FormControl variant="outlined" size="small" className={classes.formControl}>
                    <InputLabel id="nationality-label" shrink="true">Nationality</InputLabel>
                    <Select
                      labelId="nationality-label"
                      id="nationality"
                      InputLabelProps={{ shrink: true,}}
                      value={props.nationality}
                      onChange={props.handleNationalityChange}
                      label="Nationality"
                      InputLabelProps={{ shrink: true,}}
                      // value={props.nationality}
                      // onChange={props.handleNationalityChange}
                      variant="outlined"
                      size="small"
                      InputLabelProps={{ shrink: true,}}
                      error={props.errors.nationality && props.touched.nationality}
                      helperText={<ErrorMessage name='nationality' />} 
                      required
                      
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                       {nationalities.map((nationality) =>
                     <MenuItem key={nationality.id} value={nationality.id}>{nationality.name}</MenuItem>
                    )}
                    </Select>
                  </FormControl>
                </Grid >
                
            </React.Fragment>
            </Form>
            )}
            </Formik>
          </Grid>
        </Grid>
        )}
     }}
  
  

  return (
    <div className={classes.root}>
    {showInfo()}
    </div>
  );
}
