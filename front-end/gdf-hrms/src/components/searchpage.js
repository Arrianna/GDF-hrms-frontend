import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from '@material-ui/core/Card';
import SearchByRegimentNumberForm from './SearchPageComponents/SearchByRegimentNumberForm';
import SearchByOtherCriteriaForm from './SearchPageComponents/SearchByOtherCriteriaForm';
import MatPaginationTable from './SearchPageComponents/SearchResultsTable';
//import Api from './Api';
import Axios from 'axios'; // remember to npm install Axios

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

  const [searchResults, setsearchResults] = useState([]);

 
  const getDataByRegNum = data => {
  Axios.get("http://localhost:5000/api/EmployeeInfo/regnumber/" + data.regNum).then((response) => {
      console.log(response);
      let resultArray = [];
      console.log(response.data);
      resultArray.push(response.data);
       setsearchResults(resultArray); 
  });  
}
const getDataByFname = data => {
  Axios.get("http://localhost:5000/api/EmployeeInfo/fname/" + data.fName).then((response) => {
      console.log(response);
      let resultArray = [];
      console.log(response.data);
      resultArray.push(response.data);
       setsearchResults(resultArray);
  });
}

/*
const getDataByLname = data => {
  Axios.get("http://localhost:5000/api/EmployeeInfo/lname/" + data.lName).then((response) => {
      console.log(response);
      let resultArray = [];
      console.log(response.data);
      resultArray.push(response.data);
       setsearchResults(resultArray);
  })
}
*/


  return (
<div>
    <div className={classes.root}>
      <Card>
        <CardContent className={classes.cardcontents}>
          <Typography variant='h5' align='center' gutterBottom >Search by Regiment Number</Typography>        
          <SearchByRegimentNumberForm onSubmit={data => getDataByRegNum(data)}> </SearchByRegimentNumberForm>
        </CardContent>
      
        <CardContent className={classes.cardcontents}>
          <Typography variant='h5' align='center' gutterBottom>Search by Other Criteria</Typography>
          <SearchByOtherCriteriaForm onSubmit={data => getDataByFname(data)}> </SearchByOtherCriteriaForm>
        </CardContent>
      </Card>      
    </div>
    <MatPaginationTable tableData={searchResults}></MatPaginationTable>
</div>
  );
}