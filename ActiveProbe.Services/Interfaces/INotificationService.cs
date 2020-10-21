using ActiveProbe.Domain.Models;
using ActiveProbe.Utils.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ActiveProbe.Services.Interfaces
{
    public interface INotificationService : IGenericService<Notification>
    {
        Task<IEnumerable<NotificationVm>> GetNotifications();
        Task<NotificationVm> GetNotificationById(int notificationId);
        Task<APIResult<int>> Create(NotificationVm notification);
        Task<APIResult<bool>> Edit(NotificationVm notification);
        Task<APIResult<bool>> Delete(int notificationId);

        Task<APIResult<bool>> PushNotification();
    }
}