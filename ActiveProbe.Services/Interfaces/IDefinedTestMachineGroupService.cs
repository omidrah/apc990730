using System;
using System.Reflection.PortableExecutable;
using System.Collections.Generic;
using ActiveProbe.Domain.Models;
using ActiveProbe.Utils.ViewModel;
using System.Threading.Tasks;

namespace ActiveProbe.Services.Interfaces
{
    public interface IDefinedTestMachineGroupService:IGenericService<DefinedTestMachineGroup>
    {   
         object GetGroupWithDefinedTest(int groupId);
         //return count of Test Assign To machine and Parent , if Exists
         int IsDefinedTestForMachineAndParent(IList<int> MachineAndParentId,DateTime beginDate,DateTime endDate);         
         //return count of Test Assign To machine and Parent , if Exists by Direction Query 
         int IsDefinedTestForMachineAndParentByQuery(int machineID, DateTime BeginDate, DateTime EndDate);

        Task<APIResult<bool>> CreateNia(DefinedTestMachineGroupVm test, bool replace);

        List<DefinedTestMachineGroup> GetDefinedTestMachineGroup(List<int> parentIds, DateTime beginDate, DateTime endDate);

        APIResult<bool> DeactiveDefinedTestMachineGroups(List<DefinedTestMachineGroup> definedTestMachineGroups);
    }
}