using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.Net.Http.Headers;
using ActiveProbe.Utils.ViewModel;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services;
using System.ComponentModel;

namespace ActiveProbeCore.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = ConstantPolicies.dynKkomAuthorization)]
    [DisplayName("موقعیت یابی")]
    [ApiController]
    public class GeoLocationController : ControllerBase    {
        private IWebHostEnvironment _hostingEnvironment;
        private IZonesService _zones;
        private IZonePointService _zonePoints;
        private IZonesKmlService _zoneKmls;
        private IUnitOfWork  _uow;
        public GeoLocationController(IZonesService zones, IZonePointService zonePoints,
        IUnitOfWork uow,IZonesKmlService zoneKmls,IWebHostEnvironment hostingEnvironment)
        {
            _zones = zones;
            _zonePoints = zonePoints;
            _uow = uow;
            _zoneKmls = zoneKmls;        
            _hostingEnvironment = hostingEnvironment;
        }
        [HttpGet]
        [Route("GetKmlByZone/{Id}")]
        [DisplayName("  با منطقهKml تولید ")]
        public ZoneKmlVm GetKmlByZoneId(int Id)
        {
            var cur =  _zoneKmls.Find(x=>x.ZoneId==Id);
            if(cur!=null){
                return new ZoneKmlVm{
                    Id= cur.Id,
                    KmlFile= cur.KmlFile,
                    ZoneId = cur.ZoneId
                };
            }
            return null;
        }
        [HttpGet]
        [Route("GetZoneByPoints")]
        [DisplayName("نمایش منطقه با نقاط")]
        public List<ZPoint> GetZoneByPoints()
        {
            return _zonePoints.GetZoneByPoints().ToList();
        }
        [HttpGet]
        [Route("GetZones")]
        [DisplayName("لیست مناطق ")]
        public List<ZoneVm> GetZones()
        {
             var dd = _zones.GetAll();
            return dd.Select(x=>new ZoneVm{ ZoneId=x.ZoneId,Type=x.Type, IsActive= x.IsActive, Title= x.Title}).ToList();
        }
        [HttpGet]
        [Route("getPointsByZoneId/{Id}")]
        [DisplayName("لیست نقاط یک منطقه")]
        public List<ZonePointVm> GetPointsByZoneId(int Id)
        {
            return _zonePoints.GetAll().Where(x => x.ZoneId == Id).
                      Select(x => new ZonePointVm
                      {
                          Id = x.Id,
                          Lat = x.Lat,
                          Lon = x.Lon,
                          ZoneId = x.ZoneId
                      }).ToList();
        }
        [HttpPost]
        [Route("AddZone")]
        [DisplayName("افزودن منطقه")]
        public async Task<int> AddZone([FromBody]ZoneVm newZone)
        {
            _zones.Add(new ActiveProbe.Domain.Models.Zones
            {
                Title = newZone.Title,
                Type = newZone.Type,
                IsActive = newZone.IsActive
            });
            return await _uow.SaveChangesAsync();
        }
        [HttpPost]
        [Route("AddPoint")]
        [DisplayName("افزودن نقطه روی منطقه")]
        public async Task<int> AddPoint([FromBody]List<ZonePointVm> newZonePoint)
        {  
            foreach (var item in newZonePoint)
            {
                _zonePoints.Add(new ZonePoint{
                            Lat=item.Lat,
                            Lon=item.Lon,
                            ZoneId= item.ZoneId
                        });        
            }
            return await _uow.SaveChangesAsync();
        }
        [HttpDelete]
        [Route("DelZone/{id}")]
        [DisplayName("حذف منطقه")]
        ///delete by ZoneId
        public async Task<int> DeleteZone(int id) {
              _zones.Delete(_zones.Find(x=>x.ZoneId==id));               
             return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }
        [HttpDelete]
        [Route("DelKmlZone/{id}")]
        [DisplayName("KML حذف ")]
        public async Task<int> DeleteKmlZone(int id)
        {
            var getKmlfile = _zoneKmls.Find(x=>x.ZoneId==id);
            if (getKmlfile != null)
            {
                string webRootPath = _hostingEnvironment.WebRootPath;
                string folderName = Path.Combine(webRootPath, getKmlfile.KmlFile);
                //remove file from server
                if (System.IO.File.Exists(folderName))
                {
                    System.IO.File.Delete(folderName);
                }
                _zones.Delete(_zones.Find(x=>x.ZoneId==id));
                return await _uow.SaveChangesAsync();
            }
            return 0;
        }

        [HttpPost]
        [Route("Kml")]
        [DisplayName(" روی نقشهKML آپلود")]
        public async Task<IActionResult> KmlUpload()
        {
            try
            {
                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    string folderName = Path.Combine(webRootPath, "Share", "UploadKmlFile");
                    string newPath = Path.Combine(webRootPath, folderName);
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim();
                    var fullPath = Path.Combine(newPath, fileName.ToString());
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream).ConfigureAwait(false);
                    }
                    // var onlocalhost = $"http://localhost:84/{folderName}/{fileName}";                         
                    var zId = (int)await AddZone(new ZoneVm() { Title = fileName.ToString(), Type = "KML", IsActive = true }).ConfigureAwait(false);
                     _zoneKmls.Add(new ZoneKml{
                          KmlFile = Path.Combine("Share", "UploadKmlFile", fileName.ToString()), ZoneId = zId 
                     });
                    var kzId =await _uow.SaveChangesAsync();
                    if (kzId > 0)
                    {
                        return Ok(new
                        {
                            code = 1,
                            ZoneId = zId,
                            msg = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/api/GeoLocation/GetFile/{fileName}"
                        });
                    }
                    return Ok(new result { code = 2, msg = "Error==> Insert Db.78541" });
                }
                return Ok(new result { code = 2, msg = "Select Update  File, please." });
            }
            catch (Exception ex)
            {
                return NotFound(new result { code = 3, msg = ex.Message });
            }
        }
        ///for serve static Kml file, in openLayerMap Upload
        [HttpGet]
        [Route("GetFile/{FileName}")]
        public IActionResult Index(string FileName)
        {
            var p = Path.Combine(_hostingEnvironment.WebRootPath, "Share", "UploadKmlFile");
            var stream = System.IO.File.OpenRead(Path.Combine(p, FileName));
            return new FileStreamResult(stream, "application/vnd.google-earth.kml+xml");
        }
    }
}