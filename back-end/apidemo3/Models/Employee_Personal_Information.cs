using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Models
{
    public class Employee_Personal_Information
    {

        [Key]
        public int Employee_id { get; set; }
        [Required]

        public int Employee_nationality_id { get; set; }
        public int Religion_id { get; set; }
        public int Ethnicity_id { get; set; }
        public int MaritalStatus_id { get; set; }

        public int Employee_regimentNumber { get; set; }
        public int Employee_nationalIdNumber { get; set; }

        public int Employee_tinNumber { get; set; }

        public int Employee_contractNumber { get; set; }

        public string Employee_title { get; set; }
        public string Employee_firstName { get; set; }
        public string Employee_lastName { get; set; }
        public string Employee_otherName { get; set; }
        public string Employee_sex { get; set; }
        public string Employee_passportNumber { get; set; }
        public DateTime Employee_dob { get; set; }
        public DateTime Employee_passportExpirationNumber { get; set; }


       

    }
}
