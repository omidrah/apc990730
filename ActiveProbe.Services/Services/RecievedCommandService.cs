
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class RecievedCommandService : GenericService<RecievedCommand>, IRecievedCommandService
    {        
        public RecievedCommandService(IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}