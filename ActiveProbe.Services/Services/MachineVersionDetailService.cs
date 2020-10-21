
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
namespace ActiveProbe.Services
{
    public class MachineVersionDetailService : GenericService<MachineVersionDetail>, IMachineVersionDetailService
    {
        public MachineVersionDetailService(IUnitOfWork uow) : base(uow)
        {

        }
    }
}