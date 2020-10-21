
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class CommandService : GenericService<Command>, ICommandService
    {        
        public CommandService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}