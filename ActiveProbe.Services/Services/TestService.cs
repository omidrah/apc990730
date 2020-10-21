using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using ActiveProbe.Utils.ViewModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace ActiveProbe.Services
{
    public class TestService : GenericService<DefinedTest>, ITestService
    {
        DbSet<Ottservice> _ottservice;
        DbSet<Iptype> _ipType;
        DbSet<OttserviceTest> _ottservicetest;
        DbSet<TestType> _testType;
        DbSet<TestDataType> _testdataType;
        DbSet<LogFilePartitionType> _logFilePartitionsType;
        DbSet<Network> _network;
        DbSet<RepeatType> _repeat;
        DbSet<Band> _band;
        DbSet<DefinedTestMachine> _definedTestmachine;
        public TestService(IUnitOfWork uow) : base(uow)
        {
            _ottservice = _uow.Set<Ottservice>();
            _ottservicetest = _uow.Set<OttserviceTest>();
            _ipType = _uow.Set<Iptype>();
            _testType = _uow.Set<TestType>();
            _testdataType = _uow.Set<TestDataType>();
            _logFilePartitionsType = _uow.Set<LogFilePartitionType>();
            _network = _uow.Set<Network>();
            _repeat = _uow.Set<RepeatType>();
            _band = _uow.Set<Band>();
            _definedTestmachine = _uow.Set<DefinedTestMachine>();
        }
        public async Task<List<DefinedTestVm>> GetAllAsync()
        {
            var res =
            from dt in _tEntities
            join Rt in _repeat on dt.RepeatTypeId equals Rt.Id
            join Tt in _testType on dt.TestTypeId equals Tt.Id
            join Tdt in _testdataType on dt.TestDataTypeId equals Tdt.Id
             into testdatatypes                                //use for left join
            from testdatatypesVal in testdatatypes.DefaultIfEmpty() //...
            join Otts in _ottservice on dt.OttserviceId equals Otts.Id
               into Otts                                   //use for left join
            from ottsVal in Otts.DefaultIfEmpty()
            join Ottss in _ottservicetest on dt.OttserviceTestId equals Ottss.Id
               into ottsts                                //use for left join
            from ottstsVal in ottsts.DefaultIfEmpty()
            join Net in _network on dt.NetworkId equals Net.Id
            join B in _band on dt.BandId equals B.Id
            join Lfpt in _logFilePartitionsType on dt.LogFilePartitionTypeId equals Lfpt.Id into Lfpts
            from lfptVal in Lfpts.DefaultIfEmpty()
            join Ipt in _ipType on dt.IptypeId equals Ipt.Id into Ipts
            from IptVal in Ipts.DefaultIfEmpty()
            orderby dt.Id descending
            select new DefinedTestVm
            {
                Id = dt.Id,
                Title = dt.Title,
                IsActive = dt.IsActive,
                Layer3Messages = dt.Layer3Messages,
                RepeatTypeId = dt.RepeatTypeId,
                RepeatTime = dt.RepeatTime,
                MeasurementInterval = dt.MeasurementInterval,
                TestTypeId = dt.TestTypeId,
                UsualCallDuration = dt.UsualCallDuration,
                UsualCallWaitTime = dt.UsualCallWaitTime,
                UsualCallNumber = dt.UsualCallNumber,
                TestDataId = dt.TestDataId,
                TestDataTypeId = dt.TestDataTypeId,
                TestDataServer = dt.TestDataServer,
                TestDataUserName = dt.TestDataUserName,
                TestDataPassword = dt.TestDataPassword,
                TestDataUploadFileSize = dt.TestDataUploadFileSize,
                OTTServiceId = dt.OttserviceId,
                OTTServiceTestId = dt.OttserviceTestId,
                NetworkId = dt.NetworkId,
                BandId = dt.BandId,
                SaveLogFile = dt.SaveLogFile,
                LogFilePartitionTypeId = dt.LogFilePartitionTypeId,
                LogFilePartitionTime = dt.LogFilePartitionTime,
                LogFilePartitionSize = dt.LogFilePartitionSize,
                LogFileHoldTime = dt.LogFileHoldTime,
                IPTypeId = dt.IptypeId,
                NumberOfPings = dt.NumberOfPings,
                PacketSize = dt.PacketSize,
                InternalTime = dt.InternalTime,
                ResponseWaitTime = dt.ResponseWaitTime,
                TTL = dt.Ttl,
                RepeatTypeTitle = Rt.Title,
                TestTypeTitle = Tt.Title,
                TestDataTypeTitle = testdatatypesVal.Title,
                IPTypeTitle = IptVal.Title,
                OTTServiceTitle = ottsVal.Title,
                OTTServiceTestTitle = ottstsVal.Title,
                NetworkTitle = Net.Title,
                BandTitle = B.Title,
                LogFilePartitionTypeTitle = lfptVal.Title,
                Editable = _definedTestmachine.Any(x => x.DefinedTestId == dt.Id)
            };
            return await res.ToListAsync();
            //var d =  _tEntities.FromSqlRaw("Exec GetAllTest"). AsNoTracking().ToList();

        }
        public DefinedTestVm GetByIdAsync(int Id)
        {
            var res =
             from dt in _tEntities
             where dt.Id == Id
             join Rt in _repeat on dt.RepeatTypeId equals Rt.Id
             join Tt in _testType on dt.TestTypeId equals Tt.Id
             join Tdt in _testdataType on dt.TestDataTypeId equals Tdt.Id
              into testdatatypes                                //use for left join
             from testdatatypesVal in testdatatypes.DefaultIfEmpty() //...

             join Otts in _ottservice on dt.OttserviceId equals Otts.Id
                into Otts                                   //use for left join
             from ottsVal in Otts.DefaultIfEmpty()
             join Ottss in _ottservicetest on dt.OttserviceTestId equals Ottss.Id
                into ottsts                                //use for left join
             from ottstsVal in ottsts.DefaultIfEmpty()
             join Net in _network on dt.NetworkId equals Net.Id
             join B in _band on dt.BandId equals B.Id
             join Lfpt in _logFilePartitionsType on dt.LogFilePartitionTypeId equals Lfpt.Id into Lfpts
             from lfptVal in Lfpts.DefaultIfEmpty()
             join Ipt in _ipType on dt.IptypeId equals Ipt.Id into Ipts
             from IptVal in Ipts.DefaultIfEmpty()
             orderby dt.Id descending
             select new DefinedTestVm
             {
                 Id = dt.Id,
                 Title = dt.Title,
                 IsActive = dt.IsActive,
                 Layer3Messages = dt.Layer3Messages,
                 RepeatTypeId = dt.RepeatTypeId,
                 RepeatTime = dt.RepeatTime,
                 MeasurementInterval = dt.MeasurementInterval,
                 TestTypeId = dt.TestTypeId,
                 UsualCallDuration = dt.UsualCallDuration,
                 UsualCallWaitTime = dt.UsualCallWaitTime,
                 UsualCallNumber = dt.UsualCallNumber,
                 TestDataId = dt.TestDataId,
                 TestDataTypeId = dt.TestDataTypeId,
                 TestDataServer = dt.TestDataServer,
                 TestDataUserName = dt.TestDataUserName,
                 TestDataPassword = dt.TestDataPassword,
                 TestDataUploadFileSize = dt.TestDataUploadFileSize,
                 OTTServiceId = dt.OttserviceId,
                 OTTServiceTestId = dt.OttserviceTestId,
                 NetworkId = dt.NetworkId,
                 BandId = dt.BandId,
                 SaveLogFile = dt.SaveLogFile,
                 LogFilePartitionTypeId = dt.LogFilePartitionTypeId,
                 LogFilePartitionTime = dt.LogFilePartitionTime,
                 LogFilePartitionSize = dt.LogFilePartitionSize,
                 LogFileHoldTime = dt.LogFileHoldTime,
                 IPTypeId = dt.IptypeId,
                 NumberOfPings = dt.NumberOfPings,
                 PacketSize = dt.PacketSize,
                 InternalTime = dt.InternalTime,
                 ResponseWaitTime = dt.ResponseWaitTime,
                 TTL = dt.Ttl,
                 RepeatTypeTitle = Rt.Title,
                 TestTypeTitle = Tt.Title,
                 TestDataTypeTitle = testdatatypesVal.Title,
                 IPTypeTitle = IptVal.Title,
                 OTTServiceTitle = ottsVal.Title,
                 OTTServiceTestTitle = ottstsVal.Title,
                 NetworkTitle = Net.Title,
                 BandTitle = B.Title,
                 LogFilePartitionTypeTitle = lfptVal.Title,

                 Editable = _definedTestmachine.Any(x => x.DefinedTestId == dt.Id)
             };
            return res.FirstOrDefault();
            // _tEntities.FromSqlRaw("Exec GetTestById", new SqlParameter("@Id", Id));

        }
    }
}