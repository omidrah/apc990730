using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class Network
    {
        public Network()
        {
            NetworkTestResultFild = new HashSet<NetworkTestResultFild>();
        }

        public short Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<NetworkTestResultFild> NetworkTestResultFild { get; set; }
    }
}
