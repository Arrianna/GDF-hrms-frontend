import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
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
              <h3>Address </h3>
              <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                  <div>
                    <Grid item xs={2}>
                      <TextField 
                        required
                        name="lot" 
                        label="Lot" 
                        value={props.formik.values.lot} 
                        onChange={props.formik.handleChange}
                        variant="outlined" 
                        size="small" 
                        error={Boolean(props.formik.errors.lot && props.formik.touched.lot)}
                        helperText={props.formik.errors.lot && props.formik.touched.lot && String(props.formik.errors.lot)}
                      />                      
                    </Grid>
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField 
                        required
                        name="street" 
                        label="Street" 
                        value={props.formik.values.street} 
                        onChange={props.formik.handleChange}
                        variant="outlined" 
                        size="small" 
                        error={Boolean(props.formik.errors.street && props.formik.touched.street)}
                        helperText={props.formik.errors.street && props.formik.touched.street && String(props.formik.errors.street)}
                      />                      
                    </Grid>
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField 
                        required
                        name="area" 
                        label="Area/Section" 
                        value={props.formik.values.area} 
                        onChange={props.formik.handleChange}
                        variant="outlined" 
                        size="small" 
                        error={Boolean(props.formik.errors.area && props.formik.touched.area)}
                        helperText={props.formik.errors.area && props.formik.touched.area && String(props.formik.errors.area)}
                      />                      
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField 
                        required
                        name="village" 
                        label="Village" 
                        value={props.formik.values.village} 
                        onChange={props.formik.handleChange}
                        variant="outlined" 
                        size="small" 
                        error={Boolean(props.formik.errors.village && props.formik.touched.village)}
                        helperText={props.formik.errors.village && props.formik.touched.village && String(props.formik.errors.village)}
                      />                      
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <TextField
                        required
                        select
                        name="region"
                        variant="outlined"
                        size="small"
                        value={props.formik.values.region} 
                        onChange={props.formik.handleChange}
                        label="Region"
                        error={Boolean(props.formik.errors.region && props.formik.touched.region)}
                        helperText={props.formik.errors.region && props.formik.touched.region && String(props.formik.errors.region)}
                      >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {regions.map((region) =>
                          <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                        )}
                      </TextField>                      
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>                      
                      <TextField
                        required
                        select
                        name="country"
                        variant="outlined"
                        size="small"
                        value={props.formik.values.country} 
                        onChange={props.formik.handleChange}
                        label="Country"
                        error={Boolean(props.formik.errors.country && props.formik.touched.country)}
                        helperText={props.formik.errors.country && props.formik.touched.country && String(props.formik.errors.country)}
                      >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {countries.map((country) =>
                          <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                        )}
                      </TextField>                      
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