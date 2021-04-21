import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from 'axios';

import PersonalInformationForm from './EmployeeProfileComponents/PersonalInformationForm';
import AddressForm from './EmployeeProfileComponents/AddressForm';
import ContactForm from './EmployeeProfileComponents/ContactForm';
import OfficialInformationForm from './EmployeeProfileComponents/OfficialInformationForm';

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
  
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
   careerButton: {
     marginLeft: '20px,'
   }

}));

export default function EmployeeProfileLayout(props) {
  const classes = useStyles();
  const params = useParams();
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [employeeAddress, setEmployeeAddress] = useState();  
  const [open, setOpen] = useState(false);
  const [lot, setLot] = useState();
  const [street, setStreet] = useState();
  const [area, setArea] = useState();
  const [village, setVillage] = useState();
  const [newRegion, setNewRegion] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [regions, setRegions] = useState();
  const [countries, setCountries] = useState();

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
    setNewRegion(event.target.value);
  }

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value);
  }

  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let Address = {
      lot: lot,
      street: street,
      area: area,
      village: village,
      reg: newRegion,
      ctry: newCountry,
      eId: empId,
    }
    if(Address){
      console.log(Address);
      /* Axios.post('PostInfo/AddAnEmployeeAddress', newAddress)
      .then(response => console.log(response))
      .catch(error => console.log(error)) */
    }
    setOpen(false);    
  };
  
  let regNumber = params.regNum;
  let empId;

  useEffect(() => {
    const getEmpInfo = async () => {
      if(regNumber){
        const info = await Axios.get("GetInfo/RegimentNumber/" + regNumber);    
        setEmployeeInfo(info.data);        
      }
    };

    const getEmpAddress = async () => {
      if(employeeInfo.id){
        const addressInfo = await Axios.get("EmployeeInfo/GetEmployeeAddressByTheirId?employeeId=" + employeeInfo.id);
        setEmployeeAddress(addressInfo.data);
      }
    };

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

    getEmpInfo();
    getEmpAddress();
    getRegions();
    getCountries();
  }, [regNumber, employeeInfo.id]);

  empId = employeeInfo.id;
  
  const showInfo = () => {
    if(regions != null && countries != null){
      if(regions.length > 0 && countries.length > 0){
        return (
          <div className={classes.root}>
            <Grid container spacing={1} >
              <Grid item xs={6}>
              <h1>Employee Profile Page</h1>
              </Grid>
              <Grid item xs={6}>
                <h1>
                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add Employee Address
                    {/* <Link to={'/add-address/' + empId}>Add Employee Address</Link> */}
                  </Button>
                  <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Employee Address</DialogTitle>
                    <DialogContent>
                      {/* <DialogContentText>Add Employee Address</DialogContentText> */}
                      <TextField margin="dense" id="lot" label="Lot" type="text" fullWidth value={lot} onChange={handleLotChange}/>
                      <TextField margin="dense" id="street" label="Street" type="text" fullWidth value={street} onChange={handleStreetChange}/>
                      <TextField margin="dense" id="area" label="Area" type="text" fullWidth value={area} onChange={handleAreaChange}/>
                      <TextField margin="dense" id="village" label="Village" type="text" fullWidth value={village} onChange={handleVillageChange}/>
                      {/* <TextField margin="dense" id="region" label="Region" type="text" fullWidth/> */}
                      <FormControl className={classes.formControl}>
                        <InputLabel id="region-label">Region</InputLabel>
                        <Select
                          labelId="region-label"
                          id="region"
                          value={newRegion}
                          onChange={handleRegionChange}
                          label="Region"
                        >
                          <MenuItem value=""><em>Select</em></MenuItem>
                          {regions.map((region) =>
                            <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      {/* <TextField margin="dense" id="country" label="Country" type="text" fullWidth/> */}
                      <FormControl className={classes.formControl}>
                        <InputLabel id="region-label">Country</InputLabel>
                        <Select
                          labelId="country-label"
                          id="country"
                          value={newCountry}
                          onChange={handleCountryChange}
                          label="Country"
                        >
                          <MenuItem value=""><em>Select</em></MenuItem>
                          {countries.map((country) =>
                            <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                          )}                          
                        </Select>
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancel} variant="contained" color="primary">Cancel</Button>
                      <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>Save Address</Button>
                    </DialogActions>
                  </Dialog>
                  <Button variant="outlined" color="primary">
                    <Link to={'/employee-history/' + regNumber}>Update Employee Record</Link>
                  </Button>
                  <Button variant="outlined" color="primary">
                    <Link to={'/employee-history-view/' + empId}>View Career History</Link>
                  </Button>
                </h1>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <div>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <PersonalInformationForm employeeInfo={employeeInfo}></PersonalInformationForm>
                    </Grid>
                    <Grid item xs={12}>
                      <AddressForm employeeInfo={employeeAddress}></AddressForm>
                    </Grid>
                    <Grid item xs={12}>
                      <ContactForm employeeInfo={employeeInfo}></ContactForm>
                    </Grid >
                    <Grid item xs={12}>
                      <OfficialInformationForm employeeInfo={employeeInfo}></OfficialInformationForm>
                    </Grid >
                  </Grid>           
                </div> 
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  }
  return(
    <div>
      {showInfo()}
    </div>
  );
}
