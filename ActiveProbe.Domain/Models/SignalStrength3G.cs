using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class SignalStrength3G
    {
        public int Id { get; set; }
        public double? Lat { get; set; }
        public double? Lon { get; set; }
        public double? Val { get; set; }
        public string SheetName { get; set; }
        public string Epath { get; set; }
        public short? OperatorId { get; set; }
    }
}
