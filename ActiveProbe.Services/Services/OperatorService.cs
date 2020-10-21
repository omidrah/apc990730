
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class OperatorService : GenericService<Operator>, IOperatorService
    {        
        public OperatorService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}