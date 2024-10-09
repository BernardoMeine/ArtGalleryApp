using ArtGalleryAPI.Database;
using ArtGalleryAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryAPI.Controllers;
[Route("api/artworks")]
[ApiController]
public class ArtworksQueriesController : ControllerBase
{
    private readonly GalleryContext _context;

    public ArtworksQueriesController(GalleryContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ArtworkQueryDto>>> GetArtworks()
    {
        var artworks = await _context.Artworks
            .AsNoTracking()
            .Select(artwork => new ArtworkQueryDto
            {
                Id = artwork.Id,
                Title = artwork.Title,
                Artist = artwork.Artist,
                CreationDate = artwork.CreationDate,
                Technique = artwork.Technique,
                Price = artwork.Price,
                ImageUrl = artwork.ImageUrl
            })
            .ToListAsync();

        return Ok(artworks);
    }

    // GET: api/artworks/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ArtworkQueryDto>> GetArtworkById(int id)
    {
        var artwork = await _context.Artworks
            .AsNoTracking()
            .Where(a => a.Id == id)
            .Select(a => new ArtworkQueryDto
            {
                Id = a.Id,
                Title = a.Title,
                Artist = a.Artist,
                CreationDate = a.CreationDate,
                Technique = a.Technique,
                Price = a.Price,
                ImageUrl = a.ImageUrl
            })
            .FirstOrDefaultAsync();

        if (artwork == null)
        {
            return NotFound();
        }

        return Ok(artwork);
    }
}
