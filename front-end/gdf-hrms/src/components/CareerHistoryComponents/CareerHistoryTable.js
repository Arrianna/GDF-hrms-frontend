import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit';
import Axios from 'axios'; 
import { DialogTitle, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { MenuItem, Button, Grid, TextField }  from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Notification from './Notification';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup  from 'yup';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 1000,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
}));

export default function CareerHistoryTable(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [rowSelected, setRowSelected] = useState({
    id: '',
    position:'',
    department: '',
    startDate: '',
    endDate: '',
    eId: '',
  })

  let data = props.data;
  const setData = props.setEmpData;
  
  useEffect(() => {    
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

    getPosition();
    getDepartment();
  }, []);

  const initialValues = {
    position: rowSelected.positionId,
    department: rowSelected.departmentId,
    startDate: rowSelected.startDate,
    endDate: rowSelected.endDate,
  }

  const validationSchema = Yup.object().shape({
    position: Yup.string().required("Required"),
    department: Yup.string().required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().required("Required"),
  })

  const onSubmit = (values, props) => {
    let careerHistory = {
      id: rowSelected.id,
      employeeId: rowSelected.eId,
      positionId: values.newPosition,
      departmentId: values.newDepartment,
      startDate: values.startDate,
      endDate: values.endDate
    }
    
    const patchRequest = async() => {
      Axios.patch('UpdateInfo/update/employeeCH/' + careerHistory.id, careerHistory)
      .then(response => {
        let newData = data;
        newData.forEach(row => {
          if(rowSelected.id === row.id){
            row.id = careerHistory.id;
            row.eId = careerHistory.employeeId;
            row.position = careerHistory.positionId;
            row.department = careerHistory.departmentId;
            row.startDate = careerHistory.startDate;
            row.endDate = careerHistory.endDate;
          }
        })
        setData(newData);
        if(response.status === 204){
          setNotify({
            isOpen: true,
            message: 'Career History Successfully Saved',
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
    patchRequest();
    props.resetForm();
    setOpen(false);    
  };

  const selectRow = (row)=> {
    setRowSelected(row);
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const getPositionName = (rowPositionId) => {
    let positionName;
    positions.forEach((position) => {
      if(rowPositionId === position.id){
        positionName = position.name;
      }      
    })
    return positionName;
  }

  const getDepartmentName = (rowDepartmentId) => {
    let departmentName;
    departments.forEach((department) => {
      if(rowDepartmentId === department.id){
        departmentName = department.name;
      }      
    })
    return departmentName;
  }

  const showResults = () => {
    if(data != null) {
      if(data.length > 0) {  
        return (          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Position</StyledTableCell>
                  <StyledTableCell align="center">Department</StyledTableCell>
                  <StyledTableCell align="center">Start Date</StyledTableCell>
                  <StyledTableCell align="center">End Date</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => {
                  // console.log(row);
                  return(
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">{getPositionName(row.positionId)}</StyledTableCell>
                      <StyledTableCell align="center">{getDepartmentName(row.departmentId)}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.startDate).format('DD-MM-YYYY')}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.endDate).format('DD-MM-YYYY')}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button variant="text"><Edit color="primary" className={classes.icon} onClick={() => selectRow(row)}/></Button>
                      </StyledTableCell>   
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>         
        );
      }
    }
  }

  const showDialog = () => {
    if(positions != null && departments != null) {
      if(positions.length > 0 && departments.length > 0){
        return(
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item>
                <React.Fragment>
                  <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    <Formik
                      initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}
                      enableReinitialize validateOnChange={false} validateOnBlur={false}>
                      {(props)=>(
                        <Form>
                          <DialogTitle id="form-dialog-title">Edit Career History Record</DialogTitle>
                          <DialogContent>
                            <Field as={TextField}
                              className={classes.formControl}
                              select
                              name="position"
                              label="Position"
                              InputLabelProps={{shrink : true}}
                              fullwidth
                              margin="normal"
                              value={props.values.position || ''}
                              onChange={props.handleChange}
                              error={props.errors.position && props.touched.position}
                              helperText={<ErrorMessage name='position' />}
                            >
                              <MenuItem  value=""><em>Select</em></MenuItem>
                              {positions.map((position) =>
                                <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
                              )}                              
                            </Field>
                            <br/>                      
                            <Field as={TextField}
                              className={classes.formControl}
                              select
                              name="department"
                              label="Department"
                              InputLabelProps={{shrink : true}}
                              fullwidth
                              margin="normal"
                              value={props.values.department || ''}
                              onChange={props.handleChange}
                              error={props.errors.department && props.touched.department}
                              helperText={<ErrorMessage name='department' />}
                            >
                              <MenuItem value=""><em>Select</em></MenuItem>
                              {departments.map((department) =>
                                <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>  
                              )}
                            </Field> 
                            <br/>
                            <Field as={TextField}
                              className={classes.formControl}
                              margin="normal" 
                              name="startDate"
                              label="Start Date"
                              InputLabelProps={{shrink : true}}
                              type="date" 
                              fullWidth
                              value={moment(props.values.startDate).format('YYYY-MM-DD')}
                              onChange={props.handleChange}
                              error={props.errors.startDate && props.touched.startDate}
                              helperText={<ErrorMessage name='startDate' />}
                            />
                            <br/>
                            <Field as={TextField}
                              className={classes.formControl}
                              margin="normal" 
                              name="endDate"
                              label="End Date"
                              InputLabelProps={{shrink : true}} 
                              type="date"
                              fullWidth
                              value={moment(props.values.endDate).format('YYYY-MM-DD')}
                              onChange={props.handleChange}
                              error={props.errors.endDate && props.touched.endDate}
                              helperText={<ErrorMessage name='endDate' />}
                            />
                          </DialogContent>                  
                          <DialogActions>
                            <div>
                              <Button onClick={handleCancel} variant="contained" color="primary">Cancel</Button>
                            </div>
                            <div>
                              <Button type='submit' variant="contained" color="primary" startIcon={<SaveIcon />}>Save</Button>
                            </div>
                          </DialogActions>
                        </Form>
                      )}                     
                    </Formik>  
                  </Dialog>
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
      {showResults()}
      {showDialog()}
      <Notification notify={notify} setNotify={setNotify}/>
    </div>
  );
}

/*import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit';
import Axios from 'axios'; 
import { DialogTitle, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { MenuItem, InputLabel, FormControl, Select, Button, Grid, TextField }  from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Notification from './Notification';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup  from 'yup';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 1000,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
}));

export default function CareerHistoryTable(props) {
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [newPosition, setNewPosition] = useState();
  const [newDepartment, setNewDepartment] = useState();
  const [positions, setPositions] = useState();
  const [departments, setDepartments] = useState();
  const [rowId, setRowId] = useState();
  const [eId, setEId] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [rowSelected, setRowSelected] = useState({
    id: '',
    position:'',
    department: '',
    startDate: '',
    endDate: '',
    eId: '',
  })

  let data = props.data;

  useEffect(() => {    
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

    getPosition();
    getDepartment();
  }, []);

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

  const selectRow = (row)=> {
    setRowSelected(row);
    // setStartDate(row.startDate);
    // setEndDate(row.endDate);
    
    // departments.forEach((department) => {
    //   if( row.department === department.name){
    //     setNewDepartment(department.id);
    //   }
    // })

    // positions.forEach((position) => {
    //   if( row.position === position.name){
    //     setNewPosition(position.id);
    //   }
    // })

    // setRowId(row.id);
    // setEId(row.eId);
    setOpen(true);
  }

  const initialValues = {
    position: rowSelected.position,
    department: rowSelected.department,
    startDate: rowSelected.startDate,
    endDate: rowSelected.endDate,
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const getNotification = (option, notificationType) => {
    if(notificationType === 'success'){
      setNotify({
        isOpen: true,
        message: 'Career History Information Successfully Updated',
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

  const handleSave = (values, action) => {
    let careerHistory = {
      id: rowSelected.id,
      employeeId: rowSelected.eId,
      positionId: values.newPosition,
      departmentId: values.newDepartment,
      startDate: values.startDate,
      endDate: values.endDate
    }
    
    const patchRequest = async() => {
      Axios.patch('UpdateInfo/update/employeeCH/' + careerHistory.id, careerHistory)
      // .then(response => getNotification(response, 'success'))
      // .then(response => console.log(response))
      // .catch(error => getNotification(error, 'error'))
      .then(response => {
        let newData = data;
        newData.forEach(row => {
          if(rowId === row.id){
            row.id = careerHistory.id;
            row.eId = careerHistory.employeeId;
            row.position = careerHistory.positionId;
            row.department = careerHistory.departmentId;
            row.startDate = careerHistory.startDate;
            row.endDate = careerHistory.endDate;
          }
        })
        props.setEmpData(newData);
        if(response.status === 204){
          setNotify({
            isOpen: true,
            message: 'Career History Successfully Saved',
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
    patchRequest();
    // action.resetForm();
    setOpen(false);    
  };

  const showResults = () => {
    if(data != null) {
      if(data.length > 0) {  
        return (          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Position</StyledTableCell>
                  <StyledTableCell align="center">Department</StyledTableCell>
                  <StyledTableCell align="center">Start Date</StyledTableCell>
                  <StyledTableCell align="center">End Date</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row) => {            
                  return(
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">{row.position}</StyledTableCell>
                      <StyledTableCell align="center">{row.department}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.startDate).format('DD-MM-YYYY')}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.endDate).format('DD-MM-YYYY')}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button variant="text"><Edit color="primary" className={classes.icon} onClick={() => selectRow(row)}/></Button>
                      </StyledTableCell>   
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>         
        );
      }
    }
  }

  const showDialog = () => {
    const validationSchema = Yup.object().shape({
      newPosition: Yup.string().required("Required")
    })
    if(positions != null && departments != null) {
      if(positions.length > 0 && departments.length > 0){
        return(
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item>
                <React.Fragment>
                  <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
                      {(props)=>(
                        <Form>
                          <DialogTitle id="form-dialog-title">Edit Career History Record</DialogTitle>
                          <DialogContent>
                            <Field as={TextField}
                              className={classes.formControl}
                              name="position"
                              // value={rowSelected.position}
                              // onChange={handlePositionChange}
                              label="Position"
                              fullwidth
                              margin="normal"
                              error={props.errors.newPosition && props.touched.newPosition}
                              helperText={<ErrorMessage newPosition='newPosition' />} required
                            >
                              <MenuItem  value=""><em>Select</em></MenuItem>
                              {positions.map((position) =>
                                <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
                              )}                              
                            </Field>
                            <br/>                      
                            <FormControl className={classes.formControl}>
                              <InputLabel shrink="true" id="department-label">Department</InputLabel>
                              <Select
                                labelId="department-label"
                                name="department"
                                // value={newDepartment}
                                // onChange={handleDepartmentChange}
                                label="Department"
                                fullwidth
                                margin="normal"                                
                              >
                                <MenuItem value=""><em>Select</em></MenuItem>
                                {departments.map((department) =>
                                  <MenuItem key={department.id} value={department.id}>{department.name}</MenuItem>  
                                )}                         
                              </Select>
                            </FormControl> 
                            <br/>
                            <FormControl className={classes.formControl}>
                              <InputLabel shrink="true" htmlFor="component-simple">Start Date</InputLabel>
                              <TextField 
                                margin="normal" 
                                name="startDate"  
                                type="date" 
                                fullWidth  
                                // value={moment(startDate).format('YYYY-MM-DD')} 
                                // onChange={handleStartDateChange}
                              />
                            </FormControl>
                            <br/>
                            <FormControl className={classes.formControl}>
                              <InputLabel shrink="true" htmlFor="component-simple">End Date</InputLabel>
                              <TextField 
                                margin="normal" 
                                name="endDate"  
                                type="date" 
                                format="dd-MM-yyyy" 
                                fullWidth  
                                // value={moment(endDate).format('YYYY-MM-DD')} 
                                // onChange={handleEndDateChange}
                              />
                            </FormControl>                                              
                          </DialogContent>                  
                          <DialogActions>
                            <div>
                              <Button onClick={handleCancel} variant="contained" color="primary">Cancel</Button>
                            </div>
                            <div>
                              <Button type='submit' variant="contained" color="primary" startIcon={<SaveIcon />}>Save</Button>
                            </div>
                          </DialogActions>
                        </Form>
                      )}                     
                    </Formik>  
                  </Dialog>
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
      {showResults()}
      {showDialog()}
      <Notification notify={notify} setNotify={setNotify}/>
    </div>
  );
}
*/