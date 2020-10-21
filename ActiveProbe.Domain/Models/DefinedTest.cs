using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class DefinedTest
    {
        public DefinedTest()
        {
            DefinedTestMachine = new HashSet<DefinedTestMachine>();
            DefinedTestMachineGroup = new HashSet<DefinedTestMachineGroup>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
        public bool Layer3Messages { get; set; }
        public short RepeatTypeId { get; set; }
        public int? RepeatTime { get; set; }
        public int? RepeatCount { get; set; }
        public int MeasurementInterval { get; set; }
        public short TestTypeId { get; set; }
        public int? UsualCallDuration { get; set; }
        public int? UsualCallWaitTime { get; set; }
        public string UsualCallNumber { get; set; }
        public short? TestDataId { get; set; }
        public short? TestDataTypeId { get; set; }
        public string TestDataServer { get; set; }
        public string TestDataUserName { get; set; }
        public string TestDataPassword { get; set; }
        public string TestDataDownloadFileAddress { get; set; }
        public int? TestDataUploadFileSize { get; set; }
        public short? IptypeId { get; set; }
        public short? OttserviceId { get; set; }
        public short? OttserviceTestId { get; set; }
        public short NetworkId { get; set; }
        public short? BandId { get; set; }
        public bool? SaveLogFile { get; set; }
        public short? LogFilePartitionTypeId { get; set; }
        public short? LogFilePartitionTime { get; set; }
        public short? LogFilePartitionSize { get; set; }
        public int? LogFileHoldTime { get; set; }
        public short? NumberOfPings { get; set; }
        public short? PacketSize { get; set; }
        public short? InternalTime { get; set; }
        public int? ResponseWaitTime { get; set; }
        public short? Ttl { get; set; }
        public int? FileSize { get; set; }
        public int? TraceRouteHubCount { get; set; }

        public virtual TestType TestType { get; set; }
        public virtual ICollection<DefinedTestMachine> DefinedTestMachine { get; set; }
        public virtual ICollection<DefinedTestMachineGroup> DefinedTestMachineGroup { get; set; }
    }
}
