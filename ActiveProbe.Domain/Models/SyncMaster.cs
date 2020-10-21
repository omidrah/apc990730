using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class SyncMaster
    {
        public SyncMaster()
        {
            SyncDetail = new HashSet<SyncDetail>();
        }

        public int Id { get; set; }
        public int MachineId { get; set; }
        public string Imei1 { get; set; }
        public byte? Status { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? DisconnectedDate { get; set; }
        public int? CntFileGet { get; set; }
        public bool IsCompeleted { get; set; }

        public virtual ICollection<SyncDetail> SyncDetail { get; set; }
    }
}
