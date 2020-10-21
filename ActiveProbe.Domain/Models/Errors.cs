using System;

namespace ActiveProbe.Domain.Models
{
    public partial class Errors
    {
        public long Id { get; set; }
        public DateTime Date { get; set; }
        public string Business { get; set; }
        public string Module { get; set; }
        public string Methode { get; set; }
        public string Message { get; set; }
        public string ExtraData { get; set; }
        public string RawError { get; set; }
    }
}
