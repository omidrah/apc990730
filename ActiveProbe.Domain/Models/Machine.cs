using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class Machine
    {
        public Machine()
        {
            Command = new HashSet<Command>();
            DefinedTestMachine = new HashSet<DefinedTestMachine>();
            MachineVersion = new HashSet<MachineVersion>();
            MachineLocations = new HashSet<MachineLocations>();
        }

        public int Id { get; set; }
        public string Imei1 { get; set; }
        public string Imei2 { get; set; }
        public string Identifier { get; set; }
        public string SerialNo { get; set; }
        public string Name { get; set; }
        public string SimcardNo { get; set; }
        public string InstallLocation { get; set; }
        public int? MachineTypeId { get; set; }
        public int? MachineGroupId { get; set; }
        public bool? IsConnected { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? IsRead { get; set; }
        public string Version { get; set; }
        public string HostName { get; set; }
        public string TimeZone{ get; set; }

        public virtual MachineGroup MachineGroup { get; set; }
        public virtual MachineType MachineType { get; set; }
        public virtual ICollection<Command> Command { get; set; }
        public virtual ICollection<DefinedTestMachine> DefinedTestMachine { get; set; }
        public virtual ICollection<MachineVersion> MachineVersion { get; set; }
        public virtual ICollection<MachineLocations> MachineLocations{get;set;}
    }
}
