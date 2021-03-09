using GDFHRMS.Models;
using GDFHRMS.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDFHRMS.Repository.IRepository
{
    public interface INationalParksRepository
    {
        ICollection<NationalParkDto> GetNationalParks();

        NationalParkDto GetNationalPark(int nationalParkId);

        bool NationalParkExists(string name);
        bool NationalParkExists(int nationalParkId);

        bool CreateNationalPark(NationalParkDto nationalPark);

        bool UpdateNationalPark(NationalParkDto nationalPark);

        bool DeleteNationalPark(NationalParkDto nationalPark);

        bool Save();
    }
}
