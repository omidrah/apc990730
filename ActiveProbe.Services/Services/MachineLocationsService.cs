
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
namespace ActiveProbe.Services
{
    public class MachineLocationsService : GenericService<MachineLocations>, IMachineLocationsService
    {
        public MachineLocationsService(IUnitOfWork uow) : base(uow)
        {

        }
    }
}