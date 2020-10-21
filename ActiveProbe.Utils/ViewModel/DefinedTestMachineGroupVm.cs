using System;
namespace ActiveProbe.Utils.ViewModel
{
    //Relation between DefinedTests and machinegroups
    public class DefinedTestMachineGroupVm
    {
        public int Id { get; set; }
        public int DefinedTestId { get; set; }
        public int MachineGroupId { get; set; }
        public Boolean IsActive { get; set; }
        public short SIM { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public Boolean? Status{get;set;}
    }
}
