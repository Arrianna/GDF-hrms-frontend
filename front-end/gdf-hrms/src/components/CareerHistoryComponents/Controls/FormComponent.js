import React from 'react';
import { Grid, Paper, Button, Typography, InputLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const FormComponent = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    
    const [value,setValue] = React.useState ('')
   
    const initialValues = {
        rank: '',
        name: '',
        email: '',
        phoneNumber: '',
        startDate: '',
        endDate:'' 
    }

   
    const validationSchema = Yup.object().shape({
        rank: Yup.string().required("Required"),
        name: Yup.string().min(3, "It's too short").required("Required"),
        
        startDate: Yup.date().required("Required"),
        endDate: Yup.date().required("Required")
    })
    const onSubmit = (values, props) => {

       console.log(values)
    }
    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form noValidate>
                            {/* <FormControl>
                                <InputLabel>
                                    <Select
                                        labelId='department'
                                        id='department-select'
                                        value={value}
                                    >
                                        <MenuItem value ={'Finance'}>Finance</MenuItem>
                                        <MenuItem value ={'Finance'}>Finance</MenuItem>
                                    </Select>
                                </InputLabel>
                            </FormControl> */}
                            {/* <TextField label='Name' name="name" fullWidth value={props.values.name}
                    onChange={props.handleChange} /> */}

                            <Field as={TextField} name='name' label='Name' fullWidth variant='outlined'  
                                error={props.errors.name && props.touched.name}
                                helperText={<ErrorMessage name='name' />} required />
                                    
                         

                            <Field as={TextField} name='startDate' label='Start Date' type='date' fullWidth variant='outlined'
                                error={props.errors.startDate && props.touched.startDate}
                                helperText={<ErrorMessage name='starDate' />} required />

                            <Field as={TextField} name='endDate' label='End Date' type='date' fullWidth variant='outlined'
                                error={props.errors.endDate && props.touched.endDate}
                                helperText={<ErrorMessage name='endDate' />} required />

                            <Button type='submit' style={btnStyle} variant='contained'
                                color='primary'>Add Career</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default FormComponent;