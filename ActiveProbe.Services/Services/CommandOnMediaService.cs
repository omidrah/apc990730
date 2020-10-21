
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class CommandOnMediaService : GenericService<CommandOnMedia>, ICommandOnMediaService
    {        
        public CommandOnMediaService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}