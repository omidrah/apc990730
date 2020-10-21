using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class Channel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MediaType { get; set; }
        public int Timeout { get; set; }
        public int Cost { get; set; }
        public string Params { get; set; }
        public string Protocols { get; set; }
    }
}
