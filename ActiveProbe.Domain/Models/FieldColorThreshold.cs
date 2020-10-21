using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class FieldColorThreshold
    {
        public int Id { get; set; }
        public string FieldName { get; set; }
        public int? RangeFrom { get; set; }
        public int? RangeTo { get; set; }
        public string RangeColor { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
