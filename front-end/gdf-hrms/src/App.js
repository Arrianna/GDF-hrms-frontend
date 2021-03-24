//import { useState, useEffect } from 'react';
import ResponsiveDrawer from './components/Layout';
import React from "react";
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './components/searchpage';
import EmployeeProfileLayout from './components/EmployeeProfileLayout';
import CareerHistoryLayout from './components/CareerHistoryLayout';
import AddEmployeeInformation from './components/AddEmployeeInformation';

const App = () => {
  {/*const [employeesPI, setEmployeesPI] = useState([]);
  const [employeePI, setEmployeePI] = useState([]);
  
  //effect for all employee
  useEffect(() => {
    const getEmployeesPI = async () => {
      const employeesPIFromServer = await fetchEmployeesPI();
      setEmployeesPI(employeesPIFromServer);
    }
    getEmployeesPI()
  }, [])

  //effect for an employee
  useEffect(() => {
    const getEmployeePI = async () => {
      const employeePIFromServer = await fetchEmployeePI(304050); //Change this to Regiment Number of any employee in the DB
      setEmployeePI(employeePIFromServer);
    }
    getEmployeePI()
  }, []);

  // Fetch all employee profiles
  const fetchEmployeesPI = async () => {
    const res = await fetch('https://localhost:5001/api/EmployeeInfo')
    const data = await res.json()
    return data;
  }

  // Fetch an employee profile
  const fetchEmployeePI = async (id) => {
    const res = await fetch(`https://localhost:5001/api/EmployeeInfo/regnumber/${id}`)
    const data = await res.json()
    return data;
  }*/}

  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveDrawer>
          <Route path="/" exact component={EmployeeProfileLayout}/>
          {/*<Route path="/" exact render={(props) => (<><EmployeeProfileLayout employeePIs={employeePI}/></>)}/>*/}
          <Route path="/add-employee" exact component={AddEmployeeInformation} />
          <Route path="/employee-profile" exact component={EmployeeProfileLayout} />          
          <Route path="/employee-history" exact component={CareerHistoryLayout} />          
          <Route path="/search-page" exact component={SearchPage} />
          <Route path="/employee-profile/:regNum" exact component={EmployeeProfileLayout} />
          <Route path="/employee-history/:regNum" exact component={CareerHistoryLayout} /> 
      </ResponsiveDrawer>
      </BrowserRouter>
    </div>
  );
}

export default App;
