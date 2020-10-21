
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class InfoPacketService : GenericService<InfoPacket>, IInfoPacketService
    {        
        public InfoPacketService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}