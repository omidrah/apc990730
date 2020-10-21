using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class ZoneKml
    {
        public int Id { get; set; }
        public int ZoneId { get; set; }
        public string KmlFile { get; set; }

        public virtual Zones Zone { get; set; }
    }
}
