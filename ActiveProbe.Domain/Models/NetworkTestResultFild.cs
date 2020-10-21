using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class NetworkTestResultFild
    {
        public int Id { get; set; }
        public short NetworkId { get; set; }
        public string TestFild { get; set; }
        public DateTime CreateDate { get; set; }

        public virtual Network Network { get; set; }
    }
}
