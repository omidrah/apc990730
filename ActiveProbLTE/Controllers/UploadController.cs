
using System.IO;
using System.Threading.Tasks;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ActiveProbeCore.Controllers
{
    //Used for defined test types and configs    
    public class UploadController : ControllerBase
    {   
        private IWebHostEnvironment _hostingEnvironment;
        public UploadController(IWebHostEnvironment hostingEnvironment)
        {            
            _hostingEnvironment = hostingEnvironment;
        }
        //for save Voice from MOscall, use in Curl by Device
        //omid add 99-01-25        
        [DisableRequestSizeLimit]
        [HttpPost]
        [Route("Uploads/{folderName?}")]
        public async Task<string> OnPostUploadAsync(IFormFile ufile, string folderName = null)
        {
            if (ufile != null && ufile.Length > 0)
            {
                string webRootPath = _hostingEnvironment.WebRootPath;
                //format  ufile=@/root/at00app/867057032627293_527_6_1586951566.wav
                var filename = ufile.FileName.Split('/');
                if (filename[filename.Length - 1].Split('.')[1] == "wav" && string.IsNullOrEmpty(folderName))
                {
                    folderName = "Mos";
                }
                else if (filename[filename.Length - 1].Split('.')[1] == "pcapng" && string.IsNullOrEmpty(folderName))
                {
                    folderName = "L3Files";
                }
                else if (filename[filename.Length - 1].Split('.')[1] == "txt" && string.IsNullOrEmpty(folderName))
                {
                    folderName = "Documents";
                }
                string newPath = !string.IsNullOrEmpty(folderName)
                                 ? Path.Combine(webRootPath, "Share", folderName)
                                 : Path.Combine(webRootPath, "Share");

                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }

                var fullPath = Path.Combine(newPath, filename[filename.Length - 1]);
                using (var stream = System.IO.File.Create(fullPath))
                {
                    await ufile.CopyToAsync(stream);
                }
                return $"\"UPL\"#\"Count\":1#\"Length\":\"{ufile.Length}\"#\"fname\":\"{filename[filename.Length - 1]}\"#\"msg\":\"Upload Success\" \n";
                //return Ok(new { count = 1, ufile.Length, msg = "file " + filename[filename.Length - 1] + " uploaded" });
            }
            return $"\"UPL\"#\"Count\":0#\"Length\":\"Nan\"#\"fname\":\"Nan\"#\"msg\":\"File Donot Exist\" \n";
        }

        [DisableRequestSizeLimit]
        [HttpPost]
        [Route("UploadLogs/{folderName?}/{SyncId?}")]
        public async Task<string> OnPostUploadLogAsync(IFormFile ufile, string folderName = null, int? SyncId = null)
        {
            try
            {

                if (SyncId == null)
                {
                    return $"\"SYU\"#\"SyncId\":{SyncId}#\"Count\":0#\"Length\":\"Nan\"#\"fname\":\"Nan\"#\"msg\":\"Sync Id Incorrect\" \n";
                }
                if (ufile != null && ufile.Length > 0)
                {
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    //format  ufile=@/root/at00app/867057032627293_527_6_1586951566.wav
                    var filename = ufile.FileName.Split('/');
                    string newPath = !string.IsNullOrEmpty(folderName)
                                     ? Path.Combine(webRootPath, "Share", folderName)
                                     : Path.Combine(webRootPath, "Share");

                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    var fullPath = Path.Combine(newPath, filename[filename.Length - 1]);
                    using (var stream = System.IO.File.Create(fullPath))
                    {
                        await ufile.CopyToAsync(stream);

                    }
                    //SYU=> Sync Upload
                    return $"\"SYU\"#\"SyncId\":{SyncId}#\"Count\":1#\"Length\":\"{ufile.Length}\"#\"fname\":\"{filename[filename.Length - 1]}\"#\"msg\":\"Upload Success\" \n";
                }
                return $"\"SYU\"#\"SyncId\":{SyncId}#\"Count\":0#\"Length\":\"Nan\"#\"fname\":\"Nan\"#\"msg\":\"File Donot Exist\" \n";


            }
            catch (System.Exception ex)
            {
                await Util.LogErrorAsync(ex, "UploadLogs").ConfigureAwait(false);
                return $"\"SYU\"#\"SyncId\":{SyncId}#\"Count\":0#\"Length\":\"Nan\"#\"fname\":\"Nan\"#\"msg\":\"" + ex.Message + "\" \n";
            }
        }
    }
}
