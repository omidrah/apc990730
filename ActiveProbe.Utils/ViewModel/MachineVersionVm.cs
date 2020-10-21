using System;

namespace ActiveProbe.Utils.ViewModel
{
    public class MachineVersionVm
    {
        public int MachineId { get; set; }
        public int? MachineVersionGroupId { get; set; }
        public string IMEI1{get;set;}
        public DateTime? CreateDate { get; set; }
        public string FaCreateDate{get;set;}
        public DateTime? CompleteDate { get; set; }
        public string FaCompleteDate{get;set;}
        public string FileDownloadAddress { get; set; }   
        public string VersionNum{get;set;}     
        public bool IsDone { get; set; }
    }
}