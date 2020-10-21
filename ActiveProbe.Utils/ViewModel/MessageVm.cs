using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActiveProbe.Utils.ViewModel
{
    public class MessageVm
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int Machineid { get; set; }
        public string Imei1 { get; set; }
        public string Imei2 { get; set; }
        public byte? Modem { get; set; }
        public byte? Sim { get; set; }
        public string body { get; set; }
        //public string operator { get; set; }
        public string SimBody { get; set; }
        public string Iccid { get; set; }
        public string msg { get; set; }
        public byte? Status { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? DateFromDevice { get; set; }

        public string SendMessage { get; set; }
        public string ReceiveMessage { get; set; }


    }
}