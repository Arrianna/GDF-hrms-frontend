using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GDF_HRMS_v1.Models
{
    public class EmployeePIDto
    {
        [Key]
        public int Id { get; set; }
        [Required]
       // public int NId { get; set; }
       // [ForeignKey("NId")]
       // public Nationality Nationality { get; set; }
        public string NationalityName { get; set; }
      //  public int RId { get; set; }
       // [ForeignKey("RId")]
        //public Religion Religion { get; set; }

        public string ReligionName { get; set; }
       // public int EId { get; set; }
       // [ForeignKey("EId")]
       // public Ethnicity Ethnicity { get; set; }
        public string EthnicityName { get; set; }
        //  public int MId { get; set; }
        //  [ForeignKey("MId")]
        //  public MaritalStatus MaritalStatus { get; set; }

        public string MaritalStatusName { get; set; }

        public string PositionName { get; set; }

        public string CountryName { get; set; }
       // public int CId { get; set; }
       // [ForeignKey("CId")]
        public ContactInfo ContactInfo { get; set; }
        public int AId { get; set; }
        [ForeignKey("AId")]
        public Address Address { get; set; }
        public string Title { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Oname { get; set; }
        public int RNumber { get; set; }
        public DateTime Dob { get; set; }
        public string Sex { get; set; }
        public int NidNumber { get; set; }
        public string PNumber { get; set; }
        public DateTime PExpirationDate { get; set; }
        public int TinNumber { get; set; }

    }
}
