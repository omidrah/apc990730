
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
namespace ActiveProbe.Services
{
    public class MachineUssdService : GenericService<MachineUssd>, IMachineUssdService
    {
        public MachineUssdService(IUnitOfWork uow) : base(uow)
        {

        }
    }
}