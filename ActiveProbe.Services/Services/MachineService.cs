using System;
using System.Linq;
using System.Collections.Generic;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using ActiveProbe.Utils.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace ActiveProbe.Services
{
    public class MachineService : GenericService<Machine>, IMachineService
    {
        DbSet<MachineGroup> _machineGroup;
        DbSet<MachineType> _machineType;
        DbSet<MachineConnectionHistory> _mConnectionHistory;
        DbSet<DefinedTestMachine> _definedTestmachine;
        public MachineService(IUnitOfWork uow) : base(uow)
        {
            _machineGroup = _uow.Set<MachineGroup>();            
            _machineType = _uow.Set<MachineType>();
            _definedTestmachine = _uow.Set<DefinedTestMachine>();
            _mConnectionHistory = _uow.Set<MachineConnectionHistory>();
        }
        public IEnumerable<MachineVm> GetMachines()
        {
            var res =
            from m in _tEntities
            join mg in _machineGroup on m.MachineGroupId equals mg.Id
              into machineGroup
            from machineGroupVal in machineGroup.DefaultIfEmpty()
            join mt in _machineType on m.MachineTypeId equals mt.Id
             into mType
            from mTypeVal in mType.DefaultIfEmpty()
            orderby m.Name

            let dtm = _definedTestmachine
                                .Where(x => x.MachineId == m.Id)
                                .OrderByDescending(x => x.Id)
                                .FirstOrDefault()

            select new MachineVm
            {
                Id = m.Id,
                Identifier = m.Identifier,
                IMEI1 = m.Imei1,
                IMEI2 = m.Imei2,
                Latitude = m.Latitude,
                Longitude = m.Longitude,
                InstallLocation = m.InstallLocation,
                MachineGroupId = m.MachineGroupId,
                MachineTypeId = (int)m.MachineTypeId,
                Name = m.Name,
                SerialNo = m.SerialNo,
                SimcardNo = m.SimcardNo,
                Version = m.Version,
                HostName = m.HostName,
                TimeZone = m.TimeZone,
                MachineGroupTitle = machineGroupVal.Title,
                MachineTypeTitle = mTypeVal.Title,

        //TestStatus = dtm.Status.Value == false ? "NotReceivedByDevice" :
        //                dtm.Status == true && dtm.FinishTime != null ? "Finished" :
        //                dtm.Status == true && DateTime.Now < dtm.BeginDate && dtm.FinishTime == null ? "Waiting" :
        //                dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime != null ? "Overwritten" :
        //                dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime == null ? "Running" : "",

        TestStatus = dtm.Status == false ? "NotReceivedByDevice" :

                             dtm.Status == true && dtm.FinishTime != null ? "Finished" :

                             dtm.Status == true && DateTime.Now < dtm.BeginDate && dtm.FinishTime == null ? "Waiting" :
                             //dtm.Status == true && DateTime.Now < dtm.BeginDate && dtm.FinishTime != null ? "Overwritten" :

                             dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime == null ? "Running" :
                             //dtm.Status == true && dtm.BeginDate < DateTime.Now && DateTime.Now < dtm.EndDate && dtm.FinishTime != null ? "Overwritten" :

                             dtm.Status == true && dtm.EndDate < DateTime.Now && dtm.FinishTime == null ? "NotReceivedFromDevice" : "",

                Status = _mConnectionHistory.Where(x => x.MachineId == m.Id).OrderByDescending(x => x.CreatedDate).
                      FirstOrDefault().IsConnected
                // ,Deletable =_definedTestmachine.FirstOrDefault(x=>x.MachineId==m.Id)==null?false:true
            };
            return res;
        }
        public IEnumerable<MachineByGroupIdVm> GetMachineWithMachineGroup(int machinGroupId)
        {            
            var res =
           from m in _tEntities
           //where m.MachineGroupId == machinGroupId
           join mg in _machineGroup on m.MachineGroupId equals mg.Id
               into machineGroup
           from machineGroupVal in machineGroup.DefaultIfEmpty()
           join mt in _machineType on m.MachineTypeId equals mt.Id
               into mType
           from mTypeVal in mType.DefaultIfEmpty()
           select new MachineByGroupIdVm
           {
               MachineGroupTitle = machineGroupVal.Title,
               MachineTypeTitle = mTypeVal.Title,
               Id = m.Id,
               Identifier = m.Identifier,
               IMEI1 = m.Imei1,
               IMEI2 = m.Imei2,
               MachineTypeId = (int)m.MachineTypeId,
               MachineGroupId=(int)m.MachineGroupId,
               InstallLocation=m.InstallLocation,
               Name = m.Name,
               SimcardNo = m.SimcardNo,
               SerialNo = m.SerialNo,
               HostName = m.HostName,
               TimeZone = m.TimeZone,
               groupChecked = machineGroupVal.Id == machinGroupId ? true : false
           };
            return res.ToList();
        }
        private bool Deletable(int machinId)
        {
            return _definedTestmachine.FirstOrDefault(x => x.MachineId == machinId) == null ? false : true;
        }
        public MachineVm FindByDetail(int machineId){
           return _tEntities.Where(x=>x.Id==machineId).Include(x=>x.MachineGroup).Include(x=>x.MachineType).Select(x=>
            new MachineVm
            {
                MachineGroupTitle = x.MachineGroup.Title ??null,
                MachineTypeTitle = x.MachineType.Title ?? null,
                Id = x.Id,
                Identifier = x.Identifier,
                InstallLocation= x.InstallLocation,
                IMEI1 = x.Imei1,
                IMEI2 = x.Imei2,
                MachineTypeId = (int)x.MachineTypeId,
                MachineGroupId= (int)x.MachineGroupId,
                Name = x.Name,
                SimcardNo = x.SimcardNo,
                SerialNo = x.SerialNo,
                HostName = x.HostName,
                TimeZone = x.TimeZone,
            }).FirstOrDefault();
        }


    }
}