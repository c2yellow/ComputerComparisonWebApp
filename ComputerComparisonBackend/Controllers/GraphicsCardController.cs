using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComputerComparisonBackend.Models;

namespace ComputerComparisonBackend.Controllers
{

    [Route("api")]
    [ApiController]
    public class GraphicsCardsController : ControllerBase
    {
        private readonly GraphicsCardContext _context;

        public GraphicsCardsController(GraphicsCardContext context)
        {
            _context = context;
        }

        // GET: api/graphics-cards
        [HttpGet("graphics-cards")]
        public async Task<ActionResult<IEnumerable<GraphicsCardListItem>>> GetGraphicsCards()
        {
            return await _context.GraphicsCards
                .Select(g => new GraphicsCardListItem { Id = g.Id, Name = g.Name })
                .ToListAsync();
        }

        // GET: api/comparison/{graphicsCardId}
        [HttpGet("comparison/{graphicsCardId}")]
        public async Task<ActionResult<FullComparison>> GetFullComparison(int graphicsCardId)
        {
            var graphicsCard = await _context.GraphicsCards.FindAsync(graphicsCardId);

            if (graphicsCard == null)
            {
                return NotFound();
            }

            var cheapestCloudCompute = await _context.CloudComputes
                .OrderBy(c => c.CostPerHour)
                .FirstOrDefaultAsync();

            if (cheapestCloudCompute == null)
            {
                return NotFound();
            }

            return calcFullCompare(graphicsCard, cheapestCloudCompute);
        }

        // GET: api/comparison?vramSize={vramSize}&efficiency={efficiency}
        [HttpGet("comparison")]
        public async Task<ActionResult<FullComparison>> GetFullComparisonByVRAMAndEfficiency([FromQuery] int vramSize, [FromQuery] bool efficiency)
        {
            var graphicsCard = efficiency
        ? await _context.GraphicsCards
            .Where(g => g.Vram > vramSize)
            .OrderByDescending(g => g.TrainingThroughput)
            .FirstOrDefaultAsync()
        : await _context.GraphicsCards
            .Where(g => g.Vram > vramSize)
            .OrderBy(g => g.Msrp)
            .FirstOrDefaultAsync();


            if (graphicsCard == null)
            {
                graphicsCard = await _context.GraphicsCards
                    .OrderBy(g => g.Vram)
                    .FirstOrDefaultAsync();
            }

            if (graphicsCard == null)
            {
                return NotFound();
            }

            var cheapestCloudCompute = await _context.CloudComputes
                .OrderBy(c => c.CostPerHour)
                .FirstOrDefaultAsync();

            if (cheapestCloudCompute == null)
            {
                return NotFound();
            }

            return calcFullCompare(graphicsCard, cheapestCloudCompute);
        }
        private FullComparison calcFullCompare(GraphicsCard graphicsCard, CloudCompute cheapestCloudCompute)
        {

            decimal onPremiseCostPerHour = (graphicsCard.PowerDraw * AppConstants.CostOfElectricity) / 100000m; // converting watts to kilowatts and cents to USD
            decimal cloudCostPerHour = cheapestCloudCompute.CostPerHour;

            decimal breakEvenPoint = (AppConstants.CostOfRig + graphicsCard.Msrp) / (cloudCostPerHour - onPremiseCostPerHour);

            return new FullComparison
            {
                GraphicsCard = graphicsCard,
                CheapestCloudCompute = cheapestCloudCompute,
                BreakEvenPoint = (int)Math.Ceiling(breakEvenPoint),
                CostOfRig = AppConstants.CostOfRig,
                CostOfElectricity = AppConstants.CostOfElectricity
            };
        }
    }

    
}

