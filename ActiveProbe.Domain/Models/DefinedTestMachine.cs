using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class DefinedTestMachine
    {
        public int Id { get; set; }
        public int DefinedTestId { get; set; }
        public int MachineId { get; set; }
        public bool IsActive { get; set; }
        public short Sim { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool? Status { get; set; }
        public DateTime? FinishTime { get; set; }
        public int? TestGroupId { get; set; }

        public virtual DefinedTest DefinedTest { get; set; }
        public virtual Machine Machine { get; set; }
        public virtual DefinedTestMachineGroup TestGroup { get; set; }
    }
}
