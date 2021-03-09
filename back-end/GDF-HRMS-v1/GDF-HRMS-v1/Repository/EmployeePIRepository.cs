using GDF_HRMS_v1.Data;
using GDF_HRMS_v1.Models;
using GDF_HRMS_v1.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDF_HRMS_v1.Repository
{
    public class EmployeePIRepository : IEmployeePIRepository
    {
        private readonly ApplicationDbContext _db;

        public EmployeePIRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public bool CreateEmployeePI(EmployeePI employeePI)
        {
            _db.EmployeePIs.Add(employeePI);
            return Save();
        }

        public bool DeleteEmployeePI(EmployeePI employeePI)
        {
            _db.EmployeePIs.Remove(employeePI);
            return Save();
        }

        public bool EmployeePIExists(string name)
        {
            bool value = _db.EmployeePIs.Any(a => a.Lname.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool EmployeePIExists(int id)
        {
            bool value = _db.EmployeePIs.Any(a => a.Id == id);
            return value;
        }

        public EmployeePI GetEmployeePIByFname(string employeeFname)
        {
            return _db.EmployeePIs.FirstOrDefault(a => a.Fname.ToLower().Trim() == employeeFname.ToLower().Trim());
        }

        public EmployeePI GetEmployeePIById(int employeeId)
        {
            return _db.EmployeePIs.FirstOrDefault(a => a.Id == employeeId);
        }

        public EmployeePIDto GetEmployeePIByRegNumber(int employeeRNumber)
        {
            return _db.EmployeePIs.Where(a => a.RNumber == employeeRNumber).Select(a => new EmployeePIDto
            {
                Fname = a.Fname,
                ReligionName = a.Religion.Name,
                NationalityName = a.Nationality.Name,
                EthnicityName = a.Ethnicity.Name,
                MaritalStatusName = a.MaritalStatus.Name,
                CountryName = a.Country.Name,
                PositionName = a.Position.Name


            }).FirstOrDefault();

            //var result =  (from a in _db.EmployeePIs
            //              select new EmployeePIDto
            //              {

            //                  Id = a.Id,
            //                  Fname = a.Fname,
            //                  Lname = a.Lname,
            //                  RId = a.Religion.Id,
            //                  ReligionName = a.Religion.Name

            //              }).FirstOrDefault();
            //return result;



        }

        public ICollection<EmployeePI> GetEmployeePIs()
        {            return _db.EmployeePIs.OrderBy(a => a.Lname).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }

        public bool UpdateEmployeePI(EmployeePI employeePI)
        {
            _db.EmployeePIs.Update(employeePI);
            return Save();
        }
        public bool UpdateEmployeeCH(CareerHistory careerHistory)
        {
            _db.CareerHistories.Update(careerHistory);
            return Save();
        }
        public CareerHistory GetEmployeeCHByEId(int employeeId)
        {
            // return _db.CareerHistories.FirstOrDefault(a => a.EId == employeeId);
            return null;
        }
        public bool EmployeeCHExists(int id)
        {
            bool value = _db.CareerHistories.Any(a => a.Id == id);
            return value;
        }
    }
}
