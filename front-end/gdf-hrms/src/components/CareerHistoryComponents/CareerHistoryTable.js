import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit';
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

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {Formik,Form,Field, ErrorMessage} from 'formik';
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
    minWidth: 700,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
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
  

  let data = props.data;
  //console.log(data);

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
    let i;
    setStartDate(row.startDate);
    setEndDate(row.endDate);

    
    departments.map((department) => {
      if( row.department == department.name){
       // console.log(row.department + ' vs ' + department.name + ' and ' + department.id)
        setNewDepartment(department.id);
      }
      console.log(newDepartment);
    }
    )

    positions.map((position) => {
      if( row.position == position.name){
       // console.log(row.department + ' vs ' + department.name + ' and ' + department.id)
        setNewPosition(position.id);
      }
     // console.log(newDepartment);
    }
    )

    //setNewPosition(row.position);
    //setNewDepartment(row.department);
    setRowId(row.id);
    setEId(row.eId);
    setOpen(true);
    console.log(row.position);
    console.log('newPosition ' + newPosition)
  }
  const initialValues = {
    newPosition: newPosition
    
}



  const handleClickOpen = () => {    
    setOpen(true);
    console.log(open);
  };
  
  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let careerHistory = {
      id: rowId,
      employeeId: parseInt(eId),
      positionId: newPosition,
      departmentId: newDepartment,
      startDate: startDate,
      endDate: endDate
    }
    if(careerHistory){

      const patchRequest = async() => {
      Axios.patch('UpdateInfo/update/employeeCH/' + eId, careerHistory)
     // .then(response => (data = data.concat(response.data)))
      .catch(error => console.log(error)) 
    }

    patchRequest();
  }
   // setEmpData([careerHistory, ...empData]);
   
    setOpen(false);    
  };
  const showResults = () => {
    if(data!= null) {
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
                            <Edit className={classes.icon} onClick={() => selectRow(row)}/>
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
    console.log("working");
    if(positions != null && departments != null) {
      if(positions.length > 0 && departments.length > 0){
        return(
          <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3}>
              <React.Fragment>
                 <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">

                    <DialogTitle id="form-dialog-title">Edit Career History Record</DialogTitle>

                    <DialogContent>
                    <Formik initialValues={initialValues} validationSchema={validationSchema}>
                        {(props)=>(
                           <Form>
                          <FormControl className={classes.formControl}>
                          <InputLabel shrink="true" id="position-label">Position</InputLabel>
                          <Select
                            labelId="position-label"
                            id="position"
                            value={newPosition}
                            onChange={handlePositionChange}
                            label="Position"
                            fullwidth
                            variant="outlined"
                            margin="normal"
                            error={props.errors.newPosition && props.touched.newPosition}
                            helperText={<ErrorMessage newPosition='newPosition' />} required
                          >
                            <MenuItem  value=""><em>Select</em></MenuItem>
                            {positions.map((position) =>
                              <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>)}  
                          </Select>
                        </FormControl>
                       <br/> 
                     
                      <FormControl className={classes.formControl}>
                      <InputLabel shrink="true" id="department-label">Department</InputLabel>
                      <Select
                            labelId="department-label"
                            id="department"
                            value={newDepartment}
                            onChange={handleDepartmentChange}
                            label="Department"
                            fullwidth
                            variant="outlined"
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
                          <TextField margin="normal" id="startDate"  type="date" fullWidth variant="outlined" value={moment(startDate).format('YYYY-MM-DD')} onChange={handleStartDateChange}/>
                        </FormControl>
                       <br/>
                        <FormControl className={classes.formControl}>
                          <InputLabel shrink="true" htmlFor="component-simple">End Date</InputLabel>
                          <TextField margin="normal" id="EndDate"  type="date" format="dd-MM-yyyy" fullWidth variant="outlined" value={moment(endDate).format('YYYY-MM-DD')} onChange={handleEndDateChange}/>
                        </FormControl> 
                        </Form>
                        )}
                     
                    </Formik>

                      
                    </DialogContent>
                  
                    <DialogActions>
                    <div>
                      <Button onClick={handleCancel} variant="contained" color="primary">Cancel</Button>
                    </div>
                    <div>
                      <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>Save Address</Button>
                    </div>
                    </DialogActions>
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
    </div>
  );
}
