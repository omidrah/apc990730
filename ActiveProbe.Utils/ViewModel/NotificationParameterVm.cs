using ActiveProbe.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActiveProbe.Utils.ViewModel
{
    public class NotificationParameterVm
    {
        public int Id { get; set; }
        public OperatorType operatorTypeId { get; set; }
        public NetworkType networkTypeId { get; set; }
        public int machineId { get; set; }
        public int groupId { get; set; }
        public int zoneId { get; set; }
        public ParameterType parameterTypeId { get; set; }
        public FunctionType functionTypeId { get; set; }
        public DateTime searchStartDate { get; set; }
        public DateTime searchEndDate { get; set; }
        public LogicalSymbolType logicalSymbolTypeId { get; set; }
        public List<NotificationFilterVm> NotificationFilters { get; set; }


    }
}