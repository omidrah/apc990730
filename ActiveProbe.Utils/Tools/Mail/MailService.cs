using ActiveProbe.Utils.ViewModel;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.IO;
using System.Threading.Tasks;

namespace ActiveProbe.Utils.Tools.Mail
{
    /// <summary>
    /// use from :: https://www.codewithmukesh.com/blog/send-emails-with-aspnet-core/
    /// </summary>
    public class MailService : IMailService
    {
        private readonly ConfigurationsVm _config;
        public MailService(IOptions<ConfigurationsVm> config)
        {
            _config = config.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            if (_config.Properties.MailSetting.Active)
            {
                var email = new MimeMessage();
                email.Sender = MailboxAddress.Parse(_config.Properties.MailSetting.Mail);
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                email.Subject = mailRequest.Subject;
                var builder = new BodyBuilder();
                if (mailRequest.Attachments != null)
                {
                    byte[] fileBytes;
                    foreach (var file in mailRequest.Attachments)
                    {
                        if (file.Length > 0)
                        {
                            using (var ms = new MemoryStream())
                            {
                                file.CopyTo(ms);
                                fileBytes = ms.ToArray();
                            }
                            builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
                        }
                    }
                }
                builder.HtmlBody = mailRequest.Body;
                email.Body = builder.ToMessageBody();
                using var smtp = new SmtpClient();
                smtp.Connect(_config.Properties.MailSetting.Host, _config.Properties.MailSetting.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_config.Properties.MailSetting.Mail, _config.Properties.MailSetting.Password);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
            }
        }
    }
}
