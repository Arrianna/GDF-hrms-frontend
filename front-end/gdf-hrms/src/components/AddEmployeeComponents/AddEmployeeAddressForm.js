import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
    }, 
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },

  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AddEmployeeAddressForm(props) {  
  const classes = useStyles();
  const [regions, setRegions] = useState();
  const [countries, setCountries] = useState();

  useEffect(() => {
    const getRegions = async () => {
      const info = await Axios.get("GetInfo/GetAllRegions");
      if(info.data != null){
        if(info.data.length > 0){
          setRegions(info.data);
        }
      }
    };

    const getCountries = async () => {
      const info = await Axios.get("GetInfo/GetAllCountries");
      if(info.data != null){
        if(info.data.length > 0){
          setCountries(info.data);
        }
      }
    };

    getRegions();
    getCountries();
  }, [])
 
  const showInfo = () => {
    if(regions != null && countries != null){
      if(regions.length > 0 && countries.length > 0){
        return (
          <div className={classes.root}>
            <Grid container spacing={1}>
              <h4>Address </h4>
              <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                  <div>
                    <Grid item xs={2}>
                      <TextField name="lot" label="Lot" value={props.employeeInfo && props.employeeInfo.lot} onChange={props.handleChange} variant="outlined" size="small" />
                    </Grid>
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField name="street" label="Street" value={props.employeeInfo && props.employeeInfo.street} onChange={props.handleChange} variant="outlined" size="small" />
                    </Grid>
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField name="area" label="Area/Section" value={props.employeeInfo && props.employeeInfo.area} onChange={props.handleChange} variant="outlined" size="small" />
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField name="village" label="Village" value={props.employeeInfo && props.employeeInfo.village} onChange={props.handleChange} variant="outlined" size="small" />
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <FormControl variant="outlined" size="small" className={classes.formControl}>
                        <InputLabel id="region-label">Region</InputLabel>
                        <Select
                          labelId="region-label"
                          id="region"
                          name="region"
                          value={props.employeeInfo && props.employeeInfo.region}
                          onChange={props.handleChange}
                          label="Region"
                        >
                          <MenuItem value=""><em>Select</em></MenuItem>
                          {regions.map((region) =>
                            <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <FormControl variant="outlined" size="small" className={classes.formControl}>
                        <InputLabel id="region-label">Country</InputLabel>
                        <Select
                          labelId="country-label"
                          id="country"
                          name="country"
                          value={props.employeeInfo && props.employeeInfo.country}
                          onChange={props.handleChange}
                          label="Country"
                        >
                          <MenuItem value=""><em>Select</em></MenuItem>
                          {countries.map((country) =>
                            <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid >
                  </div>
                </React.Fragment>
              </Grid>
            </Grid>
          </div>
        )
      }
    }
  }
  return (
    <div>
      {showInfo()}
    </div>
  );
}