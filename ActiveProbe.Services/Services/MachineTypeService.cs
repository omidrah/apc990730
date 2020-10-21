
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
namespace ActiveProbe.Services
{
    public class MachineTypeService : GenericService<MachineType>, IMachineTypeService
    {
        
        public MachineTypeService(IUnitOfWork uow) : base(uow)
        {
        
        }
    }
}