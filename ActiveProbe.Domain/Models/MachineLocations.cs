using System;

namespace ActiveProbe.Domain.Models{
 public class MachineLocations{
    
     public Guid Id { get; set; }
     public int machineId { get; set; }
     public DateTime? CreatedDate { get; set; }
     public decimal? Latitude { get; set; }
     public decimal? Longitude {get;set;}
     public decimal? CpuTemperature { get; set; }
     public DateTime? DateFromDevice { get; set; }
     public decimal? Speed { get; set; }
     public virtual Machine Machine{get;set;}
 }

}
