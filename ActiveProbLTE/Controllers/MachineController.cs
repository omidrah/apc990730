
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services;
using System.ComponentModel;

namespace ActiveProbeCore.Controllers
{
    //Devices
    [Route("api/[controller]")]
    [Authorize(Policy = ConstantPolicies.dynKkomAuthorization)]
    [DisplayName("دستگاه ها")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private IHttpContextAccessor _accessor;
        private IMachineService _ms;
        private IMachineGroupService _mgs;
        private IDefinedTestMachineService _dtm;
        private IUnitOfWork _uow;


        public MachineController(IHttpContextAccessor accessor, IMachineService ms, IUnitOfWork uow, IMachineGroupService mgs,IDefinedTestMachineService dtm)
        {
            _accessor = accessor;
            _ms = ms;
            _mgs = mgs;
            _dtm = dtm;
            _uow = uow;
        }
        [HttpGet]
        [Route("Index")]
        [DisplayName("لیست ")]
        public IEnumerable<MachineVm> Index()
        {
            return _ms.GetMachines();
        }
                
        [HttpGet]
        [Route("IndexWithMachineGroup/{id}")]
        [DisplayName("گروه ها و دستگاه ها")]
        public object IndexWithMachineGroup(int id)
        {
            return _ms.GetMachineWithMachineGroup(id);
        }

        [HttpGet]
        [Route("IndexWithDefinedTest/{id}")]
        [DisplayName("تست های تعریف شده برای یک دستگاه ")]
        public async Task<object> IndexWithDefinedTest(int id)
        {
            return _dtm.GetMachineWithDefinedTest(id);
        }
        [HttpGet]
        [Route("Details/{id}")]
        [DisplayName("جزییات")]
        public MachineVm Details(int id)
        {
            return _ms.FindByDetail(id);            
        }
        [HttpPut]
        [Route("Edit")]
        [DisplayName("ویرایش")]
        public async Task<int> Edit([FromBody] MachineVm machine)
        {
            var curRec = _ms.Find(x => x.Id == machine.Id);
            curRec.Name = machine.Name;
            curRec.Identifier = machine.Identifier;
            curRec.SerialNo = machine.SerialNo;
            curRec.MachineTypeId = machine.MachineTypeId;
            curRec.MachineGroupId = machine.MachineGroupId;
            return await _uow.SaveChangesAsync().ConfigureAwait(false);
            
        }
        [HttpPut]
        [Route("GroupEdit")]
        [DisplayName("ویرایش گروه")]
        public async Task<int> GroupEdit(object list)
        {
            var curIds = list.ToString().Replace('[', ' ').Replace(']', ' ').Replace('\"', ' ').Split(',').ToArray();
            foreach (var item in curIds)
            {
                var cruRec = _ms.Find(x=>x.Id ==Convert.ToInt32(item));
                cruRec.MachineGroupId =null;
                if( await _uow.SaveChangesAsync().ConfigureAwait(false) > 0)
                {
                    cruRec.MachineGroupId =Convert.ToInt32(curIds[curIds.Length - 1].Trim()); 
                    return await _uow.SaveChangesAsync().ConfigureAwait(false);
                }
                return 0;                
            }
            return 0;
        }

        [HttpPut]
        [Route("GroupEditNia")]
        public async Task<int> GroupEditNia(MachineGroupAssignment list)
        {
            var machineInGroupId = _ms.GetAll().Where(x=>x.MachineGroupId ==list.MachineGroupId);
            //step 1 => remove selected machineGorupdId from current machines
            foreach (var item in machineInGroupId)
            {
                item.MachineGroupId =null;                
            }
            //if(await _uow.SaveChangesAsync().ConfigureAwait(false)>0)
            //{
                    //step2 =>confirm new changes
                    foreach (var item in list.MachineIds)
                    {
                        _ms.Find(x=>x.Id==item).MachineGroupId = list.MachineGroupId;
                    }

                    return await _uow.SaveChangesAsync().ConfigureAwait(false);
            //}
            //return 0;// error in update in db
        }

        [HttpPost]
        [Route("Create")]
        [DisplayName("افزودن")]
        public async Task<int> Create([FromBody] MachineVm machine)
        {
            _ms.Add(new ActiveProbe.Domain.Models.Machine
            {
                Name = machine.Name,
                Identifier = machine.Identifier,
                SerialNo = machine.SerialNo,
                MachineTypeId = machine.MachineTypeId,
                MachineGroupId = machine.MachineGroupId
            });
            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        [DisplayName("حذف ")]
        public async Task<int> Delete(int id)
        {
            var existMachine = _ms.Find(x => x.Id == id);
            if (existMachine != null)
            {
                _ms.Delete(existMachine);
                return await _uow.SaveChangesAsync().ConfigureAwait(false);
            }
            return 0; //has error in delete
        }

    }
}