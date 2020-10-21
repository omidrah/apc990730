using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ActiveProbe.Domain.Models;
using ActiveProbe.Utils.ViewModel;

namespace ActiveProbe.Services.Interfaces
{
    public interface IDefinedTestMachineService:IGenericService<DefinedTestMachine>
    {
        /// <summary>
        /// تست های تعریف شده برای یک ماشین خاص
        /// </summary>
        /// <param name="machineId">آی دی ماشین</param>        
        /// <returns></returns>
        object GetMachineWithDefinedTest(int machineId);
        /// <summary>
        /// بررسی وجود تست انفرادی برای حداقل یکی از دستگاه های گروه ارسالی 
        /// یا پدران گروه ارسالی
        /// </summary>
        /// <param name="machineGroupId">ID گروه ارسالی</param>
        /// <param name="beginDate">تاریخ شروع تست</param>
        /// <param name="endDate">تاریخ پایان تست</param>
        /// <returns></returns>
        int IsDefinedTestForMachineAndParent(IList<int> MachineAndParentId, DateTime BeginDate, DateTime EndDate);
        /// <summary>
        /// غیر فعال سازی تست انفرادی برای تمامی دستگاه های گروه ارسالی 
        /// یا پدران گروه ارسالی
        /// </summary>        
        /// <param name="machineGroupId">ID گروه ارسالی</param>
        /// <param name="beginDate">تاریخ شروع تست</param>
        /// <param name="endDate">تاریخ پایان تست</param>
        /// <returns></returns>
        Task<int> DeactivateTestForMachineInGroupAndParent(IList<int> MachineAndParentId, DateTime BeginDate, DateTime EndDate);
        /// <summary>
        /// غیر فعال سازی تست انفرادی برای تمامی دستگاه های گروه ارسالی 
        /// یا پدران گروه ارسالی
        /// سپس ذخیره تست گروهی
        /// با استفاده از Transaction
        /// </summary>
        /// <param name="definedTestMachineGroup">تست گروهی</param>
        /// <returns></returns>
        Task<int> DeactivateTestForMachineAndDefinedTestMachineGroup(DefinedTestMachineGroupVm definedTestMachineGroup);

        /// <summary>
        /// دریافت وضعیت دستگاه و وضعیت تست دستگاه
        /// </summary>
        /// <param name="machineId"></param>
        /// <returns></returns>
        Task<MachineVm> MachineStatusDetail(int machineId);

        Task<APIResult<bool>> CreateNia(DefinedTestMachineVm test, bool replace);

        /// <summary>
        /// گرفتن تست های دستگاه ها
        /// </summary>
        /// <param name="machineIds"></param>
        /// <param name="beginDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        List<DefinedTestMachine> GetDefinedTestMachine(List<int> machineIds, DateTime beginDate, DateTime endDate);

        APIResult<bool> deactiveDefinedTestMachines(List<DefinedTestMachine> definedTestMachines, List<DefinedTestMachine> definedTestMachineGroups);

    }
}