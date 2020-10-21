namespace ActiveProbe.Utils.ViewModel
{
    /// <summary>
    /// for generate Kml File
    /// </summary>
    public class KmlResult
    {
        public int? machineId { get; set; }
        public double? Lat { get; set; }
        public double? Long { get; set; }
        public string ParamKml { get; set; }
        public double? paramkmlVal { get; set; }
    }
}