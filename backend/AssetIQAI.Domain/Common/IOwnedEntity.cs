namespace AssetIQAI.Domain.Common;

/// <summary>
/// Marks an entity as belonging to a specific user. Entities implementing this
/// are automatically filtered by the current user (global query filter) and have
/// their OwnerId stamped on insert, so each user only ever sees their own data.
/// </summary>
public interface IOwnedEntity
{
    Guid OwnerId { get; set; }
}
