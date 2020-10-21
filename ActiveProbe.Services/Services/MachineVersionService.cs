
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class MachineVersionService : GenericService<MachineVersion>, IMachineVersionService
    {    
        public MachineVersionService(IUnitOfWork uow) : base(uow)
        {
    
        }
    }
}