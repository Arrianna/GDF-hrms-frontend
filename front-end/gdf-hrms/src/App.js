import { useState, useEffect } from 'react';
import ResponsiveDrawer from './components/Layout';
//import Api from './components/Api';
import React from "react";
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './components/searchpage';
import EmployeeProfileLayout from './components/EmployeeProfileLayout';
import CareerHistoryLayout from './components/CareerHistoryLayout';

const App = () => {
  const [employeesPI, setEmployeesPI] = useState([]);
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
      const employeePIFromServer = await fetchEmployeePI(203040); //Change this to Regiment Number of any employee in the DB
      setEmployeePI(employeePIFromServer);
    }
    getEmployeePI()
  }, []);

  // Fetch all employee profiles
  const fetchEmployeesPI = async () => {
    const res = await fetch(
      'https://localhost:44353/api/EmployeeInfo')
    const data = await res.json()
    return data;
  }

  // Fetch an employee profile
  const fetchEmployeePI = async (id) => {
    const res = await fetch(
      `https://localhost:44353/api/EmployeeInfo/regnumber/${id}`)
    const data = await res.json()
    return data;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveDrawer>
          {/* <Route path="/" exact component={EmployeeProfileLayout} /> */}
          <Route
            path="/"
            exact
            render={(props) => (
             <>
              <EmployeeProfileLayout employeePIs={employeePI}/>
             </> 
            )}
          />
          <Route path="/employeehistory" exact component={CareerHistoryLayout} />
          <Route path="/search-page" exact component={SearchPage} />
          <Route path="/employee-profile/:info" exact component={EmployeeProfileLayout} />
          {/* <EmployeeProfileLayout></EmployeeProfileLayout> */}
          {/* <CareerHistoryLayout></CareerHistoryLayout> */}
      </ResponsiveDrawer>
      </BrowserRouter>
    </div>
  );
}

export default App;
