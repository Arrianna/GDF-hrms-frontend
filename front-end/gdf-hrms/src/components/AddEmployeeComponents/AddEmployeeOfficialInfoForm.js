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

export default function AddEmployeeOfficialInfoForm() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
 
  function FormRow() {
    return (
      <React.Fragment>
        <div>
          <Grid item xs={2}>
            <TextField required id="regimentalNumber" label="RegimentalNumber" name="regimentalNumber" defaultValue={''} variant="outlined" size="small" inputRef={register({ required: true, minLength: 6, maxLength: 6, type: "number", pattern: /^[0-9]+$/i })}/>
            {errors.regimentalNumber && errors.regimentalNumber.type === 'required' && (<p className={classes.paragraphColor}>Regiment Number is required</p>)}
            {errors.regimentalNumber && errors.regimentalNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 6 numbers required</p>)}
            {errors.regimentalNumber && errors.regimentalNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 6 numbers required</p>)}
            {errors.regimentalNumber && errors.regimentalNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid regiment number</p>)}
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="identificationNumber" name="identificationNumber" label="IdentificationNumber" variant="outlined" size="small" inputRef={register({ required: true, pattern: /^[0-9]+$/i})}/>
            {errors.identificationNumber && errors.identificationNumber.type === 'required' && (<p className={classes.paragraphColor}>National Identification Number is required</p>)}
            {errors.identificationNumber && errors.identificationNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid ID Number</p>)}
          </Grid>
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="passportNumber" name="passportNumber" label="PassportNumber" variant="outlined" size="small" inputRef={register({ required: true, minLength: 6, maxLength: 6, type: "number", pattern: /^[0-9]+$/i })}/>
            {errors.passportNumber && errors.passportNumber.type === 'required' && (<p className={classes.paragraphColor}>Passport Number is required</p>)}
            {errors.passportNumber && errors.passportNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 6 numbers required</p>)}
            {errors.passportNumber && errors.passportNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 6 numbers required</p>)}
            {errors.passportNumber && errors.passportNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid Passport Number</p>)}
          </Grid >
        </div>
        <div>
          <Grid item xs={2}>
            <TextField id="passportExpirationDate" name="passportExpirationDate" label="Passport Expiration Date" variant="outlined" size="small" InputLabelProps={{ shrink: true,}} type="date" inputRef={register({ required: true})}/>
            {errors.passportExpirationDate && errors.passportExpirationDate.type === 'required' && (<p className={classes.paragraphColor}>Passport Expiration Date is required</p>)}
          </Grid >
        </div>    
        <div>
          <Grid item xs={2}>
            <TextField id="tinNumber" name="tinNumber" label="TIN Number" variant="outlined" size="small" inputRef={register({ required: true, minLength: 6, maxLength: 6, type: "number", pattern: /^[0-9]+$/i })}/>
            {errors.tinNumber && errors.tinNumber.type === 'required' && (<p className={classes.paragraphColor}>Tin Number is required</p>)}
            {errors.tinNumber && errors.tinNumber.type === 'minLength' && (<p className={classes.paragraphColor}>A minimum of 6 numbers required</p>)}
            {errors.tinNumber && errors.tinNumber.type === 'maxLength' && (<p className={classes.paragraphColor}>A maximum of 6 numbers required</p>)}
            {errors.tinNumber && errors.tinNumber.type === 'pattern' && (<p className={classes.paragraphColor}>Invalid Tin Number</p>)}
          </Grid>
        </div>        
      </React.Fragment>      
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Official Information</h4>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
