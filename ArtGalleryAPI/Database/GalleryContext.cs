using ArtGalleryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ArtGalleryAPI.Database;

public class GalleryContext(DbContextOptions<GalleryContext> options) : DbContext(options)
{
    public DbSet<Artwork> Artworks { get; set; }
}
