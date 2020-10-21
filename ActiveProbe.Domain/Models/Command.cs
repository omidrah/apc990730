using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class Command
    {
        public Command()
        {
            CommandOnMedia = new HashSet<CommandOnMedia>();
        }

        public long Id { get; set; }
        public int? MachineId { get; set; }
        public DateTime BuildDt { get; set; }
        public DateTime? SendDt { get; set; }
        public bool? IsEnabled { get; set; }
        public byte SendingScenario { get; set; }
        public bool HasResponse { get; set; }
        public Guid ConfigId { get; set; }
        public byte CommandType { get; set; }
        public string ReadableCommand { get; set; }
        public int? Timeout { get; set; }
        public byte[] Response { get; set; }
        public DateTime? ResponseDt { get; set; }
        public int? ResponseReceivedChannelId { get; set; }
        public string ReadableResponse { get; set; }
        public virtual Machine Machine { get; set; }
        public virtual ICollection<CommandOnMedia> CommandOnMedia { get; set; }
    }
}
