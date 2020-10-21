using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class CommandOnMedia
    {
        public int Id { get; set; }
        public long CommandId { get; set; }
        public byte MediaType { get; set; }
        public byte[] CommandBytes { get; set; }
        public virtual Command Command { get; set; }
    }
}
