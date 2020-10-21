
namespace ActiveProbe.Utils.ViewModel
{
    public class DefinedTestVm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsActive { get; set; }
        public bool Layer3Messages { get; set; }
        public short RepeatTypeId { get; set; }
        public int? RepeatTime { get; set; }
        public int? RepeatCount { get; set; }
        public int MeasurementInterval { get; set; }//always seconds
        public int TestTypeId { get; set; }//UsualCall, MosCall, Idle, Data, OTTServices
        public int? UsualCallDuration { get; set; }//Second
        public int? UsualCallWaitTime { get; set; }//Second        
        public string UsualCallNumber { get; set; }//CellNumber
        public short? TestDataId { get; set; }//FTP, HTTP, Ping, TraceRoute,...
        public short? TestDataTypeId { get; set; }//Download, Upload , use in moscall and data
        public string TestDataServer { get; set; }//address of server
        public string TestDataUserName { get; set; }//user name to login to server
        public string TestDataPassword { get; set; }//password to login to server
        public string TestDataDownloadFileAddress { get; set; }//name and address of file in server
        public int? TestDataUploadFileSize { get; set; }//limitation for size(kb) of file to upload to server 
        public short? IPTypeId { get; set; }//IPV4 or IPV6
        public short? OTTServiceId { get; set; }//Skype, WhatsApp, Instagram
        public short? OTTServiceTestId { get; set; }//VoiceCall, SendText, Pic
        public short NetworkId { get; set; }//GSM Only, WCDMA Only, LTE Only, GSM + WCDMA, ...
        public int? BandId { get; set; }//7600, ...
        public bool? SaveLogFile { get; set; }
        public short? LogFilePartitionTypeId { get; set; }//Time/Size
        public short? LogFilePartitionTime { get; set; }//min
        public short? LogFilePartitionSize { get; set; }//kb
        public short? NumberOfPings { get; set; }//1 to 100
        public short? PacketSize { get; set; }//4 to 188
        public short? InternalTime { get; set; }//1000 to 10000
        public int? ResponseWaitTime { get; set; }//10000 to 100000
        public short? TTL { get; set; }//16 to 255
        public int? LogFileHoldTime { get; set; }//Hour
        public int? TraceRouteHubCount { get; set; }//count        
        public string RepeatTypeTitle { get; set; }
        public string TestTypeTitle { get; set; }
        public string TestDataTypeTitle { get; set; }        
        public string OTTServiceTitle { get; set; }
        public string OTTServiceTestTitle { get; set; }
        public string NetworkTitle { get; set; }
        public string BandTitle { get; set; }
        public string LogFilePartitionTypeTitle { get; set; }
        public string IPTypeTitle { get; set; }
        public bool Editable { get; set; }
    }
}

