using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class ZonePoint
    {
        public double Lat { get; set; }
        public double Lon { get; set; }
        public int Id { get; set; }
        public int ZoneId { get; set; }

        public virtual Zones Zone { get; set; }
    }
}
