using System;
using System.ComponentModel;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ActiveProbeCore.Controllers
{   //for voice quality upload!
    [Route("api/[controller]")]
    [DisplayName("کیفیت صدا")]
    [ApiController]
    public class VoiceQualityController : ControllerBase
    {
        private IHttpContextAccessor _accessor;
        public VoiceQualityController(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task Post([FromForm]string value)
        {
            bool ReturnVal = false;
            try
            {
                await Util.LogErrorAsync(new Exception("VoiceQuality"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
                //model validation
                string encryptedContent = (value ?? ",").ToString().Split(",")[1];
                string vikey = (value ?? ",").ToString().Split(",")[0];
                string content = await encryptedContent.DecryptInputString(vikey).ConfigureAwait(false);

                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                else
                {
                }
            }
            catch (Exception ex)
            {
                await Util.LogErrorAsync(ex, ("error in VoiceQuanlity").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
            }
        }
    }
}