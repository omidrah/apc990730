using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class DefinedTestMachineGroup
    {
        public DefinedTestMachineGroup()
        {
            DefinedTestMachine = new HashSet<DefinedTestMachine>();
        }

        public int Id { get; set; }
        public int? DefinedTestId { get; set; }
        public int? MachineGroupId { get; set; }
        public bool? IsActive { get; set; }
        public short? Sim { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Status { get; set; }
        public DateTime? FinishTime { get; set; }

        public virtual DefinedTest DefinedTest { get; set; }
        public virtual MachineGroup MachineGroup { get; set; }
        public virtual ICollection<DefinedTestMachine> DefinedTestMachine { get; set; }
    }
}
