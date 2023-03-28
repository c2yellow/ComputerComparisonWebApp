namespace ComputerComparisonBackend.Models
{
    public class FullComparison
    {
        public GraphicsCard GraphicsCard { get; set; }
        public CloudCompute CheapestCloudCompute { get; set; }
        public int BreakEvenPoint { get; set; }
        public int CostOfRig { get; set; }
        public int CostOfElectricity { get; set; }
    }
}