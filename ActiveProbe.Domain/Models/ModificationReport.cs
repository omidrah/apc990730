using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class ModificationReport
    {
        public int Id { get; set; }
        public byte TableId { get; set; }
        public int ObjectId { get; set; }
        public DateTime InsertDt { get; set; }
        public DateTime? ProcessedDt { get; set; }
    }
}
