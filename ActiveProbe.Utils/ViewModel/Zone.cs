using System.Collections.Generic;
namespace ActiveProbe.Utils.ViewModel
{
    public class ZoneVm
    {
        public int ZoneId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }
    }
    public class ZonePointVm
    {
        public int Id { get; set; }
        public int ZoneId { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
    public class ZoneKmlVm
    {
        public int Id { get; set; }
        public int ZoneId { get; set; }
        public string KmlFile { get; set; } //Url
    }
    public class ZPoint
    {
        public int ZoneId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}