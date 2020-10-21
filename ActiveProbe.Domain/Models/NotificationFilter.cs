
using ActiveProbe.Domain.Enums;
using System;

namespace ActiveProbe.Domain.Models
{
    public partial class NotificationFilter
    {
        public int Id { get; set; }
        public int NotificationParameterId { get; set; }
        public LogicalSymbolType LogicalSymbolTypeId { get; set; }
        public ConditionalValueType ConditionalValueTypeId { get; set; }
        public string FilterlogicalSymbol { get; set; }

        public virtual NotificationParameter NotificationParameter { get; set; }
    }   
}