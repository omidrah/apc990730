using System;

namespace ActiveProbe.Domain.Models
{
    public partial class RecievedCommand
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}