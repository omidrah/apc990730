using System.Threading.Tasks;
using System.Threading;
using System;
using System.Collections.Generic;
using System.Globalization;
using ActiveProbe.Domain.AuditableEntity;
using ActiveProbe.Domain.Identity;
using ActiveProbe.Domain.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Infrastructure;
using ActiveProbe.Utils.Extentions;
using ASPNETCoreIdentitySample.DataLayer.Config;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Math.EC.Rfc7748;

namespace ActiveProbe.DataLayer.Context
{
    public partial class ActiveProbeCoreContext :
     IdentityDbContext<User, Role, int, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
                            , IUnitOfWork
    {
        private IDbContextTransaction _transaction;

        public ActiveProbeCoreContext()
        {
        }
        public ActiveProbeCoreContext(DbContextOptions<ActiveProbeCoreContext> options)
            : base(options)
        {
        }
        #region repositories-ActiveProbe
        public virtual DbSet<AppLogItem> AppLogItems { get; set; }        
        public virtual DbSet<AppDataProtectionKey> AppDataProtectionKeys { get; set; }
        public virtual DbSet<ActiveProbeParams> ActiveProbeParams { get; set; }
        public virtual DbSet<Token> Tokens { get; set; }
        public virtual DbSet<Band> Band { get; set; }
        public virtual DbSet<Channel> Channel { get; set; }
        public virtual DbSet<Command> Command { get; set; }
        public virtual DbSet<CommandOnMedia> CommandOnMedia { get; set; }
        public virtual DbSet<DateTestModel> DateTestModel { get; set; }
        public virtual DbSet<DefinedTest> DefinedTest { get; set; }
        public virtual DbSet<DefinedTestMachine> DefinedTestMachine { get; set; }
        public virtual DbSet<DefinedTestMachineGroup> DefinedTestMachineGroup { get; set; }
        public virtual DbSet<Direction> Direction { get; set; }
        public virtual DbSet<Errors> Errors { get; set; }
        public virtual DbSet<FieldColorThreshold> FieldColorThreshold { get; set; }
        public virtual DbSet<GroupMachine> GroupMachine { get; set; }
        public virtual DbSet<InfoPacket> InfoPacket { get; set; }
        public virtual DbSet<Iptype> Iptype { get; set; }
        public virtual DbSet<LogFilePartitionType> LogFilePartitionType { get; set; }
        public virtual DbSet<Machine> Machine { get; set; }
        public virtual DbSet<MachineConnectionHistory> MachineConnectionHistory { get; set; }
        public virtual DbSet<MachineGroup> MachineGroup { get; set; }
        public virtual DbSet<MachineLocations> MachineLocations { get; set; }
        public virtual DbSet<MachineUssd> MachineUssd { get; set; }
        public virtual DbSet<MachineType> MachineType { get; set; }
        public virtual DbSet<RecievedCommand> RecievedCommand { get; set; }
        public virtual DbSet<MachineVersion> MachineVersion { get; set; }
        public virtual DbSet<MachineVersionDetail> MachineVersionDetail { get; set; }
        public virtual DbSet<MachineVersionGroup> MachineVersionGroup { get; set; }
        public virtual DbSet<MapProvider> MapProvider { get; set; }
        public virtual DbSet<MinSpeed> MinSpeed { get; set; }
        public virtual DbSet<ModificationReport> ModificationReport { get; set; }
        public virtual DbSet<Network> Network { get; set; }
        public virtual DbSet<NetworkTestResultFild> NetworkTestResultFild { get; set; }
        public virtual DbSet<Operator> Operator { get; set; }
        public virtual DbSet<Ottservice> Ottservice { get; set; }
        public virtual DbSet<OttserviceTest> OttserviceTest { get; set; }
        public virtual DbSet<RepeatTimetype> RepeatTimetype { get; set; }
        public virtual DbSet<RepeatType> RepeatType { get; set; }
        public virtual DbSet<SignalStrength2G> SignalStrength2G { get; set; }
        public virtual DbSet<SignalStrength3G> SignalStrength3G { get; set; }
        public virtual DbSet<SyncDetail> SyncDetail { get; set; }
        public virtual DbSet<SyncMaster> SyncMaster { get; set; }
        public virtual DbSet<TestData> TestData { get; set; }
        public virtual DbSet<TestDataType> TestDataType { get; set; }
        public virtual DbSet<TestResult> TestResult { get; set; }
        public virtual DbSet<TestType> TestType { get; set; }
        
        public virtual DbSet<ZoneKml> ZoneKml { get; set; }
        public virtual DbSet<ZonePoint> ZonePoint { get; set; }
        public virtual DbSet<Zones> Zones { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<NotificationParameter> NotificationParameter { get; set; }
        public virtual DbSet<NotificationFilter> NotificationFilter { get; set; }
        public virtual DbSet<SendedNotification> SendedNotification { get; set; }
        #endregion
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=ActiveProbeCore;User Id =sa; Password =123");
                //optionsBuilder.UseSqlServer(@"Server=185.192.112.74,1561;Database=ActiveProbeCore;User Id =sa; Password =Pr0b2001@ct1VE");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //ActiveProbe Configuration
            FluentBuilder(modelBuilder);
            //Identity Configuration
            modelBuilder.AddCustomIdentityMappings();
            //Add ShadowProprty To All Entity has IAutdi
            modelBuilder.AddAuditableShadowProperties();
        }
        private void FluentBuilder(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActiveProbeParams>(entity =>
            {
                entity.Property(e => e.Descriptions).HasMaxLength(200);

                entity.Property(e => e.Title).HasMaxLength(500);

                entity.Property(e => e.Type).HasMaxLength(100);
            });
            modelBuilder.Entity<Band>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Token>(entity => {
                entity.HasKey(x => x.Id);
                entity.HasOne(x => x.User).WithMany(x => x.Tokens).HasForeignKey(x => x.UserId);
            });
            modelBuilder.Entity<RecievedCommand>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.CreatedDate).HasDefaultValueSql("getDate()");
                entity.Property(x => x.Data).HasColumnType("nvarchar(max)");
            });

            modelBuilder.Entity<Channel>(entity =>
            {

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Cost);

                entity.Property(e => e.MediaType);

                entity.Property(e => e.Name)
                    .HasMaxLength(50);

                entity.Property(e => e.Params)
                    .IsRequired();

                entity.Property(e => e.Protocols)
                    .IsRequired();

                entity.Property(e => e.Timeout);
            });

            modelBuilder.Entity<Command>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                   ;

                entity.Property(e => e.BuildDt)
                    .HasColumnName("BuildDT")
                    .HasColumnType("datetime")
                   ;

                entity.Property(e => e.CommandType);

                entity.Property(e => e.ConfigId);

                entity.Property(e => e.HasResponse);

                entity.Property(e => e.IsEnabled);

                entity.Property(e => e.MachineId)
                    .HasColumnName("MachineID")
                   ;

                entity.Property(e => e.ReadableCommand);

                entity.Property(e => e.ReadableResponse);

                entity.Property(e => e.Response);

                entity.Property(e => e.ResponseDt)
                    .HasColumnName("ResponseDT")
                    .HasColumnType("datetime")
                   ;

                entity.Property(e => e.ResponseReceivedChannelId)
                    .HasColumnName("ResponseReceivedChannelID")
                   ;

                entity.Property(e => e.SendDt)
                    .HasColumnName("SendDT")
                    .HasColumnType("datetime")
                   ;

                entity.Property(e => e.SendingScenario);

                entity.Property(e => e.Timeout);

                entity.HasOne(d => d.Machine)
                    .WithMany(p => p.Command)
                    .HasForeignKey(d => d.MachineId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Command_MachineID_ProbeMachine_ID");
            });
            modelBuilder.Entity<CommandOnMedia>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CommandBytes)
                    .IsRequired();

                entity.Property(e => e.CommandId)
                    .HasColumnName("CommandID")
                   ;

                entity.Property(e => e.MediaType);

                entity.HasOne(d => d.Command)
                    .WithMany(p => p.CommandOnMedia)
                    .HasForeignKey(d => d.CommandId)
                    .HasConstraintName("FK_CommandOnMedia_CommandID_Command_ID");
            });

            modelBuilder.Entity<DateTestModel>(entity =>
            {
                entity.Property(e => e.Fname)
                    .HasColumnName("FName")
                    .HasMaxLength(100);

                entity.Property(e => e.Lname)
                    .HasColumnName("LName")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<DefinedTest>(entity =>
            {


                entity.Property(e => e.Id);

                entity.Property(e => e.IptypeId).HasColumnName("IPTypeId");

                entity.Property(e => e.NetworkId);

                entity.Property(e => e.OttserviceId).HasColumnName("OTTServiceId");

                entity.Property(e => e.OttserviceTestId).HasColumnName("OTTServiceTestId");

                entity.Property(e => e.TestDataDownloadFileAddress).HasMaxLength(1000);

                entity.Property(e => e.TestDataPassword).HasMaxLength(50);

                entity.Property(e => e.TestDataServer).HasMaxLength(50);

                entity.Property(e => e.TestDataUserName).HasMaxLength(50);

                entity.Property(e => e.TestTypeId);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);

                entity.Property(e => e.Ttl).HasColumnName("TTL");

                entity.Property(e => e.UsualCallNumber).HasMaxLength(50);

                entity.HasOne(d => d.TestType)
                    .WithMany(p => p.DefinedTest)
                    .HasForeignKey(d => d.TestTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DefinedTest_TestType");
            });

            modelBuilder.Entity<DefinedTestMachine>(entity =>
            {
                entity.Property(e => e.BeginDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.FinishTime).HasColumnType("datetime");

                entity.Property(e => e.Sim).HasColumnName("SIM");

                entity.Property(e => e.Status).HasDefaultValueSql("((0))");

                entity.Property(e => e.TestGroupId);

                entity.HasOne(d => d.DefinedTest)
                    .WithMany(p => p.DefinedTestMachine)
                    .HasForeignKey(d => d.DefinedTestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DefinedTestMachine_DefinedTest");

                entity.HasOne(d => d.Machine)
                    .WithMany(p => p.DefinedTestMachine)
                    .HasForeignKey(d => d.MachineId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DefinedTestMachine_Machine");

                entity.HasOne(d => d.TestGroup)
                    .WithMany(p => p.DefinedTestMachine)
                    .HasForeignKey(d => d.TestGroupId)
                    .HasConstraintName("FK_DefinedTestMachine_DefinedTestMachineGroup");
            });

            modelBuilder.Entity<DefinedTestMachineGroup>(entity =>
            {
                entity.Property(e => e.BeginDate).HasColumnType("datetime");

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.FinishTime).HasColumnType("datetime");

                entity.Property(e => e.Sim).HasColumnName("SIM");

                entity.HasOne(d => d.DefinedTest)
                    .WithMany(p => p.DefinedTestMachineGroup)
                    .HasForeignKey(d => d.DefinedTestId)
                    .HasConstraintName("FK_DefinedTestMachineGroup_DefinedTest");

                entity.HasOne(d => d.MachineGroup)
                    .WithMany(p => p.DefinedTestMachineGroup)
                    .HasForeignKey(d => d.MachineGroupId)
                    .HasConstraintName("FK_DefinedTestMachineGroup_MachineGroup");
            });

            modelBuilder.Entity<Direction>(entity =>
            {
                entity.Property(e => e.Id)
                    .ValueGeneratedNever();

                entity.Property(e => e.Title).HasMaxLength(200);
            });

            modelBuilder.Entity<Errors>(entity =>
            {
                entity.ToTable("Errors", "system");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ExtraData).HasMaxLength(4000);

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasMaxLength(4000);

                entity.Property(e => e.Methode)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Module)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RawError).IsRequired();
            });
            modelBuilder.Entity<FieldColorThreshold>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FieldName)
                    .IsRequired()
                    .HasColumnName("fieldName")
                    .HasMaxLength(50);

                entity.Property(e => e.RangeColor)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<GroupMachine>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Group_Machine");
                entity.Property(e => e.GroupId)
                    .HasColumnName("GroupID")
                   ;

                entity.Property(e => e.MachineId)
                    .HasColumnName("MachineID")
                   ;
            });

            modelBuilder.Entity<InfoPacket>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID");
                entity.Property(e => e.Alt);

                entity.Property(e => e.AutoG2Call)
                    .HasColumnName("Auto_G2_Call")
                    .HasMaxLength(28);

                entity.Property(e => e.AutoG2IdleArfcn)
                    .HasColumnName("Auto_G2_Idle_ARFCN");

                entity.Property(e => e.AutoG2IdleBsic)
                    .HasColumnName("Auto_G2_Idle_BSIC");

                entity.Property(e => e.AutoG2IdleCellId)
                    .HasColumnName("Auto_G2_Idle_CellID");

                entity.Property(e => e.AutoG2IdleLac)
                    .HasColumnName("Auto_G2_Idle_LAC");

                entity.Property(e => e.AutoG2IdleMcc)
                    .HasColumnName("Auto_G2_Idle_MCC");

                entity.Property(e => e.AutoG2IdleMnc)
                    .HasColumnName("Auto_G2_Idle_MNC")
                   ;

                entity.Property(e => e.AutoG2IdleRxLev)
                    .HasColumnName("Auto_G2_Idle_RxLev");

                entity.Property(e => e.AutoG2IdleSystem)
                    .HasColumnName("Auto_G2_Idle_System");

                entity.Property(e => e.AutoG2PingPLost)
                    .HasColumnName("Auto_G2_Ping_pLost");

                entity.Property(e => e.AutoG2PingPRec)
                    .HasColumnName("Auto_G2_Ping_pRec");

                entity.Property(e => e.AutoG2PingPSent)
                    .HasColumnName("Auto_G2_Ping_pSent");

                entity.Property(e => e.AutoG2PingRttAvg)
                    .HasColumnName("Auto_G2_Ping_rttAvg");

                entity.Property(e => e.AutoG2PingRttMax)
                    .HasColumnName("Auto_G2_Ping_rttMax");

                entity.Property(e => e.AutoG2PingRttMin)
                    .HasColumnName("Auto_G2_Ping_rttMin");

                entity.Property(e => e.AutoG2VoiceArfcn)
                    .HasColumnName("Auto_G2_Voice_ARFCN");

                entity.Property(e => e.AutoG2VoiceBsic)
                    .HasColumnName("Auto_G2_Voice_BSIC");

                entity.Property(e => e.AutoG2VoiceCellId)
                    .HasColumnName("Auto_G2_Voice_CellID");

                entity.Property(e => e.AutoG2VoiceLac)
                    .HasColumnName("Auto_G2_Voice_LAC");
                entity.Property(e => e.AutoG2VoiceMcc)
                    .HasColumnName("Auto_G2_Voice_MCC");

                entity.Property(e => e.AutoG2VoiceMnc)
                    .HasColumnName("Auto_G2_Voice_MNC");

                entity.Property(e => e.AutoG2VoiceRxLev)
                    .HasColumnName("Auto_G2_Voice_RxLev");

                entity.Property(e => e.AutoG2VoiceRxQual)
                    .HasColumnName("Auto_G2_Voice_RxQual");

                entity.Property(e => e.AutoG2VoiceSystem)
                    .HasColumnName("Auto_G2_Voice_System");

                entity.Property(e => e.AutoG2VoiceTa)
                    .HasColumnName("Auto_G2_Voice_Ta");

                entity.Property(e => e.AutoG2VoiceTxPwr)
                    .HasColumnName("Auto_G2_Voice_TxPwr");

                entity.Property(e => e.AutoG3Call)
                    .HasColumnName("Auto_G3_Call")
                    .HasMaxLength(28);

                entity.Property(e => e.AutoG3IdleEcio)
                    .HasColumnName("Auto_G3_Idle_ECIO");

                entity.Property(e => e.AutoG3IdleId)
                    .HasColumnName("Auto_G3_Idle_ID");

                entity.Property(e => e.AutoG3IdleLac)
                    .HasColumnName("Auto_G3_Idle_LAC");

                entity.Property(e => e.AutoG3IdleMcc)
                    .HasColumnName("Auto_G3_Idle_MCC");

                entity.Property(e => e.AutoG3IdleMnc)
                    .HasColumnName("Auto_G3_Idle_MNC");

                entity.Property(e => e.AutoG3IdlePsc)
                    .HasColumnName("Auto_G3_Idle_PSC");

                entity.Property(e => e.AutoG3IdleRfBand)
                    .HasColumnName("Auto_G3_Idle_RfBand")
                    .HasMaxLength(20);

                entity.Property(e => e.AutoG3IdleRscp)
                    .HasColumnName("Auto_G3_Idle_RSCP");

                entity.Property(e => e.AutoG3IdleRssi)
                    .HasColumnName("Auto_G3_Idle_RSSI")
                   ;

                entity.Property(e => e.AutoG3IdleRxLev)
                    .HasColumnName("Auto_G3_Idle_RxLev")
                   ;

                entity.Property(e => e.AutoG3IdleSystem)
                    .HasColumnName("Auto_G3_Idle_System")
                   ;

                entity.Property(e => e.AutoG3IdleUarfcn)
                    .HasColumnName("Auto_G3_Idle_UARFCN")
                   ;

                entity.Property(e => e.AutoG3PingPLost)
                    .HasColumnName("Auto_G3_Ping_pLost")
                   ;

                entity.Property(e => e.AutoG3PingPRec)
                    .HasColumnName("Auto_G3_Ping_pRec")
                   ;

                entity.Property(e => e.AutoG3PingPSent)
                    .HasColumnName("Auto_G3_Ping_pSent")
                   ;

                entity.Property(e => e.AutoG3PingRttAvg)
                    .HasColumnName("Auto_G3_Ping_rttAvg")
                   ;

                entity.Property(e => e.AutoG3PingRttMax)
                    .HasColumnName("Auto_G3_Ping_rttMax")
                   ;

                entity.Property(e => e.AutoG3PingRttMin)
                    .HasColumnName("Auto_G3_Ping_rttMin")
                   ;

                entity.Property(e => e.AutoG3VoiceBer)
                    .HasColumnName("Auto_G3_Voice_BER")
                   ;

                entity.Property(e => e.AutoG3VoiceEcio)
                    .HasColumnName("Auto_G3_Voice_ECIO")
                   ;

                entity.Property(e => e.AutoG3VoiceId)
                    .HasColumnName("Auto_G3_Voice_ID")
                   ;

                entity.Property(e => e.AutoG3VoiceLac)
                    .HasColumnName("Auto_G3_Voice_LAC")
                   ;

                entity.Property(e => e.AutoG3VoiceMcc)
                    .HasColumnName("Auto_G3_Voice_MCC")
                   ;

                entity.Property(e => e.AutoG3VoiceMnc)
                    .HasColumnName("Auto_G3_Voice_MNC")
                   ;

                entity.Property(e => e.AutoG3VoicePsc)
                    .HasColumnName("Auto_G3_Voice_PSC")
                   ;

                entity.Property(e => e.AutoG3VoiceRfBand)
                    .HasColumnName("Auto_G3_Voice_RfBand")
                    .HasMaxLength(20)
                   ;

                entity.Property(e => e.AutoG3VoiceRscp)
                    .HasColumnName("Auto_G3_Voice_RSCP")
                   ;

                entity.Property(e => e.AutoG3VoiceRssi)
                    .HasColumnName("Auto_G3_Voice_RSSI")
                   ;

                entity.Property(e => e.AutoG3VoiceRxLev)
                    .HasColumnName("Auto_G3_Voice_RxLev")
                   ;

                entity.Property(e => e.AutoG3VoiceSystem)
                    .HasColumnName("Auto_G3_Voice_System")
                   ;

                entity.Property(e => e.AutoG3VoiceTxPwr)
                    .HasColumnName("Auto_G3_Voice_TxPwr")
                   ;

                entity.Property(e => e.AutoG3VoiceUarfcn)
                    .HasColumnName("Auto_G3_Voice_UARFCN")
                   ;

                entity.Property(e => e.AutoG4CellId)
                    .HasColumnName("Auto_G4_CellID")
                   ;

                entity.Property(e => e.AutoG4Dlbw)
                    .HasColumnName("Auto_G4_DLBW")
                   ;

                entity.Property(e => e.AutoG4Earfcn)
                    .HasColumnName("Auto_G4_EARFCN")
                   ;

                entity.Property(e => e.AutoG4FrqBand)
                    .HasColumnName("Auto_G4_FrqBand")
                    .HasMaxLength(20)
                   ;

                entity.Property(e => e.AutoG4Lac)
                    .HasColumnName("Auto_G4_LAC")
                   ;

                entity.Property(e => e.AutoG4Mcc)
                    .HasColumnName("Auto_G4_MCC")
                   ;

                entity.Property(e => e.AutoG4Mnc)
                    .HasColumnName("Auto_G4_MNC")
                   ;

                entity.Property(e => e.AutoG4PingPLost)
                    .HasColumnName("Auto_G4_Ping_pLost")
                   ;

                entity.Property(e => e.AutoG4PingPRec)
                    .HasColumnName("Auto_G4_Ping_pRec")
                   ;

                entity.Property(e => e.AutoG4PingPSent)
                    .HasColumnName("Auto_G4_Ping_pSent")
                   ;

                entity.Property(e => e.AutoG4PingRttAvg)
                    .HasColumnName("Auto_G4_Ping_rttAvg")
                   ;

                entity.Property(e => e.AutoG4PingRttMax)
                    .HasColumnName("Auto_G4_Ping_rttMax")
                   ;

                entity.Property(e => e.AutoG4PingRttMin)
                    .HasColumnName("Auto_G4_Ping_rttMin")
                   ;

                entity.Property(e => e.AutoG4Rsrp)
                    .HasColumnName("Auto_G4_RSRP")
                   ;

                entity.Property(e => e.AutoG4Rsrq)
                    .HasColumnName("Auto_G4_RSRQ")
                   ;

                entity.Property(e => e.AutoG4Rssi)
                    .HasColumnName("Auto_G4_RSSI")
                   ;

                entity.Property(e => e.AutoG4Rssnr)
                    .HasColumnName("Auto_G4_RSSNR")
                   ;

                entity.Property(e => e.AutoG4Sinr)
                    .HasColumnName("Auto_G4_SINR")
                   ;

                entity.Property(e => e.AutoG4System)
                    .HasColumnName("Auto_G4_System")
                   ;

                entity.Property(e => e.AutoG4Ulbw)
                    .HasColumnName("Auto_G4_ULBW")
                   ;

                entity.Property(e => e.BatteryVoltage);

                entity.Property(e => e.ChannelId)
                    .HasColumnName("ChannelID")
                   ;

                entity.Property(e => e.DeviceStatus);

                entity.Property(e => e.Direction);

                entity.Property(e => e.EventCode);

                entity.Property(e => e.ForceG2Call)
                    .HasColumnName("Force_G2_Call")
                    .HasMaxLength(28)
                   ;

                entity.Property(e => e.ForceG2IdleArfcn)
                    .HasColumnName("Force_G2_Idle_ARFCN")
                   ;

                entity.Property(e => e.ForceG2IdleBsic)
                    .HasColumnName("Force_G2_Idle_BSIC")
                   ;

                entity.Property(e => e.ForceG2IdleCellId)
                    .HasColumnName("Force_G2_Idle_CellID")
                   ;

                entity.Property(e => e.ForceG2IdleLac)
                    .HasColumnName("Force_G2_Idle_LAC")
                   ;

                entity.Property(e => e.ForceG2IdleMcc)
                    .HasColumnName("Force_G2_Idle_MCC")
                   ;

                entity.Property(e => e.ForceG2IdleMnc)
                    .HasColumnName("Force_G2_Idle_MNC")
                   ;

                entity.Property(e => e.ForceG2IdleRxLev)
                    .HasColumnName("Force_G2_Idle_RxLev")
                   ;

                entity.Property(e => e.ForceG2IdleSystem)
                    .HasColumnName("Force_G2_Idle_System")
                   ;

                entity.Property(e => e.ForceG2PingPLost)
                    .HasColumnName("Force_G2_Ping_pLost")
                   ;

                entity.Property(e => e.ForceG2PingPRec)
                    .HasColumnName("Force_G2_Ping_pRec")
                   ;

                entity.Property(e => e.ForceG2PingPSent)
                    .HasColumnName("Force_G2_Ping_pSent")
                   ;

                entity.Property(e => e.ForceG2PingRttAvg)
                    .HasColumnName("Force_G2_Ping_rttAvg")
                   ;

                entity.Property(e => e.ForceG2PingRttMax)
                    .HasColumnName("Force_G2_Ping_rttMax")
                   ;

                entity.Property(e => e.ForceG2PingRttMin)
                    .HasColumnName("Force_G2_Ping_rttMin")
                   ;

                entity.Property(e => e.ForceG2VoiceArfcn)
                    .HasColumnName("Force_G2_Voice_ARFCN")
                   ;

                entity.Property(e => e.ForceG2VoiceBsic)
                    .HasColumnName("Force_G2_Voice_BSIC")
                   ;

                entity.Property(e => e.ForceG2VoiceCellId)
                    .HasColumnName("Force_G2_Voice_CellID")
                   ;

                entity.Property(e => e.ForceG2VoiceLac)
                    .HasColumnName("Force_G2_Voice_LAC")
                   ;

                entity.Property(e => e.ForceG2VoiceMcc)
                    .HasColumnName("Force_G2_Voice_MCC")
                   ;

                entity.Property(e => e.ForceG2VoiceMnc)
                    .HasColumnName("Force_G2_Voice_MNC")
                   ;

                entity.Property(e => e.ForceG2VoiceRxLev)
                    .HasColumnName("Force_G2_Voice_RxLev")
                   ;

                entity.Property(e => e.ForceG2VoiceRxQual)
                    .HasColumnName("Force_G2_Voice_RxQual")
                   ;

                entity.Property(e => e.ForceG2VoiceSystem)
                    .HasColumnName("Force_G2_Voice_System")
                   ;

                entity.Property(e => e.ForceG2VoiceTa)
                    .HasColumnName("Force_G2_Voice_Ta")
                   ;

                entity.Property(e => e.ForceG2VoiceTxPwr)
                    .HasColumnName("Force_G2_Voice_TxPwr")
                   ;

                entity.Property(e => e.ForceG3Call)
                    .HasColumnName("Force_G3_Call")
                    .HasMaxLength(28)
                   ;

                entity.Property(e => e.ForceG3IdleEcio)
                    .HasColumnName("Force_G3_Idle_ECIO")
                   ;

                entity.Property(e => e.ForceG3IdleId)
                    .HasColumnName("Force_G3_Idle_ID")
                   ;

                entity.Property(e => e.ForceG3IdleLac)
                    .HasColumnName("Force_G3_Idle_LAC")
                   ;

                entity.Property(e => e.ForceG3IdleMcc)
                    .HasColumnName("Force_G3_Idle_MCC")
                   ;

                entity.Property(e => e.ForceG3IdleMnc)
                    .HasColumnName("Force_G3_Idle_MNC")
                   ;

                entity.Property(e => e.ForceG3IdlePsc)
                    .HasColumnName("Force_G3_Idle_PSC")
                   ;

                entity.Property(e => e.ForceG3IdleRfBand)
                    .HasColumnName("Force_G3_Idle_RfBand")
                    .HasMaxLength(20)
                   ;

                entity.Property(e => e.ForceG3IdleRscp)
                    .HasColumnName("Force_G3_Idle_RSCP")
                   ;

                entity.Property(e => e.ForceG3IdleRssi)
                    .HasColumnName("Force_G3_Idle_RSSI")
                   ;

                entity.Property(e => e.ForceG3IdleRxLev)
                    .HasColumnName("Force_G3_Idle_RxLev")
                   ;

                entity.Property(e => e.ForceG3IdleSystem)
                    .HasColumnName("Force_G3_Idle_System")
                   ;

                entity.Property(e => e.ForceG3IdleUarfcn)
                    .HasColumnName("Force_G3_Idle_UARFCN")
                   ;

                entity.Property(e => e.ForceG3PingPLost)
                    .HasColumnName("Force_G3_Ping_pLost")
                   ;

                entity.Property(e => e.ForceG3PingPRec)
                    .HasColumnName("Force_G3_Ping_pRec")
                   ;

                entity.Property(e => e.ForceG3PingPSent)
                    .HasColumnName("Force_G3_Ping_pSent")
                   ;

                entity.Property(e => e.ForceG3PingRttAvg)
                    .HasColumnName("Force_G3_Ping_rttAvg")
                   ;

                entity.Property(e => e.ForceG3PingRttMax)
                    .HasColumnName("Force_G3_Ping_rttMax")
                   ;

                entity.Property(e => e.ForceG3PingRttMin)
                    .HasColumnName("Force_G3_Ping_rttMin")
                   ;

                entity.Property(e => e.ForceG3VoiceBer)
                    .HasColumnName("Force_G3_Voice_BER")
                   ;

                entity.Property(e => e.ForceG3VoiceEcio)
                    .HasColumnName("Force_G3_Voice_ECIO")
                   ;

                entity.Property(e => e.ForceG3VoiceId)
                    .HasColumnName("Force_G3_Voice_ID")
                   ;

                entity.Property(e => e.ForceG3VoiceLac)
                    .HasColumnName("Force_G3_Voice_LAC")
                   ;

                entity.Property(e => e.ForceG3VoiceMcc)
                    .HasColumnName("Force_G3_Voice_MCC")
                   ;

                entity.Property(e => e.ForceG3VoiceMnc)
                    .HasColumnName("Force_G3_Voice_MNC")
                   ;

                entity.Property(e => e.ForceG3VoicePsc)
                    .HasColumnName("Force_G3_Voice_PSC")
                   ;

                entity.Property(e => e.ForceG3VoiceRfBand)
                    .HasColumnName("Force_G3_Voice_RfBand")
                    .HasMaxLength(20)
                   ;

                entity.Property(e => e.ForceG3VoiceRscp)
                    .HasColumnName("Force_G3_Voice_RSCP")
                   ;

                entity.Property(e => e.ForceG3VoiceRssi)
                    .HasColumnName("Force_G3_Voice_RSSI")
                   ;

                entity.Property(e => e.ForceG3VoiceRxLev)
                    .HasColumnName("Force_G3_Voice_RxLev")
                   ;

                entity.Property(e => e.ForceG3VoiceSystem)
                    .HasColumnName("Force_G3_Voice_System")
                   ;

                entity.Property(e => e.ForceG3VoiceTxPwr)
                    .HasColumnName("Force_G3_Voice_TxPwr")
                   ;

                entity.Property(e => e.ForceG3VoiceUarfcn)
                    .HasColumnName("Force_G3_Voice_UARFCN")
                   ;

                entity.Property(e => e.ForceG4CellId)
                    .HasColumnName("Force_G4_CellID")
                   ;

                entity.Property(e => e.ForceG4Dlbw)
                    .HasColumnName("Force_G4_DLBW")
                   ;

                entity.Property(e => e.ForceG4Earfcn)
                    .HasColumnName("Force_G4_EARFCN")
                   ;

                entity.Property(e => e.ForceG4FrqBand)
                    .HasColumnName("Force_G4_FrqBand")
                    .HasMaxLength(20)
                   ;

                entity.Property(e => e.ForceG4Lac)
                    .HasColumnName("Force_G4_LAC")
                   ;

                entity.Property(e => e.ForceG4Mcc)
                    .HasColumnName("Force_G4_MCC")
                   ;

                entity.Property(e => e.ForceG4Mnc)
                    .HasColumnName("Force_G4_MNC")
                   ;

                entity.Property(e => e.ForceG4PingPLost)
                    .HasColumnName("Force_G4_Ping_pLost")
                   ;

                entity.Property(e => e.ForceG4PingPRec)
                    .HasColumnName("Force_G4_Ping_pRec")
                   ;

                entity.Property(e => e.ForceG4PingPSent)
                    .HasColumnName("Force_G4_Ping_pSent")
                   ;

                entity.Property(e => e.ForceG4PingRttAvg)
                    .HasColumnName("Force_G4_Ping_rttAvg")
                   ;

                entity.Property(e => e.ForceG4PingRttMax)
                    .HasColumnName("Force_G4_Ping_rttMax")
                   ;

                entity.Property(e => e.ForceG4PingRttMin)
                    .HasColumnName("Force_G4_Ping_rttMin")
                   ;

                entity.Property(e => e.ForceG4Rsrp)
                    .HasColumnName("Force_G4_RSRP")
                   ;

                entity.Property(e => e.ForceG4Rsrq)
                    .HasColumnName("Force_G4_RSRQ")
                   ;

                entity.Property(e => e.ForceG4Rssi)
                    .HasColumnName("Force_G4_RSSI")
                   ;

                entity.Property(e => e.ForceG4Rssnr)
                    .HasColumnName("Force_G4_RSSNR")
                   ;

                entity.Property(e => e.ForceG4Sinr)
                    .HasColumnName("Force_G4_SINR")
                   ;

                entity.Property(e => e.ForceG4System)
                    .HasColumnName("Force_G4_System")
                   ;

                entity.Property(e => e.ForceG4Ulbw)
                    .HasColumnName("Force_G4_ULBW")
                   ;

                entity.Property(e => e.Gpsdop)
                    .HasColumnName("GPSDop")
                   ;

                entity.Property(e => e.Gpsdt)
                    .HasColumnName("GPSDT")
                    .HasColumnType("datetime")
                   ;

                entity.Property(e => e.Gpsvalidity)
                    .HasColumnName("GPSValidity")
                   ;

                entity.Property(e => e.InputVoltage);

                entity.Property(e => e.Lat);

                entity.Property(e => e.Lon);

                entity.Property(e => e.MachineId)
                    .HasColumnName("MachineID")
                   ;

                entity.Property(e => e.NoOfSats);

                entity.Property(e => e.Op);

                entity.Property(e => e.PingDomain)
                    .HasColumnName("Ping_Domain")
                    .HasMaxLength(50)
                   ;

                entity.Property(e => e.PingIp)
                    .HasColumnName("Ping_Ip")
                    .HasMaxLength(4)
                   ;

                entity.Property(e => e.PingIpType)
                    .HasColumnName("Ping_IpType")
                   ;

                entity.Property(e => e.RecvDt)
                    .HasColumnName("RecvDT")
                    .HasColumnType("datetime")
                   ;

                entity.Property(e => e.Speed);
            });

            modelBuilder.Entity<Iptype>(entity =>
            {
                entity.ToTable("IPType");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<LogFilePartitionType>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<Machine>(entity =>
            {


                entity.Property(e => e.Id);

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Identifier)
                    .HasMaxLength(50)
                    .HasDefaultValueSql("(N'')")
                ;

                entity.Property(e => e.Imei1)
                    .HasColumnName("IMEI1")
                    .HasMaxLength(255);

                entity.Property(e => e.Imei2)
                    .HasColumnName("IMEI2")
                    .HasMaxLength(255);

                entity.Property(e => e.InstallLocation)
                    .HasMaxLength(200)
                    .HasDefaultValueSql("(N'')");

                entity.Property(e => e.IsRead).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasDefaultValueSql("(N'')")
                   ;

                entity.Property(e => e.SerialNo).HasMaxLength(30);

                entity.Property(e => e.SimcardNo)
                    .HasMaxLength(30)
                    .HasDefaultValueSql("(N'')")
                    ;

                entity.Property(e => e.Version)
                    .HasMaxLength(100)
                   ;

                entity.HasOne(d => d.MachineGroup)
                    .WithMany(p => p.Machine)
                    .HasForeignKey(d => d.MachineGroupId)
                    .HasConstraintName("fk_MachineGroupId_Id");

                entity.HasOne(d => d.MachineType)
                    .WithMany(p => p.Machine)
                    .HasForeignKey(d => d.MachineTypeId)
                    .HasConstraintName("FK_ProbeMachine_MachineType");
            });

            modelBuilder.Entity<MachineConnectionHistory>(entity =>
            {
                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DateFromDevice).HasColumnType("datetime");
            });

            modelBuilder.Entity<MachineGroup>(entity =>
            {

                entity.Property(e => e.Id);

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(128)
                   ;

                entity.HasOne(d => d.Parrent)
                    .WithMany(p => p.InverseParrent)
                    .HasForeignKey(d => d.ParrentId)
                    .HasConstraintName("FK_ParrentId_Id");
            });

            modelBuilder.Entity<MachineLocations>(entity =>
            {
                entity.Property(x => x.Id).ValueGeneratedNever();
                entity.Property(x => x.CreatedDate).HasColumnType("DateTime").HasDefaultValueSql("getDate()");

                entity.HasOne(x => x.Machine).
                   WithMany(p => p.MachineLocations).
                   OnDelete(DeleteBehavior.ClientCascade).
                   HasConstraintName("FK_MachineLocations_Machine");
            });

            modelBuilder.Entity<MachineUssd>(entity =>
            {
                entity.Property(x => x.Operator).HasColumnName("operator");

                entity.Property(x => x.CreatedDate).
                    HasColumnType("DateTime").
                    HasDefaultValueSql("getDate()");

                entity.Property(x => x.DateFromDevice).HasColumnType("DateTime");

                entity.Property(x => x.Iccid).
                     HasMaxLength(200).
                     IsUnicode(false);

                entity.Property(x => x.msg).
                       HasMaxLength(10)
                       .IsUnicode(false);

                entity.Property(x => x.SimBody).HasMaxLength(300);

                entity.Property(x => x.Imei1).
                    HasMaxLength(100).IsUnicode(false);

                entity.Property(x => x.Imei2).
                    HasMaxLength(100).IsUnicode(false);
            });

            modelBuilder.Entity<MachineType>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<MachineVersion>(entity =>
            {
                entity.Property(e => e.CompleteDate).HasColumnType("datetime");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedBy);

                entity.Property(e => e.FileDownloadAddress).HasMaxLength(500);

                entity.Property(e => e.Imei1)
                    .HasColumnName("IMEI1")
                    .HasMaxLength(255);

                entity.Property(e => e.SendToDevice);

                entity.HasOne(d => d.Machine)
                    .WithMany(p => p.MachineVersion)
                    .HasForeignKey(d => d.MachineId)
                    .HasConstraintName("FK_MachineVersion_Machine1");

                entity.HasOne(d => d.MachineVersionGroup)
                    .WithMany(p => p.MachineVersion)
                    .HasForeignKey(d => d.MachineVersionGroupId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_MachineVersion_MachineVersionGroup");
            });

            modelBuilder.Entity<MachineVersionDetail>(entity =>
            {
                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.Reciever).HasMaxLength(50);

                entity.Property(e => e.Sender).HasMaxLength(50);

                entity.Property(e => e.State).HasMaxLength(50);

                entity.HasOne(d => d.Version)
                    .WithMany(p => p.MachineVersionDetail)
                    .HasForeignKey(d => d.VersionId)
                    .HasConstraintName("FK_MachineVersionDetail_MachineVersion");
            });

            modelBuilder.Entity<MachineVersionGroup>(entity =>
            {
                entity.Property(e => e.CompleteDate).HasColumnType("datetime");

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.FileDownloadAddress).HasMaxLength(250);

                entity.Property(e => e.MachineGroupTitle).HasMaxLength(100);

                entity.HasOne(d => d.MachineGroup)
                    .WithMany(p => p.MachineVersionGroup)
                    .HasForeignKey(d => d.MachineGroupId)
                    .HasConstraintName("FK_MachineVersionGroup_MachineGroup");
            });

            modelBuilder.Entity<MapProvider>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.IsCustom);

                entity.Property(e => e.IsTransparent);

                entity.Property(e => e.PreparationMode);

                entity.Property(e => e.ProviderName)
                    .IsRequired()
                   ;
            });

            modelBuilder.Entity<MinSpeed>(entity =>
            {
                entity.Property(e => e.CreateTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<ModificationReport>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.InsertDt)
                    .HasColumnName("InsertDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.ObjectId)
                    .HasColumnName("ObjectID");


                entity.Property(e => e.ProcessedDt)
                    .HasColumnName("ProcessedDT")
                    .HasColumnType("datetime");

                entity.Property(e => e.TableId)
                    .HasColumnName("TableID");

            });

            modelBuilder.Entity<Network>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<NetworkTestResultFild>(entity =>
            {
                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NetworkId).HasColumnName("NetworkID");

                entity.Property(e => e.TestFild)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Network)
                    .WithMany(p => p.NetworkTestResultFild)
                    .HasForeignKey(d => d.NetworkId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_NetworkTestResultFild_Network");
            });

            modelBuilder.Entity<Operator>(entity =>
            {
                entity.Property(e => e.Fname)
                    .HasColumnName("FName")
                    .HasMaxLength(100);

                entity.Property(e => e.Lname)
                    .HasColumnName("LName")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Ottservice>(entity =>
            {
                entity.ToTable("OTTService");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<OttserviceTest>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("OTTServiceTest");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<RepeatTimetype>(entity =>
            {
                entity.Property(e => e.Title).HasMaxLength(100);
            });

            modelBuilder.Entity<RepeatType>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<SignalStrength2G>(entity =>
            {
                entity.HasIndex(e => e.OperatorId)
                    .HasName("IX_OperatorID");

                entity.HasIndex(e => new { e.Val, e.OperatorId, e.Lat, e.Lon })
                    .HasName("IX_OperatorId_Lat_Lon_Val");

                entity.Property(e => e.Epath)
                    .HasColumnName("EPath")
                    .HasMaxLength(1500);

                entity.Property(e => e.Operator).HasMaxLength(50);

                entity.Property(e => e.OperatorId).HasColumnName("OperatorID");

                entity.Property(e => e.SheetName).HasMaxLength(200);
            });

            modelBuilder.Entity<SignalStrength3G>(entity =>
            {
                entity.HasIndex(e => e.OperatorId)
                    .HasName("IX_OperatorID");

                entity.HasIndex(e => new { e.Val, e.Lat, e.Lon })
                    .HasName("NonClusteredIndex-20190918-094819");

                entity.Property(e => e.Epath)
                    .HasColumnName("EPath")
                    .HasMaxLength(1000);

                entity.Property(e => e.OperatorId).HasColumnName("OperatorID");

                entity.Property(e => e.SheetName).HasMaxLength(100);
            });

            modelBuilder.Entity<SyncDetail>(entity =>
            {
                entity.Property(e => e.Command)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CreateDate).HasColumnType("datetime");

                entity.Property(e => e.PsyncId).HasColumnName("PSyncId");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Psync)
                    .WithMany(p => p.SyncDetail)
                    .HasForeignKey(d => d.PsyncId)
                    .HasConstraintName("FK_SyncDetail_SyncMaster");
            });

            modelBuilder.Entity<SyncMaster>(entity =>
            {
                entity.Property(e => e.CreateDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DisconnectedDate).HasColumnType("datetime");

                entity.Property(e => e.Imei1)
                    .HasColumnName("IMEI1")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Status);
            });
            modelBuilder.Entity<TestData>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<TestDataType>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(254);
            });

            modelBuilder.Entity<TestResult>(entity =>
            {
                entity.HasIndex(e => e.BeginDateTest)
                    .HasName("IX_BeginDateTest");

                entity.HasIndex(e => e.DefinedTestId)
                    .HasName("IX_DefinedTestId");

                entity.HasIndex(e => e.EndDateTest)
                    .HasName("IX_EndDateTest");

                entity.HasIndex(e => e.MachineId)
                    .HasName("IX_MachineId");

                entity.HasIndex(e => e.SelectedSim)
                    .HasName("IX_SelectedSim");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Arfcn).HasColumnName("ARFCN");

                entity.Property(e => e.AvrgSpeed);

                entity.Property(e => e.BeginDateTest)
                    .HasColumnType("datetime");

                entity.Property(e => e.Ber).HasColumnName("BER");

                entity.Property(e => e.Bsic).HasColumnName("BSIC");

                entity.Property(e => e.Cid).HasColumnName("CID");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DefinedTestName)
                    .HasMaxLength(254);


                entity.Property(e => e.Dlbw).HasColumnName("DLBW");

                entity.Property(e => e.Earfcn).HasColumnName("EARFCN");

                entity.Property(e => e.Ecio).HasColumnName("ECIO");

                entity.Property(e => e.ElapsedTime);

                entity.Property(e => e.EndDateTest)
                    .HasColumnType("datetime")
                    ;

                entity.Property(e => e.FileName)
                    .HasMaxLength(100)
                    ;

                entity.Property(e => e.FileSize);

                entity.Property(e => e.FregBand).HasMaxLength(100);

                entity.Property(e => e.Hop1)
                    .HasColumnName("hop1")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop10)
                    .HasColumnName("hop10")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop10Rtt).HasColumnName("hop10_rtt");

                entity.Property(e => e.Hop1Rtt).HasColumnName("hop1_rtt");

                entity.Property(e => e.Hop2)
                    .HasColumnName("hop2")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop2Rtt).HasColumnName("hop2_rtt");

                entity.Property(e => e.Hop3)
                    .HasColumnName("hop3")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop3Rtt).HasColumnName("hop3_rtt");

                entity.Property(e => e.Hop4)
                    .HasColumnName("hop4")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop4Rtt).HasColumnName("hop4_rtt");

                entity.Property(e => e.Hop5)
                    .HasColumnName("hop5")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop5Rtt).HasColumnName("hop5_rtt");

                entity.Property(e => e.Hop6)
                    .HasColumnName("hop6")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop6Rtt).HasColumnName("hop6_rtt");

                entity.Property(e => e.Hop7)
                    .HasColumnName("hop7")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop7Rtt).HasColumnName("hop7_rtt");

                entity.Property(e => e.Hop8)
                    .HasColumnName("hop8")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop8Rtt).HasColumnName("hop8_rtt");

                entity.Property(e => e.Hop9)
                    .HasColumnName("hop9")
                    .HasMaxLength(15);

                entity.Property(e => e.Hop9Rtt).HasColumnName("hop9_rtt");

                entity.Property(e => e.Lac).HasColumnName("LAC");

                entity.Property(e => e.MachineName)
                    .HasMaxLength(100);

                entity.Property(e => e.Mcc).HasColumnName("MCC");

                entity.Property(e => e.Mnc).HasColumnName("MNC");

                entity.Property(e => e.Operator).HasMaxLength(25);

                entity.Property(e => e.Ovfsf).HasColumnName("OVFSF");

                entity.Property(e => e.Pci).HasColumnName("PCI");

                entity.Property(e => e.Pid).HasColumnName("PID");

                entity.Property(e => e.Psc).HasColumnName("PSC");

                entity.Property(e => e.RegisterDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");


                entity.Property(e => e.Rscp).HasColumnName("RSCP");

                entity.Property(e => e.Rsrp).HasColumnName("RSRP");

                entity.Property(e => e.Rsrq).HasColumnName("RSRQ");

                entity.Property(e => e.Rssi).HasColumnName("RSSI");

                entity.Property(e => e.Rssnr).HasColumnName("RSSNR");

                entity.Property(e => e.Rxlevel).HasColumnName("RXLevel");

                entity.Property(e => e.Rxqual).HasColumnName("RXQual");

                entity.Property(e => e.SelectedSim);

                entity.Property(e => e.Speed);
                entity.Property(e => e.Ssc).HasColumnName("SSC");

                entity.Property(e => e.Ta).HasColumnName("TA");

                entity.Property(e => e.Tac).HasColumnName("TAC");

                entity.Property(e => e.Txpower).HasColumnName("TXPower");

                entity.Property(e => e.Uarfcn).HasColumnName("UARFCN");

                entity.Property(e => e.Ulbw).HasColumnName("ULBW");
            });

            modelBuilder.Entity<TestType>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);
            });

         

            modelBuilder.Entity<ZoneKml>(entity =>
            {
                entity.Property(e => e.KmlFile)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.HasOne(d => d.Zone)
                    .WithMany(p => p.ZoneKml)
                    .HasForeignKey(d => d.ZoneId)
                    .HasConstraintName("FK_ZoneKml_Zones");
            });

            modelBuilder.Entity<ZonePoint>(entity =>
            {
                entity.HasIndex(e => e.ZoneId)
                    .HasName("IX_ZonePoint");

                entity.HasOne(d => d.Zone)
                    .WithMany(p => p.ZonePoint)
                    .HasForeignKey(d => d.ZoneId)
                    .HasConstraintName("FK_ZonePoint_Zones");
            });

            modelBuilder.Entity<Zones>(entity =>
            {
                entity.HasKey(e => e.ZoneId)
                    .HasName("PK_Zones_1");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Type).HasMaxLength(10);
            });
        }
        #region uow-Implementation
        public void AddRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            base.Set<TEntity>().AddRange(entities);
        }

        public void BeginTransaction()
        {
            _transaction = Database.BeginTransaction();
        }

        public void RollbackTransaction()
        {
            if (_transaction == null)
            {
                throw new NullReferenceException("Please call `BeginTransaction()` method first.");
            }
            _transaction.Rollback();
        }

        public void CommitTransaction()
        {
            if (_transaction == null)
            {
                throw new NullReferenceException("Please call `BeginTransaction()` method first.");
            }
            _transaction.Commit();
        }

        public override void Dispose()
        {
            _transaction?.Dispose();
            base.Dispose();
        }

        public void ExecuteSqlInterpolatedCommand(FormattableString query)
        {
            Database.ExecuteSqlInterpolated(query);
        }

        public void ExecuteSqlRawCommand(string query, params object[] parameters)
        {
            Database.ExecuteSqlRaw(query, parameters);
        }

        public T GetShadowPropertyValue<T>(object entity, string propertyName) where T : IConvertible
        {
            var value = this.Entry(entity).Property(propertyName).CurrentValue;
            return value != null
                ? (T)Convert.ChangeType(value, typeof(T), CultureInfo.InvariantCulture)
                : default;
        }

        public object GetShadowPropertyValue(object entity, string propertyName)
        {
            return this.Entry(entity).Property(propertyName).CurrentValue;
        }

        public void MarkAsChanged<TEntity>(TEntity entity) where TEntity : class
        {
            Update(entity);
        }

        public void RemoveRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            Set<TEntity>().RemoveRange(entities);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            ChangeTracker.DetectChanges();

            beforeSaveTriggers();

            ChangeTracker.AutoDetectChangesEnabled = false; // for performance reasons, to avoid calling DetectChanges() again.
            var result = base.SaveChanges(acceptAllChangesOnSuccess);
            ChangeTracker.AutoDetectChangesEnabled = true;
            return result;
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges(); //NOTE: changeTracker.Entries<T>() will call it automatically.

            beforeSaveTriggers();

            ChangeTracker.AutoDetectChangesEnabled = false; // for performance reasons, to avoid calling DetectChanges() again.
            var result = base.SaveChanges();
            ChangeTracker.AutoDetectChangesEnabled = true;
            return result;
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            ChangeTracker.DetectChanges();

            beforeSaveTriggers();

            ChangeTracker.AutoDetectChangesEnabled = false; // for performance reasons, to avoid calling DetectChanges() again.
            var result = base.SaveChangesAsync(cancellationToken);
            ChangeTracker.AutoDetectChangesEnabled = true;
            return result;
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
        {
            ChangeTracker.DetectChanges();

            beforeSaveTriggers();

            ChangeTracker.AutoDetectChangesEnabled = false; // for performance reasons, to avoid calling DetectChanges() again.
            var result = base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            ChangeTracker.AutoDetectChangesEnabled = true;
            return result;
        }

        private void beforeSaveTriggers()
        {
            validateEntities();
            setShadowProperties();
        }

        private void setShadowProperties()
        {
            // we can't use constructor injection anymore, because we are using the `AddDbContextPool<>`
            var props = this.GetService<IHttpContextAccessor>()?.GetShadowProperties();
            ChangeTracker.SetAuditableEntityPropertyValues(props);
        }

        private void validateEntities()
        {
            var errors = this.GetValidationErrors();
            if (!string.IsNullOrWhiteSpace(errors))
            {
                // we can't use constructor injection anymore, because we are using the `AddDbContextPool<>`
                var loggerFactory = this.GetService<ILoggerFactory>();
                var logger = loggerFactory.CreateLogger<ActiveProbeCoreContext>();
                logger.LogError(errors);
                throw new InvalidOperationException(errors);
            }
        }
        #endregion
    }
}
