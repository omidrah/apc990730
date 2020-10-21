using System;
namespace ActiveProbe.Domain.Models{
    public class ReceivedData{
        public byte ChannelId { get; set; }
        public int ClientId { get; set; }   
        public DateTime DT { get; set; }
    }
}