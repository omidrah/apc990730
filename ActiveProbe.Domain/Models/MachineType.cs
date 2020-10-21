using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MachineType
    {
        public MachineType()
        {
            Machine = new HashSet<Machine>();
        }

        public int Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Machine> Machine { get; set; }
    }
}
