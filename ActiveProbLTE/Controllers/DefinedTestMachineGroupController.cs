using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.ViewModel;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActiveProbeCore.Controllers
{
    //DefinedTestMachineGroups
    [Route("api/[controller]")]
    [Authorize(Policy = ConstantPolicies.dynKkomAuthorization)]
    [DisplayName("انتساب تست به گروه")]
    [ApiController]
    public class DefinedTestMachineGroupController : ControllerBase
    {
        IDefinedTestMachineGroupService _definedtestmachinegroup;
        IDefinedTestMachineService _definedTestMachine;
        IMachineService _machine;
        IMachineGroupService _machinGrp;
        IUnitOfWork _uow;
        public DefinedTestMachineGroupController(IUnitOfWork uow,
        IDefinedTestMachineGroupService dtmgs,
        IMachineService machine,
        IMachineGroupService machineGroup,
        IDefinedTestMachineService definedTestMachine)
        {
            _uow = uow;
            _definedtestmachinegroup = dtmgs;
            _machine = machine;
            _machinGrp = machineGroup;
            _definedTestMachine = definedTestMachine;
        }

        [HttpGet]
        [Route("Details/{id}")]
        [DisplayName("جزییات")]
        public async Task<object> Details(int id)
        {
            var curRec = _definedtestmachinegroup.Find(x => x.Id == id);
            var obj = new
            {
                Id = curRec.Id,
                DefinedTestId = curRec.DefinedTestId,
                MachineGroupId = curRec.MachineGroupId,
                IsActive = curRec.IsActive,
                SIM = curRec.Sim,
                BeginDate = (DateTime)curRec.BeginDate,
                EndDate = (DateTime)curRec.EndDate,
                BeginDateTime = Util.GetPersianTime((DateTime)curRec.BeginDate),
                EndDateTime = Util.GetPersianTime((DateTime)curRec.EndDate),
                bDate = (DateTime)curRec.BeginDate,
                eDate = (DateTime)curRec.EndDate,

            };

            return obj;
        }
        [HttpGet]
        [Route("DefaultDateTime")]
        public async Task<object> DefaultDateTime()
        {
            var t = new
            {
                DefaultDate = Util.GetPersianDate(DateTime.Now),
                DefaultTime = Util.GetPersianTime(DateTime.Now)
            };
            return t;
        }
        [HttpGet]
        [Route("CanEdit")]
        public async Task<int> CanEdit(int MachineTestGroupId)
        {
            return _definedTestMachine.GetAll().Count(x => x.TestGroupId == MachineTestGroupId && x.Status == true);

        }
        [HttpPut]
        [Route("Edit")]
        [DisplayName("ویرایش")]
        public async Task<int> Edit(object definedTestMachineGroup)
        {
            var Id = (int)JObject.Parse(definedTestMachineGroup.ToString())["id"];
            var IsActive = (Boolean)JObject.Parse(definedTestMachineGroup.ToString())["isActive"];
            var MachineGroupId = (int)JObject.Parse(definedTestMachineGroup.ToString())["machineGroupId"];
            var SIM = (short)JObject.Parse(definedTestMachineGroup.ToString())["sim"];
            var DefinedTestId = (int)JObject.Parse(definedTestMachineGroup.ToString())["definedTestId"];

            var beginDate = JObject.Parse(definedTestMachineGroup.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var beginTime = JObject.Parse(definedTestMachineGroup.ToString())["beginDateTime"];
            var beginDateTime = DateTime.ParseExact(beginTime.ToString(), "HH:mm", CultureInfo.InvariantCulture);
            beginDateLocalTime = beginDateLocalTime.AddHours(beginDateTime.Hour).AddMinutes(beginDateTime.Minute);

            var endDate = JObject.Parse(definedTestMachineGroup.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            var endTime = JObject.Parse(definedTestMachineGroup.ToString())["endDateTime"];
            var endDateTime = DateTime.ParseExact(endTime.ToString(), "HH:mm", CultureInfo.InvariantCulture);
            endDateLocalTime = endDateLocalTime.AddHours(endDateTime.Hour).AddMinutes(endDateTime.Minute);
            var curRec = _definedtestmachinegroup.Find(x => x.Id == Id);
            if (Id > 0)
            {
                curRec.IsActive = IsActive;
                curRec.Sim = SIM;
            }
            else
            {
                curRec.IsActive = IsActive;
                curRec.Sim = SIM;
                curRec.BeginDate = beginDateLocalTime;
                curRec.EndDate = endDateLocalTime;
            }
            var mInGroup = _machine.GetMachineWithMachineGroup(MachineGroupId);//get all mchine in grp
            foreach (var item in mInGroup)
            {
                var curRc = _definedTestMachine.Find(x => x.TestGroupId == Id &&
                                                        x.MachineId == item.Id &&
                                                        x.DefinedTestId == DefinedTestId);
                curRc.BeginDate = beginDateLocalTime;
                curRc.EndDate = endDateLocalTime;
                curRc.Status = false;
                curRc.IsActive = IsActive;
                curRc.Sim = SIM;
                curRc.DefinedTestId = DefinedTestId;
                curRc.MachineId = item.Id;
                curRc.TestGroupId = Id;
            }
            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }
        [HttpPost]
        [Route("Create")]
        [DisplayName("انتساب جدید")]
        public async Task<int> Create(object definedTestMachineGroup)
        {
            var IsActive = (Boolean)JObject.Parse(definedTestMachineGroup.ToString())["isActive"];
            var MachineGroupId = (int)JObject.Parse(definedTestMachineGroup.ToString())["machineGroupId"];
            var SIM = (short)JObject.Parse(definedTestMachineGroup.ToString())["sim"];
            var DefinedTestId = (int)JObject.Parse(definedTestMachineGroup.ToString())["definedTestId"];

            var beginDate = JObject.Parse(definedTestMachineGroup.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(definedTestMachineGroup.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            var AddNewGrp = _definedtestmachinegroup.Add(new DefinedTestMachineGroup
            {
                BeginDate = beginDateLocalTime,
                EndDate = endDateLocalTime,
                DefinedTestId = DefinedTestId,
                MachineGroupId = MachineGroupId,
                IsActive = IsActive,
                Sim = SIM,
                Status = false
            });
            await _uow.SaveChangesAsync().ConfigureAwait(false);
            var mInGroup = _machine.GetMachineWithMachineGroup(MachineGroupId);//get all mchine in grp
            foreach (var item in mInGroup)
            {
                _definedTestMachine.Add(new DefinedTestMachine
                {
                    BeginDate = beginDateLocalTime,
                    EndDate = endDateLocalTime,
                    Status = false,
                    IsActive = IsActive,
                    Sim = SIM,
                    DefinedTestId = DefinedTestId,
                    MachineId = item.Id,
                    TestGroupId = AddNewGrp.Id
                });
            }
            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }

        [HttpPost]
        [Route("IsDefinedTestForMachineGroupAndParent")]
        public async Task<int> IsDefinedTestForMachineGroupAndParent(object definedTestMachineGroup)
        {
            var MachineGroupId = (int)JObject.Parse(definedTestMachineGroup.ToString())["machineGroupId"];
            var beginDate = JObject.Parse(definedTestMachineGroup.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(definedTestMachineGroup.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            var d = _machinGrp.GetGroupParent(MachineGroupId, new List<int>());
            return _definedtestmachinegroup.IsDefinedTestForMachineAndParent(d, beginDateLocalTime, endDateLocalTime);
        }

        [HttpPost]
        [Route("IsDefinedTestForMachineParent")]
        public async Task<int> IsDefinedTestForMachineParent(object definedTestMachineGroup)
        {

            var MachineGroupId = (int)JObject.Parse(definedTestMachineGroup.ToString())["machineGroupId"];
            var beginDate = JObject.Parse(definedTestMachineGroup.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(definedTestMachineGroup.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            var d = _machinGrp.GetGroupParent(MachineGroupId, new List<int>());
            return _definedTestMachine.IsDefinedTestForMachineAndParent(d, beginDateLocalTime, endDateLocalTime);
        }

        [HttpPost]
        [Route("DeactivateTestForMachineInGroupAndParent")]
        public async Task<int> DeactivateTestForMachineInGroupAndParent(object definedTestMachineGroup)
        {
            var Status = (Boolean)JObject.Parse(definedTestMachineGroup.ToString())["Status"];
            var MachineGroupId = (int)JObject.Parse(definedTestMachineGroup.ToString())["machineGroupId"];
            var SIM = (short)JObject.Parse(definedTestMachineGroup.ToString())["sim"];
            var DefinedTestId = (int)JObject.Parse(definedTestMachineGroup.ToString())["definedTestId"];
            var BeginDate = Util.ShamsiToMiladi((int)JObject.Parse(definedTestMachineGroup.ToString())["beginDate"]["year"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["beginDate"]["month"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["beginDate"]["day"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["beginDateTime"]["hour"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["beginDateTime"]["minute"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["beginDateTime"]["second"]);
            var EndDate = Util.ShamsiToMiladi((int)JObject.Parse(definedTestMachineGroup.ToString())["endDate"]["year"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["endDate"]["month"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["endDate"]["day"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["endDateTime"]["hour"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["endDateTime"]["minute"],
                (int)JObject.Parse(definedTestMachineGroup.ToString())["endDateTime"]["second"]);
            var d = _machinGrp.GetGroupParent(MachineGroupId, new List<int>());
            return await _definedTestMachine.DeactivateTestForMachineInGroupAndParent(d, BeginDate, EndDate).ConfigureAwait(false);
        }

        [HttpPost]
        [Route("DeactivateTestForMachineAndDefinedTestMachineGroup")]
        public async Task<int> DeactivateTestForMachineAndDefinedTestMachineGroup(object definedTestMachineGroup)
        {
            var IsActive = (Boolean)JObject.Parse(definedTestMachineGroup.ToString())["isActive"];
            var MachineGroupId = (int)JObject.Parse(definedTestMachineGroup.ToString())["machineGroupId"];
            var SIM = (short)JObject.Parse(definedTestMachineGroup.ToString())["sim"];
            var DefinedTestId = (int)JObject.Parse(definedTestMachineGroup.ToString())["definedTestId"];
            var beginDate = JObject.Parse(definedTestMachineGroup.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(definedTestMachineGroup.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            return await _definedTestMachine.DeactivateTestForMachineAndDefinedTestMachineGroup(
                new DefinedTestMachineGroupVm
                {
                    BeginDate = beginDateLocalTime,
                    EndDate = endDateLocalTime,
                    IsActive = IsActive,
                    SIM = SIM,
                    DefinedTestId = DefinedTestId,
                    MachineGroupId = MachineGroupId
                });
        }


        #region New Actions

        [HttpPost]
        [Route("CreateNia")]
        [DisplayName("انتساب جدید نیا")]
        public async Task<APIResult<bool>> CreateNia([FromBody] DefinedTestMachineGroupVm test)
        {
            test.BeginDate = test.BeginDate.ToLocalTime();
            test.EndDate = test.EndDate.ToLocalTime();
            return await _definedtestmachinegroup.CreateNia(test, false).ConfigureAwait(false);
        }

        [HttpPost]
        [Route("CreateAndDeactiveNia")]
        [DisplayName("انتساب جدید و غیرفعالسازی نیا")]
        public async Task<APIResult<bool>> CreateAndDeactiveNia([FromBody] DefinedTestMachineGroupVm test)
        {
            test.BeginDate = test.BeginDate.ToLocalTime();
            test.EndDate = test.EndDate.ToLocalTime();
            return await _definedtestmachinegroup.CreateNia(test, true).ConfigureAwait(false);
        }

        #endregion
    }
}

