
using ActiveProbe.Utils.ViewModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace ActiveProbeCore.BL
{
    public static class Util
    {
        //global connection string
        public static string ConnectionStrings { get; set; }

        [StructLayout(LayoutKind.Sequential)]
        struct SYSTEMTIME
        {
            public ushort wYear;
            public ushort wMonth;
            public ushort wDayOfWeek;
            public ushort wDay;
            public ushort wHour;
            public ushort wMinute;
            public ushort wSecond;
            public ushort wMilliseconds;
        }
        //update definedTestMachines 
     
        internal static async Task<List<ReportResult>> Export(Export exp)
        {
            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(Util.ConnectionStrings))
            {
                try
                {
                    string sql = "GetMachineInZone";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.CommandTimeout = 100000;
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@MachineId", exp.MachineId);
                        command.Parameters.AddWithValue("@ZoneId", exp.ZoneId);
                        command.Parameters.AddWithValue("@BeginDate", exp.BeginDate);
                        command.Parameters.AddWithValue("@EndDate", exp.EndDate);
                        command.Parameters.AddWithValue("@DefinedTestId", exp.DefinedTestId);
                        command.Parameters.AddWithValue("@Sim", exp.SIM);
                        connection.Open();

                        using (SqlDataAdapter ad = new SqlDataAdapter(command))
                        {
                            ad.Fill(dt);
                        }
                    }
                }
                catch (Exception ex)
                {
                    await LogErrorAsync(ex, "Report Machine In Zone...990431").ConfigureAwait(false);
                }
                finally
                {
                    connection.Close();
                }
            }
            var result = new List<ReportResult>();
            try
            {
                result = dt.AsEnumerable().Select(x => new ReportResult()
                {
                    //Id = x.Field<int>("Id"), 
                    //TestId = x.Field<int>("TestId"),
                    DeviceName = x.Field<string>("MachineName"),
                    TestName = x.Field<string>("DefinedTestName"),
                    Lat = Convert.IsDBNull(x.Field<double?>("Lat")) ? null : x.Field<double?>("Lat"),
                    Long = Convert.IsDBNull(x.Field<double?>("Lat")) ? null : x.Field<double?>("Long"),
                    SimNubmer = Convert.IsDBNull(x.Field<Int16?>("SelectedSim")) ? null : x.Field<Int16?>("SelectedSim"),
                    DateTime = Convert.IsDBNull(x.Field<DateTime?>("CreateDate")) ? null : x.Field<DateTime?>("CreateDate"),
                    PersianDateTime = Convert.IsDBNull(x.Field<string>("CreateDateFa")) ? null : x.Field<string>("CreateDateFa"),

                    MCC = Convert.IsDBNull(x.Field<int?>("MCC")) ? null : x.Field<int?>("MCC"),
                    MNC = Convert.IsDBNull(x.Field<int?>("MNC")) ? null : x.Field<int?>("MNC"),
                    BSIC = Convert.IsDBNull(x.Field<int?>("BSIC")) ? null : x.Field<int?>("BSIC"),
                    FregBand = Convert.IsDBNull(x.Field<string>("FregBand")) ? null : x.Field<string>("FregBand"),
                    PCI = Convert.IsDBNull(x.Field<int?>("PCI")) ? null : x.Field<int?>("PCI"),
                    CID = Convert.IsDBNull(x.Field<int?>("CID")) ? null : x.Field<int?>("CID"),
                    UARFCN = Convert.IsDBNull(x.Field<int?>("UARFCN")) ? null : x.Field<int?>("UARFCN"),
                    DLBW = Convert.IsDBNull(x.Field<int?>("DLBW")) ? null : x.Field<int?>("DLBW"),
                    LAC = Convert.IsDBNull(x.Field<int?>("LAC")) ? null : x.Field<int?>("LAC"),
                    ULBW = Convert.IsDBNull(x.Field<int?>("ULBW")) ? null : x.Field<int?>("ULBW"),
                    BCCH = Convert.IsDBNull(x.Field<int?>("ARFCN")) ? null : x.Field<int?>("ARFCN"),
                    RSSNR = Convert.IsDBNull(x.Field<int?>("RSSNR")) ? null : x.Field<int?>("RSSNR"),
                    TA = Convert.IsDBNull(x.Field<int?>("TA")) ? null : x.Field<int?>("TA"),
                    PSC = Convert.IsDBNull(x.Field<int?>("PSC")) ? null : x.Field<int?>("PSC"),
                    EARFCN = Convert.IsDBNull(x.Field<int?>("EARFCN")) ? null : x.Field<int?>("EARFCN"),
                    TXPower = Convert.IsDBNull(x.Field<int?>("TXPower")) ? null : x.Field<int?>("TXPower"),
                    SSC = Convert.IsDBNull(x.Field<int?>("SSC")) ? null : x.Field<int?>("SSC"),
                    TAC = Convert.IsDBNull(x.Field<int?>("TAC")) ? null : x.Field<int?>("TAC"),

                    RXLevel = Convert.IsDBNull(x.Field<double?>("RXLevel")) ? null : x.Field<double?>("RXLevel"),
                    ECIO = Convert.IsDBNull(x.Field<double?>("ECIO")) ? null : x.Field<double?>("ECIO"),

                    RSRQ = Convert.IsDBNull(x.Field<double?>("RSRQ")) ? null : x.Field<double?>("RSRQ"),
                    BER = Convert.IsDBNull(x.Field<int?>("BER")) ? null : x.Field<int?>("BER"),
                    RSCP = Convert.IsDBNull(x.Field<double?>("RSCP")) ? null : x.Field<double?>("RSCP"),

                    RSRP = Convert.IsDBNull(x.Field<double?>("RSRP")) ? null : x.Field<double?>("RSRP"),
                    Layer3Messages = Convert.IsDBNull(x.Field<string>("Layer3Messages")) ? null : x.Field<string>("Layer3Messages"),
                    RSSI = Convert.IsDBNull(x.Field<double?>("RSSI")) ? null : x.Field<double?>("RSSI"),
                    OVSFCode = Convert.IsDBNull(x.Field<int?>("OVFSF")) ? null : x.Field<int?>("OVFSF"),
                    ACtiveSetNumber = Convert.IsDBNull(x.Field<int?>("ACtiveSetNumber")) ? null : x.Field<int?>("ACtiveSetNumber"),
                    RXQual = Convert.IsDBNull(x.Field<int?>("RXQual")) ? null : x.Field<int?>("RXQual"),
                    Throughput = Convert.IsDBNull(x.Field<double?>("Throughput")) ? null : x.Field<double?>("Throughput"),
                    SystemMode = Convert.IsDBNull(x.Field<int?>("SystemMode")) ? null : x.Field<int?>("SystemMode"),
                    RTT = Convert.IsDBNull(x.Field<double?>("RTT")) ? null : x.Field<double?>("RTT"),

                    Delay = Convert.IsDBNull(x.Field<double?>("Delay")) ? null : x.Field<double?>("Delay"),
                    NumOfPacketSent = Convert.IsDBNull(x.Field<int?>("NumOfPacketSent")) ? null : x.Field<int?>("NumOfPacketSent"),
                    NumOfPacketReceived = Convert.IsDBNull(x.Field<int?>("NumOfPacketReceived")) ? null : x.Field<int?>("NumOfPacketReceived"),
                    NumOfPacketLost = Convert.IsDBNull(x.Field<int?>("NumOfPacketLost")) ? null : x.Field<int?>("NumOfPacketLost"),
                    AVGRTT = Convert.IsDBNull(x.Field<double?>("AVGRTT")) ? null : x.Field<double?>("AVGRTT"),
                    Ping = Convert.IsDBNull(x.Field<string>("Ping")) ? null : x.Field<string>("Ping"),
                    TraceRoute = Convert.IsDBNull(x.Field<string>("TraceRoute")) ? null : x.Field<string>("TraceRoute"),
                    IsGroup = Convert.IsDBNull(x.Field<bool>("IsGroup")) ? false : x.Field<bool>("IsGroup"),
                    //SIM = Convert.IsDBNull(x.Field<Int16?>("SIM")) ? null : x.Field<Int16?>("SIM"),
                    //machineId= Convert.IsDBNull(x.Field<int?>("MachineId")) ? null : x.Field<int?>("MachineId")

                }).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return result;
        }
        //public readonly static Encoding Encoder = Encoding.GetEncoding(1256);
        internal readonly static CultureInfo EnglishCulture = new CultureInfo("en-US");
        //Generate persiandate
        internal static object GetPersianDate(this DateTime obj)
        {
            var pc = new System.Globalization.PersianCalendar();
            //{ year: 1398, month: 9, day: 26}
            var t = new { year = pc.GetYear(obj), month = pc.GetMonth(obj), day = pc.GetDayOfMonth(obj) };
            return t;
            //+ (pc.GetMonth(obj).ToString() + "/") + pc.GetDayOfMonth(obj).ToString();
        }
        //Generate persianTime
        internal static object GetPersianTime(this DateTime obj)
        {
            var pc = new System.Globalization.PersianCalendar();
            //{hour: 1, minute: 1, second: 0}            
            var t = new { hour = pc.GetHour(obj), minute = pc.GetMinute(obj), second = pc.GetSecond(obj) };
            return t;

        }
        //Convert JalaliDate to Miladi
        internal static DateTime ShamsiToMiladi(int year, int month, int day, int hour = 0, int minute = 0, int second = 0, int millisecond = 0)
        {
            DateTime dateTime = new DateTime();

            try
            {
                var pc = new System.Globalization.PersianCalendar();
                dateTime = pc.ToDateTime(year, month, day, hour, minute, second, millisecond);
            }
            catch { }
            return dateTime;
        }

        private static char ARABI_Y1 = (char)1609;//'ى'
        private static char ARABI_Y2 = (char)1610;//'ي'
        private static char FARSI_Y = (char)1740;//'ی'
        private static char ARABI_K = (char)1603;//'ك'
        private static char FARSI_K = (char)1705;//'ک'
        internal static string ReplaceYK(this string obj)
        {
            return string.IsNullOrEmpty(obj) ? obj : obj.Replace(ARABI_Y1, FARSI_Y).Replace(ARABI_Y2, FARSI_Y).Replace(ARABI_K, FARSI_K);
        }
        private static string[] _CaptchaList = new string[100];
        //Generate randome data
        internal static string GenerateNewCaptcha()
        {
            var rand = new Random(DateTime.Now.Millisecond);
            var index = rand.Next(0, 99);
            const string chars = "0123456789";
            var other = new string(Enumerable.Repeat(chars, 3)
              .Select(s => s[rand.Next(s.Length)]).ToArray());
            return _CaptchaList[index] = $"{index:d2}{other.ToLower()}";
        }
        internal static bool IsValidNewCapcha(string data)
        {
            bool retVal = false;
            if (data.Length == 5)
            {
                try
                {
                    var index = int.Parse(data.Substring(0, 2));
                    retVal = data == _CaptchaList[index];
                    _CaptchaList[index] = null;
                }
                catch { /*Nothing*/}
            }
            return retVal;
        }
        static string SaltKey = "sample_salt";
        //Core of encryption 
        internal static string Encrypt(this string plainText, string passwordHash, string VIKey)
        {
            byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);

            byte[] keyBytes = new Rfc2898DeriveBytes(passwordHash, Encoding.ASCII.GetBytes(SaltKey), 1024).GetBytes(16);
            var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.PKCS7 };
            var encryptor = symmetricKey.CreateEncryptor(keyBytes, Convert.FromBase64String(VIKey));

            byte[] cipherTextBytes;

            using (var memoryStream = new MemoryStream())
            {
                using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                {
                    cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                    cryptoStream.FlushFinalBlock();
                    cipherTextBytes = memoryStream.ToArray();
                    cryptoStream.Close();
                }
                memoryStream.Close();
            }
            return Convert.ToBase64String(cipherTextBytes);
        }
        //Core of decryption
        internal static string Decrypt(this string encryptedText, string passwordHash, string VIKey)
        {
            byte[] cipherTextBytes = Convert.FromBase64String(encryptedText);
            byte[] keyBytes = new Rfc2898DeriveBytes(passwordHash, Encoding.ASCII.GetBytes(SaltKey), 1024).GetBytes(16);
            var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.PKCS7 };

            var decryptor = symmetricKey.CreateDecryptor(keyBytes, Convert.FromBase64String(VIKey));
            var memoryStream = new MemoryStream(cipherTextBytes);
            var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            byte[] plainTextBytes = new byte[cipherTextBytes.Length];

            int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
            memoryStream.Close();
            cryptoStream.Close();
            return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount).TrimEnd("\0".ToCharArray());
        }
        //Format persian date
        internal static string ToPersianFormat(this DateTime date)
        {
            var pc = new System.Globalization.PersianCalendar();
            var day = pc.GetDayOfMonth(date);
            var dayName = pc.GetDayOfWeek(date).ToPersian();
            var month = pc.GetMonth(date).ToPersianMonth();
            var year = pc.GetYear(date);
            //یکشنبه - 24 فروردین 95
            return string.Format("{3} - {2} {1} {0}", year, month, day, dayName);
        }
        //Format persian week
        internal static string ToPersian(this DayOfWeek day)
        {
            var retVal = string.Empty;
            switch (day)
            {
                case DayOfWeek.Friday:
                    {
                        retVal = "جمعه";
                        break;
                    }
                case DayOfWeek.Monday:
                    {
                        retVal = "دوشنبه";
                        break;
                    }
                case DayOfWeek.Saturday:
                    {
                        retVal = "شنبه";
                        break;
                    }
                case DayOfWeek.Sunday:
                    {
                        retVal = "یکشنبه";
                        break;
                    }
                case DayOfWeek.Thursday:
                    {
                        retVal = "پنج شنبه";
                        break;
                    }
                case DayOfWeek.Tuesday:
                    {
                        retVal = "سه شنبه";
                        break;
                    }
                case DayOfWeek.Wednesday:
                    {
                        retVal = "چهار شنبه";
                        break;
                    }
            }
            return retVal;
        }
        //Format persian month
        internal static string ToPersianMonth(this int month)
        {
            var retVal = string.Empty;
            switch (month)
            {
                case 1:
                    {
                        retVal = "فروردین";
                        break;
                    }
                case 2:
                    {
                        retVal = "اردیبهشت";
                        break;
                    }
                case 3:
                    {
                        retVal = "خرداد";
                        break;
                    }
                case 4:
                    {
                        retVal = "تیر";
                        break;
                    }
                case 5:
                    {
                        retVal = "مرداد";
                        break;
                    }
                case 6:
                    {
                        retVal = "شهریور";
                        break;
                    }
                case 7:
                    {
                        retVal = "مهر";
                        break;
                    }
                case 8:
                    {
                        retVal = "آبان";
                        break;
                    }
                case 9:
                    {
                        retVal = "آذر";
                        break;
                    }
                case 10:
                    {
                        retVal = "دی";
                        break;
                    }
                case 11:
                    {
                        retVal = "بهمن";
                        break;
                    }
                case 12:
                    {
                        retVal = "اسفند";
                        break;
                    }
            }
            return retVal;
        }
        //generate string key
        internal static string GetNewId()
        {
            return DateTime.Now.ToString("yyyyMMddHHmmssfff", Util.EnglishCulture);
        }
        //This used for errors and logs both
        internal async static Task LogErrorAsync(Exception exception, string business, string ip = null)
        {
            string methdeName = "";
            string moduleName = "";
            try
            {
                var st = new StackTrace(exception, true);
                var frame = st.GetFrame(0);
                methdeName = string.Format("{0}.{1}", frame.GetMethod().DeclaringType.FullName, exception.TargetSite.ToString());
                moduleName = exception.TargetSite.DeclaringType.Module.Name;
                var assemblyName = exception.TargetSite.DeclaringType.Assembly.FullName;
            }
            catch { }

            string json = null;
            if (exception.Data.Count > 0)
            {
                json = exception.Data.ToJsonString();
            }
            //#if DEBUG
            //            Console.WriteLine("*******\nError On '{0}' Business:\nDate:\t\t{1}\nModule:\t\t{2}\nMethode:\t{3}\nMessage:\t{4}\nExtraData:\t{5}\nRawError:\n{6}\n********",
            //                 business, DateTime.Now.ToPersianDateTimeString(), moduleName, methdeName, exception.Message, json, exception);
            //#endif
            using (SqlConnection con = new SqlConnection(Util.ConnectionStrings))
            {
                var com = con.CreateCommand();
                com.CommandText = @"INSERT INTO [system].[Errors]
                                   ([Date]
                                   ,[Business]
                                   ,[Module]
                                   ,[Methode]
                                   ,[Message]
                                   ,[RawError]
                                   ,[ExtraData])
                             VALUES
                                   (GETDATE()
                                   ,@Business
                                   ,@Module
                                   ,@Methode
                                   ,@Message
                                   ,@RawError
                                   ,@ip);
                            SELECT @@IDENTITY";
                com.Parameters.AddWithValue("@Business", business);
                com.Parameters.AddWithValue("@Module", moduleName);
                com.Parameters.AddWithValue("@Methode", methdeName);
                com.Parameters.AddWithValue("@Message", exception.Message);
                com.Parameters.AddWithValue("@RawError", exception.ToString());
                com.Parameters.AddWithValue("@ip", ip ?? "");

                try
                {
                    await con.OpenAsync();
                    await com.ExecuteScalarAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error In Save Error:{0}", e);
                    throw e;
                }
                finally
                {
                    con.Close();
                }
            }
        }
        //Convert json to string
        internal static string ToJsonString(this object obj)
        {
            string retVal = null;
            if (obj != null)
            {
                retVal = JsonConvert.SerializeObject(obj, Newtonsoft.Json.Formatting.Indented);
            }
            return retVal;
        }
        //Format Persian Date
        internal static string ToPersianDateTimeString(this DateTime obj)
        {
            string retVal = null;
            var pc = new System.Globalization.PersianCalendar();
            try
            {
                retVal = string.Format("{0}/{1:0#}/{2:0#} {3}", pc.GetYear(obj), pc.GetMonth(obj), pc.GetDayOfMonth(obj), obj.ToString("HH:mm:ss", Util.EnglishCulture));
            }
            catch { /*Nothing*/}
            return retVal;
        }
        //do as proxy to dycryption
        internal static async Task<string> DecryptInputString(this string value, string VIKey)
        {
            try
            {
                string val = value.ToString().Decrypt("sample_shared_secret", VIKey);
                return val;
            }
            catch (Exception ex)
            {
                await Util.LogErrorAsync(ex, value.ToString());
                return null;
            }
        }
        //calling rest api with post method
        internal static async Task<Boolean> CallHttp(string ip, string value)
        {
            using (HttpClient client = new HttpClient())
            {
                var Value = new StringContent(value, Encoding.UTF8, "application/json");
                try
                {
                    HttpResponseMessage response = await client.PostAsync(ip, Value);
                    response.EnsureSuccessStatusCode();
                    return true;
                }
                catch (Exception ex)
                {
                    await Util.LogErrorAsync(ex, string.Format("CallHttp (ip : {0}, content: {1})", ip, value));
                    return false;
                }
            }
        }
        //get map structure
        internal static async Task<string> GetMapDB(Decimal latStart, Decimal latEnd, Decimal longStart, Decimal longEnd, long mapOperator, long mapNetTech)
        {
            String returnVal = "";
            using (SqlConnection connection = new SqlConnection(Util.ConnectionStrings))
            {
                try
                {
                    string sql = $"GetMap"; using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.CommandTimeout = 100000;
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@latstartNum", latStart);
                        command.Parameters.AddWithValue("@latendNum", latEnd);
                        command.Parameters.AddWithValue("@lonstartNum", longStart);
                        command.Parameters.AddWithValue("@lonendNum", longEnd);
                        command.Parameters.AddWithValue("@mapOperator", mapOperator);
                        command.Parameters.AddWithValue("@mapNetTech", mapNetTech);
                        connection.Open();
                        returnVal = (string)await command.ExecuteScalarAsync().ConfigureAwait(false);
                        connection.Close();
                    }
                }
                catch (Exception ex)
                {
                    await LogErrorAsync(ex, "GetMapDB").ConfigureAwait(false);
                }
                finally
                {
                    connection.Close();
                }

            }
            return returnVal;
        }
        
    }
}
