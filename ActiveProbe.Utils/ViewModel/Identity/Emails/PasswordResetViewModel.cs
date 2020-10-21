namespace ActiveProbe.Utils.ViewModel.Identity.Emails
{
    public class PasswordResetViewModel : EmailsBase
    {
        public int UserId { set; get; }
        public string Token { set; get; }
    }
}