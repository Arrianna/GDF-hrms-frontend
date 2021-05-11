import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router-dom';
import CareerHistoryTable from './CareerHistoryTable';
import Axios from 'axios'; 
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ErrorSharp, TouchAppRounded } from '@material-ui/icons';

import {Formik,Form,Field, ErrorMessage} from 'formik';
import { useFormik } from 'formik'
import * as Yup  from 'yup';
import {Paper} from "@material-ui/core";

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
  const [newPosition, setNewPosition] = useState();
  const [newDepartment, setNewDepartment] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [open, setOpen] = useState(false);
  const [positions, setPositions] = useState();
  const [departments, setDepartments] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  //Define object schema and its validation
  const initialValues = {
    newPosition:'',
    newDepartment: '',
    startDate:'',
    endDate:''
  }

  //Create validator object using Yup with expected schema and validation
  const validationSchema = Yup.object().shape({
    newPosition:Yup.string()
      .required("Employee Rank is Required"),
    newDepartment:Yup.string()
      .required("Department is Required"),
    startDate:Yup.date()
      .required("Required"),
    endDate: Yup.date()
      .min(Yup.ref('startDate'),"End date can't be before Start date")
    
  
  });

  
  let eId = params.empId;

  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handlePositionChange = (event) => {
    setNewPosition(event.target.value);
  }
 
  const handleDepartmentChange = (event) => {
    setNewDepartment(event.target.value);
  }

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  }

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  }

  const getNotification = (option, notificationType) => {
    if(notificationType === 'success'){
      setNotify({
        isOpen: true,
        message: 'Career History Information Successfully AddedS',
        type: 'success'
      })
  }
    if(notificationType == 'error'){
      setNotify({
        isOpen: true,
        message: 'An error was detected',
        type: 'error'
      })
    }
    }

  const handleSave = () => {
    let careerHistory = {
      eId: parseInt(eId),
      posId: newPosition,
      deptId: newDepartment,
      startDate: startDate,
      endDate: endDate
    }
    if(careerHistory){

      const postRequest = async() => {
        Axios.post('PostInfo/AddAnEmployeeCareerHistory', careerHistory)
        .then(response => getNotification(response, 'success'))
     //   .then(response => setEmpData(empData.concat(response.data)))
        .catch(error => getNotification(error, 'error'))
      }

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
         <h1>Career History for :   {employeeInfo.firstName} {employeeInfo.lastName} ({employeeInfo.regimentNumber})</h1>  
        </div>
      );
    }
  } 

  const showDialog = () => {
  
    console.log("working");
    
    if(positions != null && departments != null) {
      if(positions.length > 0 && departments.length > 0){
        return(
          <div className={classes.root}>
         
          <Grid container spacing={3}>
         
           
              <React.Fragment>
              
                 <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Add Career History Record</DialogTitle>
                   
                    <DialogContent>
                    <Formik initialValues={initialValues} validationSchema={validationSchema}>
                    {(props)=>(
                      <Form className={classes.form}>
                      <div>
                        <Field as = {TextField}
                        select
                        name='newPosition'
                        label= 'Rank'
                        fullWidth
                        //variant='outlined'
                        InputLabelProps={{ shrink: true,}}
                        error={props.errors.newPosition && props.touched.newPosition}
                        helperText={<ErrorMessage name='newPosition' />} 
                        required>
                          <MenuItem  value=""><em>Select</em></MenuItem>
                           {positions.map((position) =>
                             <MenuItem 
                                key={position.id} 
                                value={position.id}>{position.name}
                          </MenuItem>)}  

                        </Field>
                      </div>
                      <br/>
                      <div>
                        <Field as = {TextField}
                        select
                        name='newDepartment'
                        label='Department'
                        fullWidth
                     //  variant='outlined'
                        InputLabelProps={{ shrink: true,}}
                        error={props.errors.newDepartment && props.touched.newDepartment}
                      helperText={<ErrorMessage name='newDepartment' />} 
                      required >
                       <MenuItem value=""><em>Select</em></MenuItem>
                             {departments.map((department) =>
                             <MenuItem 
                                  key={department.id} 
                                  value={department.id}>
                                  {department.name}
                              </MenuItem> )}  
                         
                        </Field>
                      </div>

                      <br/>
                      <div>
                      <Field as ={TextField}
                        name='startDate' 
                        label='Start Date'
                    //    variant = 'outlined'
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
                     //   variant='outlined'
                        type='date' 
                        fullWidth 
                        InputLabelProps={{ shrink: true,}}
                        error={props.errors.endDate && props.touched.endDate}
                        helperText={<ErrorMessage name='endDate' />}  />
                      </div>
                      </Form>
                    )}
                    </Formik>
                    <DialogActions>
                    <div>
                      <Button onClick={handleCancel} variant="contained" color="primary">Cancel</Button>
                    </div>
                    <div>
                      <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>Save Career History</Button>
                    </div>
                    </DialogActions>
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
          <CareerHistoryTable data={empData}></CareerHistoryTable>  
          </Grid>

      </Grid>

      </div>
    
  );
}