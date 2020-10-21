using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineVersionDetail
    {
        public int Id { get; set; }
        public int VersionId { get; set; }
        public string State { get; set; }
        public DateTime? CreateDate { get; set; }
        public string Sender { get; set; }
        public string Reciever { get; set; }

        public virtual MachineVersion Version { get; set; }
    }
}
