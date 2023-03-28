using Microsoft.EntityFrameworkCore.Migrations;

namespace ComputerComparisonBackend.Migrations
{
    public partial class AddDummyEntries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert three dummy entries into GraphicsCards table
            migrationBuilder.InsertData(
                table: "GraphicsCards",
                columns: new[] { "Id", "Name", "Vram", "PowerDraw", "TrainingThroughput", "Msrp" },
                values: new object[,]
                {
                    { 4, "GeForce RTX 3080 Ti", 12, 350, 80, 1199 },
                    { 5, "Radeon RX 6800 XT", 16, 300, 65, 649 },
                    { 6, "GeForce GTX 1650 Super", 4, 100, 15, 159 }
                });

            // Insert three dummy entries into CloudComputes table
            migrationBuilder.InsertData(
                table: "CloudComputes",
                columns: new[] { "Id", "Name", "CostPerHour", "TrainingThroughput" },
                values: new object[,]
                {
                    { 1, "Amazon Web Services (AWS)", 0.45m, 95 },
                    { 2, "Google Cloud Platform (GCP)", 0.50m, 85 },
                    { 3, "Microsoft Azure", 0.40m, 90 },
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Delete the dummy entries from GraphicsCards table
            migrationBuilder.DeleteData(
                table: "GraphicsCards",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "GraphicsCards",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "GraphicsCards",
                keyColumn: "Id",
                keyValue: 6);

            // Delete the dummy entries from CloudComputes table
            migrationBuilder.DeleteData(
                table: "CloudComputes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CloudComputes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CloudComputes",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}