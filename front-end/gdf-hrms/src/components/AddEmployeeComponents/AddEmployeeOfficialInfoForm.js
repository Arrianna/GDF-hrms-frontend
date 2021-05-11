import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';

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

  paragraphColor: {
    color: 'red'
  }
}));

export default function AddEmployeeOfficialInfoForm(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h3>Official Information</h3>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <Grid item xs={2}>
              <TextField
                required
                name='regimentNumber'
                label='Regimental Number'
                size="small"
                variant='outlined'
                value={props.formik.values.regimentNumber}
                onChange={props.formik.handleChange}
                error={Boolean(props.formik.errors.regimentNumber && props.formik.touched.regimentNumber)}
                helperText={props.formik.errors.regimentNumber && props.formik.touched.regimentNumber && String(props.formik.errors.regimentNumber)}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                required
                name='nationalIdNumber'
                label='National ID Number'
                size="small"
                variant='outlined'
                value={props.formik.values.nationalIdNumber}
                onChange={props.formik.handleChange}
                error={Boolean(props.formik.errors.nationalIdNumber && props.formik.touched.nationalIdNumber)}
                helperText={props.formik.errors.nationalIdNumber && props.formik.touched.nationalIdNumber && String(props.formik.errors.nationalIdNumber)}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                required
                name='passportNumber'
                label='Passport Number'
                size="small"
                variant='outlined'
                value={props.formik.values.passportNumber}
                onChange={props.formik.handleChange}
                error={Boolean(props.formik.errors.passportNumber && props.formik.touched.passportNumber)}
                helperText={props.formik.errors.passportNumber && props.formik.touched.passportNumber && String(props.formik.errors.passportNumber)}
              />
            </Grid >

            <Grid item xs={2}>
              <TextField
                required
                name='passportExpirationDate'
                label='Passport Expiration Date'
                size="small"
                variant='outlined'
                value={props.formik.values.passportExpirationDate}
                onChange={props.formik.handleChange}
                InputLabelProps={{ shrink: true,}}
                type='date'
                error={Boolean(props.formik.errors.passportExpirationDate && props.formik.touched.passportExpirationDate)}
                helpertext={props.formik.errors.passportExpirationDate && props.formik.touched.passportExpirationDate && String(props.formik.errors.passportExpirationDate)}
              />
            </Grid >

            <Grid item xs={2}>
              <TextField
                required
                name='tinNumber'
                label='TIN Number'
                size="small"
                variant='outlined'
                value={props.formik.values.tinNumber}
                onChange={props.formik.handleChange}
                error={Boolean(props.formik.errors.tinNumber && props.formik.touched.tinNumber)}
                helperText={props.formik.errors.tinNumber && props.formik.touched.tinNumber && String(props.formik.errors.tinNumber)}
              />
            </Grid>
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
