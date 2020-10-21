using System.Linq;
using ActiveProbe.Services.Interfaces;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using OfficeOpenXml;
using SharpKml.Base;
using SharpKml.Dom;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ActiveProbe.Utils.ViewModel;
using ActiveProbe.DataLayer.Context;
using System.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using ActiveProbe.Services;
using System.ComponentModel;

namespace ActiveProbeCore.Controllers
{   
    [Route("api/[controller]")]
    [Authorize(Policy=ConstantPolicies.dynKkomAuthorization)]
    [DisplayName("گزارشات")]
    [ApiController]
    public class ExportController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ITestResultService _testResult;
        private readonly IUnitOfWork _uow;
        private ILogErrService _logger;
        private readonly ILogger _dlogger;

        public ExportController(IWebHostEnvironment hostingEnvironment, ITestResultService testResult, ILogErrService logger, IUnitOfWork uow, ILogger<ExportController> dlogger)
        {
            _hostingEnvironment = hostingEnvironment;
            _testResult = testResult;
            _uow = uow;
            _logger = logger;
            _dlogger = dlogger;
        }

        [HttpGet]
        [Route("DefaultDateTime")]
        public async Task<object> DefaultDateTime()
        {
            var t = new
            {
                DefaultDate = Util.GetPersianDate(DateTime.Now),
                DefaultTime = Util.GetPersianTime(DateTime.Now)
            };
            return t;
        }
        [HttpPost]
        [Route("Submit")]
        [DisplayName("کزارش کامل")]
        public async Task<FileResult> Submit(object export)
        {
            Export exp = new Export();
            exp.ZoneId = (int)JObject.Parse(export.ToString())["zone"];
            exp.MachineId = (int)JObject.Parse(export.ToString())["machineId"];
            exp.SIM = (short)JObject.Parse(export.ToString())["sim"];
            exp.DefinedTestId = (int)JObject.Parse(export.ToString())["definedTestId"];
            var beginDate = JObject.Parse(export.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(export.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            exp.BeginDate = beginDateLocalTime;
            exp.EndDate = endDateLocalTime;
            _dlogger.LogInformation("logInf => " + string.Join("-", exp));

            var list = await Util.Export(exp).ConfigureAwait(false);
            //run sp from efcore by params 
            // var p = new SqlParameter
            // {
            //     ParameterName = "OutPutParametname",
            //     DbType = System.Data.DbType.Int32,
            //     Size = 100,
            //     Direction = System.Data.ParameterDirection.Output
            // };
            // _uow.ExecuteSqlCommand("exec GetMachineInZone @MachineId,@ZoneId,@BeginDate,@EndDate,@DefinedTestId,@Sim,@Param output",
            //     new SqlParameter("@MachineId", exp.MachineId), new SqlParameter("@ZoneId", exp.ZoneId),
            //     new SqlParameter("@BeginDate", exp.BeginDate), new SqlParameter("@EndDate", exp.EndDate),
            //     new SqlParameter("@DefinedTestId", exp.DefinedTestId), new SqlParameter("@Sim", exp.SIM),
            //     new SqlParameter("@Param", p));
            var stream = new MemoryStream();
            string excelName = @"demo.xlsx";
            using (var package = new ExcelPackage(stream))
            {
                var workSheet = package.Workbook.Worksheets.Add("Sheet1");
                workSheet.Cells.LoadFromCollection(list, true);
                workSheet.Cells.AutoFitColumns(); // omid-add 98-11-20
                workSheet.Cells["A1:AV1"].Style.Font.Size = 13;// omid-add 98-11-20
                workSheet.Cells["A1:AV"].Style.Font.Name = "Calibri";// omid-add 98-11-20
                workSheet.Cells["A1:AV"].Style.Font.Bold = true;                // omid-add 98-11-20
                package.Save();
            }
            stream.Position = 0;
            // string excelName = "UserList.xlsx";
            //return File(stream, "application/octet-stream", excelName);  
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }
        [HttpPost]
        [Route("GenKml")]
        [DisplayName("گزارش اختصاصی")]
        public async Task<string> GenKml(object export)
        {
            Export exp = new Export();
            exp.MachineId = (int)JObject.Parse(export.ToString())["machineId"];
            exp.SIM = (short)JObject.Parse(export.ToString())["sim"];
            exp.ParamKml = (string)JObject.Parse(export.ToString())["ParamKml"];
            exp.DefinedTestId = (int)JObject.Parse(export.ToString())["definedTestId"];
            var beginDate = JObject.Parse(export.ToString())["beginDate"];
            var beginDateLocalTime = Convert.ToDateTime(beginDate).ToLocalTime();
            var endDate = JObject.Parse(export.ToString())["endDate"];
            var endDateLocalTime = Convert.ToDateTime(endDate).ToLocalTime();
            exp.BeginDate = beginDateLocalTime;
            exp.EndDate = endDateLocalTime;
            var list = _testResult.GetAll().Where(x =>
                         (x.MachineId == exp.MachineId || x.MachineId == null || x.MachineId == 0)
                         && (x.Lat != null && x.Long != null)
                         && (x.CreateDate >= exp.BeginDate && x.CreateDate <= exp.EndDate));
            var result = new List<KmlResult>();
            try
            {
                double? parVal = 0;
                foreach (var x in list)
                {
                    switch (exp.ParamKml.ToLower())
                    {
                        case "rxlevel":
                            parVal = Convert.IsDBNull(x.Rxlevel) ? null : x.Rxlevel;
                            break;
                        case "rscp":
                            parVal = Convert.IsDBNull(x.Rscp) ? null : x.Rscp;
                            break;
                        case "rsrp":
                            parVal = Convert.IsDBNull(x.Rsrp) ? null : x.Rsrp;
                            break;
                        case "rxqual":
                            parVal = Convert.IsDBNull(x.Rxqual) ? null : x.Rxqual;
                            break;
                        case "ecio":
                            parVal = Convert.IsDBNull(x.Ecio) ? null : x.Ecio;
                            break;
                        case "rsrq":
                            parVal = Convert.IsDBNull(x.Rsrq) ? null : x.Rsrq;
                            break;
                        case "mnc":
                            parVal = Convert.IsDBNull(x.Mnc) ? null : x.Mnc;
                            break;
                        default:
                            parVal = 0; //Route plot mean  without param
                            break;
                    }
                    result.Add(new KmlResult
                    {
                        machineId = Convert.IsDBNull(x.MachineId) ? null : x.MachineId,
                        Lat = Convert.IsDBNull(x.Lat) ? null : x.Lat,
                        Long = Convert.IsDBNull(x.Long) ? null : x.Long,
                        ParamKml = exp.ParamKml,
                        paramkmlVal = parVal
                    });
                }
            }
            catch (Exception e)
            {
                await _logger.LogErrorAsync(e, "Params in Export Kml Has problem", string.Join("-", list)).ConfigureAwait(false);
                Console.WriteLine(e.Message);
            }

            #region generate_KmlFile
            var kml = new SharpKml.Dom.Kml();
            var document = new Document();
            kml.Feature = document;
            generateStyle(document);
            //document.AddFeature(genrateLineString(document, list));
            genratePlaceMarket(document, result);
            var serializer = new Serializer();
            serializer.Serialize(kml);
            return serializer.Xml;
            #endregion
        }
        /// <summary>
        /// generate Kml file by lineString for location
        /// </summary>
        /// <param name="document"></param>
        /// <param name="list"></param>
        private Placemark genrateLineString(Document document, List<KmlResult> list)
        {
            SharpKml.Dom.LineString line = new SharpKml.Dom.LineString();
            line.Extrude = true;
            line.Tessellate = true;
            var dd = new CoordinateCollection();
            var selectedStyle = "";
            foreach (var p in list)
            {
                switch (p.ParamKml.ToLower())
                {
                    case "rxlevel":
                        if (p.paramkmlVal >= -90)
                        {
                            selectedStyle = "green";
                        }
                        else if (p.paramkmlVal >= -93 && p.paramkmlVal < -90)
                        {
                            selectedStyle = "yellow";
                        }
                        else if (p.paramkmlVal < -93)
                        {
                            selectedStyle = "red";
                        }
                        break;
                    case "rscp":
                        if (p.paramkmlVal >= -105)
                        {
                            selectedStyle = "green";
                        }
                        else if (p.paramkmlVal >= -113 && p.paramkmlVal < -105)
                        {
                            selectedStyle = "yellow";
                        }
                        else if (p.paramkmlVal < -113)
                        {
                            selectedStyle = "red";
                        }
                        break;
                    case "rsrp":
                        if (p.paramkmlVal >= -108)
                        {
                            selectedStyle = "green";
                        }
                        else if (p.paramkmlVal >= -116 && p.paramkmlVal < -108)
                        {
                            selectedStyle = "yellow";
                        }
                        else if (p.paramkmlVal < -116)
                        {
                            selectedStyle = "red";
                        }
                        break;
                    case "rxqual":
                        if (p.paramkmlVal < 5)
                        {
                            selectedStyle = "green";
                        }
                        else if (p.paramkmlVal >= 5 && p.paramkmlVal < 6)
                        {
                            selectedStyle = "yellow";
                        }
                        else if (p.paramkmlVal >= 6)
                        {
                            selectedStyle = "red";
                        }
                        break;
                    case "ecio":
                        if (p.paramkmlVal >= -16)
                        {
                            selectedStyle = "green";
                        }
                        else if (p.paramkmlVal >= -18 && p.paramkmlVal < -16)
                        {
                            selectedStyle = "yellow";
                        }
                        else if (p.paramkmlVal < -18)
                        {
                            selectedStyle = "red";
                        }
                        break;
                    case "rsrq":
                        if (p.paramkmlVal >= -16)
                        {
                            selectedStyle = "green";
                        }
                        else if (p.paramkmlVal >= -18 && p.paramkmlVal < -16)
                        {
                            selectedStyle = "yellow";
                        }
                        else if (p.paramkmlVal < -18)
                        {
                            selectedStyle = "red";
                        }
                        break;
                    case "mnc":
                        if (p.paramkmlVal == 11)
                        {
                            selectedStyle = "blue";
                        }
                        else if (p.paramkmlVal == 35)
                        {
                            selectedStyle = "orange";
                        }
                        else if (p.paramkmlVal == 20)
                        {
                            selectedStyle = "purple";
                        }
                        else
                        {
                            selectedStyle = "green";
                        }
                        break;
                }
                dd.Add(new Vector(p.Lat ?? 0, p.Long ?? 0));
            }
            line.Coordinates = dd;
            var pm = new Placemark();
            pm.Geometry = line;
            switch (selectedStyle)
            {
                case "green":
                    pm.StyleUrl = new Uri("#green", UriKind.Relative);
                    break;
                case "red":
                    pm.StyleUrl = new Uri("#red", UriKind.Relative);
                    break;
                case "yellow":
                    pm.StyleUrl = new Uri("#yellow", UriKind.Relative);
                    break;
                case "blue":
                    pm.StyleUrl = new Uri("#blue", UriKind.Relative);
                    break;
                case "purple":
                    pm.StyleUrl = new Uri("#purple", UriKind.Relative);
                    break;
                case "orange":
                    pm.StyleUrl = new Uri("#orange", UriKind.Relative);
                    break;
                default:
                    pm.StyleUrl = new Uri("#white", UriKind.Relative);
                    break;
            }
            return pm;
        }
        /// <summary>
        /// define different color style for show in Kml lineString
        /// </summary>
        /// <param name="document"></param>
        private void generateStyle(SharpKml.Dom.Document document)
        {

            var greenLs = new SharpKml.Dom.LineStyle();
            greenLs.Color = Color32.Parse("ff235523"); //green            
            greenLs.Width = 2;
            var greenStyle = new SharpKml.Dom.Style();
            greenStyle.Id = "green";
            greenStyle.Line = greenLs;
            greenStyle.Icon = new IconStyle
            {
                Color = greenLs.Color,
                //http://maps.google.com/mapfiles/kml/paddle/wht-blank.png
                Icon = new IconStyle.IconLink(new Uri("http://maps.google.com/mapfiles/kml/shapes/road_shield3.png")),
                Scale = 0.5
            };

            var redLs = new SharpKml.Dom.LineStyle();
            redLs.Color = Color32.Parse("501400FF"); //red
            redLs.Width = 2;
            var redStyle = new SharpKml.Dom.Style();
            redStyle.Id = "red";
            redStyle.Line = redLs;
            redStyle.Icon = new IconStyle
            {
                Color = redLs.Color,
                Icon = new IconStyle.IconLink(new Uri("http://maps.google.com/mapfiles/kml/shapes/road_shield3.png")),
                Scale = 0.5
            };


            var yellowLs = new SharpKml.Dom.LineStyle()
            {
                Color = Color32.Parse("5014F0FA"), //yellow 
                Width = 2
            };
            var yellowStyle = new SharpKml.Dom.Style();
            yellowStyle.Id = "yellow";
            yellowStyle.Line = yellowLs;
            yellowStyle.Icon = new IconStyle
            {
                Color = yellowLs.Color,
                Icon = new IconStyle.IconLink(new Uri("http://maps.google.com/mapfiles/kml/shapes/road_shield3.png")),
                Scale = 0.5
            };

            var blueLs = new SharpKml.Dom.LineStyle();
            blueLs.Color = Color32.Parse("50B40A14"); //blue
            blueLs.Width = 2;
            var blueStyle = new SharpKml.Dom.Style();
            blueStyle.Id = "blue";
            blueStyle.Line = blueLs;
            blueStyle.Icon = new IconStyle
            {
                Color = blueLs.Color,
                Icon = new IconStyle.IconLink(new Uri("http://maps.google.com/mapfiles/kml/shapes/road_shield3.png")),
                Scale = 0.5
            };


            var purpLs = new SharpKml.Dom.LineStyle();
            purpLs.Color = Color32.Parse("50783214"); //purple 
            purpLs.Width = 2;
            var purpleStyle = new SharpKml.Dom.Style();
            purpleStyle.Id = "purple";
            purpleStyle.Line = purpLs;
            purpleStyle.Icon = new IconStyle
            {
                Color = purpLs.Color,
                Icon = new IconStyle.IconLink(new Uri("http://maps.google.com/mapfiles/kml/shapes/road_shield3.png")),
                Scale = 0.5
            };


            var orangeLs = new SharpKml.Dom.LineStyle();
            orangeLs.Color = Color32.Parse("cc1447ff"); //Orange
            orangeLs.Width = 2;
            var orangeStyle = new SharpKml.Dom.Style();
            orangeStyle.Id = "orange";
            orangeStyle.Line = orangeLs;
            orangeStyle.Icon = new IconStyle
            {
                Color = orangeLs.Color,
                Icon = new IconStyle.IconLink(new Uri("http://maps.google.com/mapfiles/kml/shapes/road_shield3.png")),
                Scale = 0.5
            };

            var whiteLs = new SharpKml.Dom.LineStyle();
            whiteLs.Color = Color32.Parse("ffffffff"); //white
            whiteLs.Width = 2;
            var whiteStyle = new SharpKml.Dom.Style();
            whiteStyle.Id = "white";
            whiteStyle.Line = whiteLs;
            whiteStyle.Icon = new IconStyle
            {
                Color = whiteLs.Color,
                Icon = new IconStyle.IconLink(new Uri("http://maps.google.com/mapfiles/kml/shapes/road_shield3.png")),
                Scale = 0.5
            };

            document.AddStyle(greenStyle);
            document.AddStyle(redStyle);
            document.AddStyle(yellowStyle);
            document.AddStyle(blueStyle);
            document.AddStyle(purpleStyle);
            document.AddStyle(orangeStyle);
            document.AddStyle(whiteStyle);
        }

        /// <summary>
        /// normal kml by placeMarket
        /// </summary>
        /// <param name="document"></param>
        /// <param name="list"></param>
        private void genratePlaceMarket(SharpKml.Dom.Document document, List<KmlResult> list)
        {
            foreach (var p in list)
            {
                var pm = new Placemark();
                //placemark.StyleUrl = new Uri("#post_vanlig", UriKind.Relative);
                //placemark.Time = new TimeSpan { Begin = p.SynligFraTid, End = p.SynligTilTid };
                //placemark.Name = p.Navn;
                pm.Geometry = new Point { Coordinate = new Vector(p.Lat ?? 0, p.Long ?? 0) };

                pm.ExtendedData = new ExtendedData();
                pm.ExtendedData.AddData(new Data { Value = p.Lat.ToString(), Name = "lat" });
                pm.ExtendedData.AddData(new Data { Value = p.Long.ToString(), Name = "long" });
                if (p.ParamKml.ToLower() != "route plot")
                {
                    pm.ExtendedData.AddData(new Data { Value = p.paramkmlVal.ToString(), Name = p.ParamKml });
                }
                switch (p.ParamKml.ToLower())
                {
                    case "rxlevel":
                        if (p.paramkmlVal >= -90)
                        {
                            pm.StyleUrl = new Uri("#green", UriKind.Relative);
                        }
                        else if (p.paramkmlVal >= -93 && p.paramkmlVal < -90)
                        {
                            pm.StyleUrl = new Uri("#yellow", UriKind.Relative);
                        }
                        else if (p.paramkmlVal < -93)
                        {
                            pm.StyleUrl = new Uri("#red", UriKind.Relative);
                        }
                        else
                        {
                            pm.StyleUrl = new Uri("#white", UriKind.Relative);
                        }
                        break;
                    case "rscp":
                        if (p.paramkmlVal >= -105)
                        {
                            pm.StyleUrl = new Uri("#green", UriKind.Relative);
                        }
                        else if (p.paramkmlVal >= -113 && p.paramkmlVal < -105)
                        {
                            pm.StyleUrl = new Uri("#yellow", UriKind.Relative);
                        }
                        else if (p.paramkmlVal < -113)
                        {
                            pm.StyleUrl = new Uri("#red", UriKind.Relative);
                        }
                        else
                        {
                            pm.StyleUrl = new Uri("#white", UriKind.Relative);
                        }
                        break;
                    case "rsrp":
                        if (p.paramkmlVal >= -108)
                        {
                            pm.StyleUrl = new Uri("#green", UriKind.Relative);
                        }
                        else if (p.paramkmlVal >= -116 && p.paramkmlVal < -108)
                        {
                            pm.StyleUrl = new Uri("#yellow", UriKind.Relative);
                        }
                        else if (p.paramkmlVal < -116)
                        {
                            pm.StyleUrl = new Uri("#red", UriKind.Relative);
                        }
                        else
                        {
                            pm.StyleUrl = new Uri("#white", UriKind.Relative);
                        }
                        break;
                    case "rxqual":
                        if (p.paramkmlVal < 5)
                        {
                            pm.StyleUrl = new Uri("#green", UriKind.Relative);
                        }
                        else if (p.paramkmlVal >= 5 && p.paramkmlVal < 6)
                        {
                            pm.StyleUrl = new Uri("#yellow", UriKind.Relative);
                        }
                        else if (p.paramkmlVal >= 6)
                        {
                            pm.StyleUrl = new Uri("#red", UriKind.Relative);
                        }
                        else
                        {
                            pm.StyleUrl = new Uri("#white", UriKind.Relative);
                        }
                        break;
                    case "ecio":
                        if (p.paramkmlVal >= -16)
                        {
                            pm.StyleUrl = new Uri("#green", UriKind.Relative);
                        }
                        else if (p.paramkmlVal >= -18 && p.paramkmlVal < -16)
                        {
                            pm.StyleUrl = new Uri("#yellow", UriKind.Relative);
                        }
                        else if (p.paramkmlVal < -18)
                        {
                            pm.StyleUrl = new Uri("#red", UriKind.Relative);
                        }
                        else
                        {
                            pm.StyleUrl = new Uri("#white", UriKind.Relative);
                        }
                        break;
                    case "rsrq":
                        if (p.paramkmlVal >= -16)
                        {
                            pm.StyleUrl = new Uri("#green", UriKind.Relative);
                        }
                        else if (p.paramkmlVal >= -18 && p.paramkmlVal < -16)
                        {
                            pm.StyleUrl = new Uri("#yellow", UriKind.Relative);
                        }
                        else if (p.paramkmlVal < -18)
                        {
                            pm.StyleUrl = new Uri("#red", UriKind.Relative);
                        }
                        else
                        {
                            pm.StyleUrl = new Uri("#white", UriKind.Relative);
                        }
                        break;
                    case "mnc":
                        if (p.paramkmlVal == 11)
                        {
                            pm.StyleUrl = new Uri("#blue", UriKind.Relative);
                        }
                        else if (p.paramkmlVal == 35)
                        {
                            pm.StyleUrl = new Uri("#orange", UriKind.Relative);
                        }
                        else if (p.paramkmlVal == 20)
                        {
                            pm.StyleUrl = new Uri("#purple", UriKind.Relative);
                        }
                        else
                        {
                            pm.StyleUrl = new Uri("#green", UriKind.Relative);
                        }
                        break;
                    default: //Route plot mean without param
                        pm.StyleUrl = new Uri("#white", UriKind.Relative);
                        break;
                }
                document.AddFeature(pm);
            }
        }

    }
}
