import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography, TextField, Select } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(5),
  },
    
  cardcontents: {        
    flex: 1,
    float: 'left',
    margin: theme.spacing(5),        
  },

  paragraphColor: {
    color: 'red'
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const validationSchema = Yup.object().shape({
  employeeFname: Yup.string()
    .required("First Name is Required"),
  employeeLname: Yup.string()
    .required("Last Name is Required"),
  employeePosition: Yup.string()
    .required("Employee Position is Required")
});

export default function SearchByOtherCriteriaForm(props) {
  const classes = useStyles();
  const { control } = useForm();
  const [positions, setPositions] = useState();
  
  useEffect(() => {
    const getPositions = async () => {
      const info = await Axios.get("GetInfo/GetAllPositions");
      if(info.data != null){
        if(info.data.length > 0){
          setPositions(info.data);
        }
      }
    };
    
    getPositions();
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      employeeFname: '',
      employeeLname: '',
      employeePosition: ''
    },

    validationSchema,

    onSubmit(values){
      props.onSubmit(values);
      console.log(values);
    }
  });
  
  const showInfo = () => {
    const paperStyle = { padding: '40px 20px', width: 350, margin: '20px auto' }
    const btnStyle = { marginTop: 30 }    

    if(positions != null){
      if(positions.length > 0){
        return (
          <div>
            <Grid>
              <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                  <Typography variant='h6'>Search by Other Criteria</Typography>
                  <br />
                </Grid>
                <form onSubmit={handleSubmit}>                  
                  <TextField 
                    name='employeeFname' 
                    label='First Name' 
                    variant='outlined' 
                    fullWidth
                    value={values.employeeFname}
                    onChange={handleChange}
                    helperText={errors.employeeFname ? errors.employeeFname : null}
                  />
                  <br /><br />
                  <TextField 
                    name='employeeLname' 
                    label='Last Name' 
                    variant='outlined' 
                    fullWidth
                    value={values.employeeLname}
                    onChange={handleChange}
                    helperText={errors.employeeLname ? errors.employeeLname : null}
                    />
                  <br /><br />
                  <TextField 
                    select
                    id="position" 
                    name="employeePosition"
                    label="Rank"
                    variant='outlined' 
                    margin='normal'
                    defaultValue=""
                    value={values.employeePosition}
                    onChange={handleChange}
                    className={classes.formControl}
                    helperText={errors.employeePosition ? errors.employeePosition : null}
                  >
                    <MenuItem value=""><em>Select</em></MenuItem>
                    {positions.map((position) => (
                      <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
                      ))}
                  </TextField>
                  <Button type='submit' style={btnStyle} color='primary' variant='contained'>Search<SearchIcon /></Button>
                </form>
              </Paper>
            </Grid>
          </div>
        );
      }
    }
  }
  return(
    <div>
      {showInfo()}
    </div>
  );
}