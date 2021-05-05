import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useFormik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(5),    
  },

  paragraphColor: {
    color: 'red'
  }
}));

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
});

export default function SearchByRegimentNumberForm(submitFunction) {
  const paperStyle = { padding: '40px 20px', width: 350, margin: '20px auto' }
  const btnStyle = { marginTop: 30 }
    
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      regimentalNumber: ''
    },

    validationSchema,

    onSubmit(values){
      console.log(values);
      submitFunction.onSubmit(values);
    },
  });

  return (
    <div>
      <Grid>
        <Paper elevation={5} style={paperStyle}>
          <Grid align='center'>
            <Typography variant='h6'>Search by Regimental Number</Typography>
            <br />
          </Grid>          
          <form onSubmit={handleSubmit}>
            <div>
              <TextField 
                name='regimentalNumber' 
                label='Regimental Number' 
                variant='outlined' 
                fullWidth
                value={values.regimentalNumber}
                onChange={handleChange}
                helperText={errors.regimentalNumber ? errors.regimentalNumber : null}
              />
                {/* {errors.regimentalNumber ? errors.regimentalNumber : null} */}
            </div>
                <Button type='submit' style={btnStyle} variant='contained' color='primary'>Search<SearchIcon /></Button>
          </form>         
        </Paper>
      </Grid>
    </div>
  );
}