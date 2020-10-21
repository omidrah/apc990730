using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class NotificationParameterService : GenericService<NotificationParameter>, INotificationParameterService
    {
        public NotificationParameterService(IUnitOfWork uow) : base(uow)
        {

        }
    }
}