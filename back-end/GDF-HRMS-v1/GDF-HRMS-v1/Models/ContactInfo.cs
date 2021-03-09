using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GDF_HRMS_v1.Models
{
    public class ContactInfo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int HNumber { get; set; }
        public int CNumber { get; set; }
        public int WNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }

        public ICollection<EmployeePI> EmployeePIs { get; set; }
    }
}
