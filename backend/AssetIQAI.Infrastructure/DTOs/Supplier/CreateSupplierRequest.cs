using System.ComponentModel.DataAnnotations;

namespace AssetIQAI.Infrastructure.DTOs.Supplier;

    public class CreateSupplierRequest
    {
    public string CompanyName { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}

