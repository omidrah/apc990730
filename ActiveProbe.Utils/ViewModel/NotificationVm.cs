using ActiveProbe.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActiveProbe.Utils.ViewModel
{
    public class NotificationVm
    {
        public int id { get; set; }
        public string name { get; set; }
        public bool activation { get; set; }
        public string title { get; set; }
        public string messageContent { get; set; }
        public NotificationType notificationType { get; set; }

        //public DateTime sendStartTime { get; set; }
        //public DateTime sendEndTime { get; set; }

        public TimeSpan sendStartTime { get; set; }
        public TimeSpan sendEndTime { get; set; }

        public string mobile { get; set; }
        public string email { get; set; }
        public int maxSend { get; set; }
        public int timeIntervalToNextSend { get; set; }

        public List<NotificationParameterVm> notificationParameters { get; set; }
    }
}