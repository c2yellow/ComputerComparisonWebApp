using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComputerComparisonBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CloudComputes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CostPerHour = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TrainingThroughput = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CloudComputes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GraphicsCards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vram = table.Column<int>(type: "int", nullable: false),
                    PowerDraw = table.Column<int>(type: "int", nullable: false),
                    TrainingThroughput = table.Column<int>(type: "int", nullable: false),
                    Msrp = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GraphicsCards", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CloudComputes");

            migrationBuilder.DropTable(
                name: "GraphicsCards");
        }
    }
}
