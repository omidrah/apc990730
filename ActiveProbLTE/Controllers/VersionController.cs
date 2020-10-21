using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net.Http.Headers;
using ActiveProbe.Utils.ViewModel;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Domain.Models;
using ActiveProbe.DataLayer.Context;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services;
using System.ComponentModel;

namespace ActiveProbeCore.Controllers
{
    //Used for test crud
    [Route("api/[controller]")]
    [Authorize(Policy=ConstantPolicies.dynKkomAuthorization)]
    [DisplayName("بروزرسانی دستگاه ها")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        IMachineVersionService _machineVersion;
        IMachineService _machine;
        IUnitOfWork _uow;
        IMachineVersionGroupService _machineVersionGroup;
        private IWebHostEnvironment _hostingEnvironment;
        public VersionController(IWebHostEnvironment hostingEnvironment, IMachineVersionGroupService machineVersionGroup,
         IMachineVersionService machineVersion,IMachineService machine,IUnitOfWork uow)
        {
            _machineVersion = machineVersion;
            _machineVersionGroup = machineVersionGroup;
            _hostingEnvironment = hostingEnvironment;
            _machine=machine;
            _uow= uow;
        }

        [HttpGet]
        [Route("Index/{id}")]
        [DisplayName("لیست ")]
        public async Task<IEnumerable<MachineVersionVm>> Index(int id) //machineId
        {
            return
            _machineVersion.GetAll().Where(x => x.MachineId == id).OrderByDescending(x => x.CreateDate).
                Select(x => new MachineVersionVm
                {
                    CompleteDate = x.CompleteDate,
                    FaCompleteDate = Util.ToPersianDateTimeString((DateTime)x.CompleteDate),
                    MachineId = x.MachineId,
                    IMEI1 = x.Imei1,
                    IsDone = x.IsDone,
                    FileDownloadAddress = x.FileDownloadAddress,
                    CreateDate = x.CreateDate,
                    FaCreateDate = Util.ToPersianDateTimeString((DateTime)x.CreateDate),
                    VersionNum = GetVersion(x.FileDownloadAddress)

                });
        }

        private string GetVersion(string fileDownloadAddress)
        {
            try
            {
                var ar = fileDownloadAddress.Split('/');
                return ar[ar.Length - 1].Split('-')[1].Split('z')[0];
            }
            catch
            {
                //if format file not -- name.version.zip
                return fileDownloadAddress;
            }
        }

        [HttpGet]
        [Route("Group/{id}")]
        [DisplayName("گروه")]
        public Task<IEnumerable<MachineVersionGroupVm>> Group(int id)
        {
            return Task.Run(() =>
            {
                return _machineVersionGroup.GetAll().Where(x => x.MachineGroupId == id).
                   Select(x => new MachineVersionGroupVm
                   {
                       CompleteDate = x.CompleteDate,
                       FaCompleteDate = Util.ToPersianDateTimeString((DateTime)x.CompleteDate),
                       CreateDate = x.CreateDate,
                       FaCreateDate = Util.ToPersianDateTimeString((DateTime)x.CreateDate),
                       IsDone = x.IsDone,
                       Id = x.Id,
                       FileDownloadAddress = x.FileDownloadAddress,
                       MachineGroupId = x.MachineGroupId
                   });
            }
          );
        }
        [HttpPost]
        [Route("Create")]
        [DisplayName("افزودن")]
        public async Task<IActionResult> Create()
        {
            try
            {
                var file = Request.Form.Files[0];
                int machineId; ;
                if (int.TryParse(Request.Form.FirstOrDefault().Value[0], out machineId))
                {
                    if (file.Length > 0)
                    {
                        //add Recored in db 
                        //990123 Dr.Vahidpour say no need
                        // var canNewUpdate = await Util.CanDeviceGetNewVersion(machineId).ConfigureAwait(false);
                        // if (canNewUpdate==0)
                        // {
                        var onDbSave_linuxFormat = GetAddress(file).Result;
                        var machineInfo = _machine.Find(x=>x.Id==machineId);
                        _machineVersion.Add(new MachineVersion{
                            CreateDate = DateTime.Now,
                            IsDone = false,
                            MachineId = machineId,
                            MachineVersionGroupId = null,
                            FileDownloadAddress = onDbSave_linuxFormat,
                            Imei1 = machineInfo.Imei1 ?? machineInfo.Name,
                        });                        
                        if (await _uow.SaveChangesAsync() > 0)
                        {
                            return Ok(new result { code = 1, msg = "file Upload Success" });
                        }
                        return Ok(new result { code = 4, msg = "Err in Database Action" });
                        //}
                        //990123 Dr.Vahidpour say no need
                        // else
                        // {

                        //     return Ok(new result { code = 5, msg = "Previous update already exist." });
                        // }
                    }
                    return Ok(new result { code = 2, msg = "Select Update  File, please" }); //Select Your File
                }
                return Ok(new result { code = 6, msg = "MachineId don't Exist" }); //Machine Id Don't Exist
            }
            catch (Exception ex)
            {
                return NotFound(new result { code = 3, msg = ex.Message });
            }
        }
        [HttpPost]
        [Route("CreateGroup")]
        [DisplayName("ایجاد گروه بروزرسانی")]
        public async Task<IActionResult> CreateGroup()
        {
            try
            {
                var file = Request.Form.Files[0];
                int machinegId;
                if (int.TryParse(Request.Form.FirstOrDefault().Value[0], out machinegId))
                {
                    if (file.Length > 0)
                    {
                        //990123 Dr.Vahidpour say no need
                        // try{
                        //     await Util.DeleteGroupVersion(machinegId).ConfigureAwait(false);
                        // }
                        // catch(Exception ex){
                        //     return Ok(new result { code = 11, msg = "Err in Delete Previous GroupVersion Record \n"+ex.InnerException }); //Select Your File
                        // }
                        var fileAddresss = GetAddress(file).Result;
                        try
                        {
                            var machineInGroup = (List<MachineByGroupIdVm>)_machine.GetMachineWithMachineGroup(machinegId);
                            int successUpdate = 0; //Devices  haven't prevoius update
                            var unsuccessUpdate = 0;//Devices  haven prevoius update
                              //add new machineVersionGroup
                            var nGrpVrn=  _machineVersionGroup.Add(new MachineVersionGroup{
                                IsDone = false,
                                CreateDate = DateTime.Now,
                                MachineGroupId = machinegId,
                                FileDownloadAddress = fileAddresss  
                            });
                            await _uow.SaveChangesAsync();
                            foreach (var item in machineInGroup.Where(x => x.groupChecked))
                            {
                                //true=>previous update exist ,false => hasnot previous update                                
                                var canNewUpdate = _machineVersion.GetAll().
                                             FirstOrDefault(x=>x.MachineId == item.Id && x.IsDone==false); 
                                var machineInfo = _machine.FindByDetail(item.Id);

                                if (canNewUpdate==null) // this device hasn't previous update
                                {
                                    successUpdate++;
                                }
                                else
                                {
                                    //remove previous update 
                                    _machineVersion.Delete(canNewUpdate);
                                    await _uow.SaveChangesAsync();
                                    unsuccessUpdate++;
                                }
                                //insert new update  
                                  _machineVersion.Add(new MachineVersion{
                                    CreateDate = DateTime.Now,
                                    IsDone = false,
                                    MachineId = machineInfo.Id,                                    
                                    FileDownloadAddress = fileAddresss,
                                    Imei1 = machineInfo.IMEI1 ?? machineInfo.Name,
                                    MachineVersionGroupId =nGrpVrn.Id,
                                });                                           
                                if (await _uow.SaveChangesAsync() <= 0) //has err in insert machineversion 
                                {
                                    return Ok(new result { code = 4, msg = "Err in Database Action" });
                                }
                            }
                            var msg = $"{successUpdate + unsuccessUpdate} from {machineInGroup.Count} Device Update Regiser;";
                            msg += $" \n {unsuccessUpdate} Device has Previous update and overWrite them.";
                            return Ok(new result { code = 1, msg = msg });
                        }
                        catch (Exception ex)
                        {
                            return NotFound(new result { code = 7, msg = "error in VerionGroup \n" + ex.Message });
                        }
                    }
                    return Ok(new result { code = 2, msg = "Select Update  File please" }); //Select Your File
                }
                return Ok(new result { code = 6, msg = "MachineGroupId donot Exist" }); //Machine Id Don't Exist
            }
            catch (Exception ex)
            {
                return NotFound(new result { code = 3, msg = ex.Message });
            }
        }
        [HttpPost]
        [Route("canUpdate")]
        public async Task<IActionResult> canUpdate(int id)
        {
            var machineInGroup = (List<MachineByGroupIdVm>) _machine.GetMachineWithMachineGroup(id);
            var check = await checkPreviousUpdate(machineInGroup).ConfigureAwait(false);
            if (!check)
            {
                return Ok(new result { code = 5, msg = "Some Device in this group has previous Update.OverWrite It?" });
            }
            return Ok(new result { code = 15, msg = "All Device can update." });
        }

        //check this group machine Previous Update
        //if only one machine has previous update return false
        private async Task<bool> checkPreviousUpdate(List<MachineByGroupIdVm> machineInGroup)
        {
            bool result = true;
            foreach (var item in machineInGroup.Where(x => x.groupChecked))
            {
                var canNewUpdate =  _machineVersion.GetAll()
                                             .Any(x=>x.MachineId == item.Id && x.IsDone==false);
                if (canNewUpdate) //has previous update
                {
                    result = false;
                    break;
                }
            }
            return result;
        }

        private async Task<string> GetAddress(IFormFile file)
        {
            string folderName = "Share";
            string webRootPath = _hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(newPath, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream).ConfigureAwait(false);
            }
            var onDbSave_linuxFormat = $"http://185.192.112.74/{folderName}/{fileName}";
            return onDbSave_linuxFormat;
        }
    }
    public class result
    {
        public int code { get; set; }
        public string msg { get; set; }
        public List<MachineByGroupIdVm> mach { get; set; }
    }
}