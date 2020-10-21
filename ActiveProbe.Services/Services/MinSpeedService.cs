
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class MinSpeedService : GenericService<MinSpeed>, IMinSpeedService
    {        
        public MinSpeedService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}