using ArtGalleryAPI.Database;
using ArtGalleryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ArtworksController : ControllerBase
{
    private readonly GalleryContext _context;

    public ArtworksController(GalleryContext context)
    {
        _context = context;
    }

    // GET: api/artworks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artwork>>> GetArtworks()
    {
        return await _context
            .Artworks
            .AsNoTracking()
            .ToListAsync();
    }

    // POST: api/artworks
    [HttpPost]
    public async Task<IActionResult> PostArtwork([FromBody] ArtworkCreateDto artworkDto)
    {
        var artwork = new Artwork
        {
            Title = artworkDto.Title,
            Artist = artworkDto.Artist,
            CreationDate = artworkDto.CreationDate,
            Technique = artworkDto.Technique,
            Price = artworkDto.Price
        };

        if (!string.IsNullOrEmpty(artworkDto.ImageBase64))
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + ".jpg";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            var imageBytes = Convert.FromBase64String(artworkDto.ImageBase64);
            await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);

            artwork.ImageUrl = Path.Combine("Uploads", uniqueFileName).Replace("\\", "/");
        }

        _context.Artworks.Add(artwork);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetArtworks), new { id = artwork.Id }, artwork);
    }

    // DELETE: api/artworks/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArtwork(int id)
    {
        var artwork = await _context.Artworks.FindAsync(id);
        if (artwork == null)
        {
            return NotFound();
        }

        // Verifica se há uma imagem associada à obra e a deleta
        if (!string.IsNullOrEmpty(artwork.ImageUrl))
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), artwork.ImageUrl);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        _context.Artworks.Remove(artwork);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
