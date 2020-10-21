using System;
using System.ComponentModel;
using System.Threading.Tasks;
using ActiveProbe.Services;
using ActiveProbe.Services.Interfaces;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ActiveProbeCore.Controllers
{
    //Get coverage map
    [Route("api/[controller]")]
    [Authorize(Policy=ConstantPolicies.dynKkomAuthorization)]
    [DisplayName("نقشه")]
    [ApiController]
    public class CoverageMapController : ControllerBase
    {
        private IHttpContextAccessor _accessor;
        private ILogErrService _err;
        public CoverageMapController(IHttpContextAccessor accessor, ILogErrService err)
        {
            _accessor = accessor;
            _err = err;
        }
        // POST: api/CoverageMap
        [HttpPost]
        [DisplayName("نمایش پوشش دهی نقشه")]
        public async Task<string> Post(object value)
        {
            try
            {
                await _err.LogErrorAsync(new Exception("CoverageMapPost"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);

                string encryptedContent = (value ?? ",").ToString().Split(",")[1];
                string vikey = (value ?? ",").ToString().Split(",")[0];
                string content = await encryptedContent.DecryptInputString(vikey).ConfigureAwait(false);
                var js = JObject.Parse(content);

                string t = Util.GetMapDB(js["SouthWestLat"].Value<Decimal>(), js["NorthEastLat"].Value<Decimal>(), js["SouthWestLng"].Value<Decimal>(), js["NorthEastLng"].Value<Decimal>(), js["MapOperator"].Value<long>(), js["MapNetTech"].Value<long>()).Result;

                var val = "{\"polynomials\": [" + (t.TrimEnd(',')) + " ]}";
                //return val;
                return (vikey + "," + val.Encrypt("sample_shared_secret", vikey)).ToJsonString();
            }
            catch (Exception ex)
            {

                await _err.LogErrorAsync(ex, (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
                return ("BgrUEy5IbpJSnhmqI2IhKw==" + "," + "".Encrypt("sample_shared_secret", "BgrUEy5IbpJSnhmqI2IhKw==")).ToJsonString();
            }

        }
    }
}