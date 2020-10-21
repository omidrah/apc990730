using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class ActiveProbeParams
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Descriptions { get; set; }
        public string Type { get; set; }
        public int? TypeLen { get; set; }
    }
}
