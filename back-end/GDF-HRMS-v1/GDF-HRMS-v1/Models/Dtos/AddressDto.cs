using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GDF_HRMS_v1.Models
{
    public class AddressDto
    {
        [Key]
        public int Id { get; set; }
        public string Lot { get; set; }
        public string Street { get; set; }
        public string Area { get; set; }
        public string Village { get; set; }
        public int Reg { get; set; }
        [ForeignKey("Reg")]
        public Region Region { get; set; }
        public int Ctry { get; set; }
        [ForeignKey("Ctry")]
        public Country Country { get; set; }
    }
}
