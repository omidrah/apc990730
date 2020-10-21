using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class Zones
    {
        public Zones()
        {
            ZoneKml = new HashSet<ZoneKml>();
            ZonePoint = new HashSet<ZonePoint>();
        }
        public int ZoneId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreateDate { get; set; }

        public virtual ICollection<ZoneKml> ZoneKml { get; set; }
        public virtual ICollection<ZonePoint> ZonePoint { get; set; }
    }
}
