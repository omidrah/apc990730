using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ActiveProbe.Utils.Tools.Mail
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
