using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using GDF_HRMS_v1.Models;  // tried adding the models here to fix navigation problem

namespace GDF_HRMS_v1.Models
{
    public class CareerHistory
    {
        [Key]
        public int Id { get; set; }
        [Required]
       // public int? EId { get; set; }
       // [ForeignKey("EId")]
      //  public EmployeePI EmployeePI { get; set; }
        //public int? PositionId { get; set; }
        //[ForeignKey("PositionId")]
        //public Position Position { get; set; }
        //public int? DeptId { get; set; }
        //[ForeignKey("DeptId")]
        //public Department Department { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

       // public ICollection<EmployeePI> EmployeePIs { get; set; }
       // public ICollection<Position> Positions { get; set; }

       // public ICollection<Department> Departments { get; set; }
    }
}
