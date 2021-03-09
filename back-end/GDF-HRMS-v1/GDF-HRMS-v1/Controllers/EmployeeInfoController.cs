using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GDF_HRMS_v1.Models;
using GDF_HRMS_v1.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;




namespace GDF_HRMS_v1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeInfoController : ControllerBase
    {
        private IEmployeePIRepository _npRepo;
        private readonly IMapper _mapper;

        public EmployeeInfoController(IEmployeePIRepository npRepo, IMapper mapper)
        {
            _npRepo = npRepo;
            _mapper = mapper;
        }
        //Get all employees personal info
        [HttpGet]
        public IActionResult GetEmployeePIs()
        {
            var objList = _npRepo.GetEmployeePIs();
            var objDto = new List<EmployeePIDto>();
            foreach (var obj in objList)
            {
                objDto.Add(_mapper.Map<EmployeePIDto>(obj));
            }
            return Ok(objDto);
        }
        //Get employee info by ID
        [HttpGet("id/{employeeId:int}", Name = "GetEmployeePIById")]
        public IActionResult GetEmployeePIById(int employeeId)
        {
            var obj = _npRepo.GetEmployeePIById(employeeId);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<EmployeePIDto>(obj);
            return Ok(objDto);

        }
        //Get employee info by Regiment Number
        [HttpGet("regnumber/{employeeRNumber:int}", Name = "GetEmployeePIByRegNumber")]
        public IActionResult GetEmployeePIByRegNumber(int employeeRNumber)
        {
            var obj = _npRepo.GetEmployeePIByRegNumber(employeeRNumber);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<EmployeePIDto>(obj);
            return Ok(objDto);

        }
        //Get employee info by First Name
        [HttpGet("fname/{employeeFname}", Name = "GetEmployeePIByFname")]
        public IActionResult GetEmployeePIByFname(string employeeFname)
        {
            var obj = _npRepo.GetEmployeePIByFname(employeeFname);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<EmployeePIDto>(obj);
            return Ok(objDto);

        }

        //Get employee career history by ID
        [HttpGet("employeeCH/id/{employeeId:int}", Name = "GetEmployeeCHByEId")]
        public IActionResult GetEmployeeCHByEId(int employeeId)
        {
            var obj = _npRepo.GetEmployeeCHByEId(employeeId);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<CareerHistoryDto>(obj);
            return Ok(objDto);

        }

        [HttpPatch("update/employeePI/{employeeId:int}", Name = "UpdateEmployeePI")] //Update employee info
        public IActionResult UpdateEmployeePI(int employeeId, [FromBody] EmployeePIDto employeePIDto)
        {
            if (employeePIDto == null || employeeId != employeePIDto.Id)
            {
                return BadRequest(ModelState);
            }
            var employeeObj = _mapper.Map<EmployeePI>(employeePIDto);

            if (!_npRepo.UpdateEmployeePI(employeeObj))
            {
                ModelState.AddModelError("", $"Something went wrong when updating the record {employeeObj.Id}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpPatch("update/employeeCH/{employeeId:int}", Name = "UpdateEmployeeCH")] //Update career history
        public IActionResult UpdateEmployeeCH(int employeeId, [FromBody] CareerHistoryDto careerHistoryDto)
        {
            if (careerHistoryDto == null || employeeId != careerHistoryDto.Id)
            {
                return BadRequest(ModelState);
            }
            var careerHistoryObj = _mapper.Map<CareerHistory>(careerHistoryDto);

            if (!_npRepo.UpdateEmployeeCH(careerHistoryObj))
            {
                ModelState.AddModelError("", $"Something went wrong when updating the record {careerHistoryObj.Id}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpPost(Name = "AddAnEmployee")]
        public IActionResult AddEmployee([FromBody] EmployeePIDto employeePIDto)
        {
            if (employeePIDto == null)
            {
                return BadRequest(ModelState);
            }

            if (_npRepo.EmployeePIExists(employeePIDto.RNumber))
            {
                ModelState.AddModelError("", "Employee already exists.");
                return StatusCode(404, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeePIObj = _mapper.Map<EmployeePI>(employeePIDto);

            if (!_npRepo.CreateEmployeePI(employeePIObj))
            {
                ModelState.AddModelError("", $"Something went wrong when saving the record {employeePIObj.Fname}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }



        [HttpDelete("{employeeId:int}", Name = "DeleteEmployee")]

        public IActionResult DeleteEmployeeInfo(int employeeId)
        {
            if (!_npRepo.EmployeePIExists(employeeId))
            {
                return NotFound();
            }

            var employeePIObj = _npRepo.GetEmployeePIById(employeeId);
            if (!_npRepo.DeleteEmployeePI(employeePIObj))
            {
                ModelState.AddModelError("", $"Something went wrong when deleting the record {employeePIObj.Fname}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }

}

