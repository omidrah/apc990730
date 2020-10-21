using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class TestResult
    {
        public int Id { get; set; }
        public int? TestId { get; set; }
        public double? Lat { get; set; }
        public double? Long { get; set; }
        public int? Mcc { get; set; }
        public int? Mnc { get; set; }
        public int? Bsic { get; set; }
        public string FregBand { get; set; }
        public int? Pci { get; set; }
        public int? Cid { get; set; }
        public int? Uarfcn { get; set; }
        public int? Earfcn { get; set; }
        public int? Arfcn { get; set; }
        public int? Dlbw { get; set; }
        public int? Lac { get; set; }
        public int? Ulbw { get; set; }
        public int? Rssnr { get; set; }
        public int? Ta { get; set; }
        public int? Psc { get; set; }
        public int? Txpower { get; set; }
        public int? Pid { get; set; }
        public int? Ssc { get; set; }
        public int? Tac { get; set; }
        public double? Rxlevel { get; set; }
        public double? Ecio { get; set; }
        public double? Rsrq { get; set; }
        public int? Ber { get; set; }
        public double? Rscp { get; set; }
        public double? Rsrp { get; set; }
        public string Layer3Messages { get; set; }
        public double? Rssi { get; set; }
        public int? Ovfsf { get; set; }
        public int? ActiveSetNumber { get; set; }
        public int? Rxqual { get; set; }
        public double? Throughput { get; set; }
        public int? SystemMode { get; set; }
        public double? Delay { get; set; }
        public int? NumOfPacketSent { get; set; }
        public int? NumOfPacketReceived { get; set; }
        public int? NumOfPacketLost { get; set; }
        public double? Rtt { get; set; }
        public double? MinRtt { get; set; }
        public double? AvgRtt { get; set; }
        public double? MaxRtt { get; set; }
        public double? Mdev { get; set; }
        public string Ping { get; set; }
        public string Operator { get; set; }
        public string TraceRoute { get; set; }
        public string Hop1 { get; set; }
        public double? Hop1Rtt { get; set; }
        public string Hop2 { get; set; }
        public double? Hop2Rtt { get; set; }
        public string Hop3 { get; set; }
        public double? Hop3Rtt { get; set; }
        public string Hop4 { get; set; }
        public double? Hop4Rtt { get; set; }
        public string Hop5 { get; set; }
        public double? Hop5Rtt { get; set; }
        public string Hop6 { get; set; }
        public double? Hop6Rtt { get; set; }
        public string Hop7 { get; set; }
        public double? Hop7Rtt { get; set; }
        public string Hop8 { get; set; }
        public double? Hop8Rtt { get; set; }
        public string Hop9 { get; set; }
        public double? Hop9Rtt { get; set; }
        public string Hop10 { get; set; }
        public double? Hop10Rtt { get; set; }
        public bool? IsGroup { get; set; }
        public double? ElapsedTime { get; set; }
        public double? AvrgSpeed { get; set; }
        public double? Speed { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateDateFa { get; set; }
        public int? MachineId { get; set; }
        public string MachineName { get; set; }
        public int? DefinedTestId { get; set; }
        public string DefinedTestName { get; set; }
        public short? SelectedSim { get; set; }
        public DateTime? BeginDateTest { get; set; }
        public DateTime? EndDateTest { get; set; }
        public string FileName { get; set; }
        public int? FileSize { get; set; }
        public DateTime RegisterDate { get; set; }
    }
}
