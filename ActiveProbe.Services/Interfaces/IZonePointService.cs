using System.Collections.Generic;
using ActiveProbe.Domain.Models;
using ActiveProbe.Utils.ViewModel;

namespace ActiveProbe.Services.Interfaces
{
    public interface IZonePointService:IGenericService<ZonePoint>
    {   
          public IEnumerable<ZPoint> GetZoneByPoints();
    }
}