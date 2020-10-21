
using System.Net;
using System.Collections.Generic;
using System.Linq;
using ActiveProbe.DataLayer.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services;
using Microsoft.Extensions.Options;
using ActiveProbe.Utils.ViewModel;

namespace ActiveProbeCore.Controllers
{
    //Used for defined test types and configs
    [Route("api/[controller]")]    
    [ApiController]
    public class ConfigController : ControllerBase
    {
        IUnitOfWork _uow;
        private readonly ConfigurationsVm _config;

        public ConfigController(IUnitOfWork uow,
            IOptions<ConfigurationsVm> config)
        {
            _uow = uow;
            _config = config.Value;
        }
        [HttpGet]
        [Route("GetConfigDatas/{configName}")]
        public IEnumerable<object> GetConfigDatas(string configName)
        {

            switch (configName.ToLower())
            {
                case "repeattype":
                    return _uow.Set<ActiveProbe.Domain.Models.RepeatType>().
                        AsEnumerable().Select(x => new
                        {
                            Id = x.Id,
                            Title = x.Title
                        }).ToList();

                    break;
                case "direction":
                    return _uow.Set<ActiveProbe.Domain.Models.Direction>().
                        AsEnumerable().Select(x => new
                        {
                            Id = x.Id,
                            Title = x.Title
                        }).ToList();
                    break;
                case "testtype":
                    return _uow.Set<ActiveProbe.Domain.Models.TestType>().
                        AsEnumerable().Select(x => new
                        {
                            Id = x.Id,
                            Title = x.Title
                        }).ToList();
                    break;
                case "testdata":
                    return _uow.Set<ActiveProbe.Domain.Models.TestData>().
                      AsEnumerable().Select(x => new
                      {
                          Id = x.Id,
                          Title = x.Title
                      }).ToList();
                    break;
                case "testdatatype":
                    return _uow.Set<ActiveProbe.Domain.Models.TestDataType>().
                         AsEnumerable().Select(x => new
                         {
                             Id = x.Id,
                             Title = x.Title
                         }).ToList();
                    break;

                case "ottservice":
                    return _uow.Set<ActiveProbe.Domain.Models.Ottservice>().
                    AsEnumerable().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title
                    }).ToList();
                    break;
                case "ottservicetest":
                    return _uow.Set<ActiveProbe.Domain.Models.OttserviceTest>().
                    AsEnumerable().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title
                    }).ToList();

                    break;
                case "network":
                    return _uow.Set<ActiveProbe.Domain.Models.Network>().
                    AsEnumerable().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title
                    }).ToList();
                    break;
                case "band":
                    return _uow.Set<ActiveProbe.Domain.Models.Band>().
                    AsEnumerable().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title
                    }).ToList();

                    break;
                case "logfilepartitiontype":
                    return _uow.Set<ActiveProbe.Domain.Models.LogFilePartitionType>().
                    AsEnumerable().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title
                    }).ToList();

                    break;
                case "iptype":
                    return _uow.Set<ActiveProbe.Domain.Models.Iptype>().
                    AsEnumerable().Select(x => new
                    {
                        Id = x.Id,
                        Title = x.Title
                    }).ToList();

                    break;
                default:
                    return null;
            }
            //   var tb = _uow.GetType().GetProperty(Util.UppercaseFirst(configName)).GetValue(_uow);                        
            // var dd = _uow.Entry(_uow.GetType().GetProperties().FirstOrDefault(x=>x.Name==configName).GetType()).Entity;
            // var type = _uow.GetType().GetProperties().FirstOrDefault(x=>x.Name==configName).GetType();            
            //  Microsoft.EntityFrameworkCore.DbSet<TEntity> dbSet = _uow.Set<TEntity>();            
        }

        [HttpGet]
        [Route("GetAppConfigurations")]
        public ConfigurationsVm GetAppConfigurations()
        {
            var t = _config;
            return t;
        }
    }
}