namespace ActiveProbe.Utils.ViewModel
{
    public class MachineByGroupIdVm
    {
        public int Id { get; set; }
        public string Identifier { get; set; }
        public string Name { get; set; }
        public string SimcardNo { get; set; }
        public string InstallLocation { get; set; }
        public int? MachineTypeId { get; set; }
        public int? MachineGroupId { get; set; }
        public string MachineTypeTitle { get; set; }
        public string MachineGroupTitle { get; set; }
        public string IMEI1 { get; set; }
        public string IMEI2 { get; set; }
        public string  SerialNo { get; set; }
        public string HostName { get; set; }
        public string TimeZone { get; set; }
        public bool groupChecked { get; set; }
    }
}