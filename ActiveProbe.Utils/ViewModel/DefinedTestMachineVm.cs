using System;

namespace ActiveProbe.Utils.ViewModel
{
    //Relation between DefinedTests and machines
    public class DefinedTestMachineVm
    {
        public int Id { get; set; }
        public int DefinedTestId { get; set; }
        public int MachineId { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean Status{get;set;}
        public short SIM { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? TestGroupId{get;set;}
    }
}
