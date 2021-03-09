using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GDF_HRMS_v1.Migrations
{
    public partial class NewDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactInfos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HNumber = table.Column<int>(type: "int", nullable: false),
                    CNumber = table.Column<int>(type: "int", nullable: false),
                    WNumber = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactInfos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ethnicities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ethnicities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaritalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaritalStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Nationalities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nationalities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Regions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Religions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Religions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Village = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Reg = table.Column<int>(type: "int", nullable: false),
                    Ctry = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Countries_Ctry",
                        column: x => x.Ctry,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Addresses_Regions_Reg",
                        column: x => x.Reg,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeePIs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NId = table.Column<int>(type: "int", nullable: false),
                    RId = table.Column<int>(type: "int", nullable: true),
                    EId = table.Column<int>(type: "int", nullable: true),
                    MId = table.Column<int>(type: "int", nullable: true),
                    PId = table.Column<int>(type: "int", nullable: true),
                    CId = table.Column<int>(type: "int", nullable: true),
                    CountryId = table.Column<int>(type: "int", nullable: true),
                    AId = table.Column<int>(type: "int", nullable: true),
                    DId = table.Column<int>(type: "int", nullable: true),
                    CHId = table.Column<int>(type: "int", nullable: true),
                    RegId = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Oname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RNumber = table.Column<int>(type: "int", nullable: false),
                    Dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sex = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NidNumber = table.Column<int>(type: "int", nullable: false),
                    PNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TinNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePIs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_Addresses_AId",
                        column: x => x.AId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_ContactInfos_CId",
                        column: x => x.CId,
                        principalTable: "ContactInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_Ethnicities_EId",
                        column: x => x.EId,
                        principalTable: "Ethnicities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_MaritalStatuses_MId",
                        column: x => x.MId,
                        principalTable: "MaritalStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_Nationalities_NId",
                        column: x => x.NId,
                        principalTable: "Nationalities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_Positions_PId",
                        column: x => x.PId,
                        principalTable: "Positions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_Regions_RegId",
                        column: x => x.RegId,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeePIs_Religions_RId",
                        column: x => x.RId,
                        principalTable: "Religions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CareerHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmployeePIId = table.Column<int>(type: "int", nullable: true),
                    PositionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CareerHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CareerHistories_EmployeePIs_EmployeePIId",
                        column: x => x.EmployeePIId,
                        principalTable: "EmployeePIs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CareerHistories_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeePIId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departments_EmployeePIs_EmployeePIId",
                        column: x => x.EmployeePIId,
                        principalTable: "EmployeePIs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_Ctry",
                table: "Addresses",
                column: "Ctry");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_Reg",
                table: "Addresses",
                column: "Reg");

            migrationBuilder.CreateIndex(
                name: "IX_CareerHistories_EmployeePIId",
                table: "CareerHistories",
                column: "EmployeePIId");

            migrationBuilder.CreateIndex(
                name: "IX_CareerHistories_PositionId",
                table: "CareerHistories",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_EmployeePIId",
                table: "Departments",
                column: "EmployeePIId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_AId",
                table: "EmployeePIs",
                column: "AId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_CHId",
                table: "EmployeePIs",
                column: "CHId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_CId",
                table: "EmployeePIs",
                column: "CId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_CountryId",
                table: "EmployeePIs",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_DId",
                table: "EmployeePIs",
                column: "DId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_EId",
                table: "EmployeePIs",
                column: "EId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_MId",
                table: "EmployeePIs",
                column: "MId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_NId",
                table: "EmployeePIs",
                column: "NId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_PId",
                table: "EmployeePIs",
                column: "PId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_RegId",
                table: "EmployeePIs",
                column: "RegId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePIs_RId",
                table: "EmployeePIs",
                column: "RId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePIs_CareerHistories_CHId",
                table: "EmployeePIs",
                column: "CHId",
                principalTable: "CareerHistories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePIs_Departments_DId",
                table: "EmployeePIs",
                column: "DId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Countries_Ctry",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePIs_Countries_CountryId",
                table: "EmployeePIs");

            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Regions_Reg",
                table: "Addresses");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePIs_Regions_RegId",
                table: "EmployeePIs");

            migrationBuilder.DropForeignKey(
                name: "FK_CareerHistories_EmployeePIs_EmployeePIId",
                table: "CareerHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_Departments_EmployeePIs_EmployeePIId",
                table: "Departments");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Regions");

            migrationBuilder.DropTable(
                name: "EmployeePIs");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "CareerHistories");

            migrationBuilder.DropTable(
                name: "ContactInfos");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Ethnicities");

            migrationBuilder.DropTable(
                name: "MaritalStatuses");

            migrationBuilder.DropTable(
                name: "Nationalities");

            migrationBuilder.DropTable(
                name: "Religions");

            migrationBuilder.DropTable(
                name: "Positions");
        }
    }
}
