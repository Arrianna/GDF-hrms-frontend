import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

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

export default function UpdateEmployeeOfficialInfoForm(props) {
  const classes = useStyles();  
 
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <h3>Official Information</h3>
        <Grid container xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                <TextField
                  label="Regimental Number" 
                  name="regimentalNumber"
                  InputLabelProps={{ shrink: true,}}
                  value={props.formik.values.regimentNumber} 
                  onChange={props.formik.handleChange} 
                  variant="outlined"
                  size="small" 
                  error={Boolean(props.formik.errors.regimentNumber && props.formik.touched.regimentNumber)}
                  helperText={props.formik.errors.regimentNumber && props.formik.touched.regimentNumber && String(props.formik.errors.regimentNumber)}
                />
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <TextField
                  name="nationalIdNumber" 
                  label=" National ID Number"
                  InputLabelProps={{ shrink: true,}}
                  value={props.formik.values.nationalIdNumber} 
                  onChange={props.formik.handleChange} 
                  variant="outlined" 
                  size="small"
                  error={Boolean(props.formik.errors.nationalIdNumber && props.formik.touched.nationalIdNumber)}
                  helperText={props.formik.errors.nationalIdNumber && props.formik.touched.nationalIdNumber && String(props.formik.errors.nationalIdNumber)}
                />
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <TextField
                  name="tinNumber" 
                  label="TIN Number"
                  InputLabelProps={{ shrink: true,}}
                  value={props.formik.values.tinNumber} 
                  onChange={props.formik.handleChange} 
                  variant="outlined" 
                  size="small" 
                  error={Boolean(props.formik.errors.tinNumber && props.formik.touched.tinNumber)}
                  helperText={props.formik.errors.tinNumber && props.formik.touched.tinNumber && String(props.formik.errors.tinNumber)}
                />
              </Grid>  
            </div>
            <div>
              <Grid item xs={2}>
                <TextField
                  name="passportNumber"
                  label="Passport Number"
                  InputLabelProps={{ shrink: true,}}
                  value={props.formik.values.passportNumber} 
                  onChange={props.formik.handleChange} 
                  variant="outlined" 
                  size="small" 
                  error={Boolean(props.formik.errors.passportNumber && props.formik.touched.passportNumber)}
                  helperText={props.formik.errors.passportNumber && props.formik.touched.passportNumber && String(props.formik.errors.passportNumber)}
                />
              </Grid >
            </div>
            <div>
              <Grid item xs={2}>
                <TextField
                  name="passportExpirationDate" 
                  label="Passport Expiration Date" 
                  InputLabelProps={{ shrink: true,}} 
                  value={moment(props.formik.values.passportExpirationDate).format('YYYY-MM-DD')} 
                  onChange={props.formik.handleChange} 
                  variant="outlined" 
                  size="small" 
                  type="date"
                  error={Boolean(props.formik.errors.passportExpirationDate && props.formik.touched.passportExpirationDate)}
                  helpertext={props.formik.errors.passportExpirationDate && props.formik.touched.passportExpirationDate && String(props.formik.errors.passportExpirationDate)}
                />              
              </Grid>
            </div>
          </React.Fragment> 
        </Grid>
      </Grid>
    </div>
  );
}