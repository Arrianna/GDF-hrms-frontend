import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import axios from './UpdateEmployeeComponents/axios';
import Notification from './Notification';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import UpdateEmployeePIForm from './UpdateEmployeeComponents/UpdateEmployeePIForm';
//import UpdateEmployeeAddressForm from './UpdateEmployeeComponents/UpdateEmployeeAddressForm';
import UpdateEmployeeContactForm from './UpdateEmployeeComponents/UpdateEmployeeContactForm';
import UpdateEmployeeOfficialInfoForm from './UpdateEmployeeComponents/UpdateEmployeeOfficialInfoForm';

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

export default function UpdateEmployeeInformation() {
  const classes = useStyles();  
  const [empInfoGet, setEmpInfoGet] = useState({});
 // const [error, setError] = useState();
 // const [employeeAddress, setEmployeeAddress] = useState({});
  const params = useParams();
  const eId = params.empId;
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  
  // AddEmployeePIForm INFORMATION
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [otherName, setOtherName] = useState(null);
  const [otherNameTwo, setOtherNameTwo] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [nationality, setNationality] = useState("");

  // AddEmployeeContactForm Information
  const [homeNumber, setHomeNumber] = useState(null);
  const [cellNumber, setCellNumber] = useState(null);
  const [workNumber, setWorkNumber] = useState(null);
  const [email, setEmail] = useState(null);

    // AddEmployeeOfficialInfoForm Information
  const [regimentNumber, setRegimentNumber] = useState(null);
  const [nationalIdNumber, setNationalIdNumber] = useState(null);
  const [passportNumber, setPassportNumber] = useState(null);
  const [passportExpirationDate, setPassportExpirationDate] = useState(null);
  const [tinNumber, setTinNumber] = useState(null);
  const [nationalities, setNationalities] = useState();
  const [religions, setReligions] = useState();
  const [maritalStatuses, setMaritalStatuses] = useState();
  const [ethnicities, setEthnicities] = useState();


  useEffect(() => {   
   const getEmpInfo = async () => {
        if(eId){
          const info = await Axios.get("EmployeeInfo/Id/" + eId);
          setEmpInfoGet(info.data);
        }
   /* const getEmpAddress = async () => {
      if(regNumber){
        const addressInfo = await Axios.get("EmployeeInfo/GetEmployeeAddressByTheirId?employeeId=1");
        setEmployeeAddress(addressInfo.data);
      } */
    };
    
    const getEthnicities = async () => {
      const info = await Axios.get("GetInfo/GetAllEthnicities");
      if(info.data != null){
        if(info.data.length > 0){
          setEthnicities(info.data);
        }
      }
    };
    const getReligions = async () => {
      const info = await Axios.get("GetInfo/GetAllReligions");
      if(info.data != null){
        if(info.data.length > 0){
          setReligions(info.data);
        }
      }
    };
    const getMaritalStatuses = async () => {
      const info = await Axios.get("GetInfo/GetAllMaritalStaus");
      if(info.data != null){
        if(info.data.length > 0){
          setMaritalStatuses(info.data);
        }
      }
    };
    const getNationalities = async () => {
      const info = await Axios.get("GetInfo/GetAllNationalities");
      if(info.data != null){
        if(info.data.length > 0){
          setNationalities(info.data);
        }
      }
    };

    getEthnicities();
    getReligions();
    getMaritalStatuses();
    getNationalities();  
    getEmpInfo();

    console.log(empInfoGet);

    setFirstName(empInfoGet.firstName);
    setLastName(empInfoGet.lastName);
    setOtherName(empInfoGet.otherName);
    //setOtherNameTwo(empInfoGet.otherNameTwo);

    if(nationalities != null && religions != null && ethnicities != null && maritalStatuses != null) {
      if(nationalities.length > 0 && religions.length > 0 && ethnicities.length > 0 && maritalStatuses.length > 0){

         maritalStatuses.map((localMaritalStatus) => {
           if( empInfoGet.maritalStatus == localMaritalStatus.name){
             setMaritalStatus(parseInt(localMaritalStatus.id));
             //props.maritalStatus = localMaritalStatus;
             }
           });

         religions.map((localReligion) => {
            if( empInfoGet.religion == localReligion.name){
              setReligion(parseInt(localReligion.id));
               }
           });

         nationalities.map((localNationality) => {
          if( empInfoGet.nationality == localNationality.name){
             setNationality(parseInt(localNationality.id));
            }
          });

         ethnicities.map((localEthnicity) => {
          if( empInfoGet.ethnicity == localEthnicity.name){
            setEthnicity(parseInt(localEthnicity.id));
            }
          });

        }
      }

    setSex(empInfoGet.sex);
    setDateOfBirth(empInfoGet.dateOfBirth);
    // setNationality(empInfoGet.nationality);
    setHomeNumber(empInfoGet.homeNumber);
    setCellNumber(empInfoGet.cellNumber);
    setWorkNumber(empInfoGet.workNumber);
    setEmail(empInfoGet.email);
    setRegimentNumber(empInfoGet.regimentNumber);
    setNationalIdNumber(empInfoGet.nationalIdNumber);
    setPassportNumber(empInfoGet.passportNumber);
    setPassportExpirationDate(empInfoGet.passportExpirationDate);
    setTinNumber(empInfoGet.tinNumber);



    //getEmpAddress();
  }, [eId, empInfoGet.firstName, empInfoGet.lastName, empInfoGet.otherName, empInfoGet.otherNameTwo, 
      empInfoGet.maritalStatus, empInfoGet.ethnicity, empInfoGet.religion, empInfoGet.sex, empInfoGet.dateOfBirth,
      empInfoGet.nationality, empInfoGet.homeNumber, empInfoGet.cellNumber, empInfoGet.workNumber, empInfoGet.email,
      empInfoGet.regimentNumber, empInfoGet.nationalIdNumber, empInfoGet.passportNumber, empInfoGet.passportExpirationDate,
      empInfoGet.tinNumber]);

    
console.log(empInfoGet);







  // AddEmployeePIForm INFORMATION

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

  // AddEmployeeContactForm Information
  const handleHomeNumChange = (event) => {      
    setHomeNumber(event.target.value);
  }

  const handleCellNumChange = (event) => {    
    setCellNumber(event.target.value);
  }

  const handleWorkNumChange = (event) => {       
    setWorkNumber(event.target.value); 
  }

  const handleEmailChange = (event) => {    
    setEmail(event.target.value);
  }

  // AddEmployeeOfficialInfoForm Information
  const handleRegNumChange = (event) => {    
    setRegimentNumber(event.target.value);
  }

  const handleNationalIdNumChange = (event) => {    
    setNationalIdNumber(event.target.value);
  }

  const handlePassportNumChange = (event) => {    
    setPassportNumber(event.target.value); 
  }

  const handlePassportExpDateChange = (event) => {
    setPassportExpirationDate(event.target.value);
  }

  const handleTinNumChange = (event) => {
    setTinNumber(event.target.value);
  }
   console.log(maritalStatus);
  // console.log(religion);
  // console.log(nationality);
  // console.log(ethnicity);
  // console.log(firstName);

  const getNotification = (option, notificationType) => {
    if(notificationType === 'success'){
      setNotify({
        isOpen: true,
        message: 'Career History Information Successfully Added',
        type: 'success'
      })
  }
    if(notificationType == 'error'){
      setNotify({
        isOpen: true,
        message: 'An error was detected',
        type: 'error'
      })
    }
    }

  const postDataHandler = () => {    
  let employeeInfo = {
      id: parseInt(eId),
      nationalityId: nationality,
      religionId: religion,
      ethnicityId: ethnicity,
      maritalStatusId: maritalStatus,
      homeNumber: parseInt(homeNumber, 10),
      cellNumber: parseInt(cellNumber, 10),
      workNumber: parseInt(workNumber, 10),
      email: email,
      title: '',
      firstName: firstName,
      lastName: lastName,
      otherName: otherName,
      regimentNumber: parseInt(regimentNumber, 10),
      dateOfBirth: dateOfBirth,
      sex: sex,
      nationalIdNumber: parseInt(nationalIdNumber, 10),
      passportNumber: passportNumber,
      passportExpirationDate: passportExpirationDate,
      tinNumber: parseInt(tinNumber, 10),
    };
    //console.log(employeeInfo);
    axios.patch('/employeePI/' + eId, employeeInfo)
      .then(response => getNotification(response, 'success'))
      .catch(error => getNotification(error, 'error'))
  }

  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
         <h1>Update Employee Profile</h1>
        </Grid>
            <Grid container>          
              
              <Grid item xs={12}>
                <UpdateEmployeePIForm 
                //  formik={formik}
                  firstName={firstName}
                  lastName={lastName}
                  otherName={otherName}
                  otherNameTwo={otherNameTwo}
                  
                  // if(nationalities != null && religions != null && ethnicities != null && maritalStatuses != null) {
                  //   if(nationalities.length > 0 && religions.length > 0 && ethnicities.length > 0 && maritalStatuses.length > 0){
              
                  //      maritalStatuses.map((localMaritalStatus) => {
                  //        if( empInfoGet.maritalStatus == localMaritalStatus.name){
                  //          setMaritalStatus(parseInt(localMaritalStatus.id));
                  //          //props.maritalStatus = localMaritalStatus;
                  //          }
                  //        });
              
                  //      religions.map((localReligion) => {
                  //         if( empInfoGet.religion == localReligion.name){
                  //           setReligion(parseInt(localReligion.id));
                  //            }
                  //        });
              
                  //      nationalities.map((localNationality) => {
                  //       if( empInfoGet.nationality == localNationality.name){
                  //          setNationality(parseInt(localNationality.id));
                  //         }
                  //       });
              
                  //      ethnicities.map((localEthnicity) => {
                  //       if( empInfoGet.ethnicity == localEthnicity.name){
                  //         setEthnicity(parseInt(localEthnicity.id));
                  //         }
                  //       });
              
                  //     }
                  //   }
                  maritalStatus={maritalStatus}
                  nationality={nationality}
                  ethnicity={ethnicity}
                  religion={religion}

                  sex={sex}
                  dateOfBirth={dateOfBirth}
                  handleFirstNameChange={handleFirstNameChange}
                  handleLastNameChange={handleLastNameChange}
                  handleOtherNameChange={handleOtherNameChange}
                  handleOtherNameTwoChange={handleOtherNameTwoChange}
                  handleMaritalStatusChange={handleMaritalStatusChange}
                  handleReligionChange={handleReligionChange}
                  handleEthnicityChange={handleEthnicityChange}
                  handleSexChange={handleSexChange}
                  handleDoBChange={handleDoBChange}
                  handleNationalityChange={handleNationalityChange}>                    
                </UpdateEmployeePIForm>
              </Grid> 

       

              <Grid item xs={12}>
                <UpdateEmployeeContactForm 
                  homeNumber={homeNumber}
                  cellNumber={cellNumber}
                  workNumber={workNumber}
                  email={email}
                  handleHomeNumChange={handleHomeNumChange}
                  handleCellNumChange={handleCellNumChange}
                  handleWorkNumChange={handleWorkNumChange}
                  handleEmailChange={handleEmailChange}>
                </UpdateEmployeeContactForm>
              </Grid >

              <Grid item xs={12}>
                <UpdateEmployeeOfficialInfoForm 
                  regimentNumber={regimentNumber}
                  nationalIdNumber={nationalIdNumber}
                  passportNumber={passportNumber}
                  passportExpirationDate={passportExpirationDate}
                  tinNumber={tinNumber}
                  handleRegNumChange={handleRegNumChange}
                  handleNationalIdNumChange={handleNationalIdNumChange}
                  handlePassportNumChange={handlePassportNumChange}
                  handlePassportExpDateChange={handlePassportExpDateChange}
                  handleTinNumChange={handleTinNumChange}>
                </UpdateEmployeeOfficialInfoForm>
              </Grid >
               
              <Grid item xs={6} spacing={3}>
                <Button type="submit" onClick={postDataHandler} variant="outlined" color="primary" style={{margin: '10'}}> Update Employee </Button>
                <Notification  notify={notify} setNotify={setNotify}></Notification>
              </Grid >
              <Notification  notify={notify} setNotify={setNotify}></Notification>
            </Grid>           
       
      </Grid>
    </div>
  );
}
