
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class ChannelService : GenericService<Channel>, IChannelService
    {        
        public ChannelService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}