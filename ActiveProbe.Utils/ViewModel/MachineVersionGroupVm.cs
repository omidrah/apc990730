using System;

namespace ActiveProbe.Utils.ViewModel
{
    public class MachineVersionGroupVm
    {
        public int Id { get; set; }
        public int? MachineGroupId { get; set; }        
        public DateTime? CreateDate { get; set; }
        public string FaCreateDate{get;set;}
        public DateTime? CompleteDate { get; set; }
        public string FaCompleteDate{get;set;}
        public string FileDownloadAddress { get; set; }        
        public bool IsDone { get; set; }
    }
}