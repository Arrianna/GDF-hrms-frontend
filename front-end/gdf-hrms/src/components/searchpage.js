import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from '@material-ui/core/Card';
import SearchByRegimentNumberForm from './SearchPageComponents/SearchByRegimentNumberForm';
import SearchByOtherCriteriaForm from './SearchPageComponents/SearchByOtherCriteriaForm';
import MatPaginationTable from './SearchPageComponents/SearchResultsTable';
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
  
  const [searchResults, setsearchResults] = useState(null);

  const getDataByRegNum = data => {
    Axios.get("http://localhost:5000/api/EmployeeInfo/regnumber/" + data.regNum).then((response) => {
        console.log(response);
        let resultArray = [];
        console.log(response.data);
        if(response.data !== ""){
          resultArray.push(response.data);
        }
        setsearchResults(resultArray);
    });
  }
  const getDataByOtherCriteria = data => {
    Axios.get("http://localhost:5000/api/EmployeeInfo/OtherCriteria/" + data.fName + '%2'+ data.lName +'%2'+ data.position +'?employeeFname='+ data.fName + '&employeeLname=' + data.lName + '&employeePosition=' + data.position).then((response) => {
        console.log(response);
        setsearchResults(response.data);
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
            <Typography variant='h5' align='center' gutterBottom >Search by Regiment Number</Typography>
            <SearchByRegimentNumberForm onSubmit={data => getDataByRegNum(data)}> </SearchByRegimentNumberForm>
          </CardContent>

          <CardContent className={classes.cardcontents}>
            <Typography variant='h5' align='center' gutterBottom>Search by Other Criteria</Typography>
            <SearchByOtherCriteriaForm onSubmit={data => getDataByOtherCriteria(data)}> </SearchByOtherCriteriaForm>
          </CardContent>
        </Card>
      </div>
      {showTable()}
    </div>
  );
}
