using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MinSpeed
    {
        public int Id { get; set; }
        public int? OperatorId { get; set; }
        public int? NetworkId { get; set; }
        public int? TestId { get; set; }
        public int? ParameterId { get; set; }
        public DateTime? CreateTime { get; set; }
        public double? Val { get; set; }
    }
}
