using System.Collections;
using System.Collections.Generic;
using ActiveProbe.Domain.Models;

namespace ActiveProbe.Services.Interfaces
{
    public interface IMachineGroupService:IGenericService<MachineGroup>
    {
        //get  machineId, and return list of parents and machineId
        /// <summary>
        ///  گرفتن یک ماشین و برگرداندن لیستی شامل آن ماشین و پدرانش
        /// </summary>
        /// <param name="machineId">آی دی ماشین</param>        
        /// <param name="ParentIds">  لیست پدران گروه</param>
        /// <returns></returns> 
         IList<int> GetMachineParent(int machineId,IList<int> ParentIds);
        //get groupId, and return list of parents
        /// <summary>
        ///  گرفتن یک گروه و برگرداندن لیست پدران آن
        /// </summary>
        /// <param name="grpId">آی دی گروه</param>        
        /// <param name="ParentIds">  لیست پدران گروه</param>
        /// <returns></returns> 
         IList<int> GetGroupParent(int grpId,IList<int> ParentIds);

        IList<int> GetGroupChilds(int grpId, IList<int> childIds);
    }
    
}