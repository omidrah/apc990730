using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hares.Utils.ViewModel
{
    public class ModemMachineVM
    {        
        public string IMEI { get; set; }
        public string Location { get; set; }
        public string SimIndex { get; set; }
        public string MNC { get; set; }
        public string ICCID{get;set;}
        //public string NetType { get; set; }
        //public string RSSI { get; set; }
        //public string RSRQ { get; set; }
        //public string RSRP { get; set; }
        public string SNR { get; set; }
        public string CPSI { get; set; }
        public string Time { get; set; }
    }
}
