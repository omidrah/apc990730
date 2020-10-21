using System;

namespace ActiveProbe.Utils.ViewModel
{
    //Relation between DefinedTests and machines
    public class Export
    {
        public int DefinedTestId { get; set; }
        public string ParamKml{get;set;}
        public int MachineId { get; set; }
        public int ZoneId { get; set; }
        public short SIM { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
