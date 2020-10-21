using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ActiveProbe.DataLayer.Migrations
{
    public partial class _990228notificationAndRemoveSqlCache : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Activation = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    MessageContent = table.Column<string>(nullable: true),
                    NotificationType = table.Column<int>(nullable: false),
                    SendStartTime = table.Column<TimeSpan>(nullable: false),
                    SendEndTime = table.Column<TimeSpan>(nullable: false),
                    Mobile = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    MaxSend = table.Column<int>(nullable: false),
                    TimeIntervalToNextSend = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationParameter",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NotificationId = table.Column<int>(nullable: false),
                    OperatorTypeId = table.Column<int>(nullable: false),
                    NetworkTypeId = table.Column<int>(nullable: false),
                    MachineId = table.Column<int>(nullable: false),
                    GroupId = table.Column<int>(nullable: false),
                    ZoneId = table.Column<int>(nullable: false),
                    ParameterTypeId = table.Column<int>(nullable: false),
                    FunctionTypeId = table.Column<int>(nullable: false),
                    SearchStartDate = table.Column<DateTime>(nullable: false),
                    SearchEndDate = table.Column<DateTime>(nullable: false),
                    LogicalSymbolTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationParameter", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotificationParameter_Notification_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SendedNotification",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NotifId = table.Column<int>(nullable: false),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    SendDate = table.Column<DateTime>(nullable: true),
                    Mobile = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    NotificationId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SendedNotification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SendedNotification_Notification_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notification",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NotificationFilter",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NotificationParameterId = table.Column<int>(nullable: false),
                    LogicalSymbolTypeId = table.Column<int>(nullable: false),
                    ConditionalValueTypeId = table.Column<int>(nullable: false),
                    FilterlogicalSymbol = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationFilter", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotificationFilter_NotificationParameter_NotificationParameterId",
                        column: x => x.NotificationParameterId,
                        principalTable: "NotificationParameter",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NotificationFilter_NotificationParameterId",
                table: "NotificationFilter",
                column: "NotificationParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationParameter_NotificationId",
                table: "NotificationParameter",
                column: "NotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_SendedNotification_NotificationId",
                table: "SendedNotification",
                column: "NotificationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotificationFilter");

            migrationBuilder.DropTable(
                name: "SendedNotification");

            migrationBuilder.DropTable(
                name: "NotificationParameter");

            migrationBuilder.DropTable(
                name: "Notification");
        }
    }
}
