import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import CareerHistoryTable from './CareerHistoryTable';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
    }, 
  },
  
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ViewCareerHistory(props) {
  const classes = useStyles();
  const params = useParams();  
  const [empData, setEmpData] = useState();
  
  let eId = params.empId;
  console.log(eId);
  useEffect(() => {    
    const getEmpCH = async () => {
      if(eId){
        const info = await Axios.get("EmployeeInfo/GetEmployeeCareerHistoryByTheirId?employeeId=" + eId);
        setEmpData(info.data);
      }
    };
    getEmpCH();
  }, [eId]);
  console.log(empData);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <h2>Career History</h2>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <React.Fragment>
            <div>
              <Grid container spacing={3}>                
                <Grid item xs={12}>
                   <CareerHistoryTable data={empData}></CareerHistoryTable> 
                </Grid>
              </Grid>    
            </div>    
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}