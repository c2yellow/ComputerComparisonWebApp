namespace ComputerComparisonBackend.Models
{
    public class CloudCompute
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal CostPerHour { get; set; }
        public int TrainingThroughput { get; set; }
    }
}