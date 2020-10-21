
using ActiveProbe.Domain.Enums;
using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class NotificationParameter
    {
        public NotificationParameter()
        {
            NotificationFilters = new HashSet<NotificationFilter>();
        }

        public int Id { get; set; }
        public int NotificationId { get; set; }
        public OperatorType OperatorTypeId  { get; set; }
        public NetworkType NetworkTypeId { get; set; }
        public int MachineId { get; set; }
        public int GroupId { get; set; }
        public int ZoneId { get; set; }
        public ParameterType ParameterTypeId { get; set; }
        public FunctionType FunctionTypeId { get; set; }
        public DateTime SearchStartDate { get; set; }
        public DateTime SearchEndDate { get; set; }
        public LogicalSymbolType LogicalSymbolTypeId { get; set; }

        public virtual Notification Notification { get; set; }
        public virtual ICollection<NotificationFilter> NotificationFilters { get; set; }
    }   
}