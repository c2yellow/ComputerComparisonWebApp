using Microsoft.EntityFrameworkCore;

namespace ComputerComparisonBackend.Models
{
    public class GraphicsCardContext : DbContext
    {
        public GraphicsCardContext(DbContextOptions<GraphicsCardContext> options) : base(options) { }

        public DbSet<GraphicsCard> GraphicsCards { get; set; }
        public DbSet<CloudCompute> CloudComputes { get; set; }
    }
}