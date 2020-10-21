using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ActiveProbe.DataLayer.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "system");

            migrationBuilder.CreateTable(
                name: "ActiveProbeParams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 500, nullable: true),
                    Descriptions = table.Column<string>(maxLength: 200, nullable: true),
                    Type = table.Column<string>(maxLength: 100, nullable: true),
                    TypeLen = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiveProbeParams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppDataProtectionKeys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FriendlyName = table.Column<string>(nullable: true),
                    XmlData = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDataProtectionKeys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppLogItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    EventId = table.Column<int>(nullable: false),
                    Url = table.Column<string>(nullable: true),
                    LogLevel = table.Column<string>(nullable: true),
                    Logger = table.Column<string>(nullable: true),
                    Message = table.Column<string>(nullable: true),
                    StateJson = table.Column<string>(nullable: true),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppLogItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppRoles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRoles", x => x.Id);
                });

            

            migrationBuilder.CreateTable(
                name: "AppUsers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 200, nullable: true),
                    LastName = table.Column<string>(maxLength: 200, nullable: true),
                    PhotoFileName = table.Column<string>(maxLength: 450, nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: true),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    LastVisitDateTime = table.Column<DateTime>(nullable: true),
                    IsEmailPublic = table.Column<bool>(nullable: false),
                    Location = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Band",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false),
                    Title = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Band", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Channel",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    MediaType = table.Column<int>(nullable: false),
                    Timeout = table.Column<int>(nullable: false),
                    Cost = table.Column<int>(nullable: false),
                    Params = table.Column<string>(nullable: false),
                    Protocols = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Channel", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "DateTestModel",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FName = table.Column<string>(maxLength: 100, nullable: true),
                    LName = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DateTestModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Direction",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false),
                    Title = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Direction", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FieldColorThreshold",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fieldName = table.Column<string>(maxLength: 50, nullable: false),
                    RangeFrom = table.Column<int>(nullable: true),
                    RangeTo = table.Column<int>(nullable: true),
                    RangeColor = table.Column<string>(fixedLength: true, maxLength: 10, nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldColorThreshold", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Group_Machine",
                columns: table => new
                {
                    GroupID = table.Column<int>(nullable: false),
                    MachineID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "InfoPacket",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineID = table.Column<int>(nullable: false),
                    ChannelID = table.Column<byte>(nullable: false),
                    RecvDT = table.Column<DateTime>(type: "datetime", nullable: false),
                    GPSDT = table.Column<DateTime>(type: "datetime", nullable: false),
                    Lat = table.Column<float>(nullable: true),
                    Lon = table.Column<float>(nullable: true),
                    Alt = table.Column<short>(nullable: true),
                    Speed = table.Column<float>(nullable: true),
                    Direction = table.Column<short>(nullable: true),
                    GPSValidity = table.Column<bool>(nullable: false),
                    NoOfSats = table.Column<byte>(nullable: true),
                    GPSDop = table.Column<byte>(nullable: true),
                    DeviceStatus = table.Column<byte>(nullable: false),
                    BatteryVoltage = table.Column<float>(nullable: false),
                    InputVoltage = table.Column<float>(nullable: false),
                    EventCode = table.Column<byte>(nullable: false),
                    Op = table.Column<byte>(nullable: true),
                    Force_G2_Idle_System = table.Column<byte>(nullable: true),
                    Force_G2_Idle_MCC = table.Column<short>(nullable: true),
                    Force_G2_Idle_MNC = table.Column<byte>(nullable: true),
                    Force_G2_Idle_BSIC = table.Column<byte>(nullable: true),
                    Force_G2_Idle_LAC = table.Column<int>(nullable: true),
                    Force_G2_Idle_ARFCN = table.Column<short>(nullable: true),
                    Force_G2_Idle_CellID = table.Column<int>(nullable: true),
                    Force_G2_Idle_RxLev = table.Column<short>(nullable: true),
                    Force_G2_Voice_System = table.Column<byte>(nullable: true),
                    Force_G2_Voice_MCC = table.Column<short>(nullable: true),
                    Force_G2_Voice_MNC = table.Column<byte>(nullable: true),
                    Force_G2_Voice_BSIC = table.Column<byte>(nullable: true),
                    Force_G2_Voice_LAC = table.Column<int>(nullable: true),
                    Force_G2_Voice_ARFCN = table.Column<short>(nullable: true),
                    Force_G2_Voice_CellID = table.Column<int>(nullable: true),
                    Force_G2_Voice_RxLev = table.Column<short>(nullable: true),
                    Force_G2_Voice_Ta = table.Column<byte>(nullable: true),
                    Force_G2_Voice_TxPwr = table.Column<byte>(nullable: true),
                    Force_G2_Voice_RxQual = table.Column<byte>(nullable: true),
                    Force_G2_Call = table.Column<byte[]>(maxLength: 28, nullable: true),
                    Force_G2_Ping_pSent = table.Column<byte>(nullable: true),
                    Force_G2_Ping_pRec = table.Column<byte>(nullable: true),
                    Force_G2_Ping_pLost = table.Column<byte>(nullable: true),
                    Force_G2_Ping_rttMin = table.Column<short>(nullable: true),
                    Force_G2_Ping_rttMax = table.Column<short>(nullable: true),
                    Force_G2_Ping_rttAvg = table.Column<short>(nullable: true),
                    Force_G3_Idle_System = table.Column<byte>(nullable: true),
                    Force_G3_Idle_MCC = table.Column<short>(nullable: true),
                    Force_G3_Idle_MNC = table.Column<byte>(nullable: true),
                    Force_G3_Idle_LAC = table.Column<int>(nullable: true),
                    Force_G3_Idle_RfBand = table.Column<string>(maxLength: 20, nullable: true),
                    Force_G3_Idle_RSSI = table.Column<short>(nullable: true),
                    Force_G3_Idle_PSC = table.Column<short>(nullable: true),
                    Force_G3_Idle_UARFCN = table.Column<short>(nullable: true),
                    Force_G3_Idle_RxLev = table.Column<short>(nullable: true),
                    Force_G3_Idle_ECIO = table.Column<float>(nullable: true),
                    Force_G3_Idle_ID = table.Column<int>(nullable: true),
                    Force_G3_Idle_RSCP = table.Column<short>(nullable: true),
                    Force_G3_Voice_System = table.Column<byte>(nullable: true),
                    Force_G3_Voice_MCC = table.Column<short>(nullable: true),
                    Force_G3_Voice_MNC = table.Column<byte>(nullable: true),
                    Force_G3_Voice_LAC = table.Column<int>(nullable: true),
                    Force_G3_Voice_RfBand = table.Column<string>(maxLength: 20, nullable: true),
                    Force_G3_Voice_RSSI = table.Column<short>(nullable: true),
                    Force_G3_Voice_PSC = table.Column<short>(nullable: true),
                    Force_G3_Voice_UARFCN = table.Column<short>(nullable: true),
                    Force_G3_Voice_ECIO = table.Column<float>(nullable: true),
                    Force_G3_Voice_ID = table.Column<int>(nullable: true),
                    Force_G3_Voice_RSCP = table.Column<short>(nullable: true),
                    Force_G3_Voice_RxLev = table.Column<short>(nullable: true),
                    Force_G3_Voice_TxPwr = table.Column<byte>(nullable: true),
                    Force_G3_Voice_BER = table.Column<byte>(nullable: true),
                    Force_G3_Call = table.Column<byte[]>(maxLength: 28, nullable: true),
                    Force_G3_Ping_pSent = table.Column<byte>(nullable: true),
                    Force_G3_Ping_pRec = table.Column<byte>(nullable: true),
                    Force_G3_Ping_pLost = table.Column<byte>(nullable: true),
                    Force_G3_Ping_rttMin = table.Column<short>(nullable: true),
                    Force_G3_Ping_rttMax = table.Column<short>(nullable: true),
                    Force_G3_Ping_rttAvg = table.Column<short>(nullable: true),
                    Force_G4_System = table.Column<byte>(nullable: true),
                    Force_G4_MCC = table.Column<short>(nullable: true),
                    Force_G4_MNC = table.Column<byte>(nullable: true),
                    Force_G4_LAC = table.Column<int>(nullable: true),
                    Force_G4_CellID = table.Column<short>(nullable: true),
                    Force_G4_FrqBand = table.Column<string>(maxLength: 20, nullable: true),
                    Force_G4_EARFCN = table.Column<short>(nullable: true),
                    Force_G4_DLBW = table.Column<byte>(nullable: true),
                    Force_G4_ULBW = table.Column<byte>(nullable: true),
                    Force_G4_RSRQ = table.Column<float>(nullable: true),
                    Force_G4_RSRP = table.Column<float>(nullable: true),
                    Force_G4_RSSI = table.Column<float>(nullable: true),
                    Force_G4_RSSNR = table.Column<short>(nullable: true),
                    Force_G4_SINR = table.Column<short>(nullable: true),
                    Force_G4_Ping_pSent = table.Column<byte>(nullable: true),
                    Force_G4_Ping_pRec = table.Column<byte>(nullable: true),
                    Force_G4_Ping_pLost = table.Column<byte>(nullable: true),
                    Force_G4_Ping_rttMin = table.Column<short>(nullable: true),
                    Force_G4_Ping_rttMax = table.Column<short>(nullable: true),
                    Force_G4_Ping_rttAvg = table.Column<short>(nullable: true),
                    Auto_G2_Idle_System = table.Column<byte>(nullable: true),
                    Auto_G2_Idle_MCC = table.Column<short>(nullable: true),
                    Auto_G2_Idle_MNC = table.Column<byte>(nullable: true),
                    Auto_G2_Idle_BSIC = table.Column<byte>(nullable: true),
                    Auto_G2_Idle_LAC = table.Column<int>(nullable: true),
                    Auto_G2_Idle_ARFCN = table.Column<short>(nullable: true),
                    Auto_G2_Idle_CellID = table.Column<int>(nullable: true),
                    Auto_G2_Idle_RxLev = table.Column<short>(nullable: true),
                    Auto_G2_Voice_System = table.Column<byte>(nullable: true),
                    Auto_G2_Voice_MCC = table.Column<short>(nullable: true),
                    Auto_G2_Voice_MNC = table.Column<byte>(nullable: true),
                    Auto_G2_Voice_BSIC = table.Column<byte>(nullable: true),
                    Auto_G2_Voice_LAC = table.Column<int>(nullable: true),
                    Auto_G2_Voice_ARFCN = table.Column<short>(nullable: true),
                    Auto_G2_Voice_CellID = table.Column<int>(nullable: true),
                    Auto_G2_Voice_RxLev = table.Column<short>(nullable: true),
                    Auto_G2_Voice_Ta = table.Column<byte>(nullable: true),
                    Auto_G2_Voice_TxPwr = table.Column<byte>(nullable: true),
                    Auto_G2_Voice_RxQual = table.Column<byte>(nullable: true),
                    Auto_G2_Call = table.Column<byte[]>(maxLength: 28, nullable: true),
                    Auto_G2_Ping_pSent = table.Column<byte>(nullable: true),
                    Auto_G2_Ping_pRec = table.Column<byte>(nullable: true),
                    Auto_G2_Ping_pLost = table.Column<byte>(nullable: true),
                    Auto_G2_Ping_rttMin = table.Column<short>(nullable: true),
                    Auto_G2_Ping_rttMax = table.Column<short>(nullable: true),
                    Auto_G2_Ping_rttAvg = table.Column<short>(nullable: true),
                    Auto_G3_Idle_System = table.Column<byte>(nullable: true),
                    Auto_G3_Idle_MCC = table.Column<short>(nullable: true),
                    Auto_G3_Idle_MNC = table.Column<byte>(nullable: true),
                    Auto_G3_Idle_LAC = table.Column<int>(nullable: true),
                    Auto_G3_Idle_RfBand = table.Column<string>(maxLength: 20, nullable: true),
                    Auto_G3_Idle_RSSI = table.Column<short>(nullable: true),
                    Auto_G3_Idle_PSC = table.Column<short>(nullable: true),
                    Auto_G3_Idle_UARFCN = table.Column<short>(nullable: true),
                    Auto_G3_Idle_RxLev = table.Column<short>(nullable: true),
                    Auto_G3_Idle_ECIO = table.Column<float>(nullable: true),
                    Auto_G3_Idle_ID = table.Column<int>(nullable: true),
                    Auto_G3_Idle_RSCP = table.Column<short>(nullable: true),
                    Auto_G3_Voice_System = table.Column<byte>(nullable: true),
                    Auto_G3_Voice_MCC = table.Column<short>(nullable: true),
                    Auto_G3_Voice_MNC = table.Column<byte>(nullable: true),
                    Auto_G3_Voice_LAC = table.Column<int>(nullable: true),
                    Auto_G3_Voice_RfBand = table.Column<string>(maxLength: 20, nullable: true),
                    Auto_G3_Voice_RSSI = table.Column<short>(nullable: true),
                    Auto_G3_Voice_PSC = table.Column<short>(nullable: true),
                    Auto_G3_Voice_UARFCN = table.Column<short>(nullable: true),
                    Auto_G3_Voice_ECIO = table.Column<float>(nullable: true),
                    Auto_G3_Voice_ID = table.Column<int>(nullable: true),
                    Auto_G3_Voice_RSCP = table.Column<short>(nullable: true),
                    Auto_G3_Voice_RxLev = table.Column<short>(nullable: true),
                    Auto_G3_Voice_TxPwr = table.Column<byte>(nullable: true),
                    Auto_G3_Voice_BER = table.Column<byte>(nullable: true),
                    Auto_G3_Call = table.Column<byte[]>(maxLength: 28, nullable: true),
                    Auto_G3_Ping_pSent = table.Column<byte>(nullable: true),
                    Auto_G3_Ping_pRec = table.Column<byte>(nullable: true),
                    Auto_G3_Ping_pLost = table.Column<byte>(nullable: true),
                    Auto_G3_Ping_rttMin = table.Column<short>(nullable: true),
                    Auto_G3_Ping_rttMax = table.Column<short>(nullable: true),
                    Auto_G3_Ping_rttAvg = table.Column<short>(nullable: true),
                    Auto_G4_System = table.Column<byte>(nullable: true),
                    Auto_G4_MCC = table.Column<short>(nullable: true),
                    Auto_G4_MNC = table.Column<byte>(nullable: true),
                    Auto_G4_LAC = table.Column<int>(nullable: true),
                    Auto_G4_CellID = table.Column<short>(nullable: true),
                    Auto_G4_FrqBand = table.Column<string>(maxLength: 20, nullable: true),
                    Auto_G4_EARFCN = table.Column<short>(nullable: true),
                    Auto_G4_DLBW = table.Column<byte>(nullable: true),
                    Auto_G4_ULBW = table.Column<byte>(nullable: true),
                    Auto_G4_RSRQ = table.Column<float>(nullable: true),
                    Auto_G4_RSRP = table.Column<float>(nullable: true),
                    Auto_G4_RSSI = table.Column<float>(nullable: true),
                    Auto_G4_RSSNR = table.Column<short>(nullable: true),
                    Auto_G4_SINR = table.Column<short>(nullable: true),
                    Auto_G4_Ping_pSent = table.Column<byte>(nullable: true),
                    Auto_G4_Ping_pRec = table.Column<byte>(nullable: true),
                    Auto_G4_Ping_pLost = table.Column<byte>(nullable: true),
                    Auto_G4_Ping_rttMin = table.Column<short>(nullable: true),
                    Auto_G4_Ping_rttMax = table.Column<short>(nullable: true),
                    Auto_G4_Ping_rttAvg = table.Column<short>(nullable: true),
                    Ping_IpType = table.Column<byte>(nullable: true),
                    Ping_Ip = table.Column<byte[]>(maxLength: 4, nullable: true),
                    Ping_Domain = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InfoPacket", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "IPType",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IPType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LogFilePartitionType",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogFilePartitionType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MachineConnectionHistory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineId = table.Column<int>(nullable: false),
                    IsConnected = table.Column<bool>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())"),
                    Latitude = table.Column<double>(nullable: true),
                    Longitude = table.Column<double>(nullable: true),
                    CpuTemperature = table.Column<double>(nullable: true),
                    DateFromDevice = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineConnectionHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MachineGroup",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 128, nullable: false),
                    ParrentId = table.Column<int>(nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParrentId_Id",
                        column: x => x.ParrentId,
                        principalTable: "MachineGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MachineType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MachineUssd",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParentId = table.Column<int>(nullable: true),
                    Machineid = table.Column<int>(nullable: false),
                    Imei1 = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Imei2 = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Modem = table.Column<byte>(nullable: true),
                    Sim = table.Column<byte>(nullable: true),
                    body = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "DateTime", nullable: true, defaultValueSql: "getDate()"),
                    @operator = table.Column<string>(name: "operator", nullable: true),
                    SimBody = table.Column<string>(maxLength: 300, nullable: true),
                    Iccid = table.Column<string>(unicode: false, maxLength: 200, nullable: true),
                    DateFromDevice = table.Column<DateTime>(type: "DateTime", nullable: true),
                    Status = table.Column<byte>(nullable: true),
                    msg = table.Column<string>(unicode: false, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineUssd", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MapProvider",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false),
                    ProviderName = table.Column<string>(nullable: false),
                    IsCustom = table.Column<bool>(nullable: false),
                    PreparationMode = table.Column<byte>(nullable: false),
                    IsTransparent = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapProvider", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "MinSpeed",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OperatorId = table.Column<int>(nullable: true),
                    NetworkId = table.Column<int>(nullable: true),
                    TestId = table.Column<int>(nullable: true),
                    ParameterId = table.Column<int>(nullable: true),
                    CreateTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    Val = table.Column<double>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MinSpeed", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ModificationReport",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableID = table.Column<byte>(nullable: false),
                    ObjectID = table.Column<int>(nullable: false),
                    InsertDT = table.Column<DateTime>(type: "datetime", nullable: false),
                    ProcessedDT = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModificationReport", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Network",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false),
                    Title = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Network", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Operator",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FName = table.Column<string>(maxLength: 100, nullable: true),
                    LName = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Operator", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OTTService",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OTTService", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OTTServiceTest",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "RecievedCommand",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true, defaultValueSql: "getDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecievedCommand", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RepeatTimetype",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepeatTimetype", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RepeatType",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepeatType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SignalStrength2G",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lat = table.Column<double>(nullable: true),
                    Lon = table.Column<double>(nullable: true),
                    Val = table.Column<double>(nullable: true),
                    SheetName = table.Column<string>(maxLength: 200, nullable: true),
                    EPath = table.Column<string>(maxLength: 1500, nullable: true),
                    Operator = table.Column<string>(maxLength: 50, nullable: true),
                    OperatorID = table.Column<short>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SignalStrength2G", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SignalStrength3G",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lat = table.Column<double>(nullable: true),
                    Lon = table.Column<double>(nullable: true),
                    Val = table.Column<double>(nullable: true),
                    SheetName = table.Column<string>(maxLength: 100, nullable: true),
                    EPath = table.Column<string>(maxLength: 1000, nullable: true),
                    OperatorID = table.Column<short>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SignalStrength3G", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SyncMaster",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineId = table.Column<int>(nullable: false),
                    IMEI1 = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    Status = table.Column<byte>(nullable: true),
                    CreateDate = table.Column<DateTime>(type: "date", nullable: true, defaultValueSql: "(getdate())"),
                    DisconnectedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    CntFileGet = table.Column<int>(nullable: true),
                    IsCompeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SyncMaster", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestData",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestDataType",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestDataType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestResult",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TestId = table.Column<int>(nullable: true),
                    Lat = table.Column<double>(nullable: true),
                    Long = table.Column<double>(nullable: true),
                    MCC = table.Column<int>(nullable: true),
                    MNC = table.Column<int>(nullable: true),
                    BSIC = table.Column<int>(nullable: true),
                    FregBand = table.Column<string>(maxLength: 100, nullable: true),
                    PCI = table.Column<int>(nullable: true),
                    CID = table.Column<int>(nullable: true),
                    UARFCN = table.Column<int>(nullable: true),
                    EARFCN = table.Column<int>(nullable: true),
                    ARFCN = table.Column<int>(nullable: true),
                    DLBW = table.Column<int>(nullable: true),
                    LAC = table.Column<int>(nullable: true),
                    ULBW = table.Column<int>(nullable: true),
                    RSSNR = table.Column<int>(nullable: true),
                    TA = table.Column<int>(nullable: true),
                    PSC = table.Column<int>(nullable: true),
                    TXPower = table.Column<int>(nullable: true),
                    PID = table.Column<int>(nullable: true),
                    SSC = table.Column<int>(nullable: true),
                    TAC = table.Column<int>(nullable: true),
                    RXLevel = table.Column<double>(nullable: true),
                    ECIO = table.Column<double>(nullable: true),
                    RSRQ = table.Column<double>(nullable: true),
                    BER = table.Column<int>(nullable: true),
                    RSCP = table.Column<double>(nullable: true),
                    RSRP = table.Column<double>(nullable: true),
                    Layer3Messages = table.Column<string>(nullable: true),
                    RSSI = table.Column<double>(nullable: true),
                    OVFSF = table.Column<int>(nullable: true),
                    ActiveSetNumber = table.Column<int>(nullable: true),
                    RXQual = table.Column<int>(nullable: true),
                    Throughput = table.Column<double>(nullable: true),
                    SystemMode = table.Column<int>(nullable: true),
                    Delay = table.Column<double>(nullable: true),
                    NumOfPacketSent = table.Column<int>(nullable: true),
                    NumOfPacketReceived = table.Column<int>(nullable: true),
                    NumOfPacketLost = table.Column<int>(nullable: true),
                    Rtt = table.Column<double>(nullable: true),
                    MinRtt = table.Column<double>(nullable: true),
                    AvgRtt = table.Column<double>(nullable: true),
                    MaxRtt = table.Column<double>(nullable: true),
                    Mdev = table.Column<double>(nullable: true),
                    Ping = table.Column<string>(nullable: true),
                    Operator = table.Column<string>(maxLength: 25, nullable: true),
                    TraceRoute = table.Column<string>(nullable: true),
                    hop1 = table.Column<string>(maxLength: 15, nullable: true),
                    hop1_rtt = table.Column<double>(nullable: true),
                    hop2 = table.Column<string>(maxLength: 15, nullable: true),
                    hop2_rtt = table.Column<double>(nullable: true),
                    hop3 = table.Column<string>(maxLength: 15, nullable: true),
                    hop3_rtt = table.Column<double>(nullable: true),
                    hop4 = table.Column<string>(maxLength: 15, nullable: true),
                    hop4_rtt = table.Column<double>(nullable: true),
                    hop5 = table.Column<string>(maxLength: 15, nullable: true),
                    hop5_rtt = table.Column<double>(nullable: true),
                    hop6 = table.Column<string>(maxLength: 15, nullable: true),
                    hop6_rtt = table.Column<double>(nullable: true),
                    hop7 = table.Column<string>(maxLength: 15, nullable: true),
                    hop7_rtt = table.Column<double>(nullable: true),
                    hop8 = table.Column<string>(maxLength: 15, nullable: true),
                    hop8_rtt = table.Column<double>(nullable: true),
                    hop9 = table.Column<string>(maxLength: 15, nullable: true),
                    hop9_rtt = table.Column<double>(nullable: true),
                    hop10 = table.Column<string>(maxLength: 15, nullable: true),
                    hop10_rtt = table.Column<double>(nullable: true),
                    IsGroup = table.Column<bool>(nullable: true),
                    ElapsedTime = table.Column<double>(nullable: true),
                    AvrgSpeed = table.Column<double>(nullable: true),
                    Speed = table.Column<double>(nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    CreateDateFa = table.Column<string>(nullable: true),
                    MachineId = table.Column<int>(nullable: true),
                    MachineName = table.Column<string>(maxLength: 100, nullable: true),
                    DefinedTestId = table.Column<int>(nullable: true),
                    DefinedTestName = table.Column<string>(maxLength: 254, nullable: true),
                    SelectedSim = table.Column<short>(nullable: true),
                    BeginDateTest = table.Column<DateTime>(type: "datetime", nullable: true),
                    EndDateTest = table.Column<DateTime>(type: "datetime", nullable: true),
                    FileName = table.Column<string>(maxLength: 100, nullable: true),
                    FileSize = table.Column<int>(nullable: true),
                    RegisterDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestResult", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TestType",
                columns: table => new
                {
                    Id = table.Column<short>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestType", x => x.Id);
                });

           

            migrationBuilder.CreateTable(
                name: "Zones",
                columns: table => new
                {
                    ZoneId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 100, nullable: false),
                    Type = table.Column<string>(maxLength: 10, nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zones_1", x => x.ZoneId);
                });

            migrationBuilder.CreateTable(
                name: "Errors",
                schema: "system",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    Business = table.Column<string>(nullable: true),
                    Module = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    Methode = table.Column<string>(unicode: false, maxLength: 200, nullable: false),
                    Message = table.Column<string>(maxLength: 4000, nullable: false),
                    ExtraData = table.Column<string>(maxLength: 4000, nullable: true),
                    RawError = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Errors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppRoleClaims_AppRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AppRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppUserClaims_AppUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AppUserLogins_AppUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppUserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AppUserRoles_AppRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AppRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserRoles_AppUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppUserTokens",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    CreatedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    CreatedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    CreatedDateTime = table.Column<DateTime>(nullable: true),
                    ModifiedByBrowserName = table.Column<string>(maxLength: 1000, nullable: true),
                    ModifiedByIp = table.Column<string>(maxLength: 255, nullable: true),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedDateTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AppUserTokens_AppUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

           

            migrationBuilder.CreateTable(
                name: "MachineVersionGroup",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineGroupId = table.Column<int>(nullable: false),
                    MachineGroupTitle = table.Column<string>(maxLength: 100, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    CompleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    CreatedBy = table.Column<int>(nullable: true),
                    FileDownloadAddress = table.Column<string>(maxLength: 250, nullable: true),
                    IsDone = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineVersionGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MachineVersionGroup_MachineGroup",
                        column: x => x.MachineGroupId,
                        principalTable: "MachineGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Machine",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IMEI1 = table.Column<string>(maxLength: 255, nullable: true),
                    IMEI2 = table.Column<string>(maxLength: 255, nullable: true),
                    Identifier = table.Column<string>(maxLength: 50, nullable: true, defaultValueSql: "(N'')"),
                    SerialNo = table.Column<string>(maxLength: 30, nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: true, defaultValueSql: "(N'')"),
                    SimcardNo = table.Column<string>(maxLength: 30, nullable: true, defaultValueSql: "(N'')"),
                    InstallLocation = table.Column<string>(maxLength: 200, nullable: true, defaultValueSql: "(N'')"),
                    MachineTypeId = table.Column<int>(nullable: true),
                    MachineGroupId = table.Column<int>(nullable: true),
                    IsConnected = table.Column<bool>(nullable: true),
                    Latitude = table.Column<double>(nullable: true),
                    Longitude = table.Column<double>(nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    IsRead = table.Column<bool>(nullable: true, defaultValueSql: "((0))"),
                    Version = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machine", x => x.Id);
                    table.ForeignKey(
                        name: "fk_MachineGroupId_Id",
                        column: x => x.MachineGroupId,
                        principalTable: "MachineGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProbeMachine_MachineType",
                        column: x => x.MachineTypeId,
                        principalTable: "MachineType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NetworkTestResultFild",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NetworkID = table.Column<short>(nullable: false),
                    TestFild = table.Column<string>(maxLength: 50, nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkTestResultFild", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NetworkTestResultFild_Network",
                        column: x => x.NetworkID,
                        principalTable: "Network",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SyncDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PSyncId = table.Column<int>(nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Command = table.Column<string>(unicode: false, maxLength: 10, nullable: true),
                    status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SyncDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SyncDetail_SyncMaster",
                        column: x => x.PSyncId,
                        principalTable: "SyncMaster",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DefinedTest",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 254, nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    Layer3Messages = table.Column<bool>(nullable: false),
                    RepeatTypeId = table.Column<short>(nullable: false),
                    RepeatTime = table.Column<int>(nullable: true),
                    RepeatCount = table.Column<int>(nullable: true),
                    MeasurementInterval = table.Column<int>(nullable: false),
                    TestTypeId = table.Column<short>(nullable: false),
                    UsualCallDuration = table.Column<int>(nullable: true),
                    UsualCallWaitTime = table.Column<int>(nullable: true),
                    UsualCallNumber = table.Column<string>(maxLength: 50, nullable: true),
                    TestDataId = table.Column<short>(nullable: true),
                    TestDataTypeId = table.Column<short>(nullable: true),
                    TestDataServer = table.Column<string>(maxLength: 50, nullable: true),
                    TestDataUserName = table.Column<string>(maxLength: 50, nullable: true),
                    TestDataPassword = table.Column<string>(maxLength: 50, nullable: true),
                    TestDataDownloadFileAddress = table.Column<string>(maxLength: 1000, nullable: true),
                    TestDataUploadFileSize = table.Column<int>(nullable: true),
                    IPTypeId = table.Column<short>(nullable: true),
                    OTTServiceId = table.Column<short>(nullable: true),
                    OTTServiceTestId = table.Column<short>(nullable: true),
                    NetworkId = table.Column<short>(nullable: false),
                    BandId = table.Column<short>(nullable: true),
                    SaveLogFile = table.Column<bool>(nullable: true),
                    LogFilePartitionTypeId = table.Column<short>(nullable: true),
                    LogFilePartitionTime = table.Column<short>(nullable: true),
                    LogFilePartitionSize = table.Column<short>(nullable: true),
                    LogFileHoldTime = table.Column<int>(nullable: true),
                    NumberOfPings = table.Column<short>(nullable: true),
                    PacketSize = table.Column<short>(nullable: true),
                    InternalTime = table.Column<short>(nullable: true),
                    ResponseWaitTime = table.Column<int>(nullable: true),
                    TTL = table.Column<short>(nullable: true),
                    FileSize = table.Column<int>(nullable: true),
                    TraceRouteHubCount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefinedTest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DefinedTest_TestType",
                        column: x => x.TestTypeId,
                        principalTable: "TestType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ZoneKml",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZoneId = table.Column<int>(nullable: false),
                    KmlFile = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZoneKml", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ZoneKml_Zones",
                        column: x => x.ZoneId,
                        principalTable: "Zones",
                        principalColumn: "ZoneId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ZonePoint",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lat = table.Column<double>(nullable: false),
                    Lon = table.Column<double>(nullable: false),
                    ZoneId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZonePoint", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ZonePoint_Zones",
                        column: x => x.ZoneId,
                        principalTable: "Zones",
                        principalColumn: "ZoneId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Command",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineID = table.Column<int>(nullable: true),
                    BuildDT = table.Column<DateTime>(type: "datetime", nullable: false),
                    SendDT = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsEnabled = table.Column<bool>(nullable: true),
                    SendingScenario = table.Column<byte>(nullable: false),
                    HasResponse = table.Column<bool>(nullable: false),
                    ConfigId = table.Column<Guid>(nullable: false),
                    CommandType = table.Column<byte>(nullable: false),
                    ReadableCommand = table.Column<string>(nullable: true),
                    Timeout = table.Column<int>(nullable: true),
                    Response = table.Column<byte[]>(nullable: true),
                    ResponseDT = table.Column<DateTime>(type: "datetime", nullable: true),
                    ResponseReceivedChannelID = table.Column<int>(nullable: true),
                    ReadableResponse = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Command", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Command_MachineID_ProbeMachine_ID",
                        column: x => x.MachineID,
                        principalTable: "Machine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MachineLocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    machineId = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "DateTime", nullable: true, defaultValueSql: "getDate()"),
                    Latitude = table.Column<decimal>(nullable: true),
                    Longitude = table.Column<decimal>(nullable: true),
                    CpuTemperature = table.Column<decimal>(nullable: true),
                    DateFromDevice = table.Column<DateTime>(nullable: true),
                    Speed = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MachineLocations_Machine",
                        column: x => x.machineId,
                        principalTable: "Machine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MachineVersion",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineId = table.Column<int>(nullable: false),
                    MachineVersionGroupId = table.Column<int>(nullable: true),
                    IMEI1 = table.Column<string>(maxLength: 255, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    CompleteDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    FileDownloadAddress = table.Column<string>(maxLength: 500, nullable: true),
                    IsDone = table.Column<bool>(nullable: false),
                    CreatedBy = table.Column<int>(nullable: true),
                    SendToDevice = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineVersion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MachineVersion_Machine1",
                        column: x => x.MachineId,
                        principalTable: "Machine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MachineVersion_MachineVersionGroup",
                        column: x => x.MachineVersionGroupId,
                        principalTable: "MachineVersionGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DefinedTestMachineGroup",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DefinedTestId = table.Column<int>(nullable: true),
                    MachineGroupId = table.Column<int>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    SIM = table.Column<short>(nullable: true),
                    BeginDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Status = table.Column<bool>(nullable: true),
                    FinishTime = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefinedTestMachineGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DefinedTestMachineGroup_DefinedTest",
                        column: x => x.DefinedTestId,
                        principalTable: "DefinedTest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DefinedTestMachineGroup_MachineGroup",
                        column: x => x.MachineGroupId,
                        principalTable: "MachineGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CommandOnMedia",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommandID = table.Column<long>(nullable: false),
                    MediaType = table.Column<byte>(nullable: false),
                    CommandBytes = table.Column<byte[]>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommandOnMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommandOnMedia_CommandID_Command_ID",
                        column: x => x.CommandID,
                        principalTable: "Command",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MachineVersionDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VersionId = table.Column<int>(nullable: false),
                    State = table.Column<string>(maxLength: 50, nullable: true),
                    CreateDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Sender = table.Column<string>(maxLength: 50, nullable: true),
                    Reciever = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineVersionDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MachineVersionDetail_MachineVersion",
                        column: x => x.VersionId,
                        principalTable: "MachineVersion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DefinedTestMachine",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DefinedTestId = table.Column<int>(nullable: false),
                    MachineId = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    SIM = table.Column<short>(nullable: false),
                    BeginDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Status = table.Column<bool>(nullable: true, defaultValueSql: "((0))"),
                    FinishTime = table.Column<DateTime>(type: "datetime", nullable: true),
                    TestGroupId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefinedTestMachine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DefinedTestMachine_DefinedTest",
                        column: x => x.DefinedTestId,
                        principalTable: "DefinedTest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DefinedTestMachine_Machine",
                        column: x => x.MachineId,
                        principalTable: "Machine",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DefinedTestMachine_DefinedTestMachineGroup",
                        column: x => x.TestGroupId,
                        principalTable: "DefinedTestMachineGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppDataProtectionKeys_FriendlyName",
                table: "AppDataProtectionKeys",
                column: "FriendlyName",
                unique: true,
                filter: "[FriendlyName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AppRoleClaims_RoleId",
                table: "AppRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AppRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserClaims_UserId",
                table: "AppUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserLogins_UserId",
                table: "AppUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserRoles_RoleId",
                table: "AppUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AppUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AppUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            
            migrationBuilder.CreateIndex(
                name: "IX_Command_MachineID",
                table: "Command",
                column: "MachineID");

            migrationBuilder.CreateIndex(
                name: "IX_CommandOnMedia_CommandID",
                table: "CommandOnMedia",
                column: "CommandID");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTest_TestTypeId",
                table: "DefinedTest",
                column: "TestTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTestMachine_DefinedTestId",
                table: "DefinedTestMachine",
                column: "DefinedTestId");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTestMachine_MachineId",
                table: "DefinedTestMachine",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTestMachine_TestGroupId",
                table: "DefinedTestMachine",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTestMachineGroup_DefinedTestId",
                table: "DefinedTestMachineGroup",
                column: "DefinedTestId");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTestMachineGroup_MachineGroupId",
                table: "DefinedTestMachineGroup",
                column: "MachineGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Machine_MachineGroupId",
                table: "Machine",
                column: "MachineGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Machine_MachineTypeId",
                table: "Machine",
                column: "MachineTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineGroup_ParrentId",
                table: "MachineGroup",
                column: "ParrentId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineLocations_machineId",
                table: "MachineLocations",
                column: "machineId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineVersion_MachineId",
                table: "MachineVersion",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineVersion_MachineVersionGroupId",
                table: "MachineVersion",
                column: "MachineVersionGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineVersionDetail_VersionId",
                table: "MachineVersionDetail",
                column: "VersionId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineVersionGroup_MachineGroupId",
                table: "MachineVersionGroup",
                column: "MachineGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_NetworkTestResultFild_NetworkID",
                table: "NetworkTestResultFild",
                column: "NetworkID");

            migrationBuilder.CreateIndex(
                name: "IX_OperatorID",
                table: "SignalStrength2G",
                column: "OperatorID");

            migrationBuilder.CreateIndex(
                name: "IX_OperatorId_Lat_Lon_Val",
                table: "SignalStrength2G",
                columns: new[] { "Val", "OperatorID", "Lat", "Lon" });

            migrationBuilder.CreateIndex(
                name: "IX_OperatorID",
                table: "SignalStrength3G",
                column: "OperatorID");

            migrationBuilder.CreateIndex(
                name: "NonClusteredIndex-20190918-094819",
                table: "SignalStrength3G",
                columns: new[] { "Val", "Lat", "Lon" });

            migrationBuilder.CreateIndex(
                name: "IX_SyncDetail_PSyncId",
                table: "SyncDetail",
                column: "PSyncId");

            migrationBuilder.CreateIndex(
                name: "IX_BeginDateTest",
                table: "TestResult",
                column: "BeginDateTest");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTestId",
                table: "TestResult",
                column: "DefinedTestId");

            migrationBuilder.CreateIndex(
                name: "IX_EndDateTest",
                table: "TestResult",
                column: "EndDateTest");

            migrationBuilder.CreateIndex(
                name: "IX_MachineId",
                table: "TestResult",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_SelectedSim",
                table: "TestResult",
                column: "SelectedSim");

            

            migrationBuilder.CreateIndex(
                name: "IX_ZoneKml_ZoneId",
                table: "ZoneKml",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_ZonePoint",
                table: "ZonePoint",
                column: "ZoneId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActiveProbeParams");

            migrationBuilder.DropTable(
                name: "AppDataProtectionKeys");

            migrationBuilder.DropTable(
                name: "AppLogItems");

            migrationBuilder.DropTable(
                name: "AppRoleClaims");


            migrationBuilder.DropTable(
                name: "AppUserClaims");

            migrationBuilder.DropTable(
                name: "AppUserLogins");

            migrationBuilder.DropTable(
                name: "AppUserRoles");

            migrationBuilder.DropTable(
                name: "AppUserTokens");

           

            migrationBuilder.DropTable(
                name: "Band");

            migrationBuilder.DropTable(
                name: "Channel");

            migrationBuilder.DropTable(
                name: "CommandOnMedia");

            migrationBuilder.DropTable(
                name: "DateTestModel");

            migrationBuilder.DropTable(
                name: "DefinedTestMachine");

            migrationBuilder.DropTable(
                name: "Direction");

            migrationBuilder.DropTable(
                name: "FieldColorThreshold");

            migrationBuilder.DropTable(
                name: "Group_Machine");

            migrationBuilder.DropTable(
                name: "InfoPacket");

            migrationBuilder.DropTable(
                name: "IPType");

            migrationBuilder.DropTable(
                name: "LogFilePartitionType");

            migrationBuilder.DropTable(
                name: "MachineConnectionHistory");

            migrationBuilder.DropTable(
                name: "MachineLocations");

            migrationBuilder.DropTable(
                name: "MachineUssd");

            migrationBuilder.DropTable(
                name: "MachineVersionDetail");

            migrationBuilder.DropTable(
                name: "MapProvider");

            migrationBuilder.DropTable(
                name: "MinSpeed");

            migrationBuilder.DropTable(
                name: "ModificationReport");

            migrationBuilder.DropTable(
                name: "NetworkTestResultFild");

            migrationBuilder.DropTable(
                name: "Operator");

            migrationBuilder.DropTable(
                name: "OTTService");

            migrationBuilder.DropTable(
                name: "OTTServiceTest");

            migrationBuilder.DropTable(
                name: "RecievedCommand");

            migrationBuilder.DropTable(
                name: "RepeatTimetype");

            migrationBuilder.DropTable(
                name: "RepeatType");

            migrationBuilder.DropTable(
                name: "SignalStrength2G");

            migrationBuilder.DropTable(
                name: "SignalStrength3G");

            migrationBuilder.DropTable(
                name: "SyncDetail");

            migrationBuilder.DropTable(
                name: "TestData");

            migrationBuilder.DropTable(
                name: "TestDataType");

            migrationBuilder.DropTable(
                name: "TestResult");

            

            migrationBuilder.DropTable(
                name: "ZoneKml");

            migrationBuilder.DropTable(
                name: "ZonePoint");

            migrationBuilder.DropTable(
                name: "Errors",
                schema: "system");

            migrationBuilder.DropTable(
                name: "AppRoles");

            migrationBuilder.DropTable(
                name: "AppUsers");

            migrationBuilder.DropTable(
                name: "Command");

            migrationBuilder.DropTable(
                name: "DefinedTestMachineGroup");

            migrationBuilder.DropTable(
                name: "MachineVersion");

            migrationBuilder.DropTable(
                name: "Network");

            migrationBuilder.DropTable(
                name: "SyncMaster");

            migrationBuilder.DropTable(
                name: "Zones");

            migrationBuilder.DropTable(
                name: "DefinedTest");

            migrationBuilder.DropTable(
                name: "Machine");

            migrationBuilder.DropTable(
                name: "MachineVersionGroup");

            migrationBuilder.DropTable(
                name: "TestType");

            migrationBuilder.DropTable(
                name: "MachineType");

            migrationBuilder.DropTable(
                name: "MachineGroup");
        }
    }
}
