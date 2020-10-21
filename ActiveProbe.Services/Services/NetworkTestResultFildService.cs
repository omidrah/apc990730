
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class NetworkTestResultFildService : GenericService<NetworkTestResultFild>, INetworkTestResultFildService
    {        
        public NetworkTestResultFildService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}