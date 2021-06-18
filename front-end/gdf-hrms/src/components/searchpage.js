import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CircularProgress } from "@material-ui/core";
import Axios from 'axios';

import SearchByRegimentNumberForm from './SearchPageComponents/SearchByRegimentNumberForm';
import SearchByOtherCriteriaForm from './SearchPageComponents/SearchByOtherCriteriaForm';
import MatPaginationTable from './SearchPageComponents/SearchResultsTable';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: '50px',
  },

  cardcontents: {
    flex: 1,
    float: 'left',
    margin: theme.spacing(5),
  }
}));

export default function SearchPage() {
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState(null);
  const [positions, setPositions] = useState();

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.ui.isLoading);

  useEffect(() => {
    const getPositions = async () => {
      const info = await Axios.get("GetInfo/GetAllPositions");
      if(info.data != null){
        if(info.data.length > 0){
          setPositions(info.data);
          dispatch(uiActions.toggle());
        }
      }      
    };

    // if(positions != null) {
    //   if(positions.length > 0){
    //     dispatch(uiActions.toggle());
    //   }
    // }
    
    getPositions();
  }, []);

  const getDataByRegNum = data => {
    Axios.get("GetInfo/RegimentNumber/" + data.regimentalNumber)
    .then((response) => {        
      let resultArray = [];        
      if(response.data !== ""){
        resultArray.push(response.data);
      }
      setSearchResults(resultArray);
    })
    .catch((error) => {
      if (error.response) {
        console.log('Error.response.data', error.response.data);
        console.log('Error.response.status', error.response.status);
        console.log('Error.response.headers', error.response.headers);
        if(error.response.data.title === 'Not Found'){
          alert(JSON.stringify('No employee found matching that regimental number'), null, 2)
        }
      } else if (error.request) {
        console.log('Error.resquest', error.request);
      } else {
        console.log('Error.message', error.message);
      }
    })
  }
  
  const getDataByOtherCriteria = data => {
    let employeePosition = parseInt(data.employeePosition)
    Axios.get("GetInfo/OtherCriteria/" + data.employeeFname + '/'+ data.employeeLname + '/' + employeePosition)
    .then((response) => {
      let resultArray = [];
      if(response.data !== ""){
        resultArray.push(response.data);
      }
      setSearchResults(resultArray);
    })
    .catch((error) => {
      if (error.response) {
        console.log('Error.response.data', error.response.data);
        console.log('Error.response.status', error.response.status);
        console.log('Error.response.headers', error.response.headers);
        if(error.response.data.title === 'Not Found'){
          alert(JSON.stringify('No employee found matching the search paramters'), null, 2)
        }
      } else if (error.request) {
        console.log('Error.resquest', error.request);
      } else {
        console.log('Error.message', error.message);
      }
    })
  }

  const showTable = () => {
    if(searchResults != null){
      if (searchResults.length > 0){
        return (
          <MatPaginationTable tableData={searchResults}></MatPaginationTable>
        );
      }
      else{
        return(
          <div style={{alignItems:'center', justifyContent:'center'}}>
            <p>No results found!</p>
          </div>
        );
      }
    }
  }

  return (
    <div>
      <div className={classes.root}>
        { !isLoading ?
          <Card>
            <CardContent className={classes.cardcontents}>
              <SearchByRegimentNumberForm onSubmit={data => getDataByRegNum(data)}> </SearchByRegimentNumberForm>
            </CardContent>
            <CardContent className={classes.cardcontents}>
              <SearchByOtherCriteriaForm onSubmit={data => getDataByOtherCriteria(data)} positions={positions}> </SearchByOtherCriteriaForm>
            </CardContent>
          </Card>
        : <CircularProgress size={65} style={{ marginTop: "120px" }} /> }
      </div>
      {showTable()}
    </div>
  );
}
