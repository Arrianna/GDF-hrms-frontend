import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Modal } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';
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
   },

   modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },

  icon:{
    cursor: 'pointer'
  }, 

  inputMaterial:{
    width: '100%'
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

  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [rowSelected, setRowSelected] = useState({
    id: null,
    lot:'',
    street: '',
    area: '',
    village: '',
    regionId: null,
    countryId: null,
    employeeId: null,
  })

  const handleChange = e => {
    const {name, value} = e.target;
    setRowSelected(prevState=>({
      ...prevState,
      [name]: value
    }))
  }

  const deleteRequest = async() => {
    await Axios.delete('DeleteInfo/DeleteAddress/' + rowSelected.id)
    .then(response=>{
      setEmployeeAddress(employeeAddress.filter(row => row.id !== rowSelected.id));
      openCloseModalDelete();
    })
  }

  const putRequest = async() => {
    let editedAddress = {
      id: rowSelected.id,
      lot: rowSelected.lot,
      street: rowSelected.street,
      area: rowSelected.area,
      village: rowSelected.village,
      regionId: rowSelected.regionId,
      countryId: rowSelected.countryId,
      employeeId: rowSelected.eId,
    }
    await Axios.patch('UpdateInfo/update/employeePI/address/' + editedAddress.id, editedAddress)
    .then(response=>{
      let newData = employeeAddress;
      newData.map(row => {        
        if(rowSelected.id === row.id){
          row.id = editedAddress.id;
          row.lot = editedAddress.lot;
          row.street = editedAddress.street;
          row.area = editedAddress.area;
          row.village = editedAddress.village;
          row.regionId = editedAddress.regionId;
          row.countryId = editedAddress.countryId;
          row.employeeId = editedAddress.employeeId;
        }
      })
      setEmployeeAddress(newData);
      openCloseModalEdit();
    })
  }
 
  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  }

  const selectRow = (row, option) => {
    setRowSelected(row);
    (option === 'Edit') ? openCloseModalEdit() : openCloseModalDelete()
  }
  
  const bodyDelete = (
    <div className={classes.modal}>
      <p>Are you sure you want to delete this address?</p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteRequest()}>Yes</Button>
        <Button onClick={() => openCloseModalDelete()}>No</Button>
      </div>
    </div>
  )

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
      Axios.post('PostInfo/AddAnEmployeeAddress', Address)
      .then(response => console.log(response))
      /* .then(response => {
        setEmployeeAddress(employeeAddress.concat(response.data))
      }) */
      .catch(error => console.log(error))
    }
    setEmployeeAddress([Address, ...employeeAddress]);
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

  const bodyEdit = () => {
    if(regions != null && countries != null){
      if(regions.length > 0 && countries.length > 0){
        return(
          <div className={classes.modal}>
            <h3>Edit Employee Address</h3>
            <TextField name="lot" className={classes.inputMaterial} label="Lot" onChange={handleChange} value={rowSelected && rowSelected.lot}/>
            <br />
            <TextField name="street" className={classes.inputMaterial} label="Street" onChange={handleChange} value={rowSelected && rowSelected.street}/>
            <br />
            <TextField name="area" className={classes.inputMaterial} label="Area" onChange={handleChange} value={rowSelected && rowSelected.area}/>
            <br />
            <TextField name="village" className={classes.inputMaterial} label="Village" onChange={handleChange} value={rowSelected && rowSelected.village}/>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="region-label">Region</InputLabel>
              <Select
                labelId="region-label"
                id="region"
                name="regionId"
                value={rowSelected && rowSelected.regionId}
                onChange={handleChange}
                label="Region"
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                {regions.map((region) =>
                  <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                )}
              </Select>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="region-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                name="countryId"
                value={rowSelected && rowSelected.countryId}
                onChange={handleChange}
                label="Country"
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                {countries.map((country) =>
                  <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                )}                          
              </Select>
            </FormControl>
            <br /><br />
            <div align="right">
              <Button color="primary" onClick={()=>putRequest()}>Save</Button>
              <Button onClick={() => openCloseModalEdit()}>Cancel</Button>
            </div>
          </div>
        );
      }
    }
  }

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
                  <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Employee Address</DialogTitle>
                    <DialogContent>
                      <TextField margin="dense" id="lot" label="Lot" type="text" fullWidth value={lot} onChange={handleLotChange}/>
                      <TextField margin="dense" id="street" label="Street" type="text" fullWidth value={street} onChange={handleStreetChange}/>
                      <TextField margin="dense" id="area" label="Area" type="text" fullWidth value={area} onChange={handleAreaChange}/>
                      <TextField margin="dense" id="village" label="Village" type="text" fullWidth value={village} onChange={handleVillageChange}/>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink="true" id="region-label">Region</InputLabel>
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
                      <br />
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink="true" id="region-label">Country</InputLabel>
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
                      <Button onClick={handleCancel} variant="contained" color="primary" startIcon={<Cancel />}>Cancel</Button>
                      <Button onClick={handleSave} variant="contained" color="primary" startIcon={<Save />}>Save Address</Button>
                    </DialogActions>
                  </Dialog>
                  <Button variant="outlined" color="primary">
                    <Link to={'/update-employee/' + empId}>Update Employee Record</Link>
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
                      <AddressForm 
                        employeeInfo={employeeAddress}
                        selectRow={selectRow}>
                      </AddressForm>
                    </Grid>
                    <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                      Add Address
                    </Button>
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
      <Modal open={modalDelete} onClose={openCloseModalDelete}>
        {bodyDelete}
      </Modal>

      <Modal open={modalEdit} onClose={openCloseModalEdit}>
        {bodyEdit()}        
      </Modal>
    </div>
  );
}
