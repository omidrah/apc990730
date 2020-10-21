using ActiveProbe.DataLayer.Context;
using ActiveProbe.Services.Interfaces;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;

namespace ActiveProbeCore.Controllers
{   //for KCNet Test Results
    [ApiController]
    [Route("api/[controller]")]
    [DisplayName("KCNET")]
    public class KCNetController : ControllerBase    {
        private IHttpContextAccessor _accessor;
        private ILogErrService   _logger;
        private IUnitOfWork _uow;
        private IRecievedCommandService _recievedCommand;
         public KCNetController(IHttpContextAccessor accessor,IRecievedCommandService recievedCommand,ILogErrService logger,IUnitOfWork uow)
        {
            _accessor = accessor;
            _recievedCommand= recievedCommand;
            _logger =logger;
            _uow = uow;
        }
        // GET api/values
        [HttpGet]
        //Not Used
        public ActionResult<IEnumerable<string>> Get()
        {
            _logger.LogErrorAsync(new Exception("KCNetGet"), " ", _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).Wait();
            return new string[] { "value1", "value2" };
        }
        // POST api/values
        //Mobile apps send its test results to this api
        [HttpPost]
        
        public async Task Post(object value)
        {
             _logger.LogErrorAsync(new Exception("KCNetPost"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
            try
            {
                //model validation
                string encryptedContent = (value ?? ",").ToString().Split(",")[1];
                string vikey = (value ?? ",").ToString().Split(",")[0];
                string content = await encryptedContent.DecryptInputString(vikey);
                
                if (!string.IsNullOrEmpty(content))
                {
                    _recievedCommand.Add(new ActiveProbe.Domain.Models.RecievedCommand{
                        Data= content
                    });
                    await _uow.SaveChangesAsync();                                       
                }
            }
            catch (Exception ex)
            {
                await _logger.LogErrorAsync(ex, (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString());
            }


        }
    }
}
