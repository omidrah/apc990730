using ActiveProbe.Domain.Identity;

namespace ActiveProbe.Utils.ViewModel.Identity.Emails
{
    public class UserProfileUpdateNotificationViewModel : EmailsBase
    {
        public User User { set; get; }
    }
}