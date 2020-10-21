using System.Collections.Generic;

namespace ActiveProbe.Utils.ViewModel
 {
 public class MachineGroupAssignment
    {
        public int MachineGroupId { get; set; }
        public List<int> MachineIds { get; set; }
    }
 }