using ActiveProbe.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActiveProbe.Utils.ViewModel
{
    public class NotificationFilterVm
    {
        public int Id { get; set; }
        public LogicalSymbolType logicalSymbolTypeId { get; set; }
        public ConditionalValueType conditionalValueTypeId { get; set; }
        public string filterlogicalSymbol { get; set; }

    }
}