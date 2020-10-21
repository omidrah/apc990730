using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineVersion
    {
        public MachineVersion()
        {
            MachineVersionDetail = new HashSet<MachineVersionDetail>();
        }

        public int Id { get; set; }
        public int MachineId { get; set; }
        public int? MachineVersionGroupId { get; set; }
        public string Imei1 { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? CompleteDate { get; set; }
        public string FileDownloadAddress { get; set; }
        public bool IsDone { get; set; }
        public int? CreatedBy { get; set; }
        public bool SendToDevice { get; set; }

        public virtual Machine Machine { get; set; }
        public virtual MachineVersionGroup MachineVersionGroup { get; set; }
        public virtual ICollection<MachineVersionDetail> MachineVersionDetail { get; set; }
    }
}
