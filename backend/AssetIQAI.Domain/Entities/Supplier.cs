
using AssetIQAI.Domain.Common;

namespace AssetIQAI.Domain.Entities;

public class Supplier : BaseEntity, IOwnedEntity
{
    public string CompanyName { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public Guid OwnerId { get; set; }

    public ICollection<Product> Products { get; set; }
    = new List<Product>();
}