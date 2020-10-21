using ActiveProbeCore.BL;
using Hares.Utils.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System;
using System.Data;

namespace Hares.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MobileController : ControllerBase
    {
        private IWebHostEnvironment _hostingEnvironment;
        public MobileController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="newmachine"></param>
        /// <example>
        /// curl --connect-timeout 5 --max-time 6 -d "{\"IMEI\":\"867584033834578\", \"Location\":\"Null\", \"SimIndex\":\"0\", \"MNC\":\"11\", \"ICCID\":\"89981139000922448385\", \"SNR\":\"5.6dB\", \"CPSI\":\"LTE,Online,432-11,0xA8CA,23182594,207,EUTRAN-BAND7,3300,3,3,-137,-1076,-752,11\", \"Time\":\"2020_08_18_15_19_50\"}" -H "Content-Type: application/json" -X POST http://185.192.112.74:6072/api/mobile/update
        /// </example>
        /// <returns></returns>
        [HttpPost]
        [Route("Update")]
        public JsonResult Post([FromBody] ModemMachineVM newmachine)
        {
            //contentRoot = "C:\Projects\YourWebApp"
            //webRootPath = "C:\Projects\YourWebApp\wwwroot"
            _ = _hostingEnvironment.WebRootPath;
            //var contentRoot = _hostingEnvironment.ContentRootPath;                     

            var curMachine = JsonConvert.SerializeObject(newmachine, Formatting.Indented);
            object Id;
            using (SqlConnection connection = new SqlConnection(Util.ConnectionStrings))
            {
                connection.Open();
                var tx2 = connection.BeginTransaction();
                try
                {
                    string sql = $"declare @machineId int;" +
                        $"select @machineId=Id from machine where IMEI1 = @IMEI1 and IMEI2 = @IMEI2 ;" +
                        $"if not exists(select Id from machine where IMEI1 = @IMEI1 and IMEI2 = @IMEI2) " +
                        $" begin " +
                        $" insert into machine(Name,IMEI1, IMEI2,Latitude,Longitude,MachineTypeId) values " +
                        $" (@Name, @IMEI1, @IMEI2, @Lat,@Lon,@MachineTypeId) ;SELECT CAST(scope_identity() AS int)" +
                        $" end " +
                        $" insert into machineConnectionHistory(MachineId,IsConnected,CreatedDate,Latitude,Longitude) values (" +
                        $"  @machineId,@IsConnected,@CreatedDate,@lat,@lon) " +
                        $" update machine set IsConnected = @IsConnected, Latitude = case when @Lat !=N'0'  then @Lat else Latitude end, " +
                        $" Longitude = case when @Lon != N'0' then @Lon else Longitude end where IMEI1 = @IMEI1 and IMEI2 = @IMEI2";
                    double lon = 0;
                    double lat = 0;
                    if (!string.IsNullOrEmpty(newmachine.Location) && newmachine.Location.ToLower() != "null")
                    {
                        lat = int.Parse(newmachine.Location.Split(",")[0].Substring(0, 2)) + double.Parse(newmachine.Location.Split(",")[0].Substring(2, 6)) / 60;
                        lon = int.Parse(newmachine.Location.Split(",")[2].Substring(0, 3)) + double.Parse(newmachine.Location.Split(",")[2].Substring(3, 6)) / 60;
                    }
                    using SqlCommand command = new SqlCommand(sql ,connection);
                    command.CommandTimeout = 100000;
                    command.CommandType = CommandType.Text;
                    command.Transaction = tx2;
                    command.Parameters.AddWithValue("@Name", "LTEMODEM" + newmachine.Time);
                    command.Parameters.AddWithValue("@IMEI1", newmachine.IMEI);
                    command.Parameters.AddWithValue("@IMEI2", newmachine.ICCID);
                    command.Parameters.AddWithValue("@Lat", lat);
                    command.Parameters.AddWithValue("@Lon", lon);
                    command.Parameters.AddWithValue("@MachineTypeId", 4);
                    command.Parameters.AddWithValue("@IsConnected", 1);
                    var a = newmachine.Time.Split('_');
                    var infromDevice = new DateTime(Convert.ToInt32(a[0]), Convert.ToInt32(a[1]), Convert.ToInt32(a[2]),
                                                    Convert.ToInt32(a[3]), Convert.ToInt32(a[4]), Convert.ToInt32(a[5]));
                    command.Parameters.AddWithValue("@CreatedDate", infromDevice);
                    Id = (object)command.ExecuteScalar();
                    tx2.Commit();
                    var tx3 = connection.BeginTransaction();
                    try
                    {   
                        sql = $"declare @machineId int;" +
                            $" select @machineId=Id from machine where IMEI1 = @IMEI1 and IMEI2 = @IMEI2 ;" +
                            $"insert into testResult(Lat,Long,MNC,RSSI,RSRQ,RSRP,MachineId,SelectedSim," +
                            $" CreateDate,CreateDateFa,BeginDateTest,EndDateTest) " +
                            $" values (" +
                            $" @Lat,@Lon,@MNC,@RSSI,@RSRQ,@RSRP,@machineId," +
                            $"@SIM, " +
                            $"@CreateDate," +
                            $"cast([dbo].[CalculatePersianDate]('{infromDevice}')as nvarchar(max)) + N' '+cast(convert(time(0),'{infromDevice.ToShortTimeString()}') as nvarchar(max))," +
                            $"@BeginDate,@EndDate)";
                        using SqlCommand com3 = new SqlCommand(sql, connection);
                        com3.CommandType = CommandType.Text;
                        com3.CommandTimeout = 100000;
                        com3.Transaction = tx3;
                        com3.Parameters.AddWithValue("@IMEI1", newmachine.IMEI);
                        com3.Parameters.AddWithValue("@IMEI2", newmachine.ICCID);
                        com3.Parameters.AddWithValue("@Lat", lat);
                        com3.Parameters.AddWithValue("@Lon", lon);
                        com3.Parameters.AddWithValue("@CreateDate", infromDevice);
                        com3.Parameters.AddWithValue("@SIM", newmachine.SimIndex);
                        com3.Parameters.AddWithValue("@BeginDate", DateTime.Now);
                        com3.Parameters.AddWithValue("@EndDate", DateTime.Now.AddYears(5));
                        com3.Parameters.AddWithValue("@MNC", newmachine.MNC);
                        var Otherparam = newmachine.CPSI.Split(',');
                        float.TryParse(Otherparam[0], out float tmpVal); tmpVal /= 10;
                        com3.Parameters.AddWithValue("@RSSI", tmpVal);
                        float.TryParse(Otherparam[1], out tmpVal); tmpVal /= 10;
                        com3.Parameters.AddWithValue("@RSRQ", tmpVal);
                        float.TryParse(Otherparam[2], out tmpVal); tmpVal /= 10;
                        com3.Parameters.AddWithValue("@RSRP", tmpVal);
                        Id = com3.ExecuteScalar();
                        tx3.Commit();
                        return new JsonResult(new { code = "Ok", msg = "Successfully Sync." }) { };
                    }
                    catch (Exception ex)
                    {
                        tx3.RollbackAsync();

                        Util.LogErrorAsync(ex, "Mobile", newmachine.ICCID).ConfigureAwait(false);


                        return new JsonResult(new { code = ex.Data, msg = ex.Message }) { };
                    }
                    finally
                    {
                        connection.Close();
                    }
                }
                catch (Exception ex2)
                {
                    tx2.Rollback();
                    Util.LogErrorAsync(ex2, "Mobile", newmachine.ICCID).ConfigureAwait(false);
                    return new JsonResult(new { code = ex2.Data, msg = ex2.Message }) { };
                }
                finally
                {
                    connection.Close();
                }
            }
        }
    }
}

