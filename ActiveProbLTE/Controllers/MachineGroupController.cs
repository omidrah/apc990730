using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActiveProbe.Utils.ViewModel;
using Microsoft.AspNetCore.Mvc;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using System.ComponentModel;
using Microsoft.Data.SqlClient;

namespace ActiveProbeCore.Controllers
{
    [Route("api/[controller]")]
    [DisplayName("گروه بندی دستگاه ها")]
    [ApiController]
    public class MachineGroupController : ControllerBase
    {   //Device Groups
        IMachineGroupService _mgs;
        IDefinedTestMachineGroupService _dtmgs;
        IUnitOfWork _uow;
        public MachineGroupController(IUnitOfWork uow, IMachineGroupService mgs, IDefinedTestMachineGroupService dtmgs)
        {
            _mgs = mgs;
            _dtmgs = dtmgs;
            _uow = uow;
        }
        [HttpGet]
        [Route("Index")]
        [DisplayName("لسیت ")]
        public IEnumerable<MachineGroupVm> Index()
        {
            return _mgs.GetAll().Select(a => new MachineGroupVm
            {
                Id = a.Id,
                Title = a.Title,
                ParrentId = a.ParrentId
            });
        }
        [HttpGet]
        [Route("IndexWithDefinedTest/{id}")]
        [DisplayName("لیست تست های تعریف شده")]
        public async Task<object> IndexWithDefinedTest(int id)
        {
            return _dtmgs.GetGroupWithDefinedTest(id);
            //return await Util.GetGroupWithDefinedTest(id).ConfigureAwait(false);
        }
        [HttpGet]
        [Route("Details/{id}")]
        [DisplayName("جزییات")]
        public Task<MachineGroupVm> Details(int id)
        {
            var curMg = _mgs.Find(x => x.Id == id);
            return Task.Run(() =>
                    new MachineGroupVm
                    {
                        Id = curMg.Id,
                        Title = curMg.Title,
                        ParrentId = curMg.ParrentId
                    }
            );

        }
        [HttpPut]
        [Route("Edit")]
        [DisplayName("ویرایش")]
        public async Task<int> Edit([FromBody] MachineGroupVm machineGroup)
        {
            var curMg = _mgs.Find(x => x.Id == machineGroup.Id);
            curMg.Title = machineGroup.Title;
            return await _uow.SaveChangesAsync();
        }
        [HttpPost]
        [Route("Create")]
        [DisplayName("افزودن")]
        public async Task<int> Create(MachineGroupVm machineGroup)
        {
            var mg = new MachineGroup { Title = machineGroup.Title, ParrentId = machineGroup.ParrentId };
            _mgs.Add(mg);
            await _uow.SaveChangesAsync();
            return mg.Id;

        }
        [HttpDelete]
        [Route("Delete/{id}")]
        [DisplayName("حذف")]
        public async Task<int> Delete(int id)
        {
            _mgs.Delete(_mgs.Find(x => x.Id == id));
            return await _uow.SaveChangesAsync();
        }

        [HttpDelete]
        [Route("DeleteNia/{id}")]
        public async Task<APIResult<int>> DeleteNia(int id)
        {
            var result = new APIResult<int>()
            {
                Result = 0,
                Message = "",
                Succeed = false
            };
            _mgs.Delete(_mgs.Find(x => x.Id == id));
            try
            {
                await _uow.SaveChangesAsync();
                result.Result = 1;
                result.Succeed = true;
                result.Message = "Ok";
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    try
                    {

                        if (ex.InnerException is SqlException)
                        {
                            var sqlEX = (SqlException)ex.InnerException;
                            if (sqlEX.Number == 547)

                                if (sqlEX.Message.Contains("table \"dbo.DefinedTestMachineGroup\""))
                                {
                                    result.Message = "CannotDeleteMachineGroupAssignedTest";
                                }
                                else if (sqlEX.Message.Contains("table \"dbo.MachineVersionGroup\""))
                                {
                                    result.Message = "CannotDeleteMachineGroupUpdateVersion";
                                }
                                else if (sqlEX.Message.Contains("table \"dbo.Machine\""))
                                {
                                    result.Message = "CannotDeleteMachineGroupAssignedDevice";
                                }
                                else if (sqlEX.Message.Contains("table \"dbo.MachineGroup\""))
                                {
                                    result.Message = "CannotDeleteMachineGroupAssignedChild";
                                }
                                else
                                    result.Message = ex.InnerException.Message;

                            else
                                result.Message = ex.InnerException.Message;
                        }
                        else
                            result.Message = ex.InnerException.Message;
                    }
                    catch (Exception exx)
                    {
                        result.Message = ex.Message;
                    }
                    result.Result = 0;
                    result.Succeed = false;
                }
                else
                {
                    result.Result = 0;
                    result.Succeed = false;
                    result.Message = ex.Message;
                }
            }

            return result;
        }
    }
}