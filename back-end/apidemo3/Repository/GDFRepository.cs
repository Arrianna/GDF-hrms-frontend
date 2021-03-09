using GDFHRMS.Data;
using GDFHRMS.Models.Dtos;
using GDFHRMS.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Repository
{
    public class GDFRepository : IGDFRepository 
    {

        private readonly ApplicationDBContext _db;

        public GDFRepository(ApplicationDBContext db)
        {
            _db = db;
        }


        public Employee_Personal_InformationDto GetEmployeeProfile(int EmployeeId)
        {
            return _db.Employee_Personal_Information.FirstOrDefault(a => a.Employee_id == EmployeeId);
        }

        public Employee_Personal_InformationDto GetEmployeeByRegimentNumber(int EmployeeRegimentNumber)
        {
            return _db.Employee_Personal_Information.FirstOrDefault(a => a.Employee_regimentNumber == EmployeeRegimentNumber);
        }

        public Employee_Personal_InformationDto GetEmployeeByFirstName(string EmployeeFirstName)
        {
            return _db.Employee_Personal_Information.FirstOrDefault(a => a.Employee_firstName == EmployeeFirstName);
        }

        public ICollection<Employee_Personal_InformationDto> GetAllEMployees()
        {
            return _db.Employee_Personal_Information.OrderBy(a => a.Employee_firstName).ToList();

        }
    }
}
