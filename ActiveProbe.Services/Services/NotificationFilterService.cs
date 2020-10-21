using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class NotificationFilterService : GenericService<NotificationFilter>, INotificationFilterService
    {        
        public NotificationFilterService(IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}