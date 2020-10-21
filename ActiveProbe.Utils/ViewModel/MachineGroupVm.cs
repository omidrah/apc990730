namespace ActiveProbe.Utils.ViewModel
{
    //a tree structure for machine groups
    public class MachineGroupVm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? ParrentId { get; set; }
    }
}
