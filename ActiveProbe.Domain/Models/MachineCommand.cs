using ActiveProbe.Domain.AuditableEntity;
using ActiveProbe.Domain.Enums;
using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineCommand : IAuditableEntity
    {
        public Guid Id { get; set; }        
        public string Command { get; set; }
        public string Object { get; set; }
        public int ObjectId { get; set; }
        public int MachineId { get; set; }        
        public string Description { get; set; }        
        public CommandStatus Status { get; set; }
    }

    
}
