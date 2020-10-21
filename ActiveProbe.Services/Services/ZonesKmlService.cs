
using System.Collections.Generic;
using System.Linq;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class ZonesKmlService : GenericService<ZoneKml>, IZonesKmlService
    {        
        public ZonesKmlService(IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}