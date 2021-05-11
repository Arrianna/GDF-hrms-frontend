import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button, Modal } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';

import PersonalInformationForm from './EmployeeProfileComponents/PersonalInformationForm';
import AddressForm from './EmployeeProfileComponents/AddressForm';
import ContactForm from './EmployeeProfileComponents/ContactForm';
import OfficialInformationForm from './EmployeeProfileComponents/OfficialInformationForm';
import Notification from './Notification';

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
  const [regions, setRegions] = useState();
  const [countries, setCountries] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [newAddress, setNewAddress] = useState({
    lot: '',
    street: '',
    area: '',
    village: '',
    region: '',
    country: '',
  })

  const [rowSelected, setRowSelected] = useState({
    id: '',
    lot:'',
    street: '',
    area: '',
    village: '',
    regionId: '',
    countryId: '',
    employeeId: '',
  })

  const initialValues = {
    lot: '',
    street: '',
    area: '',
    village: '',
    region: '',
    country: '',
  }

  const validationSchema = Yup.object().shape({
    lot: Yup.string()
    .required("Lot is Required"),
    street: Yup.string()
      .required("Street is Required"),
    area: Yup.string()
      .required("Area is Required"),
    village: Yup.string()
      .required("Village is Required"),
    region: Yup.number()
      .required("Region is Required"),
    country: Yup.number()
      .required("Country is Required"),
  });

  const onSubmitHandler = (values, action) => {
    console.log(values);
    action.resetForm();
  }

  const handleNewAddressChange = e => {
    const {name, value} = e.target;
    setNewAddress(prevState=>({
      ...prevState,
      [name]: value
    }))
  }

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

      if(response.status === 204){
        setNotify({
          isOpen: true,
          message: 'Address Successfully Deleted',
          type: 'success'
        })
      }
      else{
        setNotify({
          isOpen: true,
          message: 'An error occurred',
          type: 'error'
        })
      }
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
      if(response.status === 204){
        setNotify({
          isOpen: true,
          message: 'Address Successfully Saved',
          type: 'success'
        })
      }
      else{
        setNotify({
          isOpen: true,
          message: 'An error occurred',
          type: 'error'
        })
      }
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

  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  
  const handleSave = () => {
    let Address = {
      lot: newAddress.lot,
      street: newAddress.street,
      area: newAddress.area,
      village: newAddress.village,
      reg: parseInt(newAddress.region, 10),
      ctry: parseInt(newAddress.country, 10),
      eId: empId,
    }
    if(Address){
      Axios.post('PostInfo/AddAnEmployeeAddress', Address)
      .then(response => {
        setEmployeeAddress(employeeAddress.concat(response.data))

        if(response.status === 200){
          setNotify({
            isOpen: true,
            message: 'Address Successfully Saved',
            type: 'success'
          })
        }
        else{
          setNotify({
            isOpen: true,
            message: 'An error occurred',
            type: 'error'
          })
        }
      })
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
            {/* <TextField name="lot" className={classes.inputMaterial} label="Lot" onChange={handleChange} value={rowSelected && rowSelected.lot}/>
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
            </FormControl> */}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>
              {(props) => (
                <Form>
                  <div>
                    <Grid item xs={2}>
                      <Field as={TextField} 
                        required
                        name='lot' 
                        label='Lot' 
                        size="small"
                        variant='outlined'
                        fullWidth
                        error={props.errors.lot && props.touched.lot}
                        helperText={<ErrorMessage name='lot' />} 
                      />
                    </Grid>
                  </div>
                  <div>
                    <Grid item xs={2}>
                    <Field as={TextField} 
                        required
                        name='street' 
                        label='Street' 
                        size="small"
                        variant='outlined'
                        fullWidth
                        error={props.errors.street && props.touched.street}
                        helperText={<ErrorMessage name='street' />} 
                      />
                    </Grid>
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <Field as={TextField} 
                        required
                        name='area' 
                        label='Area' 
                        size="small"
                        variant='outlined'
                        fullWidth
                        error={props.errors.area && props.touched.area}
                        helperText={<ErrorMessage name='area' />} 
                      />
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <Field as={TextField} 
                        required
                        name='village' 
                        label='Village' 
                        size="small"
                        variant='outlined'
                        fullWidth
                        error={props.errors.village && props.touched.village}
                        helperText={<ErrorMessage name='village' />} 
                      />
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <Field as={TextField} 
                        select
                        name='region' 
                        label='Region' 
                        fullWidth
                        variant='outlined'
                        error={props.errors.region && props.touched.region}
                        helperText={<ErrorMessage name='region' />} 
                        required 
                      >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {regions.map((region) =>
                          <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                        )}
                      </Field>
                    </Grid >
                  </div>
                  <div>
                    <Grid item xs={2}>
                      <Field as={TextField} 
                        select
                        name='country' 
                        label='Country' 
                        fullWidth
                        variant='outlined'
                        error={props.errors.country && props.touched.country}
                        helperText={<ErrorMessage name='country' />} 
                        required 
                      >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {countries.map((country) =>
                          <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                        )}
                      </Field>
                    </Grid >
                  </div>
                </Form>
              )}
            </Formik>
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
                      <TextField margin="dense" id="lot" name="lot" label="Lot" type="text" variant="outlined" fullWidth value={newAddress.lot} onChange={handleNewAddressChange}/>
                      <TextField margin="dense" id="street" name="street" label="Street" type="text" variant="outlined" fullWidth value={newAddress.street} onChange={handleNewAddressChange}/>
                      <TextField margin="dense" id="area" name="area" label="Area" type="text" variant="outlined" fullWidth value={newAddress.area} onChange={handleNewAddressChange}/>
                      <TextField margin="dense" id="village" name="village" label="Village" type="text" variant="outlined" fullWidth value={newAddress.village} onChange={handleNewAddressChange}/>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink="true" id="region-label">Region</InputLabel>
                        <Select
                          labelId="region-label"
                          id="region"
                          name="region"
                          variant="outlined"
                          fullWidth
                          defaultValue= ''
                          value={newAddress.region}
                          onChange={handleNewAddressChange}
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
                          name="country"
                          variant="outlined"
                          fullWidth
                          defaultValue= ''
                          value={newAddress.country}
                          onChange={handleNewAddressChange}
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
      <Notification notify={notify} setNotify={setNotify}/>
    </div>
  );
}
