import Axios from 'axios'; // remember to npm install Axios

const Api = (function () { 
    
   //calling endpoints
    const getEmployeeByRegNumber = (RNumber) => {
        Axios.get("/RegimentNumber/" + RNumber).then((response) => {
            console.log(response);
            return response.data;
            //response.data.title + "..." + response.data.fname;
            // which ever field you need it will be response.data.fieldName
        });
    }

    const getEmployeeByFirstName = (Fname) => {
        Axios.get("/fname/" + Fname).then((response) => {
            console.log(response);
            return response.data.Title + "..." + response.data.Fname;
        })
    }


    return {
        getEmployeeByRegNumber : getEmployeeByRegNumber,
        getEmployeeByFirstName : getEmployeeByFirstName
    }
})();

export default Api;