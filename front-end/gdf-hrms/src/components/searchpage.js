import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from '@material-ui/core/Card';
import SearchByRegimentNumberForm from './SearchPageComponents/SearchByRegimentNumberForm';
import SearchByOtherCriteriaForm from './SearchPageComponents/SearchByOtherCriteriaForm';
import MatPaginationTable from './SearchPageComponents/SearchResultsTable';
import Api from './Api';
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

  const getData = data => {
  Axios.get("https://localhost:5001/api/EmployeeInfo/regnumber/" + data.regNum).then((response) => {
      console.log(response);
   //   return response.data;
      //response.data.title + "..." + response.data.fname;
      // which ever field you need it will be response.data.fieldName
      let resultArray = [];
    //  let result = Api.getEmployeeByRegNumber(data.regNum);
      console.log(response.data);
      resultArray.push(response.data);
       setsearchResults(resultArray);
  });
  
}



  return (
<div>
    <div className={classes.root}>
      <Card>
        <CardContent className={classes.cardcontents}>
          <Typography variant='h5' align='center' gutterBottom >Search by Regiment Number</Typography>        
          <SearchByRegimentNumberForm onSubmit={data => getData(data)}> </SearchByRegimentNumberForm>
        </CardContent>
      
        <CardContent className={classes.cardcontents}>
          <Typography variant='h5' align='center' gutterBottom>Search by Other Criteria</Typography>
          <SearchByOtherCriteriaForm> </SearchByOtherCriteriaForm>
        </CardContent>
      </Card>      
    </div>
    <MatPaginationTable tableData={searchResults}></MatPaginationTable>
</div>
  );
}