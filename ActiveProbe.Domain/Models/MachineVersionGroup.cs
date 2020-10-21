using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineVersionGroup
    {
        public MachineVersionGroup()
        {
            MachineVersion = new HashSet<MachineVersion>();
        }

        public int Id { get; set; }
        public int MachineGroupId { get; set; }
        public string MachineGroupTitle { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? CompleteDate { get; set; }
        public int? CreatedBy { get; set; }
        public string FileDownloadAddress { get; set; }
        public bool IsDone { get; set; }

        public virtual MachineGroup MachineGroup { get; set; }
        public virtual ICollection<MachineVersion> MachineVersion { get; set; }
    }
}
