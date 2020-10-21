
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class MachineVersionGroupService : GenericService<MachineVersionGroup>, IMachineVersionGroupService
    {        
        public MachineVersionGroupService(IUnitOfWork uow) : base(uow)
        {
        
        }
    }
}