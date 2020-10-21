using Org.BouncyCastle.Bcpg.OpenPgp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace ActiveProbe.Utils.ViewModel
{
    public class ConfigurationsVm
    {
        public const string Project = "Project";        
        public string Name { get; set; }
        public string Version { get; set; }
        public int Lifetime { get; set; }
        public Props Properties { get; set; }
    }

    public class Props
    {
        public bool TestPage { get; set; }
        public string machineTable { get; set; }
        public bool createDevice { get; set; }
        public bool iccID { get; set; }

        public bool HistoryDeleteActive { get; set; }
        public int HistoryDeletePacketSize { get; set; }
        /// <summary>
        /// Seconds
        /// </summary>
        public int HistoryDeleteInterval { get; set; }
        public int HistoryDeleteExceptRows { get; set; }

        public bool PushNotificationActive { get; set; }
        /// <summary>
        /// Seconds
        /// </summary>
        public int PushNotificationInterval { get; set; }

        public MailSettings MailSetting { get; set; }
    }


    public class MailSettings
    {
        public bool Active { get; set; }
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
}
