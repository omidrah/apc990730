
using System.Collections.Generic;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using System.Linq;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using ActiveProbe.Utils.ViewModel;

namespace ActiveProbe.Services
{
    public class ZonePointService : GenericService<ZonePoint>, IZonePointService
    {        
        public ZonePointService(IUnitOfWork uow) : base(uow)
        {
            
        }
         public IEnumerable<ZPoint> GetZoneByPoints(){
             return _tEntities.Select(x=>new ZPoint{
                 Lat =x.Lat,
                 Lon =x.Lon,
                 Title=x.Zone.Title,
                 Type= x.Zone.Type,
                 ZoneId = x.ZoneId
             });
         }
    }
}