import React from "react";
import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

export default function SearchByRegimentNumberForm(submitFunction) {
  const paperStyle = { padding: '40px 20px', width: 350, margin: '20px auto' }
  const btnStyle = { marginTop: 30 }

  const initialValues = {
    regimentalNumber: ''
  }

  const validationSchema = Yup.object().shape({
    regimentalNumber: Yup.number()
      .typeError("Enter valid Regimental Number")
      .required("A Regimental Number is Required")
      .positive("A regimental number can't start with a minus")
      .integer("A regimental number can't include a decimal point"),
    regimentalNumber: Yup.string()
      .required("A Regimental Number is Required")
      .matches(/^[0-9]+$/, "Regimental Number must be digits only")
      .min(6, 'Must be at least 6 digits')
  })

  const onSubmit = (values, props) => {
    submitFunction.onSubmit(values);
    props.resetForm()
  }   

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align='center'>
          <Typography variant='h6'>Search by Regimental Number</Typography>
        </Grid>
        <br />
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form>
              <Field as={TextField} 
                name='regimentalNumber' 
                label='Regimental Number' 
                variant='outlined'
                fullWidth
                error={props.errors.regimentalNumber && props.touched.regimentalNumber}
                helperText={<ErrorMessage name='regimentalNumber' />} 
                required
              />
              <Button type='submit' style={btnStyle} variant='contained' color='primary'>Search<SearchIcon /></Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>    
  );
}