using GDF_HRMS_v1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDF_HRMS_v1.Repository.IRepository
{
    public interface IEmployeePIRepository
    {
        ICollection<EmployeePI> GetEmployeePIs();
        EmployeePI GetEmployeePIById(int employeeId);
        CareerHistory GetEmployeeCHByEId(int employeeId);
        EmployeePIDto GetEmployeePIByRegNumber(int employeeRNumber);
        EmployeePI GetEmployeePIByFname(string employeeFname);
        bool EmployeePIExists(string name);
        bool EmployeePIExists(int id);
        bool EmployeeCHExists(int id);
        bool CreateEmployeePI(EmployeePI employeePI);
        bool UpdateEmployeePI(EmployeePI employeePI);
        bool DeleteEmployeePI(EmployeePI employeePI);
        bool UpdateEmployeeCH(CareerHistory careerHistory);
        bool Save();
    }
}
