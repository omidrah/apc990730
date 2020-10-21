using System.ComponentModel;
using System;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Services.Interfaces;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ActiveProbeCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [DisplayName("ActiveProbe کنترلر ")]
    //it is not used
    public class ActiveProbeController : ControllerBase
    {
        private IHttpContextAccessor _accessor;
        private IUnitOfWork _uow;
        private ILogErrService _err;
        public ActiveProbeController(IHttpContextAccessor accessor, IUnitOfWork uow, ILogErrService err)
        {
            _accessor = accessor;
            _uow = uow;
            _err = err;
        }
        // POST: api/CoverageMap
        [HttpPost]
        public async Task<string> Post(object value)
        {
            bool ReturnVal = false;
            try
            {
                await _err.LogErrorAsync(new Exception("ActiveProbe"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
                //model validation
                string encryptedContent = (value ?? ",").ToString().Split(",")[1];
                string vikey = (value ?? ",").ToString().Split(",")[0];
                string content = await encryptedContent.DecryptInputString(vikey).ConfigureAwait(false);
                return (vikey + "," + ReturnVal.ToString().Encrypt("sample_shared_secret", vikey)).ToJsonString();
            }
            catch (Exception ex)
            {
                await _err.LogErrorAsync(ex, (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
                return ("BgrUEy5IbpJSnhmqI2IhKw==" + "," + ReturnVal.ToString().Encrypt("sample_shared_secret", "BgrUEy5IbpJSnhmqI2IhKw==")).ToJsonString();
            }
        }
    }
}