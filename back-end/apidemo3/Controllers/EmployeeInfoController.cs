using AutoMapper;
using GDFHRMS.Models.Dtos;
using GDFHRMS.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeInfoController : Controller
    {
        private IGDFRepository _npRepo;
        private readonly IMapper _mapper;

        public EmployeeInfoController(IGDFRepository npRepo, IMapper mapper)
        {
            _npRepo = npRepo;
            _mapper = mapper;
        }

        [HttpGet("{EmployeeId:int}")]
        [ActionName("GetEmployeeProfile")]
        public IActionResult GetEmployeeProfile(int EmployeeId)
        {
            var obj = _npRepo.GetEmployeeProfile(EmployeeId);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<Employee_Personal_InformationDto>(obj);
            return Ok(objDto);
        }

        ////<summary>
        //// Search for an employee by their regiment number.
        ////</summary>
        [HttpGet("{EmployeeRegimentNumber:int}")]
        [ActionName("GetEmployeeByRegimentNumber")]
        public IActionResult GetEmployeeByRegimentNumber(int EmployeeRegimentNumber)
        {
            var obj = _npRepo.GetEmployeeByRegimentNumber(EmployeeRegimentNumber);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<Employee_Personal_InformationDto>(obj);
            return Ok(objDto);
        }

        //[HttpGet("{GetEmployeeByFirstName}")]
        [HttpGet]
        [Route("/api/[controller]/{EmployeeFirstName}")]
        [ActionName("GetEmployeeByFirstName")]
        public IActionResult GetEmployeeByFirstName(string EmployeeFirstName)
        {
            var obj = _npRepo.GetEmployeeByFirstName(EmployeeFirstName);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<Employee_Personal_InformationDto>(obj);
            return Ok(objDto);
        }

        [HttpGet]
        [ActionName("GetAllEMployees")]
        public IActionResult GetAllEMployees()
        {
            var objList = _npRepo.GetAllEMployees();

            var objDto = new List<Employee_Personal_InformationDto>();

            foreach (var obj in objList)
            {
                objDto.Add(_mapper.Map<Employee_Personal_InformationDto>(obj));
            }

            return Ok(objList);
        }
    }
}
