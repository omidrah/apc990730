
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class BandService : GenericService<Band>, IBandService
    {        
        public BandService(IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}