export class DefinedTest {
    Id: number;
    IsActive: Boolean;
    Layer3Messages: Boolean;
    RepeatTypeId: number;
    RepeatTime: number;
    RepeatCount: number;
    MeasurementInterval: number;//always seconds
    TestTypeId: number;//UsualCall, MosCall, Idle, Data, OTTServices
    UsualCallDuration: number;//Second
    UsualCallWaitTime: number;//Second
    UsualCallNumber: number;//CellNumber
    TestDataId: number;//FTP, HTTP, Ping, TraceRoute,...
    TestDataTypeId: number;//Download, Upload 
    TestDataServer: string;//address of server
    TestDataUserName: string;//user name to login to server
    TestDataPassword: string;//password to login to server
    TestDataDownloadFileAddress: string;//name and address of file in server
    TestDataUploadFileSize: number;//limitation for size(kb) of file to upload to server 
    IPTypeId: number//IPV4 or IPV6
    OTTServiceId: number;//Skype, WhatsApp, Instagram
    OTTServiceTestId: number;//VoiceCall, SendText, Pic
    NetworkId: number;//GSM Only, WCDMA Only, LTE Only, GSM + WCDMA, ...
    BandId: number;//7600, ...
    SaveLogFile: Boolean;
    LogFilePartitionTypeId: number;//Time/Size
    LogFilePartitionTime: number;//min
    LogFilePartitionSize: number;//kb
    LogFileHoldTime: number;//Hour
    NumberOfPings: number;//1 to 100
    PacketSize: number//4 to 188
    InternalTime: number//1000 to 10000
    ResponceWaitTime: number//10000 to 100000
    TTL: number //16 to 255
    TraceRouteHubCount: number
    RepeatTypeTitle: string;
    TestTypeTitle: string;
    TestDataTypeTitle: string;
    OTTServiceTitle: string;
    OTTServiceTestTitle: string;
    NetworkTitle: string;
    BandTitle: string;
    LogFilePartitionTypeTitle: string;
    IPTypeTitle: string;
}
