using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using ActiveProbe.Utils.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ActiveProbe.Services
{
    public class DefinedTestMachineGroupService : GenericService<DefinedTestMachineGroup>, IDefinedTestMachineGroupService
    {
        DbSet<MachineGroup> _machineGroup;
        DbSet<DefinedTest> _definedTest;
        DbSet<TestType> _testtype;
        DbSet<TestData> _testData; DbSet<TestDataType> _testDataType;
        DbSet<Ottservice> _ott; DbSet<OttserviceTest> _otts;
        DbSet<DefinedTestMachine> _definedTestmachine;

        private IMachineGroupService _machineGroupService;
        private IDefinedTestMachineService _definedTestMachineService;
        private IMachineService _machineService;

        public DefinedTestMachineGroupService(
            IUnitOfWork uow,
            IMachineGroupService machineGroupService,
            IDefinedTestMachineService definedTestMachineService,
            IMachineService machineService
            ) : base(uow)
        {
            _machineGroup = _uow.Set<MachineGroup>();
            _definedTest = _uow.Set<DefinedTest>();
            _testtype = _uow.Set<TestType>();
            _testData = _uow.Set<TestData>();
            _testDataType = _uow.Set<TestDataType>();
            _ott = _uow.Set<Ottservice>();
            _otts = _uow.Set<OttserviceTest>();

            _definedTestmachine = _uow.Set<DefinedTestMachine>();

            _machineGroupService = machineGroupService;
            _definedTestMachineService = definedTestMachineService;
            _machineService = machineService;
        }
        //Select DefinedTests related with a MachineGroup
        public object GetGroupWithDefinedTest(int groupId)
        {
            var d = from dtm in _tEntities
                    join mg in _machineGroup on dtm.MachineGroupId equals mg.Id
                    join dt in _definedTest on dtm.DefinedTestId equals dt.Id
                    join tt in _testtype on dt.TestTypeId equals tt.Id
                    join td in _testData on dt.TestDataId equals td.Id
                            into TestData
                    from TestDataVal in TestData.DefaultIfEmpty()
                    join tdt in _testDataType on dt.TestDataTypeId equals tdt.Id
                            into TestDataType
                    from TestDataTypeVal in TestDataType.DefaultIfEmpty()
                    join ott in _ott on dt.OttserviceId equals ott.Id
                            into ottData
                    from ottDataVal in ottData.DefaultIfEmpty()
                    join otts in _otts on dt.OttserviceTestId equals otts.Id
                            into ottsData
                    from ottsDataVal in ottsData.DefaultIfEmpty()
                    where dtm.MachineGroupId == groupId
                    orderby dtm.Id descending
                    select new
                    {
                        Id = dtm.Id,
                        MachineTitle = mg.Title,
                        DefinedTestId = dt.Id,
                        MachineGroupId = mg.Id,
                        IsActive = dtm.IsActive,
                        SIM = dtm.Sim,
                        BeginDate = dtm.BeginDate,
                        EndDate = dtm.EndDate,
                        DefinedTestTitle = dt.Title,
                        TestTypeTitle = showTestTypeTitle(tt.Id, tt.Title, dt, ottDataVal, ottsDataVal),

                        Editable = dtm.BeginDate > DateTime.Now
                    };

            return d;
        }
        public int IsDefinedTestForMachineAndParent(IList<int> MachineAndParentId, DateTime BeginDate, DateTime EndDate)
        {
            //var ddd = (from ids in MachineAndParentId
            //           join dtmg in _tEntities on ids equals dtmg.MachineGroupId
            //           where BeginDate <= dtmg.EndDate && EndDate >= dtmg.BeginDate &&
            //           dtmg.IsActive == true &&
            //           dtmg.FinishTime == null
            //           select dtmg.Id).Count();
            //return ddd;


            var dd = (from ids in MachineAndParentId
                      join dtmG in _tEntities on ids equals dtmG.MachineGroupId
                      join dtm in _definedTestmachine on dtmG.Id equals dtm.TestGroupId
                      where BeginDate <= dtm.EndDate && EndDate >= dtm.BeginDate &&
                            dtm.IsActive == true &&
                            dtm.FinishTime == null
                      select dtmG.Id).ToList();
            return dd.Count;

        }
        //equality above 
        public int IsDefinedTestForMachineAndParentByQuery(int machineID, DateTime BeginDate, DateTime EndDate)
        {
            string sql = $"WITH parent AS " +
                       $"( " +
                       $"SELECT 1 as ordered,[dbo].[MachineGroup].* " +
                       $"FROM[dbo].[MachineGroup] " +
                       $"join Machine on MachineGroup.Id = Machine.MachineGroupId " +
                       $"WHERE Machine.id = {machineID} " +
                       $"UNION ALL " +
                       $"SELECT  parent.ordered + 1 as ordered, childs.* " +
                       $"FROM[dbo].[MachineGroup] as childs JOIN parent  ON childs.Id = parent.ParrentId " +
                       $") " +
                       $"SELECT count(*) " +
                       $"FROM  parent as Groups " +
                       $"join DefinedTestMachineGroup as DTMG on Groups.Id = DTMG.MachineGroupId " +
                       $"WHERE(@beginDate <= {BeginDate} and  @endDate >= {EndDate})" +
                       $"and DTMG.IsActive = 1";
            return _tEntities.FromSqlInterpolated($@"{sql}").Count();
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

        public async Task<APIResult<bool>> CreateNia(DefinedTestMachineGroupVm test, bool replace)
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            var definedTestMachines = new List<DefinedTestMachine>();
            var parentDefinedTestMachineGroup = new List<DefinedTestMachineGroup>();


            //if edit mode find item and delete it and create new item
            if (test.Id > 0)
            {
                var testMachineGroup = Find(t => t.Id == test.Id);
                if (testMachineGroup != null)
                {
                    var testMachine = _definedTestMachineService.GetAll(t => t.TestGroupId == test.Id);
                    if (testMachine!=null)
                        _definedTestMachineService.Delete(testMachine);
                    Delete(testMachineGroup);
                }
            }


            var parentIds = _machineGroupService.GetGroupParent(test.MachineGroupId, new List<int>());


            var machines = _machineService.GetAll(t => parentIds.Contains(t.MachineGroupId ?? 0)).ToList();

            if (machines.Count > 0)
            {
                var machineIds = machines.Select(t => t.Id).ToList();//فهرست آی دی های دستگاه های گروه و گروه پدران

                //فهرست تست های انفرادی دستگاه ها
                definedTestMachines = _definedTestMachineService.GetDefinedTestMachine(machineIds, test.BeginDate, test.EndDate);//, 0);


                parentDefinedTestMachineGroup = GetDefinedTestMachineGroup(parentIds.ToList(), test.BeginDate, test.EndDate);
            }

            var childsIds = _machineGroupService.GetGroupChilds(test.MachineGroupId, new List<int>()).ToList();

            var childMachines = _machineService.GetAll(t => childsIds.Contains(t.MachineGroupId ?? 0)).ToList();
            var childMachineIds = childMachines.Select(t => t.Id).ToList();//فهرست آی دی های دستگاه های گروه و فرزندان گروه


            var definedTestMachineVmForChild = new List<DefinedTestMachineVm>();

            if (childMachineIds.Count > 0)
            {
                childMachineIds.ForEach(t =>
                {
                    definedTestMachineVmForChild.Add(new DefinedTestMachineVm
                    {

                        MachineId = t,

                        BeginDate = test.BeginDate,
                        EndDate = test.EndDate,
                        IsActive = test.IsActive,
                        Status = false,
                        SIM = test.SIM,
                        DefinedTestId = test.DefinedTestId,
                        TestGroupId = test.MachineGroupId
                    });
                });
            }


            if (replace)
            {
                if (definedTestMachines.Count > 0 || parentDefinedTestMachineGroup.Count > 0)
                {
                    DeactiveDefinedTestMachineGroups(parentDefinedTestMachineGroup);
                    _definedTestMachineService.deactiveDefinedTestMachines(definedTestMachines, new List<DefinedTestMachine>());
                }
                result = saveDefinedTestMachineGroup(test, definedTestMachineVmForChild);
            }
            else
            {
                if (definedTestMachines.Count > 0 || parentDefinedTestMachineGroup.Count > 0)
                {
                    result.Succeed = true;
                    result.Result = false;

                    if (definedTestMachines.Count > 0 && parentDefinedTestMachineGroup.Count > 0)
                        result.Message = "InterferenceDeviceTestAndGroupTestDateRangeConfirmMessage";
                    else if (definedTestMachines.Count > 0)
                        result.Message = "InterferenceTestDateRangeConfirmMessage";
                    else result.Message = "InterferenceGroupTestDateRangeConfirmMessage";
                }
                else
                {
                    result = saveDefinedTestMachineGroup(test, definedTestMachineVmForChild);

                }
            }
            return result;
        }


        /// <summary>
        /// فهرست تست های گروهی
        /// </summary>
        /// <param name="testGroupId"></param>
        /// <param name="beginDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        public List<DefinedTestMachineGroup> GetDefinedTestMachineGroup(List<int> parentIds, DateTime beginDate, DateTime endDate)
        {
            try
            {
                var testMachineGroups = _tEntities.Where(t => beginDate <= t.EndDate && endDate >= t.BeginDate && (t.IsActive ?? false) && t.FinishTime == null && parentIds.Contains(t.MachineGroupId ?? 0)).ToList();
                return testMachineGroups;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public APIResult<bool> DeactiveDefinedTestMachineGroups(List<DefinedTestMachineGroup> definedTestMachineGroups)
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

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

        private APIResult<bool> saveDefinedTestMachineGroup(DefinedTestMachineGroupVm test, List<DefinedTestMachineVm> definedTestMachineVms)
        {

            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            var definedTestMachineGroup = new DefinedTestMachineGroup
            {
                BeginDate = test.BeginDate,
                EndDate = test.EndDate,
                IsActive = test.IsActive,
                Status = false,
                Sim = test.SIM,
                DefinedTestId = test.DefinedTestId,
                MachineGroupId = test.MachineGroupId,

                DefinedTestMachine = new List<DefinedTestMachine>()
            };

            var definedTestMachines = definedTestMachineVms.Select(t => new DefinedTestMachine
            {
                BeginDate = t.BeginDate,
                EndDate = t.EndDate,
                IsActive = t.IsActive,
                Status = false,
                Sim = t.SIM,
                DefinedTestId = t.DefinedTestId,
                MachineId = t.MachineId
            }).ToList();


            definedTestMachines.ForEach(t =>
            {
                definedTestMachineGroup.DefinedTestMachine.Add(t);
            });
            _tEntities.Add(definedTestMachineGroup);

            _uow.SaveChangesAsync().ConfigureAwait(false);

            result.Succeed = true;
            result.Result = true;
            result.Message = "";

            return result;
        }

        #endregion

    }
}