
using ActiveProbe.Domain.Enums;
using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class Notification
    {
        public Notification()
        {
            NotificationParameters= new HashSet<NotificationParameter>();
            SendedNotifications = new HashSet<SendedNotification>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Activation { get; set; }
        public string Title { get; set; }
        public string MessageContent { get; set; }
        public NotificationType NotificationType { get; set; }
        public TimeSpan SendStartTime { get; set; }
        public TimeSpan SendEndTime { get; set; }

        public string Mobile { get; set; }
        public string Email { get; set; }
        public int MaxSend { get; set; }
        public int TimeIntervalToNextSend { get; set; }

        public virtual ICollection<NotificationParameter> NotificationParameters { get; set; }
        public virtual ICollection<SendedNotification> SendedNotifications { get; set; }
    }   
}