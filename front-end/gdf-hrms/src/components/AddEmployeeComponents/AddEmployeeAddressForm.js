import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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
  const params = useParams();

  const [lot, setLot] = useState();
  const [street, setStreet] = useState();
  const [area, setArea] = useState();
  const [village, setVillage] = useState();
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState();

  let id = params.empId;
  
  const handleLotChange = (event) => {    
    setLot(event.target.value);
  }

  const handleStreetChange = (event) => {    
    setStreet(event.target.value);
  }

  const handleAreaChange = (event) => {    
    setArea(event.target.value);
  }

  const handleVillageChange = (event) => {    
    setVillage(event.target.value);
  }

  const handleRegionChange = (event) => {    
    setRegion(event.target.value);
  }

  const handleCountryChange = (event) => {    
    setCountry(event.target.value);
  }

  const postAddressHandler = () => {
    setEmployeeAddress({
      lot: lot,
      street: street,
      area: area,
      village: village,
      reg: region,
      ctry: country,
      eId: parseInt(id, 10),
    });
    axios.post('PostInfo/AddAnEmployeeAddress', employeeAddress)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <h4>Address </h4>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid item xs={2}>
                <TextField name="addressLot" label="Lot" value={lot} onChange={handleLotChange} variant="outlined" size="small" />
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <TextField name="addressStreet" label="Street" value={street} onChange={handleStreetChange} variant="outlined" size="small" />
              </Grid>
            </div>
            <div>
              <Grid item xs={2}>
                <TextField id="Area/Section" label="Area/Section" value={area} onChange={handleAreaChange} variant="outlined" size="small" />
              </Grid >
            </div>
            <div>
              <Grid item xs={2}>
                <TextField name="addressVillage" label="Village" value={village} onChange={handleVillageChange} variant="outlined" size="small" />
              </Grid >
            </div>
            <div>
              <Grid item xs={2}>
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <InputLabel id="region-label">Region</InputLabel>
                  <Select
                    labelId="region-label"
                    id="region"
                    value={region}
                    onChange={handleRegionChange}
                    label="Region"
                  >
                    <MenuItem value=""><em>Select</em></MenuItem>
                    <MenuItem value={1}>1 (Barima-Waini)</MenuItem>
                    <MenuItem value={2}>2 (Pomeroon-Supenaam)</MenuItem>
                    <MenuItem value={3}>3 (Essequibo Islands-West Demerara)</MenuItem>
                    <MenuItem value={4}>4 (Demerara-Mahaica)</MenuItem>
                    <MenuItem value={5}>5 (Mahaica-Berbice)</MenuItem>
                    <MenuItem value={6}>6 (East Berbice-Corentyne)</MenuItem>
                    <MenuItem value={7}>7 (Cuyuni-Mazaruni)</MenuItem>
                    <MenuItem value={8}>8 (Potaro-Siparuni)</MenuItem>
                    <MenuItem value={9}>9 (Upper Takutu-Upper Essequibo)</MenuItem>
                    <MenuItem value={10}>10 (Upper Demerara-Upper Berbice)</MenuItem>              
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
                    value={country}
                    onChange={handleCountryChange}
                    label="Country"
                  >
                    <MenuItem value=""><em>Select</em></MenuItem>
                    <MenuItem value={1}>Guyana</MenuItem>
                    <MenuItem value={2}>Suriname</MenuItem>
                    <MenuItem value={3}>Brazil</MenuItem>
                    <MenuItem value={4}>Venezuela</MenuItem>
                    <MenuItem value={5}>Trinidad</MenuItem>
                    <MenuItem value={6}>Barbados</MenuItem>                    
                  </Select>
                </FormControl>
              </Grid >
            </div>
          </React.Fragment>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" onClick={postAddressHandler} variant="outlined" color="primary"> Add Address </Button>
        </Grid >
      </Grid>
    </div>
  );
}