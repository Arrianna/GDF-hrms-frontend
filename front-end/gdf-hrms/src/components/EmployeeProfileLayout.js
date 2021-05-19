import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Paper, Typography, Button, Modal } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
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

   textField: {
     margin: 5,
     width: 290,
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
  const paperStyle = { padding: '40px 20px', width: 350, margin: '20px auto' }
  const params = useParams();
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [employeeAddress, setEmployeeAddress] = useState();  
  const [open, setOpen] = useState(false);
  const [regions, setRegions] = useState();
  const [countries, setCountries] = useState();
  const [rowRegions, setRowRegions] = useState();
  const [rowCountries, setRowCountries] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
 
  // STATE VARIABLE FOR SELECTED ROW OF ADDRESS
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

  // INITIAL VALUES FOR FORMIK VALIDATION
  const initialValues = {
    lot: '',
    street: '',
    area: '',
    village: '',
    region: '',
    country: '',
  }

  // INITIAL VALUES FOR EDITING AN ADDRESS
  const initialEditValues = {
    lot: rowSelected.lot,
    street: rowSelected.street,
    area: rowSelected.area,
    village: rowSelected.village,
    region: rowSelected.regionId,
    country: rowSelected.countryId
  }
   console.log(rowSelected);
  // SCHEME FOR VALIDATING ADDRESS FIELDS
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

  // SUBMIT FUNCTION FOR ADDING AN EMPLOYEE ADDRESS
  const onSubmit = (values, action) => {
    let Address = {
      lot: values.lot,
      street: values.street,
      area: values.area,
      village: values.village,
      reg: values.region,
      ctry: values.country,
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
    action.resetForm();
  }
  
  // AXIOS DELETE REQUEST FOR DELETING AN ADDRESS
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

  // FUNCTION FOR UPDATING AN EMPLOYEE ADDRESS
  const putRequest = (values, action) => {
    let editedAddress = {
      id: rowSelected.id,
      lot: values.lot,
      street: values.street,
      area: values.area,
      village: values.village,
      regionId: values.region,
      countryId: values.country,
      employeeId: rowSelected.employeeId,
    }
    // console.log(editedAddress);

    Axios.patch('UpdateInfo/update/employeePI/address/' + editedAddress.id, editedAddress)
    .then(response=>{
      let newData = employeeAddress;
      newData.forEach(row => {        
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
    action.resetForm();
  }
 
  // FUNCTION FOR OPENING & CLOSING THE DELETE MODAL
  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  // FUNCTION FOR OPENING & CLOSING THE EDIT MODAL
  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  }

  // FUNCTION FOR SELECTING EDIT OR DELETE MODAL
  const selectRow = (row, option) => {
    setRowSelected(row);
    // (option === 'Edit') ? openCloseModalEdit() : openCloseModalDelete()
    if(option === 'Edit'){
      const getRegions = async () => {
        const info = await Axios.get("GetInfo/GetAllRegions");
        if(info.data != null){
          if(info.data.length > 0){
            setRowRegions(info.data);
          }
        }
      };
  
      const getCountries = async () => {
        const info = await Axios.get("GetInfo/GetAllCountries");
        if(info.data != null){
          if(info.data.length > 0){
            setRowCountries(info.data);
          }
        }
      };

      getRegions();
      getCountries();

      if(rowRegions != null && rowCountries != null){
        if(rowRegions.length > 0 && rowCountries.length > 0){
          let regionId;
          let countryId;

          rowRegions.forEach((region) => {
            if( row.region === region.name){
              regionId = parseInt(region.id);
            }
          });

          rowCountries.forEach((country) => {
            if( row.country === country.name){
              countryId = parseInt(country.id);
            }
          });

          let selectedAddress = {
            id: row.id,
            lot: row.lot,
            street: row.street,
            area: row.area,
            village: row.village,
            regionId: regionId,
            countryId: countryId,
            employeeId: row.eId,
          }
          // console.log(selectedAddress);
          if(selectedAddress){
            setRowSelected(selectedAddress);
          }
        }
      }
      openCloseModalEdit()
    }
    else if(option === 'Delete'){
      openCloseModalDelete()
    }
  }
  // console.log(rowSelected);
  // DELETE CONFIRMATION MODAL
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
  
  // THE EDIT ADDRESS MODAL
  const bodyEdit = () => {    
    if(regions != null && countries != null){
      if(regions.length > 0 && countries.length > 0){
        return(          
          <Grid>
            <Paper elevation={5} style={paperStyle}>
              <Grid align='center'>
                <Typography variant='h6'>Edit Address</Typography>
              </Grid>
              <br />
              <Formik 
                initialValues={initialEditValues} 
                validationSchema={validationSchema} 
                onSubmit={putRequest}
                enableReinitialize
                validateOnChange={false}
                validateOnBlur={false}
              >
                {(props) => (
                  <Form>
                    <div>
                      <Grid item xs={2}>
                        <Field as={TextField} 
                          required 
                          name='lot' 
                          label='Lot' 
                          size="small"
                          //variant='outlined'
                          fullWidth
                          className = {classes.textField}
                          value={props.values.lot}
                          onChange={props.handleChange}
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
                          //variant='outlined'
                          fullWidth
                          className = {classes.textField}
                          value={props.values.street}
                          onChange={props.handleChange}
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
                          //variant='outlined'
                          fullWidth
                          className = {classes.textField}
                          value={props.values.area}
                          onChange={props.handleChange}
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
                          //variant='outlined'
                          fullWidth
                          className = {classes.textField}
                          value={props.values.village}
                          onChange={props.handleChange}
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
                          size="small"
                          fullWidth
                          className = {classes.textField}
                          //variant='outlined'
                          value={props.values.region || ''}
                          onChange={props.handleChange}
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
                          size="small"
                          fullWidth
                          className = {classes.textField}
                          //variant='outlined'
                          value={props.values.country || ''}
                          onChange={props.handleChange}
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
                    <div align="right">
                      {/* <Button color="primary" onClick={()=>putRequest()}>Save</Button> */}
                      <Button color="primary" type='submit'>Save</Button>
                      <Button onClick={() => openCloseModalEdit()}>Cancel</Button>
                    </div>
                  </Form>
                )}
              </Formik>
              {/* </div> */}
            </Paper>
          </Grid>
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
                  {/* DIALOG FOR ADDING AN EMPLOYEE ADDRESS */}
                  <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                      {(props) => (
                        <Form>
                          <DialogTitle id="form-dialog-title">Add Address</DialogTitle>
                          <DialogContent>                      
                            <Field as={TextField} 
                              name='lot' 
                              label='Lot'
                              size='small'
                              margin='dense'
                              fullWidth
                              error={props.errors.lot && props.touched.lot}
                              helperText={<ErrorMessage name='lot' />} 
                              required 
                            />
                            <br />
                            <Field as={TextField} 
                              name='street' 
                              label='Street'
                              size='small'
                              margin='dense'
                              fullWidth
                              error={props.errors.street && props.touched.street}
                              helperText={<ErrorMessage name='street' />} 
                              required 
                            />
                            <br />
                            <Field as={TextField} 
                              name='area' 
                              label='Area'
                              size='small'
                              margin='dense'
                              fullWidth
                              error={props.errors.area && props.touched.area}
                              helperText={<ErrorMessage name='area' />} 
                              required 
                            />
                            <br />
                            <Field as={TextField} 
                              name='village' 
                              label='Village'
                              size='small'
                              margin='dense'
                              fullWidth
                              error={props.errors.village && props.touched.village}
                              helperText={<ErrorMessage name='village' />} 
                              required 
                            />
                            <br />
                            <Field as={TextField} 
                              select
                              name='region' 
                              label='Region'
                              size='small'
                              margin='dense'
                              fullWidth
                              error={props.errors.region && props.touched.region}
                              helperText={<ErrorMessage name='region' />} 
                              required 
                            >
                              <MenuItem value=""><em>Select</em></MenuItem>
                              {regions.map((region) =>
                                <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
                              )}
                            </Field>
                            <br />
                            <Field as={TextField} 
                              select
                              name='country' 
                              label='Country'
                              size='small'
                              margin='dense'
                              fullWidth
                              error={props.errors.country && props.touched.country}
                              helperText={<ErrorMessage name='country' />} 
                              required 
                            >
                              <MenuItem value=""><em>Select</em></MenuItem>
                              {countries.map((country) =>
                                <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                              )}
                            </Field>                      
                          </DialogContent>
                          <DialogActions>                                                    
                            <Button type="submit" color="primary" startIcon={<Save />}>Save</Button>
                            <Button onClick={handleCancel} startIcon={<Cancel />}>Cancel</Button>
                          </DialogActions>
                        </Form>
                      )}
                    </Formik>
                  </Dialog>
                  <Button variant="outlined">
                    <Link to={'/update-employee/' + empId} underline='none'>Update Record</Link>
                  </Button>
                  <Button variant="outlined">
                    <Link to={'/employee-history-view/' + empId} underline='none'>Career History</Link>
                  </Button>                  
                </h1>
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <div>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <PersonalInformationForm employeeInfo={employeeInfo}></PersonalInformationForm>
                    </Grid>
                    <Grid item xs={12}>
                      <ContactForm employeeInfo={employeeInfo}></ContactForm>
                    </Grid >
                    <Grid item xs={12}>
                      <AddressForm employeeInfo={employeeAddress} selectRow={selectRow}></AddressForm>
                      <Button variant="contained" color="primary" onClick={handleClickOpen}  style={{margin: '10px'}}>
                        Add Address
                      </Button>
                    </Grid>
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
