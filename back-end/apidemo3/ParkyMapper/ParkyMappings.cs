using AutoMapper;
using GDFHRMS.Models;
using GDFHRMS.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.ParkyMapper
{
    public class ParkyMappings : Profile
    {
        public ParkyMappings()
        {
            //CreateMap<NationalPark, NationalParkDto>().ReverseMap();
            CreateMap<Employee_Personal_Information, Employee_Personal_InformationDto>().ReverseMap();
         

        }
    }
}
