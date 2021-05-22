import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, MenuItem } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Axios from 'axios'; 
import { DialogTitle, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import {Formik,Form,Field, ErrorMessage} from 'formik';
import * as Yup  from 'yup';

import Notification from './Notification';
import CareerHistoryTable from './CareerHistoryTable';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(5),    
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  form: {
    minWidth: 400,
  },  
}));

export default function ViewCareerHistory(props) {
  const classes = useStyles();
  const params = useParams();  
  const [empData, setEmpData] = useState();
  const [employeeInfo, setEmployeeInfo] = useState();
  const [open, setOpen] = useState(false);
  const [positions, setPositions] = useState();
  const [departments, setDepartments] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  let eId = params.empId;
  
  // INITIAL FORM VALUES FOR FORMIK
  const initialValues = {
    newPosition:'',
    newDepartment: '',
    startDate:'',
    endDate:''
  }

  // YUP VALIDATION SCHEMA
  const validationSchema = Yup.object().shape({
    newPosition:Yup.string()
      .required("Employee Rank is Required"),
    newDepartment:Yup.string()
      .required("Department is Required"),
    startDate:Yup.date()
      .max(new Date(), "Are you a time traveler?!")
      .required("Required"),
    endDate: Yup.date()
      .min(Yup.ref('startDate'),"End date can't be before Start date")
    
  
  });  

  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const getNotification = (option, notificationType) => {
    if(notificationType === 'success'){
      setNotify({
        isOpen: true,
        message: 'Career History Information Successfully Added',
        type: 'success'
      })
    }

    if(notificationType === 'error'){
      setNotify({
        isOpen: true,
        message: 'An error was detected',
        type: 'error'
      })
    }
  }

  const handleSave = (values, props) => {
    let careerHistory = {
      eId: parseInt(eId),
      posId: values.newPosition,
      deptId: values.newDepartment,
      startDate: values.startDate,
      endDate: values.endDate
    }

    if(careerHistory){
      const postRequest = async() => {
        await Axios.post('PostInfo/AddAnEmployeeCareerHistory', careerHistory)
        .then(response => {
          Axios.get("EmployeeInfo/GetEmployeeCareerHistoryByTheirId?employeeId=" + eId)
          .then(response => {
            setEmpData(response.data)
          })
          getNotification(response, 'success')})
        .catch(error => getNotification(error, 'error'))
      };
      
      postRequest();
    }
    setOpen(false);    
  };

  useEffect(() => {    
    const getEmpCH = async () => {
      if(eId){
        const info = await Axios.get("EmployeeInfo/GetEmployeeCareerHistoryByTheirId?employeeId=" + eId);
        setEmpData(info.data);
      }
    };

    const getEmpInfo = async () => {
      if(eId){
        const info = await Axios.get("EmployeeInfo/Id/" + eId);
        setEmployeeInfo(info.data);
      }
    };  

    const getPosition = async () => {
      const info = await Axios.get("GetInfo/GetAllPositions");
      if(info.data != null){
        if(info.data.length > 0){
          setPositions(info.data);
        }
      }
    };
   
    const getDepartment = async () => {
      const info = await Axios.get("GetInfo/GetAllDepartments");
      if(info.data != null){
        if(info.data.length > 0){
          setDepartments(info.data);
        }
      }
    };

    getEmpCH();
    getEmpInfo();
    getPosition();
    getDepartment();
  }, [eId]);
 
  const showInfo = () => {
    if(employeeInfo != null) {
      return(
        <div>
          <h1>Career History for : {employeeInfo.firstName} {employeeInfo.lastName} ({employeeInfo.regimentNumber})</h1>  
        </div>
      );
    }
  } 

  const showDialog = () => {
    if(positions != null && departments != null) {
      if(positions.length > 0 && departments.length > 0){
        return(
          <div className={classes.root}>         
            <Grid container spacing={3}>           
              <React.Fragment>              
                <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Add Career History Record</DialogTitle>                   
                  <DialogContent>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
                      {(props)=>(
                        <Form className={classes.form}>
                          <div>
                            <Field as = {TextField}
                              select
                              name='newPosition'
                              label= 'Rank'
                              fullWidth
                              // InputLabelProps={{ shrink: true,}}
                              error={props.errors.newPosition && props.touched.newPosition}
                              helperText={<ErrorMessage name='newPosition' />} 
                              required
                            >
                              <MenuItem  value=""><em>Select</em></MenuItem>
                              {positions.map((position) =>
                                <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>)}
                            </Field>
                          </div>
                          <br/>
                          <div>
                            <Field as = {TextField}
                              select
                              name='newDepartment'
                              label='Department'
                              fullWidth
                              // InputLabelProps={{ shrink: true,}}
                              error={props.errors.newDepartment && props.touched.newDepartment}
                              helperText={<ErrorMessage name='newDepartment' />} 
                              required
                            >
                              <MenuItem value=""><em>Select</em></MenuItem>
                                {departments.map((department) =>
                                  <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem> )}                         
                            </Field>
                          </div>
                          <br/>
                          <div>
                            <Field as ={TextField}
                              name='startDate' 
                              label='Start Date'
                              type='date' 
                              fullWidth 
                              InputLabelProps={{ shrink: true,}}
                              error={props.errors.startDate && props.touched.startDate}
                              helperText={<ErrorMessage name='startDate' />} required
                            />
                          </div>
                          <br/>
                          <div>
                            <Field as={TextField} 
                              name='endDate' 
                              label='End Date'
                              type='date' 
                              fullWidth 
                              InputLabelProps={{ shrink: true,}}
                              error={props.errors.endDate && props.touched.endDate}
                              helperText={<ErrorMessage name='endDate' />}
                            />
                          </div>
                          <DialogActions>
                            <div>
                              <Button onClick={handleCancel} variant="contained" color="primary">Cancel</Button>
                            </div>
                            <div>
                              <Button type ="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>Save Career History</Button>
                            </div>
                          </DialogActions>                   
                        </Form>
                      )}
                    </Formik>
                  </DialogContent>
                </Dialog>
              </React.Fragment>               
            </Grid>
          </div>  
        )}  
      }
    }  

  return (
    <div className={classes.root}>
      <Grid container xs={12} justify="center" alignItems="center" direction="column" spacing={3}>
        <Grid item>
          {showInfo()}
        </Grid>          
        <Grid item>
          <Grid container spacing={1} direction="column">
            <Button variant="contained" color="primary" size="medium" onClick={handleClickOpen}>
              Add Career History Record
            </Button>
          </Grid>
        </Grid>
        <Grid>
          {showDialog()}
        </Grid>
        <Grid item>
          <CareerHistoryTable data={empData} setEmpData={setEmpData}></CareerHistoryTable>  
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify}/>
    </div>    
  );
}