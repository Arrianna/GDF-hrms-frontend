import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AddEmployeePIForm from './AddEmployeeComponents/AddEmployeePIForm';
import AddEmployeeAddressForm from './AddEmployeeComponents/AddEmployeeAddressForm';
import AddEmployeeContactForm from './AddEmployeeComponents/AddEmployeeContactForm';
import AddEmployeeOfficialInfoForm from './AddEmployeeComponents/AddEmployeeOfficialInfoForm';

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
  
   careerButton: {
     marginLeft: '20px,'
   }

}));

export default function AddEmployeeInformation() {
  const classes = useStyles();  
  const [employeeInfo, setEmployeeInfo] = useState({});
  
  // AddEmployeePIForm INFORMATION
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [otherNameTwo, setOtherNameTwo] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [religion, setReligion] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleOtherNameChange = (event) => {
    setOtherName(event.target.value);
  };

  const handleOtherNameTwoChange = (event) => {
    setOtherNameTwo(event.target.value);
  };

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  const handleReligionChange = (event) => {
    setReligion(event.target.value);
  };

  const handleEthnicityChange = (event) => {
    setEthnicity(event.target.value);
  };

  // DON'T LAUGH TOO MUCH, YOU MIGHT POP A VEIN
  const handleSexChange = (event) => {
    setSex(event.target.value);
  }

  const handleDoBChange = (event) => {
    setDateOfBirth(event.target.value);
  }

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  }

  // AddEmployeeAddressForm Information  
  const [lot, setLot] = useState();
  const [street, setStreet] = useState();
  const [area, setArea] = useState();
  const [village, setVillage] = useState();
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');

  const handleLotChange = (event) => {
    setLot(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleVillageChange = (event) => {
    setVillage(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleCountryChange = (event) => {    
    setCountry(event.target.value);
  };

  // AddEmployeeContactForm Information
  const [homeNumber, setHomeNumber] = useState();
  const [cellNumber, setCellNumber] = useState();
  const [workNumber, setWorkNumber] = useState();
  const [email, setEmail] = useState();

  const handleHomeNumChange = (event) => {    
    setHomeNumber(event);
  }

  const handleCellNumChange = (event) => {    
    setCellNumber(event);
  }

  const handleWorkNumChange = (event) => {    
    setWorkNumber(event); 
  }

  const handleEmailChange = (event) => {
    setEmail(event);
  }

  // AddEmployeeOfficialInfoForm Information
  const [regimentNumber, setRegimentNumber] = useState();
  const [nationalIdNumber, setNationalIdNumber] = useState();
  const [passportNumber, setPassportNumber] = useState();
  const [passportExpirationDate, setPassportExpirationDate] = useState();
  const [tinNumber, setTinNumber] = useState();

  const handleRegNumChange = (event) => {    
    setRegimentNumber(event);
  }

  const handleNationalIdNumChange = (event) => {    
    setNationalIdNumber(event);
  }

  const handlePassportNumChange = (event) => {    
    setPassportNumber(event); 
  }

  const handlePassportExpDateChange = (event) => {
    setPassportExpirationDate(event);
  }

  const handleTinNumChange = (event) => {
    setTinNumber(event);
  }

 /* employeeInfo = {
      nationalityId: 0,
      religionId: 0,
      ethnicityId: 0,
      maritalStatusId: 0,
      positionId: 0,
      countryId: 0,
      regionId: 0,
      homeNumber: 0,
      cellNumber: 0,
      workNumber: 0,
      email: '',
      addressLot: '',
      addressStreet: '',
      addressArea: "",
      addressVillage: '',
      title: '',
      firstName: '',
      lastName: '',
      otherName: '',
      regimentNumber: 0,
      dateOfBirth: '',
      sex: '',
      nationalIdNumber: 0,
      passportNumber: '',
      passportExpirationDate: '',
      tinNumber: 0
  }
  */
  
  return (
    <div className={classes.root}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
         <h1>Add Employee Profile</h1>
        </Grid>
        <Grid item xs={6}>
          <h1>
            <Button variant="outlined" color="primary">
            <Link to={'/employee-history/'}>View Career History</Link>
            </Button>
          </h1>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <div>
            <Grid container spacing={3}>          
              <Grid item xs={12}>
                <AddEmployeePIForm 
                  firstName={firstName}
                  lastName={lastName}
                  otherName={otherName}
                  otherNameTwo={otherNameTwo}
                  maritalStatus={maritalStatus} 
                  religion={religion}
                  ethnicity={ethnicity}
                  sex={sex}
                  dateOfBirth={dateOfBirth}
                  nationality={nationality}
                  handleFirstNameChange={handleFirstNameChange}
                  handleLastNameChange={handleLastNameChange}
                  handleOtherNameChange={handleOtherNameChange}
                  handleOtherNameTwoChange={handleOtherNameTwoChange}
                  handleMaritalStatusChange={handleMaritalStatusChange}
                  handleReligionChange={handleReligionChange}
                  handleEthnicityChange={handleEthnicityChange}
                  handleSexChange={handleSexChange}
                  handleDoBChange={handleDoBChange}
                  handleNationalityChange={handleNationalityChange}></AddEmployeePIForm>
              </Grid>

              <Grid item xs={12}>
                <AddEmployeeAddressForm 
                  lot={lot}
                  street={street}
                  area={area}
                  village={village}
                  region={region}
                  country={country}
                  handleLotChange={handleLotChange}
                  handleStreetChange={handleStreetChange}
                  handleAreaChange={handleAreaChange}
                  handleVillageChange={handleVillageChange}
                  handleRegionChange={handleRegionChange}
                  handleCountryChange={handleCountryChange}></AddEmployeeAddressForm>
              </Grid>

              <Grid item xs={12}>
                <AddEmployeeContactForm 
                  homeNumber={homeNumber}
                  cellNumber={cellNumber}
                  workNumber={workNumber}
                  email={email}
                  handleHomeNumChange={handleHomeNumChange}
                  handleCellNumChange={handleCellNumChange}
                  handleWorkNumChange={handleWorkNumChange}
                  handleEmailChange={handleEmailChange}></AddEmployeeContactForm>
              </Grid >

              <Grid item xs={12}>
                <AddEmployeeOfficialInfoForm 
                  regimentNumber={regimentNumber}
                  nationalIdNumber={nationalIdNumber}
                  passportNumber={passportNumber}
                  passportExpirationDate={passportExpirationDate}
                  tinNumber={tinNumber}
                  handleRegNumChange={handleRegNumChange}
                  handleNationalIdNumChange={handleNationalIdNumChange}
                  handlePassportNumChange={handlePassportNumChange}
                  handlePassportExpDateChange={handlePassportExpDateChange}
                  handleTinNumChange={handleTinNumChange}></AddEmployeeOfficialInfoForm>
              </Grid >

              <Grid item xs={12}>
                <Button type="submit" variant="outlined" color="primary"> Add Employee </Button>
              </Grid >
            </Grid>           
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
