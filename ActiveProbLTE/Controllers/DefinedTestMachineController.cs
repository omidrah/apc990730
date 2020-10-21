using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Services;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.ViewModel;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActiveProbeCore.Controllers
{   //DefinedTestMachine
    [Route("api/[controller]")]
    [DisplayName("انتساب تست به دستگاه")]
    //[Authorize(Policy=ConstantPolicies.dynKkomAuthorization)]
    //[Authorize(Policy = ConstantPolicies.dynKkomAuthorization)]
    [ApiController]
    public class DefinedTestMachineController : ControllerBase
    {
        private IDefinedTestMachineService _definedtestmachine;
        private IDefinedTestMachineGroupService _definedtestmachinegroup;
        private IMachineGroupService _machinegroup;
        private IUnitOfWork _uow;
        public DefinedTestMachineController(
         IDefinedTestMachineService dtm,
         IDefinedTestMachineGroupService dtmg,
         IUnitOfWork uow, IMachineGroupService mgs)
        {
            _definedtestmachine = dtm;
            _definedtestmachinegroup = dtmg;
            _uow = uow;
            _machinegroup = mgs;

        }
       
        [HttpGet]
        [Route("Details/{id}")]
        [DisplayName("جزییات")]
        public async Task<object> Details(int id)
        {
            var curRec = _definedtestmachine.Find(x => x.Id == id);
            var obj = new
            {
                Id = curRec.Id,
                DefinedTestId = curRec.DefinedTestId,
                MachineId = curRec.MachineId,
                SIM = curRec.Sim,
                BeginDate = (DateTime)curRec.BeginDate,
                EndDate = (DateTime)curRec.EndDate,
                BeginDateTime = Util.GetPersianTime((DateTime)curRec.BeginDate),
                EndDateTime = Util.GetPersianTime((DateTime)curRec.EndDate),
                bDate = (DateTime)curRec.BeginDate,
                eDate = (DateTime)curRec.EndDate,
                IsActive = curRec.IsActive,
                Status = (bool)curRec.Status,
                TestGroupId = curRec.TestGroupId
            };

            return obj;
        }

        [HttpGet]
        [Route("CanTestEdit/{definedTestId}")]
        public async Task<bool> CanTestEdit(int definedTestId)
        {
            if (_definedtestmachine.GetAll().Any(x => x.DefinedTestId == definedTestId))
            {
                return false;//Test used by machine and do not edit
            }
            return true;
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
        [HttpPut]
        [Route("Edit")]
        [DisplayName("ویرایش")]
        public async Task<int> Edit(object definedTestMachine)
        {
            var beginDate = JObject.Parse(definedTestMachine.ToString())["bDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate);
            var beginTime = JObject.Parse(definedTestMachine.ToString())["beginDateTime"];
            var beginDateTime = DateTime.ParseExact(beginTime.ToString(), "HH:mm", CultureInfo.InvariantCulture);
            var tsStart = new TimeSpan(beginDateTime.Hour, beginDateTime.Minute, 0);
            beginDateLocalTime = beginDateLocalTime.Date + tsStart;

            var endDate = JObject.Parse(definedTestMachine.ToString())["eDate"];
            //var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            var endDateLocalTime = Convert.ToDateTime(endDate);
            var endTime = JObject.Parse(definedTestMachine.ToString())["endDateTime"];
            var endDateTime = DateTime.ParseExact(endTime.ToString(), "HH:mm", CultureInfo.InvariantCulture);
            var tsEnd = new TimeSpan(endDateTime.Hour, endDateTime.Minute, 0);
            //endDateLocalTime = endDateLocalTime.AddHours(endDateTime.Hour).AddMinutes(endDateTime.Minute);
            endDateLocalTime = endDateLocalTime.Date + tsEnd;


            var Id = (int)JObject.Parse(definedTestMachine.ToString())["id"];
            
            var curRec = _definedtestmachine.Find(x => x.Id == Id);
            curRec.IsActive = (Boolean)JObject.Parse(definedTestMachine.ToString())["isActive"];
            curRec.Sim = (short)JObject.Parse(definedTestMachine.ToString())["sim"];
            
            curRec.BeginDate = beginDateLocalTime;
            curRec.EndDate = endDateLocalTime;

            curRec.DefinedTestId = (int)JObject.Parse(definedTestMachine.ToString())["definedTestId"];
            curRec.Sim = (short)JObject.Parse(definedTestMachine.ToString())["sim"];
            curRec.Status = false;

            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }
        [HttpPost]
        [Route("Create")]
        [DisplayName("انتساب جدید")]
        public async Task<int> Create(object definedTestMachine)
        {
            if (definedTestMachine != null)
            {
                var IsActive = (Boolean)JObject.Parse(definedTestMachine.ToString())["isActive"];
                var MachineId = (int)JObject.Parse(definedTestMachine.ToString())["machineId"];
                var SIM = (short)JObject.Parse(definedTestMachine.ToString())["sim"];
                var DefinedTestId = (int)JObject.Parse(definedTestMachine.ToString())["definedTestId"];

                var beginDate = JObject.Parse(definedTestMachine.ToString())["beginDate"];
                var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
                var endDate = JObject.Parse(definedTestMachine.ToString())["endDate"];
                var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();

                _definedtestmachine.Add(new ActiveProbe.Domain.Models.DefinedTestMachine
                {
                    BeginDate = beginDateLocalTime,
                    EndDate = endDateLocalTime,
                    IsActive = IsActive,
                    Status = false,
                    TestGroupId = null,
                    Sim = SIM,
                    DefinedTestId = DefinedTestId,
                    MachineId = MachineId
                });
                return await _uow.SaveChangesAsync().ConfigureAwait(false);
            }
            else
            {
                return 0;
            }
        }

        [HttpPost]
        [Route("IsDefinedTestForMachineByMachineID")]
        public async Task<int> IsDefinedTestForMachineByMachineID(object definedTestMachine)
        {
            var MachineId = (int)JObject.Parse(definedTestMachine.ToString())["machineId"];
            var beginDate = JObject.Parse(definedTestMachine.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();

            var endDate = JObject.Parse(definedTestMachine.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            var BeginDate = beginDateLocalTime;
            var EndDate = endDateLocalTime;
            return _definedtestmachine.GetAll(x => 
                                                   BeginDate <= x.EndDate && EndDate >= x.BeginDate &&
                                                   x.MachineId == MachineId &&
                                                   x.IsActive &&
                                                   x.FinishTime == null
                                             ).Count;
        }

        [HttpPost]
        [Route("IsDefinedTestForMachineGroupAndParentByMachineID")]
        public async Task<int> IsDefinedTestForMachineGroupAndParentByMachineID(object definedTestMachine)
        {
            var MachineId = (int)JObject.Parse(definedTestMachine.ToString())["machineId"];
            var beginDate = JObject.Parse(definedTestMachine.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(definedTestMachine.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            var d = _machinegroup.GetMachineParent(MachineId, new List<int>());
            return _definedtestmachinegroup.IsDefinedTestForMachineAndParent(d, beginDateLocalTime, endDateLocalTime);
        }

        [HttpPost]
        [Route("DeactivateTestForMachineGroupAndDefinedTestMachine")]
        public async Task<int> DeactivateTestForMachineGroupAndDefinedTestMachine(object definedTestMachine)
        {

            var IsActive = (Boolean)JObject.Parse(definedTestMachine.ToString())["isActive"];
            var MachineId = (int)JObject.Parse(definedTestMachine.ToString())["machineId"];
            var SIM = (short)JObject.Parse(definedTestMachine.ToString())["sim"];
            var DefinedTestId = (int)JObject.Parse(definedTestMachine.ToString())["definedTestId"];

            var beginDate = JObject.Parse(definedTestMachine.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(definedTestMachine.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            //get all parent
            var d = _machinegroup.GetMachineParent(MachineId, new List<int>());

            //update group
            var dd = _definedtestmachinegroup.GetAll(x => beginDateLocalTime <= x.EndDate && endDateLocalTime >= x.BeginDate &&
                                                                  x.IsActive == true && x.FinishTime == null &&
                                                                  d.Contains((int)x.MachineGroupId));
            foreach (var item in dd)
            {
                item.IsActive = false;
                item.Status = false;
            }

            //update machine
            var dtm = _definedtestmachine.GetAll(x => beginDateLocalTime <= x.EndDate && endDateLocalTime >= x.BeginDate &&
                                                            x.IsActive == true && x.FinishTime == null &&
                                                            x.MachineId == MachineId);
            foreach (var item in dtm)
            {
                item.IsActive = false;
                item.Status = false;
            }


            //ToDo :: Mostafa :: Save Deactived TestIDs for send by tcp-Server for all device in other group of device and parent 

            //insert new test
            _definedtestmachine.Add(new ActiveProbe.Domain.Models.DefinedTestMachine
            {
                BeginDate = beginDateLocalTime,
                EndDate = endDateLocalTime,
                MachineId = MachineId,
                Sim = SIM,
                DefinedTestId = DefinedTestId,
                IsActive = IsActive,
                Status = false,
            });
            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }

        [HttpGet]
        [Route("MachineStatusDetail/{id}")]
        public async Task<MachineVm> MachineStatusDetail(int id)
        {
            return await _definedtestmachine.MachineStatusDetail(id);
        }



        #region New Actions

        [HttpPost]
        [Route("CreateNia")]
        [DisplayName("انتساب جدید نیا")]
        public async Task<APIResult<bool>> CreateNia([FromBody] DefinedTestMachineVm test)
        {           
            return await _definedtestmachine.CreateNia(test , false).ConfigureAwait(false);
        }

        [HttpPost]
        [Route("CreateAndDeactiveNia")]
        [DisplayName("انتساب جدید و غیرفعالسازی نیا")]
        public async Task<APIResult<bool>> CreateAndDeactiveNia([FromBody] DefinedTestMachineVm test)
        {            
            return await _definedtestmachine.CreateNia(test , true).ConfigureAwait(false);
        }

        #endregion
    }
}
