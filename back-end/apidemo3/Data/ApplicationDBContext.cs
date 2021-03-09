using GDFHRMS.Models;
using GDFHRMS.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Data
{
    public class ApplicationDBContext : DbContext 
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) 
        {

        }

        public DbSet<NationalParkDto> NationalParks { get; set; }
        public DbSet<Employee_AddressDto> Employee_Address { get; set; }
        public DbSet<Employee_Personal_InformationDto> Employee_Personal_Information { get; set; }
    }
}
