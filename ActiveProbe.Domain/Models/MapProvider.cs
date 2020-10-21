using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class MapProvider
    {
        public int Id { get; set; }
        public string ProviderName { get; set; }
        public bool IsCustom { get; set; }
        public byte PreparationMode { get; set; }
        public bool IsTransparent { get; set; }
    }
}
