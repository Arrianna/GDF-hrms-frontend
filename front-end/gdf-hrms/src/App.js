//import { useState, useEffect } from 'react';
import ResponsiveDrawer from './components/Layout';
import React from "react";
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './components/searchpage';
import EmployeeProfileLayout from './components/EmployeeProfileLayout';
import ViewCareerHistory from './components/CareerHistoryComponents/ViewCareerHistory';
import CareerHistoryLayout from './components/CareerHistoryLayout';
import AddEmployeeInformation from './components/AddEmployeeInformation';
import AddEmployeeAddressForm from './components/AddEmployeeComponents/AddEmployeeAddressForm';
import HomePage from './components/Home';
import UpdateEmployeeInformation from './components/UpdateEmployeeInformation';

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveDrawer>
          <Route path="/" exact component={HomePage}/>
          {/*<Route path="/" exact render={(props) => (<><EmployeeProfileLayout employeePIs={employeePI}/></>)}/>*/}
          <Route path="/add-employee" exact component={AddEmployeeInformation} />
          <Route path="/employee-profile" exact component={EmployeeProfileLayout} />          
          <Route path="/employee-history" exact component={CareerHistoryLayout} />          
          <Route path="/search-page" exact component={SearchPage} />
          <Route path="/employee-profile/:regNum" exact component={EmployeeProfileLayout} />
          <Route path="/employee-history-view/:empId" exact component={ViewCareerHistory} />
          <Route path="/add-address/:empId" exact component={AddEmployeeAddressForm} />
          <Route path="/update-employee/:empId" exact component={UpdateEmployeeInformation} />
      </ResponsiveDrawer>
      </BrowserRouter>
    </div>
  );
}

export default App;
