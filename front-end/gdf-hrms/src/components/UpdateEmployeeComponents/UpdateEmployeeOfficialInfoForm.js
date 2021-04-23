import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

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
  const { register, errors } = useForm();
 
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Official Information</h4>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                <TextField required id="regimentalNumber" label="RegimentalNumber" name="regimentalNumber" InputLabelProps={{ shrink: true,}} value={props.regimentNumber} onChange={props.handleRegNumChange} variant="outlined" size="small" inputRef={register({ required: true, minLength: 6, maxLength: 6, type: "number", pattern: /^[0-9]+$/i })}/>
                {errors.regimentalNumber && errors.regimentalNumber.type === 'required' && (<p className={classes.paragraphColor}>Regiment Number is required</p>)}
                {errors.regimentalNumber && errors.regimentalNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 6 numbers required</p>)}
                {errors.regimentalNumber && errors.regimentalNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 6 numbers required</p>)}
                {errors.regimentalNumber && errors.regimentalNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid regiment number</p>)}
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <TextField required id="identificationNumber" name="identificationNumber" label="IdentificationNumber" InputLabelProps={{ shrink: true,}} value={props.nationalIdNumber} onChange={props.handleNationalIdNumChange} variant="outlined" size="small" inputRef={register({ required: true, minLength: 9, maxLength: 9, type: "number", pattern: /^[0-9]+$/i})}/>
                {errors.identificationNumber && errors.identificationNumber.type === 'required' && (<p className={classes.paragraphColor}>National Identification Number is required</p>)}
                {errors.identificationNumber && errors.identificationNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 9 numbers required</p>)}
                {errors.identificationNumber && errors.identificationNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 9 numbers required</p>)}
                {errors.identificationNumber && errors.identificationNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid ID Number</p>)}
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <TextField required id="passportNumber" name="passportNumber" label="PassportNumber" InputLabelProps={{ shrink: true,}} value={props.passportNumber} onChange={props.handlePassportNumChange} variant="outlined" size="small" inputRef={register({ required: true, minLength: 8, maxLength: 8, type: "text"})}/>
                {errors.passportNumber && errors.passportNumber.type === 'required' && (<p className={classes.paragraphColor}>Passport Number is required</p>)}
                {errors.passportNumber && errors.passportNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 8 characters required</p>)}
                {errors.passportNumber && errors.passportNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 8 characters required</p>)}
                {errors.passportNumber && errors.passportNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid Passport Number</p>)}
              </Grid >
            </div>
            <div>
              <Grid item xs={2}>
                <TextField required id="passportExpirationDate" name="passportExpirationDate" label="Passport Expiration Date" InputLabelProps={{ shrink: true,}} value={props.passportExpirationDate} onChange={props.handlePassportExpDateChange} variant="outlined" size="small" InputLabelProps={{ shrink: true,}} type="date" inputRef={register({ required: true})}/>
                {errors.passportExpirationDate && errors.passportExpirationDate.type === 'required' && (<p className={classes.paragraphColor}>Passport Expiration Date is required</p>)}
              </Grid >
            </div>    
            <div>
              <Grid item xs={2}>
                <TextField required id="tinNumber" name="tinNumber" label="TIN Number" InputLabelProps={{ shrink: true,}} value={props.tinNumber} onChange={props.handleTinNumChange} variant="outlined" size="small" inputRef={register({ required: true, minLength: 9, maxLength: 9, type: "number", pattern: /^[0-9]+$/i })}/>
                {errors.tinNumber && errors.tinNumber.type === 'required' && (<p className={classes.paragraphColor}>Tin Number is required</p>)}
                {errors.tinNumber && errors.tinNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 9 numbers required</p>)}
                {errors.tinNumber && errors.tinNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 9 numbers required</p>)}
                {errors.tinNumber && errors.tinNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid Tin Number</p>)}
              </Grid>
            </div>        
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
