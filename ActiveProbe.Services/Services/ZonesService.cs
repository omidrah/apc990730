
using System.Collections.Generic;
using System.Linq;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class ZonesService : GenericService<Zones>, IZonesService
    {        
        public ZonesService(IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}