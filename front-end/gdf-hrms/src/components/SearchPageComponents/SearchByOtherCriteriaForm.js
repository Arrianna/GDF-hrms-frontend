import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, TextField, MenuItem } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import Axios from 'axios';
import * as Yup from 'yup'

export default function SearchByOtherCriteriaForm(submitFunction) {
  const [positions, setPositions] = useState();
  
  const initialValues = {
    employeeFname: '',
    employeeLname: '',
    employeePosition: '',
  }

  const validationSchema = Yup.object().shape({
    employeeFname: Yup.string()
      .required("First Name is Required"),
    employeeLname: Yup.string()
      .required("Last Name is Required"),
    employeePosition: Yup.string()
      .required("Employee Position is Required")
  });

  const onSubmit = (values, props) => {
    submitFunction.onSubmit(values);
    props.resetForm()
  }
  
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

  const showInfo = () => {
    const paperStyle = { padding: '40px 20px', width: 350, margin: '20px auto' }
    const btnStyle = { marginTop: 20 }    

    if(positions != null){
      if(positions.length > 0){
        return (
          <Grid>
            <Paper elevation={5} style={paperStyle}>
              <Grid align='center'>
                <Typography variant='h6'>Search by Other Criteria</Typography>
              </Grid>
              <br />
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(props) => (
                  <Form>
                    <Field as={TextField} 
                      name='employeeFname' 
                      label='First Name' 
                      fullWidth
                      variant='outlined'
                      size='small'
                      error={props.errors.employeeFname && props.touched.employeeFname}
                      helperText={<ErrorMessage name='employeeFname' />} 
                      required 
                    />
                    <br /><br />
                    <Field as={TextField} 
                      name='employeeLname' 
                      label='Last Name' 
                      fullWidth
                      variant='outlined'
                      size='small'
                      error={props.errors.employeeLname && props.touched.employeeLname}
                      helperText={<ErrorMessage name='employeeLname' />} 
                      required 
                    />
                    <br /><br />
                    <Field as={TextField} 
                      select
                      name='employeePosition' 
                      label='Rank' 
                      fullWidth
                      variant='outlined'
                      size='small'
                      error={props.errors.employeePosition && props.touched.employeePosition}
                      helperText={<ErrorMessage name='employeePosition' />} 
                      required 
                    >
                      <MenuItem value=""><em>Select</em></MenuItem>
                      {positions.map((position) => (
                        <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
                      ))}
                    </Field>
                    <Button type='submit' style={btnStyle} variant='contained' color='primary'>Search<SearchIcon /></Button>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
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