import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  const [regions, setRegions] = useState("");
  const [countries, setCountries] = useState("");

  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleClose = () => {
    setEmployeeAddress({
      lot: lot,
      street: street,
      area: area,
      village: village,
      region: regions,
      country: countries,
    });
    setOpen(false);
    Axios.post('PostInfo/AddAnEmployeeAddress', employeeAddress)
      .then(response => console.log(response))
      .catch(error => console.log(error))
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
      if(regNumber){
        const addressInfo = await Axios.get("EmployeeInfo/GetEmployeeAddressByTheirId?employeeId=1");
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
  }, [regNumber]);

  empId = employeeInfo.id;
  console.log(regions);
  console.log(countries);
  
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Employee Address</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>Add Employee Address</DialogContentText> */}
                <TextField margin="dense" id="lot" label="Lot" type="text" fullWidth/>
                <TextField margin="dense" id="street" label="Street" type="text" fullWidth/>
                <TextField margin="dense" id="area" label="Area" type="text" fullWidth/>
                <TextField margin="dense" id="village" label="Village" type="text" fullWidth/>
                {/* <TextField margin="dense" id="region" label="Region" type="text" fullWidth/> */}
                <FormControl className={classes.formControl}>
                  <InputLabel id="region-label">Region</InputLabel>
                  <Select
                    labelId="region-label"
                    id="region"
                    value={props.region}
                    onChange={props.handleRegionChange}
                    label="Region"
                  >
                    <MenuItem value=""><em>Select</em></MenuItem>
                    {/* {regions.map((region) =>
                      <MenuItem value={region.id}>{region.name}</MenuItem>
                    )} */}
                    {/* <MenuItem value={1}>1 (Barima-Waini)</MenuItem>
                    <MenuItem value={2}>2 (Pomeroon-Supenaam)</MenuItem>
                    <MenuItem value={3}>3 (Essequibo Islands-West Demerara)</MenuItem>
                    <MenuItem value={4}>4 (Demerara-Mahaica)</MenuItem>
                    <MenuItem value={5}>5 (Mahaica-Berbice)</MenuItem>
                    <MenuItem value={6}>6 (East Berbice-Corentyne)</MenuItem>
                    <MenuItem value={7}>7 (Cuyuni-Mazaruni)</MenuItem>
                    <MenuItem value={8}>8 (Potaro-Siparuni)</MenuItem>
                    <MenuItem value={9}>9 (Upper Takutu-Upper Essequibo)</MenuItem>
                    <MenuItem value={10}>10 (Upper Demerara-Upper Berbice)</MenuItem> */}
                  </Select>
                </FormControl>
                {/* <TextField margin="dense" id="country" label="Country" type="text" fullWidth/> */}
                <FormControl className={classes.formControl}>
                  <InputLabel id="region-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    value={props.country}
                    onChange={props.handleCountryChange}
                    label="Country"
                  >
                    <MenuItem value=""><em>Select</em></MenuItem>
                    {/* {countries.map((country) =>
                      <MenuItem value={country.id}>{country.name}</MenuItem>
                    )} */}
                    {/* <MenuItem value={1}>Guyana</MenuItem>
                    <MenuItem value={2}>Suriname</MenuItem>
                    <MenuItem value={3}>Brazil</MenuItem>
                    <MenuItem value={4}>Venezuela</MenuItem>
                    <MenuItem value={5}>Trinidad</MenuItem>
                    <MenuItem value={6}>Barbados</MenuItem> */}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleClose} color="primary">Add Address</Button>
              </DialogActions>
            </Dialog>
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
