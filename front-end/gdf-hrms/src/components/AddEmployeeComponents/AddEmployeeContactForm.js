import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MailIcon from '@material-ui/icons/Mail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CallIcon from '@material-ui/icons/Call';
import InputAdornment from '@material-ui/core/InputAdornment';
//import PhoneInput from 'mui-phone-input';
//import ReactPhoneInput from 'react-phone-input-mui';
import MuiPhoneNumber from 'material-ui-phone-number';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
    }, 
  },

  field: {
    margin: '10px 0',
  },

  countryList: {
    ...theme.typography.body1,
  },
  
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AddEmployeeContactForm() {
  const classes = useStyles();
  const [homeNumber, setHomeNumber] = useState();
  const [cellNumber, setCellNumber] = useState();
  const [workNumber, setWorkNumber] = useState();

  const handleHomeNumChange = (event) => {    
    setHomeNumber(event);
  }

  const handleCellNumChange = (event) => {    
    setCellNumber(event);
  }

  const handleWorkNumChange = (event) => {    
    setWorkNumber(event); 
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
      <h4>Contact Information</h4>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                {/*<TextField 
                  id="HomeNumber" 
                  label="Home Number" 
                  variant="outlined" 
                  size="small" 
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                  />*/}
                {/*<PhoneInput
                  id="HomeNumber" 
                  label="Home Number" 
                  variant="outlined"              
                  size="small" 
                  value={phoneNumber}
                  onChange={handleOnChange}              
                  //inputClass={classes.field}
                  //dropdownClass={classes.countryList}  
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}            
                  inputExtraProps={{
                    margin: 'normal',
                    autoComplete: 'phone',
                    required: 'true',
                    name: 'custom-username'
                  }}
                />*/}
                {/*<MuiPhoneNumber
                  value={phoneNumber}
                  defaultCountry='guy'
                  variant= 'outlined'
                  regions={['north-america', 'carribean', 'south-america']}
                  onChange={handleOnChange}
                  inputClass={classes.field}
                  dropdownClass={classes.countryList}
                  component={TextField}
                  inputExtraProps={{
                    margin: 'normal', autoComplete: 'phone', name: 'homeNumber', size: 'small', 
                    id:"HomeNumber",
                    label:"Home Number",
                    variant: 'outlined',
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>
                  }}                  
                />*/}
                <MuiPhoneNumber 
                  defaultCountry={'gy'} 
                  onChange={handleHomeNumChange}
                  value={homeNumber}
                  variant= 'outlined'
                  size= 'small'
                  regions={['north-america', 'carribean', 'south-america']}
                  label="Home Number"
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                />
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <MuiPhoneNumber
                  id='CellNumber'
                  defaultCountry={'gy'} 
                  onChange={handleCellNumChange}
                  value={cellNumber}
                  variant= 'outlined'
                  size= 'small'
                  regions={['north-america', 'carribean', 'south-america']}
                  label="Cell Number"
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><PhoneAndroidIcon color="primary"/></InputAdornment>,}}
                />
              </Grid>
            </div>
            <div>   
              <Grid item xs={2}>
                <MuiPhoneNumber
                  id="WorkNumber" 
                  label="Work Number" 
                  variant="outlined" 
                  size="small" 
                  onChange={handleWorkNumChange}
                  value={workNumber}                  
                  regions={['north-america', 'carribean', 'south-america']}
                  label="Work Number"
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><CallIcon color="primary"/></InputAdornment>,}}
                />
              </Grid >
            </div>
            <div>
              <Grid item xs={2}>
                <TextField 
                  id="Email" 
                  label="Email" 
                  type="email" 
                  variant="outlined" 
                  size="small" 
                  InputProps={{
                    endAdornment:<InputAdornment position="end"><MailIcon color="primary"/></InputAdornment>,}}
                />
              </Grid >
            </div>    
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
