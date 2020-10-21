
using System;
using System.Linq;
using System.Collections.Generic;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using System.Threading.Tasks;
using ActiveProbe.Utils.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ActiveProbe.Services
{
    public class DefinedTestMachineService : GenericService<DefinedTestMachine>, IDefinedTestMachineService
    {
        DbSet<DefinedTestMachine> _definedTestmachine;
        DbSet<MachineConnectionHistory> _mConnectionHistory;

        private IMachineGroupService _machineGroupService;
        private IDefinedTestMachineGroupService _definedTestMachineGroupService;
        private IMachineService _machineService;

        public DefinedTestMachineService(
            IUnitOfWork uow,
            IMachineGroupService machineGroupService,
            //IDefinedTestMachineGroupService definedTestMachineGroupService,
            IMachineService machineService
            ) : base(uow)
        {
            _definedTestmachine = _uow.Set<DefinedTestMachine>();
            _mConnectionHistory = _uow.Set<MachineConnectionHistory>();

            _machineGroupService = machineGroupService;
            _machineService = machineService;

            //_definedTestMachineGroupService = definedTestMachineGroupService;
            //"System.InvalidOperationException: A circular dependency was detected for the service of type 'ActiveProbe.Services.Interfaces.IDefinedTestMachineService' .Services.Interfaces.IDefinedTestMachineService(ActiveProbe.Services.DefinedTestMachineService)

            _definedTestMachineGroupService = new DefinedTestMachineGroupService(uow, _machineGroupService, this, _machineService);
        }
        public object GetMachineWithDefinedTest(int machineId)
        {
            var d = from dtm in _tEntities
                    join m in _uow.Set<Machine>() on dtm.MachineId equals m.Id
                    join dt in _uow.Set<DefinedTest>() on dtm.DefinedTestId equals dt.Id
                    join tt in _uow.Set<TestType>() on dt.TestTypeId equals tt.Id
                    join td in _uow.Set<TestData>() on dt.TestDataId equals td.Id
                      into TestData
                    from TestDataVal in TestData.DefaultIfEmpty()
                    join tdt in _uow.Set<TestDataType>() on dt.TestDataTypeId equals tdt.Id
                      into TestDataType
                    from TestDataTypeVal in TestDataType.DefaultIfEmpty()
                    join otts in _uow.Set<Ottservice>() on dt.OttserviceId equals otts.Id
                      into OTTservice
                    from OTTserviceVal in OTTservice.DefaultIfEmpty()
                    join ottst in _uow.Set<OttserviceTest>() on dt.OttserviceTestId equals ottst.Id
                      into OTTserviceTest
                    from OTTserviceTestVal in OTTserviceTest.DefaultIfEmpty()
                    where m.Id == machineId
                    orderby dtm.Id descending
                    select new
                    {
                        Id = dtm.Id,
                        DefinedTestId = dt.Id,
                        MachineId = m.Id,
                        IsActive = dtm.IsActive,
                        SIM = dtm.Sim,
                        BeginDate = dtm.BeginDate,
                        EndDate = dtm.EndDate,
                        MachineTitle = m.Name,
                        TestTypeTitle = showTestTypeTitle(tt.Id, tt.Title, dt, OTTserviceVal, OTTserviceTestVal),
                        DefinedTestTitle = dt.Title,
                        IMEI1 = m.Imei1,
                        IMEI2 = m.Imei2,
                        TestCode = dt.Id,

                        Status = dtm.Status == false ? "NotReceivedByDevice" :

                                 dtm.Status == true && dtm.FinishTime != null ? "Finished" :

                                 dtm.Status == true && DateTime.Now < dtm.BeginDate && dtm.FinishTime == null ? "Waiting" :
                                 //dtm.Status == true && DateTime.Now < dtm.BeginDate && dtm.FinishTime != null ? "Overwritten" :

                                 dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime == null ? "Running" :
                                 //dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime != null ? "Overwritten" :

                                 dtm.Status == true && dtm.EndDate < DateTime.Now && dtm.FinishTime == null ? "NotReceivedFromDevice" : "",


                        FinishTime = dtm.FinishTime
                    };
            return d;
        }
        public static string showTestTypeTitle(int testTypeId, string testTypeTitle, DefinedTest dt, Ottservice ott, OttserviceTest otts)
        {
            string res = string.Empty;
            switch (testTypeId)
            {
                case 1:
                    res = $"{testTypeTitle} Duration:{dt.UsualCallDuration} CallNumber:{dt.UsualCallNumber} WaitTime:{dt.UsualCallWaitTime} ";
                    break;
                case 2:
                case 3:
                    res = $"{testTypeTitle}";
                    break;
                case 4:
                    res = $"{testTypeTitle} {dt.Title} [ URL/IP :{dt.TestDataServer}] ";
                    break;
                case 5:
                    res = $"{testTypeTitle} [{ott.Title} {otts.Title}] ";
                    break;
            }
            return res;
        }
        public int IsDefinedTestForMachineAndParent(IList<int> MachineAndParentId, DateTime BeginDate, DateTime EndDate)
        {

            try
            {
                var dd = (from ids in MachineAndParentId
                          join dtm in _tEntities on ids equals dtm.Machine.MachineGroupId
                          where BeginDate <= dtm.EndDate && EndDate >= dtm.BeginDate
                                     && dtm.IsActive == true
                          select dtm.Id).ToList();

                return dd.Count;
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return 0;
        }
        public async Task<int> DeactivateTestForMachineInGroupAndParent(IList<int> MachineAndParentId, DateTime BeginDate, DateTime EndDate)
        {
            var dd = (from g in MachineAndParentId
                      join m in _uow.Set<Machine>() on g equals m.Id
                      join dtm in _tEntities on m.Id equals dtm.MachineId
                      where BeginDate <= dtm.EndDate && EndDate >= dtm.BeginDate
                              && dtm.IsActive == true
                      select dtm);
            foreach (var item in dd)
            {
                item.IsActive = false;
            }
            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }
        public async Task<int> DeactivateTestForMachineAndDefinedTestMachineGroup(DefinedTestMachineGroupVm definedTestMachineGroup)
        {
            var selectedGrp = _uow.Set<DefinedTestMachineGroup>().FirstOrDefault(x => (definedTestMachineGroup.BeginDate <= x.EndDate &&
                    definedTestMachineGroup.EndDate >= x.BeginDate) && x.MachineGroupId == definedTestMachineGroup.MachineGroupId
                    && x.IsActive == true);
            var allRec = _tEntities.Where(x => x.TestGroupId == selectedGrp.Id);
            foreach (var item in allRec)
            {
                item.IsActive = false;
            }
            var allGrpRec = _uow.Set<DefinedTestMachineGroup>().Where(x => (definedTestMachineGroup.BeginDate <= x.EndDate &&
                   definedTestMachineGroup.EndDate >= x.BeginDate) && x.MachineGroupId == definedTestMachineGroup.MachineGroupId
                   && x.IsActive == true);

            foreach (var tmp in allGrpRec)
            {
                tmp.IsActive = false;
            }

            _uow.Set<DefinedTestMachineGroup>().Add(new DefinedTestMachineGroup
            {
                BeginDate = definedTestMachineGroup.BeginDate,
                EndDate = definedTestMachineGroup.EndDate,
                IsActive = definedTestMachineGroup.IsActive,
                DefinedTestId = definedTestMachineGroup.DefinedTestId,
                MachineGroupId = definedTestMachineGroup.MachineGroupId,
                Sim = definedTestMachineGroup.SIM
            });

            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }
        public async Task<MachineVm> MachineStatusDetail(int machineId)
        {
            var dtm = _definedTestmachine
                        .OrderByDescending(t => t.Id)
                        .FirstOrDefault(t => t.MachineId == machineId);

            var history = _mConnectionHistory
                        .OrderByDescending(t => t.CreatedDate)
                        .FirstOrDefault(t => t.MachineId == machineId);

            var machineStatus = new MachineVm()
            {
                Status = history.IsConnected,
                TestStatus = dtm.Status == false ? "NotReceivedByDevice" :
                                 dtm.Status == true && DateTime.Now < dtm.BeginDate && dtm.FinishTime == null ? "Waiting" :
                                 dtm.Status == true && DateTime.Now < dtm.BeginDate && dtm.FinishTime != null ? "Overwritten" :
                                 dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime == null ? "Running" :
                                 dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime != null ? "Overwritten" :
                                 dtm.Status == true && dtm.EndDate < DateTime.Now && dtm.FinishTime == null ? "NotReceivedFromDevice" :
                                 dtm.Status == true && dtm.EndDate < DateTime.Now && dtm.FinishTime != null ? "Finished" : ""
            };
            return machineStatus;

        }

        public async Task<APIResult<bool>> CreateNia(DefinedTestMachineVm test, bool replace)
        {

            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            var definedTestMachines = new List<DefinedTestMachine>();
            var parentDefinedTestMachineGroup = new List<DefinedTestMachineGroup>();
            var definedTestGroupMachine = new List<DefinedTestMachine>();

            //if edit mode find item and delete it and create new item
            if (test.Id>0)
            {
                var x = Find(t => t.Id == test.Id);
                if (x!=null)
                {
                    Delete(x);
                }
            }

            //ToDo :: Mostafa :: Begin Transaction

            var machine = _machineService.Find(t => t.Id == test.MachineId);

            if (machine != null)
            {

                if (machine.MachineGroupId != null)
                {
                    var parentIds = _machineGroupService.GetGroupParent(machine.MachineGroupId ?? 0, new List<int>()).ToList();
                    parentDefinedTestMachineGroup = _definedTestMachineGroupService.GetDefinedTestMachineGroup(parentIds, test.BeginDate, test.EndDate);
                    if (parentDefinedTestMachineGroup.Count > 0)
                    {
                        var patentTestIds = parentDefinedTestMachineGroup.Select(t => t.Id).ToList();//فهرست آی دی های تست های گروهی

                        var parentDefinedTestMachine = _tEntities.Where(t => patentTestIds.Contains(t.TestGroupId ?? 0))
                                                                 .ToList(); //فهرست تست های گروهی دستگاه ها 
                        definedTestGroupMachine = parentDefinedTestMachine;
                    }
                }


                //فهرست تست های انفرادی دستگاه
                var deviceTestList = GetDefinedTestMachine(new List<int> { machine.Id }, test.BeginDate, test.EndDate);

                definedTestMachines = deviceTestList;
            }

            if (replace)
            {
                if (definedTestMachines.Count > 0 || definedTestGroupMachine.Count > 0)
                {
                    deactiveDefinedTestMachines(definedTestMachines, definedTestGroupMachine);
                    _definedTestMachineGroupService.DeactiveDefinedTestMachineGroups(parentDefinedTestMachineGroup);
                }
                result = saveDefinedTestMachine(test);
            }
            else
            {
                if (definedTestMachines.Count > 0 || definedTestGroupMachine.Count > 0)
                {
                    result.Succeed = true;
                    result.Result = false;

                    if (definedTestMachines.Count > 0 && definedTestGroupMachine.Count > 0)
                        result.Message = "InterferenceDeviceTestAndGroupTestDateRangeConfirmMessage";
                    else if (definedTestMachines.Count > 0)
                        result.Message = "InterferenceTestDateRangeConfirmMessage";
                    else result.Message = "InterferenceGroupTestDateRangeConfirmMessage";
                }
                else
                {
                    result = saveDefinedTestMachine(test);
                }
            }
            return result;
        }

        /// <summary>
        /// //فهرست تست های انفرادی دستگاه
        /// </summary>
        /// <param name="machineId"></param>
        /// <param name="beginDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        public List<DefinedTestMachine> GetDefinedTestMachine(List<int> machineIds, DateTime beginDate, DateTime endDate)
        {
            var deviceTestList = GetAll(t => machineIds.Contains(t.MachineId) &&
                                             beginDate <= t.EndDate && endDate >= t.BeginDate &&
                                             t.IsActive &&
                                             t.FinishTime == null
                                        ).ToList();
            return deviceTestList;
        }
        public APIResult<bool> deactiveDefinedTestMachines(List<DefinedTestMachine> definedTestMachines, List<DefinedTestMachine> definedTestMachineGroups)
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            definedTestMachines.ForEach(t =>
            {
                t.IsActive = false;
            });

            definedTestMachineGroups.ForEach(t =>
            {
                t.IsActive = false;
            });

            _uow.SaveChangesAsync().ConfigureAwait(false);

            result.Succeed = true;
            result.Result = true;
            result.Message = "";

            return result;
        }

        #region Private Methods

        private APIResult<bool> saveDefinedTestMachine(DefinedTestMachineVm test)
        {

            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            _tEntities.Add(new DefinedTestMachine
            {
                BeginDate = test.BeginDate,
                EndDate = test.EndDate,
                IsActive = test.IsActive,
                Status = false,
                TestGroupId = null,
                Sim = test.SIM,
                DefinedTestId = test.DefinedTestId,
                MachineId = test.MachineId
            });

            _uow.SaveChangesAsync().ConfigureAwait(false);

            result.Succeed = true;
            result.Result = true;
            result.Message = "";

            return result;
        }

        #endregion

    }
}