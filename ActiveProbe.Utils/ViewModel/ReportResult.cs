using System;

namespace ActiveProbe.Utils.ViewModel
{
    //Relation between DefinedTests and machines

    public class ReportResult
    {
        public string DeviceName { get; set; } //retrun machineName
        public string TestName { get; set; }   //return Defined Test Name
        public DateTime? DateTime { get; set; } //return CreateDate
        public string PersianDateTime { get; set; } //return CreateDateFa        
        public Int16? SimNubmer { get; set; } //return SIMSelected
        public double? Lat { get; set; }
        public double? Long { get; set; }       
        public int? MCC { get; set; }
        public int? MNC { get; set; }
        public int? BSIC { get; set; }
        public string FregBand { get; set; }
        public int? PCI { get; set; }
        public int? CID { get; set; }
        public int? UARFCN { get; set; }
        public int? DLBW { get; set; }
        public int? LAC { get; set; }
        public int? ULBW { get; set; }
        public int? BCCH { get; set; }
        public int? RSSNR { get; set; }
        public int? TA { get; set; }
        public int? PSC { get; set; }
        public int? EARFCN { get; set; }
        public int? TXPower { get; set; }
        public int? SSC { get; set; }
        public int? TAC { get; set; }
        public double? RXLevel { get; set; }
        public double? ECIO { get; set; }
        public double? RSRQ { get; set; }
        public int? BER { get; set; }
        public double? RSCP { get; set; }
        public double? RSRP { get; set; }
        public string Layer3Messages { get; set; }
        public double? RSSI { get; set; }
        public int? OVSFCode { get; set; }
        public int? ACtiveSetNumber { get; set; }
        public int? RXQual { get; set; }
        public double? Throughput { get; set; }
        public int? SystemMode { get; set; }
        public double? RTT { get; set; }
        public double? Delay { get; set; }
        public int? NumOfPacketSent { get; set; }
        public int? NumOfPacketReceived { get; set; }
        public int? NumOfPacketLost { get; set; }
        public double? AVGRTT { get; set; }
        public string Ping { get; set; }
        public string TraceRoute { get; set; }
        public bool IsGroup { get; set; }
        public Int16? SIM { get; set; }
        // public int? machineId { get; set; } 
    }
}