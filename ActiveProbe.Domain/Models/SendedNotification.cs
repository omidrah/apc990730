
using ActiveProbe.Domain.Enums;
using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class SendedNotification
    {
        public SendedNotification()
        {
        }
        public int Id { get; set; }
        public int NotifId{ get; set; }
        public DateTime CreateDate{ get; set; }
        public DateTime? SendDate { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }

        public virtual Notification Notification{ get; set; }
    }   
}