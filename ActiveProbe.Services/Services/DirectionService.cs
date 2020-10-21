
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class DirectionService : GenericService<Direction>, IDirectionService
    {        
        public DirectionService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}