using ActiveProbe.Domain.Identity;

namespace ActiveProbe.Utils.ViewModel.Identity.Emails
{
    public class ChangePasswordNotificationViewModel : EmailsBase
    {
        public User User { set; get; }
    }
}