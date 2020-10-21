using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ActiveProbeCore.Controllers
{   //For registering kcnet devices
    [Route("api/[controller]")]    
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private IHttpContextAccessor _accessor;
        public RegisterController(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }
        // POST: api/SMS
        // Send code to mobile apps
        [HttpPost]
        [Route("[action]")]
        public async Task<string> SendCode(object value)
        {
            bool ReturnVal = false;
            try
            {
                await Util.LogErrorAsync(new Exception("SendCode"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString());
                //model validation
                string encryptedContent = (value ?? ",").ToString().Split(",")[1];
                string vikey = (value ?? ",").ToString().Split(",")[0];
                string content = await encryptedContent.DecryptInputString(vikey);

                if (!string.IsNullOrEmpty(content))
                {
                    string CellNumber = content.Split(',')[0].TrimStart('0').Replace("+98", string.Empty);
                    string Code = Util.GenerateNewCaptcha();
                    string IMEI = content.Split(',')[1];
                    using (SqlConnection connection = new SqlConnection(Util.ConnectionStrings))
                    {
                        string sql = $"Insert Into Users (CellNumber, IMEI, Code) Values (@CellNumber, @IMEI, @Code)"; using (SqlCommand command = new SqlCommand(sql, connection))
                        {
                            command.CommandType = CommandType.Text;
                            command.Parameters.AddWithValue("@CellNumber", CellNumber);
                            command.Parameters.AddWithValue("@IMEI", IMEI);
                            command.Parameters.AddWithValue("@Code", Code);
                            connection.Open();
                            await command.ExecuteNonQueryAsync();
                            connection.Close();
                        }
                    }
                    ReturnVal = await Util.CallHttp("http://10.10.18.103/api/values", "{" + string.Format("'{0}':'{1}'", CellNumber, Code) + "}");
                }

                return (vikey + "," + ReturnVal.ToString().Encrypt("sample_shared_secret", vikey)).ToJsonString();
            }
            catch (Exception ex)
            {
                await Util.LogErrorAsync(ex, (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString());
                return ("BgrUEy5IbpJSnhmqI2IhKw==" + "," + ReturnVal.ToString().Encrypt("sample_shared_secret", "BgrUEy5IbpJSnhmqI2IhKw==")).ToJsonString();
            }
        }
        // POST: api/SMS
        // Recieve Code form mobile apps
        [HttpPost]
        [Route("[action]")]
        public async Task<string> RecieveCode(object value)
        {
            bool ReturnVal = false;
            try
            {
                await Util.LogErrorAsync(new Exception("RecieveCode"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
                //model validation
                string encryptedContent = (value ?? ",").ToString().Split(",")[1];
                string vikey = (value ?? ",").ToString().Split(",")[0];
                string content = await encryptedContent.DecryptInputString(vikey);
                //business
                if (!string.IsNullOrEmpty(content))
                {
                    string CellNumber = content.Split(',')[0].TrimStart('0').Replace("+98", string.Empty); 
                    string IMEI = content.Split(',')[1];
                    string Code = content.Split(',')[2];
                    using (SqlConnection connection = new SqlConnection(Util.ConnectionStrings))
                    {
                        string sql =
                            $"if exists(select cast(1 as bit) ReturnVal from Users where CellNumber = @CellNumber and IMEI = @IMEI and Code = @Code) " +
                            $"begin " +
                            $"update Users set SubscribeDate = getdate() where CellNumber = @CellNumber and IMEI = @IMEI and Code = @Code " +
                            $"end " +
                            $"select cast(1 as bit) ReturnVal from Users where CellNumber = @CellNumber and IMEI = @IMEI and Code = @Code ";
                        using (SqlCommand command = new SqlCommand(sql, connection))
                        {
                            command.CommandType = CommandType.Text;
                            command.Parameters.AddWithValue("@CellNumber", CellNumber);
                            command.Parameters.AddWithValue("@IMEI", IMEI);
                            command.Parameters.AddWithValue("@Code", Code);
                            connection.Open();
                            ReturnVal = (bool)(await command.ExecuteScalarAsync() ?? true);
                            connection.Close();
                        }
                    }
                }
                return (vikey + "," + ReturnVal.ToString().Encrypt("sample_shared_secret", vikey)).ToJsonString();
            }
            catch (Exception ex)
            {
                await Util.LogErrorAsync(ex, (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString()).ConfigureAwait(false);
                return ("BgrUEy5IbpJSnhmqI2IhKw==" + "," + ReturnVal.ToString().Encrypt("sample_shared_secret", "BgrUEy5IbpJSnhmqI2IhKw==")).ToJsonString();
            }
        }
        //this is for test and support
        [HttpPost]
        [Route("[action]")]
        public async Task<string> MyEncryptStringTools(object value)
        {
            try
            {
                await Util.LogErrorAsync(new Exception("MyEncryptStringTools"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString());
                //model validation
                string Content = (value ?? ",").ToString().Split(" ,")[1];
                string vikey = (value ?? ",").ToString().Split(" ,")[0];
                return vikey + "," + Content.Encrypt("sample_shared_secret", vikey);

            }
            catch (Exception ex)
            {
                await Util.LogErrorAsync(ex, (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString());
                return "";
            }

        }
        //this is for test and support
        [HttpPost]
        [Route("[action]")]
        public async Task<string> MyDecryptStringTools(object value)
        {
            try
            {
                await Util.LogErrorAsync(new Exception("MyDecryptStringTools"), (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString());
                //model validation
                string Content = (value ?? ",").ToString().Split(" ,")[1];
                string vikey = (value ?? ",").ToString().Split(" ,")[0];
                return Content.Decrypt("sample_shared_secret", vikey);
            }
            catch (Exception ex)
            {
                await Util.LogErrorAsync(ex, (value ?? "").ToString(), _accessor.HttpContext.Connection.RemoteIpAddress.ToString());
                return "";
            }
        }
    }
}