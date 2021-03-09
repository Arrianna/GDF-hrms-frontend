using GDFHRMS.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Repository.IRepository
{
    public interface IGDFRepository
    {
        ICollection<Employee_Personal_InformationDto> GetAllEMployees();

        Employee_Personal_InformationDto GetEmployeeProfile(int EmployeeId);

        Employee_Personal_InformationDto GetEmployeeByRegimentNumber(int EmployeeRegimentNumber);

        Employee_Personal_InformationDto GetEmployeeByFirstName(string EmployeeFirstName);
    }
}
