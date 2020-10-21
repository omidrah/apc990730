
using System;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineUssd
     {
        public int Id { get; set; }
        public int? ParentId  { get; set; }
        public int Machineid { get; set; }
        public string Imei1 { get; set; }
        public string Imei2 { get; set; }
        public byte? Modem { get; set; }
        public byte? Sim { get; set; }
        public string body { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Operator { get; set; }
        public string SimBody { get; set; }
        public string Iccid { get; set; }
        public DateTime? DateFromDevice { get; set; }
        public byte? Status { get; set; }
        public string msg { get; set; }
    }   
}