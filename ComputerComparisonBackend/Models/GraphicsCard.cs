namespace ComputerComparisonBackend.Models
{

    public class GraphicsCard
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Vram { get; set; }
        public int PowerDraw { get; set; }
        public int TrainingThroughput { get; set; }
        public int Msrp { get; set; }
    }
}