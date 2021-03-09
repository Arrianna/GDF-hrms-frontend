using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GDFHRMS.Migrations
{
    public partial class AddedTwoTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employee_Address",
                columns: table => new
                {
                    Address_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Employee_Id = table.Column<int>(type: "int", nullable: false),
                    Address_lot = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address_street = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address_area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address_townVillage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address_region = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address_country = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee_Address", x => x.Address_Id);
                });

            migrationBuilder.CreateTable(
                name: "Employee_Personal_Information",
                columns: table => new
                {
                    Employee_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Employee_nationality_id = table.Column<int>(type: "int", nullable: false),
                    Religion_id = table.Column<int>(type: "int", nullable: false),
                    Ethnicity_id = table.Column<int>(type: "int", nullable: false),
                    MaritalStatus_id = table.Column<int>(type: "int", nullable: false),
                    Employee_regimentNumber = table.Column<int>(type: "int", nullable: false),
                    Employee_nationalIdNumber = table.Column<int>(type: "int", nullable: false),
                    Employee_tinNumber = table.Column<int>(type: "int", nullable: false),
                    Employee_contractNumber = table.Column<int>(type: "int", nullable: false),
                    Employee_title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employee_firstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employee_lastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employee_otherName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employee_sex = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employee_passportNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employee_dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Employee_passportExpirationNumber = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee_Personal_Information", x => x.Employee_id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employee_Address");

            migrationBuilder.DropTable(
                name: "Employee_Personal_Information");
        }
    }
}
