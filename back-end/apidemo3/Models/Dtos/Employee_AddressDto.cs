using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Models.Dtos
{
    public class Employee_AddressDto
    {
        [Key]
        public int Address_Id { get; set; }
        [Required]

        public int Employee_Id { get; set; }


        public string Address_lot { get; set; }
        public string Address_street { get; set; }
        public string Address_area { get; set; }
        public string Address_townVillage { get; set; }
        public string Address_region { get; set; }
        public string Address_country { get; set; }


        
      
    }
}
