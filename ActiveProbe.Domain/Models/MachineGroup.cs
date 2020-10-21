using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineGroup
    {
        public MachineGroup()
        {
            DefinedTestMachineGroup = new HashSet<DefinedTestMachineGroup>();
            InverseParrent = new HashSet<MachineGroup>();
            Machine = new HashSet<Machine>();
            MachineVersionGroup = new HashSet<MachineVersionGroup>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public int? ParrentId { get; set; }
        public DateTime CreateDate { get; set; }

        public virtual MachineGroup Parrent { get; set; }
        public virtual ICollection<MachineGroup> InverseParrent { get; set; }

        public virtual ICollection<DefinedTestMachineGroup> DefinedTestMachineGroup { get; set; }        
        public virtual ICollection<Machine> Machine { get; set; }
        public virtual ICollection<MachineVersionGroup> MachineVersionGroup { get; set; }
    }
}
