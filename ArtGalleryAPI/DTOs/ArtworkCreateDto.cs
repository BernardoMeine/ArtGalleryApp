namespace ArtGalleryAPI.DTOs;

public class ArtworkCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Artist { get; set; } = string.Empty;
    public DateTime CreationDate { get; set; }
    public string Technique { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageBase64 { get; set; }
}
