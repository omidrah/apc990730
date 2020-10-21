using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class SyncDetail
    {
        public int Id { get; set; }
        public int PsyncId { get; set; }
        public DateTime? CreateDate { get; set; }
        public string Command { get; set; }
        public bool Status { get; set; }

        public virtual SyncMaster Psync { get; set; }
    }
}
