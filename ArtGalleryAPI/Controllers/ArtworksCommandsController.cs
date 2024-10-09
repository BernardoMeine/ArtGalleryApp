using ArtGalleryAPI.Database;
using ArtGalleryAPI.DTOs;
using ArtGalleryAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ArtGalleryAPI.Controllers;
[Route("api/artworks")]
[ApiController]
public class ArtworksCommandsController : ControllerBase
{
    private readonly GalleryContext _context;

    public ArtworksCommandsController(GalleryContext context)
    {
        _context = context;
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

        return CreatedAtAction("GetArtworkById", "ArtworksQueries", new { id = artwork.Id }, artwork);
    }

    // DELETE: api/artworks/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArtwork(int id)
    {
        var artwork = await _context.Artworks.FindAsync(id);
        if (artwork is null)
        {
            return NotFound();
        }

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
