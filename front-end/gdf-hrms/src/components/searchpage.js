import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Axios from 'axios';

import SearchByRegimentNumberForm from './SearchPageComponents/SearchByRegimentNumberForm';
import SearchByOtherCriteriaForm from './SearchPageComponents/SearchByOtherCriteriaForm';
import MatPaginationTable from './SearchPageComponents/SearchResultsTable';

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

  const getDataByRegNum = data => {
    Axios.get("GetInfo/RegimentNumber/" + data.regimentalNumber).then((response) => {        
      let resultArray = [];        
      if(response.data !== ""){
        resultArray.push(response.data);
      }
      setSearchResults(resultArray);
    });
  }
  
  const getDataByOtherCriteria = data => {
    let employeePosition = parseInt(data.employeePosition)
    Axios.get("GetInfo/OtherCriteria/" + data.employeeFname + '/'+ data.employeeLname + '/' + employeePosition).then((response) => {
      let resultArray = [];
      if(response.data !== ""){
        resultArray.push(response.data);
      }
      setSearchResults(resultArray);
    });
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
          <div>
            <p>No results found!</p>
          </div>
        );
      }
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <Card>
          <CardContent className={classes.cardcontents}>
            <SearchByRegimentNumberForm onSubmit={data => getDataByRegNum(data)}> </SearchByRegimentNumberForm>
          </CardContent>

          <CardContent className={classes.cardcontents}>
            <SearchByOtherCriteriaForm onSubmit={data => getDataByOtherCriteria(data)}> </SearchByOtherCriteriaForm>
          </CardContent>
        </Card>
      </div>
      {showTable()}
    </div>
  );
}
