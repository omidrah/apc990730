using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineConnectionHistory
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public bool IsConnected { get; set; }
        public DateTime CreatedDate { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public double? CpuTemperature { get; set; }
        public DateTime? DateFromDevice { get; set; }
    }
}
