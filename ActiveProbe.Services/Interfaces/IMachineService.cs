using System.Collections.Generic;
using System.Threading.Tasks;
using ActiveProbe.Domain.Models;
using ActiveProbe.Utils.ViewModel;

namespace ActiveProbe.Services.Interfaces
{
    public interface IMachineService:IGenericService<Machine>
    {   
        // get all machine in custom vm 
         IEnumerable<MachineVm> GetMachines();
          //get machine by groupId
          IEnumerable<MachineByGroupIdVm> GetMachineWithMachineGroup(int machinGroupId);
          MachineVm FindByDetail(int machineId);
    }
}